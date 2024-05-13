var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/@wonderlandengine/api/dist/index.js
var dist_exports = {};
__export(dist_exports, {
  APIVersion: () => APIVersion,
  Alignment: () => Alignment,
  Animation: () => Animation,
  AnimationComponent: () => AnimationComponent,
  AnimationState: () => AnimationState,
  BitSet: () => BitSet,
  BrokenComponent: () => BrokenComponent,
  Collider: () => Collider,
  CollisionComponent: () => CollisionComponent,
  CollisionEventType: () => CollisionEventType,
  Component: () => Component,
  DefaultPropertyCloner: () => DefaultPropertyCloner,
  DestroyedComponentInstance: () => DestroyedComponentInstance,
  DestroyedObjectInstance: () => DestroyedObjectInstance,
  DestroyedPrefabInstance: () => DestroyedPrefabInstance,
  Emitter: () => Emitter,
  Font: () => Font,
  ForceMode: () => ForceMode,
  GLTFExtensions: () => GLTFExtensions,
  I18N: () => I18N,
  InputComponent: () => InputComponent,
  InputType: () => InputType,
  Justification: () => Justification,
  LightComponent: () => LightComponent,
  LightType: () => LightType,
  LockAxis: () => LockAxis,
  LogLevel: () => LogLevel,
  LogTag: () => LogTag,
  Logger: () => Logger,
  Material: () => Material,
  MaterialManager: () => MaterialManager,
  MaterialParamType: () => MaterialParamType,
  Mesh: () => Mesh,
  MeshAttribute: () => MeshAttribute,
  MeshAttributeAccessor: () => MeshAttributeAccessor,
  MeshComponent: () => MeshComponent,
  MeshIndexType: () => MeshIndexType,
  MeshManager: () => MeshManager,
  MeshSkinningType: () => MeshSkinningType,
  MorphTargets: () => MorphTargets,
  Object: () => Object3D,
  Object3D: () => Object3D,
  PhysXComponent: () => PhysXComponent,
  Physics: () => Physics,
  Prefab: () => Prefab,
  PrefabGLTF: () => PrefabGLTF,
  Property: () => Property,
  RayHit: () => RayHit,
  Resource: () => Resource,
  ResourceManager: () => ResourceManager,
  RetainEmitter: () => RetainEmitter,
  Scene: () => Scene,
  SceneResource: () => SceneResource,
  Shape: () => Shape,
  Skin: () => Skin,
  TextComponent: () => TextComponent,
  TextEffect: () => TextEffect,
  Texture: () => Texture,
  TextureManager: () => TextureManager,
  Type: () => Type,
  VerticalAlignment: () => VerticalAlignment,
  ViewComponent: () => ViewComponent,
  WASM: () => WASM,
  WonderlandEngine: () => WonderlandEngine,
  XR: () => XR,
  checkRuntimeCompatibility: () => checkRuntimeCompatibility,
  defaultPropertyCloner: () => defaultPropertyCloner,
  inheritProperties: () => inheritProperties,
  loadRuntime: () => loadRuntime,
  math: () => math
});

// node_modules/wasm-feature-detect/dist/esm/index.js
var simd = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]));
var threads = () => (async (e) => {
  try {
    return "undefined" != typeof MessageChannel && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(e);
  } catch (e2) {
    return false;
  }
})(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]));

// node_modules/@wonderlandengine/api/dist/property.js
var Type;
(function(Type2) {
  Type2[Type2["Native"] = 0] = "Native";
  Type2[Type2["Bool"] = 1] = "Bool";
  Type2[Type2["Int"] = 2] = "Int";
  Type2[Type2["Float"] = 3] = "Float";
  Type2[Type2["String"] = 4] = "String";
  Type2[Type2["Enum"] = 5] = "Enum";
  Type2[Type2["Object"] = 6] = "Object";
  Type2[Type2["Mesh"] = 7] = "Mesh";
  Type2[Type2["Texture"] = 8] = "Texture";
  Type2[Type2["Material"] = 9] = "Material";
  Type2[Type2["Animation"] = 10] = "Animation";
  Type2[Type2["Skin"] = 11] = "Skin";
  Type2[Type2["Color"] = 12] = "Color";
  Type2[Type2["Vector2"] = 13] = "Vector2";
  Type2[Type2["Vector3"] = 14] = "Vector3";
  Type2[Type2["Vector4"] = 15] = "Vector4";
})(Type || (Type = {}));
var DefaultPropertyCloner = class {
  clone(type, value) {
    switch (type) {
      case Type.Color:
      case Type.Vector2:
      case Type.Vector3:
      case Type.Vector4:
        return value.slice();
      default:
        return value;
    }
  }
};
var defaultPropertyCloner = new DefaultPropertyCloner();
var Property = {
  /**
   * Create an boolean property.
   *
   * @param defaultValue The default value. If not provided, defaults to `false`.
   */
  bool(defaultValue = false) {
    return { type: Type.Bool, default: defaultValue };
  },
  /**
   * Create an integer property.
   *
   * @param defaultValue The default value. If not provided, defaults to `0`.
   */
  int(defaultValue = 0) {
    return { type: Type.Int, default: defaultValue };
  },
  /**
   * Create an float property.
   *
   * @param defaultValue The default value. If not provided, defaults to `0.0`.
   */
  float(defaultValue = 0) {
    return { type: Type.Float, default: defaultValue };
  },
  /**
   * Create an string property.
   *
   * @param defaultValue The default value. If not provided, defaults to `''`.
   */
  string(defaultValue = "") {
    return { type: Type.String, default: defaultValue };
  },
  /**
   * Create an enumeration property.
   *
   * @param values The list of values.
   * @param defaultValue The default value. Can be a string or an index into
   *     `values`. If not provided, defaults to the first element.
   */
  enum(values, defaultValue) {
    return { type: Type.Enum, values, default: defaultValue };
  },
  /** Create an {@link Object3D} reference property. */
  object(opts) {
    return { type: Type.Object, default: null, required: opts?.required ?? false };
  },
  /** Create a {@link Mesh} reference property. */
  mesh(opts) {
    return { type: Type.Mesh, default: null, required: opts?.required ?? false };
  },
  /** Create a {@link Texture} reference property. */
  texture(opts) {
    return { type: Type.Texture, default: null, required: opts?.required ?? false };
  },
  /** Create a {@link Material} reference property. */
  material(opts) {
    return { type: Type.Material, default: null, required: opts?.required ?? false };
  },
  /** Create an {@link Animation} reference property. */
  animation(opts) {
    return { type: Type.Animation, default: null, required: opts?.required ?? false };
  },
  /** Create a {@link Skin} reference property. */
  skin(opts) {
    return { type: Type.Skin, default: null, required: opts?.required ?? false };
  },
  /**
   * Create a color property.
   *
   * @param r The red component, in the range [0; 1].
   * @param g The green component, in the range [0; 1].
   * @param b The blue component, in the range [0; 1].
   * @param a The alpha component, in the range [0; 1].
   */
  color(r = 0, g = 0, b = 0, a = 1) {
    return { type: Type.Color, default: [r, g, b, a] };
  },
  /**
   * Create a two-element vector property.
   *
   * @param x The x component.
   * @param y The y component.
   */
  vector2(x = 0, y = 0) {
    return { type: Type.Vector2, default: [x, y] };
  },
  /**
   * Create a three-element vector property.
   *
   * @param x The x component.
   * @param y The y component.
   * @param z The z component.
   */
  vector3(x = 0, y = 0, z = 0) {
    return { type: Type.Vector3, default: [x, y, z] };
  },
  /**
   * Create a four-element vector property.
   *
   * @param x The x component.
   * @param y The y component.
   * @param z The z component.
   * @param w The w component.
   */
  vector4(x = 0, y = 0, z = 0, w = 0) {
    return { type: Type.Vector4, default: [x, y, z, w] };
  }
};

// node_modules/@wonderlandengine/api/dist/decorators.js
function propertyDecorator(data) {
  return function(target, propertyKey) {
    const ctor = target.constructor;
    ctor.Properties = ctor.hasOwnProperty("Properties") ? ctor.Properties : {};
    ctor.Properties[propertyKey] = data;
  };
}
function enumerable() {
  return function(_, __, descriptor) {
    descriptor.enumerable = true;
  };
}
function nativeProperty() {
  return function(target, propertyKey, descriptor) {
    enumerable()(target, propertyKey, descriptor);
    propertyDecorator({ type: Type.Native })(target, propertyKey);
  };
}
var property = {};
for (const name in Property) {
  property[name] = (...args) => {
    const functor = Property[name];
    return propertyDecorator(functor(...args));
  };
}

// node_modules/@wonderlandengine/api/dist/utils/object.js
function isString(value) {
  if (value === "")
    return true;
  return value && (typeof value === "string" || value.constructor === String);
}
function isNumber(value) {
  if (value === null || value === void 0)
    return false;
  return typeof value === "number" || value.constructor === Number;
}
function isImageLike(value) {
  return value instanceof HTMLImageElement || value instanceof HTMLVideoElement || value instanceof HTMLCanvasElement;
}

// node_modules/@wonderlandengine/api/dist/utils/event.js
var TransactionType;
(function(TransactionType2) {
  TransactionType2[TransactionType2["Addition"] = 1] = "Addition";
  TransactionType2[TransactionType2["Removal"] = 2] = "Removal";
})(TransactionType || (TransactionType = {}));
var Emitter = class {
  /**
   * List of listeners to trigger when `notify` is called.
   *
   * @hidden
   */
  _listeners = [];
  /**
   * `true` if the emitter is currently notifying listeners. This
   * is used to defer addition and removal.
   *
   * @hidden
   */
  _notifying = false;
  /**
   * Pending additions / removals, performed during a notification.
   *
   * @hidden
   */
  _transactions = [];
  /**
   * Register a new listener to be triggered on {@link Emitter.notify}.
   *
   * Basic usage:
   *
   * ```js
   * emitter.add((data) => {
   *     console.log('event received!');
   *     console.log(data);
   * });
   * ```
   *
   * Automatically remove the listener when an event is received:
   *
   * ```js
   * emitter.add((data) => {
   *     console.log('event received!');
   *     console.log(data);
   * }, {once: true});
   * ```
   *
   * @param listener The callback to register.
   * @param opts The listener options. For more information, please have a look
   *     at the {@link ListenerOptions} interface.
   *
   * @returns Reference to self (for method chaining)
   */
  add(listener, opts = {}) {
    const { once = false, id = void 0 } = opts;
    const data = { id, once, callback: listener };
    if (this._notifying) {
      this._transactions.push({ type: TransactionType.Addition, data });
      return this;
    }
    this._listeners.push(data);
    return this;
  }
  /**
   * Equivalent to {@link Emitter.add}.
   *
   * @param listeners The callback(s) to register.
   * @returns Reference to self (for method chaining).
   *
   * @deprecated Please use {@link Emitter.add} instead.
   */
  push(...listeners) {
    for (const cb of listeners)
      this.add(cb);
    return this;
  }
  /**
   * Register a new listener to be triggered on {@link Emitter.notify}.
   *
   * Once notified, the listener will be automatically removed.
   *
   * The method is equivalent to calling {@link Emitter.add} with:
   *
   * ```js
   * emitter.add(listener, {once: true});
   * ```
   *
   * @param listener The callback to register.
   *
   * @returns Reference to self (for method chaining).
   */
  once(listener) {
    return this.add(listener, { once: true });
  }
  /**
   * Remove a registered listener.
   *
   * Usage with a callback:
   *
   * ```js
   * const listener = (data) => console.log(data);
   * emitter.add(listener);
   *
   * // Remove using the callback reference:
   * emitter.remove(listener);
   * ```
   *
   * Usage with an id:
   *
   * ```js
   * emitter.add((data) => console.log(data), {id: 'my-callback'});
   *
   * // Remove using the id:
   * emitter.remove('my-callback');
   * ```
   *
   * Using identifiers, you will need to ensure your value is unique to avoid
   * removing listeners from other libraries, e.g.,:
   *
   * ```js
   * emitter.add((data) => console.log(data), {id: 'non-unique'});
   * // This second listener could be added by a third-party library.
   * emitter.add((data) => console.log('Hello From Library!'), {id: 'non-unique'});
   *
   * // Ho Snap! This also removed the library listener!
   * emitter.remove('non-unique');
   * ```
   *
   * The identifier can be any type. However, remember that the comparison will be
   * by-value for primitive types (string, number), but by reference for objects.
   *
   * Example:
   *
   * ```js
   * emitter.add(() => console.log('Hello'), {id: {value: 42}});
   * emitter.add(() => console.log('World!'), {id: {value: 42}});
   * emitter.remove({value: 42}); // None of the above listeners match!
   * emitter.notify(); // Prints 'Hello' and 'World!'.
   * ```
   *
   * Here, both emitters have id `{value: 42}`, but the comparison is made by reference. Thus,
   * the `remove()` call has no effect. We can make it work by doing:
   *
   * ```js
   * const id = {value: 42};
   * emitter.add(() => console.log('Hello'), {id});
   * emitter.add(() => console.log('World!'), {id});
   * emitter.remove(id); // Same reference, it works!
   * emitter.notify(); // Doesn't print.
   * ```
   *
   * @param listener The registered callback or a value representing the `id`.
   *
   * @returns Reference to self (for method chaining)
   */
  remove(listener) {
    if (this._notifying) {
      this._transactions.push({ type: TransactionType.Removal, data: listener });
      return this;
    }
    const listeners = this._listeners;
    for (let i = 0; i < listeners.length; ++i) {
      const target = listeners[i];
      if (target.callback === listener || target.id === listener) {
        listeners.splice(i--, 1);
      }
    }
    return this;
  }
  /**
   * Check whether the listener is registered.
   *
   * @note This method performs a linear search.
   *
   * * @note Doesn't account for pending listeners, i.e.,
   * listeners added / removed during a notification.
   *
   * @param listener The registered callback or a value representing the `id`.
   * @returns `true` if the handle is found, `false` otherwise.
   */
  has(listener) {
    const listeners = this._listeners;
    for (let i = 0; i < listeners.length; ++i) {
      const target = listeners[i];
      if (target.callback === listener || target.id === listener)
        return true;
    }
    return false;
  }
  /**
   * Notify listeners with the given data object.
   *
   * @note This method ensures all listeners are called even if
   * an exception is thrown. For (possibly) faster notification,
   * please use {@link Emitter.notifyUnsafe}.
   *
   * @param data The data to pass to listener when invoked.
   */
  notify(...data) {
    const listeners = this._listeners;
    this._notifying = true;
    for (let i = 0; i < listeners.length; ++i) {
      const listener = listeners[i];
      if (listener.once)
        listeners.splice(i--, 1);
      try {
        listener.callback(...data);
      } catch (e) {
        console.error(e);
      }
    }
    this._notifying = false;
    this._flushTransactions();
  }
  /**
   * Notify listeners with the given data object.
   *
   * @note Because this method doesn't catch exceptions, some listeners
   * will be skipped on a throw. Please use {@link Emitter.notify} for safe
   * notification.
   *
   * @param data The data to pass to listener when invoked.
   */
  notifyUnsafe(...data) {
    const listeners = this._listeners;
    for (let i = 0; i < listeners.length; ++i) {
      const listener = listeners[i];
      if (listener.once)
        listeners.splice(i--, 1);
      listener.callback(...data);
    }
    this._flushTransactions();
  }
  /**
   * Return a promise that will resolve on the next event.
   *
   * @note The promise might never resolve if no event is sent.
   *
   * @returns A promise that resolves with the data passed to
   *     {@link Emitter.notify}.
   */
  promise() {
    return new Promise((res, _) => {
      this.once((...args) => {
        if (args.length > 1) {
          res(args);
        } else {
          res(args[0]);
        }
      });
    });
  }
  /**
   * Number of listeners.
   *
   * @note Doesn't account for pending listeners, i.e.,
   * listeners added / removed during a notification.
   */
  get listenerCount() {
    return this._listeners.length;
  }
  /** `true` if it has no listeners, `false` otherwise. */
  get isEmpty() {
    return this.listenerCount === 0;
  }
  /**
   * Flush all pending transactions.
   *
   * @hidden
   */
  _flushTransactions() {
    const listeners = this._listeners;
    for (const transaction of this._transactions) {
      if (transaction.type === TransactionType.Addition) {
        listeners.push(transaction.data);
      } else {
        this.remove(transaction.data);
      }
    }
    this._transactions.length = 0;
  }
};
var RetainEmitterUndefined = {};
var RetainEmitter = class extends Emitter {
  /** Pre-resolved data. @hidden */
  _event = RetainEmitterUndefined;
  /**
   * Emitter target used to reset the state of this emitter.
   *
   * @hidden
   */
  _reset;
  /** @override */
  add(listener, opts) {
    const immediate = opts?.immediate ?? true;
    if (this._event !== RetainEmitterUndefined && immediate) {
      listener(...this._event);
    }
    super.add(listener, opts);
    return this;
  }
  /**
   * @override
   *
   * @param listener The callback to register.
   * @param immediate If `true`, directly resolves if the emitter retains a value.
   *
   * @returns Reference to self (for method chaining).
   */
  once(listener, immediate) {
    return this.add(listener, { once: true, immediate });
  }
  /** @override */
  notify(...data) {
    this._event = data;
    super.notify(...data);
  }
  /** @override */
  notifyUnsafe(...data) {
    this._event = data;
    super.notifyUnsafe(...data);
  }
  /**
   * Reset the state of the emitter.
   *
   * Further call to {@link Emitter.add} will not automatically resolve,
   * until a new call to {@link Emitter.notify} is performed.
   *
   * @returns Reference to self (for method chaining)
   */
  reset() {
    this._event = RetainEmitterUndefined;
    return this;
  }
  /** Returns the retained data, or `undefined` if no data was retained. */
  get data() {
    return this.isDataRetained ? this._event : void 0;
  }
  /** `true` if data is retained from the last event, `false` otherwise. */
  get isDataRetained() {
    return this._event !== RetainEmitterUndefined;
  }
};

// node_modules/@wonderlandengine/api/dist/resources/resource.js
function createDestroyedProxy(host, type) {
  return new Proxy({}, {
    get(_, param) {
      if (param === "isDestroyed")
        return true;
      throw new Error(`Cannot read '${param}' of destroyed '${type.name}' resource from ${host}`);
    },
    set(_, param) {
      throw new Error(`Cannot write '${param}' of destroyed '${type.name}' resource from ${host}`);
    }
  });
}
var Resource = class {
  /** Relative index in the host. @hidden */
  _index = -1;
  /** For compatibility with SceneResource. @hidden */
  _id = -1;
  /** @hidden */
  _engine;
  constructor(engine2, index) {
    this._engine = engine2;
    this._index = index;
    this._id = index;
  }
  /** Hosting engine instance. */
  get engine() {
    return this._engine;
  }
  /** Index of this resource in the {@link Scene}'s manager. */
  get index() {
    return this._index;
  }
  /**
   * Checks equality by comparing ids and **not** the JavaScript reference.
   *
   * @deprecated Use JavaScript reference comparison instead:
   *
   * ```js
   * const meshA = engine.meshes.create({vertexCount: 1});
   * const meshB = engine.meshes.create({vertexCount: 1});
   * const meshC = meshB;
   * console.log(meshA === meshB); // false
   * console.log(meshA === meshA); // true
   * console.log(meshB === meshC); // true
   * ```
   */
  equals(other) {
    if (!other)
      return false;
    return this._index === other._index;
  }
  /**
   * `true` if the object is destroyed, `false` otherwise.
   *
   * If {@link WonderlandEngine.erasePrototypeOnDestroy} is `true`,
   * reading a class attribute / method will throw.
   */
  get isDestroyed() {
    return this._index <= 0;
  }
};
var SceneResource = class {
  static _pack(scene, index) {
    return scene << 22 | index;
  }
  /** Relative index in the host. @hidden */
  _index = -1;
  /** For compatibility with SceneResource. @hidden */
  _id = -1;
  /** @hidden */
  _scene;
  constructor(scene, index) {
    this._scene = scene;
    this._index = index;
    this._id = SceneResource._pack(scene._index, index);
  }
  /**
   * Checks equality by comparing ids and **not** the JavaScript reference.
   *
   * @deprecated Use JavaScript reference comparison instead:
   *
   * ```js
   * const meshA = engine.meshes.create({vertexCount: 1});
   * const meshB = engine.meshes.create({vertexCount: 1});
   * const meshC = meshB;
   * console.log(meshA === meshB); // false
   * console.log(meshA === meshA); // true
   * console.log(meshB === meshC); // true
   * ```
   */
  equals(other) {
    if (!other)
      return false;
    return this._id === other._id;
  }
  /** Hosting instance. */
  get scene() {
    return this._scene;
  }
  /** Hosting engine instance. */
  get engine() {
    return this._scene.engine;
  }
  /** Index of this resource in the {@link Scene}'s manager. */
  get index() {
    return this._index;
  }
  /**
   * `true` if the object is destroyed, `false` otherwise.
   *
   * If {@link WonderlandEngine.erasePrototypeOnDestroy} is `true`,
   * reading a class attribute / method will throw.
   */
  get isDestroyed() {
    return this._id <= 0;
  }
};
var ResourceManager = class {
  /** @hidden */
  _host;
  /** Cache. @hidden */
  _cache = [];
  /** Resource class. @hidden */
  _template;
  /** Destructor proxy, used if {@link WonderlandEngine.erasePrototypeOnDestroy} is `true`. @hidden */
  _destructor = null;
  _engine;
  /**
   * Create a new manager
   *
   * @param host The host containing the managed resources.
   * @param Class The class to instantiate when wrapping an index.
   *
   * @hidden
   */
  constructor(host, Class) {
    this._host = host;
    this._template = Class;
    this._engine = host.engine ?? host;
  }
  /**
   * Wrap the index into a resource instance.
   *
   * @note The index is relative to the host, i.e., doesn't pack the host index (if any).
   *
   * @param index The resource index.
   * @returns
   */
  wrap(index) {
    if (index <= 0)
      return null;
    const texture = this._cache[index] ?? (this._cache[index] = new this._template(this._host, index));
    return texture;
  }
  /**
   * Retrieve the resource at the given index.
   *
   * @note The index is relative to the host, i.e., doesn't pack the host index.
   */
  get(index) {
    return this._cache[index] ?? null;
  }
  /** Number of textures allocated in the manager. */
  get allocatedCount() {
    return this._cache.length;
  }
  /**
   * Number of textures in the manager.
   *
   * @note For performance reasons, avoid calling this method when possible.
   */
  get count() {
    let count = 0;
    for (const res of this._cache) {
      if (res && res.index >= 0)
        ++count;
    }
    return count;
  }
  /** Hosting engine instance. */
  get engine() {
    return this._engine;
  }
  /**
   * Destroy the instance.
   *
   * @note This method takes care of the prototype destruction.
   *
   * @hidden
   */
  _destroy(instance) {
    const index = instance.index;
    instance._index = -1;
    instance._id = -1;
    this._cache[index] = null;
    if (!this.engine.erasePrototypeOnDestroy)
      return;
    if (!this._destructor)
      this._destructor = createDestroyedProxy(this._host, this._template);
    Object.setPrototypeOf(instance, this._destructor);
  }
  /**
   * Mark all instances as destroyed.
   *
   * @hidden
   */
  _clear() {
    if (!this.engine.erasePrototypeOnDestroy)
      return;
    for (let i = 0; i < this._cache.length; ++i) {
      const instance = this._cache[i];
      if (instance)
        this._destroy(instance);
    }
    this._cache.length = 0;
  }
};

// node_modules/@wonderlandengine/api/dist/component.js
var ComponentManagers = class {
  /** Animation manager index. */
  animation = -1;
  /** Collision manager index. */
  collision = -1;
  /** JavaScript manager index. */
  js = -1;
  /** Physx manager index. */
  physx = -1;
  /** View manager index. */
  view = -1;
  /**
   * Component class instances per type to avoid GC.
   *
   * @note Maps the manager index to the list of components.
   *
   * @todo: Refactor ResourceManager and re-use for components.
   */
  _cache = [];
  /** Manager index to component class. */
  _constructors;
  /* Manager name to the manager index. */
  _nativeManagers = /* @__PURE__ */ new Map();
  /** Host instance. */
  _scene;
  constructor(scene) {
    this._scene = scene;
    const wasm = this._scene.engine.wasm;
    const native = [
      AnimationComponent,
      CollisionComponent,
      InputComponent,
      LightComponent,
      MeshComponent,
      PhysXComponent,
      TextComponent,
      ViewComponent
    ];
    this._cache = new Array(native.length);
    this._constructors = new Array(native.length);
    for (const Class of native) {
      const ptr2 = wasm.tempUTF8(Class.TypeName);
      const manager = wasm._wl_scene_get_component_manager_index(scene._index, ptr2);
      this._constructors;
      this._constructors[manager] = Class;
      this._cache[manager] = [];
      this._nativeManagers.set(Class.TypeName, manager);
    }
    this.animation = this._nativeManagers.get(AnimationComponent.TypeName);
    this.collision = this._nativeManagers.get(CollisionComponent.TypeName);
    this.physx = this._nativeManagers.get(PhysXComponent.TypeName);
    this.view = this._nativeManagers.get(ViewComponent.TypeName);
    const ptr = wasm.tempUTF8("js");
    this.js = wasm._wl_scene_get_component_manager_index(scene._index, ptr);
    this._cache[this.js] = [];
  }
  createJs(index, id, type, object) {
    const wasm = this._scene.engine.wasm;
    const ctor = wasm._componentTypes[type];
    if (!ctor) {
      throw new Error(`Type index ${type} isn't registered`);
    }
    const log = this._scene.engine.log;
    let component = null;
    try {
      component = new ctor(this._scene, this.js, id);
    } catch (e) {
      log.error(LogTag.Component, `Exception during instantiation of component ${ctor.TypeName}`);
      log.error(LogTag.Component, e);
      component = new BrokenComponent(this._scene);
    }
    component._object = this._scene.wrap(object);
    try {
      component.resetProperties();
    } catch (e) {
      log.error(LogTag.Component, `Exception during ${component.type} resetProperties() on object ${component.object.name}`);
      log.error(LogTag.Component, e);
    }
    this._scene._jsComponents[index] = component;
    this._cache[this.js][id] = component;
    return component;
  }
  /**
   * Retrieve a cached component.
   *
   * @param manager The manager index.
   * @param id The component id.
   * @returns The component if cached, `null` otherwise.
   */
  get(manager, id) {
    return this._cache[manager][id] ?? null;
  }
  /**
   * Wrap the animation.
   *
   * @param id Id to wrap.
   * @returns The previous instance if it was cached, or a new one.
   */
  wrapAnimation(id) {
    return this.wrapNative(this.animation, id);
  }
  /**
   * Wrap the collision.
   *
   * @param id Id to wrap.
   * @returns The previous instance if it was cached, or a new one.
   */
  wrapCollision(id) {
    return this.wrapNative(this.collision, id);
  }
  /**
   * Wrap the view.
   *
   * @param id Id to wrap.
   * @returns The previous instance if it was cached, or a new one.
   */
  wrapView(id) {
    return this.wrapNative(this.view, id);
  }
  /**
   * Wrap the physx.
   *
   * @param id Id to wrap.
   * @returns The previous instance if it was cached, or a new one.
   */
  wrapPhysx(id) {
    return this.wrapNative(this.physx, id);
  }
  /**
   * Retrieves a component instance if it exists, or create and cache
   * a new one.
   *
   * @note This api is meant to be used internally. Please have a look at
   * {@link Object3D.addComponent} instead.
   *
   * @param componentType Component manager index
   * @param componentId Component id in the manager
   *
   * @returns JavaScript instance wrapping the native component
   */
  wrapNative(manager, id) {
    if (id < 0)
      return null;
    const cache = this._cache[manager];
    if (cache[id])
      return cache[id];
    const scene = this._scene;
    const Class = this._constructors[manager];
    const component = new Class(scene, manager, id);
    cache[id] = component;
    return component;
  }
  /**
   * Wrap a native or js component.
   *
   * @throws For JavaScript components that weren't previously cached,
   * since that would be a bug in the runtime / api.
   *
   * @param manager The manager index.
   * @param id The id to wrap.
   * @returns The previous instance if it was cached, or a new one.
   */
  wrapAny(manager, id) {
    if (id < 0)
      return null;
    if (manager === this.js) {
      const found = this._cache[this.js][id];
      if (!found) {
        throw new Error("JS components must always be cached");
      }
      return found.constructor !== BrokenComponent ? found : null;
    }
    return this.wrapNative(manager, id);
  }
  getNativeManager(name) {
    const manager = this._nativeManagers.get(name);
    return manager !== void 0 ? manager : null;
  }
  /**
   * Perform cleanup upon component destruction.
   *
   * @param instance The instance to destroy.
   *
   * @hidden
   */
  destroy(instance) {
    const localId = instance._localId;
    const manager = instance._manager;
    instance._id = -1;
    instance._localId = -1;
    instance._manager = -1;
    const erasePrototypeOnDestroy = this._scene.engine.erasePrototypeOnDestroy;
    if (erasePrototypeOnDestroy && instance) {
      Object.setPrototypeOf(instance, DestroyedComponentInstance);
    }
    this._cache[manager][localId] = null;
  }
  /** Number of managers, including the JavaScript manager. */
  get managersCount() {
    return this._nativeManagers.size + 1;
  }
};

