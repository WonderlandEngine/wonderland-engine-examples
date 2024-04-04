/* wle:auto-imports:start */
import {Cursor} from '@wonderlandengine/components';
import {HandTracking} from '@wonderlandengine/components';
import {HowlerAudioListener} from '@wonderlandengine/components';
import {MouseLookComponent} from '@wonderlandengine/components';
import {PlayerHeight} from '@wonderlandengine/components';
import {TeleportComponent} from '@wonderlandengine/components';
import {VrModeActiveSwitch} from '@wonderlandengine/components';
import {WasdControlsComponent} from '@wonderlandengine/components';
import {Portal} from './js/portal.js';
import {SwitchScene} from './js/switch.js';
/* wle:auto-imports:end */

export default function registerSceneComponents(engine) {
	/* wle:auto-register:start */
engine.registerComponent(Cursor);
engine.registerComponent(HandTracking);
engine.registerComponent(HowlerAudioListener);
engine.registerComponent(MouseLookComponent);
engine.registerComponent(PlayerHeight);
engine.registerComponent(TeleportComponent);
engine.registerComponent(VrModeActiveSwitch);
engine.registerComponent(WasdControlsComponent);
engine.registerComponent(Portal);
engine.registerComponent(SwitchScene);
/* wle:auto-register:end */
}
