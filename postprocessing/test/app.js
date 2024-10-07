import {loadRuntime} from '@wonderlandengine/api';
import {runScreenshotTest} from '../../test-utils.js';

/* wle:auto-constants:start */
const Constants = {
    ProjectName: 'Postprocessing',
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

document.getElementById('version')?.remove();
document.getElementById('ar-button')?.remove();
document.getElementById('vr-button')?.remove();

await engine.loadMainScene({
    url: `${Constants.ProjectName}.bin`,
    waitForDependencies: true,
    dispatchReadyEvent: false
});
runScreenshotTest(engine);
