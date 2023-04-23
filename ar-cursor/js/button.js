import {Component, Type} from '@wonderlandengine/api';
import {HowlerAudioSource} from '@wonderlandengine/components';

export class Button extends Component {
    static TypeName = 'button';
    static Properties = {
        buttonMeshObject: {type: Type.Object},
        hoverMaterial: {type: Type.Material},
    };
    static Dependencies = [HowlerAudioSource];

    start() {
        this.mesh = this.buttonMeshObject.getComponent('mesh');
        this.defaultMaterial = this.mesh.material;

        this.target = this.object.getComponent('cursor-target');
        if (!this.target)
            console.error(
                "'button' component on object",
                this.object.name,
                "missing 'cursor-target' component"
            );
        this.target.addHoverFunction(this.onHover.bind(this));
        this.target.addUnHoverFunction(this.onUnHover.bind(this));
        this.target.addClickFunction(this.onClick.bind(this));

        this.soundClick = this.object.addComponent('howler-audio-source', {
            src: 'sfx/click.wav',
            spatial: true,
        });
        this.soundUnClick = this.object.addComponent('howler-audio-source', {
            src: 'sfx/unclick.wav',
            spatial: true,
        });
    }

    onHover() {
        this.mesh.material = this.hoverMaterial;
    }

    onClick() {
        this.soundClick.play();
    }

    onUnHover() {
        this.mesh.material = this.defaultMaterial;
    }
}