// node_modules/@wonderlandengine/api/dist/utils/fetch.js
function fetchWithProgress(path, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", path);
    xhr.responseType = "arraybuffer";
    xhr.onprogress = (progress) => {
      if (progress.lengthComputable) {
        onProgress?.(progress.loaded, progress.total);
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const buffer = xhr.response;
        onProgress?.(buffer.byteLength, buffer.byteLength);
        resolve(buffer);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}
function getBaseUrl(url) {
  return url.substring(0, url.lastIndexOf("/"));
}
function getFilename(url) {
  if (url.endsWith("/")) {
    url = url.substring(0, url.lastIndexOf("/"));
  }
  const lastSlash = url.lastIndexOf("/");
  if (lastSlash < 0)
    return url;
  return url.substring(lastSlash + 1);
}
function onImageReady(image) {
  return new Promise((res, rej) => {
    if (image instanceof HTMLCanvasElement) {
      res(image);
    } else if (image instanceof HTMLVideoElement) {
      if (image.readyState >= 2) {
        res(image);
        return;
      }
      image.addEventListener("loadeddata", () => {
        if (image.readyState >= 2)
          res(image);
      }, { once: true });
      return;
    } else if (image.complete) {
      res(image);
      return;
    }
    image.addEventListener("load", () => res(image), { once: true });
    image.addEventListener("error", rej, { once: true });
  });
}

// node_modules/@wonderlandengine/api/dist/prefab.js
var Prefab = class {
  /**
   * Load an `ArrayBuffer` using fetch.
   *
   * @param opts The url or options.
   * @param progress Progress callback
   * @returns An {@link InMemoryLoadOptions} object.
   *
   * @hidden
   */
  static async loadBuffer(opts, progress) {
    const url = isString(opts) ? opts : opts.url;
    const buffer = await fetchWithProgress(url, progress);
    const baseURL = getBaseUrl(url);
    const filename = getFilename(url);
    return { buffer, baseURL, filename };
  }
  /**
   * Validate the in memory options.
   *
   * @param options Options to validate.
   * @returns Validated options object.
   *
   * @hidden
   */
  static validateBufferOptions(options) {
    const { buffer, baseURL, filename = "scene.bin" } = options;
    if (!buffer) {
      throw new Error("missing 'buffer' in options");
    }
    if (!isString(baseURL)) {
      throw new Error("missing 'baseURL' in options");
    }
    const url = baseURL ? `${baseURL}/${filename}` : filename;
    return { buffer, baseURL, url };
  }
  /** Index in the scene manager. @hidden */
  _index;
  /** @hidden */
  _engine;
  /**
   * Component manager caching to avoid GC.
   *
   * @hidden
   */
  _components;
  /**
   * JavaScript components for this scene.
   *
   * This array is moved into the WASM instance upon activation.
   *
   * @hidden
   */
  _jsComponents = [];
  /** @hidden */
  _animations;
  /** @hidden */
  _skins;
  /**
   * Object class instances to avoid GC.
   *
   * @hidden
   */
  _objectCache = [];
  /**
   * @note This api is meant to be used internally.
   *
   * @hidden
   */
  constructor(engine2, index) {
    this._engine = engine2;
    this._index = index;
    this._components = new ComponentManagers(this);
    this._animations = new ResourceManager(this, Animation);
    this._skins = new ResourceManager(this, Skin);
  }
  /**
   * Add an object to the scene.
   *
   * @param parent Parent object or `null`.
   * @returns A newly created object.
   */
  addObject(parent = null) {
    this.assertOrigin(parent);
    const parentId = parent ? parent._id : 0;
    const objectId = this.engine.wasm._wl_scene_add_object(this._index, parentId);
    return this.wrap(objectId);
  }
  /**
   * Batch-add objects to the scene.
   *
   * Will provide better performance for adding multiple objects (e.g. > 16)
   * than calling {@link Scene#addObject} repeatedly in a loop.
   *
   * By providing upfront information of how many objects will be required,
   * the engine is able to batch-allocate the required memory rather than
   * convervatively grow the memory in small steps.
   *
   * @experimental This API might change in upcoming versions.
   *
   * @param count Number of objects to add.
   * @param parent Parent object or `null`, default `null`.
   * @param componentCountHint Hint for how many components in total will
   *      be added to the created objects afterwards, default `0`.
   * @returns Newly created objects
   */
  addObjects(count, parent = null, componentCountHint = 0) {
    const parentId = parent ? parent._id : 0;
    this.engine.wasm.requireTempMem(count * 2);
    const actualCount = this.engine.wasm._wl_scene_add_objects(this._index, parentId, count, componentCountHint || 0, this.engine.wasm._tempMem, this.engine.wasm._tempMemSize >> 1);
    const ids = this.engine.wasm._tempMemUint16.subarray(0, actualCount);
    const wrapper = this.wrap.bind(this);
    const objects = Array.from(ids, wrapper);
    return objects;
  }
  /**
   * Pre-allocate memory for a given amount of objects and components.
   *
   * Will provide better performance for adding objects later with {@link Scene#addObject}
   * and {@link Scene#addObjects}.
   *
   * By providing upfront information of how many objects will be required,
   * the engine is able to batch-allocate the required memory rather than
   * conservatively grow the memory in small steps.
   *
   * **Experimental:** This API might change in upcoming versions.
   *
   * @param objectCount Number of objects to add.
   * @param componentCountPerType Amount of components to
   *      allocate for {@link Object3D.addComponent}, e.g. `{mesh: 100, collision: 200, "my-comp": 100}`.
   * @since 0.8.10
   */
  reserveObjects(objectCount, componentCountPerType) {
    const wasm = this.engine.wasm;
    componentCountPerType = componentCountPerType || {};
    const names = Object.keys(componentCountPerType);
    const countsPerTypeIndex = wasm._tempMemInt;
    for (let i = 0; i < this._components.managersCount; ++i) {
      countsPerTypeIndex[i] = 0;
    }
    for (const name of names) {
      const count = componentCountPerType[name];
      const nativeIndex = this._components.getNativeManager(name);
      countsPerTypeIndex[nativeIndex !== null ? nativeIndex : this._components.js] += count;
    }
    wasm._wl_scene_reserve_objects(this._index, objectCount, wasm._tempMem);
  }
  /**
   * Root object's children.
   *
   * See {@link Object3D.getChildren} for more information.
   *
   * @param out Destination array, expected to have at least `this.childrenCount` elements.
   * @returns The `out` parameter.
   */
  getChildren(out = new Array(this.childrenCount)) {
    const root = this.wrap(0);
    return root.getChildren(out);
  }
  /**
   * Top-level objects of this scene.
   *
   * See {@link Object3D.children} for more information.
   *
   * @since 1.2.0
   */
  get children() {
    const root = this.wrap(0);
    return root.children;
  }
  /** The number of children of the root object. */
  get childrenCount() {
    return this.engine.wasm._wl_object_get_children_count(0);
  }
  /**
   * Search for objects matching the name.
   *
   * See {@link Object3D.findByName} for more information.
   *
   * @param name The name to search for.
   * @param recursive If `true`, the method will look at all the objects of
   *     this scene. If `false`, this method will only perform the search in
   *     root objects.
   * @returns An array of {@link Object3D} matching the name.
   *
   * @since 1.2.0
   */
  findByName(name, recursive = false) {
    const root = this.wrap(0);
    return root.findByName(name, recursive);
  }
  /**
   * Search for all **top-level** objects matching the name.
   *
   * See {@link Object3D.findByNameDirect} for more information.
   *
   * @param name The name to search for.
   * @returns An array of {@link Object3D} matching the name.
   *
   * @since 1.2.0
   */
  findByNameDirect(name) {
    const root = this.wrap(0);
    return root.findByNameDirect(name);
  }
  /**
   * Search for **all objects** matching the name.
   *
   * See {@link Object3D.findByNameRecursive} for more information.
   *
   * @param name The name to search for.
   * @returns An array of {@link Object3D} matching the name.
   *
   * @since 1.2.0
   */
  findByNameRecursive(name) {
    const root = this.wrap(0);
    return root.findByNameRecursive(name);
  }
  /**
   * Wrap an object ID using {@link Object}.
   *
   * @note This method performs caching and will return the same
   * instance on subsequent calls.
   *
   * @param objectId ID of the object to create.
   *
   * @returns The object
   */
  wrap(objectId) {
    const cache = this._objectCache;
    const o = cache[objectId] || (cache[objectId] = new Object3D(this, objectId));
    return o;
  }
  /**
   * Destroy the scene.
   *
   * For now, destroying a scene doesn't remove the resources it references. Thus,
   * you will need to reload a main scene to free the memory.
   *
   * For more information about destruction, have a look at the {@link Scene.destroy} method.
   */
  destroy() {
    this.engine._destroyScene(this);
  }
  /* Public Getters & Setters */
  /**
   * `true` if the scene is active, `false` otherwise.
   *
   * Always false for {@link Prefab} and {@link PrefabGLTF}.
   */
  get isActive() {
    return !!this.engine.wasm._wl_scene_active(this._index);
  }
  /**
   * Relative directory of the scene that was loaded.
   *
   * This is used for loading any files relative to the scene.
   */
  get baseURL() {
    const wasm = this.engine.wasm;
    const ptr = wasm._wl_scene_get_baseURL(this._index);
    if (!ptr)
      return "";
    return wasm.UTF8ToString(ptr);
  }
  /**
   * Filename used when loading the file.
   *
   * If the scenes was loaded from memory and no filename was provided,
   * this accessor will return an empty string.
   */
  get filename() {
    const wasm = this.engine.wasm;
    const ptr = wasm._wl_scene_get_filename(this._index);
    if (!ptr)
      return "";
    return wasm.UTF8ToString(ptr);
  }
  /** Animation resources */
  get animations() {
    return this._animations;
  }
  /** Skin resources */
  get skins() {
    return this._skins;
  }
  /** Hosting engine instance. */
  get engine() {
    return this._engine;
  }
  /**
   * `true` if the object is destroyed, `false` otherwise.
   *
   * If {@link WonderlandEngine.erasePrototypeOnDestroy} is `true`,
   * reading a class attribute / method will throw.
   */
  get isDestroyed() {
    return this._index < 0;
  }
  /** @overload */
  toString() {
    if (this.isDestroyed) {
      return "Scene(destroyed)";
    }
    return `Scene('${this.filename}', ${this._index})`;
  }
  /**
   * Checks that the input's scene is the same as this instance.
   *
   * It is forbidden to mix objects and components from different scenes, e.g.,
   *
   * ```js
   * const objA = sceneA.addObject();
   * const objB = sceneA.addObject();
   * objA.parent = objB; // Throws
   * ```
   *
   * @param other Object / component to check.
   *
   * @throws If other's scene isn't the same reference as this.
   */
  assertOrigin(other) {
    if (other && other.scene !== this) {
      throw new Error(`Attempt to use ${other} from ${other.scene} in ${this}`);
    }
  }
  /**
   * Download dependencies and initialize the scene.
   *
   * @hidden
   */
  _initialize() {
    this.engine.wasm._wl_scene_initialize(this._index);
  }
  /**
   * Perform cleanup upon object destruction.
   *
   * @param localId The id to destroy.
   *
   * @hidden
   */
  _destroyObject(localId) {
    const instance = this._objectCache[localId];
    if (!instance)
      return;
    instance._id = -1;
    instance._localId = -1;
    if (this.engine.erasePrototypeOnDestroy && instance) {
      Object.setPrototypeOf(instance, DestroyedObjectInstance);
    }
    this._objectCache[localId] = null;
  }
};

// node_modules/@wonderlandengine/api/dist/utils/misc.js
function clamp(val, min, max) {
  return Math.max(Math.min(max, val), min);
}
function capitalizeFirstUTF8(str) {
  return `${str[0].toUpperCase()}${str.substring(1)}`;
}
function createDestroyedProxy2(type) {
  return new Proxy({}, {
    get(_, param) {
      if (param === "isDestroyed")
        return true;
      throw new Error(`Cannot read '${param}' of destroyed ${type}`);
    },
    set(_, param) {
      throw new Error(`Cannot write '${param}' of destroyed ${type}`);
    }
  });
}

// node_modules/@wonderlandengine/api/dist/wonderland.js
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LogTag;
(function(LogTag2) {
  LogTag2[LogTag2["Engine"] = 0] = "Engine";
  LogTag2[LogTag2["Scene"] = 1] = "Scene";
  LogTag2[LogTag2["Component"] = 2] = "Component";
})(LogTag || (LogTag = {}));
var Collider;
(function(Collider2) {
  Collider2[Collider2["Sphere"] = 0] = "Sphere";
  Collider2[Collider2["AxisAlignedBox"] = 1] = "AxisAlignedBox";
  Collider2[Collider2["Box"] = 2] = "Box";
})(Collider || (Collider = {}));
var Alignment;
(function(Alignment2) {
  Alignment2[Alignment2["Left"] = 0] = "Left";
  Alignment2[Alignment2["Center"] = 1] = "Center";
  Alignment2[Alignment2["Right"] = 2] = "Right";
})(Alignment || (Alignment = {}));
var VerticalAlignment;
(function(VerticalAlignment2) {
  VerticalAlignment2[VerticalAlignment2["Line"] = 0] = "Line";
  VerticalAlignment2[VerticalAlignment2["Middle"] = 1] = "Middle";
  VerticalAlignment2[VerticalAlignment2["Top"] = 2] = "Top";
  VerticalAlignment2[VerticalAlignment2["Bottom"] = 3] = "Bottom";
})(VerticalAlignment || (VerticalAlignment = {}));
var Justification = VerticalAlignment;
var TextEffect;
(function(TextEffect2) {
  TextEffect2[TextEffect2["None"] = 0] = "None";
  TextEffect2[TextEffect2["Outline"] = 1] = "Outline";
})(TextEffect || (TextEffect = {}));
var InputType;
(function(InputType2) {
  InputType2[InputType2["Head"] = 0] = "Head";
  InputType2[InputType2["EyeLeft"] = 1] = "EyeLeft";
  InputType2[InputType2["EyeRight"] = 2] = "EyeRight";
  InputType2[InputType2["ControllerLeft"] = 3] = "ControllerLeft";
  InputType2[InputType2["ControllerRight"] = 4] = "ControllerRight";
  InputType2[InputType2["RayLeft"] = 5] = "RayLeft";
  InputType2[InputType2["RayRight"] = 6] = "RayRight";
})(InputType || (InputType = {}));
var LightType;
(function(LightType2) {
  LightType2[LightType2["Point"] = 0] = "Point";
  LightType2[LightType2["Spot"] = 1] = "Spot";
  LightType2[LightType2["Sun"] = 2] = "Sun";
})(LightType || (LightType = {}));
var AnimationState;
(function(AnimationState2) {
  AnimationState2[AnimationState2["Playing"] = 0] = "Playing";
  AnimationState2[AnimationState2["Paused"] = 1] = "Paused";
  AnimationState2[AnimationState2["Stopped"] = 2] = "Stopped";
})(AnimationState || (AnimationState = {}));
var ForceMode;
(function(ForceMode2) {
  ForceMode2[ForceMode2["Force"] = 0] = "Force";
  ForceMode2[ForceMode2["Impulse"] = 1] = "Impulse";
  ForceMode2[ForceMode2["VelocityChange"] = 2] = "VelocityChange";
  ForceMode2[ForceMode2["Acceleration"] = 3] = "Acceleration";
})(ForceMode || (ForceMode = {}));
var CollisionEventType;
(function(CollisionEventType2) {
  CollisionEventType2[CollisionEventType2["Touch"] = 0] = "Touch";
  CollisionEventType2[CollisionEventType2["TouchLost"] = 1] = "TouchLost";
  CollisionEventType2[CollisionEventType2["TriggerTouch"] = 2] = "TriggerTouch";
  CollisionEventType2[CollisionEventType2["TriggerTouchLost"] = 3] = "TriggerTouchLost";
})(CollisionEventType || (CollisionEventType = {}));
var Shape;
(function(Shape2) {
  Shape2[Shape2["None"] = 0] = "None";
  Shape2[Shape2["Sphere"] = 1] = "Sphere";
  Shape2[Shape2["Capsule"] = 2] = "Capsule";
  Shape2[Shape2["Box"] = 3] = "Box";
  Shape2[Shape2["Plane"] = 4] = "Plane";
  Shape2[Shape2["ConvexMesh"] = 5] = "ConvexMesh";
  Shape2[Shape2["TriangleMesh"] = 6] = "TriangleMesh";
})(Shape || (Shape = {}));
var MeshAttribute;
(function(MeshAttribute2) {
  MeshAttribute2[MeshAttribute2["Position"] = 0] = "Position";
  MeshAttribute2[MeshAttribute2["Tangent"] = 1] = "Tangent";
  MeshAttribute2[MeshAttribute2["Normal"] = 2] = "Normal";
  MeshAttribute2[MeshAttribute2["TextureCoordinate"] = 3] = "TextureCoordinate";
  MeshAttribute2[MeshAttribute2["Color"] = 4] = "Color";
  MeshAttribute2[MeshAttribute2["JointId"] = 5] = "JointId";
  MeshAttribute2[MeshAttribute2["JointWeight"] = 6] = "JointWeight";
})(MeshAttribute || (MeshAttribute = {}));
var DestroyedObjectInstance = createDestroyedProxy2("object");
var DestroyedComponentInstance = createDestroyedProxy2("component");
var DestroyedPrefabInstance = createDestroyedProxy2("prefab/scene");
function isMeshShape(shape) {
  return shape === Shape.ConvexMesh || shape === Shape.TriangleMesh;
}
function isBaseComponentClass(value) {
  return !!value && value.hasOwnProperty("_isBaseComponent") && value._isBaseComponent;
}
var UP_VECTOR = [0, 1, 0];
var SQRT_3 = Math.sqrt(3);
var _Component = class {
  /**
   * Pack scene index and component id.
   *
   * @param scene Scene index.
   * @param id Component id.
   * @returns The packed id.
   *
   * @hidden
   */
  static _pack(scene, id) {
    return scene << 22 | id;
  }
  /**
   * Allows to inherit properties directly inside the editor.
   *
   * @note Do not use directly, prefer using {@link inheritProperties}.
   *
   * @hidden
   */
  static _inheritProperties() {
    inheritProperties(this);
  }
  /** Manager index. @hidden */
  _manager;
  /** Packed id, containing the scene and the local id. @hidden */
  _id;
  /** Id relative to the scene component's manager. @hidden */
  _localId;
  /**
   * Object containing this object.
   *
   * **Note**: This is cached for faster retrieval.
   *
   * @hidden
   */
  _object;
  /** Scene instance. @hidden */
  _scene;
  /**
   * Create a new instance
   *
   * @param engine The engine instance.
   * @param manager Index of the manager.
   * @param id WASM component instance index.
   *
   * @hidden
   */
  constructor(scene, manager = -1, id = -1) {
    this._scene = scene;
    this._manager = manager;
    this._localId = id;
    this._id = _Component._pack(scene._index, id);
    this._object = null;
  }
  /** Scene this component is part of. */
  get scene() {
    return this._scene;
  }
  /** Hosting engine instance. */
  get engine() {
    return this._scene.engine;
  }
  /** The name of this component's type */
  get type() {
    const ctor = this.constructor;
    return ctor.TypeName;
  }
  /** The object this component is attached to. */
  get object() {
    if (!this._object) {
      const objectId = this.engine.wasm._wl_component_get_object(this._manager, this._id);
      this._object = this._scene.wrap(objectId);
    }
    return this._object;
  }
  /**
   * Set whether this component is active.
   *
   * Activating/deactivating a component comes at a small cost of reordering
   * components in the respective component manager. This function therefore
   * is not a trivial assignment.
   *
   * Does nothing if the component is already activated/deactivated.
   *
   * @param active New active state.
   */
  set active(active) {
    this.engine.wasm._wl_component_setActive(this._manager, this._id, active);
  }
  /** `true` if the component is marked as active and its scene is active. */
  get active() {
    return this.markedActive && this._scene.isActive;
  }
  /**
   * `true` if the component is marked as active in the scene, `false` otherwise.
   *
   * @note At the opposite of {@link Component.active}, this accessor doesn't
   * take into account whether the scene is active or not.
   */
  get markedActive() {
    return this.engine.wasm._wl_component_isActive(this._manager, this._id) != 0;
  }
  /**
   * Copy all the properties from `src` into this instance.
   *
   * @note Only properties are copied. If a component needs to
   * copy extra data, it needs to override this method.
   *
   * #### Example
   *
   * ```js
   * class MyComponent extends Component {
   *     nonPropertyData = 'Hello World';
   *
   *     copy(src) {
   *         super.copy(src);
   *         this.nonPropertyData = src.nonPropertyData;
   *         return this;
   *     }
   * }
   * ```
   *
   * @note This method is called by {@link Object3D.clone}. Do not attempt to:
   *     - Create new component
   *     - Read references to other objects
   *
   * When cloning via {@link Object3D.clone}, this method will be called before
   * {@link Component.start}.
   *
   * @note JavaScript component properties aren't retargeted. Thus, references
   * inside the source object will not be retargeted to the destination object,
   * at the exception of the skin data on {@link MeshComponent} and {@link AnimationComponent}.
   *
   * @param src The source component to copy from.
   *
   * @returns Reference to self (for method chaining).
   */
  copy(src) {
    const ctor = this.constructor;
    const properties = ctor.Properties;
    if (!properties)
      return this;
    for (const name in properties) {
      const property2 = properties[name];
      const value = src[name];
      if (value === void 0)
        continue;
      const cloner = property2.cloner ?? defaultPropertyCloner;
      this[name] = cloner.clone(property2.type, value);
    }
    return this;
  }
  /**
   * Remove this component from its objects and destroy it.
   *
   * It is best practice to set the component to `null` after,
   * to ensure it does not get used later.
   *
   * ```js
   *    c.destroy();
   *    c = null;
   * ```
   * @since 0.9.0
   */
  destroy() {
    const manager = this._manager;
    if (manager < 0 || this._id < 0)
      return;
    this.engine.wasm._wl_component_remove(manager, this._id);
  }
  /**
   * Checks equality by comparing ids and **not** the JavaScript reference.
   *
   * @deprecate Use JavaScript reference comparison instead:
   *
   * ```js
   * const componentA = obj.addComponent('mesh');
   * const componentB = obj.addComponent('mesh');
   * const componentC = componentB;
   * console.log(componentA === componentB); // false
   * console.log(componentA === componentA); // true
   * console.log(componentB === componentC); // true
   * ```
   */
  equals(otherComponent) {
    if (!otherComponent)
      return false;
    return this._manager === otherComponent._manager && this._id === otherComponent._id;
  }
  /**
   * Reset the component properties to default.
   *
   * @note This is automatically called during the component instantiation.
   *
   * @returns Reference to self (for method chaining).
   */
  resetProperties() {
    const ctor = this.constructor;
    const properties = ctor.Properties;
    if (!properties)
      return this;
    for (const name in properties) {
      const property2 = properties[name];
      const cloner = property2.cloner ?? defaultPropertyCloner;
      this[name] = cloner.clone(property2.type, property2.default);
    }
    return this;
  }
  /** @deprecated Use {@link Component.resetProperties} instead. */
  reset() {
    return this.resetProperties();
  }
  /**
   * Validate the properties on this instance.
   *
   * @throws If any of the required properties isn't initialized
   * on this instance.
   */
  validateProperties() {
    const ctor = this.constructor;
    if (!ctor.Properties)
      return;
    for (const name in ctor.Properties) {
      if (!ctor.Properties[name].required)
        continue;
      if (!this[name]) {
        throw new Error(`Property '${name}' is required but was not initialized`);
      }
    }
  }
  /** @overload */
  toString() {
    if (this.isDestroyed) {
      return "Component(destroyed)";
    }
    return `Component('${this.type}', ${this._localId})`;
  }
  /**
   * `true` if the component is destroyed, `false` otherwise.
   *
   * If {@link WonderlandEngine.erasePrototypeOnDestroy} is `true`,
   * reading a custom property will not work:
   *
   * ```js
   * engine.erasePrototypeOnDestroy = true;
   *
   * const comp = obj.addComponent('mesh');
   * comp.customParam = 'Hello World!';
   *
   * console.log(comp.isDestroyed); // Prints `false`
   * comp.destroy();
   * console.log(comp.isDestroyed); // Prints `true`
   * console.log(comp.customParam); // Throws an error
   * ```
   *
   * @since 1.1.1
   */
  get isDestroyed() {
    return this._id < 0;
  }
  _copy(src, offsetsPtr) {
    const wasm = this.engine.wasm;
    const offsets = wasm.HEAPU32;
    const offsetsStart = offsetsPtr >>> 2;
    const destScene = this._scene;
    const ctor = this.constructor;
    for (const name in ctor.Properties) {
      const value = src[name];
      if (value === null) {
        this[name] = null;
        continue;
      }
      const prop = ctor.Properties[name];
      const offset = offsets[offsetsStart + prop.type];
      let retargeted;
      switch (prop.type) {
        case Type.Object: {
          const index = wasm._wl_object_index(value._id);
          const id = wasm._wl_object_id(destScene._index, index + offset);
          retargeted = destScene.wrap(id);
          break;
        }
        case Type.Animation:
          retargeted = destScene.animations.wrap(offset + value._index);
          break;
        case Type.Skin:
          retargeted = destScene.skins.wrap(offset + value._index);
          break;
        default:
          const cloner = prop.cloner ?? defaultPropertyCloner;
          retargeted = cloner.clone(prop.type, value);
          break;
      }
      this[name] = retargeted;
    }
    return this;
  }
  /**
   * Trigger the component {@link Component.init} method.
   *
   * @note Use this method instead of directly calling {@link Component.init},
   * because this method creates an handler for the {@link Component.start}.
   *
   * @note This api is meant to be used internally.
   *
   * @hidden
   */
  _triggerInit() {
    if (this.init) {
      try {
        this.init();
      } catch (e) {
        this.engine.log.error(LogTag.Component, `Exception during ${this.type} init() on object ${this.object.name}`);
        this.engine.log.error(LogTag.Component, e);
      }
    }
    const oldActivate = this.onActivate;
    this.onActivate = function() {
      this.onActivate = oldActivate;
      let failed = false;
      try {
        this.validateProperties();
      } catch (e) {
        this.engine.log.error(LogTag.Component, `Exception during ${this.type} validateProperties() on object ${this.object.name}`);
        this.engine.log.error(LogTag.Component, e);
        failed = true;
      }
      try {
        this.start?.();
      } catch (e) {
        this.engine.log.error(LogTag.Component, `Exception during ${this.type} start() on object ${this.object.name}`);
        this.engine.log.error(LogTag.Component, e);
        failed = true;
      }
      if (failed) {
        this.active = false;
        return;
      }
      if (!this.onActivate)
        return;
      try {
        this.onActivate();
      } catch (e) {
        this.engine.log.error(LogTag.Component, `Exception during ${this.type} onActivate() on object ${this.object.name}`);
        this.engine.log.error(LogTag.Component, e);
      }
    };
  }
  /**
   * Trigger the component {@link Component.update} method.
   *
   * @note This api is meant to be used internally.
   *
   * @hidden
   */
  _triggerUpdate(dt) {
    if (!this.update)
      return;
    try {
      this.update(dt);
    } catch (e) {
      this.engine.log.error(LogTag.Component, `Exception during ${this.type} update() on object ${this.object.name}`);
      this.engine.log.error(LogTag.Component, e);
      if (this.engine.wasm._deactivate_component_on_error) {
        this.active = false;
      }
    }
  }
  /**
   * Trigger the component {@link Component.onActivate} method.
   *
   * @note This api is meant to be used internally.
   *
   * @hidden
   */
  _triggerOnActivate() {
    if (!this.onActivate)
      return;
    try {
      this.onActivate();
    } catch (e) {
      this.engine.log.error(LogTag.Component, `Exception during ${this.type} onActivate() on object ${this.object.name}`);
      this.engine.log.error(LogTag.Component, e);
    }
  }
  /**
   * Trigger the component {@link Component.onDeactivate} method.
   *
   * @note This api is meant to be used internally.
   *
   * @hidden
   */
  _triggerOnDeactivate() {
    if (!this.onDeactivate)
      return;
    try {
      this.onDeactivate();
    } catch (e) {
      this.engine.log.error(LogTag.Component, `Exception during ${this.type} onDeactivate() on object ${this.object.name}`);
      this.engine.log.error(LogTag.Component, e);
    }
  }
  /**
   * Trigger the component {@link Component.onDestroy} method.
   *
   * @note This api is meant to be used internally.
   *
   * @hidden
   */
  _triggerOnDestroy() {
    try {
      if (this.onDestroy)
        this.onDestroy();
    } catch (e) {
      this.engine.log.error(LogTag.Component, `Exception during ${this.type} onDestroy() on object ${this.object.name}`);
      this.engine.log.error(LogTag.Component, e);
    }
    this._scene._components.destroy(this);
  }
};
var Component = _Component;
/**
 * `true` for every class inheriting from this class.
 *
 * @note This is a workaround for `instanceof` to prevent issues
 * that could arise when an application ends up using multiple API versions.
 *
 * @hidden
 */
__publicField(Component, "_isBaseComponent", true);
/**
 * Fixed order of attributes in the `Properties` array.
 *
 * @note This is used for parameter deserialization and is filled during
 * component registration.
 *
 * @hidden
 */
__publicField(Component, "_propertyOrder", []);
/**
 * Unique identifier for this component class.
 *
 * This is used to register, add, and retrieve components of a given type.
 */
__publicField(Component, "TypeName");
/**
 * Properties of this component class.
 *
 * Properties are public attributes that can be configured via the
 * Wonderland Editor.
 *
 * Example:
 *
 * ```js
 * import { Component, Type } from '@wonderlandengine/api';
 * class MyComponent extends Component {
 *     static TypeName = 'my-component';
 *     static Properties = {
 *         myBoolean: { type: Type.Boolean, default: false },
 *         myFloat: { type: Type.Float, default: false },
 *         myTexture: { type: Type.Texture, default: null },
 *     };
 * }
 * ```
 *
 * Properties are automatically added to each component instance, and are
 * accessible like any JS attribute:
 *
 * ```js
 * // Creates a new component and set each properties value:
 * const myComponent = object.addComponent(MyComponent, {
 *     myBoolean: true,
 *     myFloat: 42.0,
 *     myTexture: null
 * });
 *
 * // You can also override the properties on the instance:
 * myComponent.myBoolean = false;
 * myComponent.myFloat = -42.0;
 * ```
 *
 * #### References
 *
 * Reference types (i.e., mesh, object, etc...) can also be listed as **required**:
 *
 * ```js
 * import {Component, Property} from '@wonderlandengine/api';
 *
 * class MyComponent extends Component {
 *     static Properties = {
 *         myObject: Property.object({required: true}),
 *         myAnimation: Property.animation({required: true}),
 *         myTexture: Property.texture({required: true}),
 *         myMesh: Property.mesh({required: true}),
 *     }
 * }
 * ```
 *
 * Please note that references are validated **once** before the call to {@link Component.start} only,
 * via the {@link Component.validateProperties} method.
 */
__publicField(Component, "Properties");
/**
 * When set to `true`, the child class inherits from the parent
 * properties, as shown in the following example:
 *
 * ```js
 * import {Component, Property} from '@wonderlandengine/api';
 *
 * class Parent extends Component {
 *     static TypeName = 'parent';
 *     static Properties = {parentName: Property.string('parent')}
 * }
 *
 * class Child extends Parent {
 *     static TypeName = 'child';
 *     static Properties = {name: Property.string('child')}
 *     static InheritProperties = true;
 *
 *     start() {
 *         // Works because `InheritProperties` is `true`.
 *         console.log(`${this.name} inherits from ${this.parentName}`);
 *     }
 * }
 * ```
 *
 * @note Properties defined in descendant classes will override properties
 * with the same name defined in ancestor classes.
 *
 * Defaults to `true`.
 */
__publicField(Component, "InheritProperties");
/**
 * Called when this component class is registered.
 *
 * @example
 *
 * This callback can be used to register dependencies of a component,
 * e.g., component classes that need to be registered in order to add
 * them at runtime with {@link Object3D.addComponent}, independent of whether
 * they are used in the editor.
 *
 * ```js
 * class Spawner extends Component {
 *     static TypeName = 'spawner';
 *
 *     static onRegister(engine) {
 *         engine.registerComponent(SpawnedComponent);
 *     }
 *
 *     // You can now use addComponent with SpawnedComponent
 * }
 * ```
 *
 * @example
 *
 * This callback can be used to register different implementations of a
 * component depending on client features or API versions.
 *
 * ```js
 * // Properties need to be the same for all implementations!
 * const SharedProperties = {};
 *
 * class Anchor extends Component {
 *     static TypeName = 'spawner';
 *     static Properties = SharedProperties;
 *
 *     static onRegister(engine) {
 *         if(navigator.xr === undefined) {
 *             /* WebXR unsupported, keep this dummy component *\/
 *             return;
 *         }
 *         /* WebXR supported! Override already registered dummy implementation
 *          * with one depending on hit-test API support *\/
 *         engine.registerComponent(window.HitTestSource === undefined ?
 *             AnchorWithoutHitTest : AnchorWithHitTest);
 *     }
 *
 *     // This one implements no functions
 * }
 * ```
 */
__publicField(Component, "onRegister");
var BrokenComponent = class extends Component {
};
__publicField(BrokenComponent, "TypeName", "__broken-component__");
function inheritProperties(target) {
  if (!target.TypeName)
    return;
  const chain = [];
  let curr = target;
  while (curr && !isBaseComponentClass(curr)) {
    const comp = curr;
    const needsMerge = comp.hasOwnProperty("InheritProperties") ? comp.InheritProperties : true;
    if (!needsMerge)
      break;
    if (comp.TypeName && comp.hasOwnProperty("Properties")) {
      chain.push(comp);
    }
    curr = Object.getPrototypeOf(curr);
  }
  if (!chain.length || chain.length === 1 && chain[0] === target) {
    return;
  }
  const merged = {};
  for (let i = chain.length - 1; i >= 0; --i) {
    Object.assign(merged, chain[i].Properties);
  }
  target.Properties = merged;
}
var CollisionComponent = class extends Component {
  getExtents(out = new Float32Array(3)) {
    const wasm = this.engine.wasm;
    const ptr = wasm._wl_collision_component_get_extents(this._id) / 4;
    out[0] = wasm.HEAPF32[ptr];
    out[1] = wasm.HEAPF32[ptr + 1];
    out[2] = wasm.HEAPF32[ptr + 2];
    return out;
  }
  /** Collision component collider */
  get collider() {
    return this.engine.wasm._wl_collision_component_get_collider(this._id);
  }
  /**
   * Set collision component collider.
   *
   * @param collider Collider of the collision component.
   */
  set collider(collider) {
    this.engine.wasm._wl_collision_component_set_collider(this._id, collider);
  }
  /**
   * Equivalent to {@link CollisionComponent.getExtents}.
   *
   * @note Prefer to use {@link CollisionComponent.getExtents} for performance.
   */
  get extents() {
    const wasm = this.engine.wasm;
    return new Float32Array(wasm.HEAPF32.buffer, wasm._wl_collision_component_get_extents(this._id), 3);
  }
  /**
   * Set collision component extents.
   *
   * If {@link collider} returns {@link Collider.Sphere}, only the first
   * component of the passed vector is used.
   *
   * Example:
   *
   * ```js
   * // Spans 1 unit on the x-axis, 2 on the y-axis, 3 on the z-axis.
   * collision.extent = [1, 2, 3];
   * ```
   *
   * @param extents Extents of the collision component, expects a
   *      3 component array.
   */
  set extents(extents) {
    const wasm = this.engine.wasm;
    const ptr = wasm._wl_collision_component_get_extents(this._id) / 4;
    wasm.HEAPF32[ptr] = extents[0];
    wasm.HEAPF32[ptr + 1] = extents[1];
    wasm.HEAPF32[ptr + 2] = extents[2];
  }
  /**
   * Get collision component radius.
   *
   * @note If {@link collider} is not {@link Collider.Sphere}, the returned value
   * corresponds to the radius of a sphere enclosing the shape.
   *
   * Example:
   *
   * ```js
   * sphere.radius = 3.0;
   * console.log(sphere.radius); // 3.0
   *
   * box.extents = [2.0, 2.0, 2.0];
   * console.log(box.radius); // 1.732...
   * ```
   *
   */
  get radius() {
    const wasm = this.engine.wasm;
    if (this.collider === Collider.Sphere)
      return wasm.HEAPF32[wasm._wl_collision_component_get_extents(this._id) >> 2];
    const extents = new Float32Array(wasm.HEAPF32.buffer, wasm._wl_collision_component_get_extents(this._id), 3);
    const x2 = extents[0] * extents[0];
    const y2 = extents[1] * extents[1];
    const z2 = extents[2] * extents[2];
    return Math.sqrt(x2 + y2 + z2) / 2;
  }
  /**
   * Set collision component radius.
   *
   * @param radius Radius of the collision component
   *
   * @note If {@link collider} is not {@link Collider.Sphere},
   * the extents are set to form a square that fits a sphere with the provided radius.
   *
   * Example:
   *
   * ```js
   * aabbCollision.radius = 2.0; // AABB fits a sphere of radius 2.0
   * boxCollision.radius = 3.0; // Box now fits a sphere of radius 3.0, keeping orientation
   * ```
   *
   */
  set radius(radius) {
    const length = this.collider === Collider.Sphere ? radius : 2 * radius / SQRT_3;
    this.extents.set([length, length, length]);
  }
  /**
   * Collision component group.
   *
   * The groups is a bitmask that is compared to other components in {@link CollisionComponent#queryOverlaps}
   * or the group in {@link Scene#rayCast}.
   *
   * Colliders that have no common groups will not overlap with each other. If a collider
   * has none of the groups set for {@link Scene#rayCast}, the ray will not hit it.
   *
   * Each bit represents belonging to a group, see example.
   *
   * ```js
   *    // c belongs to group 2
   *    c.group = (1 << 2);
   *
   *    // c belongs to group 0
   *    c.group = (1 << 0);
   *
   *    // c belongs to group 0 *and* 2
   *    c.group = (1 << 0) | (1 << 2);
   *
   *    (c.group & (1 << 2)) != 0; // true
   *    (c.group & (1 << 7)) != 0; // false
   * ```
   */
  get group() {
    return this.engine.wasm._wl_collision_component_get_group(this._id);
  }
  /**
   * Set collision component group.
   *
   * @param group Group mask of the collision component.
   */
  set group(group) {
    this.engine.wasm._wl_collision_component_set_group(this._id, group);
  }
  /**
   * Query overlapping objects.
   *
   * Usage:
   *
   * ```js
   * const collision = object.getComponent('collision');
   * const overlaps = collision.queryOverlaps();
   * for(const otherCollision of overlaps) {
   *     const otherObject = otherCollision.object;
   *     console.log(`Collision with object ${otherObject.objectId}`);
   * }
   * ```
   *
   * @returns Collision components overlapping this collider.
   */
  queryOverlaps() {
    const count = this.engine.wasm._wl_collision_component_query_overlaps(this._id, this.engine.wasm._tempMem, this.engine.wasm._tempMemSize >> 1);
    const overlaps = new Array(count);
    for (let i = 0; i < count; ++i) {
      const id = this.engine.wasm._tempMemUint16[i];
      overlaps[i] = this._scene._components.wrapCollision(id);
    }
    return overlaps;
  }
};
/** @override */
__publicField(CollisionComponent, "TypeName", "collision");
__decorate([
  nativeProperty()
], CollisionComponent.prototype, "collider", null);
__decorate([
  nativeProperty()
], CollisionComponent.prototype, "extents", null);
__decorate([
  nativeProperty()
], CollisionComponent.prototype, "group", null);
var TextComponent = class extends Component {
  /** Text component alignment. */
  get alignment() {
    return this.engine.wasm._wl_text_component_get_horizontal_alignment(this._id);
  }
  /**
   * Set text component alignment.
   *
   * @param alignment Alignment for the text component.
   */
  set alignment(alignment) {
    this.engine.wasm._wl_text_component_set_horizontal_alignment(this._id, alignment);
  }
  /**
   * Text component vertical alignment.
   * @since 1.2.0
   */
  get verticalAlignment() {
    return this.engine.wasm._wl_text_component_get_vertical_alignment(this._id);
  }
  /**
   * Set text component vertical alignment.
   *
   * @param verticalAlignment Vertical for the text component.
   * @since 1.2.0
   */
  set verticalAlignment(verticalAlignment) {
    this.engine.wasm._wl_text_component_set_vertical_alignment(this._id, verticalAlignment);
  }
  /**
   * Text component justification.
   *
   * @deprecated Please use {@link TextComponent.verticalAlignment} instead.
   */
  get justification() {
    return this.verticalAlignment;
  }
  /**
   * Set text component justification.
   *
   * @param justification Justification for the text component.
   *
   * @deprecated Please use {@link TextComponent.verticalAlignment} instead.
   */
  set justification(justification) {
    this.verticalAlignment = justification;
  }
  /** Text component character spacing. */
  get characterSpacing() {
    return this.engine.wasm._wl_text_component_get_character_spacing(this._id);
  }
  /**
   * Set text component character spacing.
   *
   * @param spacing Character spacing for the text component.
   */
  set characterSpacing(spacing) {
    this.engine.wasm._wl_text_component_set_character_spacing(this._id, spacing);
  }
  /** Text component line spacing. */
  get lineSpacing() {
    return this.engine.wasm._wl_text_component_get_line_spacing(this._id);
  }
  /**
   * Set text component line spacing
   *
   * @param spacing Line spacing for the text component
   */
  set lineSpacing(spacing) {
    this.engine.wasm._wl_text_component_set_line_spacing(this._id, spacing);
  }
  /** Text component effect. */
  get effect() {
    return this.engine.wasm._wl_text_component_get_effect(this._id);
  }
  /**
   * Set text component effect
   *
   * @param effect Effect for the text component
   */
  set effect(effect) {
    this.engine.wasm._wl_text_component_set_effect(this._id, effect);
  }
  /** Text component text. */
  get text() {
    const wasm = this.engine.wasm;
    const ptr = wasm._wl_text_component_get_text(this._id);
    return wasm.UTF8ToString(ptr);
  }
  /**
   * Set text component text.
   *
   * @param text Text of the text component.
   */
  set text(text) {
    const wasm = this.engine.wasm;
    wasm._wl_text_component_set_text(this._id, wasm.tempUTF8(text.toString()));
  }
  /**
   * Set material to render the text with.
   *
   * @param material New material.
   */
  set material(material) {
    const matIndex = material ? material._id : 0;
    this.engine.wasm._wl_text_component_set_material(this._id, matIndex);
  }
  /** Material used to render the text. */
  get material() {
    const index = this.engine.wasm._wl_text_component_get_material(this._id);
    return this.engine.materials.wrap(index);
  }
  /**
   * Axis-aligned bounding box for a given text, in object space.
   *
   * To calculate the size for the currently set text, use
   * {@link getBoundingBox}.
   *
   * Useful for calculating the text size before an update and potentially
   * adjusting the text:
   *
   * ```js
   * let updatedName = 'some very long name';
   * const box = new Float32Array(4);
   * text.getBoundingBoxForText(updatedName, box);
   * const width = box[2] - box[0];
   * if(width > 2.0) {
   *     updatedName = updatedName.slice(0, 5) + '...';
   * }
   * text.text = updatedName;
   * ```
   *
   * @param text Text string to calculate the bounding box for.
   * @param out Preallocated array to write into, to avoid garbage,
   *     otherwise will allocate a new Float32Array.
   *
   * @returns Bounding box - left, bottom, right, top.
   */
  getBoundingBoxForText(text, out = new Float32Array(4)) {
    const wasm = this.engine.wasm;
    const textPtr = wasm.tempUTF8(text, 4 * 4);
    this.engine.wasm._wl_text_component_get_boundingBox(this._id, textPtr, wasm._tempMem);
    out[0] = wasm._tempMemFloat[0];
    out[1] = wasm._tempMemFloat[1];
    out[2] = wasm._tempMemFloat[2];
    out[3] = wasm._tempMemFloat[3];
    return out;
  }
  /**
   * Axis-aligned bounding box, in object space.
   *
   * The bounding box is computed using the current component properties
   * that influence the position and size of the text. The bounding box is
   * affected by alignment, spacing, effect type and the font set in the
   * material.
   *
   * To calculate the size for a different text, use
   * {@link getBoundingBoxForText}.
   *
   * Useful for adjusting text position or scaling:
   *
   * ```js
   * const box = new Float32Array(4);
   * text.getBoundingBox(box);
   * const width = box[2] - box[0];
   * // Make text 1m wide
   * text.object.setScalingLocal([1/width, 1, 1]);
   * ```
   *
   * @param text Text string to calculate the bounding box for.
   * @param out Preallocated array to write into, to avoid garbage,
   *     otherwise will allocate a new Float32Array.
   *
   * @returns Bounding box - left, bottom, right, top.
   */
  getBoundingBox(out = new Float32Array(4)) {
    const wasm = this.engine.wasm;
    this.engine.wasm._wl_text_component_get_boundingBox(this._id, 0, wasm._tempMem);
    out[0] = wasm._tempMemFloat[0];
    out[1] = wasm._tempMemFloat[1];
    out[2] = wasm._tempMemFloat[2];
    out[3] = wasm._tempMemFloat[3];
    return out;
  }
};
/** @override */
__publicField(TextComponent, "TypeName", "text");
__decorate([
  nativeProperty()
], TextComponent.prototype, "alignment", null);
__decorate([
  nativeProperty()
], TextComponent.prototype, "verticalAlignment", null);
__decorate([
  nativeProperty()
], TextComponent.prototype, "justification", null);
__decorate([
  nativeProperty()
], TextComponent.prototype, "characterSpacing", null);
__decorate([
  nativeProperty()
], TextComponent.prototype, "lineSpacing", null);
__decorate([
  nativeProperty()
], TextComponent.prototype, "effect", null);
__decorate([
  nativeProperty()
], TextComponent.prototype, "text", null);
__decorate([
  nativeProperty()
], TextComponent.prototype, "material", null);
var ViewComponent = class extends Component {
  getProjectionMatrix(out = new Float32Array(16)) {
    const wasm = this.engine.wasm;
    const ptr = wasm._wl_view_component_get_projection_matrix(this._id) / 4;
    for (let i = 0; i < 16; ++i) {
      out[i] = wasm.HEAPF32[ptr + i];
    }
    return out;
  }
  /**
   * Equivalent to {@link ViewComponent.getProjectionMatrix}.
   *
   * @note Prefer to use {@link ViewComponent.getProjectionMatrix} for performance.
   */
  get projectionMatrix() {
    const wasm = this.engine.wasm;
    return new Float32Array(wasm.HEAPF32.buffer, wasm._wl_view_component_get_projection_matrix(this._id), 16);
  }
  /** ViewComponent near clipping plane value. */
  get near() {
    return this.engine.wasm._wl_view_component_get_near(this._id);
  }
  /**
   * Set near clipping plane distance for the view.
   *
   * If an XR session is active, the change will apply in the
   * following frame, otherwise the change is immediate.
   *
   * @param near Near depth value.
   */
  set near(near) {
    this.engine.wasm._wl_view_component_set_near(this._id, near);
  }
  /** Far clipping plane value. */
  get far() {
    return this.engine.wasm._wl_view_component_get_far(this._id);
  }
  /**
   * Set far clipping plane distance for the view.
   *
   * If an XR session is active, the change will apply in the
   * following frame, otherwise the change is immediate.
   *
   * @param far Near depth value.
   */
  set far(far) {
    this.engine.wasm._wl_view_component_set_far(this._id, far);
  }
  /**
   * Get the horizontal field of view for the view, **in degrees**.
   *
   * If an XR session is active, this returns the field of view reported by
   * the device, regardless of the fov that was set.
   */
  get fov() {
    return this.engine.wasm._wl_view_component_get_fov(this._id);
  }
  /**
   * Set the horizontal field of view for the view, **in degrees**.
   *
   * If an XR session is active, the field of view reported by the device is
   * used and this value is ignored. After the XR session ends, the new value
   * is applied.
   *
   * @param fov Horizontal field of view, **in degrees**.
   */
  set fov(fov) {
    this.engine.wasm._wl_view_component_set_fov(this._id, fov);
  }
};
/** @override */
__publicField(ViewComponent, "TypeName", "view");
__decorate([
  enumerable()
], ViewComponent.prototype, "projectionMatrix", null);
__decorate([
  nativeProperty()
], ViewComponent.prototype, "near", null);
__decorate([
  nativeProperty()
], ViewComponent.prototype, "far", null);
__decorate([
  nativeProperty()
], ViewComponent.prototype, "fov", null);
var InputComponent = class extends Component {
  /** Input component type */
  get inputType() {
    return this.engine.wasm._wl_input_component_get_type(this._id);
  }
  /**
   * Set input component type.
   *
   * @params New input component type.
   */
  set inputType(type) {
    this.engine.wasm._wl_input_component_set_type(this._id, type);
  }
  /**
   * WebXR Device API input source associated with this input component,
   * if type {@link InputType.ControllerLeft} or {@link InputType.ControllerRight}.
   */
  get xrInputSource() {
    const xr = this.engine.xr;
    if (!xr)
      return null;
    for (let inputSource of xr.session.inputSources) {
      if (inputSource.handedness == this.handedness) {
        return inputSource;
      }
    }
    return null;
  }
  /**
   * 'left', 'right' or `null` depending on the {@link InputComponent#inputType}.
   */
  get handedness() {
    const inputType = this.inputType;
    if (inputType == InputType.ControllerRight || inputType == InputType.RayRight || inputType == InputType.EyeRight)
      return "right";
    if (inputType == InputType.ControllerLeft || inputType == InputType.RayLeft || inputType == InputType.EyeLeft)
      return "left";
    return null;
  }
};
/** @override */
__publicField(InputComponent, "TypeName", "input");
__decorate([
  nativeProperty()
], InputComponent.prototype, "inputType", null);
__decorate([
  enumerable()
], InputComponent.prototype, "xrInputSource", null);
__decorate([
  enumerable()
], InputComponent.prototype, "handedness", null);
var LightComponent = class extends Component {
  getColor(out = new Float32Array(3)) {
    const wasm = this.engine.wasm;
    const ptr = wasm._wl_light_component_get_color(this._id) / 4;
    out[0] = wasm.HEAPF32[ptr];
    out[1] = wasm.HEAPF32[ptr + 1];
    out[2] = wasm.HEAPF32[ptr + 2];
    return out;
  }
  /**
   * Set light color.
   *
   * @param c New color array/vector, expected to have at least 3 elements.
   * @since 1.0.0
   */
  setColor(c) {
    const wasm = this.engine.wasm;
    const ptr = wasm._wl_light_component_get_color(this._id) / 4;
    wasm.HEAPF32[ptr] = c[0];
    wasm.HEAPF32[ptr + 1] = c[1];
    wasm.HEAPF32[ptr + 2] = c[2];
  }
  /**
   * View on the light color.
   *
   * @note Prefer to use {@link getColor} in performance-critical code.
   */
  get color() {
    const wasm = this.engine.wasm;
    return new Float32Array(wasm.HEAPF32.buffer, wasm._wl_light_component_get_color(this._id), 3);
  }
  /**
   * Set light color.
   *
   * @param c Color of the light component.
   *
   * @note Prefer to use {@link setColor} in performance-critical code.
   */
  set color(c) {
    this.color.set(c);
  }
  /** Light type. */
  get lightType() {
    return this.engine.wasm._wl_light_component_get_type(this._id);
  }
  /**
   * Set light type.
   *
   * @param lightType Type of the light component.
   */
  set lightType(t) {
    this.engine.wasm._wl_light_component_set_type(this._id, t);
  }
  /**
   * Light intensity.
   * @since 1.0.0
   */
  get intensity() {
    return this.engine.wasm._wl_light_component_get_intensity(this._id);
  }
  /**
   * Set light intensity.
   *
   * @param intensity Intensity of the light component.
   * @since 1.0.0
   */
  set intensity(intensity) {
    this.engine.wasm._wl_light_component_set_intensity(this._id, intensity);
  }
  /**
   * Outer angle for spot lights, in degrees.
   * @since 1.0.0
   */
  get outerAngle() {
    return this.engine.wasm._wl_light_component_get_outerAngle(this._id);
  }
  /**
   * Set outer angle for spot lights.
   *
   * @param angle Outer angle, in degrees.
   * @since 1.0.0
   */
  set outerAngle(angle) {
    this.engine.wasm._wl_light_component_set_outerAngle(this._id, angle);
  }
  /**
   * Inner angle for spot lights, in degrees.
   * @since 1.0.0
   */
  get innerAngle() {
    return this.engine.wasm._wl_light_component_get_innerAngle(this._id);
  }
  /**
   * Set inner angle for spot lights.
   *
   * @param angle Inner angle, in degrees.
   * @since 1.0.0
   */
  set innerAngle(angle) {
    this.engine.wasm._wl_light_component_set_innerAngle(this._id, angle);
  }
  /**
   * Whether the light casts shadows.
   * @since 1.0.0
   */
  get shadows() {
    return !!this.engine.wasm._wl_light_component_get_shadows(this._id);
  }
  /**
   * Set whether the light casts shadows.
   *
   * @param b Whether the light casts shadows.
   * @since 1.0.0
   */
  set shadows(b) {
    this.engine.wasm._wl_light_component_set_shadows(this._id, b);
  }
  /**
   * Range for shadows.
   * @since 1.0.0
   */
  get shadowRange() {
    return this.engine.wasm._wl_light_component_get_shadowRange(this._id);
  }
  /**
   * Set range for shadows.
   *
   * @param range Range for shadows.
   * @since 1.0.0
   */
  set shadowRange(range) {
    this.engine.wasm._wl_light_component_set_shadowRange(this._id, range);
  }
  /**
   * Bias value for shadows.
   * @since 1.0.0
   */
  get shadowBias() {
    return this.engine.wasm._wl_light_component_get_shadowBias(this._id);
  }
  /**
   * Set bias value for shadows.
   *
   * @param bias Bias for shadows.
   * @since 1.0.0
   */
  set shadowBias(bias) {
    this.engine.wasm._wl_light_component_set_shadowBias(this._id, bias);
  }
  /**
   * Normal bias value for shadows.
   * @since 1.0.0
   */
  get shadowNormalBias() {
    return this.engine.wasm._wl_light_component_get_shadowNormalBias(this._id);
  }
  /**
   * Set normal bias value for shadows.
   *
   * @param bias Normal bias for shadows.
   * @since 1.0.0
   */
  set shadowNormalBias(bias) {
    this.engine.wasm._wl_light_component_set_shadowNormalBias(this._id, bias);
  }
  /**
   * Texel size for shadows.
   * @since 1.0.0
   */
  get shadowTexelSize() {
    return this.engine.wasm._wl_light_component_get_shadowTexelSize(this._id);
  }
  /**
   * Set texel size for shadows.
   *
   * @param size Texel size for shadows.
   * @since 1.0.0
   */
  set shadowTexelSize(size) {
    this.engine.wasm._wl_light_component_set_shadowTexelSize(this._id, size);
  }
  /**
   * Cascade count for {@link LightType.Sun} shadows.
   * @since 1.0.0
   */
  get cascadeCount() {
    return this.engine.wasm._wl_light_component_get_cascadeCount(this._id);
  }
  /**
   * Set cascade count for {@link LightType.Sun} shadows.
   *
   * @param count Cascade count.
   * @since 1.0.0
   */
  set cascadeCount(count) {
    this.engine.wasm._wl_light_component_set_cascadeCount(this._id, count);
  }
};
/** @override */
__publicField(LightComponent, "TypeName", "light");
__decorate([
  nativeProperty()
], LightComponent.prototype, "color", null);
__decorate([
  nativeProperty()
], LightComponent.prototype, "lightType", null);
__decorate([
  nativeProperty()
], LightComponent.prototype, "intensity", null);
__decorate([
  nativeProperty()
], LightComponent.prototype, "outerAngle", null);
__decorate([
  nativeProperty()
], LightComponent.prototype, "innerAngle", null);
__decorate([
  nativeProperty()
], LightComponent.prototype, "shadows", null);
__decorate([
  nativeProperty()
], LightComponent.prototype, "shadowRange", null);
__decorate([
  nativeProperty()
], LightComponent.prototype, "shadowBias", null);
__decorate([
  nativeProperty()
], LightComponent.prototype, "shadowNormalBias", null);
__decorate([
  nativeProperty()
], LightComponent.prototype, "shadowTexelSize", null);
__decorate([
  nativeProperty()
], LightComponent.prototype, "cascadeCount", null);
var AnimationComponent = class extends Component {
  /**
   * Emitter for animation events triggered on this component.
   *
   * The first argument is the name of the event.
   */
  onEvent = new Emitter();
  /**
   * Set animation to play.
   *
   * Make sure to {@link Animation#retarget} the animation to affect the
   * right objects.
   *
   * @param anim Animation to play.
   */
  set animation(anim) {
    this.scene.assertOrigin(anim);
    this.engine.wasm._wl_animation_component_set_animation(this._id, anim ? anim._id : 0);
  }
  /** Animation set for this component */
  get animation() {
    const index = this.engine.wasm._wl_animation_component_get_animation(this._id);
    return this._scene.animations.wrap(index);
  }
  /**
   * Set play count. Set to `0` to loop indefinitely.
   *
   * @param playCount Number of times to repeat the animation.
   */
  set playCount(playCount) {
    this.engine.wasm._wl_animation_component_set_playCount(this._id, playCount);
  }
  /** Number of times the animation is played. */
  get playCount() {
    return this.engine.wasm._wl_animation_component_get_playCount(this._id);
  }
  /**
   * Set speed. Set to negative values to run the animation backwards.
   *
   * Setting speed has an immediate effect for the current frame's update
   * and will continue with the speed from the current point in the animation.
   *
   * @param speed New speed at which to play the animation.
   * @since 0.8.10
   */
  set speed(speed) {
    this.engine.wasm._wl_animation_component_set_speed(this._id, speed);
  }
  /**
   * Speed factor at which the animation is played.
   *
   * @since 0.8.10
   */
  get speed() {
    return this.engine.wasm._wl_animation_component_get_speed(this._id);
  }
  /** Current playing state of the animation */
  get state() {
    return this.engine.wasm._wl_animation_component_state(this._id);
  }
  /**
   * Play animation.
   *
   * If the animation is currently paused, resumes from that position. If the
   * animation is already playing, does nothing.
   *
   * To restart the animation, {@link AnimationComponent#stop} it first.
   */
  play() {
    this.engine.wasm._wl_animation_component_play(this._id);
  }
  /** Stop animation. */
  stop() {
    this.engine.wasm._wl_animation_component_stop(this._id);
  }
  /** Pause animation. */
  pause() {
    this.engine.wasm._wl_animation_component_pause(this._id);
  }
  /**
   * Get the value of a float parameter in the attached graph.
   * Throws if the parameter is missing.
   *
   * @param name Name of the parameter.
   * @since 1.2.0
   */
  getFloatParameter(name) {
    const wasm = this.engine.wasm;
    const index = wasm._wl_animation_component_getGraphParamIndex(this._id, wasm.tempUTF8(name));
    if (index === -1) {
      throw Error(`Missing parameter '${name}'`);
    }
    wasm._wl_animation_component_getGraphParamValue(this._id, index, wasm._tempMem);
    return wasm._tempMemFloat[0];
  }
  /**
   * Set the value of a float parameter in the attached graph
   * Throws if the parameter is missing.
   *
   * @param name Name of the parameter.
   * @param value Float value to set.
   * @returns 1 if the parameter was successfully set, 0 on fail.
   * @since 1.2.0
   */
  setFloatParameter(name, value) {
    const wasm = this.engine.wasm;
    const index = wasm._wl_animation_component_getGraphParamIndex(this._id, wasm.tempUTF8(name));
    if (index === -1) {
      throw Error(`Missing parameter '${name}'`);
    }
    wasm._tempMemFloat[0] = value;
    wasm._wl_animation_component_setGraphParamValue(this._id, index, wasm._tempMem);
  }
};
/** @override */
__publicField(AnimationComponent, "TypeName", "animation");
__decorate([
  nativeProperty()
], AnimationComponent.prototype, "animation", null);
__decorate([
  nativeProperty()
], AnimationComponent.prototype, "playCount", null);
__decorate([
  nativeProperty()
], AnimationComponent.prototype, "speed", null);
__decorate([
  enumerable()
], AnimationComponent.prototype, "state", null);
var MeshComponent = class extends Component {
  /**
   * Set material to render the mesh with.
   *
   * @param material Material to render the mesh with.
   */
  set material(material) {
    this.engine.wasm._wl_mesh_component_set_material(this._id, material ? material._id : 0);
  }
  /** Material used to render the mesh. */
  get material() {
    const index = this.engine.wasm._wl_mesh_component_get_material(this._id);
    return this.engine.materials.wrap(index);
  }
  /** Mesh rendered by this component. */
  get mesh() {
    const index = this.engine.wasm._wl_mesh_component_get_mesh(this._id);
    return this.engine.meshes.wrap(index);
  }
  /**
   * Set mesh to rendered with this component.
   *
   * @param mesh Mesh rendered by this component.
   */
  set mesh(mesh) {
    this.engine.wasm._wl_mesh_component_set_mesh(this._id, mesh?._id ?? 0);
  }
  /** Skin for this mesh component. */
  get skin() {
    const index = this.engine.wasm._wl_mesh_component_get_skin(this._id);
    return this._scene.skins.wrap(index);
  }
  /**
   * Set skin to transform this mesh component.
   *
   * @param skin Skin to use for rendering skinned meshes.
   */
  set skin(skin) {
    this.scene.assertOrigin(skin);
    this.engine.wasm._wl_mesh_component_set_skin(this._id, skin ? skin._id : 0);
  }
  /**
   * Morph targets for this mesh component.
   *
   * @since 1.2.0
   */
  get morphTargets() {
    const index = this.engine.wasm._wl_mesh_component_get_morph_targets(this._id);
    return this.engine.morphTargets.wrap(index);
  }
  /**
   * Set morph targets to transform this mesh component.
   *
   * @param morphTargets Morph targets to use for rendering.
   *
   * @since 1.2.0
   */
  set morphTargets(morphTargets) {
    this.engine.wasm._wl_mesh_component_set_morph_targets(this._id, morphTargets?._id ?? 0);
  }
  /**
   * Equivalent to {@link getMorphTargetWeights}.
   *
   * @note Prefer to use {@link getMorphTargetWeights} for performance.
   *
   * @since 1.2.0
   */
  get morphTargetWeights() {
    return this.getMorphTargetWeights();
  }
  /**
   * Set the morph target weights to transform this mesh component.
   *
   * @param weights New weights.
   *
   * @since 1.2.0
   */
  set morphTargetWeights(weights) {
    this.setMorphTargetWeights(weights);
  }
  getMorphTargetWeights(out) {
    const wasm = this.engine.wasm;
    const count = wasm._wl_mesh_component_get_morph_target_weights(this._id, wasm._tempMem);
    if (!out) {
      out = new Float32Array(count);
    }
    for (let i = 0; i < count; ++i) {
      out[i] = wasm._tempMemFloat[i];
    }
    return out;
  }
  /**
   * Get the weight of a single morph target.
   *
   * @param target Index of the morph target.
   * @returns The weight.
   *
   * @since 1.2.0
   */
  getMorphTargetWeight(target) {
    const count = this.morphTargets?.count ?? 0;
    if (target >= count) {
      throw new Error(`Index ${target} is out of bounds for ${count} targets`);
    }
    return this.engine.wasm._wl_mesh_component_get_morph_target_weight(this._id, target);
  }
  /**
   * Set morph target weights for this mesh component.
   *
   * @param weights Array of new weights, expected to have at least as many
   *     elements as {@link MorphTargets.count}.
   *
   * @since 1.2.0
   */
  setMorphTargetWeights(weights) {
    const count = this.morphTargets?.count ?? 0;
    if (weights.length !== count) {
      throw new Error(`Expected ${count} weights but got ${weights.length}`);
    }
    const wasm = this.engine.wasm;
    wasm._tempMemFloat.set(weights);
    wasm._wl_mesh_component_set_morph_target_weights(this._id, wasm._tempMem, weights.length);
  }
  /**
   * Set the weight of a single morph target.
   *
   * @param target Index of the morph target.
   * @param weight The new weight.
   *
   * ## Usage
   *
   * ```js
   * const mesh = object.getComponent('mesh');
   * const mouthTarget = mesh.morphTargets.getTargetIndex('mouth');
   * mesh.setMorphTargetWeight(mouthTarget, 0.5);
   * ```
   *
   * @since 1.2.0
   */
  setMorphTargetWeight(target, weight) {
    const count = this.morphTargets?.count ?? 0;
    if (target >= count) {
      throw new Error(`Index ${target} is out of bounds for ${count} targets`);
    }
    this.engine.wasm._wl_mesh_component_set_morph_target_weight(this._id, target, weight);
  }
};
/** @override */
__publicField(MeshComponent, "TypeName", "mesh");
__decorate([
  nativeProperty()
], MeshComponent.prototype, "material", null);
__decorate([
  nativeProperty()
], MeshComponent.prototype, "mesh", null);
__decorate([
  nativeProperty()
], MeshComponent.prototype, "skin", null);
__decorate([
  nativeProperty()
], MeshComponent.prototype, "morphTargets", null);
__decorate([
  nativeProperty()
], MeshComponent.prototype, "morphTargetWeights", null);
var LockAxis;
(function(LockAxis2) {
  LockAxis2[LockAxis2["None"] = 0] = "None";
  LockAxis2[LockAxis2["X"] = 1] = "X";
  LockAxis2[LockAxis2["Y"] = 2] = "Y";
  LockAxis2[LockAxis2["Z"] = 4] = "Z";
})(LockAxis || (LockAxis = {}));
var PhysXComponent = class extends Component {
  getTranslationOffset(out = new Float32Array(3)) {
    const wasm = this.engine.wasm;
    wasm._wl_physx_component_get_offsetTranslation(this._id, wasm._tempMem);
    out[0] = wasm._tempMemFloat[0];
    out[1] = wasm._tempMemFloat[1];
    out[2] = wasm._tempMemFloat[2];
    return out;
  }
  getRotationOffset(out = new Float32Array(4)) {
    const wasm = this.engine.wasm;
    const ptr = wasm._wl_physx_component_get_offsetTransform(this._id) >> 2;
    out[0] = wasm.HEAPF32[ptr];
    out[1] = wasm.HEAPF32[ptr + 1];
    out[2] = wasm.HEAPF32[ptr + 2];
    out[3] = wasm.HEAPF32[ptr + 3];
    return out;
  }
  getExtents(out = new Float32Array(3)) {
    const wasm = this.engine.wasm;
    const ptr = wasm._wl_physx_component_get_extents(this._id) / 4;
    out[0] = wasm.HEAPF32[ptr];
    out[1] = wasm.HEAPF32[ptr + 1];
    out[2] = wasm.HEAPF32[ptr + 2];
    return out;
  }
  getLinearVelocity(out = new Float32Array(3)) {
    const wasm = this.engine.wasm;
    const tempMemFloat = wasm._tempMemFloat;
    wasm._wl_physx_component_get_linearVelocity(this._id, wasm._tempMem);
    out[0] = tempMemFloat[0];
    out[1] = tempMemFloat[1];
    out[2] = tempMemFloat[2];
    return out;
  }
  getAngularVelocity(out = new Float32Array(3)) {
    const wasm = this.engine.wasm;
    const tempMemFloat = wasm._tempMemFloat;
    wasm._wl_physx_component_get_angularVelocity(this._id, wasm._tempMem);
    out[0] = tempMemFloat[0];
    out[1] = tempMemFloat[1];
    out[2] = tempMemFloat[2];
    return out;
  }
  /**
   * Set whether this rigid body is static.
   *
   * Setting this property only takes effect once the component
   * switches from inactive to active.
   *
   * @param b Whether the rigid body should be static.
   */
  set static(b) {
    this.engine.wasm._wl_physx_component_set_static(this._id, b);
  }
  /**
   * Whether this rigid body is static.
   *
   * This property returns whether the rigid body is *effectively*
   * static. If static property was set while the rigid body was
   * active, it will not take effect until the rigid body is set
   * inactive and active again. Until the component is set inactive,
   * this getter will return whether the rigid body is actually
   * static.
   */
  get static() {
    return !!this.engine.wasm._wl_physx_component_get_static(this._id);
  }
  /**
   * Equivalent to {@link PhysXComponent.getTranslationOffset}.
   *
   * Gives a quick view of the offset in a debugger.
   *
   * @note Prefer to use {@link PhysXComponent.getTranslationOffset} for performance.
   *
   * @since 1.1.1
   */
  get translationOffset() {
    return this.getTranslationOffset();
  }
  /**
   * Set the offset translation.
   *
   * The array must be a vector of at least **3** elements.
   *
   * @note The component must be re-activated to apply the change.
   *
   * @since 1.1.1
   */
  set translationOffset(offset) {
    const wasm = this.engine.wasm;
    wasm._wl_physx_component_set_offsetTranslation(this._id, offset[0], offset[1], offset[2]);
  }
  /**
   * Equivalent to {@link PhysXComponent.getRotationOffset}.
   *
   * Gives a quick view of the offset in a debugger.
   *
   * @note Prefer to use {@link PhysXComponent.getRotationOffset} for performance.
   *
   * @since 1.1.1
   */
  get rotationOffset() {
    return this.getRotationOffset();
  }
  /**
   * Set the offset rotation.
   *
   * The array must be a quaternion of at least **4** elements.
   *
   * @note The component must be re-activated to apply the change.
   *
   * @since 1.1.1
   */
  set rotationOffset(offset) {
    const wasm = this.engine.wasm;
    wasm._wl_physx_component_set_offsetRotation(this._id, offset[0], offset[1], offset[2], offset[3]);
  }
  /**
   * Set whether this rigid body is kinematic.
   *
   * @param b Whether the rigid body should be kinematic.
   */
  set kinematic(b) {
    this.engine.wasm._wl_physx_component_set_kinematic(this._id, b);
  }
  /**
   * Whether this rigid body is kinematic.
   */
  get kinematic() {
    return !!this.engine.wasm._wl_physx_component_get_kinematic(this._id);
  }
  /**
   * Set whether this rigid body's gravity is enabled.
   *
   * @param b Whether the rigid body's gravity should be enabled.
   */
  set gravity(b) {
    this.engine.wasm._wl_physx_component_set_gravity(this._id, b);
  }
  /**
   * Whether this rigid body's gravity flag is enabled.
   */
  get gravity() {
    return !!this.engine.wasm._wl_physx_component_get_gravity(this._id);
  }
  /**
   * Set whether this rigid body's simulate flag is enabled.
   *
   * @param b Whether the rigid body's simulate flag should be enabled.
   */
  set simulate(b) {
    this.engine.wasm._wl_physx_component_set_simulate(this._id, b);
  }
  /**
   * Whether this rigid body's simulate flag is enabled.
   */
  get simulate() {
    return !!this.engine.wasm._wl_physx_component_get_simulate(this._id);
  }
  /**
   * Set whether to allow simulation of this rigid body.
   *
   * {@link allowSimulation} and {@link trigger} can not be enabled at the
   * same time. Enabling {@link allowSimulation} while {@link trigger} is enabled
   * will disable {@link trigger}.
   *
   * @param b Whether to allow simulation of this rigid body.
   */
  set allowSimulation(b) {
    this.engine.wasm._wl_physx_component_set_allowSimulation(this._id, b);
  }
  /**
   * Whether to allow simulation of this rigid body.
   */
  get allowSimulation() {
    return !!this.engine.wasm._wl_physx_component_get_allowSimulation(this._id);
  }
  /**
   * Set whether this rigid body may be queried in ray casts.
   *
   * @param b Whether this rigid body may be queried in ray casts.
   */
  set allowQuery(b) {
    this.engine.wasm._wl_physx_component_set_allowQuery(this._id, b);
  }
  /**
   * Whether this rigid body may be queried in ray casts.
   */
  get allowQuery() {
    return !!this.engine.wasm._wl_physx_component_get_allowQuery(this._id);
  }
  /**
   * Set whether this physics body is a trigger.
   *
   * {@link allowSimulation} and {@link trigger} can not be enabled at the
   * same time. Enabling trigger while {@link allowSimulation} is enabled,
   * will disable {@link allowSimulation}.
   *
   * @param b Whether this physics body is a trigger.
   */
  set trigger(b) {
    this.engine.wasm._wl_physx_component_set_trigger(this._id, b);
  }
  /**
   * Whether this physics body is a trigger.
   */
  get trigger() {
    return !!this.engine.wasm._wl_physx_component_get_trigger(this._id);
  }
  /**
   * Set the shape for collision detection.
   *
   * @param s New shape.
   * @since 0.8.5
   */
  set shape(s) {
    this.engine.wasm._wl_physx_component_set_shape(this._id, s);
  }
  /** The shape for collision detection. */
  get shape() {
    return this.engine.wasm._wl_physx_component_get_shape(this._id);
  }
  /**
   * Set additional data for the shape.
   *
   * Retrieved only from {@link PhysXComponent#shapeData}.
   * @since 0.8.10
   */
  set shapeData(d) {
    if (d == null || !isMeshShape(this.shape))
      return;
    this.engine.wasm._wl_physx_component_set_shape_data(this._id, d.index);
  }
  /**
   * Additional data for the shape.
   *
   * `null` for {@link Shape} values: `None`, `Sphere`, `Capsule`, `Box`, `Plane`.
   * `{index: n}` for `TriangleMesh` and `ConvexHull`.
   *
   * This data is currently only for passing onto or creating other {@link PhysXComponent}.
   * @since 0.8.10
   */
  get shapeData() {
    if (!isMeshShape(this.shape))
      return null;
    return {
      index: this.engine.wasm._wl_physx_component_get_shape_data(this._id)
    };
  }
  /**
   * Set the shape extents for collision detection.
   *
   * @param e New extents for the shape.
   * @since 0.8.5
   */
  set extents(e) {
    this.extents.set(e);
  }
  /**
   * Equivalent to {@link PhysXComponent.getExtents}.
   *
   * @note Prefer to use {@link PhysXComponent.getExtents} for performance.
   */
  get extents() {
    const wasm = this.engine.wasm;
    const ptr = wasm._wl_physx_component_get_extents(this._id);
    return new Float32Array(wasm.HEAPF32.buffer, ptr, 3);
  }
  /**
   * Get staticFriction.
   */
  get staticFriction() {
    return this.engine.wasm._wl_physx_component_get_staticFriction(this._id);
  }
  /**
   * Set staticFriction.
   * @param v New staticFriction.
   */
  set staticFriction(v) {
    this.engine.wasm._wl_physx_component_set_staticFriction(this._id, v);
  }
  /**
   * Get dynamicFriction.
   */
  get dynamicFriction() {
    return this.engine.wasm._wl_physx_component_get_dynamicFriction(this._id);
  }
  /**
   * Set dynamicFriction
   * @param v New dynamicDamping.
   */
  set dynamicFriction(v) {
    this.engine.wasm._wl_physx_component_set_dynamicFriction(this._id, v);
  }
  /**
   * Get bounciness.
   * @since 0.9.0
   */
  get bounciness() {
    return this.engine.wasm._wl_physx_component_get_bounciness(this._id);
  }
  /**
   * Set bounciness.
   * @param v New bounciness.
   * @since 0.9.0
   */
  set bounciness(v) {
    this.engine.wasm._wl_physx_component_set_bounciness(this._id, v);
  }
  /**
   * Get linearDamping/
   */
  get linearDamping() {
    return this.engine.wasm._wl_physx_component_get_linearDamping(this._id);
  }
  /**
   * Set linearDamping.
   * @param v New linearDamping.
   */
  set linearDamping(v) {
    this.engine.wasm._wl_physx_component_set_linearDamping(this._id, v);
  }
  /** Get angularDamping. */
  get angularDamping() {
    return this.engine.wasm._wl_physx_component_get_angularDamping(this._id);
  }
  /**
   * Set angularDamping.
   * @param v New angularDamping.
   */
  set angularDamping(v) {
    this.engine.wasm._wl_physx_component_set_angularDamping(this._id, v);
  }
  /**
   * Set linear velocity.
   *
   * [PhysX Manual - "Velocity"](https://gameworksdocs.nvidia.com/PhysX/4.1/documentation/physxguide/Manual/RigidBodyDynamics.html#velocity)
   *
   * Has no effect, if the component is not active.
   *
   * @param v New linear velocity.
   */
  set linearVelocity(v) {
    this.engine.wasm._wl_physx_component_set_linearVelocity(this._id, v[0], v[1], v[2]);
  }
  /**
   * Equivalent to {@link PhysXComponent.getLinearVelocity}.
   *
   * @note Prefer to use {@link PhysXComponent.getLinearVelocity} for performance.
   */
  get linearVelocity() {
    const wasm = this.engine.wasm;
    wasm._wl_physx_component_get_linearVelocity(this._id, wasm._tempMem);
    return new Float32Array(wasm.HEAPF32.buffer, wasm._tempMem, 3);
  }
  /**
   * Set angular velocity
   *
   * [PhysX Manual - "Velocity"](https://gameworksdocs.nvidia.com/PhysX/4.1/documentation/physxguide/Manual/RigidBodyDynamics.html#velocity)
   *
   * Has no effect, if the component is not active.
   *
   * @param v New angular velocity
   */
  set angularVelocity(v) {
    this.engine.wasm._wl_physx_component_set_angularVelocity(this._id, v[0], v[1], v[2]);
  }
  /**
   * Equivalent to {@link PhysXComponent.getAngularVelocity}.
   *
   * @note Prefer to use {@link PhysXComponent.getAngularVelocity} for performance.
   */
  get angularVelocity() {
    const wasm = this.engine.wasm;
    wasm._wl_physx_component_get_angularVelocity(this._id, wasm._tempMem);
    return new Float32Array(wasm.HEAPF32.buffer, wasm._tempMem, 3);
  }
  /**
   * Set the components groups mask.
   *
   * @param flags New flags that need to be set.
   */
  set groupsMask(flags) {
    this.engine.wasm._wl_physx_component_set_groupsMask(this._id, flags);
  }
  /**
   * Get the components groups mask flags.
   *
   * Each bit represents membership to group, see example.
   *
   * ```js
   * // Assign c to group 2
   * c.groupsMask = (1 << 2);
   *
   * // Assign c to group 0
   * c.groupsMask  = (1 << 0);
   *
   * // Assign c to group 0 and 2
   * c.groupsMask = (1 << 0) | (1 << 2);
   *
   * (c.groupsMask & (1 << 2)) != 0; // true
   * (c.groupsMask & (1 << 7)) != 0; // false
   * ```
   */
  get groupsMask() {
    return this.engine.wasm._wl_physx_component_get_groupsMask(this._id);
  }
  /**
   * Set the components blocks mask.
   *
   * @param flags New flags that need to be set.
   */
  set blocksMask(flags) {
    this.engine.wasm._wl_physx_component_set_blocksMask(this._id, flags);
  }
  /**
   * Get the components blocks mask flags.
   *
   * Each bit represents membership to the block, see example.
   *
   * ```js
   * // Block overlap with any objects in group 2
   * c.blocksMask = (1 << 2);
   *
   * // Block overlap with any objects in group 0
   * c.blocksMask  = (1 << 0)
   *
   * // Block overlap with any objects in group 0 and 2
   * c.blocksMask = (1 << 0) | (1 << 2);
   *
   * (c.blocksMask & (1 << 2)) != 0; // true
   * (c.blocksMask & (1 << 7)) != 0; // false
   * ```
   */
  get blocksMask() {
    return this.engine.wasm._wl_physx_component_get_blocksMask(this._id);
  }
  /**
   * Set axes to lock for linear velocity.
   *
   * @param lock The Axis that needs to be set.
   *
   * Combine flags with Bitwise OR:
   *
   * ```js
   * body.linearLockAxis = LockAxis.X | LockAxis.Y; // x and y set
   * body.linearLockAxis = LockAxis.X; // y unset
   * ```
   *
   * @note This has no effect if the component is static.
   */
  set linearLockAxis(lock) {
    this.engine.wasm._wl_physx_component_set_linearLockAxis(this._id, lock);
  }
  /**
   * Get the linear lock axes flags.
   *
   * To get the state of a specific flag, Bitwise AND with the LockAxis needed.
   *
   * ```js
   * if(body.linearLockAxis & LockAxis.Y) {
   *     console.log("The Y flag was set!");
   * }
   * ```
   *
   * @return axes that are currently locked for linear movement.
   */
  get linearLockAxis() {
    return this.engine.wasm._wl_physx_component_get_linearLockAxis(this._id);
  }
  /**
   * Set axes to lock for angular velocity.
   *
   * @param lock The Axis that needs to be set.
   *
   * ```js
   * body.angularLockAxis = LockAxis.X | LockAxis.Y; // x and y set
   * body.angularLockAxis = LockAxis.X; // y unset
   * ```
   *
   * @note This has no effect if the component is static.
   */
  set angularLockAxis(lock) {
    this.engine.wasm._wl_physx_component_set_angularLockAxis(this._id, lock);
  }
  /**
   * Get the angular lock axes flags.
   *
   * To get the state of a specific flag, Bitwise AND with the LockAxis needed:
   *
   * ```js
   * if(body.angularLockAxis & LockAxis.Y) {
   *     console.log("The Y flag was set!");
   * }
   * ```
   *
   * @return axes that are currently locked for angular movement.
   */
  get angularLockAxis() {
    return this.engine.wasm._wl_physx_component_get_angularLockAxis(this._id);
  }
  /**
   * Set mass.
   *
   * [PhysX Manual - "Mass Properties"](https://gameworksdocs.nvidia.com/PhysX/4.1/documentation/physxguide/Manual/RigidBodyDynamics.html#mass-properties)
   *
   * @param m New mass.
   */
  set mass(m) {
    this.engine.wasm._wl_physx_component_set_mass(this._id, m);
  }
  /** Mass */
  get mass() {
    return this.engine.wasm._wl_physx_component_get_mass(this._id);
  }
  /**
   * Set mass space interia tensor.
   *
   * [PhysX Manual - "Mass Properties"](https://gameworksdocs.nvidia.com/PhysX/4.1/documentation/physxguide/Manual/RigidBodyDynamics.html#mass-properties)
   *
   * Has no effect, if the component is not active.
   *
   * @param v New mass space interatia tensor.
   */
  set massSpaceInteriaTensor(v) {
    this.engine.wasm._wl_physx_component_set_massSpaceInertiaTensor(this._id, v[0], v[1], v[2]);
  }
  /**
   * Set the rigid body to sleep upon activation.
   *
   * When asleep, the rigid body will not be simulated until the next contact.
   *
   * @param flag `true` to sleep upon activation.
   *
   * @since 1.1.5
   */
  set sleepOnActivate(flag) {
    this.engine.wasm._wl_physx_component_set_sleepOnActivate(this._id, flag);
  }
  /**
   * `true` if the rigid body is set to sleep upon activation, `false` otherwise.
   *
   * @since 1.1.5
   */
  get sleepOnActivate() {
    return !!this.engine.wasm._wl_physx_component_get_sleepOnActivate(this._id);
  }
  /**
   * Apply a force.
   *
   * [PhysX Manual - "Applying Forces and Torques"](https://gameworksdocs.nvidia.com/PhysX/4.1/documentation/physxguide/Manual/RigidBodyDynamics.html#applying-forces-and-torques)
   *
   * Has no effect, if the component is not active.
   *
   * @param f Force vector.
   * @param m Force mode, see {@link ForceMode}, default `Force`.
   * @param localForce Whether the force vector is in local space, default `false`.
   * @param p Position to apply force at, default is center of mass.
   * @param local Whether position is in local space, default `false`.
   */
  addForce(f, m = ForceMode.Force, localForce = false, p, local = false) {
    const wasm = this.engine.wasm;
    if (!p) {
      wasm._wl_physx_component_addForce(this._id, f[0], f[1], f[2], m, localForce);
      return;
    }
    wasm._wl_physx_component_addForceAt(this._id, f[0], f[1], f[2], m, localForce, p[0], p[1], p[2], local);
  }
  /**
   * Apply torque.
   *
   * [PhysX Manual - "Applying Forces and Torques"](https://gameworksdocs.nvidia.com/PhysX/4.1/documentation/physxguide/Manual/RigidBodyDynamics.html#applying-forces-and-torques)
   *
   * Has no effect, if the component is not active.
   *
   * @param f Force vector.
   * @param m Force mode, see {@link ForceMode}, default `Force`.
   */
  addTorque(f, m = ForceMode.Force) {
    this.engine.wasm._wl_physx_component_addTorque(this._id, f[0], f[1], f[2], m);
  }
  /**
   * Add on collision callback.
   *
   * @param callback Function to call when this rigid body (un)collides with any other.
   *
   * ```js
   *  let rigidBody = this.object.getComponent('physx');
   *  rigidBody.onCollision(function(type, other) {
   *      // Ignore uncollides
   *      if(type == CollisionEventType.TouchLost) return;
   *
   *      // Take damage on collision with enemies
   *      if(other.object.name.startsWith("enemy-")) {
   *          this.applyDamage(10);
   *      }
   *  }.bind(this));
   * ```
   *
   * @returns Id of the new callback for use with {@link PhysXComponent#removeCollisionCallback}.
   */
  onCollision(callback) {
    return this.onCollisionWith(this, callback);
  }
  /**
   * Add filtered on collision callback.
   *
   * @param otherComp Component for which callbacks will
   *        be triggered. If you pass this component, the method is equivalent to.
   *        {@link PhysXComponent#onCollision}.
   * @param callback Function to call when this rigid body
   *        (un)collides with `otherComp`.
   * @returns Id of the new callback for use with {@link PhysXComponent#removeCollisionCallback}.
   */
  onCollisionWith(otherComp, callback) {
    const physics = this.engine.physics;
    physics._callbacks[this._id] = physics._callbacks[this._id] || [];
    physics._callbacks[this._id].push(callback);
    return this.engine.wasm._wl_physx_component_addCallback(this._id, otherComp._id || this._id);
  }
  /**
   * Remove a collision callback added with {@link PhysXComponent#onCollision} or {@link PhysXComponent#onCollisionWith}.
   *
   * @param callbackId Callback id as returned by {@link PhysXComponent#onCollision} or {@link PhysXComponent#onCollisionWith}.
   * @throws When the callback does not belong to the component.
   * @throws When the callback does not exist.
   */
  removeCollisionCallback(callbackId) {
    const physics = this.engine.physics;
    const r = this.engine.wasm._wl_physx_component_removeCallback(this._id, callbackId);
    if (r)
      physics._callbacks[this._id].splice(-r);
  }
};
/** @override */
__publicField(PhysXComponent, "TypeName", "physx");
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "static", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "translationOffset", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "rotationOffset", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "kinematic", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "gravity", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "simulate", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "allowSimulation", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "allowQuery", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "trigger", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "shape", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "shapeData", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "extents", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "staticFriction", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "dynamicFriction", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "bounciness", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "linearDamping", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "angularDamping", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "linearVelocity", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "angularVelocity", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "groupsMask", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "blocksMask", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "linearLockAxis", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "angularLockAxis", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "mass", null);
__decorate([
  nativeProperty()
], PhysXComponent.prototype, "sleepOnActivate", null);
var Physics = class {
  /**
   * @hidden
   *
   * **Note**: This is public to emulate a `friend` accessor.
   */
  _callbacks;
  /** Hit. */
  _hit;
  /** Wonderland Engine instance */
  _engine;
  /** Ray Hit */
  _rayHit;
  constructor(engine2) {
    this._engine = engine2;
    this._rayHit = engine2.wasm._malloc(4 * (3 * 4 + 3 * 4 + 4 + 2) + 4);
    this._hit = new RayHit(engine2.scene, this._rayHit);
    this._callbacks = {};
  }
  /**
   * Cast a ray through the scene and find intersecting physics components.
   *
   * The resulting ray hit will contain **up to 4** closest ray hits,
   * sorted by increasing distance.
   *
   * Example:
   *
   * ```js
   * const hit = engine.physics.rayCast(
   *     [0, 0, 0],
   *     [0, 0, 1],
   *     1 << 0 | 1 << 4, // Only check against physics components in groups 0 and 4
   *     25
   * );
   * if (hit.hitCount > 0) {
   *     const locations = hit.getLocations();
   *     console.log(`Object hit at: ${locations[0][0]}, ${locations[0][1]}, ${locations[0][2]}`);
   * }
   * ```
   *
   * @param o Ray origin.
   * @param d Ray direction.
   * @param groupMask Bitmask of physics groups to filter by: only objects
   *        that are part of given groups are considered for the raycast.
   * @param maxDistance Maximum **inclusive** hit distance. Defaults to `100`.
   *
   * @returns The {@link RayHit} instance, cached by this class.
   *
   * @note The returned {@link RayHit} object is owned by the {@link Physics}
   *       instance and will be reused with the next {@link Physics#rayCast} call.
   */
  rayCast(o, d, groupMask, maxDistance = 100) {
    const scene = this._engine.scene._index;
    this._engine.wasm._wl_physx_ray_cast(scene, o[0], o[1], o[2], d[0], d[1], d[2], groupMask, maxDistance, this._rayHit);
    return this._hit;
  }
  /** Hosting engine instance. */
  get engine() {
    return this._engine;
  }
};
var MeshIndexType;
(function(MeshIndexType2) {
  MeshIndexType2[MeshIndexType2["UnsignedByte"] = 1] = "UnsignedByte";
  MeshIndexType2[MeshIndexType2["UnsignedShort"] = 2] = "UnsignedShort";
  MeshIndexType2[MeshIndexType2["UnsignedInt"] = 4] = "UnsignedInt";
})(MeshIndexType || (MeshIndexType = {}));
var MeshSkinningType;
(function(MeshSkinningType2) {
  MeshSkinningType2[MeshSkinningType2["None"] = 0] = "None";
  MeshSkinningType2[MeshSkinningType2["FourJoints"] = 1] = "FourJoints";
  MeshSkinningType2[MeshSkinningType2["EightJoints"] = 2] = "EightJoints";
})(MeshSkinningType || (MeshSkinningType = {}));
var Mesh = class extends Resource {
  /**
   * @deprecated Use {@link MeshManager.create} instead, accessible via {@link WonderlandEngine.meshes}:
   *
   * ```js
   * const mesh = engine.meshes.create({vertexCount: 3, indexData: [0, 1, 2]});
   * ...
   * mesh.update();
   * ```
   */
  constructor(engine2, params) {
    if (!isNumber(params)) {
      const mesh = engine2.meshes.create(params);
      super(engine2, mesh._index);
      return mesh;
    }
    super(engine2, params);
  }
  /** Number of vertices in this mesh. */
  get vertexCount() {
    return this.engine.wasm._wl_mesh_get_vertexCount(this._id);
  }
  /** Index data (read-only) or `null` if the mesh is not indexed. */
  get indexData() {
    const wasm = this.engine.wasm;
    const tempMem = wasm._tempMem;
    const ptr = wasm._wl_mesh_get_indexData(this._id, tempMem, tempMem + 4);
    if (ptr === null)
      return null;
    const indexCount = wasm.HEAPU32[tempMem / 4];
    const indexSize = wasm.HEAPU32[tempMem / 4 + 1];
    switch (indexSize) {
      case MeshIndexType.UnsignedByte:
        return new Uint8Array(wasm.HEAPU8.buffer, ptr, indexCount);
      case MeshIndexType.UnsignedShort:
        return new Uint16Array(wasm.HEAPU16.buffer, ptr, indexCount);
      case MeshIndexType.UnsignedInt:
        return new Uint32Array(wasm.HEAPU32.buffer, ptr, indexCount);
    }
    return null;
  }
  /**
   * Apply changes to {@link attribute | vertex attributes}.
   *
   * Uploads the updated vertex attributes to the GPU and updates the bounding
   * sphere to match the new vertex positions.
   *
   * Since this is an expensive operation, call it only once you have performed
   * all modifications on a mesh and avoid calling if you did not perform any
   * modifications at all.
   */
  update() {
    this.engine.wasm._wl_mesh_update(this._id);
  }
  getBoundingSphere(out = new Float32Array(4)) {
    const wasm = this.engine.wasm;
    this.engine.wasm._wl_mesh_get_boundingSphere(this._id, wasm._tempMem);
    out[0] = wasm._tempMemFloat[0];
    out[1] = wasm._tempMemFloat[1];
    out[2] = wasm._tempMemFloat[2];
    out[3] = wasm._tempMemFloat[3];
    return out;
  }
  attribute(attr) {
    if (typeof attr != "number")
      throw new TypeError("Expected number, but got " + typeof attr);
    const wasm = this.engine.wasm;
    const tempMemUint32 = wasm._tempMemUint32;
    wasm._wl_mesh_get_attribute(this._id, attr, wasm._tempMem);
    if (tempMemUint32[0] == 255)
      return null;
    const arraySize = tempMemUint32[5];
    return new MeshAttributeAccessor(this.engine, {
      attribute: tempMemUint32[0],
      offset: tempMemUint32[1],
      stride: tempMemUint32[2],
      formatSize: tempMemUint32[3],
      componentCount: tempMemUint32[4],
      /* The WASM API returns `0` for a scalar value. We clamp it to 1 as we strictly use it as a multiplier for get/set operations */
      arraySize: arraySize ? arraySize : 1,
      length: this.vertexCount,
      bufferType: attr !== MeshAttribute.JointId ? Float32Array : Uint16Array
    });
  }
  /**
   * Destroy and free the meshes memory.
   *
   * It is best practice to set the mesh variable to `null` after calling
   * destroy to prevent accidental use:
   *
   * ```js
   *   mesh.destroy();
   *   mesh = null;
   * ```
   *
   * Accessing the mesh after destruction behaves like accessing an empty
   * mesh.
   *
   * @since 0.9.0
   */
  destroy() {
    this.engine.wasm._wl_mesh_destroy(this._id);
    this.engine.meshes._destroy(this);
  }
  /** @overload */
  toString() {
    if (this.isDestroyed) {
      return "Mesh(destroyed)";
    }
    return `Mesh(${this._index})`;
  }
};
var MeshAttributeAccessor = class {
  /** Max number of elements. */
  length = 0;
  /** Wonderland Engine instance. @hidden */
  _engine;
  /** Attribute index. @hidden */
  _attribute = -1;
  /** Attribute offset. @hidden */
  _offset = 0;
  /** Attribute stride. @hidden */
  _stride = 0;
  /** Format size native enum. @hidden */
  _formatSize = 0;
  /** Number of components per vertex. @hidden */
  _componentCount = 0;
  /** Number of values per vertex. @hidden */
  _arraySize = 1;
  /**
   * Class to instantiate an ArrayBuffer to get/set values.
   */
  _bufferType;
  /**
   * Function to allocate temporary WASM memory. It is cached in the accessor to avoid
   * conditionals during get/set.
   */
  _tempBufferGetter;
  /**
   * Create a new instance.
   *
   * @note Please use {@link Mesh.attribute} to create a new instance.
   *
   * @param options Contains information about how to read the data.
   * @note Do not use this constructor. Instead, please use the {@link Mesh.attribute} method.
   *
   * @hidden
   */
  constructor(engine2, options) {
    this._engine = engine2;
    const wasm = this._engine.wasm;
    this._attribute = options.attribute;
    this._offset = options.offset;
    this._stride = options.stride;
    this._formatSize = options.formatSize;
    this._componentCount = options.componentCount;
    this._arraySize = options.arraySize;
    this._bufferType = options.bufferType;
    this.length = options.length;
    this._tempBufferGetter = this._bufferType === Float32Array ? wasm.getTempBufferF32.bind(wasm) : wasm.getTempBufferU16.bind(wasm);
  }
  /**
   * Create a new TypedArray to hold this attribute's values.
   *
   * This method is useful to create a view to hold the data to
   * pass to {@link get} and {@link set}
   *
   * Example:
   *
   * ```js
   * const vertexCount = 4;
   * const positionAttribute = mesh.attribute(MeshAttribute.Position);
   *
   * // A position has 3 floats per vertex. Thus, positions has length 3 * 4.
   * const positions = positionAttribute.createArray(vertexCount);
   * ```
   *
   * @param count The number of **vertices** expected.
   * @returns A TypedArray with the appropriate format to access the data
   */
  createArray(count = 1) {
    count = count > this.length ? this.length : count;
    return new this._bufferType(count * this._componentCount * this._arraySize);
  }
  get(index, out = this.createArray()) {
    if (out.length % this._componentCount !== 0) {
      throw new Error(`out.length, ${out.length} is not a multiple of the attribute vector components, ${this._componentCount}`);
    }
    const dest = this._tempBufferGetter(out.length);
    const elementSize = this._bufferType.BYTES_PER_ELEMENT;
    const destSize = elementSize * out.length;
    const srcFormatSize = this._formatSize * this._arraySize;
    const destFormatSize = this._componentCount * elementSize * this._arraySize;
    this._engine.wasm._wl_mesh_get_attribute_values(this._attribute, srcFormatSize, this._offset + index * this._stride, this._stride, destFormatSize, dest.byteOffset, destSize);
    for (let i = 0; i < out.length; ++i)
      out[i] = dest[i];
    return out;
  }
  /**
   * Set attribute element.
   *
   * @param i Index
   * @param v Value to set the element to
   *
   * `v.length` needs to be a multiple of the attributes component count, see
   * {@link MeshAttribute}. If `v.length` is more than one multiple, it will be
   * filled with the next n attribute elements, which can reduce overhead
   * of this call.
   *
   * @returns Reference to self (for method chaining)
   */
  set(i, v) {
    if (v.length % this._componentCount !== 0)
      throw new Error(`out.length, ${v.length} is not a multiple of the attribute vector components, ${this._componentCount}`);
    const elementSize = this._bufferType.BYTES_PER_ELEMENT;
    const srcSize = elementSize * v.length;
    const srcFormatSize = this._componentCount * elementSize * this._arraySize;
    const destFormatSize = this._formatSize * this._arraySize;
    const wasm = this._engine.wasm;
    if (v.buffer != wasm.HEAPU8.buffer) {
      const dest = this._tempBufferGetter(v.length);
      dest.set(v);
      v = dest;
    }
    wasm._wl_mesh_set_attribute_values(this._attribute, srcFormatSize, v.byteOffset, srcSize, destFormatSize, this._offset + i * this._stride, this._stride);
    return this;
  }
  /** Hosting engine instance. */
  get engine() {
    return this._engine;
  }
};
var Font = class extends Resource {
  /** Em height in object space. Equivalent to line height. */
  get emHeight() {
    return this.engine.wasm._wl_font_get_emHeight(this._id);
  }
  /**
   * Cap height in object space. This is the typical height of capital
   * letters. Can be 0 if not defined by the font.
   */
  get capHeight() {
    return this.engine.wasm._wl_font_get_capHeight(this._id);
  }
  /**
   * X height in object space. This is the typical height of lowercase
   * letters. Can be 0 if not defined by the font.
   */
  get xHeight() {
    return this.engine.wasm._wl_font_get_xHeight(this._id);
  }
};
var temp2d = null;
var Texture = class extends Resource {
  /**
   * @deprecated Use {@link TextureManager.create} instead, accessible via
   * {@link WonderlandEngine.textures}:
   *
   * ```js
   * const image = new Image();
   * image.onload = () => {
   *     const texture = engine.textures.create(image);
   * };
   * ```
   */
  constructor(engine2, param) {
    if (isImageLike(param)) {
      const texture = engine2.textures.create(param);
      super(engine2, texture._index);
      return texture;
    }
    super(engine2, param);
  }
  /**
   * Whether this texture is valid
   *
   * @deprecated Use {@link SceneResource#isDestroyed} instead.
   */
  get valid() {
    return !this.isDestroyed;
  }
  /**
   * Index in this manager.
   *
   * @deprecated Use {@link Texture.index} instead.
   */
  get id() {
    return this.index;
  }
  /** Update the texture to match the HTML element (e.g. reflect the current frame of a video). */
  update() {
    const image = this._imageIndex;
    if (!this.valid || !image)
      return;
    this.engine.wasm._wl_renderer_updateImage(image);
  }
  /** Width of the texture. */
  get width() {
    const element = this.htmlElement;
    if (element)
      return element.width;
    const wasm = this.engine.wasm;
    wasm._wl_image_size(this._imageIndex, wasm._tempMem);
    return wasm._tempMemUint32[0];
  }
  /** Height of the texture. */
  get height() {
    const element = this.htmlElement;
    if (element)
      return element.height;
    const wasm = this.engine.wasm;
    wasm._wl_image_size(this._imageIndex, wasm._tempMem);
    return wasm._tempMemUint32[1];
  }
  /**
   * Returns the html element associated to this texture.
   *
   * @note This accessor will return `null` if the image is compressed.
   */
  get htmlElement() {
    const image = this._imageIndex;
    if (!image)
      return null;
    const wasm = this.engine.wasm;
    const jsImageIndex = wasm._wl_image_get_jsImage_index(image);
    return wasm._images[jsImageIndex];
  }
  /**
   * Update a subrange on the texture to match the HTML element (e.g. reflect the current frame of a video).
   *
   * Usage:
   *
   * ```js
   * // Copies rectangle of pixel starting from (10, 20)
   * texture.updateSubImage(10, 20, 600, 400);
   * ```
   *
   * @param x x offset
   * @param y y offset
   * @param w width
   * @param h height
   */
  updateSubImage(x, y, w, h) {
    if (this.isDestroyed)
      return;
    const image = this._imageIndex;
    if (!image)
      return;
    const wasm = this.engine.wasm;
    const jsImageIndex = wasm._wl_image_get_jsImage_index(image);
    if (!temp2d) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Texture.updateSubImage(): Failed to obtain CanvasRenderingContext2D.");
      }
      temp2d = {
        canvas,
        ctx
      };
    }
    const img = wasm._images[jsImageIndex];
    if (!img)
      return;
    temp2d.canvas.width = w;
    temp2d.canvas.height = h;
    temp2d.ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
    const yOffset = (img.videoHeight ?? img.height) - y - h;
    wasm._images[jsImageIndex] = temp2d.canvas;
    wasm._wl_renderer_updateImage(image, x, yOffset);
    wasm._images[jsImageIndex] = img;
  }
  /**
   * Destroy and free the texture's texture altas space and memory.
   *
   * It is best practice to set the texture variable to `null` after calling
   * destroy to prevent accidental use of the invalid texture:
   *
   * ```js
   *   texture.destroy();
   *   texture = null;
   * ```
   *
   * @since 0.9.0
   */
  destroy() {
    const wasm = this.engine.wasm;
    wasm._wl_texture_destroy(this._id);
    this.engine.textures._destroy(this);
  }
  /** @overload */
  toString() {
    if (this.isDestroyed) {
      return "Texture(destroyed)";
    }
    return `Texture(${this._index})`;
  }
  get _imageIndex() {
    return this.engine.wasm._wl_texture_get_image_index(this._id);
  }
};
var Animation = class extends SceneResource {
  /**
   * @param index Index in the manager
   */
  constructor(host = WL, index) {
    const scene = host instanceof Prefab ? host : host.scene;
    super(scene, index);
  }
  /** Duration of this animation. */
  get duration() {
    return this.engine.wasm._wl_animation_get_duration(this._id);
  }
  /** Number of tracks in this animation. */
  get trackCount() {
    return this.engine.wasm._wl_animation_get_trackCount(this._id);
  }
  /**
   * Clone this animation retargeted to a new set of objects.
   *
   * The clone shares most of the data with the original and is therefore
   * light-weight.
   *
   * **Experimental:** This API might change in upcoming versions.
   *
   * If retargeting to {@link Skin}, the join names will be used to determine a mapping
   * from the previous skin to the new skin. The source skin will be retrieved from
   * the first track in the animation that targets a joint.
   *
   * @param newTargets New targets per track. Expected to have
   *      {@link Animation#trackCount} elements or to be a {@link Skin}.
   * @returns The retargeted clone of this animation.
   */
  retarget(newTargets) {
    const wasm = this.engine.wasm;
    if (newTargets instanceof Skin) {
      const index2 = wasm._wl_animation_retargetToSkin(this._id, newTargets._id);
      return this._scene.animations.wrap(index2);
    }
    if (newTargets.length != this.trackCount) {
      throw Error("Expected " + this.trackCount.toString() + " targets, but got " + newTargets.length.toString());
    }
    const ptr = wasm._malloc(2 * newTargets.length);
    for (let i = 0; i < newTargets.length; ++i) {
      const object3d = newTargets[i];
      this.scene.assertOrigin(object3d);
      wasm.HEAPU16[ptr >> 1 + i] = newTargets[i].objectId;
    }
    const index = wasm._wl_animation_retarget(this._id, ptr);
    wasm._free(ptr);
    return this._scene.animations.wrap(index);
  }
  /** @overload */
  toString() {
    if (this.isDestroyed) {
      return "Animation(destroyed)";
    }
    return `Animation(${this._index})`;
  }
};
var Object3D = class {
  /**
   * Packed object id, containing scene index and local id.
   *
   * @hidden
   */
  _id = -1;
  /** Object id, relative to the scene manager. @hidden */
  _localId = -1;
  /** Scene instance. @hidden */
  _scene;
  /** Wonderland Engine instance. @hidden */
  _engine;
  /**
   * @param o Object id to wrap.
   *
   * @deprecated Objects must be obtained via {@link Scene.addObject} or {@link Scene.wrap}:
   *
   * ```js
   * // Create a new object.
   * const obj = scene.addObject();
   *
   * // Wrap an object using its id. The id must be valid.
   * const obj = scene.wrap(0);
   * ```
   *
   * @hidden
   */
  constructor(scene, id) {
    scene = scene instanceof Prefab ? scene : scene.scene;
    this._localId = id;
    this._id = scene._index << 22 | id;
    this._scene = scene;
    this._engine = scene.engine;
  }
  /**
   * Name of the object.
   *
   * Useful for identifying objects during debugging.
   */
  get name() {
    const wasm = this._engine.wasm;
    return wasm.UTF8ToString(wasm._wl_object_name(this._id));
  }
  /**
   * Set the object's name.
   *
   * @param newName The new name to set.
   */
  set name(newName) {
    const wasm = this._engine.wasm;
    wasm._wl_object_set_name(this._id, wasm.tempUTF8(newName));
  }
  /**
   * Parent of this object or `null` if parented to root.
   */
  get parent() {
    const p = this._engine.wasm._wl_object_parent(this._id);
    return p === 0 ? null : this._scene.wrap(p);
  }
  /**
   * Equivalent to {@link Object3D.getChildren}.
   *
   * @note Prefer to use {@link Object3D.getChildren} for performance.
   */
  get children() {
    return this.getChildren();
  }
  /** The number of children of this object. */
  get childrenCount() {
    return this._engine.wasm._wl_object_get_children_count(this._id);
  }
  /**
   * Reparent object to given object.
   *
   * @note Reparenting is not trivial and might have a noticeable performance impact.
   *
   * @param newParent New parent or `null` to parent to root
   */
  set parent(newParent) {
    this.scene.assertOrigin(newParent);
    this._engine.wasm._wl_object_set_parent(this._id, newParent == null ? 0 : newParent._id);
  }
  /** Local object id in the scene manager. */
  get objectId() {
    return this._localId;
  }
  /** Scene instance. */
  get scene() {
    return this._scene;
  }
  /** Hosting engine instance. */
  get engine() {
    return this._engine;
  }
  /**
   * Clone this hierarchy into a new one.
   *
   * Cloning copies the hierarchy structure, object names,
   * as well as components.
   *
   * JavaScript components are cloned using {@link Component.copy}. You can
   * override this method in your components.
   *
   * @param parent The parent for the cloned hierarchy or `null` to clone
   *     into the scene root. Defaults to `null`.
   *
   * @returns The clone of this object.
   */
  clone(parent = null) {
    this.scene.assertOrigin(parent);
    const engine2 = this._engine;
    const id = engine2.wasm._wl_object_clone(this._id, parent ? parent._id : 0);
    return this._scene.wrap(id);
  }
  /**
   * Children of this object.
   *
   * @note Child order is **undefined**. No assumptions should be made
   * about the index of a specific object.
   *
   * If you need to access a specific child of this object, you can
   * use {@link Object3D.findByName}.
   *
   * When the object exists in the scene at editor time, prefer passing it as
   * a component property.
   *
   * @note When providing an output array, only `this.childrenCount` elements will be written.
   * The rest of the array will not be modified by this method.
   *
   * @param out Destination array, expected to have at least `this.childrenCount` elements.
   * @returns The `out` parameter.
   */
  getChildren(out = new Array(this.childrenCount)) {
    const childrenCount = this.childrenCount;
    if (childrenCount === 0)
      return out;
    const wasm = this._engine.wasm;
    wasm.requireTempMem(childrenCount * 2);
    this._engine.wasm._wl_object_get_children(this._id, wasm._tempMem, wasm._tempMemSize >> 1);
    for (let i = 0; i < childrenCount; ++i) {
      out[i] = this._scene.wrap(wasm._tempMemUint16[i]);
    }
    return out;
  }
  /**
   * Reset local transformation (translation, rotation and scaling) to identity.
   *
   * @returns Reference to self (for method chaining).
   */
  resetTransform() {
    this._engine.wasm._wl_object_reset_translation_rotation(this._id);
    this._engine.wasm._wl_object_reset_scaling(this._id);
    return this;
  }
  /**
   * Reset local position and rotation to identity.
   *
   * @returns Reference to self (for method chaining).
   */
  resetPositionRotation() {
    this._engine.wasm._wl_object_reset_translation_rotation(this._id);
    return this;
  }
  /** @deprecated Please use {@link Object3D.resetPositionRotation} instead. */
  resetTranslationRotation() {
    return this.resetPositionRotation();
  }
  /**
   * Reset local rotation, keep translation.
   *
   * @note To reset both rotation and translation, prefer
   *       {@link resetTranslationRotation}.
   *
   * @returns Reference to self (for method chaining).
   */
  resetRotation() {
    this._engine.wasm._wl_object_reset_rotation(this._id);
    return this;
  }
  /**
   * Reset local translation, keep rotation.
   *
   * @note To reset both rotation and translation, prefer
   *       {@link resetTranslationRotation}.
   *
   * @returns Reference to self (for method chaining).
   */
  resetPosition() {
    this._engine.wasm._wl_object_reset_translation(this._id);
    return this;
  }
  /** @deprecated Please use {@link Object3D.resetPosition} instead. */
  resetTranslation() {
    return this.resetPosition();
  }
  /**
   * Reset local scaling to identity (``[1.0, 1.0, 1.0]``).
   *
   * @returns Reference to self (for method chaining).
   */
  resetScaling() {
    this._engine.wasm._wl_object_reset_scaling(this._id);
    return this;
  }
  /** @deprecated Please use {@link Object3D.translateLocal} instead. */
  translate(v) {
    return this.translateLocal(v);
  }
  /**
   * Translate object by a vector in the parent's space.
   *
   * @param v Vector to translate by.
   *
   * @returns Reference to self (for method chaining).
   */
  translateLocal(v) {
    this._engine.wasm._wl_object_translate(this._id, v[0], v[1], v[2]);
    return this;
  }
  /**
   * Translate object by a vector in object space.
   *
   * @param v Vector to translate by.
   *
   * @returns Reference to self (for method chaining).
   */
  translateObject(v) {
    this._engine.wasm._wl_object_translate_obj(this._id, v[0], v[1], v[2]);
    return this;
  }
  /**
   * Translate object by a vector in world space.
   *
   * @param v Vector to translate by.
   *
   * @returns Reference to self (for method chaining).
   */
  translateWorld(v) {
    this._engine.wasm._wl_object_translate_world(this._id, v[0], v[1], v[2]);
    return this;
  }
  /** @deprecated Please use {@link Object3D.rotateAxisAngleDegLocal} instead. */
  rotateAxisAngleDeg(a, d) {
    this.rotateAxisAngleDegLocal(a, d);
    return this;
  }
  /**
   * Rotate around given axis by given angle (degrees) in local space.
   *
   * @param a Vector representing the rotation axis.
   * @param d Angle in degrees.
   *
   * @note If the object is translated the rotation will be around
   *     the parent. To rotate around the object origin, use
   *     {@link rotateAxisAngleDegObject}
   *
   * @see {@link rotateAxisAngleRad}
   *
   * @returns Reference to self (for method chaining).
   */
  rotateAxisAngleDegLocal(a, d) {
    this._engine.wasm._wl_object_rotate_axis_angle(this._id, a[0], a[1], a[2], d);
    return this;
  }
  /** @deprecated Please use {@link Object3D.rotateAxisAngleRadLocal} instead. */
  rotateAxisAngleRad(a, d) {
    return this.rotateAxisAngleRadLocal(a, d);
  }
  /**
   * Rotate around given axis by given angle (radians) in local space.
   *
   * @param a Vector representing the rotation axis.
   * @param d Angle in radians.
   *
   * @note If the object is translated the rotation will be around
   *     the parent. To rotate around the object origin, use
   *     {@link rotateAxisAngleDegObject}
   *
   * @see {@link rotateAxisAngleDeg}
   *
   * @returns Reference to self (for method chaining).
   */
  rotateAxisAngleRadLocal(a, d) {
    this._engine.wasm._wl_object_rotate_axis_angle_rad(this._id, a[0], a[1], a[2], d);
    return this;
  }
  /**
   * Rotate around given axis by given angle (degrees) in object space.
   *
   * @param a Vector representing the rotation axis.
   * @param d Angle in degrees.
   *
   * Equivalent to prepending a rotation quaternion to the object's
   * local transformation.
   *
   * @see {@link rotateAxisAngleRadObject}
   *
   * @returns Reference to self (for method chaining).
   */
  rotateAxisAngleDegObject(a, d) {
    this._engine.wasm._wl_object_rotate_axis_angle_obj(this._id, a[0], a[1], a[2], d);
    return this;
  }
  /**
   * Rotate around given axis by given angle (radians) in object space
   * Equivalent to prepending a rotation quaternion to the object's
   * local transformation.
   *
   * @param a Vector representing the rotation axis
   * @param d Angle in degrees
   *
   * @see {@link rotateAxisAngleDegObject}
   *
   * @returns Reference to self (for method chaining).
   */
  rotateAxisAngleRadObject(a, d) {
    this._engine.wasm._wl_object_rotate_axis_angle_rad_obj(this._id, a[0], a[1], a[2], d);
    return this;
  }
  /** @deprecated Please use {@link Object3D.rotateLocal} instead. */
  rotate(q) {
    this.rotateLocal(q);
    return this;
  }
  /**
   * Rotate by a quaternion.
   *
   * @param q the Quaternion to rotate by.
   *
   * @returns Reference to self (for method chaining).
   */
  rotateLocal(q) {
    this._engine.wasm._wl_object_rotate_quat(this._id, q[0], q[1], q[2], q[3]);
    return this;
  }
  /**
   * Rotate by a quaternion in object space.
   *
   * Equivalent to prepending a rotation quaternion to the object's
   * local transformation.
   *
   * @param q the Quaternion to rotate by.
   *
   * @returns Reference to self (for method chaining).
   */
  rotateObject(q) {
    this._engine.wasm._wl_object_rotate_quat_obj(this._id, q[0], q[1], q[2], q[3]);
    return this;
  }
  /** @deprecated Please use {@link Object3D.scaleLocal} instead. */
  scale(v) {
    this.scaleLocal(v);
    return this;
  }
  /**
   * Scale object by a vector in object space.
   *
   * @param v Vector to scale by.
   *
   * @returns Reference to self (for method chaining).
   */
  scaleLocal(v) {
    this._engine.wasm._wl_object_scale(this._id, v[0], v[1], v[2]);
    return this;
  }
  getPositionLocal(out = new Float32Array(3)) {
    const wasm = this._engine.wasm;
    wasm._wl_object_get_translation_local(this._id, wasm._tempMem);
    out[0] = wasm._tempMemFloat[0];
    out[1] = wasm._tempMemFloat[1];
    out[2] = wasm._tempMemFloat[2];
    return out;
  }
  getTranslationLocal(out = new Float32Array(3)) {
    return this.getPositionLocal(out);
  }
  getPositionWorld(out = new Float32Array(3)) {
    const wasm = this._engine.wasm;
    wasm._wl_object_get_translation_world(this._id, wasm._tempMem);
    out[0] = wasm._tempMemFloat[0];
    out[1] = wasm._tempMemFloat[1];
    out[2] = wasm._tempMemFloat[2];
    return out;
  }
  getTranslationWorld(out = new Float32Array(3)) {
    return this.getPositionWorld(out);
  }
  /**
   * Set local / object space position.
   *
   * Concatenates a new translation dual quaternion onto the existing rotation.
   *
   * @param v New local position array/vector, expected to have at least 3 elements.
   *
   * @returns Reference to self (for method chaining).
   */
  setPositionLocal(v) {
    this._engine.wasm._wl_object_set_translation_local(this._id, v[0], v[1], v[2]);
    return this;
  }
  /** @deprecated Please use {@link Object3D.setPositionLocal} instead. */
  setTranslationLocal(v) {
    return this.setPositionLocal(v);
  }
  /**
   * Set world space position.
   *
   * Applies the inverse parent transform with a new translation dual quaternion
   * which is concatenated onto the existing rotation.
   *
   * @param v New world position array/vector, expected to have at least 3 elements.
   *
   * @returns Reference to self (for method chaining).
   */
  setPositionWorld(v) {
    this._engine.wasm._wl_object_set_translation_world(this._id, v[0], v[1], v[2]);
    return this;
  }
  /** @deprecated Please use {@link Object3D.setPositionWorld} instead. */
  setTranslationWorld(v) {
    return this.setPositionWorld(v);
  }
  getScalingLocal(out = new Float32Array(3)) {
    const wasm = this._engine.wasm;
    const ptr = wasm._wl_object_scaling_local(this._id) / 4;
    out[0] = wasm.HEAPF32[ptr];
    out[1] = wasm.HEAPF32[ptr + 1];
    out[2] = wasm.HEAPF32[ptr + 2];
    return out;
  }
  /**
   * Set local / object space scaling.
   *
   * @param v New local scaling array/vector, expected to have at least 3 elements.
   *
   * @returns Reference to self (for method chaining).
   */
  setScalingLocal(v) {
    this._engine.wasm._wl_object_set_scaling_local(this._id, v[0], v[1], v[2]);
    return this;
  }
  getScalingWorld(out = new Float32Array(3)) {
    const wasm = this._engine.wasm;
    const ptr = wasm._wl_object_scaling_world(this._id) / 4;
    out[0] = wasm.HEAPF32[ptr];
    out[1] = wasm.HEAPF32[ptr + 1];
    out[2] = wasm.HEAPF32[ptr + 2];
    return out;
  }
  /**
   * Set World space scaling.
   *
   * @param v New world scaling array/vector, expected to have at least 3 elements.
   *
   * @returns Reference to self (for method chaining).
   */
  setScalingWorld(v) {
    this._engine.wasm._wl_object_set_scaling_world(this._id, v[0], v[1], v[2]);
    return this;
  }
  getRotationLocal(out = new Float32Array(4)) {
    const wasm = this._engine.wasm;
    const ptr = wasm._wl_object_trans_local(this._id) / 4;
    out[0] = wasm.HEAPF32[ptr];
    out[1] = wasm.HEAPF32[ptr + 1];
    out[2] = wasm.HEAPF32[ptr + 2];
    out[3] = wasm.HEAPF32[ptr + 3];
    return out;
  }
  /**
   * Set local space rotation.
   *
   * @param v New world rotation array/vector, expected to have at least 4 elements.
   *
   * @returns Reference to self (for method chaining).
   */
  setRotationLocal(v) {
    this._engine.wasm._wl_object_set_rotation_local(this._id, v[0], v[1], v[2], v[3]);
    return this;
  }
  getRotationWorld(out = new Float32Array(4)) {
    const wasm = this._engine.wasm;
    const ptr = wasm._wl_object_trans_world(this._id) / 4;
    out[0] = wasm.HEAPF32[ptr];
    out[1] = wasm.HEAPF32[ptr + 1];
    out[2] = wasm.HEAPF32[ptr + 2];
    out[3] = wasm.HEAPF32[ptr + 3];
    return out;
  }
  /**
   * Set local space rotation.
   *
   * @param v New world rotation array/vector, expected to have at least 4 elements.
   *
   * @returns Reference to self (for method chaining).
   */
  setRotationWorld(v) {
    this._engine.wasm._wl_object_set_rotation_world(this._id, v[0], v[1], v[2], v[3]);
    return this;
  }
  getTransformLocal(out = new Float32Array(8)) {
    const wasm = this._engine.wasm;
    const ptr = wasm._wl_object_trans_local(this._id) / 4;
    out[0] = wasm.HEAPF32[ptr];
    out[1] = wasm.HEAPF32[ptr + 1];
    out[2] = wasm.HEAPF32[ptr + 2];
    out[3] = wasm.HEAPF32[ptr + 3];
    out[4] = wasm.HEAPF32[ptr + 4];
    out[5] = wasm.HEAPF32[ptr + 5];
    out[6] = wasm.HEAPF32[ptr + 6];
    out[7] = wasm.HEAPF32[ptr + 7];
    return out;
  }
  /**
   * Set local space rotation.
   *
   * @param v New local transform array, expected to have at least 8 elements.
   *
   * @returns Reference to self (for method chaining).
   */
  setTransformLocal(v) {
    const wasm = this._engine.wasm;
    const ptr = wasm._wl_object_trans_local(this._id) / 4;
    wasm.HEAPF32[ptr] = v[0];
    wasm.HEAPF32[ptr + 1] = v[1];
    wasm.HEAPF32[ptr + 2] = v[2];
    wasm.HEAPF32[ptr + 3] = v[3];
    wasm.HEAPF32[ptr + 4] = v[4];
    wasm.HEAPF32[ptr + 5] = v[5];
    wasm.HEAPF32[ptr + 6] = v[6];
    wasm.HEAPF32[ptr + 7] = v[7];
    this.setDirty();
    return this;
  }
  getTransformWorld(out = new Float32Array(8)) {
    const wasm = this._engine.wasm;
    const ptr = wasm._wl_object_trans_world(this._id) / 4;
    out[0] = wasm.HEAPF32[ptr];
    out[1] = wasm.HEAPF32[ptr + 1];
    out[2] = wasm.HEAPF32[ptr + 2];
    out[3] = wasm.HEAPF32[ptr + 3];
    out[4] = wasm.HEAPF32[ptr + 4];
    out[5] = wasm.HEAPF32[ptr + 5];
    out[6] = wasm.HEAPF32[ptr + 6];
    out[7] = wasm.HEAPF32[ptr + 7];
    return out;
  }
  /**
   * Set world space rotation.
   *
   * @param v New world transform array, expected to have at least 8 elements.
   *
   * @returns Reference to self (for method chaining).
   */
  setTransformWorld(v) {
    const wasm = this._engine.wasm;
    const ptr = wasm._wl_object_trans_world(this._id) / 4;
    wasm.HEAPF32[ptr] = v[0];
    wasm.HEAPF32[ptr + 1] = v[1];
    wasm.HEAPF32[ptr + 2] = v[2];
    wasm.HEAPF32[ptr + 3] = v[3];
    wasm.HEAPF32[ptr + 4] = v[4];
    wasm.HEAPF32[ptr + 5] = v[5];
    wasm.HEAPF32[ptr + 6] = v[6];
    wasm.HEAPF32[ptr + 7] = v[7];
    this._engine.wasm._wl_object_trans_world_to_local(this._id);
    return this;
  }
  /**
   * Local space transformation.
   *
   * @deprecated Please use {@link Object3D.setTransformLocal} and
   * {@link Object3D.getTransformLocal} instead.
   */
  get transformLocal() {
    const wasm = this._engine.wasm;
    return new Float32Array(wasm.HEAPF32.buffer, wasm._wl_object_trans_local(this._id), 8);
  }
  /**
   * Set local transform.
   *
   * @param t Local space transformation.
   *
   * @since 0.8.5
   *
   * @deprecated Please use {@link Object3D.setTransformLocal} and
   * {@link Object3D.getTransformLocal} instead.
   */
  set transformLocal(t) {
    this.transformLocal.set(t);
    this.setDirty();
  }
  /**
   * Global / world space transformation.
   *
   * May recompute transformations of the hierarchy of this object,
   * if they were changed by JavaScript components this frame.
   *
   * @deprecated Please use {@link Object3D.setTransformWorld} and
   * {@link Object3D.getTransformWorld} instead.
   */
  get transformWorld() {
    const wasm = this._engine.wasm;
    return new Float32Array(wasm.HEAPF32.buffer, wasm._wl_object_trans_world(this._id), 8);
  }
  /**
   * Set world transform.
   *
   * @param t Global / world space transformation.
   *
   * @since 0.8.5
   *
   * @deprecated Please use {@link Object3D.setTransformWorld} and
   * {@link Object3D.getTransformWorld} instead.
   */
  set transformWorld(t) {
    this.transformWorld.set(t);
    this._engine.wasm._wl_object_trans_world_to_local(this._id);
  }
  /**
   * Local / object space scaling.
   *
   * @deprecated Please use {@link Object3D.setScalingLocal} and
   * {@link Object3D.getScalingLocal} instead.
   */
  get scalingLocal() {
    const wasm = this._engine.wasm;
    return new Float32Array(wasm.HEAPF32.buffer, wasm._wl_object_scaling_local(this._id), 3);
  }
  /**
   * Set local space scaling.
   *
   * @param s Local space scaling.
   *
   * @since 0.8.7
   *
   * @deprecated Please use {@link Object3D.setScalingLocal} and
   * {@link Object3D.getScalingLocal} instead.
   */
  set scalingLocal(s) {
    this.scalingLocal.set(s);
    this.setDirty();
  }
  /**
   * Global / world space scaling.
   *
   * May recompute transformations of the hierarchy of this object,
   * if they were changed by JavaScript components this frame.
   *
   * @deprecated Please use {@link Object3D.setScalingWorld} and
   * {@link Object3D.getScalingWorld} instead.
   */
  get scalingWorld() {
    const wasm = this._engine.wasm;
    return new Float32Array(wasm.HEAPF32.buffer, wasm._wl_object_scaling_world(this._id), 3);
  }
  /**
   * Set world space scaling.
   *
   * @param t World space scaling.
   *
   * @since 0.8.7
   *
   * @deprecated Please use {@link Object3D.setScalingWorld} and
   * {@link Object3D.getScalingWorld} instead.
   */
  set scalingWorld(s) {
    this.scalingWorld.set(s);
    this._engine.wasm._wl_object_scaling_world_to_local(this._id);
  }
  /**
   * Local space rotation.
   *
   * @since 0.8.7
   *
   * @deprecated Please use {@link Object3D.getRotationLocal} and
   * {@link Object3D.setRotationLocal} instead.
   */
  get rotationLocal() {
    return this.transformLocal.subarray(0, 4);
  }
  /**
   * Global / world space rotation
   *
   * @since 0.8.7
   *
   * @deprecated Please use {@link Object3D.getRotationWorld} and
   * {@link Object3D.setRotationWorld} instead.
   */
  get rotationWorld() {
    return this.transformWorld.subarray(0, 4);
  }
  /**
   * Set local space rotation.
   *
   * @param r Local space rotation
   *
   * @since 0.8.7
   *
   * @deprecated Please use {@link Object3D.getRotationLocal} and
   * {@link Object3D.setRotationLocal} instead.
   */
  set rotationLocal(r) {
    this._engine.wasm._wl_object_set_rotation_local(this._id, r[0], r[1], r[2], r[3]);
  }
  /**
   * Set world space rotation.
   *
   * @param r Global / world space rotation.
   *
   * @since 0.8.7
   *
   * @deprecated Please use {@link Object3D.getRotationWorld} and
   * {@link Object3D.setRotationWorld} instead.
   */
  set rotationWorld(r) {
    this._engine.wasm._wl_object_set_rotation_world(this._id, r[0], r[1], r[2], r[3]);
  }
  /** @deprecated Please use {@link Object3D.getForwardWorld} instead. */
  getForward(out) {
    return this.getForwardWorld(out);
  }
  /**
   * Compute the object's forward facing world space vector.
   *
   * The forward vector in object space is along the negative z-axis, i.e.,
   * `[0, 0, -1]`.
   *
   * @param out Destination array/vector, expected to have at least 3 elements.
   * @return The `out` parameter.
   */
  getForwardWorld(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = -1;
    this.transformVectorWorld(out);
    return out;
  }
  /** @deprecated Please use {@link Object3D.getUpWorld} instead. */
  getUp(out) {
    return this.getUpWorld(out);
  }
  /**
   * Compute the object's up facing world space vector.
   *
   * @param out Destination array/vector, expected to have at least 3 elements.
   * @return The `out` parameter.
   */
  getUpWorld(out) {
    out[0] = 0;
    out[1] = 1;
    out[2] = 0;
    this.transformVectorWorld(out);
    return out;
  }
  /** @deprecated Please use {@link Object3D.getRightWorld} instead. */
  getRight(out) {
    return this.getRightWorld(out);
  }
  /**
   * Compute the object's right facing world space vector.
   *
   * @param out Destination array/vector, expected to have at least 3 elements.
   * @return The `out` parameter.
   */
  getRightWorld(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    this.transformVectorWorld(out);
    return out;
  }
  /**
   * Transform a vector by this object's world transform.
   *
   * @param out Out vector
   * @param v Vector to transform, default `out`
   * @return The `out` parameter.
   *
   * @since 0.8.7
   */
  transformVectorWorld(out, v = out) {
    const wasm = this._engine.wasm;
    wasm._tempMemFloat[0] = v[0];
    wasm._tempMemFloat[1] = v[1];
    wasm._tempMemFloat[2] = v[2];
    wasm._wl_object_transformVectorWorld(this._id, wasm._tempMem);
    out[0] = wasm._tempMemFloat[0];
    out[1] = wasm._tempMemFloat[1];
    out[2] = wasm._tempMemFloat[2];
    return out;
  }
  /**
   * Transform a vector by this object's local transform.
   *
   * @param out Out vector
   * @param v Vector to transform, default `out`
   * @return The `out` parameter.
   *
   * @since 0.8.7
   */
  transformVectorLocal(out, v = out) {
    const wasm = this._engine.wasm;
    wasm._tempMemFloat[0] = v[0];
    wasm._tempMemFloat[1] = v[1];
    wasm._tempMemFloat[2] = v[2];
    wasm._wl_object_transformVectorLocal(this._id, wasm._tempMem);
    out[0] = wasm._tempMemFloat[0];
    out[1] = wasm._tempMemFloat[1];
    out[2] = wasm._tempMemFloat[2];
    return out;
  }
  /**
   * Transform a point by this object's world transform.
   *
   * @param out Out point.
   * @param p Point to transform, default `out`.
   * @return The `out` parameter.
   *
   * @since 0.8.7
   */
  transformPointWorld(out, p = out) {
    const wasm = this._engine.wasm;
    wasm._tempMemFloat[0] = p[0];
    wasm._tempMemFloat[1] = p[1];
    wasm._tempMemFloat[2] = p[2];
    wasm._wl_object_transformPointWorld(this._id, wasm._tempMem);
    out[0] = wasm._tempMemFloat[0];
    out[1] = wasm._tempMemFloat[1];
    out[2] = wasm._tempMemFloat[2];
    return out;
  }
  /**
   * Transform a point by this object's local transform.
   *
   * @param out Out point.
   * @param p Point to transform, default `out`.
   * @return The `out` parameter.
   *
   * @since 0.8.7
   */
  transformPointLocal(out, p = out) {
    const wasm = this._engine.wasm;
    wasm._tempMemFloat[0] = p[0];
    wasm._tempMemFloat[1] = p[1];
    wasm._tempMemFloat[2] = p[2];
    wasm._wl_object_transformPointLocal(this._id, wasm._tempMem);
    out[0] = wasm._tempMemFloat[0];
    out[1] = wasm._tempMemFloat[1];
    out[2] = wasm._tempMemFloat[2];
    return out;
  }
  /**
   * Transform a vector by this object's inverse world transform.
   *
   * @param out Out vector.
   * @param v Vector to transform, default `out`.
   * @return The `out` parameter.
   *
   * @since 0.8.7
   */
  transformVectorInverseWorld(out, v = out) {
    const wasm = this._engine.wasm;
    wasm._tempMemFloat[0] = v[0];
    wasm._tempMemFloat[1] = v[1];
    wasm._tempMemFloat[2] = v[2];
    wasm._wl_object_transformVectorInverseWorld(this._id, wasm._tempMem);
    out[0] = wasm._tempMemFloat[0];
    out[1] = wasm._tempMemFloat[1];
    out[2] = wasm._tempMemFloat[2];
    return out;
  }
  /**
   * Transform a vector by this object's inverse local transform.
   *
   * @param out Out vector
   * @param v Vector to transform, default `out`
   * @return The `out` parameter.
   *
   * @since 0.8.7
   */
  transformVectorInverseLocal(out, v = out) {
    const wasm = this._engine.wasm;
    wasm._tempMemFloat[0] = v[0];
    wasm._tempMemFloat[1] = v[1];
    wasm._tempMemFloat[2] = v[2];
    wasm._wl_object_transformVectorInverseLocal(this._id, wasm._tempMem);
    out[0] = wasm._tempMemFloat[0];
    out[1] = wasm._tempMemFloat[1];
    out[2] = wasm._tempMemFloat[2];
    return out;
  }
  /**
   * Transform a point by this object's inverse world transform.
   *
   * @param out Out point.
   * @param p Point to transform, default `out`.
   * @return The `out` parameter.
   *
   * @since 0.8.7
   */
  transformPointInverseWorld(out, p = out) {
    const wasm = this._engine.wasm;
    wasm._tempMemFloat[0] = p[0];
    wasm._tempMemFloat[1] = p[1];
    wasm._tempMemFloat[2] = p[2];
    wasm._wl_object_transformPointInverseWorld(this._id, wasm._tempMem);
    out[0] = wasm._tempMemFloat[0];
    out[1] = wasm._tempMemFloat[1];
    out[2] = wasm._tempMemFloat[2];
    return out;
  }
  /**
   * Transform a point by this object's inverse local transform.
   *
   * @param out Out point.
   * @param p Point to transform, default `out`.
   * @return The `out` parameter.
   *
   * @since 0.8.7
   */
  transformPointInverseLocal(out, p = out) {
    const wasm = this._engine.wasm;
    wasm._tempMemFloat.set(p);
    wasm._wl_object_transformPointInverseLocal(this._id, wasm._tempMem);
    out[0] = wasm._tempMemFloat[0];
    out[1] = wasm._tempMemFloat[1];
    out[2] = wasm._tempMemFloat[2];
    return out;
  }
  /**
   * Transform an object space dual quaternion into world space.
   *
   * @param out Out transformation.
   * @param q Local space transformation, default `out`.
   * @return The `out` parameter.
   *
   * @since 0.8.7
   */
  toWorldSpaceTransform(out, q = out) {
    const wasm = this._engine.wasm;
    wasm._tempMemFloat.set(q);
    wasm._wl_object_toWorldSpaceTransform(this._id, wasm._tempMem);
    out[0] = wasm._tempMemFloat[0];
    out[1] = wasm._tempMemFloat[1];
    out[2] = wasm._tempMemFloat[2];
    out[3] = wasm._tempMemFloat[3];
    out[4] = wasm._tempMemFloat[4];
    out[5] = wasm._tempMemFloat[5];
    out[6] = wasm._tempMemFloat[6];
    out[7] = wasm._tempMemFloat[7];
    return out;
  }
  /**
   * Transform a world space dual quaternion into local space.
   *
   * @param out Out transformation
   * @param q World space transformation, default `out`
   * @return The `out` parameter.
   *
   * @since 0.8.7
   */
  toLocalSpaceTransform(out, q = out) {
    const p = this.parent;
    if (p) {
      p.toObjectSpaceTransform(out, q);
      return out;
    }
    if (out !== q) {
      out[0] = q[0];
      out[1] = q[1];
      out[2] = q[2];
      out[3] = q[3];
      out[4] = q[4];
      out[5] = q[5];
      out[6] = q[6];
      out[7] = q[7];
    }
    return out;
  }
  /**
   * Transform a world space dual quaternion into object space.
   *
   * @param out Out transformation.
   * @param q World space transformation, default `out`
   * @return The `out` parameter.
   *
   * @since 0.8.7
   */
  toObjectSpaceTransform(out, q = out) {
    const wasm = this._engine.wasm;
    wasm._tempMemFloat.set(q);
    wasm._wl_object_toObjectSpaceTransform(this._id, wasm._tempMem);
    out[0] = wasm._tempMemFloat[0];
    out[1] = wasm._tempMemFloat[1];
    out[2] = wasm._tempMemFloat[2];
    out[3] = wasm._tempMemFloat[3];
    out[4] = wasm._tempMemFloat[4];
    out[5] = wasm._tempMemFloat[5];
    out[6] = wasm._tempMemFloat[6];
    out[7] = wasm._tempMemFloat[7];
    return out;
  }
  /**
   * Turn towards / look at target.
   *
   * Rotates the object so that its forward vector faces towards the target
   * position. The `up` vector acts as a hint to uniquely orient the object's
   * up direction. When orienting a view component, the projected `up` vector
   * faces upwards on the viewing plane.
   *
   * @param p Target position to turn towards, in world space.
   * @param up Up vector to align object with, in world space. Default is `[0, 1, 0]`.
   *
   * @returns Reference to self (for method chaining).
   */
  lookAt(p, up = UP_VECTOR) {
    this._engine.wasm._wl_object_lookAt(this._id, p[0], p[1], p[2], up[0], up[1], up[2]);
    return this;
  }
  /** Destroy the object with all of its components and remove it from the scene */
  destroy() {
    if (this._id < 0)
      return;
    this.engine.wasm._wl_object_remove(this._id);
  }
  /**
   * Mark transformation dirty.
   *
   * Causes an eventual recalculation of {@link transformWorld}, either
   * on next {@link getTranslationWorld}, {@link transformWorld} or
   * {@link scalingWorld} or the beginning of next frame, whichever
   * happens first.
   */
  setDirty() {
    this._engine.wasm._wl_object_set_dirty(this._id);
  }
  /**
   * Disable/enable all components of this object.
   *
   * @param b New state for the components.
   *
   * @since 0.8.5
   */
  set active(b) {
    const comps = this.getComponents();
    for (let c of comps) {
      c.active = b;
    }
  }
  getComponent(typeOrClass, index = 0) {
    const wasm = this._engine.wasm;
    const type = isString(typeOrClass) ? typeOrClass : typeOrClass.TypeName;
    const scene = this._scene;
    const componentType = wasm._wl_scene_get_component_manager_index(scene._index, wasm.tempUTF8(type));
    if (componentType < 0) {
      const typeIndex = wasm._componentTypeIndices[type];
      if (typeIndex === void 0)
        return null;
      const jsIndex = wasm._wl_get_js_component_index(this._id, typeIndex, index);
      if (jsIndex < 0)
        return null;
      const component = this._scene._jsComponents[jsIndex];
      return component.constructor !== BrokenComponent ? component : null;
    }
    const componentId = wasm._wl_get_component_id(this._id, componentType, index);
    return scene._components.wrapNative(componentType, componentId);
  }
  getComponents(typeOrClass) {
    const wasm = this._engine.wasm;
    const scene = this._scene;
    let manager = null;
    let type = null;
    if (typeOrClass) {
      type = isString(typeOrClass) ? typeOrClass : typeOrClass.TypeName;
      const nativeManager = scene._components.getNativeManager(type);
      manager = nativeManager !== null ? nativeManager : scene._components.js;
    }
    const components = [];
    const maxComps = Math.floor(wasm._tempMemSize / 3 * 2);
    const componentsCount = wasm._wl_object_get_components(this._id, wasm._tempMem, maxComps);
    const offset = 2 * componentsCount;
    wasm._wl_object_get_component_types(this._id, wasm._tempMem + offset, maxComps);
    for (let i = 0; i < componentsCount; ++i) {
      const t = wasm._tempMemUint8[i + offset];
      const componentId = wasm._tempMemUint16[i];
      if (manager !== null && t !== manager)
        continue;
      const comp = this._scene._components.wrapAny(t, componentId);
      if (!comp)
        continue;
      if (type && type !== comp.constructor.TypeName)
        continue;
      components.push(comp);
    }
    return components;
  }
  addComponent(typeOrClass, params) {
    const wasm = this._engine.wasm;
    const type = isString(typeOrClass) ? typeOrClass : typeOrClass.TypeName;
    const nativeManager = this._scene._components.getNativeManager(type);
    const isNative = nativeManager !== null;
    const manager = isNative ? nativeManager : this._scene._components.js;
    let componentId = -1;
    if (!isNative) {
      if (!(type in wasm._componentTypeIndices)) {
        throw new TypeError("Unknown component type '" + type + "'");
      }
      componentId = wasm._wl_object_add_js_component(this._id, wasm._componentTypeIndices[type]);
    } else {
      componentId = wasm._wl_object_add_component(this._id, manager);
    }
    const component = this._scene._components.wrapAny(manager, componentId);
    if (params !== void 0)
      component.copy(params);
    if (!isNative) {
      component._triggerInit();
    }
    if (!params || !("active" in params && !params.active)) {
      component.active = true;
    }
    return component;
  }
  /**
   * Search for descendants matching the name.
   *
   * This method is a wrapper around {@link Object3D.findByNameDirect} and
   * {@link Object3D.findByNameRecursive}.
   *
   * @param name The name to search for.
   * @param recursive If `true`, the method will look at all the descendants of this object.
   *     If `false`, this method will only perform the search in direct children.
   * @returns An array of {@link Object3D} matching the name.
   *
   * @since 1.1.0
   */
  findByName(name, recursive = false) {
    return recursive ? this.findByNameRecursive(name) : this.findByNameDirect(name);
  }
  /**
   * Search for all **direct** children matching the name.
   *
   * @note Even though this method is heavily optimized, it does perform
   * a linear search to find the objects. Do not use in a hot path.
   *
   * @param name The name to search for.
   * @returns An array of {@link Object3D} matching the name.
   *
   * @since 1.1.0
   */
  findByNameDirect(name) {
    const wasm = this._engine.wasm;
    const id = this._id;
    const tempSizeU16 = wasm._tempMemSize >> 2;
    const maxCount = tempSizeU16 - 2;
    const buffer = wasm._tempMemUint16;
    buffer[maxCount] = 0;
    buffer[maxCount + 1] = 0;
    const bufferPtr = wasm._tempMem;
    const indexPtr = bufferPtr + maxCount * 2;
    const childCountPtr = bufferPtr + maxCount * 2 + 2;
    const namePtr = wasm.tempUTF8(name, (maxCount + 2) * 2);
    const result = [];
    let read = 0;
    while (read = wasm._wl_object_findByName(id, namePtr, indexPtr, childCountPtr, bufferPtr, maxCount)) {
      for (let i = 0; i < read; ++i) {
        result.push(this._scene.wrap(buffer[i]));
      }
    }
    return result;
  }
  /**
   * Search for **all descendants** matching the name.
   *
   * @note Even though this method is heavily optimized, it does perform
   * a linear search to find the objects. Do not use in a hot path.
   *
   * @param name The name to search for.
   * @returns An array of {@link Object3D} matching the name.
   *
   * @since 1.1.0
   */
  findByNameRecursive(name) {
    const wasm = this._engine.wasm;
    const id = this._id;
    const tempSizeU16 = wasm._tempMemSize >> 2;
    const maxCount = tempSizeU16 - 1;
    const buffer = wasm._tempMemUint16;
    buffer[maxCount] = 0;
    const bufferPtr = wasm._tempMem;
    const indexPtr = bufferPtr + maxCount * 2;
    const namePtr = wasm.tempUTF8(name, (maxCount + 1) * 2);
    let read = 0;
    const result = [];
    while (read = wasm._wl_object_findByNameRecursive(id, namePtr, indexPtr, bufferPtr, maxCount)) {
      for (let i = 0; i < read; ++i) {
        result.push(this._scene.wrap(buffer[i]));
      }
    }
    return result;
  }
  /**
   * Whether given object's transformation has changed.
   */
  get changed() {
    return !!this._engine.wasm._wl_object_is_changed(this._id);
  }
  /**
   * `true` if the object is destroyed, `false` otherwise.
   *
   * If {@link WonderlandEngine.erasePrototypeOnDestroy} is `true`,
   * reading a custom property will not work:
   *
   * ```js
   * engine.erasePrototypeOnDestroy = true;
   *
   * const obj = scene.addObject();
   * obj.customParam = 'Hello World!';
   *
   * console.log(obj.isDestroyed); // Prints `false`
   * obj.destroy();
   * console.log(obj.isDestroyed); // Prints `true`
   * console.log(obj.customParam); // Throws an error
   * ```
   *
   * @since 1.1.1
   */
  get isDestroyed() {
    return this._id < 0;
  }
  /**
   * Checks equality by comparing ids and **not** the JavaScript reference.
   *
   * @deprecate Use JavaScript reference comparison instead:
   *
   * ```js
   * const objectA = scene.addObject();
   * const objectB = scene.addObject();
   * const objectC = objectB;
   * console.log(objectA === objectB); // false
   * console.log(objectA === objectA); // true
   * console.log(objectB === objectC); // true
   * ```
   */
  equals(otherObject) {
    if (!otherObject)
      return false;
    return this._id == otherObject._id;
  }
  /** @overload */
  toString() {
    if (this.isDestroyed) {
      return "Object3D(destroyed)";
    }
    return `Object3D('${this.name}', ${this._localId})`;
  }
};
var Skin = class extends SceneResource {
  /** Amount of joints in this skin. */
  get jointCount() {
    return this.engine.wasm._wl_skin_get_joint_count(this._id);
  }
  /** Joints object ids for this skin */
  get jointIds() {
    const wasm = this.engine.wasm;
    return new Uint16Array(wasm.HEAPU16.buffer, wasm._wl_skin_joint_ids(this._id), this.jointCount);
  }
  /**
   * Dual quaternions in a flat array of size 8 times {@link jointCount}.
   *
   * Inverse bind transforms of the skin.
   */
  get inverseBindTransforms() {
    const wasm = this.engine.wasm;
    return new Float32Array(wasm.HEAPF32.buffer, wasm._wl_skin_inverse_bind_transforms(this._id), 8 * this.jointCount);
  }
  /**
   * Vectors in a flat array of size 3 times {@link jointCount}.
   *
   * Inverse bind scalings of the skin.
   */
  get inverseBindScalings() {
    const wasm = this.engine.wasm;
    return new Float32Array(wasm.HEAPF32.buffer, wasm._wl_skin_inverse_bind_scalings(this._id), 3 * this.jointCount);
  }
};
var MorphTargets = class extends Resource {
  /** Amount of targets in this morph target set. */
  get count() {
    return this.engine.wasm._wl_morph_targets_get_target_count(this._id);
  }
  /** Returns the name of a given target */
  getTargetName(target) {
    if (target >= this.count) {
      throw new Error(`Index ${target} is out of bounds for ${this.count} targets`);
    }
    const wasm = this.engine.wasm;
    return wasm.UTF8ToString(wasm._wl_morph_targets_get_target_name(this._id, target));
  }
  /**
   * Get the index for a given target name.
   *
   * Throws if no target with that name exists.
   *
   * @param name Name of the target.
   */
  getTargetIndex(name) {
    const wasm = this.engine.wasm;
    const index = wasm._wl_morph_targets_get_target_index(this._id, wasm.tempUTF8(name));
    if (index === -1) {
      throw Error(`Missing target '${name}'`);
    }
    return index;
  }
};
var RayHit = class {
  /** Scene instance. @hidden */
  _scene;
  /** Pointer to the memory heap. */
  _ptr;
  /**
   * @param ptr Pointer to the ray hits memory.
   */
  constructor(scene, ptr) {
    if ((ptr & 3) !== 0) {
      throw new Error("Misaligned pointer: please report a bug");
    }
    this._scene = scene;
    this._ptr = ptr;
  }
  getLocations(out) {
    out = out ?? Array.from({ length: this.hitCount }, () => new Float32Array(3));
    const wasm = this.engine.wasm;
    const alignedPtr = this._ptr / 4;
    for (let i = 0; i < this.hitCount; ++i) {
      const locationPtr = alignedPtr + 3 * i;
      out[i][0] = wasm.HEAPF32[locationPtr];
      out[i][1] = wasm.HEAPF32[locationPtr + 1];
      out[i][2] = wasm.HEAPF32[locationPtr + 2];
    }
    return out;
  }
  getNormals(out) {
    out = out ?? Array.from({ length: this.hitCount }, () => new Float32Array(3));
    const wasm = this.engine.wasm;
    const alignedPtr = (this._ptr + 48) / 4;
    for (let i = 0; i < this.hitCount; ++i) {
      const normalPtr = alignedPtr + 3 * i;
      out[i][0] = wasm.HEAPF32[normalPtr];
      out[i][1] = wasm.HEAPF32[normalPtr + 1];
      out[i][2] = wasm.HEAPF32[normalPtr + 2];
    }
    return out;
  }
  getDistances(out = new Float32Array(this.hitCount)) {
    const wasm = this.engine.wasm;
    const alignedPtr = (this._ptr + 48 * 2) / 4;
    for (let i = 0; i < this.hitCount; ++i) {
      const distancePtr = alignedPtr + i;
      out[i] = wasm.HEAPF32[distancePtr];
    }
    return out;
  }
  /**
   * Array of hit objects.
   *
   * @param out Destination array/vector, expected to have at least `this.hitCount` elements.
   * @returns The `out` parameter.
   */
  getObjects(out = new Array(this.hitCount)) {
    const HEAPU16 = this.engine.wasm.HEAPU16;
    const alignedPtr = this._ptr + (48 * 2 + 16) >> 1;
    for (let i = 0; i < this.hitCount; ++i) {
      out[i] = this._scene.wrap(HEAPU16[alignedPtr + i]);
    }
    return out;
  }
  /** Hosting engine instance. */
  get engine() {
    return this._scene.engine;
  }
  /**
   * Equivalent to {@link RayHit.getLocations}.
   *
   * @note Prefer to use {@link RayHit.getLocations} for performance.
   */
  get locations() {
    return this.getLocations();
  }
  /**
   * Equivalent to {@link RayHit.getNormals}.
   *
   * @note Prefer to use {@link RayHit.getNormals} for performance.
   */
  get normals() {
    return this.getNormals();
  }
  /**
   * Equivalent to {@link RayHit.getDistances}.
   *
   * @note Prefer to use {@link RayHit.getDistances} for performance.
   */
  get distances() {
    return this.getDistances();
  }
  /**
   * Equivalent to {@link RayHit.getObjects}.
   *
   * @note Prefer to use {@link RayHit.getObjects} for performance.
   */
  get objects() {
    const objects = [null, null, null, null];
    return this.getObjects(objects);
  }
  /** Number of hits (max 4) */
  get hitCount() {
    return Math.min(this.engine.wasm.HEAPU32[this._ptr / 4 + 30], 4);
  }
};
var math = class {
  /** (Experimental!) Cubic Hermite spline interpolation for vector3 and quaternions.
   *
   * With `f == 0`, `out` will be `b`, if `f == 1`, `out` will be c.
   *
   * Whether a quaternion or vector3 interpolation is intended is determined by
   * length of `a`.
   *
   * @param out Array to write result to.
   * @param a First tangent/handle.
   * @param b First point or quaternion.
   * @param c Second point or quaternion.
   * @param d Second handle.
   * @param f Interpolation factor in [0; 1].
   * @returns The `out` parameter.
   *
   * @since 0.8.6
   */
  static cubicHermite(out, a, b, c, d, f, engine2 = WL) {
    const wasm = engine2.wasm;
    wasm._tempMemFloat.subarray(0).set(a);
    wasm._tempMemFloat.subarray(4).set(b);
    wasm._tempMemFloat.subarray(8).set(c);
    wasm._tempMemFloat.subarray(12).set(d);
    const isQuat = a.length == 4;
    wasm._wl_math_cubicHermite(wasm._tempMem + 4 * 16, wasm._tempMem + 4 * 0, wasm._tempMem + 4 * 4, wasm._tempMem + 4 * 8, wasm._tempMem + 4 * 12, f, isQuat);
    out[0] = wasm._tempMemFloat[16];
    out[1] = wasm._tempMemFloat[17];
    out[2] = wasm._tempMemFloat[18];
    if (isQuat)
      out[3] = wasm._tempMemFloat[19];
    return out;
  }
};
var I18N = class {
  /**
   * {@link Emitter} for language change events.
   *
   * First parameter to a listener is the old language index,
   * second parameter is the new language index.
   *
   * Usage from a within a component:
   *
   * ```js
   * this.engine.i18n.onLanguageChanged.add((oldLanguageIndex, newLanguageIndex) => {
   *     const oldLanguage = this.engine.i18n.languageName(oldLanguageIndex);
   *     const newLanguage = this.engine.i18n.languageName(newLanguageIndex);
   *     console.log("Switched from", oldLanguage, "to", newLanguage);
   * });
   * ```
   */
  onLanguageChanged = new Emitter();
  /** Wonderland Engine instance. @hidden */
  _engine;
  /** Previously set language index. @hidden */
  _prevLanguageIndex = -1;
  /**
   * Constructor
   */
  constructor(engine2) {
    this._engine = engine2;
  }
  /**
   * Set current language and apply translations to linked text parameters.
   *
   * @note This is equivalent to {@link I18N.setLanguage}.
   *
   * @param code Language code to switch to
   */
  set language(code) {
    this.setLanguage(code);
  }
  /** Get current language code. */
  get language() {
    const wasm = this._engine.wasm;
    const code = wasm._wl_i18n_currentLanguage();
    if (code === 0)
      return null;
    return wasm.UTF8ToString(code);
  }
  /**
   * Get the current language index.
   *
   * This method is more efficient than its equivalent:
   *
   * ```js
   * const index = i18n.languageIndex(i18n.language);
   * ```
   */
  get currentIndex() {
    return this._engine.wasm._wl_i18n_currentLanguageIndex();
  }
  /** Previous language index. */
  get previousIndex() {
    return this._prevLanguageIndex;
  }
  /**
   * Set current language and apply translations to linked text parameters.
   *
   * @param code The language code.
   * @returns A promise that resolves with the current index code when the
   *     language is loaded.
   */
  async setLanguage(code) {
    if (code == null)
      return Promise.resolve(this.currentIndex);
    const wasm = this._engine.wasm;
    this._prevLanguageIndex = this.currentIndex;
    wasm._wl_i18n_setLanguage(wasm.tempUTF8(code));
    const scene = this.engine.scene;
    const filename = wasm.UTF8ToString(wasm._wl_i18n_languageFile(this.currentIndex));
    const url = `${scene.baseURL}/locale/${filename}`;
    await scene._downloadDependency(url);
    this.onLanguageChanged.notify(this._prevLanguageIndex, this.currentIndex);
    return this.currentIndex;
  }
  /**
   * Get translated string for a term for the currently loaded language.
   *
   * @param term Term to translate
   */
  translate(term) {
    const wasm = this._engine.wasm;
    const translation = wasm._wl_i18n_translate(wasm.tempUTF8(term));
    if (translation === 0)
      return null;
    return wasm.UTF8ToString(translation);
  }
  /**
   * Get the number of languages in the project.
   *
   */
  languageCount() {
    const wasm = this._engine.wasm;
    return wasm._wl_i18n_languageCount();
  }
  /**
   * Get a language code.
   *
   * @param index Index of the language to get the code from
   */
  languageIndex(code) {
    const wasm = this._engine.wasm;
    return wasm._wl_i18n_languageIndex(wasm.tempUTF8(code));
  }
  /**
   * Get a language code.
   *
   * @param index Index of the language to get the code from
   */
  languageCode(index) {
    const wasm = this._engine.wasm;
    const code = wasm._wl_i18n_languageCode(index);
    if (code === 0)
      return null;
    return wasm.UTF8ToString(code);
  }
  /**
   * Get a language name.
   *
   * @param index Index of the language to get the name from
   */
  languageName(index) {
    const wasm = this._engine.wasm;
    const name = wasm._wl_i18n_languageName(index);
    if (name === 0)
      return null;
    return wasm.UTF8ToString(name);
  }
  /** Hosting engine instance. */
  get engine() {
    return this._engine;
  }
};
var XR = class {
  /** Wonderland WASM bridge. @hidden */
  #wasm;
  #mode;
  constructor(wasm, mode) {
    this.#wasm = wasm;
    this.#mode = mode;
  }
  /** Current WebXR session mode */
  get sessionMode() {
    return this.#mode;
  }
  /** Current WebXR session */
  get session() {
    return this.#wasm.webxr_session;
  }
  /** Current WebXR frame */
  get frame() {
    return this.#wasm.webxr_frame;
  }
  referenceSpaceForType(type) {
    return this.#wasm.webxr_refSpaces[type] ?? null;
  }
  /** Set current reference space type used for retrieving eye, head, hand and joint poses */
  set currentReferenceSpace(refSpace) {
    this.#wasm.webxr_refSpace = refSpace;
    this.#wasm.webxr_refSpaceType = null;
    for (const type of Object.keys(this.#wasm.webxr_refSpaces)) {
      if (this.#wasm.webxr_refSpaces[type] === refSpace) {
        this.#wasm.webxr_refSpaceType = type;
      }
    }
  }
  /** Current reference space type used for retrieving eye, head, hand and joint poses */
  get currentReferenceSpace() {
    return this.#wasm.webxr_refSpace;
  }
  /** Current WebXR reference space type or `null` if not a default reference space */
  get currentReferenceSpaceType() {
    return this.#wasm.webxr_refSpaceType;
  }
  /** Current WebXR base layer  */
  get baseLayer() {
    return this.#wasm.webxr_baseLayer;
  }
  /** Current WebXR framebuffer */
  get framebuffers() {
    if (!Array.isArray(this.#wasm.webxr_fbo)) {
      return [this.#wasm.GL.framebuffers[this.#wasm.webxr_fbo]];
    }
    return this.#wasm.webxr_fbo.map((id) => this.#wasm.GL.framebuffers[id]);
  }
};

// node_modules/@wonderlandengine/api/dist/resources/material-manager.js
var MaterialParamType;
(function(MaterialParamType2) {
  MaterialParamType2[MaterialParamType2["UnsignedInt"] = 0] = "UnsignedInt";
  MaterialParamType2[MaterialParamType2["Int"] = 1] = "Int";
  MaterialParamType2[MaterialParamType2["HalfFloat"] = 2] = "HalfFloat";
  MaterialParamType2[MaterialParamType2["Float"] = 3] = "Float";
  MaterialParamType2[MaterialParamType2["Sampler"] = 4] = "Sampler";
  MaterialParamType2[MaterialParamType2["Font"] = 5] = "Font";
})(MaterialParamType || (MaterialParamType = {}));
var Material = class extends Resource {
  /**
   * @deprecated Use {@link MaterialManager#getTemplate} via {@link WonderlandEngine.materials}
   * to create a new material with a given pipeline:
   *
   * ```js
   * const PhongMaterial = engine.materials.getTemplate('Phong Opaque');
   * const material = new PhongMaterial();
   * material.setDiffuseColor([1, 0, 0]);
   * ```
   */
  constructor(engine2, params) {
    if (typeof params !== "number") {
      if (!params?.pipeline)
        throw new Error("Missing parameter 'pipeline'");
      const template = engine2.materials.getTemplate(params.pipeline);
      const material = new template();
      super(engine2, material._index);
      return material;
    }
    super(engine2, params);
  }
  /**
   * Check whether a parameter exists on this material.
   *
   * @param name The name to check.
   * @returns `true` if the parameter with name `name` exists on this material,
   *     `false` otherwise.
   */
  hasParameter(name) {
    const parameters = this.constructor.Parameters;
    return parameters && parameters.has(name);
  }
  /** @deprecated Use {@link #pipeline} instead. */
  get shader() {
    return this.pipeline;
  }
  /** Name of the pipeline used by this material. */
  get pipeline() {
    const wasm = this.engine.wasm;
    return wasm.UTF8ToString(wasm._wl_material_get_pipeline(this._id));
  }
  /**
   * Create a copy of the underlying native material.
   *
   * @returns Material clone.
   */
  clone() {
    const index = this.engine.wasm._wl_material_clone(this._id);
    return this.engine.materials.wrap(index);
  }
  /** @overload */
  toString() {
    if (this.isDestroyed) {
      return "Material(destroyed)";
    }
    return `Material('${this.pipeline}', ${this._index})`;
  }
  /**
   * Wrap a native material index.
   *
   * @param engine Engine instance.
   * @param index The index.
   * @returns Material instance or `null` if index <= 0.
   *
   * @deprecated Use the {@link WonderlandEngine.materials} instead.
   */
  static wrap(engine2, index) {
    return engine2.materials.wrap(index);
  }
};
/** Proxy used to override prototypes of destroyed materials. */
__publicField(Material, "_destroyedPrototype", createDestroyedProxy2("material"));
var MaterialManager = class extends ResourceManager {
  /** Material classes. @hidden. */
  _materialTemplates = [];
  /** @hidden */
  constructor(engine2) {
    super(engine2, Material);
    this._cacheDefinitions();
  }
  /** @override */
  wrap(index) {
    if (index <= 0)
      return null;
    const cached = this._cache[index];
    if (cached)
      return cached;
    const wasm = this.engine.wasm;
    const definition = wasm._wl_material_get_definition(index);
    const Template = this._materialTemplates[definition];
    const material = new Template(index);
    return this._wrapInstance(material);
  }
  /**
   * Get the material class with the given pipeline name.
   *
   * #### Usage
   *
   * ```js
   * const PhongMaterial = engine.materials.getTemplate('Phong Opaque');
   * const material = new PhongMaterial();
   * material.setDiffuseColor([1.0, 0.0, 0.0, 1.0]);
   * ```
   *
   * @param pipeline The pipeline name to search for.
   * @returns The material class.
   *
   * @throws `Error` if the material class doesn't exist.
   */
  getTemplate(pipeline) {
    const wasm = this.engine.wasm;
    const index = wasm._wl_get_material_definition_index(wasm.tempUTF8(pipeline));
    if (!index) {
      throw new Error(`Pipeline '${pipeline}' doesn't exist in the scene`);
    }
    return this._materialTemplates[index];
  }
  /**
   * Wrap a material instance.
   *
   * @todo: Remove at 2.0.0.
   *
   * @note Wrapping should only be called once per instance.
   *
   * @param instance The material instance.
   * @returns The new material, wrapped in a proxy.
   */
  _wrapInstance(instance) {
    this._cache[instance.index] = instance;
    if (!this.engine.legacyMaterialSupport)
      return instance;
    const proxy = new Proxy(instance, {
      get(target, prop) {
        if (!target.hasParameter(prop)) {
          return target[prop];
        }
        const name = `get${capitalizeFirstUTF8(prop)}`;
        return target[name]();
      },
      set(target, prop, value) {
        if (!target.hasParameter(prop)) {
          target[prop] = value;
          return true;
        }
        const name = `set${capitalizeFirstUTF8(prop)}`;
        target[name](value);
        return true;
      }
    });
    this._cache[instance.index] = proxy;
    return proxy;
  }
  /**
   * Cache all pipeline definitions.
   *
   * @hidden
   */
  _cacheDefinitions() {
    const wasm = this.engine.wasm;
    const count = wasm._wl_get_material_definition_count();
    for (let i = 0; i < count; ++i) {
      this._materialTemplates[i] = this._createMaterialTemplate(i);
    }
  }
  /**
   * Create a material class from a definition index.
   *
   * @param wasm The WASM instance.
   * @param definitionIndex The definition index to wrap.
   * @returns The material class.
   */
  _createMaterialTemplate(definitionIndex) {
    const engine2 = this.engine;
    const template = class CustomMaterial extends Material {
      static Parameters = /* @__PURE__ */ new Set();
      constructor(index) {
        index = index ?? engine2.wasm._wl_material_create(definitionIndex);
        super(engine2, index);
        return engine2.materials._wrapInstance(this);
      }
    };
    const wasm = this.engine.wasm;
    const nbParams = wasm._wl_material_definition_get_param_count(definitionIndex);
    for (let index = 0; index < nbParams; ++index) {
      const name = wasm.UTF8ToString(wasm._wl_material_definition_get_param_name(definitionIndex, index));
      template.Parameters.add(name);
      const t = wasm._wl_material_definition_get_param_type(definitionIndex, index);
      const type = t & 255;
      const componentCount = t >> 8 & 255;
      const capitalized = capitalizeFirstUTF8(name);
      const getterId = `get${capitalized}`;
      const setterId = `set${capitalized}`;
      const templateProto = template.prototype;
      switch (type) {
        case MaterialParamType.UnsignedInt:
          templateProto[getterId] = uint32Getter(index, componentCount);
          templateProto[setterId] = uint32Setter(index);
          break;
        case MaterialParamType.Int:
          templateProto[getterId] = int32Getter(index, componentCount);
          templateProto[setterId] = uint32Setter(index);
          break;
        case MaterialParamType.HalfFloat:
        case MaterialParamType.Float:
          templateProto[getterId] = float32Getter(index, componentCount);
          templateProto[setterId] = float32Setter(index);
          break;
        case MaterialParamType.Sampler:
          templateProto[getterId] = samplerGetter(index);
          templateProto[setterId] = samplerSetter(index);
          break;
        case MaterialParamType.Font:
          templateProto[getterId] = fontGetter(index);
          break;
      }
    }
    return template;
  }
};
function uint32Getter(index, count) {
  if (count === 1) {
    return function() {
      const wasm = this.engine.wasm;
      wasm._wl_material_get_param_value(this._id, index, wasm._tempMem);
      return wasm._tempMemUint32[0];
    };
  }
  return function(out = new Uint32Array(count)) {
    const wasm = this.engine.wasm;
    wasm._wl_material_get_param_value(this._id, index, wasm._tempMem);
    for (let i = 0; i < out.length; ++i) {
      out[i] = wasm._tempMemUint32[i];
    }
    return out;
  };
}
function uint32Setter(index) {
  return function(value) {
    const wasm = this.engine.wasm;
    wasm._wl_material_set_param_value_uint(this._id, index, value);
  };
}
function int32Getter(index, count) {
  if (count === 1) {
    return function() {
      const wasm = this.engine.wasm;
      wasm._wl_material_get_param_value(this._id, index, wasm._tempMem);
      return wasm._tempMemInt[0];
    };
  }
  return function(out = new Int32Array(count)) {
    const wasm = this.engine.wasm;
    wasm._wl_material_get_param_value(this._id, index, wasm._tempMem);
    for (let i = 0; i < out.length; ++i) {
      out[i] = wasm._tempMemInt[i];
    }
    return out;
  };
}
function float32Getter(index, count) {
  if (count === 1) {
    return function() {
      const wasm = this.engine.wasm;
      wasm._wl_material_get_param_value(this._id, index, wasm._tempMem);
      return wasm._tempMemFloat[0];
    };
  }
  return function(out = new Float32Array(count)) {
    const wasm = this.engine.wasm;
    wasm._wl_material_get_param_value(this._id, index, wasm._tempMem);
    for (let i = 0; i < out.length; ++i) {
      out[i] = wasm._tempMemFloat[i];
    }
    return out;
  };
}
function float32Setter(index) {
  return function(value) {
    const wasm = this.engine.wasm;
    let count = 1;
    if (typeof value === "number") {
      wasm._tempMemFloat[0] = value;
    } else {
      count = value.length;
      for (let i = 0; i < count; ++i)
        wasm._tempMemFloat[i] = value[i];
    }
    wasm._wl_material_set_param_value_float(this._id, index, wasm._tempMem, count);
  };
}
function samplerGetter(index) {
  return function() {
    const wasm = this.engine.wasm;
    wasm._wl_material_get_param_value(this._id, index, wasm._tempMem);
    return this.engine.textures.wrap(wasm._tempMemInt[0]);
  };
}
function samplerSetter(index) {
  return function(value) {
    const wasm = this.engine.wasm;
    wasm._wl_material_set_param_value_uint(this._id, index, value._id);
  };
}
function fontGetter(index) {
  return function() {
    const wasm = this.engine.wasm;
    wasm._wl_material_get_param_value(this._id, index, wasm._tempMem);
    return this.engine.fonts.wrap(wasm._tempMemInt[0]);
  };
}

// node_modules/@wonderlandengine/api/dist/resources/mesh-manager.js
var MeshManager = class extends ResourceManager {
  constructor(engine2) {
    super(engine2, Mesh);
  }
  /**
   * Create a new mesh.
   *
   * @param params Vertex and index data. For more information, have a look
   *     at the {@link MeshParameters} object.
   */
  create(params) {
    if (!params.vertexCount)
      throw new Error("Missing parameter 'vertexCount'");
    const wasm = this.engine.wasm;
    let indexData = 0;
    let indexType = 0;
    let indexDataSize = 0;
    if (params.indexData) {
      indexType = params.indexType || MeshIndexType.UnsignedShort;
      indexDataSize = params.indexData.length * indexType;
      indexData = wasm._malloc(indexDataSize);
      switch (indexType) {
        case MeshIndexType.UnsignedByte:
          wasm.HEAPU8.set(params.indexData, indexData);
          break;
        case MeshIndexType.UnsignedShort:
          wasm.HEAPU16.set(params.indexData, indexData >> 1);
          break;
        case MeshIndexType.UnsignedInt:
          wasm.HEAPU32.set(params.indexData, indexData >> 2);
          break;
      }
    }
    const { skinningType = MeshSkinningType.None } = params;
    const index = wasm._wl_mesh_create(indexData, indexDataSize, indexType, params.vertexCount, skinningType);
    const instance = new Mesh(this._host, index);
    this._cache[instance.index] = instance;
    return instance;
  }
};

// node_modules/@wonderlandengine/api/dist/resources/texture-manager.js
var TextureManager = class extends ResourceManager {
  constructor(engine2) {
    super(engine2, Texture);
  }
  /**
   * Create a new texture from an image or video.
   *
   * #### Usage
   *
   * ```js
   * const img = new Image();
   * img.load = function(img) {
   *     const texture = engine.textures.create(img);
   * };
   * img.src = 'my-image.png';
   * ```
   *
   * @note The media must already be loaded. To automatically
   * load the media and create a texture, use {@link TextureManager.load} instead.
   *
   * @param image Media element to create the texture from.
   * @ret\urns The new texture with the media content.
   */
  create(image) {
    const wasm = this.engine.wasm;
    const jsImageIndex = wasm._images.length;
    wasm._images.push(image);
    if (image instanceof HTMLImageElement && !image.complete) {
      throw new Error("image must be ready to create a texture");
    }
    const width = image.videoWidth ?? image.width;
    const height = image.videoHeight ?? image.height;
    const imageIndex = wasm._wl_image_create(jsImageIndex, width, height);
    const index = wasm._wl_texture_create(imageIndex);
    const instance = new Texture(this.engine, index);
    this._cache[instance.index] = instance;
    return instance;
  }
  /**
   * Load an image from URL as {@link Texture}.
   *
   * #### Usage
   *
   * ```js
   * const texture = await engine.textures.load('my-image.png');
   * ```
   *
   * @param filename URL to load from.
   * @param crossOrigin Cross origin flag for the image object.
   * @returns Loaded texture.
   */
  load(filename, crossOrigin) {
    let image = new Image();
    image.crossOrigin = crossOrigin ?? image.crossOrigin;
    image.src = filename;
    return new Promise((resolve, reject) => {
      image.onload = () => {
        resolve(this.create(image));
      };
      image.onerror = function() {
        reject("Failed to load image. Not found or no read access");
      };
    });
  }
};

// node_modules/@wonderlandengine/api/dist/scene-gltf.js
var GLTFExtensions = class {
  objectCount;
  /** glTF root extensions object. JSON data indexed by extension name. */
  root = {};
  /**
   * Mesh extension objects. Key is the gltf index, value is JSON
   * data indexed by extension name.
   */
  mesh = {};
  /**
   * Node extension objects. Key is a glTF index, value is JSON
   * data indexed by extension name.
   */
  node = {};
  constructor(count) {
    this.objectCount = count;
  }
};
var PrefabGLTF = class extends Prefab {
  /**
   * Raw extensions read from the glTF file.
   *
   * The extensions will be mapped to the hierarchy upon instantiation.
   * For more information, have a look at the {@link InstantiateGltfResult} type.
   *
   * @note The glTF must be loaded with `extensions` enabled. If not, this
   * field will be set to `null`. For more information, have a look at the
   * {@link GLTFOptions} type.
   */
  extensions = null;
  /**
   * @note This api is meant to be used internally.
   *
   * @hidden
   */
  constructor(engine2, index) {
    super(engine2, index);
    this.extensions = this._readExtensions();
  }
  /**
   * Instantiate the glTF extensions on an active sub scene graph.
   *
   * @param id The root object id.
   * @param result The instantiation object result.
   *
   * @hidden
   */
  _processInstantiaton(dest, root, result) {
    if (!this.extensions)
      return null;
    const wasm = this.engine.wasm;
    const count = this.extensions.objectCount;
    const idMapping = new Array(count);
    const activeRootIndex = wasm._wl_object_index(root._id);
    for (let i = 0; i < count; ++i) {
      const mappedId = wasm._wl_glTF_scene_extensions_gltfIndex_to_id(this._index, dest._index, activeRootIndex, i);
      idMapping[i] = mappedId;
    }
    const remapped = {
      mesh: {},
      node: {},
      idMapping
    };
    for (const gltfIndex in this.extensions.mesh) {
      const id = idMapping[gltfIndex];
      remapped.mesh[id] = this.extensions.mesh[gltfIndex];
    }
    for (const gltfIndex in this.extensions.node) {
      const id = idMapping[gltfIndex];
      remapped.node[id] = this.extensions.node[gltfIndex];
    }
    result.extensions = remapped;
  }
  /**
   * Unmarshalls gltf extensions.
   *
   * @hidden
   */
  _readExtensions() {
    const wasm = this.engine.wasm;
    const ptr = wasm._wl_glTF_scene_get_extensions(this._index);
    if (!ptr)
      return null;
    let index = ptr / 4;
    const data = wasm.HEAPU32;
    const readString = () => {
      const strPtr = data[index++];
      const strLen = data[index++];
      return wasm.UTF8ViewToString(strPtr, strPtr + strLen);
    };
    const objectCount = data[index++];
    const extensions = new GLTFExtensions(objectCount);
    const meshExtensionsSize = data[index++];
    for (let i = 0; i < meshExtensionsSize; ++i) {
      const objectId = data[index++];
      extensions.mesh[objectId] = JSON.parse(readString());
    }
    const nodeExtensionsSize = data[index++];
    for (let i = 0; i < nodeExtensionsSize; ++i) {
      const objectId = data[index++];
      extensions.node[objectId] = JSON.parse(readString());
    }
    const rootExtensionsStr = readString();
    if (rootExtensionsStr) {
      extensions.root = JSON.parse(rootExtensionsStr);
    }
    return extensions;
  }
};

// node_modules/@wonderlandengine/api/dist/scene.js
var MAGIC_BIN = "WLEV";
var Scene = class extends Prefab {
  /** Called before rendering the scene */
  onPreRender = new Emitter();
  /** Called after the scene has been rendered */
  onPostRender = new Emitter();
  /** Ray hit pointer in WASM heap. @hidden */
  _rayHit;
  /** Ray hit. @hidden */
  _hit;
  constructor(engine2, index) {
    super(engine2, index);
    this._rayHit = this.engine?.wasm._malloc(4 * (3 * 4 + 3 * 4 + 4 + 2) + 4);
    this._hit = new RayHit(this, this._rayHit);
  }
  instantiate(prefab) {
    const wasm = this.engine.wasm;
    const id = wasm._wl_scene_instantiate(prefab._index, this._index);
    const result = { root: this.wrap(id) };
    if (prefab instanceof PrefabGLTF) {
      const obj = this.wrap(id);
      prefab._processInstantiaton(this, obj, result);
    }
    return result;
  }
  /** @todo: Add `instantiateBatch` to instantiate multiple chunks in a row. */
  /**
   * @todo Provide an API to delete all resources linked to a scene.
   *
   * Example:
   *
   * ```ts
   * const scene = await engine.loadScene('Scene.bin');
   * ...
   * scene.destroy({removeResources: true});
   * ```
   */
  /**
   * Destroy this scene and remove it from the engine.
   *
   * @note Destroying a scene **doesn't** remove the materials, meshes,
   * and textures it references in the engine. Those should be cleaned up either by loading
   * another main scene via {@link WonderlandEngine.loadMainScene}, or manually using {@link Mesh.destroy}.
   *
   * @throws If the scene is currently active.
   * */
  destroy() {
    if (this.isActive) {
      throw new Error(`Attempt to destroy ${this}, but destroying the active scene is not supported`);
    }
    const wasm = this.engine.wasm;
    const rayPtr = this._rayHit;
    super.destroy();
    wasm._free(rayPtr);
  }
  /**
   * Currently active view components.
   */
  get activeViews() {
    const wasm = this.engine.wasm;
    const count = wasm._wl_scene_get_active_views(this._index, wasm._tempMem, 16);
    const views = [];
    for (let i = 0; i < count; ++i) {
      const id = wasm._tempMemInt[i];
      views.push(this._components.wrapView(id));
    }
    return views;
  }
  /**
   * Cast a ray through the scene and find intersecting collision components.
   *
   * The resulting ray hit will contain **up to 4** closest ray hits,
   * sorted by increasing distance.
   *
   * Example:
   *
   * ```js
   * const hit = engine.scene.rayCast(
   *     [0, 0, 0],
   *     [0, 0, 1],
   *     1 << 0 | 1 << 4, // Only check against components in groups 0 and 4
   *     25
   * );
   * if (hit.hitCount > 0) {
   *     const locations = hit.getLocations();
   *     console.log(`Object hit at: ${locations[0][0]}, ${locations[0][1]}, ${locations[0][2]}`);
   * }
   * ```
   *
   * @param o Ray origin.
   * @param d Ray direction.
   * @param groupMask Bitmask of collision groups to filter by: only objects
   *        that are part of given groups are considered for the raycast.
   * @param maxDistance Maximum **inclusive** hit distance. Defaults to `100`.
   *
   * @returns The {@link RayHit} instance, cached by this class.
   *
   * @note The returned {@link RayHit} object is owned by the {@link Scene}
   *       instance and will be reused with the next {@link Scene#rayCast} call.
   */
  rayCast(o, d, groupMask, maxDistance = 100) {
    this.engine.wasm._wl_scene_ray_cast(this._index, o[0], o[1], o[2], d[0], d[1], d[2], groupMask, this._rayHit, maxDistance);
    return this._hit;
  }
  /**
   * Set the background clear color.
   *
   * @param color new clear color (RGBA).
   * @since 0.8.5
   */
  set clearColor(color) {
    this.engine.wasm._wl_scene_set_clearColor(color[0], color[1], color[2], color[3]);
  }
  /**
   * Set whether to clear the color framebuffer before drawing.
   *
   * This function is useful if an external framework (e.g. an AR tracking
   * framework) is responsible for drawing a camera frame before Wonderland
   * Engine draws the scene on top of it.
   *
   * @param b Whether to enable color clear.
   * @since 0.9.4
   */
  set colorClearEnabled(b) {
    this.engine.wasm._wl_scene_enableColorClear(b);
  }
  /**
   * Load a scene file (.bin).
   *
   * Will replace the currently active scene with the one loaded
   * from given file. It is assumed that JavaScript components required by
   * the new scene were registered in advance.
   *
   * Once the scene is loaded successfully and initialized,
   * {@link WonderlandEngine.onSceneLoaded} is notified.
   *
   * #### ArrayBuffer
   *
   * The `load()` method accepts an in-memory buffer:
   *
   * ```js
   * scene.load({
   *     buffer: new ArrayBuffer(...),
   *     baseURL: 'https://my-website/assets'
   * })
   * ```
   *
   * @note The `baseURL` is mandatory. It's used to fetch images and languages.
   *
   * Use {@link Scene.setLoadingProgress} to update the loading progress bar
   * when using an ArrayBuffer.
   *
   * @deprecated Use the new {@link Scene} and {@link Scene} API.
   *
   * @param options Path to the file to load, or an option object.
   *     For more information about the options, see the {@link SceneLoadOptions} documentation.
   * @returns Promise that resolves when the scene was loaded.
   */
  async load(options) {
    let dispatchReadyEvent = false;
    let opts;
    if (isString(options)) {
      opts = await Scene.loadBuffer(options, (bytes, size) => {
        this.engine.log.info(LogTag.Scene, `Scene downloading: ${bytes} / ${size}`);
        this.setLoadingProgress(bytes / size);
      });
    } else {
      opts = options;
      dispatchReadyEvent = options.dispatchReadyEvent ?? false;
    }
    const scene = await this.engine.loadMainSceneFromBuffer({
      ...opts,
      dispatchReadyEvent
    });
    this.engine.onSceneLoaded.notify();
    return scene;
  }
  /**
   * Append a scene file.
   *
   * Loads and parses the file and its images and appends the result
   * to the currently active scene.
   *
   * Supported formats are streamable Wonderland scene files (.bin) and glTF
   * 3D scenes (.gltf, .glb).
   *
   * ```js
   * WL.scene.append(filename).then(root => {
   *     // root contains the loaded scene
   * });
   * ```
   *
   * In case the `loadGltfExtensions` option is set to true, the response
   * will be an object containing both the root of the loaded scene and
   * any glTF extensions found on nodes, meshes and the root of the file.
   *
   * ```js
   * WL.scene.append(filename, { loadGltfExtensions: true }).then(({root, extensions}) => {
   *     // root contains the loaded scene
   *     // extensions.root contains any extensions at the root of glTF document
   *     const rootExtensions = extensions.root;
   *     // extensions.mesh and extensions.node contain extensions indexed by Object id
   *     const childObject = root.children[0];
   *     const meshExtensions = root.meshExtensions[childObject.objectId];
   *     const nodeExtensions = root.nodeExtensions[childObject.objectId];
   *     // extensions.idMapping contains a mapping from glTF node index to Object id
   * });
   * ```
   *
   * If the file to be loaded is located in a subfolder, it might be useful
   * to define the `baseURL` option. This will ensure any bin files
   * referenced by the loaded bin file are loaded at the correct path.
   *
   * ```js
   * WL.scene.append(filename, { baseURL: 'scenes' }).then(({root, extensions}) => {
   *     // do stuff
   * });
   * ```
   *
   * @deprecated Use the new {@link Prefab} and {@link Scene} API.
   *
   * @param file The .bin, .gltf or .glb file to append. Should be a URL or
   *   an `ArrayBuffer` with the file content.
   * @param options Additional options for loading.
   * @returns Promise that resolves when the scene was appended.
   */
  async append(file, options = {}) {
    const { baseURL = isString(file) ? getBaseUrl(file) : this.baseURL } = options;
    const buffer = isString(file) ? await fetchWithProgress(file) : file;
    const data = new Uint8Array(buffer);
    const isBinFile = data.byteLength > MAGIC_BIN.length && data.subarray(0, MAGIC_BIN.length).every((value, i) => value === MAGIC_BIN.charCodeAt(i));
    const scene = isBinFile ? this.engine.loadPrefabFromBuffer({ buffer, baseURL }) : this.engine.loadGLTFFromBuffer({
      buffer,
      baseURL,
      extensions: options.loadGltfExtensions
    });
    const result = this.instantiate(scene);
    if (scene instanceof PrefabGLTF) {
      if (!scene.extensions)
        return result.root;
      return {
        root: result.root,
        extensions: {
          ...result.extensions,
          root: scene.extensions.root
        }
      };
    }
    return result.root;
  }
  /**
   * Update the loading screen progress bar.
   *
   * @param value Current loading percentage, in the range [0; 1].
   */
  setLoadingProgress(percentage) {
    const wasm = this.engine.wasm;
    wasm._wl_set_loading_screen_progress(clamp(percentage, 0, 1));
  }
  /**
   * Dispatch an event 'wle-scene-ready' in the document.
   *
   * @note This is used for automatic testing.
   */
  dispatchReadyEvent() {
    document.dispatchEvent(new CustomEvent("wle-scene-ready", {
      detail: { filename: this.filename }
    }));
  }
  /**
   * Set the current material to render the sky.
   *
   * @note The sky needs to be enabled in the editor when creating the scene.
   * For more information, please refer to the background [tutorial](https://wonderlandengine.com/tutorials/background-effect/).
   */
  set skyMaterial(material) {
    this.engine.wasm._wl_scene_set_sky_material(this._index, material?._id ?? 0);
  }
  /** Current sky material, or `null` if no sky is set. */
  get skyMaterial() {
    const index = this.engine.wasm._wl_scene_get_sky_material(this._index);
    return this.engine.materials.wrap(index);
  }
  /**
   * Reset the scene.
   *
   * This method deletes all used and allocated objects, and components.
   *
   * @deprecated Load a new scene and activate it instead.
   */
  reset() {
  }
  /**
   * Download and apply queued dependency files (.bin).
   *
   * @hidden
   */
  async _downloadDependency(url) {
    const wasm = this.engine.wasm;
    const buffer = await fetchWithProgress(url);
    const ptr = wasm.copyBufferToHeap(buffer);
    try {
      wasm._wl_scene_load_queued_bin(this._index, ptr, buffer.byteLength);
    } finally {
      wasm._free(ptr);
    }
  }
  /**
   * Download and apply queued dependency files (.bin).
   *
   * @hidden
   */
  async _downloadDependencies() {
    const wasm = this.engine.wasm;
    const count = wasm._wl_scene_queued_bin_count(this._index);
    if (!count)
      return Promise.resolve();
    const urls = new Array(count).fill(0).map((_, i) => {
      const ptr = wasm._wl_scene_queued_bin_path(this._index, i);
      const url = wasm.UTF8ToString(ptr);
      return url;
    });
    wasm._wl_scene_clear_queued_bin_list(this._index);
    return Promise.all(urls.map((url) => this._downloadDependency(url)));
  }
};

// node_modules/@wonderlandengine/api/dist/engine.js
function checkXRSupport() {
  if (!navigator.xr) {
    const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
    const missingHTTPS = location.protocol !== "https:" && !isLocalhost;
    return Promise.reject(missingHTTPS ? "WebXR is only supported with HTTPS or on localhost!" : "WebXR unsupported in this browser.");
  }
  return Promise.resolve();
}
var WonderlandEngine = class {
  /**
   * {@link Emitter} for WebXR session end events.
   *
   * Usage from within a component:
   *
   * ```js
   * this.engine.onXRSessionEnd.add(() => console.log("XR session ended."));
   * ```
   */
  onXRSessionEnd = new Emitter();
  /**
   * {@link RetainEmitter} for WebXR session start events.
   *
   * Usage from within a component:
   *
   * ```js
   * this.engine.onXRSessionStart.add((session, mode) => console.log(session, mode));
   * ```
   *
   * By default, this emitter is retained and will automatically call any callback added
   * while a session is already started:
   *
   * ```js
   * // XR session is already active.
   * this.engine.onXRSessionStart.add((session, mode) => {
   *     console.log(session, mode); // Triggered immediately.
   * });
   * ```
   */
  onXRSessionStart = new RetainEmitter();
  /**
   * {@link Emitter} for canvas / main framebuffer resize events.
   *
   * Usage from within a component:
   *
   * ```js
   * this.engine.onResize.add(() => {
   *     const canvas = this.engine.canvas;
   *     console.log(`New Size: ${canvas.width}, ${canvas.height}`);
   * });
   * ```
   *
   * @note The size of the canvas is in physical pixels, and is set via {@link WonderlandEngine.resize}.
   */
  onResize = new Emitter();
  /** Whether AR is supported by the browser. */
  arSupported = false;
  /** Whether VR is supported by the browser. */
  vrSupported = false;
  /**
   * {@link RetainEmitter} signalling the end of the loading screen.
   *
   * Listeners get notified when the first call to {@link Scene#load()} is
   * invoked. At this point the new scene has not become active, and none of
   * its resources or components are initialized.
   *
   * Compared to {@link onSceneLoaded}, this does not wait for all components
   * to be fully initialized and activated. Any handler added inside
   * {@link Component#init()}, {@link Component#start()} or
   * {@link Component#onActivate()} will be called immediately.
   *
   * Usage:
   *
   * ```js
   * this.engine.onLoadingScreenEnd.add(() => console.log("Wait is over!"));
   * ```
   */
  onLoadingScreenEnd = new RetainEmitter();
  /**
   * {@link Emitter} for scene loaded events.
   *
   * Listeners get notified when a call to {@link Scene#load()} finishes. At
   * this point all resources are loaded and all components had their
   * {@link Component#init()} as well as (if active)
   * {@link Component#start()} and {@link Component#onActivate()} methods
   * called.
   *
   * Usage from within a component:
   *
   * ```js
   * this.engine.onSceneLoaded.add(() => console.log("Scene switched!"));
   * ```
   *
   * @deprecated Use {@link onSceneActivated} instead.
   */
  onSceneLoaded = new Emitter();
  /**
   * {@link Emitter} for scene activated events.
   *
   * This listener is notified with the old scene as first parameter, and
   * the new scene as second.
   *
   * This listener is notified after all resources are loaded and all components had their
   * {@link Component#init()} as well as (if active)
   * {@link Component#start()} and {@link Component#onActivate()} methods
   * called.
   *
   * Usage from within a component:
   *
   * ```js
   * this.engine.onSceneActivated.add((oldScene, newScene) => {
   *     console.log(`Scene switch from ${oldScene.filename} to ${newScene.filename}`);
   * });
   * ```
   */
  onSceneActivated = new Emitter();
  /**
   * Access to internationalization.
   */
  i18n = new I18N(this);
  /**
   * WebXR related state, `null` if no XR session is active.
   */
  xr = null;
  /**
   * If `true`, {@link Texture}, {@link Object3D}, and {@link Component}
   * instances have their prototype erased upon destruction.
   *
   * #### Object
   *
   * ```js
   * engine.erasePrototypeOnDestroy = true;
   *
   * const obj = engine.scene.addObject();
   * obj.name = 'iamalive';
   * console.log(obj.name); // Prints 'iamalive'
   *
   * obj.destroy();
   * console.log(obj.name); // Throws an error
   * ```
   *
   * #### Component
   *
   * Components will also be affected:
   *
   * ```js
   * class MyComponent extends Component {
   *     static TypeName = 'my-component';
   *     static Properties = {
   *         alive: Property.bool(true)
   *     };
   *
   *     start() {
   *         this.destroy();
   *         console.log(this.alive) // Throws an error
   *     }
   * }
   * ```
   *
   * A component is also destroyed if its ancestor gets destroyed:
   *
   * ```js
   * class MyComponent extends Component {
   *     ...
   *     start() {
   *         this.object.parent.destroy();
   *         console.log(this.alive) // Throws an error
   *     }
   * }
   * ```
   *
   * @note Native components will not be erased if destroyed via object destruction:
   *
   * ```js
   * const mesh = obj.addComponent('mesh');
   * obj.destroy();
   * console.log(mesh.active) // Doesn't throw even if the mesh is destroyed
   * ```
   *
   * @since 1.1.1
   */
  erasePrototypeOnDestroy = false;
  /**
   * If `true`, the materials will be wrapped in a proxy to support pre-1.2.0
   * material access, i.e.,
   *
   * ```js
   * const material = new Material(engine, 'Phong Opaque');
   * material.diffuseColor = [1.0, 0.0, 0.0, 1.0];
   * ```
   *
   * If `false`, property accessors will not be available and material
   * properties should be accessed via methods, i.e.,
   *
   * ```js
   * const PhongOpaque = engine.materials.getTemplate('Phong Opaque');
   * const material = new PhongOpaque();
   * material.setDiffuseColor([1.0, 0.0, 0.0, 1.0]);
   * ...
   * const diffuse = material.getDiffuseColor();
   * ```
   *
   * When disabled, reading/writing to materials is slightly more efficient on the CPU.
   */
  legacyMaterialSupport = true;
  /**
   * Scene cache in scene manager.
   *
   * @hidden
   */
  _scenes = [];
  /**
   * Currently active scene.
   *
   * @hidden
   */
  _scene = null;
  /** @hidden */
  _textures = null;
  /** @hidden */
  _materials = null;
  /** @hidden */
  _meshes = null;
  /** @hidden */
  _morphTargets = null;
  /** @hidden */
  _fonts = null;
  /**
   * WebAssembly bridge.
   *
   * @hidden
   */
  #wasm;
  /**
   * Physics manager, only available when physx is enabled in the runtime.
   *
   * @hidden
   */
  #physics = null;
  /**
   * Resize observer to track for canvas size changes.
   *
   * @hidden
   */
  #resizeObserver = null;
  /**
   * Initial reference space type set by webxr_init. See {@link _init} for
   * more information.
   *
   * @hidden
   */
  #initialReferenceSpaceType = null;
  /**
   * Create a new engine instance.
   *
   * @param wasm Wasm bridge instance
   * @param loadingScreen Loading screen .bin file data
   *
   * @hidden
   */
  constructor(wasm, loadingScreen) {
    this.#wasm = wasm;
    this.#wasm["_setEngine"](this);
    this.#wasm._loadingScreen = loadingScreen;
    this.canvas.addEventListener("webglcontextlost", (e) => this.log.error(LogTag.Engine, "Context lost:", e), false);
  }
  /**
   * Start the engine if it's not already running.
   *
   * When using the {@link loadRuntime} function, this method is called
   * automatically.
   */
  start() {
    this.wasm._wl_application_start();
  }
  /**
   * Register a custom JavaScript component type.
   *
   * You can register a component directly using a class inheriting from {@link Component}:
   *
   * ```js
   * import { Component, Type } from '@wonderlandengine/api';
   *
   * export class MyComponent extends Component {
   *     static TypeName = 'my-component';
   *     static Properties = {
   *         myParam: {type: Type.Float, default: 42.0},
   *     };
   *     init() {}
   *     start() {}
   *     update(dt) {}
   *     onActivate() {}
   *     onDeactivate() {}
   *     onDestroy() {}
   * });
   *
   * // Here, we assume we have an engine already instantiated.
   * // In general, the registration occurs in the `index.js` file in your
   * // final application.
   * engine.registerComponent(MyComponent);
   * ```
   *
   * {@label CLASSES}
   * @param classes Custom component(s) extending {@link Component}.
   *
   * @since 1.0.0
   */
  registerComponent(...classes) {
    for (const arg of classes) {
      this.wasm._registerComponent(arg);
    }
  }
  /**
   * Switch the current active scene.
   *
   * Once active, the scene will be updated and rendered on the canvas.
   *
   * The currently active scene is accessed via {@link WonderlandEngine.scene}:
   *
   * ```js
   * import {Component} from '@wonderlandengine/api';
   *
   * class MyComponent extends Component{
   *     start() {
   *         console.log(this.scene === this.engine.scene); // Prints `true`
   *     }
   * }
   * ```
   *
   * @note This method will throw if the scene isn't activatable.
   *
   * #### Component Lifecycle
   *
   * Marking a scene as active will:
   * * Call {@link Component#onDeactivate} for all active components of the previous scene
   * * Call {@link Component#onActivate} for all active components of the new scene
   *
   * #### Usage
   *
   * ```js
   * const scene = await engine.loadScene('Scene.bin');
   * engine.switchTo(scene);
   * ```
   *
   * @returns A promise that resolves once the scene is ready.
   *
   * @since 1.2.0
   */
  async switchTo(scene, opts = {}) {
    this.wasm._wl_deactivate_activeScene();
    const previous = this.scene;
    this._scene = scene;
    this.wasm._wl_scene_activate(scene._index);
    if (!this.onLoadingScreenEnd.isDataRetained) {
      this.onLoadingScreenEnd.notify();
    }
    scene._downloadDependencies();
    if (this.physics)
      this.physics._hit._scene = scene;
    await this.i18n.setLanguage(this.i18n.languageCode(0));
    const { dispatchReadyEvent = false } = opts;
    this.onSceneActivated.notify(previous, scene);
    if (dispatchReadyEvent)
      scene.dispatchReadyEvent();
  }
  /**
   * Load the scene from a URL, as the main scene of a new {@link Scene}.
   *
   * #### Usage
   *
   * ```js
   * // The method returns the main scene
   * const scene = await engine.loadMainScene();
   * ```
   *
   * #### Destruction
   *
   * Loading a new main scene entirely resets the state of the engine, and destroys:
   * - All loaded scenes, prefabs, and gltf files
   * - Meshes
   * - Textures
   * - Materials
   *
   * @note This method can only load Wonderland Engine `.bin` files.
   *
   * @param url The URL pointing to the scene to load.
   * @param progress Optional progress callback.
   * @returns The main scene of the new {@link Scene}.
   */
  async loadMainScene(opts, progress = () => {
  }) {
    const options = await Scene.loadBuffer(opts, progress);
    return this.loadMainSceneFromBuffer(options);
  }
  /**
   * Similar to {@link WonderlandEngine.loadMainScene}, but loading is done from an ArrayBuffer.
   *
   * @param options An object containing the buffer and extra metadata.
   * @returns The main scene of the new {@link Scene}.
   */
  async loadMainSceneFromBuffer(options) {
    const { buffer, url } = Prefab.validateBufferOptions(options);
    const wasm = this.#wasm;
    wasm._wl_deactivate_activeScene();
    for (let i = this._scenes.length - 1; i >= 0; --i) {
      const scene = this._scenes[i];
      if (scene)
        scene.destroy();
    }
    this._textures._clear();
    this._materials._clear();
    this._meshes._clear();
    this._morphTargets._clear();
    const ptr = wasm.copyBufferToHeap(buffer);
    let index = -1;
    try {
      index = wasm._wl_load_main_scene(ptr, buffer.byteLength, wasm.tempUTF8(url));
    } finally {
      wasm._free(ptr);
    }
    if (index === -1)
      throw new Error("Failed to load main scene");
    const mainScene = this._reload(index);
    let previous = this.scene;
    this._scene = mainScene;
    mainScene._initialize();
    this._scene = previous;
    await this.switchTo(mainScene, options);
    return mainScene;
  }
  /**
   * Load a {@link Prefab} from a URL.
   *
   * #### Usage
   *
   * ```js
   * const prefab = await engine.loadPrefab('Prefab.bin');
   * ```
   *
   * @note This method can only load Wonderland Engine `.bin` files.
   * @note This method is a wrapper around {@link WonderlandEngine.loadPrefabFromBuffer}.
   *
   * @param url The URL pointing to the prefab to load.
   * @param progress Optional progress callback.
   * @returns The loaded {@link Prefab}.
   */
  async loadPrefab(opts, progress = () => {
  }) {
    const options = await Scene.loadBuffer(opts, progress);
    return this.loadPrefabFromBuffer(options);
  }
  /**
   * Similar to {@link WonderlandEngine.loadPrefab}, but loading is done from an ArrayBuffer.
   *
   * @param options An object containing the buffer and extra metadata.
   * @returns A new loaded {@link Prefab}.
   */
  loadPrefabFromBuffer(options) {
    const scene = this._loadSceneFromBuffer(Prefab, options);
    if (this.wasm._wl_scene_activatable(scene._index)) {
      this.wasm._wl_scene_destroy(scene._index);
      throw new Error("File is not a prefab. To load a scene, use loadScene() instead");
    }
    scene._initialize();
    return scene;
  }
  /**
   * Load a scene from a URL.
   *
   * At the opposite of {@link WonderlandEngine.loadMainScene}, the scene loaded
   * will be added to the list of existing scenes, and its resources will be made
   * available for other scenes/prefabs/gltf to use.
   *
   * #### Resources Sharing
   *
   * Upon loading, the scene resources are added in the engine, and references
   * to those resources are updated.
   *
   * It's impossible for a scene loaded with this method to import pipelines.
   * Thus, the loaded scene will reference existing pipelines in the main scene,
   * based on their names.
   *
   * #### Usage
   *
   * ```js
   * const scene = await engine.loadScene('Scene.bin');
   * ```
   *
   * @note This method can only load Wonderland Engine `.bin` files.
   * @note This method is a wrapper around {@link WonderlandEngine#loadSceneFromBuffer}.
   *
   * @param url The URL pointing to the scene to load.
   * @param progress Optional progress callback.
   * @returns A new loaded {@link Scene}.
   */
  async loadScene(opts, progress = () => {
  }) {
    const options = await Scene.loadBuffer(opts, progress);
    return this.loadSceneFromBuffer(options);
  }
  /**
   * Create a glTF scene from a URL.
   *
   * @note This method is a wrapper around {@link WonderlandEngine.loadGLTFFromBuffer}.
   *
   * @param options The URL as a string, or an object of the form {@link GLTFOptions}.
   * @param progress Optional progress callback.
   * @returns A new loaded {@link PrefabGLTF}.
   */
  async loadGLTF(opts, progress = () => {
  }) {
    const memOptions = await Scene.loadBuffer(opts, progress);
    const options = isString(opts) ? memOptions : { ...opts, ...memOptions };
    return this.loadGLTFFromBuffer(options);
  }
  /**
   * Similar to {@link WonderlandEngine.loadScene}, but loading is done from an ArrayBuffer.
   *
   * @throws If the scene is streamable.
   *
   * @param options An object containing the buffer and extra metadata.
   * @returns A new loaded {@link Scene}.
   */
  loadSceneFromBuffer(options) {
    const scene = this._loadSceneFromBuffer(Scene, options);
    if (!this.wasm._wl_scene_activatable(scene._index)) {
      this.wasm._wl_scene_destroy(scene._index);
      throw new Error("File is not a scene. To load a prefab, use loadPrefab() instead");
    }
    scene._initialize();
    return scene;
  }
  /**
   * Similar to {@link WonderlandEngine.loadGLTF}, but loading is done from an ArrayBuffer.
   *
   * @param options An object containing the buffer and extra glTF metadata.
   * @returns A new loaded {@link PrefabGLTF}.
   */
  loadGLTFFromBuffer(options) {
    Scene.validateBufferOptions(options);
    const { buffer, extensions = false } = options;
    const wasm = this.wasm;
    const ptr = wasm.copyBufferToHeap(buffer);
    try {
      const index = wasm._wl_glTF_scene_create(extensions, ptr, buffer.byteLength);
      const scene = new PrefabGLTF(this, index);
      this._scenes[scene._index] = scene;
      return scene;
    } finally {
      wasm._free(ptr);
    }
  }
  /**
   * Checks whether the given component is registered or not.
   *
   * @param typeOrClass A string representing the component typename (e.g., `'cursor-component'`),
   *     or a component class (e.g., `CursorComponent`).
   * @returns `true` if the component is registered, `false` otherwise.
   */
  isRegistered(typeOrClass) {
    return this.#wasm.isRegistered(isString(typeOrClass) ? typeOrClass : typeOrClass.TypeName);
  }
  /**
   * Resize the canvas and the rendering context.
   *
   * @note The `width` and `height` parameters will be scaled by the
   * `devicePixelRatio` value. By default, the pixel ratio used is
   * [window.devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio).
   *
   * @param width The width, in CSS pixels.
   * @param height The height, in CSS pixels.
   * @param devicePixelRatio The pixel ratio factor.
   */
  resize(width, height, devicePixelRatio = window.devicePixelRatio) {
    width = width * devicePixelRatio;
    height = height * devicePixelRatio;
    this.canvas.width = width;
    this.canvas.height = height;
    this.wasm._wl_application_resize(width, height);
    this.onResize.notify();
  }
  /**
   * Run the next frame.
   *
   * @param fixedDelta The elapsed time between this frame and the previous one.
   *
   * @note The engine automatically schedules next frames. You should only
   * use this method for testing.
   */
  nextFrame(fixedDelta = 0) {
    this.#wasm._wl_nextFrame(fixedDelta);
  }
  /**
   * Request an XR session.
   *
   * @note Please use this call instead of directly calling `navigator.xr.requestSession()`.
   * Wonderland Engine requires to be aware that a session is started, and this
   * is done through this call.
   *
   * @param mode The XR mode.
   * @param features An array of required features, e.g., `['local-floor', 'hit-test']`.
   * @param optionalFeatures An array of optional features, e.g., `['bounded-floor', 'depth-sensing']`.
   * @returns A promise resolving with the `XRSession`, a string error message otherwise.
   */
  requestXRSession(mode, features, optionalFeatures = []) {
    return checkXRSupport().then(() => this.#wasm.webxr_requestSession(mode, features, optionalFeatures));
  }
  /**
   * Offer an XR session.
   *
   * Adds an interactive UI element to the browser interface to start an XR
   * session. Browser support is optional, so it's advised to still allow
   * requesting a session with a UI element on the website itself.
   *
   * @note Please use this call instead of directly calling `navigator.xr.offerSession()`.
   * Wonderland Engine requires to be aware that a session is started, and this
   * is done through this call.
   *
   * @param mode The XR mode.
   * @param features An array of required features, e.g., `['local-floor', 'hit-test']`.
   * @param optionalFeatures An array of optional features, e.g., `['bounded-floor', 'depth-sensing']`.
   * @returns A promise resolving with the `XRSession`, a string error message otherwise.
   *
   * @since 1.1.5
   */
  offerXRSession(mode, features, optionalFeatures = []) {
    return checkXRSupport().then(() => this.#wasm.webxr_offerSession(mode, features, optionalFeatures));
  }
  /**
   * Wrap an object ID using {@link Object}.
   *
   * @note This method performs caching and will return the same
   * instance on subsequent calls.
   *
   * @param objectId ID of the object to create.
   *
   * @deprecated Use {@link Scene#wrap} instead.
   *
   * @returns The object
   */
  wrapObject(objectId) {
    return this.scene.wrap(objectId);
  }
  toString() {
    return "engine";
  }
  /* Public Getters & Setter */
  /** Currently active scene. */
  get scene() {
    return this._scene;
  }
  /**
   * WebAssembly bridge.
   *
   * @note Use with care. This object is used to communicate
   * with the WebAssembly code throughout the api.
   *
   * @hidden
   */
  get wasm() {
    return this.#wasm;
  }
  /** Canvas element that Wonderland Engine renders to. */
  get canvas() {
    return this.#wasm.canvas;
  }
  /**
   * Current WebXR session or `null` if no session active.
   *
   * @deprecated Use {@link XR.session} on the {@link xr}
   * object instead.
   */
  get xrSession() {
    return this.xr?.session ?? null;
  }
  /**
   * Current WebXR frame or `null` if no session active.
   *
   * @deprecated Use {@link XR.frame} on the {@link xr}
   * object instead.
   */
  get xrFrame() {
    return this.xr?.frame ?? null;
  }
  /**
   * Current WebXR base layer or `null` if no session active.
   *
   * @deprecated Use {@link XR.baseLayer} on the {@link xr}
   * object instead.
   */
  get xrBaseLayer() {
    return this.xr?.baseLayer ?? null;
  }
  /**
   * Current WebXR framebuffer or `null` if no session active.
   *
   * @deprecated Use {@link XR.framebuffers} on the
   * {@link xr} object instead.
   */
  get xrFramebuffer() {
    return this.xr?.framebuffers[0] ?? null;
  }
  /** Framebuffer scale factor. */
  get xrFramebufferScaleFactor() {
    return this.#wasm.webxr_framebufferScaleFactor;
  }
  set xrFramebufferScaleFactor(value) {
    this.#wasm.webxr_framebufferScaleFactor = value;
  }
  /** Physics manager, only available when physx is enabled in the runtime. */
  get physics() {
    return this.#physics;
  }
  /** Texture resources */
  get textures() {
    return this._textures;
  }
  /** Material resources */
  get materials() {
    return this._materials;
  }
  /** Mesh resources */
  get meshes() {
    return this._meshes;
  }
  /** Morph target set resources */
  get morphTargets() {
    return this._morphTargets;
  }
  /** Font resources */
  get fonts() {
    return this._fonts;
  }
  /** Get all uncompressed images. */
  get images() {
    const wasm = this.wasm;
    const max = wasm._tempMemSize >> 1;
    const count = wasm._wl_get_images(wasm._tempMem, max);
    const result = new Array(count);
    for (let i = 0; i < count; ++i) {
      const index = wasm._tempMemUint16[i];
      result[i] = wasm._images[index];
    }
    return result;
  }
  /**
   * Promise that resolve once all uncompressed images are loaded.
   *
   * This is equivalent to calling {@link WonderlandEngine.images}, and wrapping each
   * `load` listener into a promise.
   */
  get imagesPromise() {
    const promises = this.images.map((i) => onImageReady(i));
    return Promise.all(promises);
  }
  /*
   * Enable or disable the mechanism to automatically resize the canvas.
   *
   * Internally, the engine uses a [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
   * Changing the canvas css will thus automatically be tracked by the engine.
   */
  set autoResizeCanvas(flag) {
    const state = !!this.#resizeObserver;
    if (state === flag)
      return;
    if (!flag) {
      this.#resizeObserver?.unobserve(this.canvas);
      this.#resizeObserver = null;
      return;
    }
    this.#resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === this.canvas) {
          this.resize(entry.contentRect.width, entry.contentRect.height);
        }
      }
    });
    this.#resizeObserver.observe(this.canvas);
  }
  /** `true` if the canvas is automatically resized by the engine. */
  get autoResizeCanvas() {
    return this.#resizeObserver !== null;
  }
  /** Retrieves the runtime version. */
  get runtimeVersion() {
    const wasm = this.#wasm;
    const v = wasm._wl_application_version(wasm._tempMem);
    return {
      major: wasm._tempMemUint16[0],
      minor: wasm._tempMemUint16[1],
      patch: wasm._tempMemUint16[2],
      rc: wasm._tempMemUint16[3]
    };
  }
  /** Engine {@link Logger}. Use it to turn on / off logging. */
  get log() {
    return this.#wasm._log;
  }
  /* Internal-Only Methods */
  /**
   * Initialize the engine.
   *
   * @note Should be called after the WebAssembly is fully loaded.
   *
   * @hidden
   */
  _init() {
    const onXRStart = () => {
      this.#initialReferenceSpaceType = this.xr.currentReferenceSpaceType;
      const newSpace = this.xr.referenceSpaceForType("local") ?? this.xr.referenceSpaceForType("viewer");
      this.xr.currentReferenceSpace = newSpace;
    };
    this.onXRSessionStart.add(onXRStart);
    this.onLoadingScreenEnd.once(() => {
      this.onXRSessionStart.remove(onXRStart);
      if (!this.xr || !this.#initialReferenceSpaceType)
        return;
      this.xr.currentReferenceSpace = this.xr.referenceSpaceForType(this.#initialReferenceSpaceType) ?? this.xr.referenceSpaceForType("viewer");
      this.#initialReferenceSpaceType = null;
    });
    this.#wasm._wl_set_error_callback(this.#wasm.addFunction((messagePtr) => {
      throw new Error(this.#wasm.UTF8ToString(messagePtr));
    }, "vi"));
    this.#physics = null;
    if (this.#wasm.withPhysX) {
      const physics = new Physics(this);
      this.#wasm._wl_physx_set_collision_callback(this.#wasm.addFunction((a, index, type, b) => {
        const physxA = this.scene._components.wrapPhysx(a);
        const physxB = this.scene._components.wrapPhysx(b);
        const callback = physics._callbacks[physxA._id][index];
        callback(type, physxB);
      }, "viiii"));
      this.#physics = physics;
    }
    this.resize(this.canvas.clientWidth, this.canvas.clientHeight);
    this._scene = this._reload(0);
  }
  /**
   * Reset the runtime state, including:
   *     - Component cache
   *     - Images
   *     - Callbacks
   *
   * @note This api is meant to be used internally.
   *
   * @hidden
   */
  _reset() {
    this.wasm.reset();
    this._scenes.length = 0;
    this._scene = this._reload(0);
    this.switchTo(this._scene);
  }
  /**
   * Add an empty scene.
   *
   * @returns The newly created scene
   *
   * @hidden
   */
  _createEmpty() {
    const wasm = this.wasm;
    const index = wasm._wl_scene_create_empty();
    const scene = new Scene(this, index);
    this._scenes[index] = scene;
    return scene;
  }
  /** @hidden */
  _destroyScene(instance) {
    const wasm = this.wasm;
    wasm._wl_scene_destroy(instance._index);
    const index = instance._index;
    instance._index = -1;
    if (this.erasePrototypeOnDestroy) {
      Object.setPrototypeOf(instance, DestroyedPrefabInstance);
    }
    this._scenes[index] = null;
  }
  /**
   * Reload the state of the engine with a new main scene.
   *
   * @param index Scene index.
   *
   * @hidden
   */
  _reload(index) {
    const scene = new Scene(this, index);
    this._scenes[index] = scene;
    this._textures = new TextureManager(this);
    this._materials = new MaterialManager(this);
    this._meshes = new MeshManager(this);
    this._morphTargets = new ResourceManager(this, MorphTargets);
    this._fonts = new ResourceManager(this, Font);
    return scene;
  }
  /**
   * Helper to load prefab and activatable scene.
   *
   * @param options Loading options.
   * @returns The the loaded prefab.
   *
   * @hidden
   */
  _loadSceneFromBuffer(PrefabClass, options) {
    const { buffer, url } = Scene.validateBufferOptions(options);
    const wasm = this.wasm;
    const ptr = wasm.copyBufferToHeap(buffer);
    let index = -1;
    try {
      index = wasm._wl_scene_create(ptr, buffer.byteLength, wasm.tempUTF8(url));
    } finally {
      wasm._free(ptr);
    }
    if (!index)
      throw new Error("Failed to parse scene");
    const scene = new PrefabClass(this, index);
    this._scenes[index] = scene;
    return scene;
  }
};

