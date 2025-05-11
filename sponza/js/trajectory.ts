import {Component, property} from '@wonderlandengine/api';
import {vec3} from 'gl-matrix';

const SPEED = 0.5;

const _point = vec3.create();

export class Trajectory extends Component {
    static TypeName = 'trajectory';

    @property.vector3()
    startPos!: vec3;

    @property.vector3()
    endPos!: vec3;

    t: number = 0.0;

    onActivate() {
        this.t = Math.random();
    }

    update(dt) {
        vec3.lerp(_point, this.startPos, this.endPos, Math.sin(this.t) * 0.5 + 0.5);
        this.object.setPositionWorld(_point);
        this.t += dt * SPEED;
    }
}
