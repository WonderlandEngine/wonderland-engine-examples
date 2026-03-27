# Multiscene Example

This example demonstrates the usage of multiscene feature in Wonderland Engine version 1.2.0.

## Overview

Wonderland Engine previously supported managing only a single scene. With the new multiscene feature, you can now easily manage multiple scenes and share resources between them.

## Usage

(in the index.js)

```javascript
engine.loadSceneGroup('myNewScene.bin');
```

Every scene root loaded is indexed and stored in the engine in case you don't want to store it yourself. You can retrieve it like

```js
const sceneGroup = this.engine.getSceneGroup(0);
```

Scene Activation

```js
const myNewScene = sceneGroup.getScene(0);
myNewScene.activate();
```

## Entry point management

1. For every new scene, copy the index-template.js and rename it as index-myScene.js (replace "myScene" with any name of your choice, preferably your scene name )
2. Specify the js file as js entry point in the project settings

## CI/CD

1. While doing ci/cd be aware to include the packing of the secondary scenes before the main scene.

## Additional Details

1. For more information, refer to the [Multiscene blog post](https://wonderlandengine.com/news/runtime-multiscene-1.2.0/)