// node_modules/@wonderlandengine/api/dist/utils/bitset.js
function assert(bit) {
  if (bit >= 32) {
    throw new Error(`BitSet.enable(): Value ${bit} is over 31`);
  }
}
var BitSet = class {
  /** Enabled bits. @hidden */
  _bits = 0;
  /**
   * Enable the bit at the given index.
   *
   * @param bits A spread of all the bits to enable.
   * @returns Reference to self (for method chaining).
   */
  enable(...bits) {
    for (const bit of bits) {
      assert(bit);
      this._bits |= 1 << bit >>> 0;
    }
    return this;
  }
  /**
   * Enable all bits.
   *
   * @returns Reference to self (for method chaining).
   */
  enableAll() {
    this._bits = ~0;
    return this;
  }
  /**
   * Disable the bit at the given index.
   *
   * @param bits A spread of all the bits to disable.
   * @returns Reference to self (for method chaining).
   */
  disable(...bits) {
    for (const bit of bits) {
      assert(bit);
      this._bits &= ~(1 << bit >>> 0);
    }
    return this;
  }
  /**
   * Disable all bits.
   *
   * @returns Reference to self (for method chaining).
   */
  disableAll() {
    this._bits = 0;
    return this;
  }
  /**
   * Checker whether the bit is set or not.
   *
   * @param bit The bit to check.
   * @returns `true` if it's enabled, `false` otherwise.
   */
  enabled(bit) {
    return !!(this._bits & 1 << bit >>> 0);
  }
};

