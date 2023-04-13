import {Component, Type} from '@wonderlandengine/api';

export class LightAnimation extends Component {
    static TypeName = 'light-animation';
    static Properties = {
        speed: {type: Type.Float, default: 1.0},
    };

    start() {
        this.time = 0;

        this.originalPos = new Float32Array(3);
        this.object.getTranslationLocal(this.originalPos);
    }

    update(dt) {
        this.time += dt * this.speed;
        this.object.setTranslationLocal([
            this.originalPos[0] + Math.sin(this.time),
            this.originalPos[1] + Math.cos(this.time),
            this.originalPos[2],
        ]);
    }
}
