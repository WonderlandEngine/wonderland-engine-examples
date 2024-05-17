import {Component, Property} from '@wonderlandengine/api';

export class VisualizeTextBox extends Component {
    static TypeName = 'visualize-text-box';
    static Properties = {
        textObject: Property.object({required: true}),
    };

    init() {
        this.box = [0.0, 0.0, 0.0, 0.0];
        this.position = [0.0, 0.0, 0.0];
        this.scaling = [1.0, 1.0, 1.0];
    }

    start() {
        this.textComponent = this.textObject.getComponent('text');
    }

    update() {
        this.textComponent.getBoundingBox(this.box);

        this.position[0] = (this.box[0] + this.box[2])*0.5;
        this.position[1] = (this.box[1] + this.box[3])*0.5;
        this.scaling[0] = (this.box[2] - this.box[0])*0.5;
        this.scaling[1] = (this.box[3] - this.box[1])*0.5;

        this.object.setPositionLocal(this.position);
        this.object.setScalingLocal(this.scaling);
    }
}
