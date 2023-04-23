import {Component, Type} from '@wonderlandengine/api';

export class OvalMotion extends Component {
    static TypeName = 'oval-motion';
    static Properties = {
        speed: {type: Type.Float, default: 0.2},
        radiusX: {type: Type.Float, default: 11},
        radiusY: {type: Type.Float, default: 5},
        time: {type: Type.Float, default: 0},
    };

    start() {
        this.startPositionArray = [0, 0, 0];
        this.startPositionArray = this.object.getTranslationWorld([]);
        this.startPosition = {};
        this.startPosition.x = this.startPositionArray[0];
        this.startPosition.y = this.startPositionArray[1];
        this.startPosition.z = this.startPositionArray[2];
    }

    update(dt) {
        this.time += dt * this.speed;
        const x = this.startPosition.x + Math.cos(this.time) * this.radiusX;
        const z = this.startPosition.z + Math.sin(this.time) * this.radiusY;
        this.object.setTranslationWorld([x, this.startPosition.y, z]);
    }
}
