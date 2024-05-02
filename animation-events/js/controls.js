import {Component, Property} from '@wonderlandengine/api';
import { GunController } from './gun-controller.js';

/**
 * Controls
 *
 * Responsible for reading input and forwarding it to the gun controller.
 */
export class Controls extends Component {
    static TypeName = 'controls';

    static Properties = {
        shootMouseButton: Property.int(0),
        reloadButton: Property.int(82),
        drawFirstWeaponButton: Property.int(49),
        drawSecondWeaponButton: Property.int(50),
        holsterWeaponButton: Property.int(91)
    };

    init() {
        this.reloadDown = false;
        this.drawFirstDown = false;
        this.drawSecondDown = false;
        this.holsterDown = false;
        this.mouseDown = false;

        window.addEventListener('keydown', this.press.bind(this));
        window.addEventListener('keyup', this.release.bind(this));

        const canvas = this.engine.canvas;
        canvas.addEventListener('mousedown', this.onMouseDown);
        canvas.addEventListener('mouseup', this.onMouseUp);
    }

    onActivate() {
        const canvas = this.engine.canvas;
        canvas.addEventListener('mousedown', this.onMouseDown);
        canvas.addEventListener('mouseup', this.onMouseUp);
    }
    onDeactivate() {
        const canvas = this.engine.canvas;
        canvas.removeEventListener('mousedown', this.onMouseDown);
        canvas.removeEventListener('mouseup', this.onMouseUp);
    }

    start() {
        this.gunController = this.object.getComponent(GunController);
    }

    /** Callback for when a button is pressed */
    press(e) {
        if (e.keyCode === this.reloadButton) {
            if (this.reloadDown) return;
            this.reloadDown = true;
            this.gunController.onReloadInput();
        } else if (e.keyCode === this.drawFirstWeaponButton) {
            if (this.drawFirstDown) return;
            this.drawFirstDown = true;
            this.gunController.onDrawInput(0);
        } else if (e.keyCode === this.drawSecondWeaponButton) {
            if (this.drawSecondDown) return;
            this.drawSecondDown = true;
            this.gunController.onDrawInput(1);
        } else if (e.keyCode === this.holsterWeaponButton) {
            if (this.holsterDown) return;
            this.holsterDown = true;
            this.gunController.onDrawInput(-1);
        }
    }

    /** Callback for when a button is released */
    release(e) {
        if (e.keyCode === this.reloadButton) {
            this.reloadDown = false;
        } else if (e.keyCode === this.drawFirstWeaponButton) {
            this.drawFirstDown = false;
        } else if (e.keyCode === this.drawSecondWeaponButton) {
            this.drawSecondDown = false;
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
        if (e.button === this.shootMouseButton) {
            this.mouseDown = true;
            if (e.button === 1) {
                e.preventDefault();
                return false;
            }
        }
    }

    /** Callback for when a mouse button is released */
    onMouseUp = (e) => {
        if (e.button === this.shootMouseButton) {
            this.mouseDown = false;
        }
    }
}
