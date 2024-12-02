import {loadRuntime} from '@wonderlandengine/api';

/**
 * Promise that resolves once:
 * - Uncompressed textures are loaded
 * - Texture streaming is stable
 */
export async function ready(engine) {
    await engine.imagesPromise;
    return new Promise((res) => {
        engine.scene.onPostRender.add(function() {
            if (!engine.isTextureStreamingIdle) return;
            engine.scene.onPostRender.remove('texture-streaming-end');
            res();
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
export async function testScreenshot(engine, binFile) {
    pauseAnimations(engine.scene);
    await ready(engine);
    if (window.testScreenshot) {
        /* Skip if not present to allow debugging */
        await window.testScreenshot(binFile);
    }
}

/**
 * Run a screenshot test
 */
export async function runScreenshotTest(projectName, runtimeBaseName, runtimeOptions) {
    const engine = await loadRuntime(runtimeBaseName, runtimeOptions);

    const canvas = document.getElementById('canvas');
    engine.autoResizeCanvas = false;
    engine.resize(canvas.clientWidth, canvas.clientHeight);

    document.getElementById('version')?.remove();
    document.getElementById('ar-button')?.remove();
    document.getElementById('vr-button')?.remove();

    const binFile = `${projectName}.bin`;
    await engine.loadMainScene({
        url: binFile,
        waitForDependencies: true,
        dispatchReadyEvent: false
    });
    await testScreenshot(engine, binFile);
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
 * Run a screenshot test on both WebGL2 and WebGPU
 */
export async function runScreenshotTestWebGL2AndWebGPU(projectName, runtimeBaseName, runtimeOptions) {
    const configs = [
        { projectName: `${projectName}-webgl2`, runtimeOptions: Object.assign({}, { webgpu: false, }, runtimeOptions) },
        { projectName: `${projectName}-webgpu`, runtimeOptions: Object.assign({}, { webgpu: true, }, runtimeOptions) },
    ];

    for (const config of configs) {
        await runScreenshotTest(config.projectName, runtimeBaseName, config.runtimeOptions);
        const canvas = document.getElementById('canvas');
        resetCanvas(canvas);
    }
}
