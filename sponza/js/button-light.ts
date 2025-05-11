import {LightType} from '@wonderlandengine/api';
import {ButtonComponent} from './button.js';

export class ButtonLight extends ButtonComponent {
    static TypeName = 'button-light';

    onDown(): void {
        const lights = this.scene.getComponents('light').filter(c => c.lightType === LightType.Sun);
        for(const light of lights) {
            light.active = !light.active;
        }
    }
}
