# Prefab

Prefabs are `.bin` or `.glb` files that can be instantiated into the scene:

```js
const prefab = await engine.loadPrefab('Prefab.bin');
for (let i = 0; i < 10; ++i) {
    engine.scene.instantiate(prefab);
}
```

For more information about prefabs, have a look at the [Prefab](https://wonderlandengine.com/jsapi/prefab/) documentation.

## Prefab Creation

* Create a new project called `Prefab`
* Reach the `Views` tab
    * Click `Project Settings`
* In the `Project Settings` window
    * Reach the `Project` section
    * Tick the `packageForStreaming` box

You can add models, textures, materials, and js components like a normal scene.

## JavaScript Components

The Wonderland Editor doesn't yet have support for automatic prefab management. Thus, you will need to
help the editor know about how to register your JavaScript/TypeScript components.

Create a file called `prefab-index.js` and add the following template:

_prefab-index.js_:

```js
/* wle:auto-imports:start */
/* wle:auto-imports:end */

export default function(engine) {
    /* wle:auto-register:start */
    /* wle:auto-register:end */
}
```

This template is used by the editor to insert import and registration statements.

Next, edit the entry point in your `Prefab.wlp` file:

* Reach the `Views` tab
    * Click `Project Settings`
* In the `Project Settings` window
    * Reach the `JavaScript` section
    * Edit the `entryPoint` field to: "prefab-index.js"

Finally, edit the main `index.js` of your application with:

_index.js_:

```js
import registerPrefabComponents from './prefab-index.js';

...

registerPrefabComponents(engine);
```

This will allow you to automatically get the prefab js components registered in the application.
