import {Component, Property} from '@wonderlandengine/api';
import { ButtonComponent } from './button.js';
import { CursorTarget } from '@wonderlandengine/components';

/**
 * scene-switcher
 */
export class SceneSwitcher extends Component {
    static TypeName = 'scene-switcher';
    /* Properties that are configurable in the editor */
    static Properties = {
        index: Property.int()
    };

    onActivate() {
        const target = this.object.getComponent(CursorTarget);
        target.onUp.add(this._onUp);
    }

    onDeactivate() {
        const target = this.object.getComponent(CursorTarget);
        target.onUp.remove(this._onUp);
    }

    _onUp = () => {
        const sceneRoot = this._engine.getSceneRoot(1);
        const scene = sceneRoot.getScene(this.index);
        scene.activate();
    }
}
