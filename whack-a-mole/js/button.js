import {Component, MeshComponent, Property} from '@wonderlandengine/api';
import {CursorTarget, HowlerAudioSource} from '@wonderlandengine/components';

/**
 * Helper function to trigger haptic feedback pulse.
 *
 * @param {Object} object An object with 'input' component attached
 * @param {number} strength Strength from 0.0 - 1.0
 * @param {number} duration Duration in milliseconds
 */
export function hapticFeedback(object, strength, duration) {
    const input = object.getComponent('input');
    if (input && input.xrInputSource) {
        const gamepad = input.xrInputSource.gamepad;
        if (gamepad && gamepad.hapticActuators)
            gamepad.hapticActuators[0].pulse(strength, duration);
    }
}

/**
 * Button component.
 *
 * Shows a 'hoverMaterial' on cursor hover, moves backward on cursor down,
 * returns to its position on cursor up, plays click/unclick sounds and haptic
 * feedback on hover.
 *
 * Use `addClickFunction(() => {})` on the `cursor-target` component used
 * with the button to define the button's action.
 *
 * Supports interaction with `finger-cursor` component for hand tracking.
 */
export class ButtonComponent extends Component {
    static TypeName = 'button';
    static Properties = {
        buttonMeshObject: Property.object(),
        hoverMaterial: Property.material(),
    };
    static Dependencies = [
        HowlerAudioSource
    ];

    /* Position to return to when "unpressing" the button */
    returnPos = new Float32Array(3);

    start() {
        this.mesh = this.buttonMeshObject.getComponent(MeshComponent);
        this.defaultMaterial = this.mesh.material;
        this.buttonMeshObject.getTranslationLocal(this.returnPos);

        const target =
            this.object.getComponent(CursorTarget) ||
            this.object.addComponent(CursorTarget);

        target.addHoverFunction(this.onHover.bind(this));
        target.addUnHoverFunction(this.onUnHover.bind(this));
        target.addDownFunction(this.onDown.bind(this));
        target.addUpFunction(this.onUp.bind(this));

        this.soundClick = this.object.addComponent(HowlerAudioSource, {
            src: 'sfx/click.wav',
            spatial: true,
        });
        this.soundUnClick = this.object.addComponent(HowlerAudioSource, {
            src: 'sfx/unclick.wav',
            spatial: true,
        });
    }

    /* Called by 'cursor-target' */
    onHover(_, cursor) {
        this.mesh.material = this.hoverMaterial;
        if (cursor.type === 'finger-cursor') {
            this.onDown(_, cursor);
        }

        hapticFeedback(cursor.object, 0.5, 50);
    }

    /* Called by 'cursor-target' */
    onDown(_, cursor) {
        this.soundClick.play();
        this.buttonMeshObject.translate([0.0, -0.1, 0.0]);
        hapticFeedback(cursor.object, 1.0, 20);
    }

    /* Called by 'cursor-target' */
    onUp(_, cursor) {
        this.soundUnClick.play();
        this.buttonMeshObject.setTranslationLocal(this.returnPos);
        hapticFeedback(cursor.object, 0.7, 20);
    }

    /* Called by 'cursor-target' */
    onUnHover(_, cursor) {
        this.mesh.material = this.defaultMaterial;
        if (cursor.type === 'finger-cursor') {
            this.onUp(_, cursor);
        }

        hapticFeedback(cursor.object, 0.3, 50);
    }
}
