import {Component, MeshComponent, Property} from '@wonderlandengine/api';

export class AnimateWeights extends Component {
    static TypeName = 'animate-weights';
    static Properties = {
        strength: Property.float(1.0),
        speed: Property.float(1.0),
    };

    start() {
        this.meshComponent = this.object.getComponents(MeshComponent).find((c) => c.morphTargets !== null);
        const targetCount = this.meshComponent.morphTargets.count;
        this.weights = (new Array(targetCount)).fill(0.0).map((_, i) => 1.0/targetCount*i);
        this.directions = (new Array(targetCount)).fill(true);
    }

    update(dt) {
        for(let i = 0; i < this.weights.length; ++i) {
            const direction = this.directions[i] ? 1.0 : -1.0;
            this.weights[i] = (this.weights[i] + this.speed*direction*dt);
            if (this.weights[i] > this.strength) {
                this.directions[i] = !this.directions[i];
                this.weights[i] -= 2.0*(this.weights[i] % this.strength);
            } else if (this.weights[i] < 0.0) {
                this.directions[i] = !this.directions[i];
                this.weights[i] *= -1.0;
            }
        }
        this.meshComponent.setMorphTargetWeights(this.weights);
    }
}
