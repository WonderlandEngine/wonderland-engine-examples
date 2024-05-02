import {Component} from '@wonderlandengine/api';
import {CursorTarget} from '@wonderlandengine/components';

const PREFAB_URL = 'Prefab.bin';

/** Instantiate the prefab at the cursor location. */
export class Spawn extends Component {
    static TypeName = 'spawn';

    /** Prefab */
    _prefab = null;

    /** Cursor target component */
    _target = null;

    init() {
        this.engine.loadPrefab(PREFAB_URL)
            .then((scene) => this._prefab = scene)
            .catch((e) => {
                this.active = false;
                console.error(`Failed to load '${PREFAB_URL}', reason:`, e);
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

    /** Spawn the prefab at the cursor location. */
    _spawn = (_, cursor) => {
        const pos = cursor.cursorPos;
        const {root} = this.scene.instantiate(this._prefab);
        root.setPositionWorld(pos);
    }
}