// node_modules/@wonderlandengine/api/dist/utils/logger.js
var LogLevel;
(function(LogLevel2) {
  LogLevel2[LogLevel2["Info"] = 0] = "Info";
  LogLevel2[LogLevel2["Warn"] = 1] = "Warn";
  LogLevel2[LogLevel2["Error"] = 2] = "Error";
})(LogLevel || (LogLevel = {}));
var Logger = class {
  /**
   * Bitset of enabled levels.
   *
   * @hidden
   */
  levels = new BitSet();
  /**
   * Bitset of enabled tags.
   *
   * @hidden
   */
  tags = new BitSet().enableAll();
  /**
   * Create a new logger instance.
   *
   * @param levels Default set of levels to enable.
   */
  constructor(...levels) {
    this.levels.enable(...levels);
  }
  /**
   * Log the message(s) using `console.log`.
   *
   * @param tag Tag represented by a positive integer.
   * @param msg A spread of message to log.
   * @returns Reference to self (for method chaining).
   */
  info(tag, ...msg) {
    if (this.levels.enabled(LogLevel.Info) && this.tags.enabled(tag)) {
      console.log(...msg);
    }
    return this;
  }
  /**
   * Log the message(s) using `console.warn`.
   *
   * @param tag Tag represented by a positive integer.
   * @param msg A spread of message to log.
   * @returns Reference to self (for method chaining).
   */
  warn(tag, ...msg) {
    if (this.levels.enabled(LogLevel.Warn) && this.tags.enabled(tag)) {
      console.warn(...msg);
    }
    return this;
  }
  /**
   * Log the message(s) using `console.error`.
   *
   * @param tag Tag represented by a positive integer.
   * @param msg A spread of message to log.
   * @returns Reference to self (for method chaining).
   */
  error(tag, ...msg) {
    if (this.levels.enabled(LogLevel.Error) && this.tags.enabled(tag)) {
      console.error(...msg);
    }
    return this;
  }
};

