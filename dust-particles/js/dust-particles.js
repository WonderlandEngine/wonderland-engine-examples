/**
Spawns and updates dust particles within a cube around the emitter.

Use it and customize it for your own game.
*/
WL.registerComponent('dust-particles', {
    /* Mesh for spawned particles */
    mesh: {type: WL.Type.Mesh, default: null},
    /* Material for spawned particles */
    material: {type: WL.Type.Material, default: null},
    /* Number of particles */
    numParticles: {type: WL.Type.Int, default: 64},
    /* Lifetime of the dust particles in seconds */
    lifetime: {type: WL.Type.Float, default: 10.0},
    /* Minimum speed of dust particles */
    minSpeed: {type: WL.Type.Float, default: 0.005},
    /* Maximum speed of dust particles */
    maxSpeed: {type: WL.Type.Float, default: 0.04},
    /* Size of a particle */
    particleScale: {type: WL.Type.Float, default: 0.02},
    /* Extent in all directions (cube) */
    extent: {type: WL.Type.Float, default: 5.0},
}, {
    init: function() {
    },
    start: function() {
        this.objects = [];
        this.materials = [];
        this.velocities = [];
        this.ttls = [];
        /* Temporary variables for math, allocated once to avoid garbage collection */
        this.origin = [0, 0, 0];
        this.vel = [0, 0, 0];
        this.viewPos = [0, 0, 0];
        this.up = [0, 1, 0];

        /* Prepare and initialize particles */
        this.objects = WL.scene.addObjects(this.numParticles, null, 1);

        for(let i = 0; i < this.numParticles; ++i) {
            this.velocities.push([0, 0, 0]);
            this.ttls.push(Math.random());
            let obj = this.objects[i];
            obj.name = "particle" + i.toString();
            let mesh = obj.addComponent('mesh');

            mesh.mesh = this.mesh;
            mesh.material = this.material.clone();
            this.materials.push(mesh.material);
            /* Activate component, otherwise it will not show up! */
            mesh.active = true;

            this.resetParticle(i);
        }
    },
    update: function(dt) {
        WL.scene.activeViews[0].object.getTranslationWorld(this.viewPos);
        for(let i = 0; i < this.objects.length; ++i) {
            this.ttls[i] -= dt / this.lifetime;
            if(this.ttls[i] < 0) {
                this.resetParticle(i);
                this.ttls[i] = 1.0;
            }
            this.materials[i].intensity = 1.0 - Math.abs(this.ttls[i] - 0.5)*2.0;

            glMatrix.vec3.scale(this.vel, this.velocities[i], dt);
            this.objects[i].translate(this.vel);
            this.objects[i].lookAt(this.viewPos, this.up);
        }
    },

    /** Resets the state of a particle */
    resetParticle: function(index) {
        let obj = this.objects[index];
        obj.resetTransform();
        obj.scale([this.particleScale, this.particleScale, this.particleScale]);

        const origin = this.origin;
        glMatrix.quat2.getTranslation(origin, this.object.transformWorld);
        origin[0] += (Math.random() * this.extent * 2) - this.extent;
        origin[1] += (Math.random() * this.extent * 2) - this.extent;
        origin[2] += (Math.random() * this.extent * 2) - this.extent;
        obj.translate(origin);

        this.velocities[index][0] = Math.random() - 0.5;
        this.velocities[index][1] = Math.random() - 0.5;
        this.velocities[index][2] = Math.random() - 0.5;

        glMatrix.vec3.normalize(this.velocities[index], this.velocities[index]);
        const speed = this.minSpeed + Math.random() * (this.maxSpeed - this.minSpeed);
        glMatrix.vec3.scale(this.velocities[index], this.velocities[index], speed);
    }
});
