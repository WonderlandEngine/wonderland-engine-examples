/* wle:auto-imports:start */
import {MouseLookComponent} from '@wonderlandengine/components';
import {WasdControlsComponent} from '@wonderlandengine/components';
import {HeightMap} from './../js/height-map.js';
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
    ProjectName: 'HeightMap',
    RuntimeBaseName: 'WonderlandRuntime',
    WebXRRequiredFeatures: ['local',],
    WebXROptionalFeatures: ['local','hand-tracking','hit-test',],
};
/* wle:auto-constants:end */

const engine = await loadRuntime(Constants.RuntimeBaseName, RuntimeOptions);

/* wle:auto-register:start */
engine.registerComponent(MouseLookComponent);
engine.registerComponent(WasdControlsComponent);
engine.registerComponent(HeightMap);
/* wle:auto-register:end */

document.getElementById('version')?.remove();
document.getElementById('ar-button')?.remove();
document.getElementById('vr-button')?.remove();

engine.scene.load(`${Constants.ProjectName}.bin`);