// node_modules/@wonderlandengine/api/dist/utils/cbor.js
var kCborTagBignum = 2;
var kCborTagNegativeBignum = 3;
var kCborTagUint8 = 64;
var kCborTagUint16 = 69;
var kCborTagUint32 = 70;
var kCborTagUint64 = 71;
var kCborTagInt8 = 72;
var kCborTagInt16 = 77;
var kCborTagInt32 = 78;
var kCborTagInt64 = 79;
var kCborTagFloat32 = 85;
var kCborTagFloat64 = 86;
function decode(data, tagger = (_, value) => value, options = {}) {
  const { dictionary = "object" } = options;
  const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
  let offset = 0;
  function commitRead(length, value) {
    offset += length;
    return value;
  }
  function readArrayBuffer(length) {
    return commitRead(length, data.subarray(offset, offset + length));
  }
  function readFloat16() {
    const POW_2_24 = 5960464477539063e-23;
    const tempArrayBuffer = new ArrayBuffer(4);
    const tempDataView = new DataView(tempArrayBuffer);
    const value = readUint16();
    const sign = value & 32768;
    let exponent = value & 31744;
    const fraction = value & 1023;
    if (exponent === 31744)
      exponent = 255 << 10;
    else if (exponent !== 0)
      exponent += 127 - 15 << 10;
    else if (fraction !== 0)
      return (sign ? -1 : 1) * fraction * POW_2_24;
    tempDataView.setUint32(0, sign << 16 | exponent << 13 | fraction << 13);
    return tempDataView.getFloat32(0);
  }
  function readFloat32() {
    return commitRead(4, dataView.getFloat32(offset));
  }
  function readFloat64() {
    return commitRead(8, dataView.getFloat64(offset));
  }
  function readUint8() {
    return commitRead(1, data[offset]);
  }
  function readUint16() {
    return commitRead(2, dataView.getUint16(offset));
  }
  function readUint32() {
    return commitRead(4, dataView.getUint32(offset));
  }
  function readUint64() {
    return commitRead(8, dataView.getBigUint64(offset));
  }
  function readBreak() {
    if (data[offset] !== 255)
      return false;
    offset += 1;
    return true;
  }
  function readLength(additionalInformation) {
    if (additionalInformation < 24)
      return additionalInformation;
    if (additionalInformation === 24)
      return readUint8();
    if (additionalInformation === 25)
      return readUint16();
    if (additionalInformation === 26)
      return readUint32();
    if (additionalInformation === 27) {
      const integer = readUint64();
      if (integer <= Number.MAX_SAFE_INTEGER)
        return Number(integer);
      return integer;
    }
    if (additionalInformation === 31)
      return -1;
    throw new Error("CBORError: Invalid length encoding");
  }
  function readIndefiniteStringLength(majorType) {
    const initialByte = readUint8();
    if (initialByte === 255)
      return -1;
    const length = readLength(initialByte & 31);
    if (length < 0 || initialByte >> 5 !== majorType) {
      throw new Error("CBORError: Invalid indefinite length element");
    }
    return Number(length);
  }
  function appendUtf16Data(utf16data, length) {
    for (let i = 0; i < length; ++i) {
      let value = readUint8();
      if (value & 128) {
        if (value < 224) {
          value = (value & 31) << 6 | readUint8() & 63;
          length -= 1;
        } else if (value < 240) {
          value = (value & 15) << 12 | (readUint8() & 63) << 6 | readUint8() & 63;
          length -= 2;
        } else {
          value = (value & 7) << 18 | (readUint8() & 63) << 12 | (readUint8() & 63) << 6 | readUint8() & 63;
          length -= 3;
        }
      }
      if (value < 65536) {
        utf16data.push(value);
      } else {
        value -= 65536;
        utf16data.push(55296 | value >> 10);
        utf16data.push(56320 | value & 1023);
      }
    }
  }
  function decodeItem() {
    const initialByte = readUint8();
    const majorType = initialByte >> 5;
    const additionalInformation = initialByte & 31;
    let i;
    let length;
    if (majorType === 7) {
      switch (additionalInformation) {
        case 25:
          return readFloat16();
        case 26:
          return readFloat32();
        case 27:
          return readFloat64();
      }
    }
    length = readLength(additionalInformation);
    if (length < 0 && (majorType < 2 || 6 < majorType)) {
      throw new Error("CBORError: Invalid length");
    }
    switch (majorType) {
      case 0:
        return length;
      case 1:
        if (typeof length === "number") {
          return -1 - length;
        }
        return -1n - length;
      case 2: {
        if (length < 0) {
          const elements = [];
          let fullArrayLength = 0;
          while ((length = readIndefiniteStringLength(majorType)) >= 0) {
            fullArrayLength += length;
            elements.push(readArrayBuffer(length));
          }
          const fullArray = new Uint8Array(fullArrayLength);
          let fullArrayOffset = 0;
          for (i = 0; i < elements.length; ++i) {
            fullArray.set(elements[i], fullArrayOffset);
            fullArrayOffset += elements[i].length;
          }
          return fullArray;
        }
        return readArrayBuffer(length).slice();
      }
      case 3: {
        const utf16data = [];
        if (length < 0) {
          while ((length = readIndefiniteStringLength(majorType)) >= 0) {
            appendUtf16Data(utf16data, length);
          }
        } else {
          appendUtf16Data(utf16data, length);
        }
        let string = "";
        const DECODE_CHUNK_SIZE = 8192;
        for (i = 0; i < utf16data.length; i += DECODE_CHUNK_SIZE) {
          string += String.fromCharCode.apply(null, utf16data.slice(i, i + DECODE_CHUNK_SIZE));
        }
        return string;
      }
      case 4: {
        let retArray;
        if (length < 0) {
          retArray = [];
          let index = 0;
          while (!readBreak()) {
            retArray.push(decodeItem());
          }
        } else {
          retArray = new Array(length);
          for (i = 0; i < length; ++i) {
            retArray[i] = decodeItem();
          }
        }
        return retArray;
      }
      case 5: {
        if (dictionary === "map") {
          const retMap = /* @__PURE__ */ new Map();
          for (i = 0; i < length || length < 0 && !readBreak(); ++i) {
            const key = decodeItem();
            if (retMap.has(key)) {
              throw new Error("CBORError: Duplicate key encountered");
            }
            retMap.set(key, decodeItem());
          }
          return retMap;
        }
        const retObject = {};
        for (i = 0; i < length || length < 0 && !readBreak(); ++i) {
          const key = decodeItem();
          if (Object.prototype.hasOwnProperty.call(retObject, key)) {
            throw new Error("CBORError: Duplicate key encountered");
          }
          retObject[key] = decodeItem();
        }
        return retObject;
      }
      case 6: {
        const value = decodeItem();
        const tag = length;
        if (value instanceof Uint8Array) {
          switch (tag) {
            case kCborTagBignum:
            case kCborTagNegativeBignum:
              let num = value.reduce((acc, n) => (acc << 8n) + BigInt(n), 0n);
              if (tag == kCborTagNegativeBignum) {
                num = -1n - num;
              }
              return num;
            case kCborTagUint8:
              return value;
            case kCborTagInt8:
              return new Int8Array(value.buffer);
            case kCborTagUint16:
              return new Uint16Array(value.buffer);
            case kCborTagInt16:
              return new Int16Array(value.buffer);
            case kCborTagUint32:
              return new Uint32Array(value.buffer);
            case kCborTagInt32:
              return new Int32Array(value.buffer);
            case kCborTagUint64:
              return new BigUint64Array(value.buffer);
            case kCborTagInt64:
              return new BigInt64Array(value.buffer);
            case kCborTagFloat32:
              return new Float32Array(value.buffer);
            case kCborTagFloat64:
              return new Float64Array(value.buffer);
          }
        }
        return tagger(tag, value);
      }
      case 7:
        switch (length) {
          case 20:
            return false;
          case 21:
            return true;
          case 22:
            return null;
          case 23:
            return void 0;
          default:
            return length;
        }
    }
  }
  const ret = decodeItem();
  if (offset !== data.byteLength) {
    throw new Error("CBORError: Remaining bytes");
  }
  return ret;
}
var CBOR = {
  decode
};

