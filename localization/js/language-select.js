import {
    CollisionComponent,
    Component,
    Property,
    TextComponent,
    Collider,
    Justification,
} from '@wonderlandengine/api';
import {CursorTarget} from '@wonderlandengine/components';
import {LanguageButton} from './language-button.js';

/**
 * language-select
 *
 * Generates a language selection menu from all available languages.
 * Spawns an object for each language, with a TextComponent
 * to show the name of the language, a CollisionComponent and CursorTarget
 * to make it clickable, and the LanguageButton component
 * to handle language switching.
 */
export class LanguageSelect extends Component {
    static TypeName = 'language-select';

    static Properties = {
        textMaterial: Property.material(),
    };

    static onRegister(engine) {
        engine.registerComponent(LanguageButton);
    }

    start() {
        const langCount = this.engine.i18n.languageCount();
        for (var i = 0; i < langCount; ++i) {
            const code = this.engine.i18n.languageCode(i);
            const name = this.engine.i18n.languageName(i);

            const o = this.engine.scene.addObject(this.object);
            o.setPositionLocal([0, -(i + 2) * 0.06, 0]);
            o.setScalingLocal([0.5, 0.5, 0.5]);
            o.addComponent(TextComponent, {
                text: name,
                material: this.textMaterial,
                justification: Justification.Middle,
            });

            const target = this.engine.scene.addObject(o);
            target.addComponent(CollisionComponent, {
                collider: Collider.Box,
                extents: [0.5, 0.025, 0.01],
                group: 1 << 1,
            });
            target.addComponent(CursorTarget);

            target.addComponent(LanguageButton, {
                langCode: code,
            });
        }
    }
}
