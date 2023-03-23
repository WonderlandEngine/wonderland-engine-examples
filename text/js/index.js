/**
 * /!\ This file is auto-generated.
 *
 * This is the entry point of your standalone application.
 *
 * You should register the component you need here, e.g.,
 *
 * ```
 * import { MyComponent } from './my-component.js';
 *
 * WL.registerComponent(MyComponent);
 * ```
 *
 * The `wle:auto-imports:start` and `wle:auto-imports:end` comments are
 * used by the editor as a target for the import list.
 */

/* wle:auto-imports:start */
import {
    ARCamera8thwall,
    Cursor,
    CursorTarget,
    DebugObject,
    DeviceOrientationLook,
    FingerCursor,
    FixedFoveation,
    HandTracking,
    HitTestLocation,
    HowlerAudioListener,
    HowlerAudioSource,
    ImageTexture,
    MouseLookComponent,
    PlayerHeight,
    TargetFramerate,
    TeleportComponent,
    Trail,
    TwoJointIkSolver,
    VideoTexture,
    VrModeActiveSwitch,
    Vrm,
    WasdControlsComponent,
} from '@wonderlandengine/components';
WL.registerComponent(
    ARCamera8thwall,
    Cursor,
    CursorTarget,
    DebugObject,
    DeviceOrientationLook,
    FingerCursor,
    FixedFoveation,
    HandTracking,
    HitTestLocation,
    HowlerAudioListener,
    HowlerAudioSource,
    ImageTexture,
    MouseLookComponent,
    PlayerHeight,
    TargetFramerate,
    TeleportComponent,
    Trail,
    TwoJointIkSolver,
    VideoTexture,
    VrModeActiveSwitch,
    Vrm,
    WasdControlsComponent
);
import {LookAtPlayer} from './look-at-player.js';
WL.registerComponent(LookAtPlayer);
import {TextChangeSpacing} from './text-change-spacing.js';
WL.registerComponent(TextChangeSpacing);
import {TextScroller} from './text-scroller.js';
WL.registerComponent(TextScroller);
/* wle:auto-imports:end */
