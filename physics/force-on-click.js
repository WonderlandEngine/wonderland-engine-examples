import {Component, Type} from '@wonderlandengine/api';
import * as glMatrix from 'gl-matrix';

export class ApplyForceOnClick extends Component {
    static TypeName = 'apply-force-on-click';
    static Properties = {
        strength: {type: Type.Float, default: 100.0},
    };

    start() {
        const target = this.object.getComponent('cursor').globalTarget;
        target.addClickFunction(this.onClick.bind(this));

        this.force = new Float32Array(3);
    }

    onClick(object, cursor) {
        const body = object.getComponent('physx');
        if (body.static) return;

        glMatrix.vec3.scale(this.force, cursor.direction, this.strength);
        body.addForce(
            this.force,
            this.engine.ForceMode.Force,
            false,
            cursor.rayHit.locations[0]
        );
    }
}
