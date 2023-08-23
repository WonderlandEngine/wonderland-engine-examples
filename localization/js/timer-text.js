import {Component, TextComponent} from '@wonderlandengine/api';

/**
 * timer
 */
export class TimerText extends Component {
    static TypeName = 'timer-text';

    init() {
        this.timer = 0.0;
        this.seconds = 0;
        this.engine.i18n.onLanguageChanged.add(this.onLanguageChanged.bind(this));

        this.text = this.object.getComponent(TextComponent);
    }

    update(dt) {
        this.timer += dt;
        if(this.timer < 1.0) {
            return;
        }

        this.timer -= 1.0;
        ++this.seconds;

        const text = this.engine.i18n.translate("55-text-0");
        this.text.text = text.replace("{seconds}", this.seconds.toString());
    }

    onLanguageChanged(oldIndex, newIndex) {
        const text = this.engine.i18n.translate("55-text-0");
        this.text.text = text.replace("{seconds}", this.seconds.toString());
    }
}
