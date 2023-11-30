/* wle:auto-imports:start */
import {MouseLookComponent} from '@wonderlandengine/components';
import {WasdControlsComponent} from '@wonderlandengine/components';
/* wle:auto-imports:end */

import {loadRuntime} from '@wonderlandengine/api';

/* wle:auto-constants:start */
const RuntimeOptions = {
    physx: false,
    loader: false,
    xrFramebufferScaleFactor: 1,
    canvas: 'canvas',
};
const Constants = {
    ProjectName: 'Materials',
    RuntimeBaseName: 'WonderlandRuntime',
    WebXRRequiredFeatures: ['local',],
    WebXROptionalFeatures: ['local','hand-tracking','hit-test',],
};
/* wle:auto-constants:end */

const engine = await loadRuntime(Constants.RuntimeBaseName, RuntimeOptions);

/* wle:auto-register:start */
engine.registerComponent(MouseLookComponent);
engine.registerComponent(WasdControlsComponent);
/* wle:auto-register:end */

await engine.scene.load(`${Constants.ProjectName}.bin`);

document.getElementById('version')?.remove();
document.getElementById('ar-button')?.remove();
document.getElementById('vr-button')?.remove();

/* Dispatch scene ready event once the image is loaded.
 * This ensure the test suite takes a screenshot after
 * all resources are available.
 *
 * This example uses compressed images, and there is no current
 * API to listen for compressed images. */
await new Promise((res) => setTimeout(res, 2000));
engine.scene.dispatchReadyEvent();
