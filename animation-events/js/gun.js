import {AnimationComponent, Component, Emitter, Property} from '@wonderlandengine/api';

/**
 * Configurable gun script
 *
 * A gun can be configured by the following 3 properties:
 * - Firing mode: Does the gun fire semi or full auto
 * - Fire rate: How many bullets the gun can shoot per second
 * - Mag size: Maximum number of bullets that can be fired before having to reload
 *
 * This script is responsible for playing animations, listening to animation events
 * and keeping track of the ammo currently loaded in the gun, as well as reloading.
 */
export class Gun extends Component {
    static AnimationNames = {
        Idle: "idle",
        Draw: "draw",
        Hide: "hide",
        Shoot: "shoot",
        Reload: "reload",
        FullReload: "fullreload",
    };

    static TypeName = 'gun';
    /* Properties that are configurable in the editor */
    static Properties = {
        semiAuto: Property.bool(false),
        fireRate: Property.float(650.0),
        magSize: Property.int(30),
        animationsObject: Property.object(),
        idleAnimation: Property.animation(),
        drawAnimation: Property.animation(),
        shootAnimation: Property.animation(),
        reloadAnimation: Property.animation(),
        fullReloadAnimation: Property.animation(),
        hideAnimation: Property.animation(),
    };

    init() {
        this.drawing = false;
        this.drawn = false;
        this.reloading = false;
        this.chambered = false;

        this.animators = new Map();

        this.onHide = new Emitter();
    }

    start() {
        this.animationComponents = this.animationsObject.getComponents(AnimationComponent);
        this.mag = this.magSize;

        this.animators.set(Gun.AnimationNames.Idle, this.findAnimator(this.idleAnimation));
        this.animators.set(Gun.AnimationNames.Draw, this.findAnimator(this.drawAnimation));
        this.animators.set(Gun.AnimationNames.Hide, this.findAnimator(this.hideAnimation));
        this.animators.set(Gun.AnimationNames.Shoot, this.findAnimator(this.shootAnimation));
        this.animators.set(Gun.AnimationNames.Reload, this.findAnimator(this.reloadAnimation));
        this.animators.set(Gun.AnimationNames.FullReload, this.findAnimator(this.fullReloadAnimation));

        const drawAnimator = this.animators.get(Gun.AnimationNames.Draw);
        if (drawAnimator) {
            drawAnimator.onEvent.add(this.onDrawEvent.bind(this));
            drawAnimator.onEvent.add(this.onEndEvent.bind(this));
        }

        const shootAnimator = this.animators.get(Gun.AnimationNames.Shoot);
        if (shootAnimator) {
            shootAnimator.onEvent.add(this.onShootEvent.bind(this));
            shootAnimator.onEvent.add(this.onEndEvent.bind(this));
        }

        const reloadAnimator = this.animators.get(Gun.AnimationNames.Reload);
        if (reloadAnimator) {
            reloadAnimator.onEvent.add(this.onReloadEvent.bind(this));
            reloadAnimator.onEvent.add(this.onEndEvent.bind(this));
        }

        const fullReloadAnimator = this.animators.get(Gun.AnimationNames.FullReload);
        if (fullReloadAnimator) {
            fullReloadAnimator.onEvent.add(this.onReloadEvent.bind(this));
            fullReloadAnimator.onEvent.add(this.onEndEvent.bind(this));
        }

        const hideAnimator = this.animators.get(Gun.AnimationNames.Hide);
        if (hideAnimator) {
            hideAnimator.onEvent.add(this.onHideEvent.bind(this));
            hideAnimator.onEvent.add(this.onEndEvent.bind(this));
        } else {
            drawAnimator.onEvent.add(this.onHideEvent.bind(this));
        }

        this.hideObject();
    }

    /** Play the shoot animation and reduce the ammo count by 1 */
    shoot() {
        console.log('shoot!');
        this.playAnimation(Gun.AnimationNames.Shoot);
        --this.mag;
    }

    /** Check whether the gun can shoot */
    canShoot() {
        return !this.reloading && this.drawn && this.mag > 0;
    }

    /** Unhide and play the draw animation on the gun */
    draw() {
        if (this.drawn) return;
        this.drawing = true;
        this.showObject();
        this.playAnimation(Gun.AnimationNames.Draw);
    }

