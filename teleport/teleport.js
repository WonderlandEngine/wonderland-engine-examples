WL.registerComponent('teleport', {
    /* Object that serves as visualization for the teleport target */
    teleportTargetObject: {type: WL.Type.Object, default: null},
    /* Object that serves as visualization for the teleport beam to the target */
    teleportBeam: {type: WL.Type.Object, default: null},
    /* Player object */
    player: {type: WL.Type.Object, default: null},
    /* Navigation collision group */
    navigationGroup: {type: WL.Type.Int, default: 0}
}, {
    init: function() {
        if(!this.teleportTargetObject) {
            console.error(this.object.name, '- teleport: Teleport target object is missing.');
        }
        if(!this.player) {
            console.error(this.object.name, '- teleport: Player object reference is missing.');
        }

        WL.canvas.addEventListener('mousedown', this.startTeleport.bind(this));
        WL.canvas.addEventListener('mouseup', this.endTeleport.bind(this));

        this.isTeleporting = false;
        this.hitSpot = new Float32Array(3);
        this.target = null;

        this.endTeleport();
    },

    update: function(dt) {
        if(this.isTeleporting) {
            let origin = [0, 0, 0];
            glMatrix.quat2.getTranslation(origin, this.object.transformWorld);

            let forwardDirection = [0, 0, -1];
            glMatrix.vec3.transformQuat(forwardDirection, forwardDirection, this.object.transformWorld);
            let rayHit = WL.scene.rayCast(origin, forwardDirection, 1 << this.floorGroup);
            if(rayHit.hitCount > 0) {
                let nearest = 0;
                let distance = rayHit.distances[0];
                let i = 1;
                while(i < rayHit.hitCount) {
                    if(distance > rayHit.distances[i]) {
                        nearest = i;
                        distance = rayHit.distances[i];
                    }
                    ++i;
                }
                let o = rayHit.objects[nearest];

                let location = rayHit.locations[nearest];

                this.teleportTargetObject.resetTransform();
                this.teleportTargetObject.translate(location);

                this.hitSpot.set(location);
                this.target = o;
                if(this.teleportBeam) {
                    this.teleportBeam.scalingLocal.set([1.0, 1.0/(0.8+distance), distance]);
                    this.teleportBeam.setDirty();
                }
            } else if(this.target) {
                this.target = null;
                this.teleportTargetObject.scale([0, 0, 0]);
                if(this.teleportBeam) {
                    this.teleportBeam.scalingLocal.set([0, 0, 0]);
                    this.teleportBeam.setDirty();
                }
            }
        }
    },

    startTeleport: function() {
        this.isTeleporting = true;
    },

    endTeleport: function() {
        this.isTeleporting = false;
        this.teleportTargetObject.scale([0, 0, 0]);

        if(this.target && this.player) {
            this.player.resetTransform();
            this.player.translate(this.hitSpot);
        }

        this.target = null;
        if(this.teleportBeam) {
            this.teleportBeam.scalingLocal.set([0, 0, 0]);
            this.teleportBeam.setDirty();
        }
    }
});
