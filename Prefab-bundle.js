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

// node_modules/@wonderlandengine/api/dist/resources/resource.js
var Resource = class {
  /** Relative index in the host. @hidden */
  _index = -1;
  /** For compatibility with SceneResource. @hidden */
  _id = -1;
  /** @hidden */
  _engine;
  constructor(engine, index) {
    this._engine = engine;
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

// node_modules/@wonderlandengine/api/dist/utils/misc.js
function createDestroyedProxy(type) {
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
var DestroyedObjectInstance = createDestroyedProxy("object");
var DestroyedComponentInstance = createDestroyedProxy("component");
var DestroyedPrefabInstance = createDestroyedProxy("prefab/scene");
function isMeshShape(shape) {
  return shape === Shape.ConvexMesh || shape === Shape.TriangleMesh;
}
function isBaseComponentClass(value) {
  return !!value && value.hasOwnProperty("_isBaseComponent") && value._isBaseComponent;
}
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
    const length2 = this.collider === Collider.Sphere ? radius : 2 * radius / SQRT_3;
    this.extents.set([length2, length2, length2]);
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
  set outerAngle(angle2) {
    this.engine.wasm._wl_light_component_set_outerAngle(this._id, angle2);
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
  set innerAngle(angle2) {
    this.engine.wasm._wl_light_component_set_innerAngle(this._id, angle2);
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
  constructor(engine, params) {
    if (typeof params !== "number") {
      if (!params?.pipeline)
        throw new Error("Missing parameter 'pipeline'");
      const template = engine.materials.getTemplate(params.pipeline);
      const material = new template();
      super(engine, material._index);
      return material;
    }
    super(engine, params);
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
  static wrap(engine, index) {
    return engine.materials.wrap(index);
  }
};
/** Proxy used to override prototypes of destroyed materials. */
__publicField(Material, "_destroyedPrototype", createDestroyedProxy("material"));

// node_modules/@wonderlandengine/api/dist/utils/logger.js
var LogLevel;
(function(LogLevel2) {
  LogLevel2[LogLevel2["Info"] = 0] = "Info";
  LogLevel2[LogLevel2["Warn"] = 1] = "Warn";
  LogLevel2[LogLevel2["Error"] = 2] = "Error";
})(LogLevel || (LogLevel = {}));

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

// node_modules/gl-matrix/esm/common.js
var EPSILON = 1e-6;
var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
var RANDOM = Math.random;
var degree = Math.PI / 180;
if (!Math.hypot)
  Math.hypot = function() {
    var y = 0, i = arguments.length;
    while (i--) {
      y += arguments[i] * arguments[i];
    }
    return Math.sqrt(y);
  };

// node_modules/gl-matrix/esm/vec3.js
var vec3_exports = {};
__export(vec3_exports, {
  add: () => add,
  angle: () => angle,
  bezier: () => bezier,
  ceil: () => ceil,
  clone: () => clone,
  copy: () => copy,
  create: () => create,
  cross: () => cross,
  dist: () => dist,
  distance: () => distance,
  div: () => div,
  divide: () => divide,
  dot: () => dot,
  equals: () => equals,
  exactEquals: () => exactEquals,
  floor: () => floor,
  forEach: () => forEach,
  fromValues: () => fromValues,
  hermite: () => hermite,
  inverse: () => inverse,
  len: () => len,
  length: () => length,
  lerp: () => lerp,
  max: () => max,
  min: () => min,
  mul: () => mul,
  multiply: () => multiply,
  negate: () => negate,
  normalize: () => normalize,
  random: () => random,
  rotateX: () => rotateX,
  rotateY: () => rotateY,
  rotateZ: () => rotateZ,
  round: () => round,
  scale: () => scale,
  scaleAndAdd: () => scaleAndAdd,
  set: () => set,
  sqrDist: () => sqrDist,
  sqrLen: () => sqrLen,
  squaredDistance: () => squaredDistance,
  squaredLength: () => squaredLength,
  str: () => str,
  sub: () => sub,
  subtract: () => subtract,
  transformMat3: () => transformMat3,
  transformMat4: () => transformMat4,
  transformQuat: () => transformQuat,
  zero: () => zero
});
function create() {
  var out = new ARRAY_TYPE(3);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  return out;
}
function clone(a) {
  var out = new ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
function fromValues(x, y, z) {
  var out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}
function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
function scaleAndAdd(out, a, b, scale2) {
  out[0] = a[0] + b[0] * scale2;
  out[1] = a[1] + b[1] * scale2;
  out[2] = a[2] + b[2] * scale2;
  return out;
}
function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.hypot(x, y, z);
}
function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
function inverse(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  out[2] = 1 / a[2];
  return out;
}
function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len2 = x * x + y * y + z * z;
  if (len2 > 0) {
    len2 = 1 / Math.sqrt(len2);
  }
  out[0] = a[0] * len2;
  out[1] = a[1] * len2;
  out[2] = a[2] * len2;
  return out;
}
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function cross(out, a, b) {
  var ax = a[0], ay = a[1], az = a[2];
  var bx = b[0], by = b[1], bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
function random(out, scale2) {
  scale2 = scale2 || 1;
  var r = RANDOM() * 2 * Math.PI;
  var z = RANDOM() * 2 - 1;
  var zScale = Math.sqrt(1 - z * z) * scale2;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale2;
  return out;
}
function transformMat4(out, a, m) {
  var x = a[0], y = a[1], z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
function transformMat3(out, a, m) {
  var x = a[0], y = a[1], z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
function transformQuat(out, a, q) {
  var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
  var x = a[0], y = a[1], z = a[2];
  var uvx = qy * z - qz * y, uvy = qz * x - qx * z, uvz = qx * y - qy * x;
  var uuvx = qy * uvz - qz * uvy, uuvy = qz * uvx - qx * uvz, uuvz = qx * uvy - qy * uvx;
  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2;
  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2;
  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
function rotateX(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function rotateY(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function rotateZ(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
  r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
  r[2] = p[2];
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function angle(a, b) {
  var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2], mag1 = Math.sqrt(ax * ax + ay * ay + az * az), mag2 = Math.sqrt(bx * bx + by * by + bz * bz), mag = mag1 * mag2, cosine = mag && dot(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
function zero(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  return out;
}
function str(a) {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
function equals(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2];
  var b0 = b[0], b1 = b[1], b2 = b[2];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
}
var sub = subtract;
var mul = multiply;
var div = divide;
var dist = distance;
var sqrDist = squaredDistance;
var len = length;
var sqrLen = squaredLength;
var forEach = function() {
  var vec = create();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 3;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }
    return a;
  };
}();

// js/components/random-mesh.js
var RandomMesh = class extends Component {
  start() {
    const mesh = this.object.getComponent(MeshComponent);
    if (!mesh) {
      throw new Error("mesh component is required");
    }
    const meshes = [this.mesh0, this.mesh1, this.mesh2];
    const materials = [this.material0, this.material1, this.material2];
    for (let i = 0; i < meshes.length; ++i) {
      if (!meshes[i]) {
        throw new Error(`Mesh ${i} is required`);
      }
      if (!materials[i]) {
        throw new Error(`Material ${i} is required`);
      }
    }
    const meshIndex = Math.floor(Math.random() * meshes.length);
    const matIndex = Math.floor(Math.random() * materials.length);
    mesh.mesh = meshes[meshIndex];
    mesh.material = materials[matIndex];
    const scale2 = this.object.getScalingWorld();
    const randScale = 0.5 + 0.5 * Math.random();
    vec3_exports.scale(scale2, scale2, randScale);
    this.object.setScalingWorld(scale2);
    this.object.setPositionLocal([0, 0.5 * scale2[1], 0]);
  }
};
__publicField(RandomMesh, "TypeName", "random-mesh");
/* Properties that are configurable in the editor */
__publicField(RandomMesh, "Properties", {
  mesh0: Property.mesh(),
  mesh1: Property.mesh(),
  mesh2: Property.mesh(),
  material0: Property.material(),
  material1: Property.material(),
  material2: Property.material()
});

// js/components/rotate-y.js
var RotateY = class extends Component {
  update(dt) {
    this.object.rotateAxisAngleRadLocal([0, 1, 0], this.speed * dt);
  }
};
__publicField(RotateY, "TypeName", "rotate-y");
__publicField(RotateY, "Properties", { speed: Property.float(1) });

// js/prefab-index.js
function prefab_index_default(engine) {
  engine.registerComponent(RandomMesh);
  engine.registerComponent(RotateY);
}
export {
  prefab_index_default as default
};
//# sourceMappingURL=Prefab-bundle.js.map
