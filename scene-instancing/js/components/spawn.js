import {Component} from '@wonderlandengine/api';
import {CursorTarget} from '@wonderlandengine/components';

export class Spawn extends Component {
    static TypeName = 'spawn';

    _binScene = null;
    _target = null;

    init() {
        const root = this._scene.root;
        root.loadScene('RandomMesh.bin')
            .then((scene) => this._binScene = scene)
            .catch((e) => {
                this.active = false;
                console.error(`Failed to load 'RandomMesh.bin', reason:`, e);
            });
    }

    start() {
        const target = this.object.getComponent(CursorTarget);
        if (!target) {
            throw new Error('missing cursor target');
        }
        this._target = target;
    }

    onActivate() {
        this._target.onClick.add(this._spawn);
    }

    onDeactivate() {
        this._target.onClick.remove(this._spawn);
    }

    _spawn = (_, cursor) => {
        const pos = cursor.cursorPos;
        const {root} = this._scene.instantiate(this._binScene);
        root.setPositionWorld(pos);
    }
}
