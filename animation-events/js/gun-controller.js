import {Component, Property} from '@wonderlandengine/api';
import { Gun } from './gun.js';

/**
 * Gun controller
 *
 * Responsible for controlling the currently equiped gun,
 * by forwarding input from Controls to the equiped gun.
 * Also responsible for keeping track of which gun is currently equiped,
 * and swapping between guns.
 */
export class GunController extends Component {
    static TypeName = 'gun-controller';
    /* Properties that are configurable in the editor */
    static Properties = {
        firstGunObject: Property.object(),
        secondGunObject: Property.object(),
    };

    init() {
        this.fireTimer = 0.0;
        this.shootDown = false;
    }

    start() {
        this.guns = new Array();
        this.guns.push(this.firstGunObject.getComponent(Gun));

        if (this.secondGunObject)
            this.guns.push(this.secondGunObject.getComponent(Gun));

        this.gun = null;
        this.nextGun = null;
    }

    update(dt) {
        if (this.fireTimer > 0.0) {
            this.fireTimer -= dt;
        }
    }

    /** Forward the start of a shoot input */
    onShootInput() {
        if (!this.gun) return;
        if (this.shootDown && this.gun.semiAuto) return;
        this.shootDown = true;
        const canShoot = this.fireTimer <= 0.0 && this.gun.canShoot();
        if (!canShoot) return;
        this.fireTimer = 60 / this.gun.fireRate;
        this.gun.shoot();
    }

    /** Forward the end of a shoot input */
    onShootInputEnd() {
        if (this.shootDown && this.gun && !this.gun.semiAuto)
            this.gun.idle();

        this.shootDown = false;
    }

    /** Forward a reload input */
    onReloadInput() {
        if (!this.gun) return;
        if (this.gun.reloading) {
            this.gun.cancelReload();
            return;
        }
        if (this.gun.isFull()) return;
        this.gun.reload();
    }

    /**
     * Forward draw weapon input
     *
     * @param index Index of the weapon to draw, or -1 to holster
     *
     * First triggers the holster animation on the currently equiped weapon.
     * If the index is not -1 it listens to the hide event of the gun.
     */
    onDrawInput(index) {
        if (index != -1 && this.guns[index].drawn) return;

        this.nextGun = index == -1 ? null : this.guns[index];
        if (this.gun) {
            this.gun.hide();
            this.gun.onHide.add(this.onHideGun.bind(this));
            return;
        }
        this.gun = this.nextGun;
        this.gun.draw();
    }

    /** Callback for when the currently equiped gun has holstered */
    onHideGun() {
        this.gun = this.nextGun;
        this.gun.draw();
    }
}
