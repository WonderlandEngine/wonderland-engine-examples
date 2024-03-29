import {Component, Property} from '@wonderlandengine/api';

export class RotateY extends Component {
    static TypeName = 'rotate-y';
    static Properties = {speed: Property.float(1.0)};

    update(dt) {
        this.object.rotateAxisAngleRadLocal([0, 1, 0], this.speed * dt);
    }
}
