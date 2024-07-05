import {Component, Property} from '@wonderlandengine/api';

export class TextChangeSpacing extends Component {
    static TypeName = 'text-change-spacing';
    static Properties = {
        speed: Property.float(1.0),
        lineMin: Property.float(0.0),
        lineMax: Property.float(3.0),
        characterMin: Property.float(0.0),
        characterMax: Property.float(2.0),
    };

    init() {
        this.time = 0.0;
        this.lineDirection = 1.0;
        this.characterDirection = 0.0;
    }

    update(dt) {
        let text = this.object.getComponent('text');

        const lineSpacing = text.lineSpacing + dt * this.speed * this.lineDirection;
        const characterSpacing =
            text.characterSpacing + dt * this.speed * this.characterDirection;

        if (lineSpacing > this.lineMax) {
            this.lineDirection = -1.0;
        } else if (lineSpacing < this.lineMin) {
            this.lineDirection = 0.0;
            this.characterDirection = 1.0;
        }

        if (characterSpacing > this.characterMax) {
            this.characterDirection = -1.0;
        } else if (characterSpacing < this.characterMin) {
            this.characterDirection = 0.0;
            this.lineDirection = 1.0;
        }

        text.lineSpacing = Math.min(Math.max(lineSpacing, this.lineMin), this.lineMax);
        text.characterSpacing = Math.min(
            Math.max(characterSpacing, this.characterMin),
            this.characterMax
        );
    }
}
