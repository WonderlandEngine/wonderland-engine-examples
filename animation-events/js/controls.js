import {Component, Property} from '@wonderlandengine/api';
import { GunController } from './gun-controller.js';

/**
 * Controls
 *
 * Responsible for reading input and forwarding it to the gun controller.
 */
export class Controls extends Component {
    static TypeName = 'controls';

    reloadDown = false;
    drawWeaponDown = false;
    holsterDown = false;
    mouseDown = false;

    keydownCallback = null;
    keyupCallback = null;

    onActivate() {
        this.keydownCallback = this.press.bind(this);
        this.keyupCallback = this.release.bind(this);

        window.addEventListener('keydown', this.keydownCallback);
        window.addEventListener('keyup', this.keyupCallback);

        const canvas = this.engine.canvas;
        canvas.addEventListener('mousedown', this.onMouseDown);
        canvas.addEventListener('mouseup', this.onMouseUp);
    }
    onDeactivate() {
        window.removeEventListener('keydown', this.keydownCallback);
        window.removeEventListener('keyup', this.keyupCallback);

        const canvas = this.engine.canvas;
        canvas.removeEventListener('mousedown', this.onMouseDown);
        canvas.removeEventListener('mouseup', this.onMouseUp);
    }

    start() {
        this.gunController = this.object.getComponent(GunController);
    }

    /** Callback for when a button is pressed */
    press(e) {
        /* R to reload */
        if (e.keyCode === 82) {
            if (this.reloadDown) return;
            this.reloadDown = true;
            this.gunController.onReloadInput();
        /* 1 to draw weapon */
        } else if (e.keyCode === 49) {
            if (this.drawWeaponDown) return;
            this.drawWeaponDown = true;
            this.gunController.onDrawInput(0);
        /* F to holster weapon */
        } else if (e.keyCode === 70) {
            if (this.holsterDown) return;
            this.holsterDown = true;
            this.gunController.onDrawInput(-1);
        }
    }

    /** Callback for when a button is released */
    release(e) {
        if (e.keyCode === 82) {
            this.reloadDown = false;
        } else if (e.keyCode === 49) {
            this.drawWeaponDown = false;
        } else if (e.keyCode === 70) {
            this.holsterDown = false;
        }
    }

    update(dt) {
        if (this.mouseDown) {
            this.gunController.onShootInput(dt);
        } else {
            this.gunController.onShootInputEnd(dt);
        }
    }

    /** Callback for when a mouse button is down */
    onMouseDown = (e) => {
        /* Left mouse button */
        if (e.button === 0) {
            this.mouseDown = true;
            if (e.button === 1) {
                e.preventDefault();
                return false;
            }
        }
    }

    /** Callback for when a mouse button is released */
    onMouseUp = (e) => {
        /* Left mouse button */
        if (e.button === 0) {
            this.mouseDown = false;
        }
    }
}
