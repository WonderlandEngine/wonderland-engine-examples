import {Component} from '@wonderlandengine/api';

export class Rotate extends Component {
    static TypeName = 'rotate';
    static Properties = {};
    init() {
        this._axis = [0, 1, 0];
    }
    update(dt) {
        this.object.rotateAxisAngleDegObject(this._axis, dt * 50.0);
    }
}
