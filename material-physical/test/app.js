import {Generator} from '../js/generator.js';
import {runScreenshotTest} from '../../test-utils.js';

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

const start = Generator.prototype.start;
Generator.prototype.start = function() {
    start.bind(this)();
};

await runScreenshotTest(Constants.ProjectName, Constants.RuntimeBaseName, RuntimeOptions);