// node_modules/@wonderlandengine/api/dist/wasm.js
var _componentDefaults = /* @__PURE__ */ new Map([
  [Type.Bool, false],
  [Type.Int, 0],
  [Type.Float, 0],
  [Type.String, ""],
  [Type.Enum, void 0],
  [Type.Object, null],
  [Type.Mesh, null],
  [Type.Texture, null],
  [Type.Material, null],
  [Type.Animation, null],
  [Type.Skin, null],
  [Type.Color, Float32Array.from([0, 0, 0, 1])],
  [Type.Vector2, Float32Array.from([0, 0])],
  [Type.Vector3, Float32Array.from([0, 0, 0])],
  [Type.Vector4, Float32Array.from([0, 0, 0, 0])]
]);
function _setupDefaults(ctor) {
  for (const name in ctor.Properties) {
    const p = ctor.Properties[name];
    if (p.type === Type.Enum) {
      if (p.values?.length) {
        if (typeof p.default !== "number") {
          p.default = p.values.indexOf(p.default);
        }
        if (p.default < 0 || p.default >= p.values.length) {
          p.default = 0;
        }
      } else {
        p.default = void 0;
      }
    } else if ((p.type === Type.Color || p.type === Type.Vector2 || p.type === Type.Vector3 || p.type === Type.Vector4) && Array.isArray(p.default)) {
      p.default = Float32Array.from(p.default);
    } else if (p.default === void 0) {
      const cloner = p.cloner ?? defaultPropertyCloner;
      p.default = cloner.clone(p.type, _componentDefaults.get(p.type));
    }
    ctor.prototype[name] = p.default;
  }
}
function _setPropertyOrder(ctor) {
  ctor._propertyOrder = ctor.hasOwnProperty("Properties") ? Object.keys(ctor.Properties).sort() : [];
}
var WASM = class {
  /**
   * Emscripten worker field.
   *
   * @note This api is meant to be used internally.
   */
  worker = "";
  /**
   * Emscripten wasm field.
   *
   * @note This api is meant to be used internally.
   */
  wasm = null;
  /**
   * Emscripten canvas.
   *
   * @note This api is meant to be used internally.
   */
  canvas = null;
  /**
   * WebGPU device.
   *
   * @note This api is meant to be used internally.
   */
  preinitializedWebGPUDevice = null;
  /** Current WebXR  */
  /**
   * Emscripten WebXR session.
   *
   * @note This api is meant to be used internally.
   */
  webxr_session = null;
  /**
   * Emscripten WebXR request session callback.
   *
   * @note This api is meant to be used internally.
   */
  webxr_requestSession = null;
  /**
   * Emscripten WebXR offer session callback.
   *
   * @note This api is meant to be used internally.
   */
  webxr_offerSession = null;
  /**
   * Emscripten WebXR frame.
   *
   * @note This api is meant to be used internally.
   */
  webxr_frame = null;
  /**
   * Emscripten current WebXR reference space.
   *
   * @note This api is meant to be used internally.
   */
  webxr_refSpace = null;
  /**
   * Emscripten WebXR reference spaces.
   *
   * @note This api is meant to be used internally.
   */
  webxr_refSpaces = null;
  /**
   * Emscripten WebXR current reference space type.
   *
   * @note This api is meant to be used internally.
   */
  webxr_refSpaceType = null;
  /**
   * Emscripten WebXR GL projection layer.
   *
   * @note This api is meant to be used internally.
   */
  webxr_baseLayer = null;
  /**
   * Emscripten WebXR framebuffer scale factor.
   *
   * @note This api is meant to be used internally.
   */
  webxr_framebufferScaleFactor = 1;
  /**
   * Emscripten WebXR framebuffer(s).
   *
   * @note This api is meant to be used internally.
   */
  /* webxr_fbo will not get overwritten if we are rendering to the
   * default framebuffer, e.g., when using WebXR emulator. */
  webxr_fbo = 0;
  /**
   * Convert a WASM memory view to a JavaScript string.
   *
   * @param ptr Pointer start
   * @param ptrEnd Pointer end
   * @returns JavaScript string
   */
  UTF8ViewToString;
  /** Logger instance. */
  _log = new Logger();
  /** If `true`, logs will not spam the console on error. */
  _deactivate_component_on_error = false;
  /** Temporary memory pointer. */
  _tempMem = null;
  /** Temporary memory size. */
  _tempMemSize = 0;
  /** Temporary float memory view. */
  _tempMemFloat = null;
  /** Temporary int memory view. */
  _tempMemInt = null;
  /** Temporary uint8 memory view. */
  _tempMemUint8 = null;
  /** Temporary uint32 memory view. */
  _tempMemUint32 = null;
  /** Temporary uint16 memory view. */
  _tempMemUint16 = null;
  /** Loading screen .bin file data */
  _loadingScreen = null;
  /** List of callbacks triggered when the scene is loaded. */
  _sceneLoadedCallback = [];
  /** Image cache. */
  _images = [null];
  /** Component instances. */
  _components = null;
  /** Component Type info. */
  _componentTypes = [];
  /** Index per component type name. */
  _componentTypeIndices = {};
  /** Wonderland engine instance. */
  _engine = null;
  /**
   * `true` if this runtime is using physx.
   *
   * @note This api is meant to be used internally.
   */
  _withPhysX = false;
  /** Decoder for UTF8 `ArrayBuffer` to JavaScript string. */
  _utf8Decoder = new TextDecoder("utf8");
  /**
   * Registration index of {@link BrokenComponent}.
   *
   * This is used to return dummy instances when a component
   * isn't registered.
   *
   * @hidden
   */
  _brokenComponentIndex = 0;
  /**
   * Create a new instance of the WebAssembly <> API bridge.
   *
   * @param threads `true` if the runtime used has threads support
   */
  constructor(threads2) {
    if (threads2) {
      this.UTF8ViewToString = (s, e) => {
        if (!s)
          return "";
        return this._utf8Decoder.decode(this.HEAPU8.slice(s, e));
      };
    } else {
      this.UTF8ViewToString = (s, e) => {
        if (!s)
          return "";
        return this._utf8Decoder.decode(this.HEAPU8.subarray(s, e));
      };
    }
    this._brokenComponentIndex = this._registerComponent(BrokenComponent);
  }
  /**
   * Reset the cache of the library.
   *
   * @note Should only be called when tearing down the runtime.
   */
  reset() {
    this._wl_reset();
    this._components = null;
    this._images.length = 1;
    this.allocateTempMemory(1024);
    this._componentTypes = [];
    this._componentTypeIndices = {};
    this._brokenComponentIndex = this._registerComponent(BrokenComponent);
  }
  /**
   * Checks whether the given component is registered or not.
   *
   * @param ctor  A string representing the component typename (e.g., `'cursor-component'`).
   * @returns `true` if the component is registered, `false` otherwise.
   */
  isRegistered(type) {
    return type in this._componentTypeIndices;
  }
  /**
   * Register a legacy component in this Emscripten instance.
   *
   * @note This api is meant to be used internally.
   *
   * @param typeName The name of the component.
   * @param params An object containing the parameters (properties).
   * @param object The object's prototype.
   * @returns The registration index
   */
  _registerComponentLegacy(typeName, params, object) {
    const ctor = class CustomComponent extends Component {
    };
    ctor.TypeName = typeName;
    ctor.Properties = params;
    Object.assign(ctor.prototype, object);
    return this._registerComponent(ctor);
  }
  /**
   * Register a class component in this Emscripten instance.
   *
   * @note This api is meant to be used internally.
   *
   * @param ctor The class to register.
   * @returns The registration index.
   */
  _registerComponent(ctor) {
    if (!ctor.TypeName)
      throw new Error("no name provided for component.");
    if (!ctor.prototype._triggerInit) {
      throw new Error(`registerComponent(): Component ${ctor.TypeName} must extend Component`);
    }
    inheritProperties(ctor);
    _setupDefaults(ctor);
    _setPropertyOrder(ctor);
    const typeIndex = ctor.TypeName in this._componentTypeIndices ? this._componentTypeIndices[ctor.TypeName] : this._componentTypes.length;
    this._componentTypes[typeIndex] = ctor;
    this._componentTypeIndices[ctor.TypeName] = typeIndex;
    if (ctor === BrokenComponent)
      return typeIndex;
    this._log.info(LogTag.Engine, "Registered component", ctor.TypeName, `(class ${ctor.name})`, "with index", typeIndex);
    if (ctor.onRegister)
      ctor.onRegister(this._engine);
    return typeIndex;
  }
  /**
   * Allocate the requested amount of temporary memory
   * in this WASM instance.
   *
   * @param size The number of bytes to allocate
   */
  allocateTempMemory(size) {
    this._log.info(LogTag.Engine, "Allocating temp mem:", size);
    this._tempMemSize = size;
    if (this._tempMem)
      this._free(this._tempMem);
    this._tempMem = this._malloc(this._tempMemSize);
    this.updateTempMemory();
  }
  /**
   * @todo: Delete this and only keep `allocateTempMemory`
   *
   * @param size Number of bytes to allocate
   */
  requireTempMem(size) {
    if (this._tempMemSize >= size)
      return;
    this.allocateTempMemory(Math.ceil(size / 1024) * 1024);
  }
  /**
   * Update the temporary memory views. This must be called whenever the
   * temporary memory address changes.
   *
   * @note This api is meant to be used internally.
   */
  updateTempMemory() {
    this._tempMemFloat = new Float32Array(this.HEAP8.buffer, this._tempMem, this._tempMemSize >> 2);
    this._tempMemInt = new Int32Array(this.HEAP8.buffer, this._tempMem, this._tempMemSize >> 2);
    this._tempMemUint32 = new Uint32Array(this.HEAP8.buffer, this._tempMem, this._tempMemSize >> 2);
    this._tempMemUint16 = new Uint16Array(this.HEAP8.buffer, this._tempMem, this._tempMemSize >> 1);
    this._tempMemUint8 = new Uint8Array(this.HEAP8.buffer, this._tempMem, this._tempMemSize);
  }
  /**
   * Returns a uint8 buffer view on temporary WASM memory.
   *
   * **Note**: this method might allocate if the requested memory is bigger
   * than the current temporary memory allocated.
   *
   * @param count The number of **elements** required
   * @returns A {@link TypedArray} over the WASM memory
   */
  getTempBufferU8(count) {
    this.requireTempMem(count);
    return this._tempMemUint8;
  }
  /**
   * Returns a uint16 buffer view on temporary WASM memory.
   *
   * **Note**: this method might allocate if the requested memory is bigger
   * than the current temporary memory allocated.
   *
   * @param count The number of **elements** required
   * @returns A {@link TypedArray} over the WASM memory
   */
  getTempBufferU16(count) {
    this.requireTempMem(count * 2);
    return this._tempMemUint16;
  }
  /**
   * Returns a uint32 buffer view on temporary WASM memory.
   *
   * **Note**: this method might allocate if the requested memory is bigger
   * than the current temporary memory allocated.
   *
   * @param count The number of **elements** required.
   * @returns A {@link TypedArray} over the WASM memory.
   */
  getTempBufferU32(count) {
    this.requireTempMem(count * 4);
    return this._tempMemUint32;
  }
  /**
   * Returns a int32 buffer view on temporary WASM memory.
   *
   * **Note**: this method might allocate if the requested memory is bigger
   * than the current temporary memory allocated.
   *
   * @param count The number of **elements** required.
   * @returns A {@link TypedArray} over the WASM memory.
   */
  getTempBufferI32(count) {
    this.requireTempMem(count * 4);
    return this._tempMemInt;
  }
  /**
   * Returns a float32 buffer view on temporary WASM memory.
   *
   * **Note**: this method might allocate if the requested memory is bigger
   * than the current temporary memory allocated.
   *
   * @param count The number of **elements** required.
   * @returns A {@link TypedArray} over the WASM memory.
   */
  getTempBufferF32(count) {
    this.requireTempMem(count * 4);
    return this._tempMemFloat;
  }
  /**
   * Copy the string into temporary WASM memory and retrieve the pointer.
   *
   * @note This method will compute the strlen and append a `\0`.
   *
   * @note The result should be used **directly** otherwise it might get
   * overridden by any next call modifying the temporary memory.
   *
   * @param str The string to write to temporary memory
   * @param byteOffset The starting byte offset in the temporary memory at which
   *     the string should be written. This is useful when using multiple temporaries.
   * @return The temporary pointer onto the WASM memory
   */
  tempUTF8(str, byteOffset = 0) {
    const strLen = this.lengthBytesUTF8(str) + 1;
    this.requireTempMem(strLen + byteOffset);
    const ptr = this._tempMem + byteOffset;
    this.stringToUTF8(str, ptr, strLen);
    return ptr;
  }
  /**
   * Copy the buffer into the WASM heap.
   *
   * @note The returned pointer must be freed.
   *
   * @param buffer The buffer to copy into the heap.
   * @returns An allocated pointer, that must be free after use.
   */
  copyBufferToHeap(buffer) {
    const size = buffer.byteLength;
    const ptr = this._malloc(size);
    this.HEAPU8.set(new Uint8Array(buffer), ptr);
    return ptr;
  }
  /**
   * Returns `true` if the runtime supports physx or not.
   */
  get withPhysX() {
    return this._withPhysX;
  }
  /**
   * Set the engine instance holding this bridge.
   *
   * @note This api is meant to be used internally.
   *
   * @param engine The engine instance.
   */
  _setEngine(engine2) {
    this._engine = engine2;
  }
  /* WebAssembly to JS call bridge. */
  _wljs_xr_session_start(mode) {
    if (this._engine.xr === null) {
      this._engine.xr = new XR(this, mode);
      this._engine.onXRSessionStart.notify(this.webxr_session, mode);
    }
  }
  _wljs_xr_session_end() {
    const startEmitter = this._engine.onXRSessionStart;
    if (startEmitter instanceof RetainEmitter)
      startEmitter.reset();
    this._engine.onXRSessionEnd.notify();
    this._engine.xr = null;
  }
  _wljs_xr_disable() {
    this._engine.arSupported = false;
    this._engine.vrSupported = false;
  }
  _wljs_init(withPhysX) {
    this._withPhysX = withPhysX;
    this.allocateTempMemory(1024);
  }
  _wljs_scene_switch(index) {
    const scene = this._engine._scenes[index];
    this._components = scene?._jsComponents ?? null;
  }
  _wljs_destroy_image(index) {
    const img = this._images[index];
    if (!img)
      return;
    this._images[index] = null;
    if (img.src !== void 0) {
      img.src = "";
    }
    if (img.onload !== void 0) {
      img.onload = null;
    }
    if (img.onerror !== void 0) {
      img.onerror = null;
    }
  }
  _wljs_objects_markDestroyed(sceneIndex, idsPtr, count) {
    const scene = this._engine._scenes[sceneIndex];
    const start = idsPtr >>> 1;
    for (let i = 0; i < count; ++i) {
      const id = this.HEAPU16[start + i];
      scene._destroyObject(id);
    }
  }
  _wljs_scene_initialize(sceneIndex, idsPtr, idsEnd, paramDataPtr, paramDataEndPtr, offsetsPtr, offsetsEndPtr) {
    const cbor = this.HEAPU8.subarray(paramDataPtr, paramDataEndPtr);
    const offsets = this.HEAPU32.subarray(offsetsPtr >>> 2, offsetsEndPtr >>> 2);
    const ids = this.HEAPU16.subarray(idsPtr >>> 1, idsEnd >>> 1);
    const engine2 = this._engine;
    const scene = engine2._scenes[sceneIndex];
    const components = scene._jsComponents;
    let decoded;
    try {
      decoded = CBOR.decode(cbor);
    } catch (e) {
      this._log.error(LogTag.Engine, "Exception during component parameter decoding");
      this._log.error(LogTag.Component, e);
      return;
    }
    if (!Array.isArray(decoded)) {
      this._log.error(LogTag.Engine, "Parameter data must be an array");
      return;
    }
    if (decoded.length !== ids.length) {
      this._log.error(LogTag.Engine, `Parameter data has size ${decoded.length} but expected ${ids.length}`);
      return;
    }
    for (let i = 0; i < decoded.length; ++i) {
      const id = Component._pack(sceneIndex, ids[i]);
      const index = this._wl_get_js_component_index_for_id(id);
      const component = components[index];
      const ctor = component.constructor;
      if (ctor == BrokenComponent)
        continue;
      const paramNames = ctor._propertyOrder;
      const paramValues = decoded[i];
      if (!Array.isArray(paramValues)) {
        this._log.error(LogTag.Engine, "Component parameter data must be an array");
        continue;
      }
      if (paramValues.length !== paramNames.length) {
        this._log.error(LogTag.Engine, `Component parameter data has size ${paramValues.length} but expected ${paramNames.length}`);
        continue;
      }
      for (let j = 0; j < paramValues.length; ++j) {
        const name = paramNames[j];
        const property2 = ctor.Properties[name];
        const type = property2.type;
        let value = paramValues[j];
        if (value === void 0) {
          const cloner = property2.cloner ?? defaultPropertyCloner;
          value = cloner.clone(type, property2.default);
          component[name] = value;
          continue;
        }
        if (typeof value === "number") {
          value += offsets[type];
        }
        switch (type) {
          case Type.Bool:
          case Type.Int:
          case Type.Float:
          case Type.String:
          case Type.Enum:
          case Type.Vector2:
          case Type.Vector3:
          case Type.Vector4:
            break;
          case Type.Object:
            value = value ? scene.wrap(this._wl_object_id(scene._index, value)) : null;
            break;
          case Type.Mesh:
            value = engine2.meshes.wrap(value);
            break;
          case Type.Texture:
            value = engine2.textures.wrap(value);
            break;
          case Type.Material:
            value = engine2.materials.wrap(value);
            break;
          case Type.Animation:
            value = scene.animations.wrap(value);
            break;
          case Type.Skin:
            value = scene.skins.wrap(value);
            break;
          case Type.Color:
            const max = (1 << value.BYTES_PER_ELEMENT * 8) - 1;
            value = Float32Array.from(value, (f, _) => f / max);
            break;
        }
        component[name] = value;
      }
    }
  }
  _wljs_set_component_param_translation(scene, component, param, valuePtr, valueEndPtr) {
    const components = this._engine._scenes[scene]._jsComponents;
    const comp = components[component];
    const value = this.UTF8ViewToString(valuePtr, valueEndPtr);
    const ctor = comp.constructor;
    const paramName = ctor._propertyOrder[param];
    comp[paramName] = value;
  }
  _wljs_get_component_type_index(namePtr, nameEndPtr) {
    const typename = this.UTF8ViewToString(namePtr, nameEndPtr);
    const index = this._componentTypeIndices[typename];
    if (index === void 0) {
      return this._brokenComponentIndex;
    }
    return index;
  }
  _wljs_component_create(sceneIndex, index, id, type, object) {
    const scene = this._engine._scenes[sceneIndex];
    scene._components.createJs(index, id, type, object);
  }
  _wljs_component_init(scene, component) {
    const components = this._engine._scenes[scene]._jsComponents;
    const c = components[component];
    c._triggerInit();
  }
  _wljs_component_update(component, dt) {
    const c = this._components[component];
    c._triggerUpdate(dt);
  }
  _wljs_component_onActivate(component) {
    const c = this._components[component];
    c._triggerOnActivate();
  }
  _wljs_component_onDeactivate(component) {
    const c = this._components[component];
    c._triggerOnDeactivate();
  }
  _wljs_component_markDestroyed(sceneIndex, manager, componentId) {
    const scene = this._engine._scenes[sceneIndex];
    const component = scene._components.get(manager, componentId);
    component?._triggerOnDestroy();
  }
  _wljs_swap(scene, a, b) {
    const components = this._engine._scenes[scene]._jsComponents;
    const componentA = components[a];
    components[a] = components[b];
    components[b] = componentA;
  }
  _wljs_copy(srcSceneIndex, srcIndex, dstSceneIndex, dstIndex, offsetsPtr) {
    const srcScene = this._engine._scenes[srcSceneIndex];
    const dstScene = this._engine._scenes[dstSceneIndex];
    const destComp = dstScene._jsComponents[dstIndex];
    const srcComp = srcScene._jsComponents[srcIndex];
    try {
      destComp._copy(srcComp, offsetsPtr);
    } catch (e) {
      this._log.error(LogTag.Component, `Exception during ${destComp.type} copy() on object ${destComp.object.name}`);
      this._log.error(LogTag.Component, e);
    }
  }
  /**
   * Forward an animation event to a corresponding
   * {@link AnimationComponent}
   *
   * @note This api is meant to be used internally. Please have a look at
   * {@link AnimationComponent.onEvent} instead.
   *
   * @param componentId Component id in the manager
   * @param namePtr Pointer to UTF8 event name
   * @param nameEndPtr Pointer to end of UTF8 event name
   */
  _wljs_trigger_animationEvent(componentId, namePtr, nameEndPtr) {
    const scene = this._engine.scene;
    const comp = scene._components.wrapAnimation(componentId);
    const nameStr = this.UTF8ViewToString(namePtr, nameEndPtr);
    comp.onEvent.notify(nameStr);
  }
};

