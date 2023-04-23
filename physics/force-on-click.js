import {Component, Type, ForceMode} from '@wonderlandengine/api';
import {Cursor} from '@wonderlandengine/components';

/* Temporary vector for the force to apply */
const force = new Float32Array(3);

export class ApplyForceOnClick extends Component {
    static TypeName = 'apply-force-on-click';
    static Properties = {
        strength: {type: Type.Float, default: 800.0},
    };

    start() {
        /* The global target allows receiving onClick for any object
         * that has a physx component attached. The cursor is set to
         * ray cast mode "physx" to ray cast against physx components
         * instead of collision components */
        const target = this.object.getComponent(Cursor).globalTarget;
        target.onClick.add(this.onClick.bind(this));
    }

    onClick(object, cursor) {
        const body = object.getComponent('physx');
        if (body.static) return;

        /* Get cursor direction */
        cursor.object.getForwardWorld(force);

        /* Multiply with the strenght set in the editor */
        force[0] *= this.strength;
        force[1] *= this.strength;
        force[2] *= this.strength;

        body.addForce(force, ForceMode.Force, false, cursor.cursorPos);
    }
}
