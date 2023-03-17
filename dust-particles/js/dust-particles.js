import {Component, Type} from '@wonderlandengine/api';
import * as glMatrix from 'gl-matrix';

/**
Spawns and updates dust particles within a cube around the emitter.

Use it and customize it for your own game.
*/
export class DustParticles extends Component {
    static TypeName = 'dust-particles';
    static Properties = {
        /* Mesh for spawned particles */
        mesh: {type: Type.Mesh, default: null},
        /* Material for spawned particles */
        material: {type: Type.Material, default: null},
        /* Number of particles */
        numParticles: {type: Type.Int, default: 64},
        /* Lifetime of the dust particles in seconds */
        lifetime: {type: Type.Float, default: 10.0},
        /* Minimum speed of dust particles */
        minSpeed: {type: Type.Float, default: 0.005},
        /* Maximum speed of dust particles */
        maxSpeed: {type: Type.Float, default: 0.04},
        /* Size of a dust particle */
        particleScale: {type: Type.Float, default: 0.02},
        /* Scale factor to apply when an XR session is active */
        xrScaleFactor: {type: Type.Float, default: 0.5},
        /* Extent in all directions (cube) */
        extent: {type: Type.Float, default: 5.0},
    };

    init() {}

    start() {
        this.objects = [];
        this.materials = [];
        this.velocities = [];
        this.ttls = [];
        /* Temporary variables for math, allocated once to avoid garbage collection */
        this.origin = [0, 0, 0];
        this.vel = [0, 0, 0];
        this.viewPos = [0, 0, 0];
        this.up = [0, 1, 0];

        /* In VR the dust particles will be scaled down, so keep track of the
         * effective particle scale and adjust the size of existing particles
         * whenever an XR session is started or ended */
        this.effectiveParticleScale = this.engine.xrSession
            ? this.particleScale * this.xrScaleFactor
            : this.particleScale;
        this.engine.onXRSessionStart.push(() => {
            this.effectiveParticleScale = this.particleScale * this.xrScaleFactor;
            this.objects.forEach(
                (obj) =>
                    (obj.scalingLocal = [
                        this.effectiveParticleScale,
                        this.effectiveParticleScale,
                        this.effectiveParticleScale,
                    ])
            );
        });
        this.engine.onXRSessionEnd.push(() => {
            this.effectiveParticleScale = this.particleScale;
            this.objects.forEach(
                (obj) =>
                    (obj.scalingLocal = [
                        this.effectiveParticleScale,
                        this.effectiveParticleScale,
                        this.effectiveParticleScale,
                    ])
            );
        });

        /* Prepare and initialize particles */
        this.objects = this.engine.scene.addObjects(this.numParticles, null, 1);

        for (let i = 0; i < this.numParticles; ++i) {
            this.velocities.push([0, 0, 0]);
            this.ttls.push(Math.random());
            let obj = this.objects[i];
            obj.name = 'particle' + i.toString();
            let mesh = obj.addComponent('mesh');

            mesh.mesh = this.mesh;
            mesh.material = this.material.clone();
            this.materials.push(mesh.material);
            /* Activate component, otherwise it will not show up! */
            mesh.active = true;

            this.resetParticle(i);
        }
    }

    update(dt) {
        this.engine.scene.activeViews[0].object.getTranslationWorld(this.viewPos);
        for (let i = 0; i < this.objects.length; ++i) {
            this.ttls[i] -= dt / this.lifetime;
            if (this.ttls[i] < 0) {
                this.resetParticle(i);
                this.ttls[i] = 1.0;
            }
            this.materials[i].intensity = 1.0 - Math.abs(this.ttls[i] - 0.5) * 2.0;

            glMatrix.vec3.scale(this.vel, this.velocities[i], dt);
            this.objects[i].translate(this.vel);
            this.objects[i].lookAt(this.viewPos, this.up);
        }
    }

    /** Resets the state of a particle */
    resetParticle(index) {
        let obj = this.objects[index];
        obj.resetTransform();
        obj.scale([
            this.effectiveParticleScale,
            this.effectiveParticleScale,
            this.effectiveParticleScale,
        ]);

        const origin = this.origin;
        glMatrix.quat2.getTranslation(origin, this.object.transformWorld);
        origin[0] += Math.random() * this.extent * 2 - this.extent;
        origin[1] += Math.random() * this.extent * 2 - this.extent;
        origin[2] += Math.random() * this.extent * 2 - this.extent;
        obj.translate(origin);

        this.velocities[index][0] = Math.random() - 0.5;
        this.velocities[index][1] = Math.random() - 0.5;
        this.velocities[index][2] = Math.random() - 0.5;

        glMatrix.vec3.normalize(this.velocities[index], this.velocities[index]);
        const speed = this.minSpeed + Math.random() * (this.maxSpeed - this.minSpeed);
        glMatrix.vec3.scale(this.velocities[index], this.velocities[index], speed);
    }
}
