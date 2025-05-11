/**
 * /!\ This file is auto-generated.
 *
 * This is the entry point of your standalone application.
 *
 * There are multiple tags used by the editor to inject code automatically:
 *     - `wle:auto-imports:start` and `wle:auto-imports:end`: The list of import statements
 *     - `wle:auto-register:start` and `wle:auto-register:end`: The list of component to register
 */

/* wle:auto-imports:start */
import {MouseLookComponent} from '@wonderlandengine/components';
import {WasdControlsComponent} from '@wonderlandengine/components';
import {DancingPillars} from './dancing-pillars.js';
import {DisableOldVersionWarning} from './disable-old-version-warning.js';
import {DisableReversezWarning} from './disable-reversez-warning.js';
import {DistanceSigns} from './distance-signs.js';
import {Stars} from './stars.js';
/* wle:auto-imports:end */

export default function(engine) {
/* wle:auto-register:start */
engine.registerComponent(MouseLookComponent);
engine.registerComponent(WasdControlsComponent);
engine.registerComponent(DancingPillars);
engine.registerComponent(DisableOldVersionWarning);
engine.registerComponent(DisableReversezWarning);
engine.registerComponent(DistanceSigns);
engine.registerComponent(Stars);
/* wle:auto-register:end */
}
