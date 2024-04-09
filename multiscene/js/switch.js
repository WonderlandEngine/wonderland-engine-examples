import {Component} from '@wonderlandengine/api';

/**
 * switch-scene
 */
export class SwitchScene extends Component {
    static TypeName = 'switch-scene';
    switch() {
        const scene0 = this.engine.getSceneGroup(0).getScene(0);
        const scene1 = this.engine.getSceneGroup(1).getScene(0);
        if (this.scene === scene1) {
            scene0.activate();
        } else {
            scene1.activate();
        }
    }
}
