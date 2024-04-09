import {Component, Property} from '@wonderlandengine/api';
import {SwitchScene} from './switch';
import {vec3} from 'gl-matrix';

/**
 * switch-scene
 */
export class Portal extends Component {
    static TypeName = 'portal';
    /* Properties that are configurable in the editor */
    static Properties = {
        target: Property.object(),
        translationDuration: Property.float(0.5),
        initialTranslate: Property.float(30),
        portalRotateSpeed: Property.float(1.0),
    };

    onActivate() {
        this.target.translateObject([0, 0, this.initialTranslate]);
    }

    update(dt) {
        this.object.rotateAxisAngleDegObject(
            [0, 0, 1],
            dt * 10000 * this.portalRotateSpeed
        );
        const playerPosition = this.target.getPositionWorld([]);
        const portalPosition = this.object.getPositionWorld([]);
        const sqDist = vec3.squaredDistance(playerPosition, portalPosition);
        if (sqDist > 0.1) {
            const distanceRemaining = Math.abs(portalPosition[0] - playerPosition[0]);
            const alpha =
                1 - Math.exp(-dt / (this.translationDuration * distanceRemaining));
            const newPosition = new Float32Array(3);
            vec3.lerp(newPosition, playerPosition, portalPosition, alpha);
            this.target.setPositionWorld(newPosition);
        } else {
            this.object.getComponent(SwitchScene).switch();
        }
    }
}
