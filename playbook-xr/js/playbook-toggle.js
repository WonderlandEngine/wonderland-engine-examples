import {Component, Type} from '@wonderlandengine/api';

export class PlaybookToggle extends Component {
    static TypeName = 'playbook-toggle';
    static Properties = {
        param: {type: Type.Float, default: 1.0},
    };

    init() {
        this.toggled = false;
    }

    start() {
        this.target =
            this.object.getComponent('cursor-target') ||
            this.object.addComponent('cursor-target');
        this.collision =
            this.object.getComponent('collision') || this.object.addComponent('collision');
        this.collision.extents = [0.07, 0.04, 0.02];
        this.collision.collider = WL.Collider.AxisAlignedBox;
        this.collision.group = 0xf;
        this.collision.active = true;
        this.target.addClickFunction(this.onClick.bind(this));
        console.log(this.collision);

        const children = this.object.children;
        for (const c of children) {
            if (c.name == 'knob') this.knob = c;
        }
    }

    onClick() {
        this.toggled = !this.toggled;
        const moveAmount = 0.03;
        if (this.toggled) {
            this.knob.translate([-moveAmount, 0, 0]);
        } else {
            this.knob.translate([moveAmount, 0, 0]);
        }
    }
}
