/**
 * /!\ This file is auto-generated.
 *
 * This is the entry point of your standalone application.
 *
 * There are multiple tags used by the editor to inject code automatically:
 *     - `wle:auto-imports:start` and `wle:auto-imports:end`: The list of import statements
 *     - `wle:auto-register:start` and `wle:auto-register:end`: The list of component to register
 *     - `wle:auto-constants:start` and `wle:auto-constants:end`: The project's constants,
 *        such as the project's name, whether it should use the physx runtime, etc...
 *     - `wle:auto-benchmark:start` and `wle:auto-benchmark:end`: Append the benchmarking code
 */

/* wle:auto-imports:start */
import {CursorTarget} from '@wonderlandengine/components';
import {ButtonComponent} from './components/button.js';
import {SceneSwitcher} from './components/scene-switcher.js';
/* wle:auto-imports:end */

export default function(engine) {
    /* wle:auto-register:start */
engine.registerComponent(CursorTarget);
engine.registerComponent(ButtonComponent);
engine.registerComponent(SceneSwitcher);
/* wle:auto-register:end */
}
