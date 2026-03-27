import {Component, Property} from '@wonderlandengine/api';
import {Grabbable} from 'wle-Interaction';
import {HowlerAudioSource} from "@wonderlandengine/components";

let hammerGrabbableUpdate;

export class CustomGrabbable extends Grabbable {
    static TypeName = 'custom-grababble';

    start() {
        super.start();
        hammerGrabbableUpdate = this._update.bind(this);
    }

    update(dt) {
        // overwrite original update logic
    }

    _update(dt) {
        super.update(dt);
    }
}

/**
 * climbing-mechanics
 */
export class HammerMechanics extends Component {
    static TypeName = 'hammer-mechanics';
    /* Properties that are configurable in the editor */
    static Properties = {
        fullHammerObject: Property.object(),
        gameLogicParent: Property.object()
    };
    /* Add other component types here that your component may
     * create. They will be registered with this component */
    static Dependencies = [];
    lastValidPosition = [];

    init() {
        this.currentPoints = 0;
        this.currentHitMole = null;
        console.log('init() with param', this.param);
    }

    start() {
        console.log('start() with param', this.param);
        this.collisions = this.object.children.filter(child => child.name.endsWith("Collision.Hammer")).map(comp => comp.getComponent('collision'));
        this.handedness = ['left', 'right'][this.handedness];
        this.gameLogicComponent = this.gameLogicParent.getComponent('game-logic');
    }

    update(dt) {
        if (hammerGrabbableUpdate) {
            hammerGrabbableUpdate(dt);
        }
        const overlaps = [];
        this.collisions.forEach(col => overlaps.push(...col.queryOverlaps()));
        if (overlaps && overlaps.length > 0) {
            const comp = overlaps[0];
            if (comp.object.name.endsWith('Controller') || comp.object.name.endsWith('hammer')) {
                return;
            }
            if (comp.object.name.endsWith('MoleTable')) {
                console.log("hit a cube!, setting back to initial hammer position", this.lastValidPositionHammer)
                this.fullHammerObject.setPositionWorld(this.lastValidPositionHammer);
                return;
            }
            if (this.currentHitMole && this.currentHitMole.name === comp.object.parent.name) {
                console.log("cannot hit the same mole multiple times!");
                return;
            }
            // collision is a child objet on the mole object
            this.currentHitMole = comp.object.parent;
            console.log("setting timeout for current hit more", this.currentHitMole.name, comp.object.parent.name);
            setTimeout(() => {
                const currentHitMoleName = this.currentHitMole.name;
                this.currentHitMole = null;
                console.log("Reset current hit mole!", currentHitMoleName)
            }, 1000)
            console.log("Overlapping with a Mole, update points!", this.currentHitMole.name);

            this.gameLogicComponent.hitCurrentMole();
            const audioSource = this.object.parent.parent.getComponent(HowlerAudioSource);
            if (audioSource) {
                console.log("found audio source", audioSource);
                audioSource.play();
            }

        } else {
            this.lastValidPositionHammer = this.fullHammerObject.getPositionWorld();
        }
    }
}