    /** Is the mag full? */
    isFull() {
        return this.mag >= this.magSize;
    }

    /**
     * Reload the gun
     *
     * Takes into account that a bullet could already be chambered into the gun
     * so plays a different animation for an empty and non-empty mag.
     */
    reload() {
        if (this.mag == 0) {
            this.playAnimation(Gun.AnimationNames.FullReload);
            this.chambered = false;
        } else {
            this.playAnimation(Gun.AnimationNames.Reload);
            this.chambered = true;
        }
        this.reloading = true;
    }

    /**
     * Play the holster animation on the gun,
     * which is the draw/unholster animation in reverse
     * */
    hide() {
        this.cancelReload();
        this.drawn = false;
        if (!this.hideAnimation) {
            this.playAnimationReverse(Gun.AnimationNames.Draw);
        } else {
            this.playAnimationReverse(Gun.AnimationNames.Hide);
        }
    }

    /** Play the idle animation on the gun */
    idle() {
        this.playAnimationReverse(Gun.AnimationNames.Idle);
    }

    /**
     * Cancel the reload, this stops the reload animation
     *
     * If the reload event already triggered on the animation,
     * this allows the player to skip part of the reload animation.
     * This is done in some games to add an extra layer of skill
     * to reloading by having to time the cancel as closely
     * to the reload timing as possible.
     */
    cancelReload() {
        if (!this.reloading) return;
        this.stopAnimation(Gun.AnimationNames.Reload);
        this.stopAnimation(Gun.AnimationNames.FullReload);
        this.reloading = false;
        this.playAnimation(Gun.AnimationNames.Idle);
    }

    /**
     * Play an animation on the gun
     *
     * @param anim Name of the animation to play, see AnimationNames
     */
    playAnimation(anim) {
        this.stopAnimation(Gun.AnimationNames.Idle);
        const animator = this.animators.get(anim);
        if (!animator) return;
        animator.stop();
        animator.speed = 1.0;
        animator.play();
    }

    /**
     * Play an animation on the gun in reverse
     *
     * @param anim Name of the animation to play, see AnimationNames
     */
    playAnimationReverse(anim) {
        this.stopAnimation(Gun.AnimationNames.Idle);
        const animator = this.animators.get(anim);
        if (!animator) return;
        animator.stop();
        animator.speed = -1.0;
        animator.play();
    }

    /**
     * Stop an animation on the gun
     *
     * @param anim Name of the animation to stop, see AnimationNames
     */
    stopAnimation(anim) {
        this.animators.get(anim)?.stop();
    }

    /**
     * Find an animation component for the given animation
     *
     * @param anim Name of the animation to find a component for, see AnimationNames
     */
    findAnimator(anim) {
        for (var i = 0; i < this.animationComponents.length; ++i) {
            if (this.animationComponents[i].animation.equals(anim)) {
                return this.animationComponents[i];
            }
        }
        return null;
    }

    /** Callback for the draw animation event */
    onDrawEvent(name) {
        if (name != "draw" || !this.drawing) return;
        this.drawn = true;
        this.drawing = false;
        this.playAnimation(Gun.AnimationNames.Idle);
    }

    /** Callback for the shoot animation event */
    onShootEvent(name) {
        if (name != "shoot") return;
        console.log("Shoot Event!");
    }

    /** Callback for the reload animation event */
    onReloadEvent(name) {
        if (name != "reload") return;
        this.mag = this.magSize;
        if (this.chambered) ++this.mag;
    }

    /** Callback for event placed at the end of every animation */
    onEndEvent(name) {
        if (name != "end") return;
        if (this.reloading) {
            this.cancelReload();
            return;
        }

        if (!this.drawn) return;
        this.playAnimation(Gun.AnimationNames.Idle);
    }

    /** Callback for the hide animation event */
    onHideEvent(name) {
        if (name != "hide" || this.drawing) return;
        this.onHide.notify();
        this.hideObject();
    }

    /** Hide the gun object */
    hideObject() {
        this.object.setPositionLocal([0,100,0]);
    }

    /** Show the gun object */
    showObject() {
        this.object.setPositionLocal([0,0,0]);
    }
}
