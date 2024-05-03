/* wle:auto-imports:start */
import {RandomMesh} from './components/random-mesh.js';
import {RotateY} from './components/rotate-y.js';
/* wle:auto-imports:end */

export default function(engine) {
    /* wle:auto-register:start */
engine.registerComponent(RandomMesh);
engine.registerComponent(RotateY);
/* wle:auto-register:end */
}
