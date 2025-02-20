import {runScreenshotTestWebGL2AndWebGPU} from '../../test-utils.js';

/* wle:auto-constants:start */
const Constants = {
    ProjectName: 'BasicScene',
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

await runScreenshotTestWebGL2AndWebGPU(Constants.ProjectName, Constants.RuntimeBaseName, RuntimeOptions);
