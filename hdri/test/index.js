/* wle:auto-imports:start */
import {MouseLookComponent} from '@wonderlandengine/components';
import {WasdControlsComponent} from '@wonderlandengine/components';
/* wle:auto-imports:end */

import {loadRuntime} from '@wonderlandengine/api';

/* wle:auto-constants:start */
const Constants = {
    ProjectName: 'HDRI',
    RuntimeBaseName: 'WonderlandRuntime',
    WebXRRequiredFeatures: ['local',],
    WebXROptionalFeatures: ['local','hand-tracking','hit-test',],
};
const RuntimeOptions = {
    physx: false,
    loader: false,
    xrFramebufferScaleFactor: 1,
    xrOfferSession: {
        mode: 'auto',
        features: Constants.WebXRRequiredFeatures,
        optionalFeatures: Constants.WebXROptionalFeatures,
    },
    canvas: 'canvas',
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
 * all resources are available. */

await engine.imagesPromise;

engine.scene.dispatchReadyEvent();
