import {Component, Type} from '@wonderlandengine/api';

export class ApplyForceOnClick extends Component {
    static TypeName = 'apply-force-on-click';
    static Properties = {
        strength: {type: Type.Float, default: 800.0},
    };

    start() {
        const target = this.object.getComponent('cursor').globalTarget;
        target.onClick.add(this.onClick.bind(this));
        this.force = new Float32Array(3);
    }

    onClick(object, cursor) {
        const body = object.getComponent('physx');
        if (body.static) return;
        /** map cursor direction to the force and scale with strength**/
        this.force = [...cursor.direction].map((f) => f * this.strength);
        body.addForce(
            this.force,
            this.engine.ForceMode.Force,
            false,
            cursor.rayHit.locations[0]
        );
    }
}
