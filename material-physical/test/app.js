import {loadRuntime} from '@wonderlandengine/api';

/* wle:auto-constants:start */
const Constants = {
    ProjectName: 'MaterialPhysical',
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

await engine.loadMainScene({
    url: `${Constants.ProjectName}.bin`,
    waitForDependencies: true,
    dispatchReadyEvent: false
});
