import {loadRuntime} from '@wonderlandengine/api';

/* wle:auto-constants:start */
const Constants = {
    ProjectName: 'HeightMap',
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

RuntimeOptions.threads = false; /* Disabled for testing on any browser */
RuntimeOptions.simd = false;

const engine = await loadRuntime(Constants.RuntimeBaseName, RuntimeOptions);

/* Remove them to avoid having the css animation pop during the screenshot */
document.getElementById('version')?.remove();
document.getElementById('ar-button')?.remove();
document.getElementById('vr-button')?.remove();

/* Event is dispatched after the heightmap generation */
await engine.loadMainScene({
    url: `${Constants.ProjectName}.bin`,
    waitForDependencies: true,
    dispatchReadyEvent: false
});
