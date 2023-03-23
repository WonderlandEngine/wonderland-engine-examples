import {Component, Type} from '@wonderlandengine/api';

export class TextScroller extends Component {
    static TypeName = 'text-scroller';
    static Properties = {
        speed: {type: Type.Float, default: 0.5},
    };

    init() {
        this.time = 0.0;
        this.textLength = 0;
    }

    update(dt) {
        this.time += dt;
        if (this.time > this.speed) {
            const str = 'Welcome to Wonderland!';
            this.object.getComponent('text').text = str.substring(0, this.textLength);
            this.textLength = (this.textLength + 1) % (str.length + 1);
            this.time = 0.0;
        }
    }
}
