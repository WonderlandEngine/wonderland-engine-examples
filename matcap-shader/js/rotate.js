import {Component, Property} from '@wonderlandengine/api';

export class Rotate extends Component {
    static TypeName = 'rotate';
    static Properties = {
        startDelayMs: Property.float(2000)
    };

    _update = (dt) => {
        this.object.rotateAxisAngleDegObject(this._axis, dt * 50.0);
    }

    init() {
        this._axis = [0, 1, 0];
    }

    start() {
        document.addEventListener('wle-scene-ready', function() {
            /* Add a small timeout to avoid rotating during the test */
            setTimeout(() => {
                this.update = this._update;
            }, this.startDelayMs);
        }, {once: true});
    }
}
