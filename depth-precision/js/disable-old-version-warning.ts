import {Component, TextComponent} from '@wonderlandengine/api';

export class DisableOldVersionWarning extends Component {
    static TypeName = 'disable-old-version-warning';

    start() {
        if(this.engine.isReverseZEnabled !== undefined) {
            this.object.getComponent(TextComponent)!.active = false;
        }
    }
}