// node_modules/@wonderlandengine/api/dist/version.js
var APIVersion = {
  major: 1,
  minor: 2,
  patch: 0,
  rc: 0
};

// node_modules/@wonderlandengine/api/dist/index.js
var LOADING_SCREEN_PATH = "WonderlandRuntime-LoadingScreen.bin";
function loadScript(scriptURL) {
  return new Promise((res, rej) => {
    const s = document.createElement("script");
    const node = document.body.appendChild(s);
    s.onload = () => {
      document.body.removeChild(node);
      res();
    };
    s.onerror = (e) => {
      document.body.removeChild(node);
      rej(e);
    };
    s.src = scriptURL;
  });
}
async function detectFeatures() {
  let [simdSupported, threadsSupported] = await Promise.all([simd(), threads()]);
  if (simdSupported) {
    console.log("WASM SIMD is supported");
  } else {
    console.warn("WASM SIMD is not supported");
  }
  if (threadsSupported) {
    if (self.crossOriginIsolated) {
      console.log("WASM Threads is supported");
    } else {
      console.warn("WASM Threads is supported, but the page is not crossOriginIsolated, therefore thread support is disabled.");
    }
  } else {
    console.warn("WASM Threads is not supported");
  }
  threadsSupported = threadsSupported && self.crossOriginIsolated;
  return {
    simdSupported,
    threadsSupported
  };
}
var xrSupported = {
  ar: null,
  vr: null
};
function checkXRSupport2() {
  if (typeof navigator === "undefined" || !navigator.xr) {
    xrSupported.vr = false;
    xrSupported.ar = false;
    return Promise.resolve(xrSupported);
  }
  const vrPromise = xrSupported.vr !== null ? Promise.resolve() : navigator.xr.isSessionSupported("immersive-vr").then((supported) => xrSupported.vr = supported);
  const arPromise = xrSupported.ar !== null ? Promise.resolve() : navigator.xr.isSessionSupported("immersive-ar").then((supported) => xrSupported.ar = supported);
  return Promise.all([vrPromise, arPromise]).then(() => xrSupported);
}
function checkRuntimeCompatibility(version) {
  const { major, minor } = version;
  let majorDiff = major - APIVersion.major;
  let minorDiff = minor - APIVersion.minor;
  if (!majorDiff && !minorDiff)
    return;
  const error = "checkRuntimeCompatibility(): Version compatibility mismatch:\n	\u2192 API and runtime compatibility is enforced on a patch level (versions x.y.*)\n";
  const isRuntimeOlder = majorDiff < 0 || !majorDiff && minorDiff < 0;
  if (isRuntimeOlder) {
    throw new Error(`${error}	\u2192 Please use a Wonderland Engine editor version >= ${APIVersion.major}.${APIVersion.minor}.*`);
  }
  throw new Error(`${error}	\u2192 Please use a new API version >= ${version.major}.${version.minor}.*`);
}
async function loadRuntime(runtime, options = {}) {
  const xrPromise = checkXRSupport2();
  const baseURL = getBaseUrl(runtime);
  const { simdSupported, threadsSupported } = await detectFeatures();
  const { simd: simd2 = simdSupported, threads: threads2 = threadsSupported, webgpu = false, physx = false, loader = false, xrFramebufferScaleFactor = 1, xrOfferSession = null, loadingScreen = baseURL ? `${baseURL}/${LOADING_SCREEN_PATH}` : LOADING_SCREEN_PATH, canvas = "canvas", logs = [LogLevel.Info, LogLevel.Warn, LogLevel.Error] } = options;
  const variant = [];
  if (webgpu)
    variant.push("webgpu");
  if (loader)
    variant.push("loader");
  if (physx)
    variant.push("physx");
  if (simd2)
    variant.push("simd");
  if (threads2)
    variant.push("threads");
  const variantStr = variant.join("-");
  let filename = runtime;
  if (variantStr)
    filename = `${filename}-${variantStr}`;
  const download = function(filename2, errorMessage) {
    return fetch(filename2).then((r) => {
      if (!r.ok)
        return Promise.reject(errorMessage);
      return r.arrayBuffer();
    }).catch((_) => Promise.reject(errorMessage));
  };
  const [wasmData, loadingScreenData] = await Promise.all([
    download(`${filename}.wasm`, "Failed to fetch runtime .wasm file"),
    download(loadingScreen, "Failed to fetch loading screen file")
  ]);
  const canvasElement = document.getElementById(canvas);
  if (!canvasElement) {
    throw new Error(`loadRuntime(): Failed to find canvas with id '${canvas}'`);
  }
  if (!(canvasElement instanceof HTMLCanvasElement)) {
    throw new Error(`loadRuntime(): HTML element '${canvas}' must be a canvas`);
  }
  const wasm = new WASM(threads2);
  wasm.worker = `${filename}.worker.js`;
  wasm.wasm = wasmData;
  wasm.canvas = canvasElement;
  wasm._log.levels.enable(...logs);
  if (webgpu) {
    const adapter = await navigator.gpu.requestAdapter();
    const desc = {
      requiredFeatures: ["texture-compression-bc"]
    };
    const device = await adapter.requestDevice(desc);
    wasm.preinitializedWebGPUDevice = device;
  }
  const engine2 = new WonderlandEngine(wasm, loadingScreenData);
  if (!window._WL) {
    window._WL = { runtimes: {} };
  }
  const runtimes = window._WL.runtimes;
  const runtimeGlobalId = variantStr ? variantStr : "default";
  if (!runtimes[runtimeGlobalId]) {
    await loadScript(`${filename}.js`);
    runtimes[runtimeGlobalId] = window.instantiateWonderlandRuntime;
    window.instantiateWonderlandRuntime = void 0;
  }
  await runtimes[runtimeGlobalId](wasm);
  engine2._init();
  checkRuntimeCompatibility(engine2.runtimeVersion);
  const xr = await xrPromise;
  engine2.arSupported = xr.ar;
  engine2.vrSupported = xr.vr;
  engine2.xrFramebufferScaleFactor = xrFramebufferScaleFactor;
  engine2.autoResizeCanvas = true;
  engine2.start();
  if (xrOfferSession !== null) {
    let mode = xrOfferSession.mode;
    if (mode == "auto") {
      if (engine2.vrSupported) {
        mode = "immersive-vr";
      } else if (engine2.arSupported) {
        mode = "immersive-ar";
      } else {
        mode = "inline";
      }
    }
    const offerSession = function() {
      engine2.offerXRSession(mode, xrOfferSession.features, xrOfferSession.optionalFeatures).then(
        /* When the session ends, offer to start a new one again */
        (s) => s.addEventListener("end", offerSession)
      ).catch(console.warn);
    };
    offerSession();
  }
  return engine2;
}

