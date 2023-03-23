import {Component, Type} from '@wonderlandengine/api';

export class AnimationControl extends Component {
    static TypeName = 'animation-control';
    static Properties = {};

    start() {
        this.curSpeed = 0;
        this.speeds = [0.5, 1.0, 0.8, 1.5];
        this.anim = this.object.getComponent('animation');

        setInterval(() => {
            this.curSpeed = (this.curSpeed + 1) % this.speeds.length;
            this.anim.speed = this.speeds[this.curSpeed];
        }, 2000);
    }
}
