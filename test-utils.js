import {loadRuntime} from '@wonderlandengine/api';

/**
 * Promise that resolves once:
 * - Uncompressed textures are loaded
 * - Texture streaming is stable
 */
export async function ready(engine) {
    await engine.imagesPromise;
    return new Promise((resolve) => {
        engine.scene.onPostRender.add(function() {
            if (!engine.isTextureStreamingIdle) return;
            engine.scene.onPostRender.remove('texture-streaming-end');
            resolve();
        }, {
            id: 'texture-streaming-end'
        });
    });
}

/**
 * Pause all animations reference in a scene.
 *
 * @param scene The scene containing the animations to pause.
 */
export function pauseAnimations(scene) {
    /* Find animation component, and stop them. */
    const stack = [...scene.children];
    while (stack.length) {
        const obj = stack.pop();
        stack.push(...obj.children);

        const animation = obj.getComponent('animation');
        if (!animation) continue;

        animation.stop();
    }
}

/**
 * Dispatch the ready event once the application is ready.
 *
 * - Stops all animations
 * - Waits for ready() to resolve
 */
export async function testScreenshot(engine, event) {
    pauseAnimations(engine.scene);
    await ready(engine);
    if (window.testScreenshot) {
        /* Skip if not present to allow debugging */
        await window.testScreenshot(event);
    }
}

/**
 * Run a screenshot test
 */
export async function runScreenshotTest(projectName, runtimeBaseName, runtimeOptions, eventSuffix, xrMode) {
    const engine = await loadRuntime(runtimeBaseName, runtimeOptions);

    const canvas = document.getElementById('canvas');
    engine.autoResizeCanvas = false;
    engine.resize(canvas.clientWidth, canvas.clientHeight);

    const binFile = `${projectName}.bin`;
    await engine.loadMainScene({
        url: binFile,
        waitForDependencies: true,
        dispatchReadyEvent: false
    });

    if(xrMode) {
        const Constants = {
            WebXRRequiredFeatures: ['local',],
            WebXROptionalFeatures: ['local','hand-tracking','hit-test',],
        };

        /* Await random amount to be sure scene is loaded */
        await new Promise(r => setTimeout(r, 24));

        await engine
            .requestXRSession(xrMode, Constants.WebXRRequiredFeatures, Constants.WebXROptionalFeatures)
            .catch((e) => console.error(e));

        /* Await session start + one frame */
        await engine.webxr.onSessionFirstFrame.promise();
        await new Promise(requestAnimationFrame);
    }

    const event = eventSuffix ? `${binFile}${eventSuffix}` : binFile;
    await testScreenshot(engine, event);

    if(xrMode) {
        engine.xr.session.end();
    }
}

/**
 * Create a new canvas in place of the old one
 */
export function resetCanvas(oldCanvas) {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.style.cssText = oldCanvas.style.cssText;
    oldCanvas.parentNode.insertBefore(canvas, oldCanvas.nextSibling);
    oldCanvas.parentNode.removeChild(oldCanvas);
    return canvas;
}

/**
 * Run N screenshot tests with multiple configs
 */
export async function runScreenshotTestsMultiConfig(projectName, runtimeBaseName, runtimeOptions, configs) {
    const configOptions = [];
    if(configs.includes('webgl2')) {
        configOptions.push({ runtimeOptions: Object.assign({}, { webgpu: false, }, runtimeOptions), eventSuffix: ':webgl2'});
    }
    if(configs.includes('webxr')) {
        configOptions.push({ runtimeOptions: Object.assign({}, { webgpu: false }, runtimeOptions), eventSuffix: ':webxr', xrMode: 'immersive-vr' });
    }
    if(configs.includes('webgpu')) {
        configOptions.push({ runtimeOptions: Object.assign({}, { webgpu: true, }, runtimeOptions), eventSuffix: ':webgpu' });
    }

    for (const options of configOptions) {
        await runScreenshotTest(projectName, runtimeBaseName, options.runtimeOptions, options.eventSuffix, options.xrMode);
        const canvas = document.getElementById('canvas');
        resetCanvas(canvas);
    }
}
