import {AnimationComponent, Component, MeshComponent, Property} from '@wonderlandengine/api';

/**
 * Controls
 *
 * Responsible for reading input and forwarding it to the gun controller.
 */
export class Controls extends Component {
    static TypeName = 'controls';

    /* Properties that are configurable in the editor */
    static Properties = {
        idleAnim: Property.animation(),
        walkAnim: Property.animation(),
        rotateLeftAnim: Property.animation(),
        rotateRightAnim: Property.animation(),
        meshObject: Property.object(),
        animObject: Property.object()
    };

    forward = false;
    backward = false;
    left = false;
    right = false;
    meshComponent = null;
    animationComponent = null;
    retargetedIdle = null;
    retargetedWalk = null;
    retargetedRotateLeft = null;
    retargetedRotateRight = null;

    init() {
        window.addEventListener('keydown', this.press.bind(this));
        window.addEventListener('keyup', this.release.bind(this));
    }

    start() {
        this.meshComponent = this.meshObject.getComponent(MeshComponent);
        this.animationComponent = this.animObject.getComponent(AnimationComponent);
        this.retargetedIdle = this.idleAnim.retarget(this.meshComponent.skin);
        this.retargetedWalk = this.walkAnim.retarget(this.meshComponent.skin);
        this.retargetedRotateLeft = this.rotateLeftAnim.retarget(this.meshComponent.skin);
        this.retargetedRotateRight = this.rotateRightAnim.retarget(this.meshComponent.skin);
        this.setAnim(this.retargetedIdle, 1.0);
    }

    /** Callback for when a button is pressed */
    press(e) {
        /* Numpad 8 for forward */
        if (e.keyCode === 104) {
            if (this.forward) return;
            this.forward = true;
            this.setAnim(this.retargetedWalk, 1.0);
        /* Numpad 2 for backwards */
        } else if (e.keyCode === 98) {
            if (this.backward) return;
            this.backward = true;
            this.setAnim(this.retargetedWalk, -1.0);
        /* Numpad 4 to rotate left */
        } else if (e.keyCode === 100) {
            if (this.left) return;
            this.left = true;
            this.setAnim(this.retargetedRotateLeft, 1.0, 1);
        /* Numpad 6 to rotate right */
        } else if (e.keyCode === 102) {
            if (this.right) return;
            this.right = true;
            this.setAnim(this.retargetedRotateRight, 1.0, 1);
        }
    }

    /** Callback for when a button is released */
    release(e) {
        if (e.keyCode === 104) {
            this.forward = false;
            this.setAnim(this.backward ? this.retargetedWalk : this.retargetedIdle, this.backward ? -1.0 : 1.0);
        } else if (e.keyCode === 98) {
            this.backward = false;
            this.setAnim(this.forward ? this.retargetedWalk : this.retargetedIdle, 1.0);
        } else if (e.keyCode === 100) {
            this.left = false;
        } else if (e.keyCode === 102) {
            this.right = false;
        }
    }

    setAnim(anim, speed, playCount = 0) {
        this.animationComponent.stop();
        this.animationComponent.animation = anim;
        this.animationComponent.playCount = playCount;
        this.animationComponent.speed = speed;
        this.animationComponent.play();
    }
}
