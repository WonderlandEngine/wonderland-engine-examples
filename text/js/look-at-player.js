import {Component, Property} from '@wonderlandengine/api';

export class LookAtPlayer extends Component {
    static TypeName = 'look-at-player';
    static Properties = {
        player: Property.object({required: true}),
    };

    init() {
        this.translation = [0, 0, 0];
        this.forward = [0, 0, 0];
    }

    update() {
        this.player.getTranslationWorld(this.translation);
        this.object.lookAt(this.translation, [0, 1, 0]);

        this.player.getForward(this.forward);
        for (let i = 0; i < 3; ++i) {
            this.translation[i] += this.forward[i] * 3.0;
        }
    }
}
