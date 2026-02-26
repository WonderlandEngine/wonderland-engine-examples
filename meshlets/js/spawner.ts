import {Component, Object3D} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';

/**
 * spawner
 */
export class Spawner extends Component {
    static TypeName = 'spawner';

    /* Properties that are configurable in the editor */

    @property.object()
    prefab!: Object3D;

    start() {
        const instancePerAxis = 32;
        const dist = 10;
        for(let i = 0; i < instancePerAxis*instancePerAxis; ++i) {
            let x = (i%instancePerAxis)*dist - dist*instancePerAxis*0.5;
            let z = Math.ceil(i/instancePerAxis)*dist - dist*instancePerAxis*0.5;

            const object = this.prefab.clone();
            object.setPositionWorld([x , 0.0, z]);
        }
    }

    update(dt: number) {
        /* Called every frame. */
    }
}
