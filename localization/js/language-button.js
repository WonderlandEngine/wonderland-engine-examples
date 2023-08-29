import {Component, Property} from '@wonderlandengine/api';
import {CursorTarget} from '@wonderlandengine/components';

/**
 * language-button
 *
 * Uses CursorTarget to change the language on click.
 */
export class LanguageButton extends Component {
    static TypeName = 'language-button';
    /* Properties that are configurable in the editor */
    static Properties = {
        langCode: Property.string('en'),
    };

    start() {
        this.cursorTarget = this.object.getComponent(CursorTarget);
        this.onClickEvent = this.onClick.bind(this);
    }

    onActivate() {
        this.cursorTarget.onClick.add(this.onClickEvent);
    }

    onDeactivate() {
        this.cursorTarget.onClick.remove(this.onClickEvent);
    }

    onClick() {
        this.engine.i18n.language = this.langCode;
    }
}
