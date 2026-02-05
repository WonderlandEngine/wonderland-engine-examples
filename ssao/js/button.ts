import { Component, InputComponent, Material, MeshComponent, Object3D, property, Scene } from "@wonderlandengine/api";
import { CursorTarget } from "@wonderlandengine/components";

/**
 * Helper function to trigger haptic feedback pulse.
 *
 * @param object An object with 'input' component attached.
 * @param strength Strength from 0.0 - 1.0.
 * @param duration Duration in milliseconds.
 */
export function hapticFeedback(object: Object3D, strength: number, duration: number) {
    const input = object.getComponent(InputComponent);
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
 * Use `target.onClick.add(() => {})` on the `cursor-target` component used
 * with the button to define the button's action.
 *
 * Supports interaction with `finger-cursor` component for hand tracking.
 */
export class ButtonComponent extends Component {
    static TypeName = 'button';

    static onRegister(engine) {
        engine.registerComponent(CursorTarget);
    }

    /** Object that has the button's mesh attached */
    @property.object({required: true})
    buttonMeshObject: Object3D;

    /** Material to apply when the user hovers the button */
    @property.material({required: true})
    hoverMaterial: Material;

    /* Position to return to when "unpressing" the button */
    returnPos = new Float32Array(3);

    private mesh: MeshComponent;
    private defaultMaterial: Material;
    private target: CursorTarget;

    private _intensity = 1.0;

    start() {
        this.mesh = this.buttonMeshObject.getComponent(MeshComponent);
        this.defaultMaterial = this.mesh.material;
        this.object.getPositionLocal(this.returnPos);

        this.target =
            this.object.getComponent(CursorTarget) ||
            this.object.addComponent(CursorTarget);

        this._intensity = (this.scene as Scene).ssao.intensity;
    }

    onActivate() {
        this.target.onHover.add(this._onHover);
        this.target.onUnhover.add(this._onUnhover);
        this.target.onDown.add(this._onDown);
        this.target.onUp.add(this._onUp);
    }

    onDeactivate() {
        this.target.onHover.remove(this._onHover);
        this.target.onUnhover.remove(this._onUnhover);
        this.target.onDown.remove(this._onDown);
        this.target.onUp.remove(this._onUp);
    }

    /* Called by 'cursor-target' */
    private _onHover = (_, cursor) => {
        this.mesh.material = this.hoverMaterial;
        if (cursor.type === 'finger-cursor') {
            this._onDown(_, cursor);
        }
        hapticFeedback(cursor.object, 0.5, 50);
    };

    /* Called by 'cursor-target' */
    private _onDown = (_, cursor) => {
        this.object.translateLocal([0.0, 0.0, -0.05]);
        hapticFeedback(cursor.object, 1.0, 20);

        const scene = this.scene as Scene;
        scene.ssao.intensity = this._intensity - scene.ssao.intensity;
    };

    /* Called by 'cursor-target' */
    private _onUp = (_, cursor) => {
        this.object.setPositionLocal(this.returnPos);
        hapticFeedback(cursor.object, 0.7, 20);
    };

    /* Called by 'cursor-target' */
    private _onUnhover = (_, cursor) => {
        this.mesh.material = this.defaultMaterial;
        if (cursor.type === 'finger-cursor') {
            this._onUp(_, cursor);
        }

        hapticFeedback(cursor.object, 0.3, 50);
    };
}
