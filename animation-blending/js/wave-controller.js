import {AnimationComponent, Component, Property} from '@wonderlandengine/api';

/**
 * Wave controller
 *
 * Triggers blending between idle and waving.
 * Switching can be done with the `F` key.
 */
export class WaveController extends Component {
    static TypeName = 'wave-controller';

    buttonDown = false;
    waving = false;
    currentBlendFactor = 0.0;
    animator = null;

    init() {
        window.addEventListener('keydown', this.press.bind(this));
        window.addEventListener('keyup', this.release.bind(this));
    }

    start() {
        this.animator = this.object.getComponent(AnimationComponent);
    }

    /** Callback for when a button is pressed */
    press(e) {
        /* F to toggle wave animation */
        if (e.keyCode === 70) {
            if (this.forward) return;
            this.buttonDown = true;
            this.waving = !this.waving;
        }
    }

    /** Callback for when a button is released */
    release(e) {
        if (e.keyCode === 70) {
            this.buttonDown = false;
        }
    }

    update(dt) {
        const targetBlendFactor = this.waving ? 1.0 : 0.0;
        this.currentBlendFactor = this.lerp(this.currentBlendFactor, targetBlendFactor, 5.0*dt);
        /* Clamp blend factor between 0 and 1 */
        if (this.currentBlendFactor <= 0.0) this.currentBlendFactor = 0.0;
        if (this.currentBlendFactor >= 1.0) this.currentBlendFactor = 1.0;
        this.animator.setFloatParameter('blendFactor', this.currentBlendFactor);
    }

    /** Linear interpolate for smooth blending */
    lerp(a, b, t) {
        return a + (b - a)*t;
    }
}
