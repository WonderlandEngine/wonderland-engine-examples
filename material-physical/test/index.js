/* wle:auto-imports:start */
/* wle:auto-imports:end */

import {loadRuntime} from '@wonderlandengine/api';

/* wle:auto-constants:start */
/* wle:auto-constants:end */

const engine = await loadRuntime(Constants.RuntimeBaseName, RuntimeOptions);

/* wle:auto-register:start */
/* wle:auto-register:end */

await engine.scene.load(`${Constants.ProjectName}.bin`);

document.getElementById('version')?.remove();
document.getElementById('ar-button')?.remove();
document.getElementById('vr-button')?.remove();
engine.scene.dispatchReadyEvent();