// js/gun.js
var _Gun = class extends Component {
  init() {
    this.drawing = false;
    this.drawn = false;
    this.reloading = false;
    this.chambered = false;
    this.animators = /* @__PURE__ */ new Map();
    this.onHide = new Emitter();
  }
  start() {
    this.animationComponents = this.animationsObject.getComponents(AnimationComponent);
    this.mag = this.magSize;
    this.animators.set(_Gun.AnimationNames.Idle, this.findAnimator(this.idleAnimation));
    this.animators.set(_Gun.AnimationNames.Draw, this.findAnimator(this.drawAnimation));
    this.animators.set(_Gun.AnimationNames.Hide, this.findAnimator(this.hideAnimation));
    this.animators.set(_Gun.AnimationNames.Shoot, this.findAnimator(this.shootAnimation));
    this.animators.set(_Gun.AnimationNames.Reload, this.findAnimator(this.reloadAnimation));
    this.animators.set(_Gun.AnimationNames.FullReload, this.findAnimator(this.fullReloadAnimation));
    const drawAnimator = this.animators.get(_Gun.AnimationNames.Draw);
    if (drawAnimator) {
      drawAnimator.onEvent.add(this.onDrawEvent.bind(this));
      drawAnimator.onEvent.add(this.onEndEvent.bind(this));
    }
    const shootAnimator = this.animators.get(_Gun.AnimationNames.Shoot);
    if (shootAnimator) {
      shootAnimator.onEvent.add(this.onShootEvent.bind(this));
      shootAnimator.onEvent.add(this.onEndEvent.bind(this));
    }
    const reloadAnimator = this.animators.get(_Gun.AnimationNames.Reload);
    if (reloadAnimator) {
      reloadAnimator.onEvent.add(this.onReloadEvent.bind(this));
      reloadAnimator.onEvent.add(this.onEndEvent.bind(this));
    }
    const fullReloadAnimator = this.animators.get(_Gun.AnimationNames.FullReload);
    if (fullReloadAnimator) {
      fullReloadAnimator.onEvent.add(this.onReloadEvent.bind(this));
      fullReloadAnimator.onEvent.add(this.onEndEvent.bind(this));
    }
    const hideAnimator = this.animators.get(_Gun.AnimationNames.Hide);
    if (hideAnimator) {
      hideAnimator.onEvent.add(this.onHideEvent.bind(this));
      hideAnimator.onEvent.add(this.onEndEvent.bind(this));
    } else {
      drawAnimator.onEvent.add(this.onHideEvent.bind(this));
    }
    this.hideObject();
  }
  /** Play the shoot animation and reduce the ammo count by 1 */
  shoot() {
    console.log("shoot!");
    this.playAnimation(_Gun.AnimationNames.Shoot);
    --this.mag;
  }
  /** Check whether the gun can shoot */
  canShoot() {
    return !this.reloading && this.drawn && this.mag > 0;
  }
  /** Unhide and play the draw animation on the gun */
  draw() {
    if (this.drawn)
      return;
    this.drawing = true;
    this.showObject();
    this.playAnimation(_Gun.AnimationNames.Draw);
  }
  /** Is the mag full? */
  isFull() {
    return this.mag >= this.magSize;
  }
  /**
   * Reload the gun
   *
   * Takes into account that a bullet could already be chambered into the gun
   * so plays a different animation for an empty and non-empty mag.
   */
  reload() {
    if (this.mag == 0) {
      this.playAnimation(_Gun.AnimationNames.FullReload);
      this.chambered = false;
    } else {
      this.playAnimation(_Gun.AnimationNames.Reload);
      this.chambered = true;
    }
    this.reloading = true;
  }
  /**
   * Play the holster animation on the gun,
   * which is the draw/unholster animation in reverse
   * */
  hide() {
    this.cancelReload();
    this.drawn = false;
    if (!this.hideAnimation) {
      this.playAnimationReverse(_Gun.AnimationNames.Draw);
    } else {
      this.playAnimationReverse(_Gun.AnimationNames.Hide);
    }
  }
  /** Play the idle animation on the gun */
  idle() {
    this.playAnimationReverse(_Gun.AnimationNames.Idle);
  }
  /**
   * Cancel the reload, this stops the reload animation
   *
   * If the reload event already triggered on the animation,
   * this allows the player to skip part of the reload animation.
   * This is done in some games to add an extra layer of skill
   * to reloading by having to time the cancel as closely
   * to the reload timing as possible.
   */
  cancelReload() {
    if (!this.reloading)
      return;
    this.stopAnimation(_Gun.AnimationNames.Reload);
    this.stopAnimation(_Gun.AnimationNames.FullReload);
    this.reloading = false;
    this.playAnimation(_Gun.AnimationNames.Idle);
  }
  /**
   * Play an animation on the gun
   *
   * @param anim Name of the animation to play, see AnimationNames
   */
  playAnimation(anim) {
    this.stopAnimation(_Gun.AnimationNames.Idle);
    const animator = this.animators.get(anim);
    if (!animator)
      return;
    animator.stop();
    animator.speed = 1;
    animator.play();
  }
  /**
   * Play an animation on the gun in reverse
   *
   * @param anim Name of the animation to play, see AnimationNames
   */
  playAnimationReverse(anim) {
    this.stopAnimation(_Gun.AnimationNames.Idle);
    const animator = this.animators.get(anim);
    if (!animator)
      return;
    animator.stop();
    animator.speed = -1;
    animator.play();
  }
  /**
   * Stop an animation on the gun
   *
   * @param anim Name of the animation to stop, see AnimationNames
   */
  stopAnimation(anim) {
    this.animators.get(anim)?.stop();
  }
  /**
   * Find an animation component for the given animation
   *
   * @param anim Name of the animation to find a component for, see AnimationNames
   */
  findAnimator(anim) {
    for (var i = 0; i < this.animationComponents.length; ++i) {
      if (this.animationComponents[i].animation.equals(anim)) {
        return this.animationComponents[i];
      }
    }
    return null;
  }
  /** Callback for the draw animation event */
  onDrawEvent(name) {
    if (name != "draw" || !this.drawing)
      return;
    this.drawn = true;
    this.drawing = false;
    this.playAnimation(_Gun.AnimationNames.Idle);
  }
  /** Callback for the shoot animation event */
  onShootEvent(name) {
    if (name != "shoot")
      return;
    console.log("Shoot Event!");
  }
  /** Callback for the reload animation event */
  onReloadEvent(name) {
    if (name != "reload")
      return;
    this.mag = this.magSize;
    if (this.chambered)
      ++this.mag;
  }
  /** Callback for event placed at the end of every animation */
  onEndEvent(name) {
    if (name != "end")
      return;
    if (this.reloading) {
      this.cancelReload();
      return;
    }
    if (!this.drawn)
      return;
    this.playAnimation(_Gun.AnimationNames.Idle);
  }
  /** Callback for the hide animation event */
  onHideEvent(name) {
    if (name != "hide" || this.drawing)
      return;
    this.onHide.notify();
    this.hideObject();
  }
  /** Hide the gun object */
  hideObject() {
    this.object.setPositionLocal([0, 100, 0]);
  }
  /** Show the gun object */
  showObject() {
    this.object.setPositionLocal([0, 0, 0]);
  }
};
var Gun = _Gun;
__publicField(Gun, "AnimationNames", {
  Idle: "idle",
  Draw: "draw",
  Hide: "hide",
  Shoot: "shoot",
  Reload: "reload",
  FullReload: "fullreload"
});
__publicField(Gun, "TypeName", "gun");
/* Properties that are configurable in the editor */
__publicField(Gun, "Properties", {
  semiAuto: Property.bool(false),
  fireRate: Property.float(650),
  magSize: Property.int(30),
  animationsObject: Property.object(),
  idleAnimation: Property.animation(),
  drawAnimation: Property.animation(),
  shootAnimation: Property.animation(),
  reloadAnimation: Property.animation(),
  fullReloadAnimation: Property.animation(),
  hideAnimation: Property.animation()
});

// js/gun-controller.js
var GunController = class extends Component {
  fireTimer = 0;
  shootDown = false;
  guns = new Array();
  start() {
    this.guns.push(this.firstGunObject.getComponent(Gun));
    this.gun = null;
    this.nextGun = null;
  }
  update(dt) {
    if (this.fireTimer > 0) {
      this.fireTimer -= dt;
    }
  }
  /** Forward the start of a shoot input */
  onShootInput() {
    if (!this.gun)
      return;
    if (this.shootDown && this.gun.semiAuto)
      return;
    this.shootDown = true;
    const canShoot = this.fireTimer <= 0 && this.gun.canShoot();
    if (!canShoot)
      return;
    this.fireTimer = 60 / this.gun.fireRate;
    this.gun.shoot();
  }
  /** Forward the end of a shoot input */
  onShootInputEnd() {
    if (this.shootDown && this.gun && !this.gun.semiAuto)
      this.gun.idle();
    this.shootDown = false;
  }
  /** Forward a reload input */
  onReloadInput() {
    if (!this.gun)
      return;
    if (this.gun.reloading) {
      this.gun.cancelReload();
      return;
    }
    if (this.gun.isFull())
      return;
    this.gun.reload();
  }
  /**
   * Forward draw weapon input
   *
   * @param index Index of the weapon to draw, or -1 to holster
   *
   * First triggers the holster animation on the currently equiped weapon.
   * If the index is not -1 it listens to the hide event of the gun.
   */
  onDrawInput(index) {
    if (index != -1 && this.guns[index].drawn)
      return;
    this.nextGun = index == -1 ? null : this.guns[index];
    if (this.gun) {
      this.gun.hide();
      this.gun.onHide.add(this.onHideGun.bind(this));
      return;
    }
    this.gun = this.nextGun;
    this.gun.draw();
  }
  /** Callback for when the currently equiped gun has holstered */
  onHideGun() {
    this.gun = this.nextGun;
    if (this.gun)
      this.gun.draw();
  }
};
__publicField(GunController, "TypeName", "gun-controller");
/* Properties that are configurable in the editor */
__publicField(GunController, "Properties", {
  firstGunObject: Property.object()
});

// js/controls.js
var Controls = class extends Component {
  init() {
    this.reloadDown = false;
    this.drawWeaponDown = false;
    this.holsterDown = false;
    this.mouseDown = false;
    window.addEventListener("keydown", this.press.bind(this));
    window.addEventListener("keyup", this.release.bind(this));
    const canvas = this.engine.canvas;
    canvas.addEventListener("mousedown", this.onMouseDown);
    canvas.addEventListener("mouseup", this.onMouseUp);
  }
  onActivate() {
    const canvas = this.engine.canvas;
    canvas.addEventListener("mousedown", this.onMouseDown);
    canvas.addEventListener("mouseup", this.onMouseUp);
  }
  onDeactivate() {
    const canvas = this.engine.canvas;
    canvas.removeEventListener("mousedown", this.onMouseDown);
    canvas.removeEventListener("mouseup", this.onMouseUp);
  }
  start() {
    this.gunController = this.object.getComponent(GunController);
  }
  /** Callback for when a button is pressed */
  press(e) {
    if (e.keyCode === 82) {
      if (this.reloadDown)
        return;
      this.reloadDown = true;
      this.gunController.onReloadInput();
    } else if (e.keyCode === 49) {
      if (this.drawWeaponDown)
        return;
      this.drawWeaponDown = true;
      this.gunController.onDrawInput(0);
    } else if (e.keyCode === 70) {
      if (this.holsterDown)
        return;
      this.holsterDown = true;
      this.gunController.onDrawInput(-1);
    }
  }
  /** Callback for when a button is released */
  release(e) {
    if (e.keyCode === 82) {
      this.reloadDown = false;
    } else if (e.keyCode === 49) {
      this.drawWeaponDown = false;
    } else if (e.keyCode === 70) {
      this.holsterDown = false;
    }
  }
  update(dt) {
    if (this.mouseDown) {
      this.gunController.onShootInput(dt);
    } else {
      this.gunController.onShootInputEnd(dt);
    }
  }
  /** Callback for when a mouse button is down */
  onMouseDown = (e) => {
    if (e.button === 0) {
      this.mouseDown = true;
      if (e.button === 1) {
        e.preventDefault();
        return false;
      }
    }
  };
  /** Callback for when a mouse button is released */
  onMouseUp = (e) => {
    if (e.button === 0) {
      this.mouseDown = false;
    }
  };
};
__publicField(Controls, "TypeName", "controls");

// js/index.js
var Constants = {
  ProjectName: "AnimationEvents",
  RuntimeBaseName: "WonderlandRuntime",
  WebXRRequiredFeatures: ["local"],
  WebXROptionalFeatures: ["local", "hand-tracking", "hit-test"]
};
var RuntimeOptions = {
  physx: false,
  loader: false,
  xrFramebufferScaleFactor: 1,
  xrOfferSession: {
    mode: "auto",
    features: Constants.WebXRRequiredFeatures,
    optionalFeatures: Constants.WebXROptionalFeatures
  },
  canvas: "canvas"
};
var engine = await loadRuntime(Constants.RuntimeBaseName, RuntimeOptions);
Object.assign(engine, dist_exports);
window.WL = engine;
engine.onSceneLoaded.once(() => {
  const el = document.getElementById("version");
  if (el)
    setTimeout(() => el.remove(), 2e3);
});
function requestSession(mode) {
  engine.requestXRSession(mode, Constants.WebXRRequiredFeatures, Constants.WebXROptionalFeatures).catch((e) => console.error(e));
}
function setupButtonsXR() {
  const arButton = document.getElementById("ar-button");
  if (arButton) {
    arButton.dataset.supported = engine.arSupported;
    arButton.addEventListener("click", () => requestSession("immersive-ar"));
  }
  const vrButton = document.getElementById("vr-button");
  if (vrButton) {
    vrButton.dataset.supported = engine.vrSupported;
    vrButton.addEventListener("click", () => requestSession("immersive-vr"));
  }
}
if (document.readyState === "loading") {
  window.addEventListener("load", setupButtonsXR);
} else {
  setupButtonsXR();
}
engine.registerComponent(Controls);
engine.registerComponent(GunController);
engine.registerComponent(Gun);
engine.scene.load(`${Constants.ProjectName}.bin`).catch((e) => {
  console.error(e);
  window.alert(`Failed to load ${Constants.ProjectName}.bin:`, e);
});
//# sourceMappingURL=AnimationEvents-bundle.js.map
