import {Component, Type} from '@wonderlandengine/api';

export class MoveComp extends Component {
    static TypeName = 'move-comp';
    static Properties = {
        matStart: {type: Type.Material},
        matCollision: {type: Type.Material},
    };

    init() {
        this.collider = this.object.getComponent('collision');
        this.objects = [];
        this.check = false;
    }

    start() {}

    update(dt) {
        //Sphere Movement
        this.object.translate([0, 0, -2 * dt]);
        if (this.object.transformWorld[6] < -2) {
            this.object.translate([0, 0, 10]);
        }
        //Collision Detection & Material Change
        let collidingComps = this.collider.queryOverlaps();
        for (let i = 0; i < collidingComps.length; ++i) {
            if (!this.check) {
                let collidingMesh = collidingComps[i].object.getComponent('mesh');
                collidingMesh.material = this.matCollision;
                this.objects.push(collidingComps[i]);
                this.check = true;
            }
        }
        if (collidingComps.length == 0) {
            this.check = false;
            for (var i = 0; i < this.objects.length; i++) {
                let startMesh = this.objects[i].object.getComponent('mesh');
                startMesh.material = this.matStart;
            }
            this.objects = [];
        }
    }
}
