import { Component, Property } from '@wonderlandengine/api';
import { CursorTarget } from '@wonderlandengine/components';

/**
 * language-button
 */
export class LanguageButton extends Component {
    static TypeName = 'language-button';
    /* Properties that are configurable in the editor */
    static Properties = {
        langCode: Property.string('en')
    };

    init() {
        this.object.getComponent(CursorTarget).onClick.add(this.onClick.bind(this));
    }

    onClick() {
        this.engine.i18n.language = this.langCode;
    }
}
