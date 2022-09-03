/**
Very simple smoke particles system
*/
WL.registerComponent('particles', {
    /* Mesh for spawned particles */
    mesh: {type: WL.Type.Mesh, default: null},
    /* Material for spawned particles */
    material: {type: WL.Type.Material, default: null},
    /* Delay between particle spawns. If below time of a frame, will spawn multiple particles in update. */
    delay: {type: WL.Type.Float, default: 0.1},
    /* Maximum number of particles, once limit is reached, particles are recycled first-in-first-out. */
    maxParticles: {type: WL.Type.Int, default: 64},
    /* Initial speed of emitted particles. */
    initialSpeed: {type: WL.Type.Float, default: 30},
}, {
    init: function() {
        this.time = 0.0;
        this.timeSinceSpawn = 0.0;
        this.count = 0;
    },
    start: function() {
        this.objects = WL.scene.addObjects(this.maxParticles, this.maxParticles);
        this.materials = [];
        this.velocities = [];
        this.rotationFactor = new Float32Array(this.maxParticles);
        this.startTime = new Float32Array(this.maxParticles);


        /* Temporary variables for math, allocated once to avoid garbage collection */
        this.origin = [0, 0, 0];
        this.vel = [0, 0, 0];
        this.viewPos = [0, 0, 0];
    },
    update: function(dt) {
        this.time += dt;
        this.timeSinceSpawn += dt;
        if(this.timeSinceSpawn > this.delay) {
            /* Time to spawn particles */
            const spawnCount = Math.floor(this.timeSinceSpawn / this.delay)
            for(let i = 0; i < spawnCount; ++i) this.spawn();
            this.timeSinceSpawn -= this.delay*spawnCount;
        }

        const origin = this.origin;
        const vel = this.vel;
        const viewPos = this.viewPos;

        this.object.getTranslationWorld(origin);
        /* Target for retrieving particles world locations */
        WL.scene.activeViews[0].object.getTranslationWorld(viewPos);

        glMatrix.vec3.sub(viewPos, origin, viewPos);
        viewPos[1] = 0;
        glMatrix.vec3.normalize(viewPos, viewPos);
        const rotation = glMatrix.quat.rotationTo([], [0, 0, 1], viewPos);

        let col = [1, 1, 1, 1];

        for(let i = 0; i < this.velocities.length; ++i) {
            const lifeTime = this.time - this.startTime[i];
            let obj = this.objects[i];
            glMatrix.vec3.scale(vel, this.velocities[i], dt);
            obj.getTranslationWorld(origin);
            /* Apply velocity */
            glMatrix.vec3.add(origin, origin, vel);

            obj.resetTransform();
            const s = 0.25 + 0.25*lifeTime;
            obj.scale([s, s, s]);
            obj.rotate(rotation);
            obj.setTranslationLocal(origin);

            this.materials[i].offsetX = 0.1*lifeTime + 100*this.rotationFactor[i];

            let f = 0.2*lifeTime;
            col[0] = col[1] = col[2] = 1 - f*f;
            this.materials[i].color = col;
        }

        /* drag */
        for(let i = 0; i < this.velocities.length; ++i) {
            this.velocities[i][2] += dt;
            glMatrix.vec3.scale(this.velocities[i], this.velocities[i], 1.0-0.5*dt);
        }
    },

    /** Spawn a particle */
    spawn: function() {
        let index = this.count % this.maxParticles;
        const obj = this.objects[index];
        /* If we are not at this.maxParticles yet, spawn a new object */
        if(index >= this.velocities.length) {
            this.velocities.push([0, 0, 0]);

            obj.name = "particle" + this.count.toString();
            const mesh = obj.addComponent('mesh', {
                mesh: this.mesh,
                material: this.material.clone(),
            });
            this.materials.push(mesh.material);
        }
        obj.transformWorld = this.object.transformWorld;
        obj.scalingLocal.set([0, 0, 0]);

        this.startTime[index] = this.time;
        this.rotationFactor[index] = Math.random();
        this.velocities[index][0] = 2.0*(Math.random() - 0.5);
        this.velocities[index][1] = Math.random()*3.0 + 3.0;
        this.velocities[index][2] = 2.0*(Math.random() - 0.5) + 2.0;

        glMatrix.vec3.normalize(this.velocities[index], this.velocities[index]);
        glMatrix.vec3.scale(this.velocities[index], this.velocities[index], this.initialSpeed);

        this.count += 1;
    }
});
