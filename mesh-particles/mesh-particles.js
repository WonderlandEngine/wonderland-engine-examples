import {Component, Property} from '@wonderlandengine/api';

import {vec3} from 'gl-matrix';

/* Vectors constants */
const ZeroVector = new Float32Array(3);
const AxisY = [0, 1, 0];

/* Temp vectors */
const origin = new Float32Array(3);
const distance = new Float32Array(3);

/**
Very simple mesh particles system

Demostrates spawning of new objects with components
and a simple pooling pattern.

Use it and customize it for your own game.
*/
export class MeshParticles extends Component {
    static TypeName = 'mesh-particles';
    static Properties = {
        /* Mesh for spawned particles */
        mesh: Property.mesh(),
        /* Material for spawned particles */
        material: Property.material(),
        /* Delay between particle spawns. If below time of a frame, will spawn multiple particles in update. */
        delay: Property.float(0.1),
        /* Maximum number of particles, once limit is reached, particles are recycled first-in-first-out. */
        maxParticles: Property.int(64),
        /* Initial speed of emitted particles. */
        initialSpeed: Property.float(30),
        /* Size of a particle */
        particleScale: Property.float(0.1),
    };

    time = 0.0;
    count = 0;
    particleScaleVector = new Float32Array(3);

    start() {
        this.objects = this.engine.scene.addObjects(
            this.maxParticles,
            null,
            this.maxParticles
        );
        this.velocities = new Array(this.maxParticles);
        this.particleScaleVector.fill(this.particleScale);

        for (let i = 0; i < this.maxParticles; ++i) {
            this.velocities[i] = new Float32Array(3);
            const obj = this.objects[i];
            obj.name = 'ptcl' + this.count.toString();
            obj.addComponent('mesh', {
                mesh: this.mesh,
                material: this.material,
            });

            /* Most efficient way to hide the mesh */
            obj.scaleLocal(ZeroVector);
        }
    }

    update(dt) {
        this.time += dt;
        if (this.time > this.delay) {
            /* Time to spawn particles */
            const spawnCount = Math.floor(this.time / this.delay);
            for (let i = 0; i < spawnCount; ++i) this.spawn();
            this.time -= this.delay * spawnCount;
        }

        /* Animate the emitter */
        distance[0] = dt * 4;
        distance[1] = distance[2] = 0;
        this.object.translateLocal(distance);
        this.object.rotateAxisAngleDegLocal(AxisY, dt * 90);

        /* Target for retrieving particles world locations */
        for (let i = 0; i < Math.min(this.count, this.objects.length); ++i) {
            this.objects[i].getPositionLocal(origin);

            /* Apply gravity */
            const v = this.velocities[i];
            v[1] -= 9.81 * dt;

            /* Check if particle would collide with floor (Y=0 plane) */
            if (origin[1] + v[1] * dt <= this.particleScale && v[1] <= 0) {
                /* Pseudo friction */
                const frict = 1 / (1 - v[1]);
                v[0] = frict * v[0];
                v[2] = frict * v[2];

                /* Reflect */
                v[1] = -0.6 * v[1];

                /* Come to rest if velocity slows below 0.6 after bounce */
                if (v[1] < 0.6) v[1] = 0;
            }
        }

        for (let i = 0; i < Math.min(this.count, this.objects.length); ++i) {
            /* Apply velocity */
            vec3.scale(distance, this.velocities[i], dt);
            this.objects[i].translateLocal(distance);
        }
    }

    /** Spawn a particle */
    spawn() {
        let index = this.count % this.maxParticles;

        let obj = this.objects[index];
        obj.resetTransform();
        obj.scaleLocal(this.particleScaleVector);

        this.object.getPositionWorld(origin)
        obj.translateLocal(origin);

        const v = this.velocities[index];
        v[0] = Math.random() - 0.5;
        v[1] = Math.random();
        v[2] = Math.random() - 0.5;

        vec3.normalize(v, v);
        vec3.scale(v, v, this.initialSpeed);

        ++this.count;
    }
}
