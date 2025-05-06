import {Component} from '@wonderlandengine/api';
import {Scenes} from './scenes.js';

/** Component to switch between the main and second scene. */
export class SwitchScene extends Component {
    static TypeName = 'switch-scene';

    switch() {
        const nextScene = this.scene === Scenes.main ? Scenes.second : Scenes.main;
        this.engine.switchTo(nextScene);
    }
}
