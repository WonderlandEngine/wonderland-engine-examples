/* wle:auto-imports:start */
/* wle:auto-imports:end */

import {loadRuntime} from '@wonderlandengine/api';

/* wle:auto-constants:start */
/* wle:auto-constants:end */

const engine = await loadRuntime(Constants.RuntimeBaseName, RuntimeOptions);

/* wle:auto-register:start */
/* wle:auto-register:end */

await engine.loadMainScene(`${Constants.ProjectName}.bin`);

/* Find animation component, and stop them. */
const stack = [...engine.scene.children];
while (stack.length) {
    const obj = stack.pop();
    stack.push(...obj.children);

    const animation = obj.getComponent('animation');
    if (!animation) continue;

    animation.stop();
}

document.getElementById('version')?.remove();
document.getElementById('ar-button')?.remove();
document.getElementById('vr-button')?.remove();

await new Promise((res) => setTimeout(res, 500));
engine.scene.dispatchReadyEvent();
