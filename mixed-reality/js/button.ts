import {
    Component,
    property,
    Object3D,
    Material,
    MeshComponent,
    InputComponent,
} from '@wonderlandengine/api';
import {
    AudioSource,
    CursorTarget,
    Cursor,
    FingerCursor,
} from '@wonderlandengine/components';

/**
 * Helper function to trigger haptic feedback pulse.
 *
 * @param {Object} object An object with 'input' component attached
 * @param {number} strength Strength from 0.0 - 1.0
 * @param {number} duration Duration in milliseconds
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
 * Use `addClickFunction(() => {})` on the `cursor-target` component used
 * with the button to define the button's action.
 *
 * Supports interaction with `finger-cursor` component for hand tracking.
 */
export class ButtonComponent extends Component {
    static TypeName = 'button';

    @property.object({required: true})
    declare buttonMeshObject: Object3D;

    @property.material({required: true})
    declare hoverMaterial: Material;

    private declare target: CursorTarget;
    private returnPos = new Float32Array(3);

    private declare mesh: MeshComponent;
    private declare defaultMaterial: Material;
    private declare soundClick: AudioSource;
    private declare soundUnClick: AudioSource;

    start() {
        this.mesh = this.buttonMeshObject.getComponent(MeshComponent)!;
        this.defaultMaterial = this.mesh.material!;
        this.buttonMeshObject.getPositionLocal(this.returnPos);

        this.target =
            this.object.getComponent(CursorTarget) ||
            this.object.addComponent(CursorTarget);

        this.soundClick = this.object.addComponent(AudioSource, {
            src: 'sfx/click.wav',
            spatial: true,
        });
        this.soundUnClick = this.object.addComponent(AudioSource, {
            src: 'sfx/unclick.wav',
            spatial: true,
        });
    }

    onActivate() {
        this.target.onHover.add(this.handleHover);
        this.target.onUnhover.add(this.handleUnHover);
        this.target.onDown.add(this.handleDown);
        this.target.onUp.add(this.handleUp);
    }

    onDeactivate() {
        this.target.onHover.remove(this.handleHover);
        this.target.onUnhover.remove(this.handleUnHover);
        this.target.onDown.remove(this.handleDown);
        this.target.onUp.remove(this.handleUp);
    }

    private handleHover = (_: Object3D, cursor: Cursor | FingerCursor) => {
        this.mesh.material = this.hoverMaterial;
        if (cursor.type === 'finger-cursor') {
            this.handleDown(_, cursor);
        }

        hapticFeedback(cursor.object, 0.5, 50);
    };

    private handleDown = (_: Object3D, cursor: Cursor | FingerCursor) => {
        this.soundClick.play();
        this.buttonMeshObject.translateLocal([0.0, -0.1, 0.0]);
        hapticFeedback(cursor.object, 1.0, 20);
    };

    private handleUp = (_: Object3D, cursor: Cursor | FingerCursor) => {
        this.soundUnClick.play();
        this.buttonMeshObject.setPositionLocal(this.returnPos);
        hapticFeedback(cursor.object, 0.7, 20);
    };

    private handleUnHover = (_: Object3D, cursor: Cursor | FingerCursor) => {
        this.mesh.material = this.defaultMaterial;
        if (cursor.type === 'finger-cursor') {
            this.handleUp(_, cursor);
        }

        hapticFeedback(cursor.object, 0.3, 50);
    };
}
