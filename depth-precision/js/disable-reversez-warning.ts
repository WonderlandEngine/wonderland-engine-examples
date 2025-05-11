import {Component, TextComponent} from '@wonderlandengine/api';

export class DisableReversezWarning extends Component {
    static TypeName = 'disable-reversez-warning';

    start() {
        if(this.engine.isReverseZEnabled! !== false) {
            this.object.getComponent(TextComponent)!.active = false;
        }
    }
}
