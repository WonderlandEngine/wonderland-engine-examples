/* wle:auto-imports:start */
import {MouseLookComponent} from '@wonderlandengine/components';
import {WasdControlsComponent} from '@wonderlandengine/components';
import {Rotate} from './../js/rotate.js';
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
    ProjectName: 'MatcapShader',
    RuntimeBaseName: 'WonderlandRuntime',
    WebXRRequiredFeatures: ['local',],
    WebXROptionalFeatures: ['local','hand-tracking','hit-test',],
};
/* wle:auto-constants:end */

const engine = await loadRuntime(Constants.RuntimeBaseName, RuntimeOptions);

/* wle:auto-register:start */
engine.registerComponent(MouseLookComponent);
engine.registerComponent(WasdControlsComponent);
engine.registerComponent(Rotate);
/* wle:auto-register:end */

await engine.scene.load(`${Constants.ProjectName}.bin`);

document.getElementById('version')?.remove();
document.getElementById('ar-button')?.remove();
document.getElementById('vr-button')?.remove();

/* Dispatch scene ready event once the image is loaded.
    * This ensure the test suite takes a screenshot after
    * all resources are available. */
const promises = [new Promise((res) => setTimeout(res, 1000))];
for (const img of engine.wasm._images) {
    if (!(img instanceof HTMLImageElement)) continue;
    if (img.complete) continue;
    promises.push(new Promise((res, rej) => {
        img.addEventListener('load', res, {once: true});
        img.addEventListener('error', rej, {once: true});
    }));
}

await Promise.all(promises);
engine.scene.dispatchReadyEvent();
