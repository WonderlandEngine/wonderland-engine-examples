import {Component} from '@wonderlandengine/api';

export class PlayAnimOnClick extends Component {
    static TypeName = 'play-anim-on-click';
    static Properties = {};

    start() {
        this.anim = this.object.getComponent('animation');

        this.cursorTarget = this.object.getComponent('cursor-target');
        this.cursorTarget.addClickFunction(this.onClick.bind(this));
    }

    onClick() {
        this.anim.play();
    }
}
