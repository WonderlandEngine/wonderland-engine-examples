import {Component, TextComponent} from '@wonderlandengine/api';

/**
 * timer-text
 *
 * Runs a timer and sets the "{seconds}" value in the attached TextComponent.
 * This happens both when the seconds value increases by 1
 * and when the onLanguageChanged callback is called
 * by using `string.replace('{seconds}', this.seconds.toString())`.
 *
 * This only works if every translation of tha attached
 * TextComponent has the `{seconds}` keyword in its string.
 */
export class TimerText extends Component {
    static TypeName = 'timer-text';

    init() {
        this.time = 0.0;
        this.seconds = 0;
    }

    start() {
        this.onLanguageChangedEvent = this.onLanguageChanged.bind(this);
        this.text = this.object.getComponent(TextComponent);
    }

    onActivate() {
        this.engine.i18n.onLanguageChanged.add(this.onLanguageChangedEvent);
    }

    onDeactivate() {
        this.engine.i18n.onLanguageChanged.remove(this.onLanguageChangedEvent);
    }

    update(dt) {
        this.time += dt;
        const newSeconds = Math.floor(this.time);

        /* Update text every second instead of every frame.
         * This is a small optimization to avoid doing
         * translation lookups and `string.replace()` every frame.
         * */
        if (newSeconds == this.seconds) {
            return;
        }
        this.seconds = newSeconds;

        /* We can manually get the translation of a term,
         * for convenience this term was renamed. */
        const text = this.engine.i18n.translate('timerText');
        this.text.text = text.replace('{seconds}', this.seconds.toString());
    }

    onLanguageChanged(oldIndex, newIndex) {
        /* Called after a language was loaded and its texts were applied */
        const text = this.engine.i18n.translate('timerText');
        this.text.text = text.replace('{seconds}', this.seconds.toString());
    }
}
