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
export async function runScreenshotTest(engine) {
    pauseAnimations(engine.scene);
    await ready(engine);
    engine.scene.dispatchReadyEvent();
}
