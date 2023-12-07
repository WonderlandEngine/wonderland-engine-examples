import {Component, Property} from '@wonderlandengine/api';
import {vec3, quat} from 'gl-matrix';

/**
Very simple smoke particles system
*/
export class Particles extends Component {
    static TypeName = 'particles';
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
    };

    init() {
        this.time = 0.0;
        this.timeSinceSpawn = 0.0;
        this.count = 0;
    }

    start() {
        this.objects = this.engine.scene.addObjects(this.maxParticles, this.maxParticles);
        this.materials = [];
        this.velocities = [];
        this.rotationFactor = new Float32Array(this.maxParticles);
        this.startTime = new Float32Array(this.maxParticles);

        /* Temporary variables for math, allocated once to avoid garbage collection */
        this.origin = [0, 0, 0];
        this.vel = [0, 0, 0];
        this.viewPos = [0, 0, 0];
    }

    update(dt) {
        this.time += dt;
        this.timeSinceSpawn += dt;
        if (this.timeSinceSpawn > this.delay) {
            /* Time to spawn particles */
            const spawnCount = Math.floor(this.timeSinceSpawn / this.delay);
            for (let i = 0; i < spawnCount; ++i) this.spawn();
            this.timeSinceSpawn -= this.delay * spawnCount;
        }

        const origin = this.origin;
        const vel = this.vel;
        const viewPos = this.viewPos;

        this.object.getPositionWorld(origin);
        /* Target for retrieving particles world locations */
        this.engine.scene.activeViews[0].object.getPositionWorld(viewPos);

        vec3.sub(viewPos, origin, viewPos);
        viewPos[1] = 0;
        vec3.normalize(viewPos, viewPos);
        const rotation = quat.rotationTo([], [0, 0, 1], viewPos);

        let col = [1, 1, 1, 1];

        for (let i = 0; i < this.velocities.length; ++i) {
            const lifeTime = this.time - this.startTime[i];
            let obj = this.objects[i];
            vec3.scale(vel, this.velocities[i], dt);
            obj.getPositionWorld(origin);
            /* Apply velocity */
            vec3.add(origin, origin, vel);

            obj.resetTransform();
            const s = 0.25 + 0.25 * lifeTime;
            obj.scaleLocal([s, s, s]);
            obj.rotateLocal(rotation);
            obj.setPositionLocal(origin);

            this.materials[i].offsetX = 0.1 * lifeTime + 100 * this.rotationFactor[i];

            let f = 0.2 * lifeTime;
            col[0] = col[1] = col[2] = 1 - f * f;
            this.materials[i].color = col;
        }

        /* drag */
        for (let i = 0; i < this.velocities.length; ++i) {
            this.velocities[i][2] += dt;
            vec3.scale(this.velocities[i], this.velocities[i], 1.0 - 0.5 * dt);
        }
    }

    /** Spawn a particle */
    spawn() {
        let index = this.count % this.maxParticles;
        const obj = this.objects[index];
        /* If we are not at this.maxParticles yet, spawn a new object */
        if (index >= this.velocities.length) {
            this.velocities.push([0, 0, 0]);

            obj.name = 'particle' + this.count.toString();
            const mesh = obj.addComponent('mesh', {
                mesh: this.mesh,
                material: this.material.clone(),
            });
            this.materials.push(mesh.material);
        }
        
        obj.setTransformWorld(this.object.transformWorld);
        obj.scaleLocal([0, 0, 0]);

        this.startTime[index] = this.time;
        this.rotationFactor[index] = Math.random();

        const v = this.velocities[index];

        v[0] = 2.0 * (Math.random() - 0.5);
        v[1] = Math.random() * 3.0 + 3.0;
        v[2] = 2.0 * (Math.random() - 0.5) + 2.0;

        vec3.normalize(v,v);
        vec3.scale(v,v,this.initialSpeed);

        this.count += 1;
    }
}
