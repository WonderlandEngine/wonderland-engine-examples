var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// node_modules/howler/dist/howler.js
var require_howler = __commonJS({
  "node_modules/howler/dist/howler.js"(exports) {
    (function() {
      "use strict";
      var HowlerGlobal2 = function() {
        this.init();
      };
      HowlerGlobal2.prototype = {
        /**
         * Initialize the global Howler object.
         * @return {Howler}
         */
        init: function() {
          var self2 = this || Howler2;
          self2._counter = 1e3;
          self2._html5AudioPool = [];
          self2.html5PoolSize = 10;
          self2._codecs = {};
          self2._howls = [];
          self2._muted = false;
          self2._volume = 1;
          self2._canPlayEvent = "canplaythrough";
          self2._navigator = typeof window !== "undefined" && window.navigator ? window.navigator : null;
          self2.masterGain = null;
          self2.noAudio = false;
          self2.usingWebAudio = true;
          self2.autoSuspend = true;
          self2.ctx = null;
          self2.autoUnlock = true;
          self2._setup();
          return self2;
        },
        /**
         * Get/set the global volume for all sounds.
         * @param  {Float} vol Volume from 0.0 to 1.0.
         * @return {Howler/Float}     Returns self or current volume.
         */
        volume: function(vol) {
          var self2 = this || Howler2;
          vol = parseFloat(vol);
          if (!self2.ctx) {
            setupAudioContext();
          }
          if (typeof vol !== "undefined" && vol >= 0 && vol <= 1) {
            self2._volume = vol;
            if (self2._muted) {
              return self2;
            }
            if (self2.usingWebAudio) {
              self2.masterGain.gain.setValueAtTime(vol, Howler2.ctx.currentTime);
            }
            for (var i = 0; i < self2._howls.length; i++) {
              if (!self2._howls[i]._webAudio) {
                var ids = self2._howls[i]._getSoundIds();
                for (var j = 0; j < ids.length; j++) {
                  var sound = self2._howls[i]._soundById(ids[j]);
                  if (sound && sound._node) {
                    sound._node.volume = sound._volume * vol;
                  }
                }
              }
            }
            return self2;
          }
          return self2._volume;
        },
        /**
         * Handle muting and unmuting globally.
         * @param  {Boolean} muted Is muted or not.
         */
        mute: function(muted) {
          var self2 = this || Howler2;
          if (!self2.ctx) {
            setupAudioContext();
          }
          self2._muted = muted;
          if (self2.usingWebAudio) {
            self2.masterGain.gain.setValueAtTime(muted ? 0 : self2._volume, Howler2.ctx.currentTime);
          }
          for (var i = 0; i < self2._howls.length; i++) {
            if (!self2._howls[i]._webAudio) {
              var ids = self2._howls[i]._getSoundIds();
              for (var j = 0; j < ids.length; j++) {
                var sound = self2._howls[i]._soundById(ids[j]);
                if (sound && sound._node) {
                  sound._node.muted = muted ? true : sound._muted;
                }
              }
            }
          }
          return self2;
        },
        /**
         * Handle stopping all sounds globally.
         */
        stop: function() {
          var self2 = this || Howler2;
          for (var i = 0; i < self2._howls.length; i++) {
            self2._howls[i].stop();
          }
          return self2;
        },
        /**
         * Unload and destroy all currently loaded Howl objects.
         * @return {Howler}
         */
        unload: function() {
          var self2 = this || Howler2;
          for (var i = self2._howls.length - 1; i >= 0; i--) {
            self2._howls[i].unload();
          }
          if (self2.usingWebAudio && self2.ctx && typeof self2.ctx.close !== "undefined") {
            self2.ctx.close();
            self2.ctx = null;
            setupAudioContext();
          }
          return self2;
        },
        /**
         * Check for codec support of specific extension.
         * @param  {String} ext Audio file extention.
         * @return {Boolean}
         */
        codecs: function(ext) {
          return (this || Howler2)._codecs[ext.replace(/^x-/, "")];
        },
        /**
         * Setup various state values for global tracking.
         * @return {Howler}
         */
        _setup: function() {
          var self2 = this || Howler2;
          self2.state = self2.ctx ? self2.ctx.state || "suspended" : "suspended";
          self2._autoSuspend();
          if (!self2.usingWebAudio) {
            if (typeof Audio !== "undefined") {
              try {
                var test = new Audio();
                if (typeof test.oncanplaythrough === "undefined") {
                  self2._canPlayEvent = "canplay";
                }
              } catch (e) {
                self2.noAudio = true;
              }
            } else {
              self2.noAudio = true;
            }
          }
          try {
            var test = new Audio();
            if (test.muted) {
              self2.noAudio = true;
            }
          } catch (e) {
          }
          if (!self2.noAudio) {
            self2._setupCodecs();
          }
          return self2;
        },
        /**
         * Check for browser support for various codecs and cache the results.
         * @return {Howler}
         */
        _setupCodecs: function() {
          var self2 = this || Howler2;
          var audioTest = null;
          try {
            audioTest = typeof Audio !== "undefined" ? new Audio() : null;
          } catch (err) {
            return self2;
          }
          if (!audioTest || typeof audioTest.canPlayType !== "function") {
            return self2;
          }
          var mpegTest = audioTest.canPlayType("audio/mpeg;").replace(/^no$/, "");
          var ua = self2._navigator ? self2._navigator.userAgent : "";
          var checkOpera = ua.match(/OPR\/([0-6].)/g);
          var isOldOpera = checkOpera && parseInt(checkOpera[0].split("/")[1], 10) < 33;
          var checkSafari = ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1;
          var safariVersion = ua.match(/Version\/(.*?) /);
          var isOldSafari = checkSafari && safariVersion && parseInt(safariVersion[1], 10) < 15;
          self2._codecs = {
            mp3: !!(!isOldOpera && (mpegTest || audioTest.canPlayType("audio/mp3;").replace(/^no$/, ""))),
            mpeg: !!mpegTest,
            opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
            ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
            oga: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
            wav: !!(audioTest.canPlayType('audio/wav; codecs="1"') || audioTest.canPlayType("audio/wav")).replace(/^no$/, ""),
            aac: !!audioTest.canPlayType("audio/aac;").replace(/^no$/, ""),
            caf: !!audioTest.canPlayType("audio/x-caf;").replace(/^no$/, ""),
            m4a: !!(audioTest.canPlayType("audio/x-m4a;") || audioTest.canPlayType("audio/m4a;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
            m4b: !!(audioTest.canPlayType("audio/x-m4b;") || audioTest.canPlayType("audio/m4b;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
            mp4: !!(audioTest.canPlayType("audio/x-mp4;") || audioTest.canPlayType("audio/mp4;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
            weba: !!(!isOldSafari && audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
            webm: !!(!isOldSafari && audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
            dolby: !!audioTest.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
            flac: !!(audioTest.canPlayType("audio/x-flac;") || audioTest.canPlayType("audio/flac;")).replace(/^no$/, "")
          };
          return self2;
        },
        /**
         * Some browsers/devices will only allow audio to be played after a user interaction.
         * Attempt to automatically unlock audio on the first user interaction.
         * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
         * @return {Howler}
         */
        _unlockAudio: function() {
          var self2 = this || Howler2;
          if (self2._audioUnlocked || !self2.ctx) {
            return;
          }
          self2._audioUnlocked = false;
          self2.autoUnlock = false;
          if (!self2._mobileUnloaded && self2.ctx.sampleRate !== 44100) {
            self2._mobileUnloaded = true;
            self2.unload();
          }
          self2._scratchBuffer = self2.ctx.createBuffer(1, 1, 22050);
          var unlock = function(e) {
            while (self2._html5AudioPool.length < self2.html5PoolSize) {
              try {
                var audioNode = new Audio();
                audioNode._unlocked = true;
                self2._releaseHtml5Audio(audioNode);
              } catch (e2) {
                self2.noAudio = true;
                break;
              }
            }
            for (var i = 0; i < self2._howls.length; i++) {
              if (!self2._howls[i]._webAudio) {
                var ids = self2._howls[i]._getSoundIds();
                for (var j = 0; j < ids.length; j++) {
                  var sound = self2._howls[i]._soundById(ids[j]);
                  if (sound && sound._node && !sound._node._unlocked) {
                    sound._node._unlocked = true;
                    sound._node.load();
                  }
                }
              }
            }
            self2._autoResume();
            var source = self2.ctx.createBufferSource();
            source.buffer = self2._scratchBuffer;
            source.connect(self2.ctx.destination);
            if (typeof source.start === "undefined") {
              source.noteOn(0);
            } else {
              source.start(0);
            }
            if (typeof self2.ctx.resume === "function") {
              self2.ctx.resume();
            }
            source.onended = function() {
              source.disconnect(0);
              self2._audioUnlocked = true;
              document.removeEventListener("touchstart", unlock, true);
              document.removeEventListener("touchend", unlock, true);
              document.removeEventListener("click", unlock, true);
              document.removeEventListener("keydown", unlock, true);
              for (var i2 = 0; i2 < self2._howls.length; i2++) {
                self2._howls[i2]._emit("unlock");
              }
            };
          };
          document.addEventListener("touchstart", unlock, true);
          document.addEventListener("touchend", unlock, true);
          document.addEventListener("click", unlock, true);
          document.addEventListener("keydown", unlock, true);
          return self2;
        },
        /**
         * Get an unlocked HTML5 Audio object from the pool. If none are left,
         * return a new Audio object and throw a warning.
         * @return {Audio} HTML5 Audio object.
         */
        _obtainHtml5Audio: function() {
          var self2 = this || Howler2;
          if (self2._html5AudioPool.length) {
            return self2._html5AudioPool.pop();
          }
          var testPlay = new Audio().play();
          if (testPlay && typeof Promise !== "undefined" && (testPlay instanceof Promise || typeof testPlay.then === "function")) {
            testPlay.catch(function() {
              console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.");
            });
          }
          return new Audio();
        },
        /**
         * Return an activated HTML5 Audio object to the pool.
         * @return {Howler}
         */
        _releaseHtml5Audio: function(audio) {
          var self2 = this || Howler2;
          if (audio._unlocked) {
            self2._html5AudioPool.push(audio);
          }
          return self2;
        },
        /**
         * Automatically suspend the Web Audio AudioContext after no sound has played for 30 seconds.
         * This saves processing/energy and fixes various browser-specific bugs with audio getting stuck.
         * @return {Howler}
         */
        _autoSuspend: function() {
          var self2 = this;
          if (!self2.autoSuspend || !self2.ctx || typeof self2.ctx.suspend === "undefined" || !Howler2.usingWebAudio) {
            return;
          }
          for (var i = 0; i < self2._howls.length; i++) {
            if (self2._howls[i]._webAudio) {
              for (var j = 0; j < self2._howls[i]._sounds.length; j++) {
                if (!self2._howls[i]._sounds[j]._paused) {
                  return self2;
                }
              }
            }
          }
          if (self2._suspendTimer) {
            clearTimeout(self2._suspendTimer);
          }
          self2._suspendTimer = setTimeout(function() {
            if (!self2.autoSuspend) {
              return;
            }
            self2._suspendTimer = null;
            self2.state = "suspending";
            var handleSuspension = function() {
              self2.state = "suspended";
              if (self2._resumeAfterSuspend) {
                delete self2._resumeAfterSuspend;
                self2._autoResume();
              }
            };
            self2.ctx.suspend().then(handleSuspension, handleSuspension);
          }, 3e4);
          return self2;
        },
        /**
         * Automatically resume the Web Audio AudioContext when a new sound is played.
         * @return {Howler}
         */
        _autoResume: function() {
          var self2 = this;
          if (!self2.ctx || typeof self2.ctx.resume === "undefined" || !Howler2.usingWebAudio) {
            return;
          }
          if (self2.state === "running" && self2.ctx.state !== "interrupted" && self2._suspendTimer) {
            clearTimeout(self2._suspendTimer);
            self2._suspendTimer = null;
          } else if (self2.state === "suspended" || self2.state === "running" && self2.ctx.state === "interrupted") {
            self2.ctx.resume().then(function() {
              self2.state = "running";
              for (var i = 0; i < self2._howls.length; i++) {
                self2._howls[i]._emit("resume");
              }
            });
            if (self2._suspendTimer) {
              clearTimeout(self2._suspendTimer);
              self2._suspendTimer = null;
            }
          } else if (self2.state === "suspending") {
            self2._resumeAfterSuspend = true;
          }
          return self2;
        }
      };
      var Howler2 = new HowlerGlobal2();
      var Howl2 = function(o) {
        var self2 = this;
        if (!o.src || o.src.length === 0) {
          console.error("An array of source files must be passed with any new Howl.");
          return;
        }
        self2.init(o);
      };
      Howl2.prototype = {
        /**
         * Initialize a new Howl group object.
         * @param  {Object} o Passed in properties for this group.
         * @return {Howl}
         */
        init: function(o) {
          var self2 = this;
          if (!Howler2.ctx) {
            setupAudioContext();
          }
          self2._autoplay = o.autoplay || false;
          self2._format = typeof o.format !== "string" ? o.format : [o.format];
          self2._html5 = o.html5 || false;
          self2._muted = o.mute || false;
          self2._loop = o.loop || false;
          self2._pool = o.pool || 5;
          self2._preload = typeof o.preload === "boolean" || o.preload === "metadata" ? o.preload : true;
          self2._rate = o.rate || 1;
          self2._sprite = o.sprite || {};
          self2._src = typeof o.src !== "string" ? o.src : [o.src];
          self2._volume = o.volume !== void 0 ? o.volume : 1;
          self2._xhr = {
            method: o.xhr && o.xhr.method ? o.xhr.method : "GET",
            headers: o.xhr && o.xhr.headers ? o.xhr.headers : null,
            withCredentials: o.xhr && o.xhr.withCredentials ? o.xhr.withCredentials : false
          };
          self2._duration = 0;
          self2._state = "unloaded";
          self2._sounds = [];
          self2._endTimers = {};
          self2._queue = [];
          self2._playLock = false;
          self2._onend = o.onend ? [{ fn: o.onend }] : [];
          self2._onfade = o.onfade ? [{ fn: o.onfade }] : [];
          self2._onload = o.onload ? [{ fn: o.onload }] : [];
          self2._onloaderror = o.onloaderror ? [{ fn: o.onloaderror }] : [];
          self2._onplayerror = o.onplayerror ? [{ fn: o.onplayerror }] : [];
          self2._onpause = o.onpause ? [{ fn: o.onpause }] : [];
          self2._onplay = o.onplay ? [{ fn: o.onplay }] : [];
          self2._onstop = o.onstop ? [{ fn: o.onstop }] : [];
          self2._onmute = o.onmute ? [{ fn: o.onmute }] : [];
          self2._onvolume = o.onvolume ? [{ fn: o.onvolume }] : [];
          self2._onrate = o.onrate ? [{ fn: o.onrate }] : [];
          self2._onseek = o.onseek ? [{ fn: o.onseek }] : [];
          self2._onunlock = o.onunlock ? [{ fn: o.onunlock }] : [];
          self2._onresume = [];
          self2._webAudio = Howler2.usingWebAudio && !self2._html5;
          if (typeof Howler2.ctx !== "undefined" && Howler2.ctx && Howler2.autoUnlock) {
            Howler2._unlockAudio();
          }
          Howler2._howls.push(self2);
          if (self2._autoplay) {
            self2._queue.push({
              event: "play",
              action: function() {
                self2.play();
              }
            });
          }
          if (self2._preload && self2._preload !== "none") {
            self2.load();
          }
          return self2;
        },
        /**
         * Load the audio file.
         * @return {Howler}
         */
        load: function() {
          var self2 = this;
          var url = null;
          if (Howler2.noAudio) {
            self2._emit("loaderror", null, "No audio support.");
            return;
          }
          if (typeof self2._src === "string") {
            self2._src = [self2._src];
          }
          for (var i = 0; i < self2._src.length; i++) {
            var ext, str5;
            if (self2._format && self2._format[i]) {
              ext = self2._format[i];
            } else {
              str5 = self2._src[i];
              if (typeof str5 !== "string") {
                self2._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                continue;
              }
              ext = /^data:audio\/([^;,]+);/i.exec(str5);
              if (!ext) {
                ext = /\.([^.]+)$/.exec(str5.split("?", 1)[0]);
              }
              if (ext) {
                ext = ext[1].toLowerCase();
              }
            }
            if (!ext) {
              console.warn('No file extension was found. Consider using the "format" property or specify an extension.');
            }
            if (ext && Howler2.codecs(ext)) {
              url = self2._src[i];
              break;
            }
          }
          if (!url) {
            self2._emit("loaderror", null, "No codec support for selected audio sources.");
            return;
          }
          self2._src = url;
          self2._state = "loading";
          if (window.location.protocol === "https:" && url.slice(0, 5) === "http:") {
            self2._html5 = true;
            self2._webAudio = false;
          }
          new Sound2(self2);
          if (self2._webAudio) {
            loadBuffer(self2);
          }
          return self2;
        },
        /**
         * Play a sound or resume previous playback.
         * @param  {String/Number} sprite   Sprite name for sprite playback or sound id to continue previous.
         * @param  {Boolean} internal Internal Use: true prevents event firing.
         * @return {Number}          Sound ID.
         */
        play: function(sprite, internal) {
          var self2 = this;
          var id = null;
          if (typeof sprite === "number") {
            id = sprite;
            sprite = null;
          } else if (typeof sprite === "string" && self2._state === "loaded" && !self2._sprite[sprite]) {
            return null;
          } else if (typeof sprite === "undefined") {
            sprite = "__default";
            if (!self2._playLock) {
              var num = 0;
              for (var i = 0; i < self2._sounds.length; i++) {
                if (self2._sounds[i]._paused && !self2._sounds[i]._ended) {
                  num++;
                  id = self2._sounds[i]._id;
                }
              }
              if (num === 1) {
                sprite = null;
              } else {
                id = null;
              }
            }
          }
          var sound = id ? self2._soundById(id) : self2._inactiveSound();
          if (!sound) {
            return null;
          }
          if (id && !sprite) {
            sprite = sound._sprite || "__default";
          }
          if (self2._state !== "loaded") {
            sound._sprite = sprite;
            sound._ended = false;
            var soundId = sound._id;
            self2._queue.push({
              event: "play",
              action: function() {
                self2.play(soundId);
              }
            });
            return soundId;
          }
          if (id && !sound._paused) {
            if (!internal) {
              self2._loadQueue("play");
            }
            return sound._id;
          }
          if (self2._webAudio) {
            Howler2._autoResume();
          }
          var seek = Math.max(0, sound._seek > 0 ? sound._seek : self2._sprite[sprite][0] / 1e3);
          var duration = Math.max(0, (self2._sprite[sprite][0] + self2._sprite[sprite][1]) / 1e3 - seek);
          var timeout2 = duration * 1e3 / Math.abs(sound._rate);
          var start = self2._sprite[sprite][0] / 1e3;
          var stop = (self2._sprite[sprite][0] + self2._sprite[sprite][1]) / 1e3;
          sound._sprite = sprite;
          sound._ended = false;
          var setParams = function() {
            sound._paused = false;
            sound._seek = seek;
            sound._start = start;
            sound._stop = stop;
            sound._loop = !!(sound._loop || self2._sprite[sprite][2]);
          };
          if (seek >= stop) {
            self2._ended(sound);
            return;
          }
          var node = sound._node;
          if (self2._webAudio) {
            var playWebAudio = function() {
              self2._playLock = false;
              setParams();
              self2._refreshBuffer(sound);
              var vol = sound._muted || self2._muted ? 0 : sound._volume;
              node.gain.setValueAtTime(vol, Howler2.ctx.currentTime);
              sound._playStart = Howler2.ctx.currentTime;
              if (typeof node.bufferSource.start === "undefined") {
                sound._loop ? node.bufferSource.noteGrainOn(0, seek, 86400) : node.bufferSource.noteGrainOn(0, seek, duration);
              } else {
                sound._loop ? node.bufferSource.start(0, seek, 86400) : node.bufferSource.start(0, seek, duration);
              }
              if (timeout2 !== Infinity) {
                self2._endTimers[sound._id] = setTimeout(self2._ended.bind(self2, sound), timeout2);
              }
              if (!internal) {
                setTimeout(function() {
                  self2._emit("play", sound._id);
                  self2._loadQueue();
                }, 0);
              }
            };
            if (Howler2.state === "running" && Howler2.ctx.state !== "interrupted") {
              playWebAudio();
            } else {
              self2._playLock = true;
              self2.once("resume", playWebAudio);
              self2._clearTimer(sound._id);
            }
          } else {
            var playHtml5 = function() {
              node.currentTime = seek;
              node.muted = sound._muted || self2._muted || Howler2._muted || node.muted;
              node.volume = sound._volume * Howler2.volume();
              node.playbackRate = sound._rate;
              try {
                var play = node.play();
                if (play && typeof Promise !== "undefined" && (play instanceof Promise || typeof play.then === "function")) {
                  self2._playLock = true;
                  setParams();
                  play.then(function() {
                    self2._playLock = false;
                    node._unlocked = true;
                    if (!internal) {
                      self2._emit("play", sound._id);
                    } else {
                      self2._loadQueue();
                    }
                  }).catch(function() {
                    self2._playLock = false;
                    self2._emit("playerror", sound._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                    sound._ended = true;
                    sound._paused = true;
                  });
                } else if (!internal) {
                  self2._playLock = false;
                  setParams();
                  self2._emit("play", sound._id);
                }
                node.playbackRate = sound._rate;
                if (node.paused) {
                  self2._emit("playerror", sound._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                  return;
                }
                if (sprite !== "__default" || sound._loop) {
                  self2._endTimers[sound._id] = setTimeout(self2._ended.bind(self2, sound), timeout2);
                } else {
                  self2._endTimers[sound._id] = function() {
                    self2._ended(sound);
                    node.removeEventListener("ended", self2._endTimers[sound._id], false);
                  };
                  node.addEventListener("ended", self2._endTimers[sound._id], false);
                }
              } catch (err) {
                self2._emit("playerror", sound._id, err);
              }
            };
            if (node.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA") {
              node.src = self2._src;
              node.load();
            }
            var loadedNoReadyState = window && window.ejecta || !node.readyState && Howler2._navigator.isCocoonJS;
            if (node.readyState >= 3 || loadedNoReadyState) {
              playHtml5();
            } else {
              self2._playLock = true;
              self2._state = "loading";
              var listener = function() {
                self2._state = "loaded";
                playHtml5();
                node.removeEventListener(Howler2._canPlayEvent, listener, false);
              };
              node.addEventListener(Howler2._canPlayEvent, listener, false);
              self2._clearTimer(sound._id);
            }
          }
          return sound._id;
        },
        /**
         * Pause playback and save current position.
         * @param  {Number} id The sound ID (empty to pause all in group).
         * @return {Howl}
         */
        pause: function(id) {
          var self2 = this;
          if (self2._state !== "loaded" || self2._playLock) {
            self2._queue.push({
              event: "pause",
              action: function() {
                self2.pause(id);
              }
            });
            return self2;
          }
          var ids = self2._getSoundIds(id);
          for (var i = 0; i < ids.length; i++) {
            self2._clearTimer(ids[i]);
            var sound = self2._soundById(ids[i]);
            if (sound && !sound._paused) {
              sound._seek = self2.seek(ids[i]);
              sound._rateSeek = 0;
              sound._paused = true;
              self2._stopFade(ids[i]);
              if (sound._node) {
                if (self2._webAudio) {
                  if (!sound._node.bufferSource) {
                    continue;
                  }
                  if (typeof sound._node.bufferSource.stop === "undefined") {
                    sound._node.bufferSource.noteOff(0);
                  } else {
                    sound._node.bufferSource.stop(0);
                  }
                  self2._cleanBuffer(sound._node);
                } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
                  sound._node.pause();
                }
              }
            }
            if (!arguments[1]) {
              self2._emit("pause", sound ? sound._id : null);
            }
          }
          return self2;
        },
        /**
         * Stop playback and reset to start.
         * @param  {Number} id The sound ID (empty to stop all in group).
         * @param  {Boolean} internal Internal Use: true prevents event firing.
         * @return {Howl}
         */
        stop: function(id, internal) {
          var self2 = this;
          if (self2._state !== "loaded" || self2._playLock) {
            self2._queue.push({
              event: "stop",
              action: function() {
                self2.stop(id);
              }
            });
            return self2;
          }
          var ids = self2._getSoundIds(id);
          for (var i = 0; i < ids.length; i++) {
            self2._clearTimer(ids[i]);
            var sound = self2._soundById(ids[i]);
            if (sound) {
              sound._seek = sound._start || 0;
              sound._rateSeek = 0;
              sound._paused = true;
              sound._ended = true;
              self2._stopFade(ids[i]);
              if (sound._node) {
                if (self2._webAudio) {
                  if (sound._node.bufferSource) {
                    if (typeof sound._node.bufferSource.stop === "undefined") {
                      sound._node.bufferSource.noteOff(0);
                    } else {
                      sound._node.bufferSource.stop(0);
                    }
                    self2._cleanBuffer(sound._node);
                  }
                } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
                  sound._node.currentTime = sound._start || 0;
                  sound._node.pause();
                  if (sound._node.duration === Infinity) {
                    self2._clearSound(sound._node);
                  }
                }
              }
              if (!internal) {
                self2._emit("stop", sound._id);
              }
            }
          }
          return self2;
        },
        /**
         * Mute/unmute a single sound or all sounds in this Howl group.
         * @param  {Boolean} muted Set to true to mute and false to unmute.
         * @param  {Number} id    The sound ID to update (omit to mute/unmute all).
         * @return {Howl}
         */
        mute: function(muted, id) {
          var self2 = this;
          if (self2._state !== "loaded" || self2._playLock) {
            self2._queue.push({
              event: "mute",
              action: function() {
                self2.mute(muted, id);
              }
            });
            return self2;
          }
          if (typeof id === "undefined") {
            if (typeof muted === "boolean") {
              self2._muted = muted;
            } else {
              return self2._muted;
            }
          }
          var ids = self2._getSoundIds(id);
          for (var i = 0; i < ids.length; i++) {
            var sound = self2._soundById(ids[i]);
            if (sound) {
              sound._muted = muted;
              if (sound._interval) {
                self2._stopFade(sound._id);
              }
              if (self2._webAudio && sound._node) {
                sound._node.gain.setValueAtTime(muted ? 0 : sound._volume, Howler2.ctx.currentTime);
              } else if (sound._node) {
                sound._node.muted = Howler2._muted ? true : muted;
              }
              self2._emit("mute", sound._id);
            }
          }
          return self2;
        },
        /**
         * Get/set the volume of this sound or of the Howl group. This method can optionally take 0, 1 or 2 arguments.
         *   volume() -> Returns the group's volume value.
         *   volume(id) -> Returns the sound id's current volume.
         *   volume(vol) -> Sets the volume of all sounds in this Howl group.
         *   volume(vol, id) -> Sets the volume of passed sound id.
         * @return {Howl/Number} Returns self or current volume.
         */
        volume: function() {
          var self2 = this;
          var args = arguments;
          var vol, id;
          if (args.length === 0) {
            return self2._volume;
          } else if (args.length === 1 || args.length === 2 && typeof args[1] === "undefined") {
            var ids = self2._getSoundIds();
            var index = ids.indexOf(args[0]);
            if (index >= 0) {
              id = parseInt(args[0], 10);
            } else {
              vol = parseFloat(args[0]);
            }
          } else if (args.length >= 2) {
            vol = parseFloat(args[0]);
            id = parseInt(args[1], 10);
          }
          var sound;
          if (typeof vol !== "undefined" && vol >= 0 && vol <= 1) {
            if (self2._state !== "loaded" || self2._playLock) {
              self2._queue.push({
                event: "volume",
                action: function() {
                  self2.volume.apply(self2, args);
                }
              });
              return self2;
            }
            if (typeof id === "undefined") {
              self2._volume = vol;
            }
            id = self2._getSoundIds(id);
            for (var i = 0; i < id.length; i++) {
              sound = self2._soundById(id[i]);
              if (sound) {
                sound._volume = vol;
                if (!args[2]) {
                  self2._stopFade(id[i]);
                }
                if (self2._webAudio && sound._node && !sound._muted) {
                  sound._node.gain.setValueAtTime(vol, Howler2.ctx.currentTime);
                } else if (sound._node && !sound._muted) {
                  sound._node.volume = vol * Howler2.volume();
                }
                self2._emit("volume", sound._id);
              }
            }
          } else {
            sound = id ? self2._soundById(id) : self2._sounds[0];
            return sound ? sound._volume : 0;
          }
          return self2;
        },
        /**
         * Fade a currently playing sound between two volumes (if no id is passed, all sounds will fade).
         * @param  {Number} from The value to fade from (0.0 to 1.0).
         * @param  {Number} to   The volume to fade to (0.0 to 1.0).
         * @param  {Number} len  Time in milliseconds to fade.
         * @param  {Number} id   The sound id (omit to fade all sounds).
         * @return {Howl}
         */
        fade: function(from, to, len4, id) {
          var self2 = this;
          if (self2._state !== "loaded" || self2._playLock) {
            self2._queue.push({
              event: "fade",
              action: function() {
                self2.fade(from, to, len4, id);
              }
            });
            return self2;
          }
          from = Math.min(Math.max(0, parseFloat(from)), 1);
          to = Math.min(Math.max(0, parseFloat(to)), 1);
          len4 = parseFloat(len4);
          self2.volume(from, id);
          var ids = self2._getSoundIds(id);
          for (var i = 0; i < ids.length; i++) {
            var sound = self2._soundById(ids[i]);
            if (sound) {
              if (!id) {
                self2._stopFade(ids[i]);
              }
              if (self2._webAudio && !sound._muted) {
                var currentTime = Howler2.ctx.currentTime;
                var end = currentTime + len4 / 1e3;
                sound._volume = from;
                sound._node.gain.setValueAtTime(from, currentTime);
                sound._node.gain.linearRampToValueAtTime(to, end);
              }
              self2._startFadeInterval(sound, from, to, len4, ids[i], typeof id === "undefined");
            }
          }
          return self2;
        },
        /**
         * Starts the internal interval to fade a sound.
         * @param  {Object} sound Reference to sound to fade.
         * @param  {Number} from The value to fade from (0.0 to 1.0).
         * @param  {Number} to   The volume to fade to (0.0 to 1.0).
         * @param  {Number} len  Time in milliseconds to fade.
         * @param  {Number} id   The sound id to fade.
         * @param  {Boolean} isGroup   If true, set the volume on the group.
         */
        _startFadeInterval: function(sound, from, to, len4, id, isGroup) {
          var self2 = this;
          var vol = from;
          var diff = to - from;
          var steps = Math.abs(diff / 0.01);
          var stepLen = Math.max(4, steps > 0 ? len4 / steps : len4);
          var lastTick = Date.now();
          sound._fadeTo = to;
          sound._interval = setInterval(function() {
            var tick = (Date.now() - lastTick) / len4;
            lastTick = Date.now();
            vol += diff * tick;
            vol = Math.round(vol * 100) / 100;
            if (diff < 0) {
              vol = Math.max(to, vol);
            } else {
              vol = Math.min(to, vol);
            }
            if (self2._webAudio) {
              sound._volume = vol;
            } else {
              self2.volume(vol, sound._id, true);
            }
            if (isGroup) {
              self2._volume = vol;
            }
            if (to < from && vol <= to || to > from && vol >= to) {
              clearInterval(sound._interval);
              sound._interval = null;
              sound._fadeTo = null;
              self2.volume(to, sound._id);
              self2._emit("fade", sound._id);
            }
          }, stepLen);
        },
        /**
         * Internal method that stops the currently playing fade when
         * a new fade starts, volume is changed or the sound is stopped.
         * @param  {Number} id The sound id.
         * @return {Howl}
         */
        _stopFade: function(id) {
          var self2 = this;
          var sound = self2._soundById(id);
          if (sound && sound._interval) {
            if (self2._webAudio) {
              sound._node.gain.cancelScheduledValues(Howler2.ctx.currentTime);
            }
            clearInterval(sound._interval);
            sound._interval = null;
            self2.volume(sound._fadeTo, id);
            sound._fadeTo = null;
            self2._emit("fade", id);
          }
          return self2;
        },
        /**
         * Get/set the loop parameter on a sound. This method can optionally take 0, 1 or 2 arguments.
         *   loop() -> Returns the group's loop value.
         *   loop(id) -> Returns the sound id's loop value.
         *   loop(loop) -> Sets the loop value for all sounds in this Howl group.
         *   loop(loop, id) -> Sets the loop value of passed sound id.
         * @return {Howl/Boolean} Returns self or current loop value.
         */
        loop: function() {
          var self2 = this;
          var args = arguments;
          var loop, id, sound;
          if (args.length === 0) {
            return self2._loop;
          } else if (args.length === 1) {
            if (typeof args[0] === "boolean") {
              loop = args[0];
              self2._loop = loop;
            } else {
              sound = self2._soundById(parseInt(args[0], 10));
              return sound ? sound._loop : false;
            }
          } else if (args.length === 2) {
            loop = args[0];
            id = parseInt(args[1], 10);
          }
          var ids = self2._getSoundIds(id);
          for (var i = 0; i < ids.length; i++) {
            sound = self2._soundById(ids[i]);
            if (sound) {
              sound._loop = loop;
              if (self2._webAudio && sound._node && sound._node.bufferSource) {
                sound._node.bufferSource.loop = loop;
                if (loop) {
                  sound._node.bufferSource.loopStart = sound._start || 0;
                  sound._node.bufferSource.loopEnd = sound._stop;
                  if (self2.playing(ids[i])) {
                    self2.pause(ids[i], true);
                    self2.play(ids[i], true);
                  }
                }
              }
            }
          }
          return self2;
        },
        /**
         * Get/set the playback rate of a sound. This method can optionally take 0, 1 or 2 arguments.
         *   rate() -> Returns the first sound node's current playback rate.
         *   rate(id) -> Returns the sound id's current playback rate.
         *   rate(rate) -> Sets the playback rate of all sounds in this Howl group.
         *   rate(rate, id) -> Sets the playback rate of passed sound id.
         * @return {Howl/Number} Returns self or the current playback rate.
         */
        rate: function() {
          var self2 = this;
          var args = arguments;
          var rate, id;
          if (args.length === 0) {
            id = self2._sounds[0]._id;
          } else if (args.length === 1) {
            var ids = self2._getSoundIds();
            var index = ids.indexOf(args[0]);
            if (index >= 0) {
              id = parseInt(args[0], 10);
            } else {
              rate = parseFloat(args[0]);
            }
          } else if (args.length === 2) {
            rate = parseFloat(args[0]);
            id = parseInt(args[1], 10);
          }
          var sound;
          if (typeof rate === "number") {
            if (self2._state !== "loaded" || self2._playLock) {
              self2._queue.push({
                event: "rate",
                action: function() {
                  self2.rate.apply(self2, args);
                }
              });
              return self2;
            }
            if (typeof id === "undefined") {
              self2._rate = rate;
            }
            id = self2._getSoundIds(id);
            for (var i = 0; i < id.length; i++) {
              sound = self2._soundById(id[i]);
              if (sound) {
                if (self2.playing(id[i])) {
                  sound._rateSeek = self2.seek(id[i]);
                  sound._playStart = self2._webAudio ? Howler2.ctx.currentTime : sound._playStart;
                }
                sound._rate = rate;
                if (self2._webAudio && sound._node && sound._node.bufferSource) {
                  sound._node.bufferSource.playbackRate.setValueAtTime(rate, Howler2.ctx.currentTime);
                } else if (sound._node) {
                  sound._node.playbackRate = rate;
                }
                var seek = self2.seek(id[i]);
                var duration = (self2._sprite[sound._sprite][0] + self2._sprite[sound._sprite][1]) / 1e3 - seek;
                var timeout2 = duration * 1e3 / Math.abs(sound._rate);
                if (self2._endTimers[id[i]] || !sound._paused) {
                  self2._clearTimer(id[i]);
                  self2._endTimers[id[i]] = setTimeout(self2._ended.bind(self2, sound), timeout2);
                }
                self2._emit("rate", sound._id);
              }
            }
          } else {
            sound = self2._soundById(id);
            return sound ? sound._rate : self2._rate;
          }
          return self2;
        },
        /**
         * Get/set the seek position of a sound. This method can optionally take 0, 1 or 2 arguments.
         *   seek() -> Returns the first sound node's current seek position.
         *   seek(id) -> Returns the sound id's current seek position.
         *   seek(seek) -> Sets the seek position of the first sound node.
         *   seek(seek, id) -> Sets the seek position of passed sound id.
         * @return {Howl/Number} Returns self or the current seek position.
         */
        seek: function() {
          var self2 = this;
          var args = arguments;
          var seek, id;
          if (args.length === 0) {
            if (self2._sounds.length) {
              id = self2._sounds[0]._id;
            }
          } else if (args.length === 1) {
            var ids = self2._getSoundIds();
            var index = ids.indexOf(args[0]);
            if (index >= 0) {
              id = parseInt(args[0], 10);
            } else if (self2._sounds.length) {
              id = self2._sounds[0]._id;
              seek = parseFloat(args[0]);
            }
          } else if (args.length === 2) {
            seek = parseFloat(args[0]);
            id = parseInt(args[1], 10);
          }
          if (typeof id === "undefined") {
            return 0;
          }
          if (typeof seek === "number" && (self2._state !== "loaded" || self2._playLock)) {
            self2._queue.push({
              event: "seek",
              action: function() {
                self2.seek.apply(self2, args);
              }
            });
            return self2;
          }
          var sound = self2._soundById(id);
          if (sound) {
            if (typeof seek === "number" && seek >= 0) {
              var playing = self2.playing(id);
              if (playing) {
                self2.pause(id, true);
              }
              sound._seek = seek;
              sound._ended = false;
              self2._clearTimer(id);
              if (!self2._webAudio && sound._node && !isNaN(sound._node.duration)) {
                sound._node.currentTime = seek;
              }
              var seekAndEmit = function() {
                if (playing) {
                  self2.play(id, true);
                }
                self2._emit("seek", id);
              };
              if (playing && !self2._webAudio) {
                var emitSeek = function() {
                  if (!self2._playLock) {
                    seekAndEmit();
                  } else {
                    setTimeout(emitSeek, 0);
                  }
                };
                setTimeout(emitSeek, 0);
              } else {
                seekAndEmit();
              }
            } else {
              if (self2._webAudio) {
                var realTime = self2.playing(id) ? Howler2.ctx.currentTime - sound._playStart : 0;
                var rateSeek = sound._rateSeek ? sound._rateSeek - sound._seek : 0;
                return sound._seek + (rateSeek + realTime * Math.abs(sound._rate));
              } else {
                return sound._node.currentTime;
              }
            }
          }
          return self2;
        },
        /**
         * Check if a specific sound is currently playing or not (if id is provided), or check if at least one of the sounds in the group is playing or not.
         * @param  {Number}  id The sound id to check. If none is passed, the whole sound group is checked.
         * @return {Boolean} True if playing and false if not.
         */
        playing: function(id) {
          var self2 = this;
          if (typeof id === "number") {
            var sound = self2._soundById(id);
            return sound ? !sound._paused : false;
          }
          for (var i = 0; i < self2._sounds.length; i++) {
            if (!self2._sounds[i]._paused) {
              return true;
            }
          }
          return false;
        },
        /**
         * Get the duration of this sound. Passing a sound id will return the sprite duration.
         * @param  {Number} id The sound id to check. If none is passed, return full source duration.
         * @return {Number} Audio duration in seconds.
         */
        duration: function(id) {
          var self2 = this;
          var duration = self2._duration;
          var sound = self2._soundById(id);
          if (sound) {
            duration = self2._sprite[sound._sprite][1] / 1e3;
          }
          return duration;
        },
        /**
         * Returns the current loaded state of this Howl.
         * @return {String} 'unloaded', 'loading', 'loaded'
         */
        state: function() {
          return this._state;
        },
        /**
         * Unload and destroy the current Howl object.
         * This will immediately stop all sound instances attached to this group.
         */
        unload: function() {
          var self2 = this;
          var sounds = self2._sounds;
          for (var i = 0; i < sounds.length; i++) {
            if (!sounds[i]._paused) {
              self2.stop(sounds[i]._id);
            }
            if (!self2._webAudio) {
              self2._clearSound(sounds[i]._node);
              sounds[i]._node.removeEventListener("error", sounds[i]._errorFn, false);
              sounds[i]._node.removeEventListener(Howler2._canPlayEvent, sounds[i]._loadFn, false);
              sounds[i]._node.removeEventListener("ended", sounds[i]._endFn, false);
              Howler2._releaseHtml5Audio(sounds[i]._node);
            }
            delete sounds[i]._node;
            self2._clearTimer(sounds[i]._id);
          }
          var index = Howler2._howls.indexOf(self2);
          if (index >= 0) {
            Howler2._howls.splice(index, 1);
          }
          var remCache = true;
          for (i = 0; i < Howler2._howls.length; i++) {
            if (Howler2._howls[i]._src === self2._src || self2._src.indexOf(Howler2._howls[i]._src) >= 0) {
              remCache = false;
              break;
            }
          }
          if (cache && remCache) {
            delete cache[self2._src];
          }
          Howler2.noAudio = false;
          self2._state = "unloaded";
          self2._sounds = [];
          self2 = null;
          return null;
        },
        /**
         * Listen to a custom event.
         * @param  {String}   event Event name.
         * @param  {Function} fn    Listener to call.
         * @param  {Number}   id    (optional) Only listen to events for this sound.
         * @param  {Number}   once  (INTERNAL) Marks event to fire only once.
         * @return {Howl}
         */
        on: function(event, fn, id, once) {
          var self2 = this;
          var events = self2["_on" + event];
          if (typeof fn === "function") {
            events.push(once ? { id, fn, once } : { id, fn });
          }
          return self2;
        },
        /**
         * Remove a custom event. Call without parameters to remove all events.
         * @param  {String}   event Event name.
         * @param  {Function} fn    Listener to remove. Leave empty to remove all.
         * @param  {Number}   id    (optional) Only remove events for this sound.
         * @return {Howl}
         */
        off: function(event, fn, id) {
          var self2 = this;
          var events = self2["_on" + event];
          var i = 0;
          if (typeof fn === "number") {
            id = fn;
            fn = null;
          }
          if (fn || id) {
            for (i = 0; i < events.length; i++) {
              var isId = id === events[i].id;
              if (fn === events[i].fn && isId || !fn && isId) {
                events.splice(i, 1);
                break;
              }
            }
          } else if (event) {
            self2["_on" + event] = [];
          } else {
            var keys = Object.keys(self2);
            for (i = 0; i < keys.length; i++) {
              if (keys[i].indexOf("_on") === 0 && Array.isArray(self2[keys[i]])) {
                self2[keys[i]] = [];
              }
            }
          }
          return self2;
        },
        /**
         * Listen to a custom event and remove it once fired.
         * @param  {String}   event Event name.
         * @param  {Function} fn    Listener to call.
         * @param  {Number}   id    (optional) Only listen to events for this sound.
         * @return {Howl}
         */
        once: function(event, fn, id) {
          var self2 = this;
          self2.on(event, fn, id, 1);
          return self2;
        },
        /**
         * Emit all events of a specific type and pass the sound id.
         * @param  {String} event Event name.
         * @param  {Number} id    Sound ID.
         * @param  {Number} msg   Message to go with event.
         * @return {Howl}
         */
        _emit: function(event, id, msg) {
          var self2 = this;
          var events = self2["_on" + event];
          for (var i = events.length - 1; i >= 0; i--) {
            if (!events[i].id || events[i].id === id || event === "load") {
              setTimeout(function(fn) {
                fn.call(this, id, msg);
              }.bind(self2, events[i].fn), 0);
              if (events[i].once) {
                self2.off(event, events[i].fn, events[i].id);
              }
            }
          }
          self2._loadQueue(event);
          return self2;
        },
        /**
         * Queue of actions initiated before the sound has loaded.
         * These will be called in sequence, with the next only firing
         * after the previous has finished executing (even if async like play).
         * @return {Howl}
         */
        _loadQueue: function(event) {
          var self2 = this;
          if (self2._queue.length > 0) {
            var task = self2._queue[0];
            if (task.event === event) {
              self2._queue.shift();
              self2._loadQueue();
            }
            if (!event) {
              task.action();
            }
          }
          return self2;
        },
        /**
         * Fired when playback ends at the end of the duration.
         * @param  {Sound} sound The sound object to work with.
         * @return {Howl}
         */
        _ended: function(sound) {
          var self2 = this;
          var sprite = sound._sprite;
          if (!self2._webAudio && sound._node && !sound._node.paused && !sound._node.ended && sound._node.currentTime < sound._stop) {
            setTimeout(self2._ended.bind(self2, sound), 100);
            return self2;
          }
          var loop = !!(sound._loop || self2._sprite[sprite][2]);
          self2._emit("end", sound._id);
          if (!self2._webAudio && loop) {
            self2.stop(sound._id, true).play(sound._id);
          }
          if (self2._webAudio && loop) {
            self2._emit("play", sound._id);
            sound._seek = sound._start || 0;
            sound._rateSeek = 0;
            sound._playStart = Howler2.ctx.currentTime;
            var timeout2 = (sound._stop - sound._start) * 1e3 / Math.abs(sound._rate);
            self2._endTimers[sound._id] = setTimeout(self2._ended.bind(self2, sound), timeout2);
          }
          if (self2._webAudio && !loop) {
            sound._paused = true;
            sound._ended = true;
            sound._seek = sound._start || 0;
            sound._rateSeek = 0;
            self2._clearTimer(sound._id);
            self2._cleanBuffer(sound._node);
            Howler2._autoSuspend();
          }
          if (!self2._webAudio && !loop) {
            self2.stop(sound._id, true);
          }
          return self2;
        },
        /**
         * Clear the end timer for a sound playback.
         * @param  {Number} id The sound ID.
         * @return {Howl}
         */
        _clearTimer: function(id) {
          var self2 = this;
          if (self2._endTimers[id]) {
            if (typeof self2._endTimers[id] !== "function") {
              clearTimeout(self2._endTimers[id]);
            } else {
              var sound = self2._soundById(id);
              if (sound && sound._node) {
                sound._node.removeEventListener("ended", self2._endTimers[id], false);
              }
            }
            delete self2._endTimers[id];
          }
          return self2;
        },
        /**
         * Return the sound identified by this ID, or return null.
         * @param  {Number} id Sound ID
         * @return {Object}    Sound object or null.
         */
        _soundById: function(id) {
          var self2 = this;
          for (var i = 0; i < self2._sounds.length; i++) {
            if (id === self2._sounds[i]._id) {
              return self2._sounds[i];
            }
          }
          return null;
        },
        /**
         * Return an inactive sound from the pool or create a new one.
         * @return {Sound} Sound playback object.
         */
        _inactiveSound: function() {
          var self2 = this;
          self2._drain();
          for (var i = 0; i < self2._sounds.length; i++) {
            if (self2._sounds[i]._ended) {
              return self2._sounds[i].reset();
            }
          }
          return new Sound2(self2);
        },
        /**
         * Drain excess inactive sounds from the pool.
         */
        _drain: function() {
          var self2 = this;
          var limit = self2._pool;
          var cnt = 0;
          var i = 0;
          if (self2._sounds.length < limit) {
            return;
          }
          for (i = 0; i < self2._sounds.length; i++) {
            if (self2._sounds[i]._ended) {
              cnt++;
            }
          }
          for (i = self2._sounds.length - 1; i >= 0; i--) {
            if (cnt <= limit) {
              return;
            }
            if (self2._sounds[i]._ended) {
              if (self2._webAudio && self2._sounds[i]._node) {
                self2._sounds[i]._node.disconnect(0);
              }
              self2._sounds.splice(i, 1);
              cnt--;
            }
          }
        },
        /**
         * Get all ID's from the sounds pool.
         * @param  {Number} id Only return one ID if one is passed.
         * @return {Array}    Array of IDs.
         */
        _getSoundIds: function(id) {
          var self2 = this;
          if (typeof id === "undefined") {
            var ids = [];
            for (var i = 0; i < self2._sounds.length; i++) {
              ids.push(self2._sounds[i]._id);
            }
            return ids;
          } else {
            return [id];
          }
        },
        /**
         * Load the sound back into the buffer source.
         * @param  {Sound} sound The sound object to work with.
         * @return {Howl}
         */
        _refreshBuffer: function(sound) {
          var self2 = this;
          sound._node.bufferSource = Howler2.ctx.createBufferSource();
          sound._node.bufferSource.buffer = cache[self2._src];
          if (sound._panner) {
            sound._node.bufferSource.connect(sound._panner);
          } else {
            sound._node.bufferSource.connect(sound._node);
          }
          sound._node.bufferSource.loop = sound._loop;
          if (sound._loop) {
            sound._node.bufferSource.loopStart = sound._start || 0;
            sound._node.bufferSource.loopEnd = sound._stop || 0;
          }
          sound._node.bufferSource.playbackRate.setValueAtTime(sound._rate, Howler2.ctx.currentTime);
          return self2;
        },
        /**
         * Prevent memory leaks by cleaning up the buffer source after playback.
         * @param  {Object} node Sound's audio node containing the buffer source.
         * @return {Howl}
         */
        _cleanBuffer: function(node) {
          var self2 = this;
          var isIOS = Howler2._navigator && Howler2._navigator.vendor.indexOf("Apple") >= 0;
          if (Howler2._scratchBuffer && node.bufferSource) {
            node.bufferSource.onended = null;
            node.bufferSource.disconnect(0);
            if (isIOS) {
              try {
                node.bufferSource.buffer = Howler2._scratchBuffer;
              } catch (e) {
              }
            }
          }
          node.bufferSource = null;
          return self2;
        },
        /**
         * Set the source to a 0-second silence to stop any downloading (except in IE).
         * @param  {Object} node Audio node to clear.
         */
        _clearSound: function(node) {
          var checkIE = /MSIE |Trident\//.test(Howler2._navigator && Howler2._navigator.userAgent);
          if (!checkIE) {
            node.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
          }
        }
      };
      var Sound2 = function(howl) {
        this._parent = howl;
        this.init();
      };
      Sound2.prototype = {
        /**
         * Initialize a new Sound object.
         * @return {Sound}
         */
        init: function() {
          var self2 = this;
          var parent = self2._parent;
          self2._muted = parent._muted;
          self2._loop = parent._loop;
          self2._volume = parent._volume;
          self2._rate = parent._rate;
          self2._seek = 0;
          self2._paused = true;
          self2._ended = true;
          self2._sprite = "__default";
          self2._id = ++Howler2._counter;
          parent._sounds.push(self2);
          self2.create();
          return self2;
        },
        /**
         * Create and setup a new sound object, whether HTML5 Audio or Web Audio.
         * @return {Sound}
         */
        create: function() {
          var self2 = this;
          var parent = self2._parent;
          var volume = Howler2._muted || self2._muted || self2._parent._muted ? 0 : self2._volume;
          if (parent._webAudio) {
            self2._node = typeof Howler2.ctx.createGain === "undefined" ? Howler2.ctx.createGainNode() : Howler2.ctx.createGain();
            self2._node.gain.setValueAtTime(volume, Howler2.ctx.currentTime);
            self2._node.paused = true;
            self2._node.connect(Howler2.masterGain);
          } else if (!Howler2.noAudio) {
            self2._node = Howler2._obtainHtml5Audio();
            self2._errorFn = self2._errorListener.bind(self2);
            self2._node.addEventListener("error", self2._errorFn, false);
            self2._loadFn = self2._loadListener.bind(self2);
            self2._node.addEventListener(Howler2._canPlayEvent, self2._loadFn, false);
            self2._endFn = self2._endListener.bind(self2);
            self2._node.addEventListener("ended", self2._endFn, false);
            self2._node.src = parent._src;
            self2._node.preload = parent._preload === true ? "auto" : parent._preload;
            self2._node.volume = volume * Howler2.volume();
            self2._node.load();
          }
          return self2;
        },
        /**
         * Reset the parameters of this sound to the original state (for recycle).
         * @return {Sound}
         */
        reset: function() {
          var self2 = this;
          var parent = self2._parent;
          self2._muted = parent._muted;
          self2._loop = parent._loop;
          self2._volume = parent._volume;
          self2._rate = parent._rate;
          self2._seek = 0;
          self2._rateSeek = 0;
          self2._paused = true;
          self2._ended = true;
          self2._sprite = "__default";
          self2._id = ++Howler2._counter;
          return self2;
        },
        /**
         * HTML5 Audio error listener callback.
         */
        _errorListener: function() {
          var self2 = this;
          self2._parent._emit("loaderror", self2._id, self2._node.error ? self2._node.error.code : 0);
          self2._node.removeEventListener("error", self2._errorFn, false);
        },
        /**
         * HTML5 Audio canplaythrough listener callback.
         */
        _loadListener: function() {
          var self2 = this;
          var parent = self2._parent;
          parent._duration = Math.ceil(self2._node.duration * 10) / 10;
          if (Object.keys(parent._sprite).length === 0) {
            parent._sprite = { __default: [0, parent._duration * 1e3] };
          }
          if (parent._state !== "loaded") {
            parent._state = "loaded";
            parent._emit("load");
            parent._loadQueue();
          }
          self2._node.removeEventListener(Howler2._canPlayEvent, self2._loadFn, false);
        },
        /**
         * HTML5 Audio ended listener callback.
         */
        _endListener: function() {
          var self2 = this;
          var parent = self2._parent;
          if (parent._duration === Infinity) {
            parent._duration = Math.ceil(self2._node.duration * 10) / 10;
            if (parent._sprite.__default[1] === Infinity) {
              parent._sprite.__default[1] = parent._duration * 1e3;
            }
            parent._ended(self2);
          }
          self2._node.removeEventListener("ended", self2._endFn, false);
        }
      };
      var cache = {};
      var loadBuffer = function(self2) {
        var url = self2._src;
        if (cache[url]) {
          self2._duration = cache[url].duration;
          loadSound(self2);
          return;
        }
        if (/^data:[^;]+;base64,/.test(url)) {
          var data = atob(url.split(",")[1]);
          var dataView = new Uint8Array(data.length);
          for (var i = 0; i < data.length; ++i) {
            dataView[i] = data.charCodeAt(i);
          }
          decodeAudioData(dataView.buffer, self2);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open(self2._xhr.method, url, true);
          xhr.withCredentials = self2._xhr.withCredentials;
          xhr.responseType = "arraybuffer";
          if (self2._xhr.headers) {
            Object.keys(self2._xhr.headers).forEach(function(key) {
              xhr.setRequestHeader(key, self2._xhr.headers[key]);
            });
          }
          xhr.onload = function() {
            var code = (xhr.status + "")[0];
            if (code !== "0" && code !== "2" && code !== "3") {
              self2._emit("loaderror", null, "Failed loading audio file with status: " + xhr.status + ".");
              return;
            }
            decodeAudioData(xhr.response, self2);
          };
          xhr.onerror = function() {
            if (self2._webAudio) {
              self2._html5 = true;
              self2._webAudio = false;
              self2._sounds = [];
              delete cache[url];
              self2.load();
            }
          };
          safeXhrSend(xhr);
        }
      };
      var safeXhrSend = function(xhr) {
        try {
          xhr.send();
        } catch (e) {
          xhr.onerror();
        }
      };
      var decodeAudioData = function(arraybuffer, self2) {
        var error = function() {
          self2._emit("loaderror", null, "Decoding audio data failed.");
        };
        var success = function(buffer) {
          if (buffer && self2._sounds.length > 0) {
            cache[self2._src] = buffer;
            loadSound(self2, buffer);
          } else {
            error();
          }
        };
        if (typeof Promise !== "undefined" && Howler2.ctx.decodeAudioData.length === 1) {
          Howler2.ctx.decodeAudioData(arraybuffer).then(success).catch(error);
        } else {
          Howler2.ctx.decodeAudioData(arraybuffer, success, error);
        }
      };
      var loadSound = function(self2, buffer) {
        if (buffer && !self2._duration) {
          self2._duration = buffer.duration;
        }
        if (Object.keys(self2._sprite).length === 0) {
          self2._sprite = { __default: [0, self2._duration * 1e3] };
        }
        if (self2._state !== "loaded") {
          self2._state = "loaded";
          self2._emit("load");
          self2._loadQueue();
        }
      };
      var setupAudioContext = function() {
        if (!Howler2.usingWebAudio) {
          return;
        }
        try {
          if (typeof AudioContext !== "undefined") {
            Howler2.ctx = new AudioContext();
          } else if (typeof webkitAudioContext !== "undefined") {
            Howler2.ctx = new webkitAudioContext();
          } else {
            Howler2.usingWebAudio = false;
          }
        } catch (e) {
          Howler2.usingWebAudio = false;
        }
        if (!Howler2.ctx) {
          Howler2.usingWebAudio = false;
        }
        var iOS = /iP(hone|od|ad)/.test(Howler2._navigator && Howler2._navigator.platform);
        var appVersion = Howler2._navigator && Howler2._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
        var version = appVersion ? parseInt(appVersion[1], 10) : null;
        if (iOS && version && version < 9) {
          var safari = /safari/.test(Howler2._navigator && Howler2._navigator.userAgent.toLowerCase());
          if (Howler2._navigator && !safari) {
            Howler2.usingWebAudio = false;
          }
        }
        if (Howler2.usingWebAudio) {
          Howler2.masterGain = typeof Howler2.ctx.createGain === "undefined" ? Howler2.ctx.createGainNode() : Howler2.ctx.createGain();
          Howler2.masterGain.gain.setValueAtTime(Howler2._muted ? 0 : Howler2._volume, Howler2.ctx.currentTime);
          Howler2.masterGain.connect(Howler2.ctx.destination);
        }
        Howler2._setup();
      };
      if (typeof define === "function" && define.amd) {
        define([], function() {
          return {
            Howler: Howler2,
            Howl: Howl2
          };
        });
      }
      if (typeof exports !== "undefined") {
        exports.Howler = Howler2;
        exports.Howl = Howl2;
      }
      if (typeof global !== "undefined") {
        global.HowlerGlobal = HowlerGlobal2;
        global.Howler = Howler2;
        global.Howl = Howl2;
        global.Sound = Sound2;
      } else if (typeof window !== "undefined") {
        window.HowlerGlobal = HowlerGlobal2;
        window.Howler = Howler2;
        window.Howl = Howl2;
        window.Sound = Sound2;
      }
    })();
    (function() {
      "use strict";
      HowlerGlobal.prototype._pos = [0, 0, 0];
      HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0];
      HowlerGlobal.prototype.stereo = function(pan) {
        var self2 = this;
        if (!self2.ctx || !self2.ctx.listener) {
          return self2;
        }
        for (var i = self2._howls.length - 1; i >= 0; i--) {
          self2._howls[i].stereo(pan);
        }
        return self2;
      };
      HowlerGlobal.prototype.pos = function(x, y, z) {
        var self2 = this;
        if (!self2.ctx || !self2.ctx.listener) {
          return self2;
        }
        y = typeof y !== "number" ? self2._pos[1] : y;
        z = typeof z !== "number" ? self2._pos[2] : z;
        if (typeof x === "number") {
          self2._pos = [x, y, z];
          if (typeof self2.ctx.listener.positionX !== "undefined") {
            self2.ctx.listener.positionX.setTargetAtTime(self2._pos[0], Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.positionY.setTargetAtTime(self2._pos[1], Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.positionZ.setTargetAtTime(self2._pos[2], Howler.ctx.currentTime, 0.1);
          } else {
            self2.ctx.listener.setPosition(self2._pos[0], self2._pos[1], self2._pos[2]);
          }
        } else {
          return self2._pos;
        }
        return self2;
      };
      HowlerGlobal.prototype.orientation = function(x, y, z, xUp, yUp, zUp) {
        var self2 = this;
        if (!self2.ctx || !self2.ctx.listener) {
          return self2;
        }
        var or = self2._orientation;
        y = typeof y !== "number" ? or[1] : y;
        z = typeof z !== "number" ? or[2] : z;
        xUp = typeof xUp !== "number" ? or[3] : xUp;
        yUp = typeof yUp !== "number" ? or[4] : yUp;
        zUp = typeof zUp !== "number" ? or[5] : zUp;
        if (typeof x === "number") {
          self2._orientation = [x, y, z, xUp, yUp, zUp];
          if (typeof self2.ctx.listener.forwardX !== "undefined") {
            self2.ctx.listener.forwardX.setTargetAtTime(x, Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.forwardY.setTargetAtTime(y, Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.forwardZ.setTargetAtTime(z, Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.upX.setTargetAtTime(xUp, Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.upY.setTargetAtTime(yUp, Howler.ctx.currentTime, 0.1);
            self2.ctx.listener.upZ.setTargetAtTime(zUp, Howler.ctx.currentTime, 0.1);
          } else {
            self2.ctx.listener.setOrientation(x, y, z, xUp, yUp, zUp);
          }
        } else {
          return or;
        }
        return self2;
      };
      Howl.prototype.init = function(_super) {
        return function(o) {
          var self2 = this;
          self2._orientation = o.orientation || [1, 0, 0];
          self2._stereo = o.stereo || null;
          self2._pos = o.pos || null;
          self2._pannerAttr = {
            coneInnerAngle: typeof o.coneInnerAngle !== "undefined" ? o.coneInnerAngle : 360,
            coneOuterAngle: typeof o.coneOuterAngle !== "undefined" ? o.coneOuterAngle : 360,
            coneOuterGain: typeof o.coneOuterGain !== "undefined" ? o.coneOuterGain : 0,
            distanceModel: typeof o.distanceModel !== "undefined" ? o.distanceModel : "inverse",
            maxDistance: typeof o.maxDistance !== "undefined" ? o.maxDistance : 1e4,
            panningModel: typeof o.panningModel !== "undefined" ? o.panningModel : "HRTF",
            refDistance: typeof o.refDistance !== "undefined" ? o.refDistance : 1,
            rolloffFactor: typeof o.rolloffFactor !== "undefined" ? o.rolloffFactor : 1
          };
          self2._onstereo = o.onstereo ? [{ fn: o.onstereo }] : [];
          self2._onpos = o.onpos ? [{ fn: o.onpos }] : [];
          self2._onorientation = o.onorientation ? [{ fn: o.onorientation }] : [];
          return _super.call(this, o);
        };
      }(Howl.prototype.init);
      Howl.prototype.stereo = function(pan, id) {
        var self2 = this;
        if (!self2._webAudio) {
          return self2;
        }
        if (self2._state !== "loaded") {
          self2._queue.push({
            event: "stereo",
            action: function() {
              self2.stereo(pan, id);
            }
          });
          return self2;
        }
        var pannerType = typeof Howler.ctx.createStereoPanner === "undefined" ? "spatial" : "stereo";
        if (typeof id === "undefined") {
          if (typeof pan === "number") {
            self2._stereo = pan;
            self2._pos = [pan, 0, 0];
          } else {
            return self2._stereo;
          }
        }
        var ids = self2._getSoundIds(id);
        for (var i = 0; i < ids.length; i++) {
          var sound = self2._soundById(ids[i]);
          if (sound) {
            if (typeof pan === "number") {
              sound._stereo = pan;
              sound._pos = [pan, 0, 0];
              if (sound._node) {
                sound._pannerAttr.panningModel = "equalpower";
                if (!sound._panner || !sound._panner.pan) {
                  setupPanner(sound, pannerType);
                }
                if (pannerType === "spatial") {
                  if (typeof sound._panner.positionX !== "undefined") {
                    sound._panner.positionX.setValueAtTime(pan, Howler.ctx.currentTime);
                    sound._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime);
                    sound._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime);
                  } else {
                    sound._panner.setPosition(pan, 0, 0);
                  }
                } else {
                  sound._panner.pan.setValueAtTime(pan, Howler.ctx.currentTime);
                }
              }
              self2._emit("stereo", sound._id);
            } else {
              return sound._stereo;
            }
          }
        }
        return self2;
      };
      Howl.prototype.pos = function(x, y, z, id) {
        var self2 = this;
        if (!self2._webAudio) {
          return self2;
        }
        if (self2._state !== "loaded") {
          self2._queue.push({
            event: "pos",
            action: function() {
              self2.pos(x, y, z, id);
            }
          });
          return self2;
        }
        y = typeof y !== "number" ? 0 : y;
        z = typeof z !== "number" ? -0.5 : z;
        if (typeof id === "undefined") {
          if (typeof x === "number") {
            self2._pos = [x, y, z];
          } else {
            return self2._pos;
          }
        }
        var ids = self2._getSoundIds(id);
        for (var i = 0; i < ids.length; i++) {
          var sound = self2._soundById(ids[i]);
          if (sound) {
            if (typeof x === "number") {
              sound._pos = [x, y, z];
              if (sound._node) {
                if (!sound._panner || sound._panner.pan) {
                  setupPanner(sound, "spatial");
                }
                if (typeof sound._panner.positionX !== "undefined") {
                  sound._panner.positionX.setValueAtTime(x, Howler.ctx.currentTime);
                  sound._panner.positionY.setValueAtTime(y, Howler.ctx.currentTime);
                  sound._panner.positionZ.setValueAtTime(z, Howler.ctx.currentTime);
                } else {
                  sound._panner.setPosition(x, y, z);
                }
              }
              self2._emit("pos", sound._id);
            } else {
              return sound._pos;
            }
          }
        }
        return self2;
      };
      Howl.prototype.orientation = function(x, y, z, id) {
        var self2 = this;
        if (!self2._webAudio) {
          return self2;
        }
        if (self2._state !== "loaded") {
          self2._queue.push({
            event: "orientation",
            action: function() {
              self2.orientation(x, y, z, id);
            }
          });
          return self2;
        }
        y = typeof y !== "number" ? self2._orientation[1] : y;
        z = typeof z !== "number" ? self2._orientation[2] : z;
        if (typeof id === "undefined") {
          if (typeof x === "number") {
            self2._orientation = [x, y, z];
          } else {
            return self2._orientation;
          }
        }
        var ids = self2._getSoundIds(id);
        for (var i = 0; i < ids.length; i++) {
          var sound = self2._soundById(ids[i]);
          if (sound) {
            if (typeof x === "number") {
              sound._orientation = [x, y, z];
              if (sound._node) {
                if (!sound._panner) {
                  if (!sound._pos) {
                    sound._pos = self2._pos || [0, 0, -0.5];
                  }
                  setupPanner(sound, "spatial");
                }
                if (typeof sound._panner.orientationX !== "undefined") {
                  sound._panner.orientationX.setValueAtTime(x, Howler.ctx.currentTime);
                  sound._panner.orientationY.setValueAtTime(y, Howler.ctx.currentTime);
                  sound._panner.orientationZ.setValueAtTime(z, Howler.ctx.currentTime);
                } else {
                  sound._panner.setOrientation(x, y, z);
                }
              }
              self2._emit("orientation", sound._id);
            } else {
              return sound._orientation;
            }
          }
        }
        return self2;
      };
      Howl.prototype.pannerAttr = function() {
        var self2 = this;
        var args = arguments;
        var o, id, sound;
        if (!self2._webAudio) {
          return self2;
        }
        if (args.length === 0) {
          return self2._pannerAttr;
        } else if (args.length === 1) {
          if (typeof args[0] === "object") {
            o = args[0];
            if (typeof id === "undefined") {
              if (!o.pannerAttr) {
                o.pannerAttr = {
                  coneInnerAngle: o.coneInnerAngle,
                  coneOuterAngle: o.coneOuterAngle,
                  coneOuterGain: o.coneOuterGain,
                  distanceModel: o.distanceModel,
                  maxDistance: o.maxDistance,
                  refDistance: o.refDistance,
                  rolloffFactor: o.rolloffFactor,
                  panningModel: o.panningModel
                };
              }
              self2._pannerAttr = {
                coneInnerAngle: typeof o.pannerAttr.coneInnerAngle !== "undefined" ? o.pannerAttr.coneInnerAngle : self2._coneInnerAngle,
                coneOuterAngle: typeof o.pannerAttr.coneOuterAngle !== "undefined" ? o.pannerAttr.coneOuterAngle : self2._coneOuterAngle,
                coneOuterGain: typeof o.pannerAttr.coneOuterGain !== "undefined" ? o.pannerAttr.coneOuterGain : self2._coneOuterGain,
                distanceModel: typeof o.pannerAttr.distanceModel !== "undefined" ? o.pannerAttr.distanceModel : self2._distanceModel,
                maxDistance: typeof o.pannerAttr.maxDistance !== "undefined" ? o.pannerAttr.maxDistance : self2._maxDistance,
                refDistance: typeof o.pannerAttr.refDistance !== "undefined" ? o.pannerAttr.refDistance : self2._refDistance,
                rolloffFactor: typeof o.pannerAttr.rolloffFactor !== "undefined" ? o.pannerAttr.rolloffFactor : self2._rolloffFactor,
                panningModel: typeof o.pannerAttr.panningModel !== "undefined" ? o.pannerAttr.panningModel : self2._panningModel
              };
            }
          } else {
            sound = self2._soundById(parseInt(args[0], 10));
            return sound ? sound._pannerAttr : self2._pannerAttr;
          }
        } else if (args.length === 2) {
          o = args[0];
          id = parseInt(args[1], 10);
        }
        var ids = self2._getSoundIds(id);
        for (var i = 0; i < ids.length; i++) {
          sound = self2._soundById(ids[i]);
          if (sound) {
            var pa = sound._pannerAttr;
            pa = {
              coneInnerAngle: typeof o.coneInnerAngle !== "undefined" ? o.coneInnerAngle : pa.coneInnerAngle,
              coneOuterAngle: typeof o.coneOuterAngle !== "undefined" ? o.coneOuterAngle : pa.coneOuterAngle,
              coneOuterGain: typeof o.coneOuterGain !== "undefined" ? o.coneOuterGain : pa.coneOuterGain,
              distanceModel: typeof o.distanceModel !== "undefined" ? o.distanceModel : pa.distanceModel,
              maxDistance: typeof o.maxDistance !== "undefined" ? o.maxDistance : pa.maxDistance,
              refDistance: typeof o.refDistance !== "undefined" ? o.refDistance : pa.refDistance,
              rolloffFactor: typeof o.rolloffFactor !== "undefined" ? o.rolloffFactor : pa.rolloffFactor,
              panningModel: typeof o.panningModel !== "undefined" ? o.panningModel : pa.panningModel
            };
            var panner = sound._panner;
            if (panner) {
              panner.coneInnerAngle = pa.coneInnerAngle;
              panner.coneOuterAngle = pa.coneOuterAngle;
              panner.coneOuterGain = pa.coneOuterGain;
              panner.distanceModel = pa.distanceModel;
              panner.maxDistance = pa.maxDistance;
              panner.refDistance = pa.refDistance;
              panner.rolloffFactor = pa.rolloffFactor;
              panner.panningModel = pa.panningModel;
            } else {
              if (!sound._pos) {
                sound._pos = self2._pos || [0, 0, -0.5];
              }
              setupPanner(sound, "spatial");
            }
          }
        }
        return self2;
      };
      Sound.prototype.init = function(_super) {
        return function() {
          var self2 = this;
          var parent = self2._parent;
          self2._orientation = parent._orientation;
          self2._stereo = parent._stereo;
          self2._pos = parent._pos;
          self2._pannerAttr = parent._pannerAttr;
          _super.call(this);
          if (self2._stereo) {
            parent.stereo(self2._stereo);
          } else if (self2._pos) {
            parent.pos(self2._pos[0], self2._pos[1], self2._pos[2], self2._id);
          }
        };
      }(Sound.prototype.init);
      Sound.prototype.reset = function(_super) {
        return function() {
          var self2 = this;
          var parent = self2._parent;
          self2._orientation = parent._orientation;
          self2._stereo = parent._stereo;
          self2._pos = parent._pos;
          self2._pannerAttr = parent._pannerAttr;
          if (self2._stereo) {
            parent.stereo(self2._stereo);
          } else if (self2._pos) {
            parent.pos(self2._pos[0], self2._pos[1], self2._pos[2], self2._id);
          } else if (self2._panner) {
            self2._panner.disconnect(0);
            self2._panner = void 0;
            parent._refreshBuffer(self2);
          }
          return _super.call(this);
        };
      }(Sound.prototype.reset);
      var setupPanner = function(sound, type) {
        type = type || "spatial";
        if (type === "spatial") {
          sound._panner = Howler.ctx.createPanner();
          sound._panner.coneInnerAngle = sound._pannerAttr.coneInnerAngle;
          sound._panner.coneOuterAngle = sound._pannerAttr.coneOuterAngle;
          sound._panner.coneOuterGain = sound._pannerAttr.coneOuterGain;
          sound._panner.distanceModel = sound._pannerAttr.distanceModel;
          sound._panner.maxDistance = sound._pannerAttr.maxDistance;
          sound._panner.refDistance = sound._pannerAttr.refDistance;
          sound._panner.rolloffFactor = sound._pannerAttr.rolloffFactor;
          sound._panner.panningModel = sound._pannerAttr.panningModel;
          if (typeof sound._panner.positionX !== "undefined") {
            sound._panner.positionX.setValueAtTime(sound._pos[0], Howler.ctx.currentTime);
            sound._panner.positionY.setValueAtTime(sound._pos[1], Howler.ctx.currentTime);
            sound._panner.positionZ.setValueAtTime(sound._pos[2], Howler.ctx.currentTime);
          } else {
            sound._panner.setPosition(sound._pos[0], sound._pos[1], sound._pos[2]);
          }
          if (typeof sound._panner.orientationX !== "undefined") {
            sound._panner.orientationX.setValueAtTime(sound._orientation[0], Howler.ctx.currentTime);
            sound._panner.orientationY.setValueAtTime(sound._orientation[1], Howler.ctx.currentTime);
            sound._panner.orientationZ.setValueAtTime(sound._orientation[2], Howler.ctx.currentTime);
          } else {
            sound._panner.setOrientation(sound._orientation[0], sound._orientation[1], sound._orientation[2]);
          }
        } else {
          sound._panner = Howler.ctx.createStereoPanner();
          sound._panner.pan.setValueAtTime(sound._stereo, Howler.ctx.currentTime);
        }
        sound._panner.connect(sound._node);
        if (!sound._paused) {
          sound._parent.pause(sound._id, true).play(sound._id, true);
        }
      };
    })();
  }
});

// node_modules/earcut/src/earcut.js
var require_earcut = __commonJS({
  "node_modules/earcut/src/earcut.js"(exports, module) {
    "use strict";
    module.exports = earcut2;
    module.exports.default = earcut2;
    function earcut2(data, holeIndices, dim) {
      dim = dim || 2;
      var hasHoles = holeIndices && holeIndices.length, outerLen = hasHoles ? holeIndices[0] * dim : data.length, outerNode = linkedList(data, 0, outerLen, dim, true), triangles = [];
      if (!outerNode || outerNode.next === outerNode.prev)
        return triangles;
      var minX, minY, maxX, maxY, x, y, invSize;
      if (hasHoles)
        outerNode = eliminateHoles(data, holeIndices, outerNode, dim);
      if (data.length > 80 * dim) {
        minX = maxX = data[0];
        minY = maxY = data[1];
        for (var i = dim; i < outerLen; i += dim) {
          x = data[i];
          y = data[i + 1];
          if (x < minX)
            minX = x;
          if (y < minY)
            minY = y;
          if (x > maxX)
            maxX = x;
          if (y > maxY)
            maxY = y;
        }
        invSize = Math.max(maxX - minX, maxY - minY);
        invSize = invSize !== 0 ? 32767 / invSize : 0;
      }
      earcutLinked(outerNode, triangles, dim, minX, minY, invSize, 0);
      return triangles;
    }
    function linkedList(data, start, end, dim, clockwise) {
      var i, last;
      if (clockwise === signedArea(data, start, end, dim) > 0) {
        for (i = start; i < end; i += dim)
          last = insertNode(i, data[i], data[i + 1], last);
      } else {
        for (i = end - dim; i >= start; i -= dim)
          last = insertNode(i, data[i], data[i + 1], last);
      }
      if (last && equals6(last, last.next)) {
        removeNode(last);
        last = last.next;
      }
      return last;
    }
    function filterPoints(start, end) {
      if (!start)
        return start;
      if (!end)
        end = start;
      var p = start, again;
      do {
        again = false;
        if (!p.steiner && (equals6(p, p.next) || area(p.prev, p, p.next) === 0)) {
          removeNode(p);
          p = end = p.prev;
          if (p === p.next)
            break;
          again = true;
        } else {
          p = p.next;
        }
      } while (again || p !== end);
      return end;
    }
    function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
      if (!ear)
        return;
      if (!pass && invSize)
        indexCurve(ear, minX, minY, invSize);
      var stop = ear, prev, next;
      while (ear.prev !== ear.next) {
        prev = ear.prev;
        next = ear.next;
        if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
          triangles.push(prev.i / dim | 0);
          triangles.push(ear.i / dim | 0);
          triangles.push(next.i / dim | 0);
          removeNode(ear);
          ear = next.next;
          stop = next.next;
          continue;
        }
        ear = next;
        if (ear === stop) {
          if (!pass) {
            earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);
          } else if (pass === 1) {
            ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
            earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);
          } else if (pass === 2) {
            splitEarcut(ear, triangles, dim, minX, minY, invSize);
          }
          break;
        }
      }
    }
    function isEar(ear) {
      var a = ear.prev, b = ear, c = ear.next;
      if (area(a, b, c) >= 0)
        return false;
      var ax = a.x, bx = b.x, cx = c.x, ay = a.y, by = b.y, cy = c.y;
      var x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx, y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy, x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx, y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
      var p = c.next;
      while (p !== a) {
        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0)
          return false;
        p = p.next;
      }
      return true;
    }
    function isEarHashed(ear, minX, minY, invSize) {
      var a = ear.prev, b = ear, c = ear.next;
      if (area(a, b, c) >= 0)
        return false;
      var ax = a.x, bx = b.x, cx = c.x, ay = a.y, by = b.y, cy = c.y;
      var x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx, y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy, x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx, y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
      var minZ = zOrder(x0, y0, minX, minY, invSize), maxZ = zOrder(x1, y1, minX, minY, invSize);
      var p = ear.prevZ, n = ear.nextZ;
      while (p && p.z >= minZ && n && n.z <= maxZ) {
        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0)
          return false;
        p = p.prevZ;
        if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c && pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0)
          return false;
        n = n.nextZ;
      }
      while (p && p.z >= minZ) {
        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0)
          return false;
        p = p.prevZ;
      }
      while (n && n.z <= maxZ) {
        if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c && pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0)
          return false;
        n = n.nextZ;
      }
      return true;
    }
    function cureLocalIntersections(start, triangles, dim) {
      var p = start;
      do {
        var a = p.prev, b = p.next.next;
        if (!equals6(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
          triangles.push(a.i / dim | 0);
          triangles.push(p.i / dim | 0);
          triangles.push(b.i / dim | 0);
          removeNode(p);
          removeNode(p.next);
          p = start = b;
        }
        p = p.next;
      } while (p !== start);
      return filterPoints(p);
    }
    function splitEarcut(start, triangles, dim, minX, minY, invSize) {
      var a = start;
      do {
        var b = a.next.next;
        while (b !== a.prev) {
          if (a.i !== b.i && isValidDiagonal(a, b)) {
            var c = splitPolygon(a, b);
            a = filterPoints(a, a.next);
            c = filterPoints(c, c.next);
            earcutLinked(a, triangles, dim, minX, minY, invSize, 0);
            earcutLinked(c, triangles, dim, minX, minY, invSize, 0);
            return;
          }
          b = b.next;
        }
        a = a.next;
      } while (a !== start);
    }
    function eliminateHoles(data, holeIndices, outerNode, dim) {
      var queue = [], i, len4, start, end, list;
      for (i = 0, len4 = holeIndices.length; i < len4; i++) {
        start = holeIndices[i] * dim;
        end = i < len4 - 1 ? holeIndices[i + 1] * dim : data.length;
        list = linkedList(data, start, end, dim, false);
        if (list === list.next)
          list.steiner = true;
        queue.push(getLeftmost(list));
      }
      queue.sort(compareX);
      for (i = 0; i < queue.length; i++) {
        outerNode = eliminateHole(queue[i], outerNode);
      }
      return outerNode;
    }
    function compareX(a, b) {
      return a.x - b.x;
    }
    function eliminateHole(hole, outerNode) {
      var bridge = findHoleBridge(hole, outerNode);
      if (!bridge) {
        return outerNode;
      }
      var bridgeReverse = splitPolygon(bridge, hole);
      filterPoints(bridgeReverse, bridgeReverse.next);
      return filterPoints(bridge, bridge.next);
    }
    function findHoleBridge(hole, outerNode) {
      var p = outerNode, hx = hole.x, hy = hole.y, qx = -Infinity, m;
      do {
        if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
          var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
          if (x <= hx && x > qx) {
            qx = x;
            m = p.x < p.next.x ? p : p.next;
            if (x === hx)
              return m;
          }
        }
        p = p.next;
      } while (p !== outerNode);
      if (!m)
        return null;
      var stop = m, mx = m.x, my = m.y, tanMin = Infinity, tan;
      p = m;
      do {
        if (hx >= p.x && p.x >= mx && hx !== p.x && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
          tan = Math.abs(hy - p.y) / (hx - p.x);
          if (locallyInside(p, hole) && (tan < tanMin || tan === tanMin && (p.x > m.x || p.x === m.x && sectorContainsSector(m, p)))) {
            m = p;
            tanMin = tan;
          }
        }
        p = p.next;
      } while (p !== stop);
      return m;
    }
    function sectorContainsSector(m, p) {
      return area(m.prev, m, p.prev) < 0 && area(p.next, m, m.next) < 0;
    }
    function indexCurve(start, minX, minY, invSize) {
      var p = start;
      do {
        if (p.z === 0)
          p.z = zOrder(p.x, p.y, minX, minY, invSize);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
      } while (p !== start);
      p.prevZ.nextZ = null;
      p.prevZ = null;
      sortLinked(p);
    }
    function sortLinked(list) {
      var i, p, q, e, tail, numMerges, pSize, qSize, inSize = 1;
      do {
        p = list;
        list = null;
        tail = null;
        numMerges = 0;
        while (p) {
          numMerges++;
          q = p;
          pSize = 0;
          for (i = 0; i < inSize; i++) {
            pSize++;
            q = q.nextZ;
            if (!q)
              break;
          }
          qSize = inSize;
          while (pSize > 0 || qSize > 0 && q) {
            if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
              e = p;
              p = p.nextZ;
              pSize--;
            } else {
              e = q;
              q = q.nextZ;
              qSize--;
            }
            if (tail)
              tail.nextZ = e;
            else
              list = e;
            e.prevZ = tail;
            tail = e;
          }
          p = q;
        }
        tail.nextZ = null;
        inSize *= 2;
      } while (numMerges > 1);
      return list;
    }
    function zOrder(x, y, minX, minY, invSize) {
      x = (x - minX) * invSize | 0;
      y = (y - minY) * invSize | 0;
      x = (x | x << 8) & 16711935;
      x = (x | x << 4) & 252645135;
      x = (x | x << 2) & 858993459;
      x = (x | x << 1) & 1431655765;
      y = (y | y << 8) & 16711935;
      y = (y | y << 4) & 252645135;
      y = (y | y << 2) & 858993459;
      y = (y | y << 1) & 1431655765;
      return x | y << 1;
    }
    function getLeftmost(start) {
      var p = start, leftmost = start;
      do {
        if (p.x < leftmost.x || p.x === leftmost.x && p.y < leftmost.y)
          leftmost = p;
        p = p.next;
      } while (p !== start);
      return leftmost;
    }
    function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
      return (cx - px) * (ay - py) >= (ax - px) * (cy - py) && (ax - px) * (by - py) >= (bx - px) * (ay - py) && (bx - px) * (cy - py) >= (cx - px) * (by - py);
    }
    function isValidDiagonal(a, b) {
      return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && // dones't intersect other edges
      (locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) && // locally visible
      (area(a.prev, a, b.prev) || area(a, b.prev, b)) || // does not create opposite-facing sectors
      equals6(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0);
    }
    function area(p, q, r) {
      return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    }
    function equals6(p1, p2) {
      return p1.x === p2.x && p1.y === p2.y;
    }
    function intersects(p1, q1, p2, q2) {
      var o1 = sign(area(p1, q1, p2));
      var o2 = sign(area(p1, q1, q2));
      var o3 = sign(area(p2, q2, p1));
      var o4 = sign(area(p2, q2, q1));
      if (o1 !== o2 && o3 !== o4)
        return true;
      if (o1 === 0 && onSegment(p1, p2, q1))
        return true;
      if (o2 === 0 && onSegment(p1, q2, q1))
        return true;
      if (o3 === 0 && onSegment(p2, p1, q2))
        return true;
      if (o4 === 0 && onSegment(p2, q1, q2))
        return true;
      return false;
    }
    function onSegment(p, q, r) {
      return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
    }
    function sign(num) {
      return num > 0 ? 1 : num < 0 ? -1 : 0;
    }
    function intersectsPolygon(a, b) {
      var p = a;
      do {
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && intersects(p, p.next, a, b))
          return true;
        p = p.next;
      } while (p !== a);
      return false;
    }
    function locallyInside(a, b) {
      return area(a.prev, a, a.next) < 0 ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
    }
    function middleInside(a, b) {
      var p = a, inside = false, px = (a.x + b.x) / 2, py = (a.y + b.y) / 2;
      do {
        if (p.y > py !== p.next.y > py && p.next.y !== p.y && px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x)
          inside = !inside;
        p = p.next;
      } while (p !== a);
      return inside;
    }
    function splitPolygon(a, b) {
      var a2 = new Node(a.i, a.x, a.y), b2 = new Node(b.i, b.x, b.y), an = a.next, bp = b.prev;
      a.next = b;
      b.prev = a;
      a2.next = an;
      an.prev = a2;
      b2.next = a2;
      a2.prev = b2;
      bp.next = b2;
      b2.prev = bp;
      return b2;
    }
    function insertNode(i, x, y, last) {
      var p = new Node(i, x, y);
      if (!last) {
        p.prev = p;
        p.next = p;
      } else {
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
      }
      return p;
    }
    function removeNode(p) {
      p.next.prev = p.prev;
      p.prev.next = p.next;
      if (p.prevZ)
        p.prevZ.nextZ = p.nextZ;
      if (p.nextZ)
        p.nextZ.prevZ = p.prevZ;
    }
    function Node(i, x, y) {
      this.i = i;
      this.x = x;
      this.y = y;
      this.prev = null;
      this.next = null;
      this.z = 0;
      this.prevZ = null;
      this.nextZ = null;
      this.steiner = false;
    }
    earcut2.deviation = function(data, holeIndices, dim, triangles) {
      var hasHoles = holeIndices && holeIndices.length;
      var outerLen = hasHoles ? holeIndices[0] * dim : data.length;
      var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
      if (hasHoles) {
        for (var i = 0, len4 = holeIndices.length; i < len4; i++) {
          var start = holeIndices[i] * dim;
          var end = i < len4 - 1 ? holeIndices[i + 1] * dim : data.length;
          polygonArea -= Math.abs(signedArea(data, start, end, dim));
        }
      }
      var trianglesArea = 0;
      for (i = 0; i < triangles.length; i += 3) {
        var a = triangles[i] * dim;
        var b = triangles[i + 1] * dim;
        var c = triangles[i + 2] * dim;
        trianglesArea += Math.abs(
          (data[a] - data[c]) * (data[b + 1] - data[a + 1]) - (data[a] - data[b]) * (data[c + 1] - data[a + 1])
        );
      }
      return polygonArea === 0 && trianglesArea === 0 ? 0 : Math.abs((trianglesArea - polygonArea) / polygonArea);
    };
    function signedArea(data, start, end, dim) {
      var sum = 0;
      for (var i = start, j = end - dim; i < end; i += dim) {
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
      }
      return sum;
    }
    earcut2.flatten = function(data) {
      var dim = data[0][0].length, result = { vertices: [], holes: [], dimensions: dim }, holeIndex = 0;
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
          for (var d = 0; d < dim; d++)
            result.vertices.push(data[i][j][d]);
        }
        if (i > 0) {
          holeIndex += data[i - 1].length;
          result.holes.push(holeIndex);
        }
      }
      return result;
    };
  }
});

// node_modules/@wonderlandengine/api/dist/index.js
var dist_exports = {};
__export(dist_exports, {
  APIVersion: () => APIVersion,
  Alignment: () => Alignment,
  Animation: () => Animation,
  AnimationComponent: () => AnimationComponent,
  AnimationState: () => AnimationState,
  BrokenComponent: () => BrokenComponent,
  Collider: () => Collider,
  CollisionComponent: () => CollisionComponent,
  CollisionEventType: () => CollisionEventType,
  Component: () => Component,
  DestroyedComponentInstance: () => DestroyedComponentInstance,
  DestroyedObjectInstance: () => DestroyedObjectInstance,
  DestroyedTextureInstance: () => DestroyedTextureInstance,
  Emitter: () => Emitter,
  ForceMode: () => ForceMode,
  I18N: () => I18N,
  InputComponent: () => InputComponent,
  InputType: () => InputType,
  Justification: () => Justification,
  LightComponent: () => LightComponent,
  LightType: () => LightType,
  LockAxis: () => LockAxis,
  Material: () => Material,
  MaterialParamType: () => MaterialParamType,
  Mesh: () => Mesh,
  MeshAttribute: () => MeshAttribute,
  MeshAttributeAccessor: () => MeshAttributeAccessor,
  MeshComponent: () => MeshComponent,
  MeshIndexType: () => MeshIndexType,
  MeshSkinningType: () => MeshSkinningType,
  Object: () => Object3D,
  Object3D: () => Object3D,
  PhysXComponent: () => PhysXComponent,
  Physics: () => Physics,
  Property: () => Property,
  RayHit: () => RayHit,
  RetainEmitter: () => RetainEmitter,
  Scene: () => Scene,
  Shape: () => Shape,
  Skin: () => Skin,
  TextComponent: () => TextComponent,
  TextEffect: () => TextEffect,
  Texture: () => Texture,
  TextureManager: () => TextureManager,
  Type: () => Type,
  ViewComponent: () => ViewComponent,
  WASM: () => WASM,
  WonderlandEngine: () => WonderlandEngine,
  XR: () => XR,
  checkRuntimeCompatibility: () => checkRuntimeCompatibility,
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
  Type2[Type2["Native"] = 1] = "Native";
  Type2[Type2["Bool"] = 2] = "Bool";
  Type2[Type2["Int"] = 4] = "Int";
  Type2[Type2["Float"] = 8] = "Float";
  Type2[Type2["String"] = 16] = "String";
  Type2[Type2["Enum"] = 32] = "Enum";
  Type2[Type2["Object"] = 64] = "Object";
  Type2[Type2["Mesh"] = 128] = "Mesh";
  Type2[Type2["Texture"] = 256] = "Texture";
  Type2[Type2["Material"] = 512] = "Material";
  Type2[Type2["Animation"] = 1024] = "Animation";
  Type2[Type2["Skin"] = 2048] = "Skin";
  Type2[Type2["Color"] = 4096] = "Color";
})(Type || (Type = {}));
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

// node_modules/@wonderlandengine/api/dist/utils/event.js
var Emitter = class {
  /**
   * List of listeners to trigger when `notify` is called.
   *
   * @hidden
   */
  _listeners = [];
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
    this._listeners.push({ id, once, callback: listener });
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
  /** Number of listeners. */
  get listenerCount() {
    return this._listeners.length;
  }
  /** `true` if it has no listeners, `false` otherwise. */
  get isEmpty() {
    return this.listenerCount === 0;
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
var Justification;
(function(Justification2) {
  Justification2[Justification2["Line"] = 0] = "Line";
  Justification2[Justification2["Middle"] = 1] = "Middle";
  Justification2[Justification2["Top"] = 2] = "Top";
  Justification2[Justification2["Bottom"] = 3] = "Bottom";
})(Justification || (Justification = {}));
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
var MaterialParamType;
(function(MaterialParamType2) {
  MaterialParamType2[MaterialParamType2["UnsignedInt"] = 0] = "UnsignedInt";
  MaterialParamType2[MaterialParamType2["Int"] = 1] = "Int";
  MaterialParamType2[MaterialParamType2["Float"] = 2] = "Float";
  MaterialParamType2[MaterialParamType2["Sampler"] = 3] = "Sampler";
  MaterialParamType2[MaterialParamType2["Font"] = 4] = "Font";
})(MaterialParamType || (MaterialParamType = {}));
function createDestroyedProxy(type) {
  return new Proxy({}, {
    get(_, param) {
      if (param === "isDestroyed")
        return true;
      throw new Error(`Canno't read '${param}' of destroyed ${type}`);
    },
    set(_, param) {
      throw new Error(`Canno't write '${param}' of destroyed ${type}`);
    }
  });
}
var DestroyedObjectInstance = createDestroyedProxy("object");
var DestroyedComponentInstance = createDestroyedProxy("component");
var DestroyedTextureInstance = createDestroyedProxy("texture");
function isMeshShape(shape) {
  return shape === Shape.ConvexMesh || shape === Shape.TriangleMesh;
}
function isBaseComponentClass(value) {
  return !!value && value.hasOwnProperty("_isBaseComponent") && value._isBaseComponent;
}
var UP_VECTOR = [0, 1, 0];
var SQRT_3 = Math.sqrt(3);
var Component = class {
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
  /** Instance index. @hidden */
  _id;
  /**
   * Object containing this object.
   *
   * **Note**: This is cached for faster retrieval.
   *
   * @hidden
   */
  _object;
  /** Wonderland Engine instance. @hidden */
  _engine;
  /**
   * Create a new instance
   *
   * @param engine The engine instance.
   * @param manager Index of the manager.
   * @param id WASM component instance index.
   *
   * @hidden
   */
  constructor(engine2, manager = -1, id = -1) {
    this._engine = engine2;
    this._manager = manager;
    this._id = id;
    this._object = null;
  }
  /** Hosting engine instance. */
  get engine() {
    return this._engine;
  }
  /** The name of this component's type */
  get type() {
    const ctor = this.constructor;
    return ctor.TypeName ?? this._engine.wasm._typeNameFor(this._manager);
  }
  /** The object this component is attached to. */
  get object() {
    if (!this._object) {
      const objectId = this._engine.wasm._wl_component_get_object(this._manager, this._id);
      this._object = this._engine.wrapObject(objectId);
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
    this._engine.wasm._wl_component_setActive(this._manager, this._id, active);
  }
  /**
   * Whether this component is active
   */
  get active() {
    return this._engine.wasm._wl_component_isActive(this._manager, this._id) != 0;
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
    for (const name in ctor.Properties) {
      const value = src[name];
      if (value !== void 0) {
        this[name] = value;
      }
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
    const jsManager = this.engine.wasm._jsManagerIndex;
    this._engine.wasm._wl_component_remove(manager, this._id);
    if (manager !== jsManager)
      this._triggerOnDestroy();
  }
  /**
   * Checks equality by comparing whether the wrapped native component ids
   * and component manager types are equal.
   *
   * @param otherComponent Component to check equality with.
   * @returns Whether this component equals the given component.
   */
  equals(otherComponent) {
    if (!otherComponent)
      return false;
    return this._manager == otherComponent._manager && this._id == otherComponent._id;
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
      this[name] = properties[name].default;
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
        console.error(`Exception during ${this.type} init() on object ${this.object.name}`);
        console.error(e);
      }
    }
    const oldActivate = this.onActivate;
    this.onActivate = function() {
      this.onActivate = oldActivate;
      let failed = false;
      try {
        this.validateProperties();
      } catch (e) {
        console.error(`Exception during ${this.type} validateProperties() on object ${this.object.name}`);
        console.error(e);
        failed = true;
      }
      try {
        this.start?.();
      } catch (e) {
        console.error(`Exception during ${this.type} start() on object ${this.object.name}`);
        console.error(e);
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
        console.error(`Exception during ${this.type} onActivate() on object ${this.object.name}`);
        console.error(e);
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
      console.error(`Exception during ${this.type} update() on object ${this.object.name}`);
      console.error(e);
      if (this._engine.wasm._deactivate_component_on_error) {
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
      console.error(`Exception during ${this.type} onActivate() on object ${this.object.name}`);
      console.error(e);
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
      console.error(`Exception during ${this.type} onDeactivate() on object ${this.object.name}`);
      console.error(e);
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
      console.error(`Exception during ${this.type} onDestroy() on object ${this.object.name}`);
      console.error(e);
    }
    this._engine._destroyComponent(this);
  }
};
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
      chain.push(comp.Properties);
    }
    curr = Object.getPrototypeOf(curr);
  }
  if (chain.length <= 1)
    return;
  const merged = {};
  for (let i = chain.length - 1; i >= 0; --i) {
    Object.assign(merged, chain[i]);
  }
  target.Properties = merged;
}
var _CollisionComponent = class extends Component {
  /** Collision component collider */
  get collider() {
    return this._engine.wasm._wl_collision_component_get_collider(this._id);
  }
  /**
   * Set collision component collider.
   *
   * @param collider Collider of the collision component.
   */
  set collider(collider) {
    this._engine.wasm._wl_collision_component_set_collider(this._id, collider);
  }
  /**
   * Collision component extents.
   *
   * If {@link collider} returns {@link Collider.Sphere}, only the first
   * component of the returned vector is used.
   */
  get extents() {
    const wasm = this._engine.wasm;
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
    this.extents.set(extents);
  }
  /**
   * Get collision component radius.
   *
   * @note If {@link collider} is not {@link Collider.Sphere}, the returned value
   * corresponds to the radius of a sphere enclosing the shape.
   *
   * Example:
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
    const wasm = this._engine.wasm;
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
   * ```js
   * aabbCollision.radius = 2.0; // AABB fits a sphere of radius 2.0
   * boxCollision.radius = 3.0; // Box now fits a sphere of radius 3.0, keeping orientation
   * ```
   *
   */
  set radius(radius) {
    const length5 = this.collider === Collider.Sphere ? radius : 2 * radius / SQRT_3;
    this.extents.set([length5, length5, length5]);
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
    return this._engine.wasm._wl_collision_component_get_group(this._id);
  }
  /**
   * Set collision component group.
   *
   * @param group Group mask of the collision component.
   */
  set group(group) {
    this._engine.wasm._wl_collision_component_set_group(this._id, group);
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
    const count = this._engine.wasm._wl_collision_component_query_overlaps(this._id, this._engine.wasm._tempMem, this._engine.wasm._tempMemSize >> 1);
    const overlaps = new Array(count);
    for (let i = 0; i < count; ++i) {
      overlaps[i] = new _CollisionComponent(this._engine, this._manager, this._engine.wasm._tempMemUint16[i]);
    }
    return overlaps;
  }
};
var CollisionComponent = _CollisionComponent;
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
    return this._engine.wasm._wl_text_component_get_horizontal_alignment(this._id);
  }
  /**
   * Set text component alignment.
   *
   * @param alignment Alignment for the text component.
   */
  set alignment(alignment) {
    this._engine.wasm._wl_text_component_set_horizontal_alignment(this._id, alignment);
  }
  /** Text component justification. */
  get justification() {
    return this._engine.wasm._wl_text_component_get_vertical_alignment(this._id);
  }
  /**
   * Set text component justification.
   *
   * @param justification Justification for the text component.
   */
  set justification(justification) {
    this._engine.wasm._wl_text_component_set_vertical_alignment(this._id, justification);
  }
  /** Text component character spacing. */
  get characterSpacing() {
    return this._engine.wasm._wl_text_component_get_character_spacing(this._id);
  }
  /**
   * Set text component character spacing.
   *
   * @param spacing Character spacing for the text component.
   */
  set characterSpacing(spacing) {
    this._engine.wasm._wl_text_component_set_character_spacing(this._id, spacing);
  }
  /** Text component line spacing. */
  get lineSpacing() {
    return this._engine.wasm._wl_text_component_get_line_spacing(this._id);
  }
  /**
   * Set text component line spacing
   *
   * @param spacing Line spacing for the text component
   */
  set lineSpacing(spacing) {
    this._engine.wasm._wl_text_component_set_line_spacing(this._id, spacing);
  }
  /** Text component effect. */
  get effect() {
    return this._engine.wasm._wl_text_component_get_effect(this._id);
  }
  /**
   * Set text component effect
   *
   * @param effect Effect for the text component
   */
  set effect(effect) {
    this._engine.wasm._wl_text_component_set_effect(this._id, effect);
  }
  /** Text component text. */
  get text() {
    const wasm = this._engine.wasm;
    const ptr = wasm._wl_text_component_get_text(this._id);
    return wasm.UTF8ToString(ptr);
  }
  /**
   * Set text component text.
   *
   * @param text Text of the text component.
   */
  set text(text) {
    const wasm = this._engine.wasm;
    wasm._wl_text_component_set_text(this._id, wasm.tempUTF8(text.toString()));
  }
  /**
   * Set material to render the text with.
   *
   * @param material New material.
   */
  set material(material) {
    const matIndex = material ? material._index : 0;
    this._engine.wasm._wl_text_component_set_material(this._id, matIndex);
  }
  /** Material used to render the text. */
  get material() {
    const id = this._engine.wasm._wl_text_component_get_material(this._id);
    return id > 0 ? new Material(this._engine, id) : null;
  }
};
/** @override */
__publicField(TextComponent, "TypeName", "text");
__decorate([
  nativeProperty()
], TextComponent.prototype, "alignment", null);
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
  /** Projection matrix. */
  get projectionMatrix() {
    const wasm = this._engine.wasm;
    return new Float32Array(wasm.HEAPF32.buffer, wasm._wl_view_component_get_projection_matrix(this._id), 16);
  }
  /** ViewComponent near clipping plane value. */
  get near() {
    return this._engine.wasm._wl_view_component_get_near(this._id);
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
    this._engine.wasm._wl_view_component_set_near(this._id, near);
  }
  /** Far clipping plane value. */
  get far() {
    return this._engine.wasm._wl_view_component_get_far(this._id);
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
    this._engine.wasm._wl_view_component_set_far(this._id, far);
  }
  /**
   * Get the horizontal field of view for the view, **in degrees**.
   *
   * If an XR session is active, this returns the field of view reported by
   * the device, regardless of the fov that was set.
   */
  get fov() {
    return this._engine.wasm._wl_view_component_get_fov(this._id);
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
    this._engine.wasm._wl_view_component_set_fov(this._id, fov);
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
    return this._engine.wasm._wl_input_component_get_type(this._id);
  }
  /**
   * Set input component type.
   *
   * @params New input component type.
   */
  set inputType(type) {
    this._engine.wasm._wl_input_component_set_type(this._id, type);
  }
  /**
   * WebXR Device API input source associated with this input component,
   * if type {@link InputType.ControllerLeft} or {@link InputType.ControllerRight}.
   */
  get xrInputSource() {
    const xrSession = this._engine.xrSession;
    if (xrSession) {
      for (let inputSource of xrSession.inputSources) {
        if (inputSource.handedness == this.handedness) {
          return inputSource;
        }
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
    const wasm = this._engine.wasm;
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
    const wasm = this._engine.wasm;
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
    const wasm = this._engine.wasm;
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
    return this._engine.wasm._wl_light_component_get_type(this._id);
  }
  /**
   * Set light type.
   *
   * @param lightType Type of the light component.
   */
  set lightType(t) {
    this._engine.wasm._wl_light_component_set_type(this._id, t);
  }
  /**
   * Light intensity.
   * @since 1.0.0
   */
  get intensity() {
    return this._engine.wasm._wl_light_component_get_intensity(this._id);
  }
  /**
   * Set light intensity.
   *
   * @param intensity Intensity of the light component.
   * @since 1.0.0
   */
  set intensity(intensity) {
    this._engine.wasm._wl_light_component_set_intensity(this._id, intensity);
  }
  /**
   * Outer angle for spot lights, in degrees.
   * @since 1.0.0
   */
  get outerAngle() {
    return this._engine.wasm._wl_light_component_get_outerAngle(this._id);
  }
  /**
   * Set outer angle for spot lights.
   *
   * @param angle Outer angle, in degrees.
   * @since 1.0.0
   */
  set outerAngle(angle2) {
    this._engine.wasm._wl_light_component_set_outerAngle(this._id, angle2);
  }
  /**
   * Inner angle for spot lights, in degrees.
   * @since 1.0.0
   */
  get innerAngle() {
    return this._engine.wasm._wl_light_component_get_innerAngle(this._id);
  }
  /**
   * Set inner angle for spot lights.
   *
   * @param angle Inner angle, in degrees.
   * @since 1.0.0
   */
  set innerAngle(angle2) {
    this._engine.wasm._wl_light_component_set_innerAngle(this._id, angle2);
  }
  /**
   * Whether the light casts shadows.
   * @since 1.0.0
   */
  get shadows() {
    return !!this._engine.wasm._wl_light_component_get_shadows(this._id);
  }
  /**
   * Set whether the light casts shadows.
   *
   * @param b Whether the light casts shadows.
   * @since 1.0.0
   */
  set shadows(b) {
    this._engine.wasm._wl_light_component_set_shadows(this._id, b);
  }
  /**
   * Range for shadows.
   * @since 1.0.0
   */
  get shadowRange() {
    return this._engine.wasm._wl_light_component_get_shadowRange(this._id);
  }
  /**
   * Set range for shadows.
   *
   * @param range Range for shadows.
   * @since 1.0.0
   */
  set shadowRange(range) {
    this._engine.wasm._wl_light_component_set_shadowRange(this._id, range);
  }
  /**
   * Bias value for shadows.
   * @since 1.0.0
   */
  get shadowBias() {
    return this._engine.wasm._wl_light_component_get_shadowBias(this._id);
  }
  /**
   * Set bias value for shadows.
   *
   * @param bias Bias for shadows.
   * @since 1.0.0
   */
  set shadowBias(bias) {
    this._engine.wasm._wl_light_component_set_shadowBias(this._id, bias);
  }
  /**
   * Normal bias value for shadows.
   * @since 1.0.0
   */
  get shadowNormalBias() {
    return this._engine.wasm._wl_light_component_get_shadowNormalBias(this._id);
  }
  /**
   * Set normal bias value for shadows.
   *
   * @param bias Normal bias for shadows.
   * @since 1.0.0
   */
  set shadowNormalBias(bias) {
    this._engine.wasm._wl_light_component_set_shadowNormalBias(this._id, bias);
  }
  /**
   * Texel size for shadows.
   * @since 1.0.0
   */
  get shadowTexelSize() {
    return this._engine.wasm._wl_light_component_get_shadowTexelSize(this._id);
  }
  /**
   * Set texel size for shadows.
   *
   * @param size Texel size for shadows.
   * @since 1.0.0
   */
  set shadowTexelSize(size) {
    this._engine.wasm._wl_light_component_set_shadowTexelSize(this._id, size);
  }
  /**
   * Cascade count for {@link LightType.Sun} shadows.
   * @since 1.0.0
   */
  get cascadeCount() {
    return this._engine.wasm._wl_light_component_get_cascadeCount(this._id);
  }
  /**
   * Set cascade count for {@link LightType.Sun} shadows.
   *
   * @param count Cascade count.
   * @since 1.0.0
   */
  set cascadeCount(count) {
    this._engine.wasm._wl_light_component_set_cascadeCount(this._id, count);
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
   * Set animation to play.
   *
   * Make sure to {@link Animation#retarget} the animation to affect the
   * right objects.
   *
   * @param anim Animation to play.
   */
  set animation(anim) {
    this._engine.wasm._wl_animation_component_set_animation(this._id, anim ? anim._index : 0);
  }
  /** Animation set for this component */
  get animation() {
    const id = this._engine.wasm._wl_animation_component_get_animation(this._id);
    return id > 0 ? new Animation(this._engine, id) : null;
  }
  /**
   * Set play count. Set to `0` to loop indefinitely.
   *
   * @param playCount Number of times to repeat the animation.
   */
  set playCount(playCount) {
    this._engine.wasm._wl_animation_component_set_playCount(this._id, playCount);
  }
  /** Number of times the animation is played. */
  get playCount() {
    return this._engine.wasm._wl_animation_component_get_playCount(this._id);
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
    this._engine.wasm._wl_animation_component_set_speed(this._id, speed);
  }
  /**
   * Speed factor at which the animation is played.
   *
   * @since 0.8.10
   */
  get speed() {
    return this._engine.wasm._wl_animation_component_get_speed(this._id);
  }
  /** Current playing state of the animation */
  get state() {
    return this._engine.wasm._wl_animation_component_state(this._id);
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
    this._engine.wasm._wl_animation_component_play(this._id);
  }
  /** Stop animation. */
  stop() {
    this._engine.wasm._wl_animation_component_stop(this._id);
  }
  /** Pause animation. */
  pause() {
    this._engine.wasm._wl_animation_component_pause(this._id);
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
    this._engine.wasm._wl_mesh_component_set_material(this._id, material ? material._index : 0);
  }
  /** Material used to render the mesh. */
  get material() {
    const id = this._engine.wasm._wl_mesh_component_get_material(this._id);
    return id > 0 ? new Material(this._engine, id) : null;
  }
  /** Mesh rendered by this component. */
  get mesh() {
    const id = this._engine.wasm._wl_mesh_component_get_mesh(this._id);
    return id > 0 ? new Mesh(this._engine, id) : null;
  }
  /**
   * Set mesh to rendered with this component.
   *
   * @param mesh Mesh rendered by this component.
   */
  set mesh(mesh) {
    this._engine.wasm._wl_mesh_component_set_mesh(this._id, mesh ? mesh._index : 0);
  }
  /** Skin for this mesh component. */
  get skin() {
    const id = this._engine.wasm._wl_mesh_component_get_skin(this._id);
    return id > 0 ? new Skin(this._engine, id) : null;
  }
  /**
   * Set skin to transform this mesh component.
   *
   * @param skin Skin to use for rendering skinned meshes.
   */
  set skin(skin) {
    this._engine.wasm._wl_mesh_component_set_skin(this._id, skin ? skin._index : 0);
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
var LockAxis;
(function(LockAxis2) {
  LockAxis2[LockAxis2["None"] = 0] = "None";
  LockAxis2[LockAxis2["X"] = 1] = "X";
  LockAxis2[LockAxis2["Y"] = 2] = "Y";
  LockAxis2[LockAxis2["Z"] = 4] = "Z";
})(LockAxis || (LockAxis = {}));
var PhysXComponent = class extends Component {
  getTranslationOffset(out = new Float32Array(3)) {
    const wasm = this._engine.wasm;
    wasm._wl_physx_component_get_offsetTranslation(this._id, wasm._tempMem);
    out[0] = wasm._tempMemFloat[0];
    out[1] = wasm._tempMemFloat[1];
    out[2] = wasm._tempMemFloat[2];
    return out;
  }
  getRotationOffset(out = new Float32Array(4)) {
    const wasm = this._engine.wasm;
    const ptr = wasm._wl_physx_component_get_offsetTransform(this._id) >> 2;
    out[0] = wasm.HEAPF32[ptr];
    out[1] = wasm.HEAPF32[ptr + 1];
    out[2] = wasm.HEAPF32[ptr + 2];
    out[3] = wasm.HEAPF32[ptr + 3];
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
    this._engine.wasm._wl_physx_component_set_static(this._id, b);
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
    return !!this._engine.wasm._wl_physx_component_get_static(this._id);
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
  set translationOffset(offset2) {
    const wasm = this._engine.wasm;
    wasm._wl_physx_component_set_offsetTranslation(this._id, offset2[0], offset2[1], offset2[2]);
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
  set rotationOffset(offset2) {
    const wasm = this._engine.wasm;
    wasm._wl_physx_component_set_offsetRotation(this._id, offset2[0], offset2[1], offset2[2], offset2[3]);
  }
  /**
   * Set whether this rigid body is kinematic.
   *
   * @param b Whether the rigid body should be kinematic.
   */
  set kinematic(b) {
    this._engine.wasm._wl_physx_component_set_kinematic(this._id, b);
  }
  /**
   * Whether this rigid body is kinematic.
   */
  get kinematic() {
    return !!this._engine.wasm._wl_physx_component_get_kinematic(this._id);
  }
  /**
   * Set whether this rigid body's gravity is enabled.
   *
   * @param b Whether the rigid body's gravity should be enabled.
   */
  set gravity(b) {
    this._engine.wasm._wl_physx_component_set_gravity(this._id, b);
  }
  /**
   * Whether this rigid body's gravity flag is enabled.
   */
  get gravity() {
    return !!this._engine.wasm._wl_physx_component_get_gravity(this._id);
  }
  /**
   * Set whether this rigid body's simulate flag is enabled.
   *
   * @param b Whether the rigid body's simulate flag should be enabled.
   */
  set simulate(b) {
    this._engine.wasm._wl_physx_component_set_simulate(this._id, b);
  }
  /**
   * Whether this rigid body's simulate flag is enabled.
   */
  get simulate() {
    return !!this._engine.wasm._wl_physx_component_get_simulate(this._id);
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
    this._engine.wasm._wl_physx_component_set_allowSimulation(this._id, b);
  }
  /**
   * Whether to allow simulation of this rigid body.
   */
  get allowSimulation() {
    return !!this._engine.wasm._wl_physx_component_get_allowSimulation(this._id);
  }
  /**
   * Set whether this rigid body may be queried in ray casts.
   *
   * @param b Whether this rigid body may be queried in ray casts.
   */
  set allowQuery(b) {
    this._engine.wasm._wl_physx_component_set_allowQuery(this._id, b);
  }
  /**
   * Whether this rigid body may be queried in ray casts.
   */
  get allowQuery() {
    return !!this._engine.wasm._wl_physx_component_get_allowQuery(this._id);
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
    this._engine.wasm._wl_physx_component_set_trigger(this._id, b);
  }
  /**
   * Whether this physics body is a trigger.
   */
  get trigger() {
    return !!this._engine.wasm._wl_physx_component_get_trigger(this._id);
  }
  /**
   * Set the shape for collision detection.
   *
   * @param s New shape.
   * @since 0.8.5
   */
  set shape(s) {
    this._engine.wasm._wl_physx_component_set_shape(this._id, s);
  }
  /** The shape for collision detection. */
  get shape() {
    return this._engine.wasm._wl_physx_component_get_shape(this._id);
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
    this._engine.wasm._wl_physx_component_set_shape_data(this._id, d.index);
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
      index: this._engine.wasm._wl_physx_component_get_shape_data(this._id)
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
   * The shape extents for collision detection.
   */
  get extents() {
    const wasm = this._engine.wasm;
    const ptr = wasm._wl_physx_component_get_extents(this._id);
    return new Float32Array(wasm.HEAPF32.buffer, ptr, 3);
  }
  /**
   * Get staticFriction.
   */
  get staticFriction() {
    return this._engine.wasm._wl_physx_component_get_staticFriction(this._id);
  }
  /**
   * Set staticFriction.
   * @param v New staticFriction.
   */
  set staticFriction(v) {
    this._engine.wasm._wl_physx_component_set_staticFriction(this._id, v);
  }
  /**
   * Get dynamicFriction.
   */
  get dynamicFriction() {
    return this._engine.wasm._wl_physx_component_get_dynamicFriction(this._id);
  }
  /**
   * Set dynamicFriction
   * @param v New dynamicDamping.
   */
  set dynamicFriction(v) {
    this._engine.wasm._wl_physx_component_set_dynamicFriction(this._id, v);
  }
  /**
   * Get bounciness.
   * @since 0.9.0
   */
  get bounciness() {
    return this._engine.wasm._wl_physx_component_get_bounciness(this._id);
  }
  /**
   * Set bounciness.
   * @param v New bounciness.
   * @since 0.9.0
   */
  set bounciness(v) {
    this._engine.wasm._wl_physx_component_set_bounciness(this._id, v);
  }
  /**
   * Get linearDamping/
   */
  get linearDamping() {
    return this._engine.wasm._wl_physx_component_get_linearDamping(this._id);
  }
  /**
   * Set linearDamping.
   * @param v New linearDamping.
   */
  set linearDamping(v) {
    this._engine.wasm._wl_physx_component_set_linearDamping(this._id, v);
  }
  /** Get angularDamping. */
  get angularDamping() {
    return this._engine.wasm._wl_physx_component_get_angularDamping(this._id);
  }
  /**
   * Set angularDamping.
   * @param v New angularDamping.
   */
  set angularDamping(v) {
    this._engine.wasm._wl_physx_component_set_angularDamping(this._id, v);
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
    this._engine.wasm._wl_physx_component_set_linearVelocity(this._id, v[0], v[1], v[2]);
  }
  /** Linear velocity or `[0, 0, 0]` if the component is not active. */
  get linearVelocity() {
    const wasm = this._engine.wasm;
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
    this._engine.wasm._wl_physx_component_set_angularVelocity(this._id, v[0], v[1], v[2]);
  }
  /** Angular velocity or `[0, 0, 0]` if the component is not active. */
  get angularVelocity() {
    const wasm = this._engine.wasm;
    wasm._wl_physx_component_get_angularVelocity(this._id, wasm._tempMem);
    return new Float32Array(wasm.HEAPF32.buffer, wasm._tempMem, 3);
  }
  /**
   * Set the components groups mask.
   *
   * @param flags New flags that need to be set.
   */
  set groupsMask(flags) {
    this._engine.wasm._wl_physx_component_set_groupsMask(this._id, flags);
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
    return this._engine.wasm._wl_physx_component_get_groupsMask(this._id);
  }
  /**
   * Set the components blocks mask.
   *
   * @param flags New flags that need to be set.
   */
  set blocksMask(flags) {
    this._engine.wasm._wl_physx_component_set_blocksMask(this._id, flags);
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
    return this._engine.wasm._wl_physx_component_get_blocksMask(this._id);
  }
  /**
   * Set axes to lock for linear velocity.
   *
   * @param lock The Axis that needs to be set.
   *
   * Combine flags with Bitwise OR.
   * ```js
   * body.linearLockAxis = LockAxis.X | LockAxis.Y; // x and y set
   * body.linearLockAxis = LockAxis.X; // y unset
   * ```
   *
   * @note This has no effect if the component is static.
   */
  set linearLockAxis(lock) {
    this._engine.wasm._wl_physx_component_set_linearLockAxis(this._id, lock);
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
    return this._engine.wasm._wl_physx_component_get_linearLockAxis(this._id);
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
    this._engine.wasm._wl_physx_component_set_angularLockAxis(this._id, lock);
  }
  /**
   * Get the angular lock axes flags.
   *
   * To get the state of a specific flag, Bitwise AND with the LockAxis needed.
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
    return this._engine.wasm._wl_physx_component_get_angularLockAxis(this._id);
  }
  /**
   * Set mass.
   *
   * [PhysX Manual - "Mass Properties"](https://gameworksdocs.nvidia.com/PhysX/4.1/documentation/physxguide/Manual/RigidBodyDynamics.html#mass-properties)
   *
   * @param m New mass.
   */
  set mass(m) {
    this._engine.wasm._wl_physx_component_set_mass(this._id, m);
  }
  /** Mass */
  get mass() {
    return this._engine.wasm._wl_physx_component_get_mass(this._id);
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
    this._engine.wasm._wl_physx_component_set_massSpaceInertiaTensor(this._id, v[0], v[1], v[2]);
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
    const wasm = this._engine.wasm;
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
    this._engine.wasm._wl_physx_component_addTorque(this._id, f[0], f[1], f[2], m);
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
    const physics = this._engine.physics;
    physics._callbacks[this._id] = physics._callbacks[this._id] || [];
    physics._callbacks[this._id].push(callback);
    return this._engine.wasm._wl_physx_component_addCallback(this._id, otherComp._id || this._id);
  }
  /**
   * Remove a collision callback added with {@link PhysXComponent#onCollision} or {@link PhysXComponent#onCollisionWith}.
   *
   * @param callbackId Callback id as returned by {@link PhysXComponent#onCollision} or {@link PhysXComponent#onCollisionWith}.
   * @throws When the callback does not belong to the component.
   * @throws When the callback does not exist.
   */
  removeCollisionCallback(callbackId) {
    const physics = this._engine.physics;
    const r = this._engine.wasm._wl_physx_component_removeCallback(this._id, callbackId);
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
var Physics = class {
  /**
   * @hidden
   *
   * **Note**: This is public to emulate a `friend` accessor.
   */
  _callbacks;
  /** Wonderland Engine instance */
  _engine;
  /** Ray Hit */
  _rayHit;
  /** Hit. */
  _hit;
  constructor(engine2) {
    this._engine = engine2;
    this._rayHit = engine2.wasm._malloc(4 * (3 * 4 + 3 * 4 + 4 + 2) + 4);
    this._hit = new RayHit(this._engine, this._rayHit);
    this._callbacks = {};
  }
  /**
   * Cast a ray through the physics scene and find intersecting objects.
   *
   * The resulting ray hit will contain **up to 4** closest ray hits,
   * sorted by increasing distance.
   *
   * @param o Ray origin.
   * @param d Ray direction.
   * @param group Collision group to filter by: only objects that are
   *        part of given group are considered for raycast.
   * @param maxDistance Maximum ray distance, default `100.0`.
   *
   * @returns The RayHit instance, belonging to this class.
   *
   * @note The returned {@link RayHit} object is owned by the Physics instance and
   *       will be reused with the next {@link Physics#rayCast} call.
   */
  rayCast(o, d, group, maxDistance = 100) {
    this._engine.wasm._wl_physx_ray_cast(o[0], o[1], o[2], d[0], d[1], d[2], group, maxDistance, this._rayHit);
    return this._hit;
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
var Mesh = class {
  /**
   * Index of the mesh in the manager.
   *
   * @hidden
   */
  _index = -1;
  /** Wonderland Engine instance. @hidden */
  _engine;
  /**
   * Create a new instance.
   *
   * @param params Either a mesh index to wrap or set of parameters to create a new mesh.
   *    For more information, please have a look at the {@link MeshParameters} interface.
   */
  constructor(engine2, params) {
    this._engine = engine2 ?? WL;
    this._index = -1;
    if (isNumber(params)) {
      this._index = params;
      return;
    }
    if (!params.vertexCount)
      throw new Error("Missing parameter 'vertexCount'");
    const wasm = this._engine.wasm;
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
    this._index = wasm._wl_mesh_create(indexData, indexDataSize, indexType, params.vertexCount, skinningType);
  }
  /** Number of vertices in this mesh. */
  get vertexCount() {
    return this._engine.wasm._wl_mesh_get_vertexCount(this._index);
  }
  /** Index data (read-only) or `null` if the mesh is not indexed. */
  get indexData() {
    const wasm = this._engine.wasm;
    const tempMem = wasm._tempMem;
    const ptr = wasm._wl_mesh_get_indexData(this._index, tempMem, tempMem + 4);
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
  /** Hosting engine instance. */
  get engine() {
    return this._engine;
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
    this._engine.wasm._wl_mesh_update(this._index);
  }
  getBoundingSphere(out = new Float32Array(4)) {
    const tempMemFloat = this._engine.wasm._tempMemFloat;
    this._engine.wasm._wl_mesh_get_boundingSphere(this._index, this._engine.wasm._tempMem);
    out[0] = tempMemFloat[0];
    out[1] = tempMemFloat[1];
    out[2] = tempMemFloat[2];
    out[3] = tempMemFloat[3];
    return out;
  }
  attribute(attr) {
    if (typeof attr != "number")
      throw new TypeError("Expected number, but got " + typeof attr);
    const tempMemUint32 = this._engine.wasm._tempMemUint32;
    this._engine.wasm._wl_mesh_get_attribute(this._index, attr, this._engine.wasm._tempMem);
    if (tempMemUint32[0] == 255)
      return null;
    const arraySize = tempMemUint32[5];
    return new MeshAttributeAccessor(this._engine, {
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
    this._engine.wasm._wl_mesh_destroy(this._index);
  }
  /**
   * Checks equality by comparing whether the wrapped native mesh ids are
   * equal.
   *
   * @param otherMesh Mesh to check equality with.
   * @returns Whether this mesh equals the given mesh.
   *
   * @since 1.0.0
   */
  equals(otherMesh) {
    if (!otherMesh)
      return false;
    return this._index === otherMesh._index;
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
};
var Material = class {
  /**
   * Index of this material in the manager.
   *
   * @hidden
   */
  _index;
  /**
   * Material definition index in the scene.
   *
   * @hidden
   */
  _definition;
  /** Wonderland Engine instance. @hidden */
  _engine;
  /**
   * Create a new Material.
   *
   * @note Creating material is expensive. Please use {@link Material#clone} to clone a material.
   * @note Do not use this constructor directly with an index, this is reserved for internal purposes.
   */
  constructor(engine2, params) {
    this._engine = engine2;
    if (typeof params !== "number") {
      if (!params?.pipeline)
        throw new Error("Missing parameter 'pipeline'");
      const wasm = this._engine.wasm;
      const pipeline = params.pipeline;
      this._index = wasm._wl_material_create(wasm.tempUTF8(pipeline));
      if (this._index < 0)
        throw new Error(`No such pipeline '${pipeline}'`);
    } else {
      this._index = params;
    }
    this._definition = this._engine.wasm._wl_material_get_definition(this._index);
    if (!this._engine.wasm._materialDefinitions[this._definition])
      throw new Error(`Material Definition ${this._definition} not found for material with index ${this._index}`);
    return new Proxy(this, {
      get(target, prop) {
        const wasm = engine2.wasm;
        const definition = wasm._materialDefinitions[target._definition];
        const param = definition.get(prop);
        if (!param)
          return target[prop];
        if (wasm._wl_material_get_param_value(target._index, param.index, wasm._tempMem)) {
          const type = param.type;
          switch (type.type) {
            case MaterialParamType.UnsignedInt:
              return type.componentCount == 1 ? wasm._tempMemUint32[0] : new Uint32Array(wasm.HEAPU32.buffer, wasm._tempMem, type.componentCount);
            case MaterialParamType.Int:
              return type.componentCount == 1 ? wasm._tempMemInt[0] : new Int32Array(wasm.HEAP32.buffer, wasm._tempMem, type.componentCount);
            case MaterialParamType.Float:
              return type.componentCount == 1 ? wasm._tempMemFloat[0] : new Float32Array(wasm.HEAPF32.buffer, wasm._tempMem, type.componentCount);
            case MaterialParamType.Sampler:
              return engine2.textures.wrap(wasm._tempMemInt[0]);
            default:
              throw new Error(`Invalid type ${type.type} on parameter ${param.index} for material ${target._index}`);
          }
        }
      },
      set(target, prop, value) {
        const wasm = engine2.wasm;
        const definition = wasm._materialDefinitions[target._definition];
        const param = definition.get(prop);
        if (!param) {
          target[prop] = value;
          return true;
        }
        const type = param.type;
        switch (type.type) {
          case MaterialParamType.UnsignedInt:
          case MaterialParamType.Int:
          case MaterialParamType.Sampler:
            const v = value.id ?? value;
            wasm._wl_material_set_param_value_uint(target._index, param.index, v);
            break;
          case MaterialParamType.Float:
            let count = 1;
            if (typeof value === "number") {
              wasm._tempMemFloat[0] = value;
            } else {
              count = value.length;
              for (let i = 0; i < count; ++i)
                wasm._tempMemFloat[i] = value[i];
            }
            wasm._wl_material_set_param_value_float(target._index, param.index, wasm._tempMem, count);
            break;
          case MaterialParamType.Font:
            throw new Error("Setting font properties is currently unsupported.");
        }
        return true;
      }
    });
  }
  /** @deprecated Use {@link #pipeline} instead. */
  get shader() {
    return this.pipeline;
  }
  /** Name of the pipeline used by this material. */
  get pipeline() {
    const wasm = this._engine.wasm;
    return wasm.UTF8ToString(wasm._wl_material_get_pipeline(this._index));
  }
  /** Hosting engine instance. */
  get engine() {
    return this._engine;
  }
  /**
   * Create a copy of the underlying native material.
   *
   * @returns Material clone.
   */
  clone() {
    const id = this._engine.wasm._wl_material_clone(this._index);
    return id > 0 ? new Material(this._engine, id) : null;
  }
  /**
   * Checks equality by comparing whether the wrapped native material ids are
   * equal.
   *
   * @param otherMaterial Material to check equality with.
   * @returns Whether this material equals the given material.
   *
   * @since 1.0.0
   */
  equals(otherMaterial) {
    if (!otherMaterial)
      return false;
    return this._index === otherMaterial._index;
  }
  /**
   * Wrap a native material index.
   *
   * @param engine Engine instance.
   * @param index The index.
   * @returns Material instance or `null` if index <= 0.
   *
   * @deprecated Please use `new Material()` instead.
   */
  static wrap(engine2, index) {
    return index > 0 ? new Material(engine2, index) : null;
  }
};
var temp2d = null;
var Texture = class {
  /** Wonderland Engine instance. @hidden */
  _engine;
  /** Index in the manager. @hidden */
  _id = 0;
  /** HTML image index. @hidden */
  _imageIndex = null;
  /**
   * @param engine The engine instance
   * @param param HTML media element to create texture from or texture id to wrap.
   */
  constructor(engine2, param) {
    this._engine = engine2 ?? WL;
    const wasm = engine2.wasm;
    if (param instanceof HTMLImageElement || param instanceof HTMLVideoElement || param instanceof HTMLCanvasElement) {
      const index = wasm._images.length;
      wasm._images.push(param);
      this._imageIndex = index;
      this._id = this._engine.wasm._wl_renderer_addImage(index);
    } else {
      this._id = param;
    }
    this._engine.textures._set(this);
  }
  /** Whether this texture is valid. */
  get valid() {
    return this._id >= 0;
  }
  /** Index in this manager. */
  get id() {
    return this._id;
  }
  /** Update the texture to match the HTML element (e.g. reflect the current frame of a video). */
  update() {
    if (!this.valid || this._imageIndex === null)
      return;
    this._engine.wasm._wl_renderer_updateImage(this._id, this._imageIndex);
  }
  /** Width of the texture. */
  get width() {
    return this._engine.wasm._wl_texture_width(this._id);
  }
  /** Height of the texture. */
  get height() {
    return this._engine.wasm._wl_texture_height(this._id);
  }
  /** Hosting engine instance. */
  get engine() {
    return this._engine;
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
    if (!this.valid || this._imageIndex === null)
      return;
    if (!temp2d) {
      const canvas2 = document.createElement("canvas");
      const ctx = canvas2.getContext("2d");
      if (!ctx) {
        throw new Error("Texture.updateSubImage(): Failed to obtain CanvasRenderingContext2D.");
      }
      temp2d = {
        canvas: canvas2,
        ctx
      };
    }
    const wasm = this._engine.wasm;
    const img = wasm._images[this._imageIndex];
    if (!img)
      return;
    temp2d.canvas.width = w;
    temp2d.canvas.height = h;
    temp2d.ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
    const yOffset = (img.videoHeight ?? img.height) - y - h;
    wasm._images[this._imageIndex] = temp2d.canvas;
    wasm._wl_renderer_updateImage(this._id, this._imageIndex, x, yOffset);
    wasm._images[this._imageIndex] = img;
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
    this.engine._destroyTexture(this);
    this._id = -1;
    this._imageIndex = null;
  }
  /**
   * Checks equality by comparing whether the wrapped native texture ids are
   * equal.
   *
   * @param otherTexture Texture to check equality with.
   * @returns Whether this texture equals the given texture.
   *
   * @since 1.0.0
   */
  equals(otherTexture) {
    if (!otherTexture)
      return false;
    return this._id === otherTexture._id;
  }
};
var Animation = class {
  /** Index of the mesh in the manager. @hidden */
  _index;
  /** Wonderland Engine instance. @hidden */
  _engine;
  /**
   * @param index Index in the manager
   */
  constructor(engine2 = WL, index) {
    this._engine = engine2;
    this._index = index;
  }
  /** Duration of this animation. */
  get duration() {
    return this._engine.wasm._wl_animation_get_duration(this._index);
  }
  /** Number of tracks in this animation. */
  get trackCount() {
    return this._engine.wasm._wl_animation_get_trackCount(this._index);
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
    const wasm = this._engine.wasm;
    if (newTargets instanceof Skin) {
      const animId2 = wasm._wl_animation_retargetToSkin(this._index, newTargets._index);
      return new Animation(this._engine, animId2);
    }
    if (newTargets.length != this.trackCount) {
      throw Error("Expected " + this.trackCount.toString() + " targets, but got " + newTargets.length.toString());
    }
    const ptr = wasm._malloc(2 * newTargets.length);
    for (let i = 0; i < newTargets.length; ++i) {
      wasm.HEAPU16[ptr >> 1 + i] = newTargets[i].objectId;
    }
    const animId = wasm._wl_animation_retarget(this._index, ptr);
    wasm._free(ptr);
    return new Animation(this._engine, animId);
  }
  /**
   * Checks equality by comparing whether the wrapped native animation ids
   * are equal.
   *
   * @param otherAnimation Animation to check equality with.
   * @returns Whether this animation equals the given animation.
   *
   * @since 1.0.0
   */
  equals(otherAnimation) {
    if (!otherAnimation)
      return false;
    return this._index === otherAnimation._index;
  }
};
var Object3D = class {
  /**
   * Object index in the manager.
   *
   * @hidden
   */
  _objectId = -1;
  /** Wonderland Engine instance. @hidden */
  _engine;
  /**
   * @param o Object id to wrap
   *
   * For performance reasons, please use {@link WonderlandEngine.wrapObject}
   */
  constructor(engine2, o) {
    this._objectId = o;
    this._engine = engine2;
  }
  /**
   * Name of the object.
   *
   * Useful for identifying objects during debugging.
   */
  get name() {
    const wasm = this._engine.wasm;
    return wasm.UTF8ToString(wasm._wl_object_name(this.objectId));
  }
  /**
   * Set the object's name.
   *
   * @param newName The new name to set.
   */
  set name(newName) {
    const wasm = this._engine.wasm;
    wasm._wl_object_set_name(this.objectId, wasm.tempUTF8(newName));
  }
  /**
   * Parent of this object or `null` if parented to root.
   */
  get parent() {
    const p = this._engine.wasm._wl_object_parent(this.objectId);
    return p === 0 ? null : this._engine.wrapObject(p);
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
   */
  get children() {
    const childrenCount = this._engine.wasm._wl_object_get_children_count(this.objectId);
    if (childrenCount === 0)
      return [];
    const wasm = this._engine.wasm;
    wasm.requireTempMem(childrenCount * 2);
    this._engine.wasm._wl_object_get_children(this.objectId, wasm._tempMem, wasm._tempMemSize >> 1);
    const children = new Array(childrenCount);
    for (let i = 0; i < childrenCount; ++i) {
      children[i] = this._engine.wrapObject(wasm._tempMemUint16[i]);
    }
    return children;
  }
  /**
   * Reparent object to given object.
   *
   * @note Reparenting is not trivial and might have a noticeable performance impact.
   *
   * @param newParent New parent or `null` to parent to root
   */
  set parent(newParent) {
    this._engine.wasm._wl_object_set_parent(this.objectId, newParent == null ? 0 : newParent.objectId);
  }
  /** Object index in the manager. */
  get objectId() {
    return this._objectId;
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
   * @param parent The parent for the cloned hierarchy. Defaults
   *     to the scene root.
   *
   * @returns The clone of this object.
   */
  clone(parent) {
    const engine2 = this._engine;
    const id = engine2.wasm._wl_object_clone(this._objectId, parent?._objectId ?? 0);
    return engine2.wrapObject(id);
  }
  /**
   * Reset local transformation (translation, rotation and scaling) to identity.
   *
   * @returns Reference to self (for method chaining).
   */
  resetTransform() {
    this._engine.wasm._wl_object_reset_translation_rotation(this.objectId);
    this._engine.wasm._wl_object_reset_scaling(this.objectId);
    return this;
  }
  /**
   * Reset local position and rotation to identity.
   *
   * @returns Reference to self (for method chaining).
   */
  resetPositionRotation() {
    this._engine.wasm._wl_object_reset_translation_rotation(this.objectId);
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
    this._engine.wasm._wl_object_reset_rotation(this.objectId);
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
    this._engine.wasm._wl_object_reset_translation(this.objectId);
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
    this._engine.wasm._wl_object_reset_scaling(this.objectId);
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
    this._engine.wasm._wl_object_translate(this.objectId, v[0], v[1], v[2]);
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
    this._engine.wasm._wl_object_translate_obj(this.objectId, v[0], v[1], v[2]);
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
    this._engine.wasm._wl_object_translate_world(this.objectId, v[0], v[1], v[2]);
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
    this._engine.wasm._wl_object_rotate_axis_angle(this.objectId, a[0], a[1], a[2], d);
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
    this._engine.wasm._wl_object_rotate_axis_angle_rad(this.objectId, a[0], a[1], a[2], d);
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
    this._engine.wasm._wl_object_rotate_axis_angle_obj(this.objectId, a[0], a[1], a[2], d);
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
    this._engine.wasm._wl_object_rotate_axis_angle_rad_obj(this.objectId, a[0], a[1], a[2], d);
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
    this._engine.wasm._wl_object_rotate_quat(this.objectId, q[0], q[1], q[2], q[3]);
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
    this._engine.wasm._wl_object_rotate_quat_obj(this.objectId, q[0], q[1], q[2], q[3]);
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
    this._engine.wasm._wl_object_scale(this.objectId, v[0], v[1], v[2]);
    return this;
  }
  getPositionLocal(out = new Float32Array(3)) {
    const wasm = this._engine.wasm;
    wasm._wl_object_get_translation_local(this.objectId, wasm._tempMem);
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
    wasm._wl_object_get_translation_world(this.objectId, wasm._tempMem);
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
    this._engine.wasm._wl_object_set_translation_local(this.objectId, v[0], v[1], v[2]);
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
    this._engine.wasm._wl_object_set_translation_world(this.objectId, v[0], v[1], v[2]);
    return this;
  }
  /** @deprecated Please use {@link Object3D.setPositionWorld} instead. */
  setTranslationWorld(v) {
    return this.setPositionWorld(v);
  }
  getScalingLocal(out = new Float32Array(3)) {
    const wasm = this._engine.wasm;
    const ptr = wasm._wl_object_scaling_local(this.objectId) / 4;
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
    this._engine.wasm._wl_object_set_scaling_local(this.objectId, v[0], v[1], v[2]);
    return this;
  }
  getScalingWorld(out = new Float32Array(3)) {
    const wasm = this._engine.wasm;
    const ptr = wasm._wl_object_scaling_world(this.objectId) / 4;
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
    this._engine.wasm._wl_object_set_scaling_world(this.objectId, v[0], v[1], v[2]);
    return this;
  }
  getRotationLocal(out = new Float32Array(4)) {
    const wasm = this._engine.wasm;
    const ptr = wasm._wl_object_trans_local(this.objectId) / 4;
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
    this._engine.wasm._wl_object_set_rotation_local(this.objectId, v[0], v[1], v[2], v[3]);
    return this;
  }
  getRotationWorld(out = new Float32Array(4)) {
    const wasm = this._engine.wasm;
    const ptr = wasm._wl_object_trans_world(this.objectId) / 4;
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
    this._engine.wasm._wl_object_set_rotation_world(this.objectId, v[0], v[1], v[2], v[3]);
    return this;
  }
  getTransformLocal(out = new Float32Array(8)) {
    const wasm = this._engine.wasm;
    const ptr = wasm._wl_object_trans_local(this.objectId) / 4;
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
    const ptr = wasm._wl_object_trans_local(this.objectId) / 4;
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
    const ptr = wasm._wl_object_trans_world(this.objectId) / 4;
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
    const ptr = wasm._wl_object_trans_world(this.objectId) / 4;
    wasm.HEAPF32[ptr] = v[0];
    wasm.HEAPF32[ptr + 1] = v[1];
    wasm.HEAPF32[ptr + 2] = v[2];
    wasm.HEAPF32[ptr + 3] = v[3];
    wasm.HEAPF32[ptr + 4] = v[4];
    wasm.HEAPF32[ptr + 5] = v[5];
    wasm.HEAPF32[ptr + 6] = v[6];
    wasm.HEAPF32[ptr + 7] = v[7];
    this._engine.wasm._wl_object_trans_world_to_local(this.objectId);
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
    return new Float32Array(wasm.HEAPF32.buffer, wasm._wl_object_trans_local(this.objectId), 8);
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
    return new Float32Array(wasm.HEAPF32.buffer, wasm._wl_object_trans_world(this.objectId), 8);
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
    this._engine.wasm._wl_object_trans_world_to_local(this.objectId);
  }
  /**
   * Local / object space scaling.
   *
   * @deprecated Please use {@link Object3D.setScalingLocal} and
   * {@link Object3D.getScalingLocal} instead.
   */
  get scalingLocal() {
    const wasm = this._engine.wasm;
    return new Float32Array(wasm.HEAPF32.buffer, wasm._wl_object_scaling_local(this.objectId), 3);
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
    return new Float32Array(wasm.HEAPF32.buffer, wasm._wl_object_scaling_world(this.objectId), 3);
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
    this._engine.wasm._wl_object_scaling_world_to_local(this.objectId);
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
    this._engine.wasm._wl_object_set_rotation_local(this.objectId, r[0], r[1], r[2], r[3]);
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
    this._engine.wasm._wl_object_set_rotation_world(this.objectId, r[0], r[1], r[2], r[3]);
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
    wasm._wl_object_transformVectorWorld(this.objectId, wasm._tempMem);
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
    wasm._wl_object_transformVectorLocal(this.objectId, wasm._tempMem);
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
    wasm._wl_object_transformPointWorld(this.objectId, wasm._tempMem);
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
    wasm._wl_object_transformPointLocal(this.objectId, wasm._tempMem);
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
    wasm._wl_object_transformVectorInverseWorld(this.objectId, wasm._tempMem);
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
    wasm._wl_object_transformVectorInverseLocal(this.objectId, wasm._tempMem);
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
    wasm._wl_object_transformPointInverseWorld(this.objectId, wasm._tempMem);
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
    wasm._wl_object_transformPointInverseLocal(this.objectId, wasm._tempMem);
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
    wasm._wl_object_toWorldSpaceTransform(this.objectId, wasm._tempMem);
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
    wasm._wl_object_toObjectSpaceTransform(this.objectId, wasm._tempMem);
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
    this._engine.wasm._wl_object_lookAt(this.objectId, p[0], p[1], p[2], up[0], up[1], up[2]);
    return this;
  }
  /** Destroy the object with all of its components and remove it from the scene */
  destroy() {
    if (this._objectId < 0)
      return;
    this.engine.wasm._wl_scene_remove_object(this._objectId);
    this.engine._destroyObject(this);
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
    this._engine.wasm._wl_object_set_dirty(this.objectId);
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
    const type = isString(typeOrClass) ? typeOrClass : typeOrClass.TypeName;
    const wasm = this._engine.wasm;
    const componentType = wasm._wl_get_component_manager_index(wasm.tempUTF8(type));
    if (componentType < 0) {
      const typeIndex = wasm._componentTypeIndices[type];
      if (typeIndex === void 0)
        return null;
      const jsIndex = wasm._wl_get_js_component_index(this.objectId, typeIndex, index);
      if (jsIndex < 0)
        return null;
      const component = this._engine.wasm._components[jsIndex];
      return component.constructor !== BrokenComponent ? component : null;
    }
    const componentId = this._engine.wasm._wl_get_component_id(this.objectId, componentType, index);
    return this._engine._wrapComponent(type, componentType, componentId);
  }
  getComponents(typeOrClass) {
    const wasm = this._engine.wasm;
    let componentType = null;
    let type = null;
    if (typeOrClass) {
      type = isString(typeOrClass) ? typeOrClass : typeOrClass.TypeName;
      componentType = wasm._typeIndexFor(type);
    }
    const components = [];
    const maxComps = Math.floor(wasm._tempMemSize / 3 * 2);
    const componentsCount = wasm._wl_object_get_components(this.objectId, wasm._tempMem, maxComps);
    const offset2 = 2 * componentsCount;
    wasm._wl_object_get_component_types(this.objectId, wasm._tempMem + offset2, maxComps);
    const jsManagerIndex = wasm._jsManagerIndex;
    for (let i = 0; i < componentsCount; ++i) {
      const t = wasm._tempMemUint8[i + offset2];
      const componentId = wasm._tempMemUint16[i];
      if (t == jsManagerIndex) {
        const typeIndex = wasm._wl_get_js_component_index_for_id(componentId);
        const comp = wasm._components[typeIndex];
        const matches = componentType === null || comp.type == type;
        if (comp.constructor !== BrokenComponent && matches) {
          components.push(comp);
        }
        continue;
      }
      if (componentType === null) {
        const managerName = wasm._typeNameFor(t);
        components.push(this._engine._wrapComponent(managerName, t, componentId));
      } else if (t == componentType) {
        components.push(this._engine._wrapComponent(type, componentType, componentId));
      }
    }
    return components;
  }
  addComponent(typeOrClass, params) {
    const wasm = this._engine.wasm;
    const type = isString(typeOrClass) ? typeOrClass : typeOrClass.TypeName;
    const componentType = wasm._typeIndexFor(type);
    let component = null;
    let componentIndex = null;
    if (componentType < 0) {
      if (!(type in wasm._componentTypeIndices)) {
        throw new TypeError("Unknown component type '" + type + "'");
      }
      const componentId = wasm._wl_object_add_js_component(this.objectId, wasm._componentTypeIndices[type]);
      componentIndex = wasm._wl_get_js_component_index_for_id(componentId);
      component = wasm._components[componentIndex];
    } else {
      const componentId = wasm._wl_object_add_component(this.objectId, componentType);
      component = this._engine._wrapComponent(type, componentType, componentId);
    }
    if (params !== void 0)
      component.copy(params);
    if (componentType < 0) {
      wasm._wljs_component_init(componentIndex);
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
    const id = this._objectId;
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
      for (let i = 0; i < read; ++i)
        result.push(this.engine.wrapObject(buffer[i]));
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
   */
  findByNameRecursive(name) {
    const wasm = this._engine.wasm;
    const id = this._objectId;
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
      for (let i = 0; i < read; ++i)
        result.push(this.engine.wrapObject(buffer[i]));
    }
    return result;
  }
  /**
   * Whether given object's transformation has changed.
   */
  get changed() {
    return !!this._engine.wasm._wl_object_is_changed(this.objectId);
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
    return this._objectId < 0;
  }
  /**
   * Checks equality by comparing whether the wrapped native object ids are
   * equal.
   *
   * @param otherObject Object to check equality with.
   * @returns Whether this object equals the given object.
   */
  equals(otherObject) {
    if (!otherObject)
      return false;
    return this.objectId == otherObject.objectId;
  }
};
var Skin = class {
  /**
   * Index of the skin in the manager.
   * @hidden
   */
  _index;
  /** Wonderland Engine instance. @hidden */
  _engine;
  constructor(engine2, index) {
    this._engine = engine2;
    this._index = index;
  }
  /** Amount of joints in this skin. */
  get jointCount() {
    return this._engine.wasm._wl_skin_get_joint_count(this._index);
  }
  /** Joints object ids for this skin */
  get jointIds() {
    const wasm = this._engine.wasm;
    return new Uint16Array(wasm.HEAPU16.buffer, wasm._wl_skin_joint_ids(this._index), this.jointCount);
  }
  /**
   * Dual quaternions in a flat array of size 8 times {@link jointCount}.
   *
   * Inverse bind transforms of the skin.
   */
  get inverseBindTransforms() {
    const wasm = this._engine.wasm;
    return new Float32Array(wasm.HEAPF32.buffer, wasm._wl_skin_inverse_bind_transforms(this._index), 8 * this.jointCount);
  }
  /**
   * Vectors in a flat array of size 3 times {@link jointCount}.
   *
   * Inverse bind scalings of the skin.
   */
  get inverseBindScalings() {
    const wasm = this._engine.wasm;
    return new Float32Array(wasm.HEAPF32.buffer, wasm._wl_skin_inverse_bind_scalings(this._index), 3 * this.jointCount);
  }
  /**
   * Checks equality by comparing whether the wrapped native skin ids are
   * equal.
   *
   * @param otherSkin Skin to check equality with.
   * @returns Whether this skin equals the given skin.
   *
   * @since 1.0.0
   */
  equals(otherSkin) {
    if (!otherSkin)
      return false;
    return this._index === otherSkin._index;
  }
};
var RayHit = class {
  /** Wonderland Engine instance. @hidden */
  _engine;
  /** Pointer to the memory heap. */
  _ptr;
  /**
   * @param ptr Pointer to the ray hits memory.
   */
  constructor(engine2, ptr) {
    if ((ptr & 3) !== 0) {
      throw new Error("Misaligned pointer: please report a bug");
    }
    this._engine = engine2;
    this._ptr = ptr;
  }
  /** Array of ray hit locations. */
  get locations() {
    let p = this._ptr;
    let l = [];
    for (let i = 0; i < this.hitCount; ++i) {
      l.push(new Float32Array(this._engine.wasm.HEAPF32.buffer, p + 12 * i, 3));
    }
    return l;
  }
  /** Array of ray hit normals (only when using {@link Physics#rayCast}. */
  get normals() {
    let p = this._ptr + 48;
    let l = [];
    for (let i = 0; i < this.hitCount; ++i) {
      l.push(new Float32Array(this._engine.wasm.HEAPF32.buffer, p + 12 * i, 3));
    }
    return l;
  }
  /**
   * Prefer these to recalculating the distance from locations.
   *
   * Distances of array hits to ray origin.
   */
  get distances() {
    const p = this._ptr + 48 * 2;
    return new Float32Array(this._engine.wasm.HEAPF32.buffer, p, this.hitCount);
  }
  /** Hit objects */
  get objects() {
    const HEAPU16 = this._engine.wasm.HEAPU16;
    const objects = [null, null, null, null];
    let p = this._ptr + (48 * 2 + 16) >> 1;
    for (let i = 0; i < this.hitCount; ++i) {
      objects[i] = this._engine.wrapObject(HEAPU16[p + i]);
    }
    return objects;
  }
  /** Number of hits (max 4) */
  get hitCount() {
    return Math.min(this._engine.wasm.HEAPU32[this._ptr / 4 + 30], 4);
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
  setLanguage(code) {
    if (code == null)
      return Promise.resolve(this.currentIndex);
    const wasm = this._engine.wasm;
    this._prevLanguageIndex = this.currentIndex;
    wasm._wl_i18n_setLanguage(wasm.tempUTF8(code));
    return this._engine.scene._flushAppend(this._engine.scene.baseURL).then(() => this.currentIndex);
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

// node_modules/@wonderlandengine/api/dist/utils/misc.js
function timeout(time) {
  return new Promise((res) => setTimeout(res, time));
}
function clamp(val, min2, max2) {
  return Math.max(Math.min(max2, val), min2);
}

// node_modules/@wonderlandengine/api/dist/scene.js
var MAGIC_BIN = "WLEV";
var Scene = class {
  /** Called before rendering the scene */
  onPreRender = new Emitter();
  /** Called after the scene has been rendered */
  onPostRender = new Emitter();
  /** Wonderland Engine instance. @hidden */
  _engine;
  /** Ray hit pointer in WASM heap. @hidden */
  _rayHit;
  /** Ray hit. @hidden */
  _hit;
  /**
   * Relative directory of the scene that was loaded with {@link Scene.load}
   * Used for loading any files relative to the main scene.
   *
   * We need this for the tests that load bin files since we aren't loading
   * from the deploy folder directly. (test/resources/projects/*.bin)
   *
   * @hidden
   */
  _baseURL;
  constructor(engine2) {
    this._engine = engine2;
    this._rayHit = engine2.wasm._malloc(4 * (3 * 4 + 3 * 4 + 4 + 2) + 4);
    this._hit = new RayHit(this._engine, this._rayHit);
    this._baseURL = "";
  }
  /**
   * Currently active view components.
   */
  get activeViews() {
    const wasm = this._engine.wasm;
    const count = wasm._wl_scene_get_active_views(this._engine.wasm._tempMem, 16);
    const views = [];
    const viewTypeIndex = wasm._typeIndexFor("view");
    for (let i = 0; i < count; ++i) {
      views.push(new ViewComponent(this._engine, viewTypeIndex, this._engine.wasm._tempMemInt[i]));
    }
    return views;
  }
  /**
   * Relative directory of the scene that was loaded with {@link Scene.load}
   * Used for loading any files relative to the main scene.
   *
   * @hidden
   */
  get baseURL() {
    return this._baseURL;
  }
  /**
   * Cast a ray through the scene and find intersecting objects.
   *
   * The resulting ray hit will contain up to **4** closest ray hits,
   * sorted by increasing distance.
   *
   * @param o Ray origin.
   * @param d Ray direction.
   * @param group Collision group to filter by: only objects that are
   *        part of given group are considered for raycast.
   * @param maxDistance Maximum **inclusive** hit distance. Defaults to `100`.
   *
   * @returns The scene cached {@link RayHit} instance.
   * @note The returned object is owned by the Scene instance
   *   will be reused with the next {@link Scene#rayCast} call.
   */
  rayCast(o, d, group, maxDistance = 100) {
    this._engine.wasm._wl_scene_ray_cast(o[0], o[1], o[2], d[0], d[1], d[2], group, this._rayHit, maxDistance);
    return this._hit;
  }
  /**
   * Add an object to the scene.
   *
   * @param parent Parent object or `null`.
   * @returns A newly created object.
   */
  addObject(parent = null) {
    const parentId = parent ? parent.objectId : 0;
    const objectId = this._engine.wasm._wl_scene_add_object(parentId);
    return this._engine.wrapObject(objectId);
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
   * **Experimental:** This API might change in upcoming versions.
   *
   * @param count Number of objects to add.
   * @param parent Parent object or `null`, default `null`.
   * @param componentCountHint Hint for how many components in total will
   *      be added to the created objects afterwards, default `0`.
   * @returns Newly created objects
   */
  addObjects(count, parent = null, componentCountHint = 0) {
    const parentId = parent ? parent.objectId : 0;
    this._engine.wasm.requireTempMem(count * 2);
    const actualCount = this._engine.wasm._wl_scene_add_objects(parentId, count, componentCountHint || 0, this._engine.wasm._tempMem, this._engine.wasm._tempMemSize >> 1);
    const ids = this._engine.wasm._tempMemUint16.subarray(0, actualCount);
    const wrapper = this._engine.wrapObject.bind(this._engine);
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
    const wasm = this._engine.wasm;
    componentCountPerType = componentCountPerType || {};
    const jsManagerIndex = wasm._jsManagerIndex;
    let countsPerTypeIndex = wasm._tempMemInt.subarray();
    countsPerTypeIndex.fill(0);
    for (const e of Object.entries(componentCountPerType)) {
      const typeIndex = wasm._typeIndexFor(e[0]);
      countsPerTypeIndex[typeIndex < 0 ? jsManagerIndex : typeIndex] += e[1];
    }
    wasm._wl_scene_reserve_objects(objectCount, wasm._tempMem);
  }
  /**
   * Set the background clear color.
   *
   * @param color new clear color (RGBA).
   * @since 0.8.5
   */
  set clearColor(color) {
    this._engine.wasm._wl_scene_set_clearColor(color[0], color[1], color[2], color[3]);
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
    this._engine.wasm._wl_scene_enableColorClear(b);
  }
  /** Hosting engine instance. */
  get engine() {
    return this._engine;
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
   * @param opts Path to the file to load, or an option object.
   *     For more information about the options, see the {@link SceneLoadOptions} documentation.
   * @returns Promise that resolves when the scene was loaded.
   */
  async load(options) {
    let buffer = null;
    let baseURL = null;
    let filename = null;
    if (isString(options)) {
      filename = options;
      buffer = await fetchWithProgress(filename, (bytes, size2) => {
        console.log(`Scene downloading: ${bytes} / ${size2}`);
        this.setLoadingProgress(bytes / size2);
      });
      baseURL = getBaseUrl(filename);
      console.log(`Scene download of ${buffer.byteLength} bytes successful.`);
    } else {
      ({ buffer, baseURL } = options);
      filename = baseURL ? `${baseURL}/scene.bin` : "scene.bin";
    }
    if (!buffer) {
      throw new Error("Failed to load scene, buffer not provided");
    }
    if (!isString(baseURL)) {
      throw new Error("Failed to load scene, baseURL not provided");
    }
    this._baseURL = baseURL;
    const wasm = this._engine.wasm;
    const size = buffer.byteLength;
    const ptr = wasm._malloc(size);
    new Uint8Array(wasm.HEAPU8.buffer, ptr, size).set(new Uint8Array(buffer));
    try {
      wasm._wl_load_scene_bin(ptr, size, wasm.tempUTF8(filename));
    } finally {
      wasm._free(ptr);
    }
    const i18n = this._engine.i18n;
    const langPromise = i18n.setLanguage(i18n.languageCode(0));
    await Promise.all([langPromise, this._flushAppend(this._baseURL)]);
    this._engine.onSceneLoaded.notify();
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
   * @param file The .bin, .gltf or .glb file to append. Should be a URL or
   *   an `ArrayBuffer` with the file content.
   * @param options Additional options for loading.
   * @returns Promise that resolves when the scene was appended.
   */
  async append(file, options = {}) {
    const { loadGltfExtensions = false, baseURL = isString(file) ? getBaseUrl(file) : this._baseURL } = options;
    const wasm = this._engine.wasm;
    const buffer = isString(file) ? await fetchWithProgress(file) : file;
    let error = null;
    let result = void 0;
    let callback = wasm.addFunction((objectId, extensionData, extensionDataSize) => {
      if (objectId < 0) {
        error = new Error(`Scene.append(): Internal runtime error, found root id = ${objectId}`);
        return;
      }
      const root = objectId ? this._engine.wrapObject(objectId) : null;
      result = root;
      if (!extensionData || !extensionDataSize)
        return;
      const marshalled = new Uint32Array(wasm.HEAPU32.buffer, extensionData, extensionDataSize / 4);
      const extensions = this._unmarshallGltfExtensions(marshalled);
      result = { root, extensions };
    }, "viii");
    const size = buffer.byteLength;
    const ptr = wasm._malloc(size);
    const data = new Uint8Array(wasm.HEAPU8.buffer, ptr, size);
    data.set(new Uint8Array(buffer));
    const isBinFile = data.byteLength > MAGIC_BIN.length && data.subarray(0, MAGIC_BIN.length).every((value, i) => value === MAGIC_BIN.charCodeAt(i));
    try {
      if (isBinFile) {
        wasm._wl_append_scene_bin(ptr, size, callback);
      } else {
        wasm._wl_append_scene_gltf(ptr, size, loadGltfExtensions, callback);
      }
    } catch (e) {
      wasm.removeFunction(callback);
      throw e;
    } finally {
      wasm._free(ptr);
    }
    while (result === void 0 && !error)
      await timeout(4);
    wasm.removeFunction(callback);
    if (error)
      throw error;
    if (isBinFile)
      await this._flushAppend(baseURL);
    return result;
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
   * Set the current material to render the sky.
   *
   * @note The sky needs to be enabled in the editor when creating the scene.
   * For more information, please refer to the background [tutorial](https://wonderlandengine.com/tutorials/background-effect/).
   */
  set skyMaterial(material) {
    this._engine.wasm._wl_scene_set_sky_material(material?._index ?? 0);
  }
  /** Current sky material, or `null` if no sky is set. */
  get skyMaterial() {
    const id = this._engine.wasm._wl_scene_get_sky_material();
    return id > 0 ? new Material(this._engine, id) : null;
  }
  /**
   * Load all currently queued bin files.
   *
   * Used by {@link Scene.append} and {@link Scene.load}
   * to load all delay-load bins.
   *
   * Used by {@link I18N.language} to trigger loading the
   * associated language bin, after it was queued.
   *
   * @param baseURL Url that is added to each path.
   * @param options Additional options for loading.
   *
   * @hidden
   */
  _flushAppend(baseURL) {
    const wasm = this._engine.wasm;
    const count = wasm._wl_scene_queued_bin_count();
    if (!count)
      return Promise.resolve();
    const urls = new Array(count).fill(0).map((_, i) => {
      const ptr = wasm._wl_scene_queued_bin_path(i);
      return wasm.UTF8ToString(ptr);
    });
    wasm._wl_scene_clear_queued_bin_list();
    const promises = urls.map((path) => this.append(baseURL.length ? `${baseURL}/${path}` : path));
    return Promise.all(promises).then((data) => {
      const i18n = this._engine.i18n;
      this._engine.i18n.onLanguageChanged.notify(i18n.previousIndex, i18n.currentIndex);
      return data;
    });
  }
  /**
   * Unmarshalls the GltfExtensions from an Uint32Array.
   *
   * @param data Array containing the gltf extension data.
   * @returns The extensions stored in an object literal.
   *
   * @hidden
   */
  _unmarshallGltfExtensions(data) {
    const extensions = {
      root: {},
      mesh: {},
      node: {},
      idMapping: []
    };
    let index = 0;
    const readString = () => {
      const strPtr = data[index++];
      const strLen = data[index++];
      return this._engine.wasm.UTF8ViewToString(strPtr, strPtr + strLen);
    };
    const idMappingSize = data[index++];
    const idMapping = new Array(idMappingSize);
    for (let i = 0; i < idMappingSize; ++i) {
      idMapping[i] = data[index++];
    }
    extensions.idMapping = idMapping;
    const meshExtensionsSize = data[index++];
    for (let i = 0; i < meshExtensionsSize; ++i) {
      const objectId = data[index++];
      extensions.mesh[idMapping[objectId]] = JSON.parse(readString());
    }
    const nodeExtensionsSize = data[index++];
    for (let i = 0; i < nodeExtensionsSize; ++i) {
      const objectId = data[index++];
      extensions.node[idMapping[objectId]] = JSON.parse(readString());
    }
    const rootExtensionsStr = readString();
    if (rootExtensionsStr) {
      extensions.root = JSON.parse(rootExtensionsStr);
    }
    return extensions;
  }
  /**
   * Reset the scene.
   *
   * This method deletes all used and allocated objects, and components.
   */
  reset() {
    this._engine.wasm._wl_scene_reset();
    this._baseURL = "";
  }
};

// node_modules/@wonderlandengine/api/dist/texture-manager.js
var TextureManager = class {
  /** Wonderland Engine instance. @hidden */
  _engine;
  /** Texture cache. @hidden */
  #cache = [];
  /** @hidden */
  constructor(engine2) {
    this._engine = engine2;
  }
  /**
   * Retrieve the texture with the given id.
   *
   * @param id The texture identifier.
   * @return The {@link Texture} if found, `null` otherwise.
   */
  get(id) {
    return this.#cache[id] ?? null;
  }
  /**
   * Load an image from URL as {@link Texture}.
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
        let texture = new Texture(this._engine, image);
        if (!texture.valid) {
          reject("Failed to add image " + image.src + " to texture atlas. Probably incompatible format.");
        }
        resolve(texture);
      };
      image.onerror = function() {
        reject("Failed to load image. Not found or no read access");
      };
    });
  }
  /**
   * Wrap a texture ID using {@link Texture}.
   *
   * @note This method performs caching and will return the same
   * instance on subsequent calls.
   *
   * @param id ID of the texture to create.
   *
   * @returns The texture.
   */
  wrap(id) {
    const texture = this.#cache[id] ?? (this.#cache[id] = new Texture(this._engine, id));
    texture["_id"] = id;
    return texture;
  }
  /** Number of textures allocated in the manager. */
  get allocatedCount() {
    return this.#cache.length;
  }
  /**
   * Number of textures in the manager.
   *
   * @note For performance reasons, avoid calling this method when possible.
   */
  get count() {
    let count = 0;
    for (const tex of this.#cache) {
      if (tex && tex.id >= 0)
        ++count;
    }
    return count;
  }
  /**
   * Set a new texture in the manager cache.
   *
   * @note This api is meant to be used internally.
   *
   * @param texture The texture to add.
   *
   * @hidden
   */
  _set(texture) {
    this.#cache[texture.id] = texture;
  }
  /**
   * Destroys the texture.
   *
   * @note This api is meant to be used internally.
   *
   * @param texture The texture to destroy.
   *
   * @hidden
   */
  _destroy(texture) {
    this._engine.wasm._wl_texture_destroy(texture.id);
    const img = texture["_imageIndex"];
    if (img !== null) {
      this._engine.wasm._images[img] = null;
    }
  }
  /**
   * Reset the manager.
   *
   * @note This api is meant to be used internally.
   *
   * @hidden
   */
  _reset() {
    this.#cache.length = 0;
  }
};

// node_modules/@wonderlandengine/api/dist/engine.js
var WonderlandEngine = class {
  /**
   * {@link Emitter} for WebXR session end events.
   *
   * Usage from a within a component:
   * ```js
   * this.engine.onXRSessionEnd.add(() => console.log("XR session ended."));
   * ```
   */
  onXRSessionEnd = new Emitter();
  /**
   * {@link Emitter} for WebXR session start events.
   *
   * Usage from a within a component:
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
   * Usage from a within a component:
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
   * {@link Emitter} for scene loaded events.
   *
   * Listeners get notified when a call to {@link Scene#load()} finishes,
   * which also happens after the main scene has replaced the loading screen.
   *
   * Usage from a within a component:
   * ```js
   * this.engine.onSceneLoaded.add(() => console.log("Scene switched!"));
   * ```
   */
  onSceneLoaded = new Emitter();
  /**
   * Current main scene.
   */
  scene = null;
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
   * Component class instances per type to avoid GC.
   *
   * @note Maps the manager index to the list of components.
   *
   * @hidden
   */
  _componentCache = {};
  /** Object class instances to avoid GC. @hidden */
  _objectCache = [];
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
  /** Texture manager. @hidden */
  #textures = new TextureManager(this);
  /**
   * Resize observer to track for canvas size changes.
   *
   * @hidden
   */
  #resizeObserver = null;
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
    this._componentCache = {};
    this._objectCache.length = 0;
    this.canvas.addEventListener("webglcontextlost", function(e) {
      console.error("Context lost:");
      console.error(e);
    }, false);
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
   * Request a XR session.
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
    if (!navigator.xr) {
      const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
      const missingHTTPS = location.protocol !== "https:" && !isLocalhost;
      return Promise.reject(missingHTTPS ? "WebXR is only supported with HTTPS or on localhost!" : "WebXR unsupported in this browser.");
    }
    return this.#wasm.webxr_requestSession(mode, features, optionalFeatures);
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
  wrapObject(objectId) {
    const cache = this._objectCache;
    const o = cache[objectId] || (cache[objectId] = new Object3D(this, objectId));
    o["_objectId"] = objectId;
    return o;
  }
  /* Public Getters & Setter */
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
  /**
   * Texture managger.
   *
   * Use this to load or programmatically create new textures at runtime.
   */
  get textures() {
    return this.#textures;
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
  /* Internal-Only Methods */
  /**
   * Initialize the engine.
   *
   * @note Should be called after the WebAssembly is fully loaded.
   *
   * @hidden
   */
  _init() {
    this.scene = new Scene(this);
    this.#wasm._wl_set_error_callback(this.#wasm.addFunction((messagePtr) => {
      throw new Error(this.#wasm.UTF8ToString(messagePtr));
    }, "vi"));
    this.#physics = null;
    if (this.#wasm.withPhysX) {
      const physics = new Physics(this);
      this.#wasm._wl_physx_set_collision_callback(this.#wasm.addFunction((a, index, type, b) => {
        const callback = physics._callbacks[a][index];
        const component = new PhysXComponent(this, this.wasm._typeIndexFor("physx"), b);
        callback(type, component);
      }, "viiii"));
      this.#physics = physics;
    }
    this.resize(this.canvas.clientWidth, this.canvas.clientHeight);
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
    this._componentCache = {};
    this._objectCache.length = 0;
    this.#textures._reset();
    this.scene.reset();
    this.wasm.reset();
  }
  /**
   * Retrieves a component instance if it exists, or create and cache
   * a new one.
   *
   * @note This api is meant to be used internally. Please have a look at
   * {@link Object3D.addComponent} instead.
   *
   * @param type component type name
   * @param componentType Component manager index
   * @param componentId Component id in the manager
   *
   * @returns JavaScript instance wrapping the native component
   *
   * @hidden
   */
  _wrapComponent(type, componentType, componentId) {
    if (componentId < 0)
      return null;
    const c = this._componentCache[componentType] || (this._componentCache[componentType] = []);
    if (c[componentId]) {
      return c[componentId];
    }
    let component;
    if (type == "collision") {
      component = new CollisionComponent(this, componentType, componentId);
    } else if (type == "text") {
      component = new TextComponent(this, componentType, componentId);
    } else if (type == "view") {
      component = new ViewComponent(this, componentType, componentId);
    } else if (type == "mesh") {
      component = new MeshComponent(this, componentType, componentId);
    } else if (type == "input") {
      component = new InputComponent(this, componentType, componentId);
    } else if (type == "light") {
      component = new LightComponent(this, componentType, componentId);
    } else if (type == "animation") {
      component = new AnimationComponent(this, componentType, componentId);
    } else if (type == "physx") {
      component = new PhysXComponent(this, componentType, componentId);
    } else {
      const typeIndex = this.wasm._componentTypeIndices[type];
      const constructor = this.wasm._componentTypes[typeIndex];
      component = new constructor(this);
    }
    component._engine = this;
    component._manager = componentType;
    component._id = componentId;
    c[componentId] = component;
    return component;
  }
  /**
   * Perform cleanup upon object destruction.
   *
   * @param instance The instance to destroy.
   *
   * @hidden
   */
  _destroyObject(instance) {
    const id = instance.objectId;
    instance._objectId = -1;
    if (this.erasePrototypeOnDestroy && instance) {
      Object.setPrototypeOf(instance, DestroyedObjectInstance);
    }
    this._objectCache[id] = null;
  }
  /**
   * Perform cleanup upon component destruction.
   *
   * @param instance The instance to destroy.
   *
   * @hidden
   */
  _destroyComponent(instance) {
    const id = instance._id;
    const manager = instance._manager;
    instance._id = -1;
    instance._manager = -1;
    if (this.erasePrototypeOnDestroy && instance) {
      Object.setPrototypeOf(instance, DestroyedComponentInstance);
    }
    const cache = this._componentCache[manager];
    if (cache)
      cache[id] = null;
  }
  /**
   * Perform cleanup upon texture destruction.
   *
   * @param texture The instance to destroy.
   *
   * @hidden
   */
  _destroyTexture(texture) {
    this.textures._destroy(texture);
    if (this.erasePrototypeOnDestroy) {
      Object.setPrototypeOf(texture, DestroyedTextureInstance);
    }
  }
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
  [Type.Color, [0, 0, 0, 1]]
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
    } else {
      p.default = p.default ?? _componentDefaults.get(p.type);
    }
    ctor.prototype[name] = p.default;
  }
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
  /**
   * Material definition cache. Each pipeline has its own
   * associated material definition.
   */
  _materialDefinitions = [];
  /** Image cache. */
  _images = [];
  /** Component instances. */
  _components = [];
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
  /** JavaScript manager index. */
  _jsManagerIndexCached = null;
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
      return;
    }
    this.UTF8ViewToString = (s, e) => {
      if (!s)
        return "";
      return this._utf8Decoder.decode(this.HEAPU8.subarray(s, e));
    };
    this._brokenComponentIndex = this._registerComponent(BrokenComponent);
  }
  /**
   * Reset the cache of the library.
   *
   * @note Should only be called when tearing down the runtime.
   */
  reset() {
    this.allocateTempMemory(1024);
    this._materialDefinitions = [];
    this._images = [];
    this._components = [];
    this._componentTypes = [];
    this._componentTypeIndices = {};
    this._jsManagerIndexCached = null;
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
    const typeIndex = ctor.TypeName in this._componentTypeIndices ? this._componentTypeIndices[ctor.TypeName] : this._componentTypes.length;
    this._componentTypes[typeIndex] = ctor;
    this._componentTypeIndices[ctor.TypeName] = typeIndex;
    if (ctor === BrokenComponent)
      return typeIndex;
    console.log("Registered component", ctor.TypeName, `(class ${ctor.name})`, "with index", typeIndex);
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
    console.log("Allocating temp mem:", size);
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
  tempUTF8(str5, byteOffset = 0) {
    const strLen = this.lengthBytesUTF8(str5) + 1;
    this.requireTempMem(strLen + byteOffset);
    const ptr = this._tempMem + byteOffset;
    this.stringToUTF8(str5, ptr, strLen);
    return ptr;
  }
  /**
   * Return the index of the component type.
   *
   * @note This method uses malloc and copies the string
   * to avoid overwriting caller's temporary data.
   *
   * @param type The type
   * @return The component type index
   */
  _typeIndexFor(type) {
    const lengthBytes = this.lengthBytesUTF8(type) + 1;
    const mem = this._malloc(lengthBytes);
    this.stringToUTF8(type, mem, lengthBytes);
    const componentType = this._wl_get_component_manager_index(mem);
    this._free(mem);
    return componentType;
  }
  /**
   * Return the name of component type stored at the given index.
   *
   * @param typeIndex The type index
   * @return The name as a string
   */
  _typeNameFor(typeIndex) {
    return this.UTF8ToString(this._wl_component_manager_name(typeIndex));
  }
  /**
   * Returns `true` if the runtime supports physx or not.
   */
  get withPhysX() {
    return this._withPhysX;
  }
  /** JavaScript manager index. */
  get _jsManagerIndex() {
    if (this._jsManagerIndexCached === null) {
      this._jsManagerIndexCached = this._typeIndexFor("js");
    }
    return this._jsManagerIndexCached;
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
  _wljs_allocate(numComponents) {
    this._components = new Array(numComponents);
  }
  _wljs_init(withPhysX) {
    this._withPhysX = withPhysX;
    this.allocateTempMemory(1024);
  }
  _wljs_reallocate(numComponents) {
    if (numComponents > this._components.length) {
      this._components.length = numComponents;
    }
  }
  _wljs_scene_add_material_definition(definitionId) {
    const definition = /* @__PURE__ */ new Map();
    const nbParams = this._wl_material_definition_get_count(definitionId);
    for (let i = 0; i < nbParams; ++i) {
      const name = this.UTF8ToString(this._wl_material_definition_get_param_name(definitionId, i));
      const t = this._wl_material_definition_get_param_type(definitionId, i);
      definition.set(name, {
        index: i,
        type: {
          type: t & 255,
          componentCount: t >> 8 & 255,
          metaType: t >> 16 & 255
        }
      });
    }
    this._materialDefinitions[definitionId] = definition;
  }
  _wljs_set_component_param_bool(c, p, pe, v) {
    const param = this.UTF8ViewToString(p, pe);
    this._components[c][param] = v !== 0;
  }
  _wljs_set_component_param_int(c, p, pe, v) {
    const param = this.UTF8ViewToString(p, pe);
    this._components[c][param] = v;
  }
  _wljs_set_component_param_float(c, p, pe, v) {
    const param = this.UTF8ViewToString(p, pe);
    this._components[c][param] = v;
  }
  _wljs_set_component_param_string(c, p, pe, v, ve) {
    const param = this.UTF8ViewToString(p, pe);
    const value = this.UTF8ViewToString(v, ve);
    this._components[c][param] = value;
  }
  _wljs_set_component_param_color(c, p, pe, v) {
    const param = this.UTF8ViewToString(p, pe);
    this._components[c][param] = new Float32Array([0, 8, 16, 24].map((s) => (v >>> s & 255) / 255));
  }
  _wljs_set_component_param_object(c, p, pe, v) {
    const param = this.UTF8ViewToString(p, pe);
    this._components[c][param] = v > 0 ? this._engine.wrapObject(v) : null;
  }
  _wljs_set_component_param_mesh(c, p, pe, v) {
    const param = this.UTF8ViewToString(p, pe);
    this._components[c][param] = v > 0 ? new Mesh(this._engine, v) : null;
  }
  _wljs_set_component_param_texture(c, p, pe, v) {
    const param = this.UTF8ViewToString(p, pe);
    this._components[c][param] = v > 0 ? this._engine.textures.wrap(v) : null;
  }
  _wljs_set_component_param_material(c, p, pe, v) {
    const param = this.UTF8ViewToString(p, pe);
    this._components[c][param] = v > 0 ? new Material(this._engine, v) : null;
  }
  _wljs_set_component_param_animation(c, p, pe, v) {
    const param = this.UTF8ViewToString(p, pe);
    this._components[c][param] = v > 0 ? new Animation(this._engine, v) : null;
  }
  _wljs_set_component_param_skin(c, p, pe, v) {
    const param = this.UTF8ViewToString(p, pe);
    this._components[c][param] = v > 0 ? new Skin(this._engine, v) : null;
  }
  _wljs_get_component_type_index(namePtr, nameEndPtr) {
    const typename = this.UTF8ViewToString(namePtr, nameEndPtr);
    const index = this._componentTypeIndices[typename];
    if (index === void 0) {
      return this._brokenComponentIndex;
    }
    return index;
  }
  _wljs_component_create(jsManagerIndex, index, id, type, object) {
    const ctor = this._componentTypes[type];
    if (!ctor) {
      throw new Error(`Type index ${type} isn't registered`);
    }
    let component = null;
    try {
      component = new ctor();
    } catch (e) {
      console.error(`Exception during instantiation of component ${ctor.TypeName}`);
      component = new BrokenComponent(this._engine);
    }
    component._engine = this._engine;
    component._manager = jsManagerIndex;
    component._id = id;
    component._object = this._engine.wrapObject(object);
    try {
      component.resetProperties();
    } catch (e) {
      console.error(`Exception during ${component.type} resetProperties() on object ${component.object.name}`);
    }
    this._components[index] = component;
    return component;
  }
  _wljs_component_init(component) {
    const c = this._components[component];
    c._triggerInit();
  }
  _wljs_component_update(component, dt) {
    const c = this._components[component];
    c._triggerUpdate(dt);
  }
  _wljs_component_onActivate(component) {
    const c = this._components[component];
    if (c)
      c._triggerOnActivate();
  }
  _wljs_component_onDeactivate(component) {
    const c = this._components[component];
    c._triggerOnDeactivate();
  }
  _wljs_component_onDestroy(component) {
    const c = this._components[component];
    c._triggerOnDestroy();
  }
  _wljs_swap(a, b) {
    const componentA = this._components[a];
    this._components[a] = this._components[b];
    this._components[b] = componentA;
  }
  _wljs_copy(src, dst) {
    const destComp = this._components[dst];
    try {
      destComp.copy(this._components[src]);
    } catch (e) {
      console.error(`Exception during ${destComp.type} copy() on object ${destComp.object.name}`);
    }
  }
};
function throwInvalidRuntime(version) {
  return function() {
    throw new Error(`Feature added in version ${version}.
	\u2192 Please use a Wonderland Engine editor version >= ${version}`);
  };
}
var requireRuntime1_1_1 = throwInvalidRuntime("1.1.1");
WASM.prototype._wl_physx_component_get_offsetTranslation = requireRuntime1_1_1;
WASM.prototype._wl_physx_component_set_offsetTranslation = requireRuntime1_1_1;
WASM.prototype._wl_physx_component_get_offsetTransform = requireRuntime1_1_1;
WASM.prototype._wl_physx_component_set_offsetRotation = requireRuntime1_1_1;
WASM.prototype._wl_object_clone = requireRuntime1_1_1;

// node_modules/@wonderlandengine/api/dist/version.js
var APIVersion = {
  major: 1,
  minor: 1,
  patch: 3,
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
function checkXRSupport() {
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
  const xrPromise = checkXRSupport();
  const baseURL = getBaseUrl(runtime);
  const { simdSupported, threadsSupported } = await detectFeatures();
  const { simd: simd2 = simdSupported, threads: threads2 = threadsSupported, physx = false, loader = false, xrFramebufferScaleFactor = 1, loadingScreen = baseURL ? `${baseURL}/${LOADING_SCREEN_PATH}` : LOADING_SCREEN_PATH, canvas: canvas2 = "canvas" } = options;
  const variant = [];
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
  const glCanvas = document.getElementById(canvas2);
  if (!glCanvas) {
    throw new Error(`loadRuntime(): Failed to find canvas with id '${canvas2}'`);
  }
  if (!(glCanvas instanceof HTMLCanvasElement)) {
    throw new Error(`loadRuntime(): HTML element '${canvas2}' must be a canvas`);
  }
  const wasm = new WASM(threads2);
  wasm.worker = `${filename}.worker.js`;
  wasm.wasm = wasmData;
  wasm.canvas = glCanvas;
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
  return engine2;
}

// node_modules/@wonderlandengine/components/dist/8thwall-camera.js
var ARCamera8thwall = class extends Component {
  /* 8thwall camera pipeline module name */
  name = "wonderland-engine-8thwall-camera";
  started = false;
  view = null;
  // cache camera
  position = [0, 0, 0];
  // cache 8thwall cam position
  rotation = [0, 0, 0, -1];
  // cache 8thwall cam rotation
  glTextureRenderer = null;
  // cache XR8.GlTextureRenderer.pipelineModule
  promptForDeviceMotion() {
    return new Promise(async (resolve, reject) => {
      window.dispatchEvent(new Event("8thwall-request-user-interaction"));
      window.addEventListener("8thwall-safe-to-request-permissions", async () => {
        try {
          const motionEvent = await DeviceMotionEvent.requestPermission();
          resolve(motionEvent);
        } catch (exception) {
          reject(exception);
        }
      });
    });
  }
  async getPermissions() {
    if (DeviceMotionEvent && DeviceMotionEvent.requestPermission) {
      try {
        const result = await DeviceMotionEvent.requestPermission();
        if (result !== "granted") {
          throw new Error("MotionEvent");
        }
      } catch (exception) {
        if (exception.name === "NotAllowedError") {
          const motionEvent = await this.promptForDeviceMotion();
          if (motionEvent !== "granted") {
            throw new Error("MotionEvent");
          }
        } else {
          throw new Error("MotionEvent");
        }
      }
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    } catch (exception) {
      throw new Error("Camera");
    }
  }
  init() {
    this.view = this.object.getComponent("view");
    this.onUpdate = this.onUpdate.bind(this);
    this.onAttach = this.onAttach.bind(this);
    this.onException = this.onException.bind(this);
    this.onCameraStatusChange = this.onCameraStatusChange.bind(this);
  }
  async start() {
    this.view = this.object.getComponent("view");
    if (!this.useCustomUIOverlays) {
      OverlaysHandler.init();
    }
    try {
      await this.getPermissions();
    } catch (error) {
      window.dispatchEvent(new CustomEvent("8thwall-permission-fail", { detail: error }));
      return;
    }
    await this.waitForXR8();
    XR8.XrController.configure({
      disableWorldTracking: false
    });
    this.glTextureRenderer = XR8.GlTextureRenderer.pipelineModule();
    XR8.addCameraPipelineModules([
      this.glTextureRenderer,
      XR8.XrController.pipelineModule(),
      this
    ]);
    const config = {
      cameraConfig: {
        direction: XR8.XrConfig.camera().BACK
      },
      canvas: Module.canvas,
      allowedDevices: XR8.XrConfig.device().ANY,
      ownRunLoop: false
    };
    XR8.run(config);
  }
  /**
   * @private
   * 8thwall pipeline function
   */
  onAttach(params) {
    this.started = true;
    this.engine.scene.colorClearEnabled = false;
    const gl = Module.ctx;
    const rot = this.object.rotationWorld;
    const pos = this.object.getTranslationWorld([]);
    this.position = Array.from(pos);
    this.rotation = Array.from(rot);
    XR8.XrController.updateCameraProjectionMatrix({
      origin: { x: pos[0], y: pos[1], z: pos[2] },
      facing: { x: rot[0], y: rot[1], z: rot[2], w: rot[3] },
      cam: {
        pixelRectWidth: Module.canvas.width,
        pixelRectHeight: Module.canvas.height,
        nearClipPlane: this.view.near,
        farClipPlane: this.view.far
      }
    });
    this.engine.scene.onPreRender.push(() => {
      gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
      XR8.runPreRender(Date.now());
      XR8.runRender();
    });
    this.engine.scene.onPostRender.push(() => {
      XR8.runPostRender(Date.now());
    });
  }
  /**
   * @private
   * 8thwall pipeline function
   */
  onCameraStatusChange(e) {
    if (e && e.status === "failed") {
      this.onException(new Error(`Camera failed with status: ${e.status}`));
    }
  }
  /**
   * @private
   * 8thwall pipeline function
   */
  onUpdate(e) {
    if (!e.processCpuResult.reality)
      return;
    const { rotation, position, intrinsics } = e.processCpuResult.reality;
    this.rotation[0] = rotation.x;
    this.rotation[1] = rotation.y;
    this.rotation[2] = rotation.z;
    this.rotation[3] = rotation.w;
    this.position[0] = position.x;
    this.position[1] = position.y;
    this.position[2] = position.z;
    if (intrinsics) {
      const projectionMatrix = this.view.projectionMatrix;
      for (let i = 0; i < 16; i++) {
        if (Number.isFinite(intrinsics[i])) {
          projectionMatrix[i] = intrinsics[i];
        }
      }
    }
    if (position && rotation) {
      this.object.rotationWorld = this.rotation;
      this.object.setTranslationWorld(this.position);
    }
  }
  /**
   * @private
   * 8thwall pipeline function
   */
  onException(error) {
    console.error("8thwall exception:", error);
    window.dispatchEvent(new CustomEvent("8thwall-error", { detail: error }));
  }
  waitForXR8() {
    return new Promise((resolve, _rej) => {
      if (window.XR8) {
        resolve();
      } else {
        window.addEventListener("xrloaded", () => resolve());
      }
    });
  }
};
__publicField(ARCamera8thwall, "TypeName", "8thwall-camera");
__publicField(ARCamera8thwall, "Properties", {
  /** Override the WL html overlays for handling camera/motion permissions and error handling */
  useCustomUIOverlays: { type: Type.Bool, default: false }
});
var OverlaysHandler = {
  init: function() {
    this.handleRequestUserInteraction = this.handleRequestUserInteraction.bind(this);
    this.handlePermissionFail = this.handlePermissionFail.bind(this);
    this.handleError = this.handleError.bind(this);
    window.addEventListener("8thwall-request-user-interaction", this.handleRequestUserInteraction);
    window.addEventListener("8thwall-permission-fail", this.handlePermissionFail);
    window.addEventListener("8thwall-error", this.handleError);
  },
  handleRequestUserInteraction: function() {
    const overlay = this.showOverlay(requestPermissionOverlay);
    window.addEventListener("8thwall-safe-to-request-permissions", () => {
      overlay.remove();
    });
  },
  handlePermissionFail: function(_reason) {
    this.showOverlay(failedPermissionOverlay);
  },
  handleError: function(_error) {
    this.showOverlay(runtimeErrorOverlay);
  },
  showOverlay: function(htmlContent) {
    const overlay = document.createElement("div");
    overlay.innerHTML = htmlContent;
    document.body.appendChild(overlay);
    return overlay;
  }
};
var requestPermissionOverlay = `
<style>
  #request-permission-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: center;
    font-family: sans-serif;
  }

  .request-permission-overlay_title {
    margin: 30px;
    font-size: 32px;
  }

  .request-permission-overlay_button {
    background-color: #e80086;
    font-size: 22px;
    padding: 10px 30px;
    color: #fff;
    border-radius: 15px;
    border: none;
  }
</style>

<div id="request-permission-overlay">
  <div class="request-permission-overlay_title">This app requires to use your camera and motion sensors</div>

  <button class="request-permission-overlay_button" onclick="window.dispatchEvent(new Event('8thwall-safe-to-request-permissions'))">OK</button>
</div>`;
var failedPermissionOverlay = `
<style>
  #failed-permission-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: center;
    font-family: sans-serif;
  }

  .failed-permission-overlay_title {
    margin: 30px;
    font-size: 32px;
  }

  .failed-permission-overlay_button {
    background-color: #e80086;
    font-size: 22px;
    padding: 10px 30px;
    color: #fff;
    border-radius: 15px;
    border: none;
  }
</style>

<div id="failed-permission-overlay">
  <div class="failed-permission-overlay_title">Failed to grant permissions. Reset the the permissions and refresh the page.</div>

  <button class="failed-permission-overlay_button" onclick="window.location.reload()">Refresh the page</button>
</div>`;
var runtimeErrorOverlay = `
<style>
  #wall-error-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: center;
    font-family: sans-serif;
  }

  .wall-error-overlay_title {
    margin: 30px;
    font-size: 32px;
  }

  .wall-error-overlay_button {
    background-color: #e80086;
    font-size: 22px;
    padding: 10px 30px;
    color: #fff;
    border-radius: 15px;
    border: none;
  }
</style>

<div id="wall-error-overlay">
  <div class="wall-error-overlay_title">Error has occurred. Please reload the page</div>

  <button class="wall-error-overlay_button" onclick="window.location.reload()">Reload</button>
</div>`;

// node_modules/@wonderlandengine/components/dist/utils/webxr.js
var tempVec = new Float32Array(3);
var tempQuat = new Float32Array(4);
function setXRRigidTransformLocal(o, transform) {
  const r = transform.orientation;
  tempQuat[0] = r.x;
  tempQuat[1] = r.y;
  tempQuat[2] = r.z;
  tempQuat[3] = r.w;
  const t = transform.position;
  tempVec[0] = t.x;
  tempVec[1] = t.y;
  tempVec[2] = t.z;
  o.resetTranslationRotation();
  o.transformLocal.set(tempQuat);
  o.translate(tempVec);
}

// node_modules/@wonderlandengine/components/dist/anchor.js
var __decorate2 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var tempVec3 = new Float32Array(3);
var tempQuat2 = new Float32Array(4);
var _anchors, _addAnchor, addAnchor_fn, _removeAnchor, removeAnchor_fn, _getFrame, getFrame_fn, _createAnchor, createAnchor_fn, _onAddAnchor, onAddAnchor_fn, _onRestoreAnchor, onRestoreAnchor_fn, _onCreate, onCreate_fn;
var _Anchor = class extends Component {
  constructor() {
    super(...arguments);
    __privateAdd(this, _getFrame);
    __privateAdd(this, _createAnchor);
    __privateAdd(this, _onAddAnchor);
    __privateAdd(this, _onRestoreAnchor);
    __privateAdd(this, _onCreate);
    __publicField(this, "persist", false);
    /** Unique identifier to load a persistent anchor from, or empty/null if unknown */
    __publicField(this, "uuid", null);
    /** The xrAnchor, if created */
    __publicField(this, "xrAnchor", null);
    /** Emits events when the anchor is created either by being restored or newly created */
    __publicField(this, "onCreate", new Emitter());
    /** Whether the anchor is currently being tracked */
    __publicField(this, "visible", false);
    /** Emits an event when this anchor starts tracking */
    __publicField(this, "onTrackingFound", new Emitter());
    /** Emits an event when this anchor stops tracking */
    __publicField(this, "onTrackingLost", new Emitter());
    /** XRFrame to use for creating the anchor */
    __publicField(this, "xrFrame", null);
    /** XRHitTestResult to use for creating the anchor */
    __publicField(this, "xrHitResult", null);
  }
  /** Retrieve all anchors of the current scene */
  static getAllAnchors() {
    return __privateGet(_Anchor, _anchors);
  }
  /**
   * Create a new anchor
   *
   * @param o Object to attach the component to
   * @param params Parameters for the anchor component
   * @param frame XRFrame to use for anchor cration, if null, will use the current frame if available
   * @param hitResult Optional hit-test result to create the anchor with
   * @returns Promise for the newly created anchor component
   */
  static create(o, params, frame, hitResult) {
    const a = o.addComponent(_Anchor, { ...params, active: false });
    if (a === null)
      return null;
    a.xrHitResult = hitResult ?? null;
    a.xrFrame = frame ?? null;
    a.onCreate.once(() => (a.xrFrame = null, a.xrHitResult = null));
    a.active = true;
    return a.onCreate.promise();
  }
  start() {
    if (this.uuid && this.engine.xr) {
      this.persist = true;
      if (this.engine.xr.session.restorePersistentAnchor === void 0) {
        console.warn("anchor: Persistent anchors are not supported by your client. Ignoring persist property.");
      }
      this.engine.xr.session.restorePersistentAnchor(this.uuid).then(__privateMethod(this, _onRestoreAnchor, onRestoreAnchor_fn).bind(this));
    } else if (__privateMethod(this, _getFrame, getFrame_fn).call(this)) {
      __privateMethod(this, _createAnchor, createAnchor_fn).call(this).then(__privateMethod(this, _onAddAnchor, onAddAnchor_fn).bind(this));
    } else {
      throw new Error("Anchors can only be created during the XR frame in an active XR session");
    }
  }
  update() {
    if (!this.xrAnchor || !this.engine.xr)
      return;
    const pose = this.engine.xr.frame.getPose(this.xrAnchor.anchorSpace, this.engine.xr.currentReferenceSpace);
    const visible = !!pose;
    if (visible != this.visible) {
      this.visible = visible;
      (visible ? this.onTrackingFound : this.onTrackingLost).notify(this);
    }
    if (pose) {
      setXRRigidTransformLocal(this.object, pose.transform);
    }
  }
  onDestroy() {
    var _a;
    __privateMethod(_a = _Anchor, _removeAnchor, removeAnchor_fn).call(_a, this);
  }
};
var Anchor = _Anchor;
_anchors = new WeakMap();
_addAnchor = new WeakSet();
addAnchor_fn = function(anchor) {
  __privateGet(_Anchor, _anchors).push(anchor);
};
_removeAnchor = new WeakSet();
removeAnchor_fn = function(anchor) {
  const index = __privateGet(_Anchor, _anchors).indexOf(anchor);
  if (index < 0)
    return;
  __privateGet(_Anchor, _anchors).splice(index, 1);
};
_getFrame = new WeakSet();
getFrame_fn = function() {
  return this.xrFrame || this.engine.xr.frame;
};
_createAnchor = new WeakSet();
createAnchor_fn = async function() {
  if (!__privateMethod(this, _getFrame, getFrame_fn).call(this).createAnchor) {
    throw new Error("Cannot create anchor - anchors not supported, did you enable the 'anchors' WebXR feature?");
  }
  if (this.xrHitResult) {
    if (this.xrHitResult.createAnchor === void 0) {
      throw new Error("Requested anchor on XRHitTestResult, but WebXR hit-test feature is not available.");
    }
    return this.xrHitResult.createAnchor();
  } else {
    this.object.getTranslationWorld(tempVec3);
    tempQuat2.set(this.object.rotationWorld);
    const rotation = tempQuat2;
    const anchorPose = new XRRigidTransform({ x: tempVec3[0], y: tempVec3[1], z: tempVec3[2] }, { x: rotation[0], y: rotation[1], z: rotation[2], w: rotation[3] });
    return __privateMethod(this, _getFrame, getFrame_fn).call(this)?.createAnchor(anchorPose, this.engine.xr.currentReferenceSpace);
  }
};
_onAddAnchor = new WeakSet();
onAddAnchor_fn = function(anchor) {
  if (!anchor)
    return;
  if (this.persist) {
    if (anchor.requestPersistentHandle !== void 0) {
      anchor.requestPersistentHandle().then((uuid) => {
        var _a;
        this.uuid = uuid;
        __privateMethod(this, _onCreate, onCreate_fn).call(this, anchor);
        __privateMethod(_a = _Anchor, _addAnchor, addAnchor_fn).call(_a, this);
      });
      return;
    } else {
      console.warn("anchor: Persistent anchors are not supported by your client. Ignoring persist property.");
    }
  }
  __privateMethod(this, _onCreate, onCreate_fn).call(this, anchor);
};
_onRestoreAnchor = new WeakSet();
onRestoreAnchor_fn = function(anchor) {
  __privateMethod(this, _onCreate, onCreate_fn).call(this, anchor);
};
_onCreate = new WeakSet();
onCreate_fn = function(anchor) {
  this.xrAnchor = anchor;
  this.onCreate.notify(this);
};
__privateAdd(Anchor, _addAnchor);
__privateAdd(Anchor, _removeAnchor);
__publicField(Anchor, "TypeName", "anchor");
/* Static management of all anchors */
__privateAdd(Anchor, _anchors, []);
__decorate2([
  property.bool(false)
], Anchor.prototype, "persist", void 0);
__decorate2([
  property.string()
], Anchor.prototype, "uuid", void 0);

// node_modules/@wonderlandengine/components/dist/cursor-target.js
var CursorTarget = class extends Component {
  /** Emitter for events when the target is hovered */
  onHover = new Emitter();
  /** Emitter for events when the target is unhovered */
  onUnhover = new Emitter();
  /** Emitter for events when the target is clicked */
  onClick = new Emitter();
  /** Emitter for events when the cursor moves on the target */
  onMove = new Emitter();
  /** Emitter for events when the user pressed the select button on the target */
  onDown = new Emitter();
  /** Emitter for events when the user unpressed the select button on the target */
  onUp = new Emitter();
  /**
   * @deprecated Use the emitter instead.
   *
   * @example
   *    this.onHover.add(f);
   */
  addHoverFunction(f) {
    this.onHover.add(f);
  }
  /**
   * @deprecated Use the emitter instead.
   *
   * @example
   *    this.onHover.remove(f);
   */
  removeHoverFunction(f) {
    this.onHover.remove(f);
  }
  /**
   * @deprecated Use the emitter instead.
   *
   * @example
   *    this.onUnhover.add(f);
   */
  addUnHoverFunction(f) {
    this.onUnhover.add(f);
  }
  /**
   * @deprecated Use the emitter instead.
   *
   * @example
   *    this.onUnhover.remove(f);
   */
  removeUnHoverFunction(f) {
    this.onUnhover.remove(f);
  }
  /**
   * @deprecated Use the emitter instead.
   *
   * @example
   *    this.onClick.add(f);
   */
  addClickFunction(f) {
    this.onClick.add(f);
  }
  /**
   * @deprecated Use the emitter instead.
   *
   * @example
   *    component.onClick.remove(f);
   */
  removeClickFunction(f) {
    this.onClick.remove(f);
  }
  /**
   * @deprecated Use the emitter instead.
   *
   * @example
   *    component.onMove.add(f);
   */
  addMoveFunction(f) {
    this.onMove.add(f);
  }
  /**
   * @deprecated Use the emitter instead.
   *
   * @example
   *    component.onMove.remove(f);
   */
  removeMoveFunction(f) {
    this.onMove.remove(f);
  }
  /**
   * @deprecated Use the emitter instead.
   *
   * @example
   *    component.onDown.add(f);
   */
  addDownFunction(f) {
    this.onDown.add(f);
  }
  /**
   * @deprecated Use the emitter instead.
   *
   * @example
   *    component.onDown.remove(f);
   */
  removeDownFunction(f) {
    this.onDown.remove(f);
  }
  /**
   * @deprecated Use the emitter instead.
   *
   * @example
   *    component.onUp.add(f);
   */
  addUpFunction(f) {
    this.onUp.add(f);
  }
  /**
   * @deprecated Use the emitter instead.
   *
   * @example
   *    component.onUp.remove(f);
   */
  removeUpFunction(f) {
    this.onUp.remove(f);
  }
};
__publicField(CursorTarget, "TypeName", "cursor-target");
__publicField(CursorTarget, "Properties", {});

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

// node_modules/gl-matrix/esm/mat3.js
function create() {
  var out = new ARRAY_TYPE(9);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }
  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}

// node_modules/gl-matrix/esm/mat4.js
var mat4_exports = {};
__export(mat4_exports, {
  add: () => add,
  adjoint: () => adjoint,
  clone: () => clone,
  copy: () => copy,
  create: () => create2,
  determinant: () => determinant,
  equals: () => equals,
  exactEquals: () => exactEquals,
  frob: () => frob,
  fromQuat: () => fromQuat,
  fromQuat2: () => fromQuat2,
  fromRotation: () => fromRotation,
  fromRotationTranslation: () => fromRotationTranslation,
  fromRotationTranslationScale: () => fromRotationTranslationScale,
  fromRotationTranslationScaleOrigin: () => fromRotationTranslationScaleOrigin,
  fromScaling: () => fromScaling,
  fromTranslation: () => fromTranslation,
  fromValues: () => fromValues,
  fromXRotation: () => fromXRotation,
  fromYRotation: () => fromYRotation,
  fromZRotation: () => fromZRotation,
  frustum: () => frustum,
  getRotation: () => getRotation,
  getScaling: () => getScaling,
  getTranslation: () => getTranslation,
  identity: () => identity,
  invert: () => invert,
  lookAt: () => lookAt,
  mul: () => mul,
  multiply: () => multiply,
  multiplyScalar: () => multiplyScalar,
  multiplyScalarAndAdd: () => multiplyScalarAndAdd,
  ortho: () => ortho,
  orthoNO: () => orthoNO,
  orthoZO: () => orthoZO,
  perspective: () => perspective,
  perspectiveFromFieldOfView: () => perspectiveFromFieldOfView,
  perspectiveNO: () => perspectiveNO,
  perspectiveZO: () => perspectiveZO,
  rotate: () => rotate,
  rotateX: () => rotateX,
  rotateY: () => rotateY,
  rotateZ: () => rotateZ,
  scale: () => scale,
  set: () => set,
  str: () => str,
  sub: () => sub,
  subtract: () => subtract,
  targetTo: () => targetTo,
  translate: () => translate,
  transpose: () => transpose
});
function create2() {
  var out = new ARRAY_TYPE(16);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
function clone(a) {
  var out = new ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function transpose(out, a) {
  if (out === a) {
    var a01 = a[1], a02 = a[2], a03 = a[3];
    var a12 = a[6], a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }
  return out;
}
function invert(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
function adjoint(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}
function determinant(a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
function multiply(out, a, b) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
function translate(out, a, v) {
  var x = v[0], y = v[1], z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }
  return out;
}
function scale(out, a, v) {
  var x = v[0], y = v[1], z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function rotate(out, a, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len4 = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;
  if (len4 < EPSILON) {
    return null;
  }
  len4 = 1 / len4;
  x *= len4;
  y *= len4;
  z *= len4;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11];
  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c;
  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;
  if (a !== out) {
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  return out;
}
function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];
  if (a !== out) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];
  if (a !== out) {
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  if (a !== out) {
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromRotation(out, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len4 = Math.hypot(x, y, z);
  var s, c, t;
  if (len4 < EPSILON) {
    return null;
  }
  len4 = 1 / len4;
  x *= len4;
  y *= len4;
  z *= len4;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromRotationTranslation(out, q, v) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromQuat2(out, a) {
  var translation = new ARRAY_TYPE(3);
  var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7];
  var magnitude = bx * bx + by * by + bz * bz + bw * bw;
  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }
  fromRotationTranslation(out, a, translation);
  return out;
}
function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
function getRotation(out, mat) {
  var scaling = new ARRAY_TYPE(3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;
  if (trace > 0) {
    S = Math.sqrt(trace + 1) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }
  return out;
}
function fromRotationTranslationScale(out, q, v, s) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  var ox = o[0];
  var oy = o[1];
  var oz = o[2];
  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;
  return out;
}
function fromQuat(out, q) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
function perspectiveNO(out, fovy, aspect, near, far) {
  var f = 1 / Math.tan(fovy / 2), nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }
  return out;
}
var perspective = perspectiveNO;
function perspectiveZO(out, fovy, aspect, near, far) {
  var f = 1 / Math.tan(fovy / 2), nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = far * nf;
    out[14] = far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -near;
  }
  return out;
}
function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
  var xScale = 2 / (leftTan + rightTan);
  var yScale = 2 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = yScale;
  out[6] = 0;
  out[7] = 0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near / (near - far);
  out[15] = 0;
  return out;
}
function orthoNO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
var ortho = orthoNO;
function orthoZO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = near * nf;
  out[15] = 1;
  return out;
}
function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len4;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];
  if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
    return identity(out);
  }
  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len4 = 1 / Math.hypot(z0, z1, z2);
  z0 *= len4;
  z1 *= len4;
  z2 *= len4;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len4 = Math.hypot(x0, x1, x2);
  if (!len4) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len4 = 1 / len4;
    x0 *= len4;
    x1 *= len4;
    x2 *= len4;
  }
  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len4 = Math.hypot(y0, y1, y2);
  if (!len4) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len4 = 1 / len4;
    y0 *= len4;
    y1 *= len4;
    y2 *= len4;
  }
  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
function targetTo(out, eye, target, up) {
  var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
  var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
  var len4 = z0 * z0 + z1 * z1 + z2 * z2;
  if (len4 > 0) {
    len4 = 1 / Math.sqrt(len4);
    z0 *= len4;
    z1 *= len4;
    z2 *= len4;
  }
  var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
  len4 = x0 * x0 + x1 * x1 + x2 * x2;
  if (len4 > 0) {
    len4 = 1 / Math.sqrt(len4);
    x0 *= len4;
    x1 *= len4;
    x2 *= len4;
  }
  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
function str(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
function multiplyScalarAndAdd(out, a, b, scale6) {
  out[0] = a[0] + b[0] * scale6;
  out[1] = a[1] + b[1] * scale6;
  out[2] = a[2] + b[2] * scale6;
  out[3] = a[3] + b[3] * scale6;
  out[4] = a[4] + b[4] * scale6;
  out[5] = a[5] + b[5] * scale6;
  out[6] = a[6] + b[6] * scale6;
  out[7] = a[7] + b[7] * scale6;
  out[8] = a[8] + b[8] * scale6;
  out[9] = a[9] + b[9] * scale6;
  out[10] = a[10] + b[10] * scale6;
  out[11] = a[11] + b[11] * scale6;
  out[12] = a[12] + b[12] * scale6;
  out[13] = a[13] + b[13] * scale6;
  out[14] = a[14] + b[14] * scale6;
  out[15] = a[15] + b[15] * scale6;
  return out;
}
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
function equals(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
  var a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
  var a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
  var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
  var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
}
var mul = multiply;
var sub = subtract;

// node_modules/gl-matrix/esm/quat.js
var quat_exports = {};
__export(quat_exports, {
  add: () => add4,
  calculateW: () => calculateW,
  clone: () => clone4,
  conjugate: () => conjugate,
  copy: () => copy4,
  create: () => create5,
  dot: () => dot3,
  equals: () => equals4,
  exactEquals: () => exactEquals4,
  exp: () => exp,
  fromEuler: () => fromEuler,
  fromMat3: () => fromMat3,
  fromValues: () => fromValues4,
  getAngle: () => getAngle,
  getAxisAngle: () => getAxisAngle,
  identity: () => identity2,
  invert: () => invert2,
  len: () => len2,
  length: () => length3,
  lerp: () => lerp3,
  ln: () => ln,
  mul: () => mul3,
  multiply: () => multiply3,
  normalize: () => normalize3,
  pow: () => pow,
  random: () => random2,
  rotateX: () => rotateX3,
  rotateY: () => rotateY3,
  rotateZ: () => rotateZ3,
  rotationTo: () => rotationTo,
  scale: () => scale4,
  set: () => set4,
  setAxes: () => setAxes,
  setAxisAngle: () => setAxisAngle,
  slerp: () => slerp,
  sqlerp: () => sqlerp,
  sqrLen: () => sqrLen2,
  squaredLength: () => squaredLength3,
  str: () => str3
});

// node_modules/gl-matrix/esm/vec3.js
var vec3_exports = {};
__export(vec3_exports, {
  add: () => add2,
  angle: () => angle,
  bezier: () => bezier,
  ceil: () => ceil,
  clone: () => clone2,
  copy: () => copy2,
  create: () => create3,
  cross: () => cross,
  dist: () => dist,
  distance: () => distance,
  div: () => div,
  divide: () => divide,
  dot: () => dot,
  equals: () => equals2,
  exactEquals: () => exactEquals2,
  floor: () => floor,
  forEach: () => forEach,
  fromValues: () => fromValues2,
  hermite: () => hermite,
  inverse: () => inverse,
  len: () => len,
  length: () => length,
  lerp: () => lerp,
  max: () => max,
  min: () => min,
  mul: () => mul2,
  multiply: () => multiply2,
  negate: () => negate,
  normalize: () => normalize,
  random: () => random,
  rotateX: () => rotateX2,
  rotateY: () => rotateY2,
  rotateZ: () => rotateZ2,
  round: () => round,
  scale: () => scale2,
  scaleAndAdd: () => scaleAndAdd,
  set: () => set2,
  sqrDist: () => sqrDist,
  sqrLen: () => sqrLen,
  squaredDistance: () => squaredDistance,
  squaredLength: () => squaredLength,
  str: () => str2,
  sub: () => sub2,
  subtract: () => subtract2,
  transformMat3: () => transformMat3,
  transformMat4: () => transformMat4,
  transformQuat: () => transformQuat,
  zero: () => zero
});
function create3() {
  var out = new ARRAY_TYPE(3);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  return out;
}
function clone2(a) {
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
function fromValues2(x, y, z) {
  var out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function copy2(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
function set2(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function add2(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
function subtract2(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
function multiply2(out, a, b) {
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
function scale2(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
function scaleAndAdd(out, a, b, scale6) {
  out[0] = a[0] + b[0] * scale6;
  out[1] = a[1] + b[1] * scale6;
  out[2] = a[2] + b[2] * scale6;
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
  var len4 = x * x + y * y + z * z;
  if (len4 > 0) {
    len4 = 1 / Math.sqrt(len4);
  }
  out[0] = a[0] * len4;
  out[1] = a[1] * len4;
  out[2] = a[2] * len4;
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
function random(out, scale6) {
  scale6 = scale6 || 1;
  var r = RANDOM() * 2 * Math.PI;
  var z = RANDOM() * 2 - 1;
  var zScale = Math.sqrt(1 - z * z) * scale6;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale6;
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
function rotateX2(out, a, b, rad) {
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
function rotateY2(out, a, b, rad) {
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
function rotateZ2(out, a, b, rad) {
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
function str2(a) {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
function exactEquals2(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
function equals2(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2];
  var b0 = b[0], b1 = b[1], b2 = b[2];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
}
var sub2 = subtract2;
var mul2 = multiply2;
var div = divide;
var dist = distance;
var sqrDist = squaredDistance;
var len = length;
var sqrLen = squaredLength;
var forEach = function() {
  var vec = create3();
  return function(a, stride, offset2, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 3;
    }
    if (!offset2) {
      offset2 = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset2, a.length);
    } else {
      l = a.length;
    }
    for (i = offset2; i < l; i += stride) {
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

// node_modules/gl-matrix/esm/vec4.js
function create4() {
  var out = new ARRAY_TYPE(4);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }
  return out;
}
function clone3(a) {
  var out = new ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function fromValues3(x, y, z, w) {
  var out = new ARRAY_TYPE(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
function copy3(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function set3(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
function add3(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
function scale3(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
function length2(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.hypot(x, y, z, w);
}
function squaredLength2(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}
function normalize2(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len4 = x * x + y * y + z * z + w * w;
  if (len4 > 0) {
    len4 = 1 / Math.sqrt(len4);
  }
  out[0] = x * len4;
  out[1] = y * len4;
  out[2] = z * len4;
  out[3] = w * len4;
  return out;
}
function dot2(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
function lerp2(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
function exactEquals3(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
function equals3(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
}
var forEach2 = function() {
  var vec = create4();
  return function(a, stride, offset2, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 4;
    }
    if (!offset2) {
      offset2 = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset2, a.length);
    } else {
      l = a.length;
    }
    for (i = offset2; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }
    return a;
  };
}();

// node_modules/gl-matrix/esm/quat.js
function create5() {
  var out = new ARRAY_TYPE(4);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  out[3] = 1;
  return out;
}
function identity2(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
function getAxisAngle(out_axis, q) {
  var rad = Math.acos(q[3]) * 2;
  var s = Math.sin(rad / 2);
  if (s > EPSILON) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }
  return rad;
}
function getAngle(a, b) {
  var dotproduct = dot3(a, b);
  return Math.acos(2 * dotproduct * dotproduct - 1);
}
function multiply3(out, a, b) {
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bx = b[0], by = b[1], bz = b[2], bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
function rotateX3(out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bx = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}
function rotateY3(out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var by = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}
function rotateZ3(out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bz = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}
function calculateW(out, a) {
  var x = a[0], y = a[1], z = a[2];
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
  return out;
}
function exp(out, a) {
  var x = a[0], y = a[1], z = a[2], w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var et = Math.exp(w);
  var s = r > 0 ? et * Math.sin(r) / r : 0;
  out[0] = x * s;
  out[1] = y * s;
  out[2] = z * s;
  out[3] = et * Math.cos(r);
  return out;
}
function ln(out, a) {
  var x = a[0], y = a[1], z = a[2], w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var t = r > 0 ? Math.atan2(r, w) / r : 0;
  out[0] = x * t;
  out[1] = y * t;
  out[2] = z * t;
  out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
  return out;
}
function pow(out, a, b) {
  ln(out, a);
  scale4(out, out, b);
  exp(out, out);
  return out;
}
function slerp(out, a, b, t) {
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bx = b[0], by = b[1], bz = b[2], bw = b[3];
  var omega, cosom, sinom, scale0, scale1;
  cosom = ax * bx + ay * by + az * bz + aw * bw;
  if (cosom < 0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  }
  if (1 - cosom > EPSILON) {
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    scale0 = 1 - t;
    scale1 = t;
  }
  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
function random2(out) {
  var u1 = RANDOM();
  var u2 = RANDOM();
  var u3 = RANDOM();
  var sqrt1MinusU1 = Math.sqrt(1 - u1);
  var sqrtU1 = Math.sqrt(u1);
  out[0] = sqrt1MinusU1 * Math.sin(2 * Math.PI * u2);
  out[1] = sqrt1MinusU1 * Math.cos(2 * Math.PI * u2);
  out[2] = sqrtU1 * Math.sin(2 * Math.PI * u3);
  out[3] = sqrtU1 * Math.cos(2 * Math.PI * u3);
  return out;
}
function invert2(out, a) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var dot5 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot5 ? 1 / dot5 : 0;
  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}
function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}
function fromMat3(out, m) {
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;
  if (fTrace > 0) {
    fRoot = Math.sqrt(fTrace + 1);
    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    var i = 0;
    if (m[4] > m[0])
      i = 1;
    if (m[8] > m[i * 3 + i])
      i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }
  return out;
}
function fromEuler(out, x, y, z) {
  var halfToRad = 0.5 * Math.PI / 180;
  x *= halfToRad;
  y *= halfToRad;
  z *= halfToRad;
  var sx = Math.sin(x);
  var cx = Math.cos(x);
  var sy = Math.sin(y);
  var cy = Math.cos(y);
  var sz = Math.sin(z);
  var cz = Math.cos(z);
  out[0] = sx * cy * cz - cx * sy * sz;
  out[1] = cx * sy * cz + sx * cy * sz;
  out[2] = cx * cy * sz - sx * sy * cz;
  out[3] = cx * cy * cz + sx * sy * sz;
  return out;
}
function str3(a) {
  return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
var clone4 = clone3;
var fromValues4 = fromValues3;
var copy4 = copy3;
var set4 = set3;
var add4 = add3;
var mul3 = multiply3;
var scale4 = scale3;
var dot3 = dot2;
var lerp3 = lerp2;
var length3 = length2;
var len2 = length3;
var squaredLength3 = squaredLength2;
var sqrLen2 = squaredLength3;
var normalize3 = normalize2;
var exactEquals4 = exactEquals3;
var equals4 = equals3;
var rotationTo = function() {
  var tmpvec3 = create3();
  var xUnitVec3 = fromValues2(1, 0, 0);
  var yUnitVec3 = fromValues2(0, 1, 0);
  return function(out, a, b) {
    var dot5 = dot(a, b);
    if (dot5 < -0.999999) {
      cross(tmpvec3, xUnitVec3, a);
      if (len(tmpvec3) < 1e-6)
        cross(tmpvec3, yUnitVec3, a);
      normalize(tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot5 > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      cross(tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot5;
      return normalize3(out, out);
    }
  };
}();
var sqlerp = function() {
  var temp1 = create5();
  var temp2 = create5();
  return function(out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
}();
var setAxes = function() {
  var matr = create();
  return function(out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];
    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];
    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];
    return normalize3(out, fromMat3(out, matr));
  };
}();

// node_modules/gl-matrix/esm/quat2.js
var quat2_exports = {};
__export(quat2_exports, {
  add: () => add5,
  clone: () => clone5,
  conjugate: () => conjugate2,
  copy: () => copy5,
  create: () => create6,
  dot: () => dot4,
  equals: () => equals5,
  exactEquals: () => exactEquals5,
  fromMat4: () => fromMat4,
  fromRotation: () => fromRotation2,
  fromRotationTranslation: () => fromRotationTranslation2,
  fromRotationTranslationValues: () => fromRotationTranslationValues,
  fromTranslation: () => fromTranslation2,
  fromValues: () => fromValues5,
  getDual: () => getDual,
  getReal: () => getReal,
  getTranslation: () => getTranslation2,
  identity: () => identity3,
  invert: () => invert3,
  len: () => len3,
  length: () => length4,
  lerp: () => lerp4,
  mul: () => mul4,
  multiply: () => multiply4,
  normalize: () => normalize4,
  rotateAroundAxis: () => rotateAroundAxis,
  rotateByQuatAppend: () => rotateByQuatAppend,
  rotateByQuatPrepend: () => rotateByQuatPrepend,
  rotateX: () => rotateX4,
  rotateY: () => rotateY4,
  rotateZ: () => rotateZ4,
  scale: () => scale5,
  set: () => set5,
  setDual: () => setDual,
  setReal: () => setReal,
  sqrLen: () => sqrLen3,
  squaredLength: () => squaredLength4,
  str: () => str4,
  translate: () => translate2
});
function create6() {
  var dq = new ARRAY_TYPE(8);
  if (ARRAY_TYPE != Float32Array) {
    dq[0] = 0;
    dq[1] = 0;
    dq[2] = 0;
    dq[4] = 0;
    dq[5] = 0;
    dq[6] = 0;
    dq[7] = 0;
  }
  dq[3] = 1;
  return dq;
}
function clone5(a) {
  var dq = new ARRAY_TYPE(8);
  dq[0] = a[0];
  dq[1] = a[1];
  dq[2] = a[2];
  dq[3] = a[3];
  dq[4] = a[4];
  dq[5] = a[5];
  dq[6] = a[6];
  dq[7] = a[7];
  return dq;
}
function fromValues5(x1, y1, z1, w1, x2, y2, z2, w2) {
  var dq = new ARRAY_TYPE(8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  dq[4] = x2;
  dq[5] = y2;
  dq[6] = z2;
  dq[7] = w2;
  return dq;
}
function fromRotationTranslationValues(x1, y1, z1, w1, x2, y2, z2) {
  var dq = new ARRAY_TYPE(8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  var ax = x2 * 0.5, ay = y2 * 0.5, az = z2 * 0.5;
  dq[4] = ax * w1 + ay * z1 - az * y1;
  dq[5] = ay * w1 + az * x1 - ax * z1;
  dq[6] = az * w1 + ax * y1 - ay * x1;
  dq[7] = -ax * x1 - ay * y1 - az * z1;
  return dq;
}
function fromRotationTranslation2(out, q, t) {
  var ax = t[0] * 0.5, ay = t[1] * 0.5, az = t[2] * 0.5, bx = q[0], by = q[1], bz = q[2], bw = q[3];
  out[0] = bx;
  out[1] = by;
  out[2] = bz;
  out[3] = bw;
  out[4] = ax * bw + ay * bz - az * by;
  out[5] = ay * bw + az * bx - ax * bz;
  out[6] = az * bw + ax * by - ay * bx;
  out[7] = -ax * bx - ay * by - az * bz;
  return out;
}
function fromTranslation2(out, t) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = t[0] * 0.5;
  out[5] = t[1] * 0.5;
  out[6] = t[2] * 0.5;
  out[7] = 0;
  return out;
}
function fromRotation2(out, q) {
  out[0] = q[0];
  out[1] = q[1];
  out[2] = q[2];
  out[3] = q[3];
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}
function fromMat4(out, a) {
  var outer = create5();
  getRotation(outer, a);
  var t = new ARRAY_TYPE(3);
  getTranslation(t, a);
  fromRotationTranslation2(out, outer, t);
  return out;
}
function copy5(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  return out;
}
function identity3(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}
function set5(out, x1, y1, z1, w1, x2, y2, z2, w2) {
  out[0] = x1;
  out[1] = y1;
  out[2] = z1;
  out[3] = w1;
  out[4] = x2;
  out[5] = y2;
  out[6] = z2;
  out[7] = w2;
  return out;
}
var getReal = copy4;
function getDual(out, a) {
  out[0] = a[4];
  out[1] = a[5];
  out[2] = a[6];
  out[3] = a[7];
  return out;
}
var setReal = copy4;
function setDual(out, q) {
  out[4] = q[0];
  out[5] = q[1];
  out[6] = q[2];
  out[7] = q[3];
  return out;
}
function getTranslation2(out, a) {
  var ax = a[4], ay = a[5], az = a[6], aw = a[7], bx = -a[0], by = -a[1], bz = -a[2], bw = a[3];
  out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
  out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
  out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  return out;
}
function translate2(out, a, v) {
  var ax1 = a[0], ay1 = a[1], az1 = a[2], aw1 = a[3], bx1 = v[0] * 0.5, by1 = v[1] * 0.5, bz1 = v[2] * 0.5, ax2 = a[4], ay2 = a[5], az2 = a[6], aw2 = a[7];
  out[0] = ax1;
  out[1] = ay1;
  out[2] = az1;
  out[3] = aw1;
  out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
  out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
  out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
  out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
  return out;
}
function rotateX4(out, a, rad) {
  var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7], ax1 = ax * bw + aw * bx + ay * bz - az * by, ay1 = ay * bw + aw * by + az * bx - ax * bz, az1 = az * bw + aw * bz + ax * by - ay * bx, aw1 = aw * bw - ax * bx - ay * by - az * bz;
  rotateX3(out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
function rotateY4(out, a, rad) {
  var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7], ax1 = ax * bw + aw * bx + ay * bz - az * by, ay1 = ay * bw + aw * by + az * bx - ax * bz, az1 = az * bw + aw * bz + ax * by - ay * bx, aw1 = aw * bw - ax * bx - ay * by - az * bz;
  rotateY3(out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
function rotateZ4(out, a, rad) {
  var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7], ax1 = ax * bw + aw * bx + ay * bz - az * by, ay1 = ay * bw + aw * by + az * bx - ax * bz, az1 = az * bw + aw * bz + ax * by - ay * bx, aw1 = aw * bw - ax * bx - ay * by - az * bz;
  rotateZ3(out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
function rotateByQuatAppend(out, a, q) {
  var qx = q[0], qy = q[1], qz = q[2], qw = q[3], ax = a[0], ay = a[1], az = a[2], aw = a[3];
  out[0] = ax * qw + aw * qx + ay * qz - az * qy;
  out[1] = ay * qw + aw * qy + az * qx - ax * qz;
  out[2] = az * qw + aw * qz + ax * qy - ay * qx;
  out[3] = aw * qw - ax * qx - ay * qy - az * qz;
  ax = a[4];
  ay = a[5];
  az = a[6];
  aw = a[7];
  out[4] = ax * qw + aw * qx + ay * qz - az * qy;
  out[5] = ay * qw + aw * qy + az * qx - ax * qz;
  out[6] = az * qw + aw * qz + ax * qy - ay * qx;
  out[7] = aw * qw - ax * qx - ay * qy - az * qz;
  return out;
}
function rotateByQuatPrepend(out, q, a) {
  var qx = q[0], qy = q[1], qz = q[2], qw = q[3], bx = a[0], by = a[1], bz = a[2], bw = a[3];
  out[0] = qx * bw + qw * bx + qy * bz - qz * by;
  out[1] = qy * bw + qw * by + qz * bx - qx * bz;
  out[2] = qz * bw + qw * bz + qx * by - qy * bx;
  out[3] = qw * bw - qx * bx - qy * by - qz * bz;
  bx = a[4];
  by = a[5];
  bz = a[6];
  bw = a[7];
  out[4] = qx * bw + qw * bx + qy * bz - qz * by;
  out[5] = qy * bw + qw * by + qz * bx - qx * bz;
  out[6] = qz * bw + qw * bz + qx * by - qy * bx;
  out[7] = qw * bw - qx * bx - qy * by - qz * bz;
  return out;
}
function rotateAroundAxis(out, a, axis, rad) {
  if (Math.abs(rad) < EPSILON) {
    return copy5(out, a);
  }
  var axisLength = Math.hypot(axis[0], axis[1], axis[2]);
  rad = rad * 0.5;
  var s = Math.sin(rad);
  var bx = s * axis[0] / axisLength;
  var by = s * axis[1] / axisLength;
  var bz = s * axis[2] / axisLength;
  var bw = Math.cos(rad);
  var ax1 = a[0], ay1 = a[1], az1 = a[2], aw1 = a[3];
  out[0] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[1] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[2] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[3] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  var ax = a[4], ay = a[5], az = a[6], aw = a[7];
  out[4] = ax * bw + aw * bx + ay * bz - az * by;
  out[5] = ay * bw + aw * by + az * bx - ax * bz;
  out[6] = az * bw + aw * bz + ax * by - ay * bx;
  out[7] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
function add5(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  return out;
}
function multiply4(out, a, b) {
  var ax0 = a[0], ay0 = a[1], az0 = a[2], aw0 = a[3], bx1 = b[4], by1 = b[5], bz1 = b[6], bw1 = b[7], ax1 = a[4], ay1 = a[5], az1 = a[6], aw1 = a[7], bx0 = b[0], by0 = b[1], bz0 = b[2], bw0 = b[3];
  out[0] = ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0;
  out[1] = ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0;
  out[2] = az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0;
  out[3] = aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0;
  out[4] = ax0 * bw1 + aw0 * bx1 + ay0 * bz1 - az0 * by1 + ax1 * bw0 + aw1 * bx0 + ay1 * bz0 - az1 * by0;
  out[5] = ay0 * bw1 + aw0 * by1 + az0 * bx1 - ax0 * bz1 + ay1 * bw0 + aw1 * by0 + az1 * bx0 - ax1 * bz0;
  out[6] = az0 * bw1 + aw0 * bz1 + ax0 * by1 - ay0 * bx1 + az1 * bw0 + aw1 * bz0 + ax1 * by0 - ay1 * bx0;
  out[7] = aw0 * bw1 - ax0 * bx1 - ay0 * by1 - az0 * bz1 + aw1 * bw0 - ax1 * bx0 - ay1 * by0 - az1 * bz0;
  return out;
}
var mul4 = multiply4;
function scale5(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  return out;
}
var dot4 = dot3;
function lerp4(out, a, b, t) {
  var mt = 1 - t;
  if (dot4(a, b) < 0)
    t = -t;
  out[0] = a[0] * mt + b[0] * t;
  out[1] = a[1] * mt + b[1] * t;
  out[2] = a[2] * mt + b[2] * t;
  out[3] = a[3] * mt + b[3] * t;
  out[4] = a[4] * mt + b[4] * t;
  out[5] = a[5] * mt + b[5] * t;
  out[6] = a[6] * mt + b[6] * t;
  out[7] = a[7] * mt + b[7] * t;
  return out;
}
function invert3(out, a) {
  var sqlen = squaredLength4(a);
  out[0] = -a[0] / sqlen;
  out[1] = -a[1] / sqlen;
  out[2] = -a[2] / sqlen;
  out[3] = a[3] / sqlen;
  out[4] = -a[4] / sqlen;
  out[5] = -a[5] / sqlen;
  out[6] = -a[6] / sqlen;
  out[7] = a[7] / sqlen;
  return out;
}
function conjugate2(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  out[4] = -a[4];
  out[5] = -a[5];
  out[6] = -a[6];
  out[7] = a[7];
  return out;
}
var length4 = length3;
var len3 = length4;
var squaredLength4 = squaredLength3;
var sqrLen3 = squaredLength4;
function normalize4(out, a) {
  var magnitude = squaredLength4(a);
  if (magnitude > 0) {
    magnitude = Math.sqrt(magnitude);
    var a0 = a[0] / magnitude;
    var a1 = a[1] / magnitude;
    var a2 = a[2] / magnitude;
    var a3 = a[3] / magnitude;
    var b0 = a[4];
    var b1 = a[5];
    var b2 = a[6];
    var b3 = a[7];
    var a_dot_b = a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = (b0 - a0 * a_dot_b) / magnitude;
    out[5] = (b1 - a1 * a_dot_b) / magnitude;
    out[6] = (b2 - a2 * a_dot_b) / magnitude;
    out[7] = (b3 - a3 * a_dot_b) / magnitude;
  }
  return out;
}
function str4(a) {
  return "quat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ")";
}
function exactEquals5(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7];
}
function equals5(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7));
}

// node_modules/@wonderlandengine/components/dist/hit-test-location.js
var __decorate3 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HitTestLocation = class extends Component {
  tempScaling = new Float32Array(3);
  visible = false;
  xrHitTestSource = null;
  /** Reference space for creating the hit test when the session starts */
  xrReferenceSpace = null;
  /**
   * For maintaining backwards compatibility: Whether to scale the object to 0 and back.
   * @deprecated Use onHitLost and onHitFound instead.
   */
  scaleObject = true;
  /** Emits an event when the hit test switches from visible to invisible */
  onHitLost = new Emitter();
  /** Emits an event when the hit test switches from invisible to visible */
  onHitFound = new Emitter();
  onSessionStartCallback = null;
  onSessionEndCallback = null;
  start() {
    this.onSessionStartCallback = this.onXRSessionStart.bind(this);
    this.onSessionEndCallback = this.onXRSessionEnd.bind(this);
    if (this.scaleObject) {
      this.tempScaling.set(this.object.scalingLocal);
      this.object.scale([0, 0, 0]);
      this.onHitLost.add(() => {
        this.tempScaling.set(this.object.scalingLocal);
        this.object.scale([0, 0, 0]);
      });
      this.onHitFound.add(() => {
        this.object.scalingLocal.set(this.tempScaling);
        this.object.setDirty();
      });
    }
  }
  onActivate() {
    this.engine.onXRSessionStart.add(this.onSessionStartCallback);
    this.engine.onXRSessionEnd.add(this.onSessionEndCallback);
  }
  onDeactivate() {
    this.engine.onXRSessionStart.remove(this.onSessionStartCallback);
    this.engine.onXRSessionEnd.remove(this.onSessionEndCallback);
  }
  update() {
    const wasVisible = this.visible;
    if (this.xrHitTestSource) {
      const frame = this.engine.xrFrame;
      if (!frame)
        return;
      let hitTestResults = frame.getHitTestResults(this.xrHitTestSource);
      if (hitTestResults.length > 0) {
        let pose = hitTestResults[0].getPose(this.engine.xr.currentReferenceSpace);
        this.visible = !!pose;
        if (pose) {
          setXRRigidTransformLocal(this.object, pose.transform);
        }
      } else {
        this.visible = false;
      }
    }
    if (this.visible != wasVisible) {
      (this.visible ? this.onHitFound : this.onHitLost).notify(this);
    }
  }
  getHitTestResults(frame = this.engine.xr?.frame ?? null) {
    if (!frame)
      return [];
    if (!this.xrHitTestSource)
      return [];
    return frame.getHitTestResults(this.xrHitTestSource);
  }
  onXRSessionStart(session) {
    if (session.requestHitTestSource === void 0) {
      console.error("hit-test-location: hit test feature not available. Deactivating component.");
      this.active = false;
      return;
    }
    session.requestHitTestSource({
      space: this.xrReferenceSpace ?? this.engine.xr.referenceSpaceForType("viewer")
    }).then((hitTestSource) => {
      this.xrHitTestSource = hitTestSource;
    }).catch(console.error);
  }
  onXRSessionEnd() {
    if (!this.xrHitTestSource)
      return;
    this.xrHitTestSource.cancel();
    this.xrHitTestSource = null;
  }
};
__publicField(HitTestLocation, "TypeName", "hit-test-location");
__decorate3([
  property.bool(true)
], HitTestLocation.prototype, "scaleObject", void 0);

// node_modules/@wonderlandengine/components/dist/cursor.js
var __decorate4 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var tempVec2 = new Float32Array(3);
var CursorTargetEmitters = class {
  /** Emitter for events when the target is hovered */
  onHover = new Emitter();
  /** Emitter for events when the target is unhovered */
  onUnhover = new Emitter();
  /** Emitter for events when the target is clicked */
  onClick = new Emitter();
  /** Emitter for events when the cursor moves on the target */
  onMove = new Emitter();
  /** Emitter for events when the user pressed the select button on the target */
  onDown = new Emitter();
  /** Emitter for events when the user unpressed the select button on the target */
  onUp = new Emitter();
};
var Cursor = class extends Component {
  static onRegister(engine2) {
    engine2.registerComponent(HitTestLocation);
  }
  _collisionMask = 0;
  _onDeactivateCallbacks = [];
  _input = null;
  _origin = new Float32Array(3);
  _cursorObjScale = new Float32Array(3);
  _direction = new Float32Array(3);
  _projectionMatrix = new Float32Array(16);
  _viewComponent = null;
  _isDown = false;
  _lastIsDown = false;
  _arTouchDown = false;
  _lastCursorPosOnTarget = new Float32Array(3);
  _cursorRayScale = new Float32Array(3);
  _hitTestLocation = null;
  _hitTestObject = null;
  _onSessionStartCallback = null;
  /**
   * Whether the cursor (and cursorObject) is visible, i.e. pointing at an object
   * that matches the collision group
   */
  visible = true;
  /** Maximum distance for the cursor's ray cast */
  maxDistance = 100;
  /** Currently hovered object */
  hoveringObject = null;
  /** CursorTarget component of the currently hovered object */
  hoveringObjectTarget = null;
  /** Whether the cursor is hovering reality via hit-test */
  hoveringReality = false;
  /**
   * Global target lets you receive global cursor events on any object.
   */
  globalTarget = new CursorTargetEmitters();
  /**
   * Hit test target lets you receive cursor events for "reality", if
   * `useWebXRHitTest` is set to `true`.
   *
   * @example
   * ```js
   * cursor.hitTestTarget.onClick.add((hit, cursor) => {
   *     // User clicked on reality
   * });
   * ```
   */
  hitTestTarget = new CursorTargetEmitters();
  /** World position of the cursor */
  cursorPos = new Float32Array(3);
  /** Collision group for the ray cast. Only objects in this group will be affected by this cursor. */
  collisionGroup = 1;
  /** (optional) Object that visualizes the cursor's ray. */
  cursorRayObject = null;
  /** Axis along which to scale the `cursorRayObject`. */
  cursorRayScalingAxis = 2;
  /** (optional) Object that visualizes the cursor's hit location. */
  cursorObject = null;
  /** Handedness for VR cursors to accept trigger events only from respective controller. */
  handedness = 0;
  /** Mode for raycasting, whether to use PhysX or simple collision components */
  rayCastMode = 0;
  /** Whether to set the CSS style of the mouse cursor on desktop */
  styleCursor = true;
  /**
   * Use WebXR hit-test if available.
   *
   * Attaches a hit-test-location component to the cursorObject, which will be used
   * by the cursor to send events to the hitTestTarget with HitTestResult.
   */
  useWebXRHitTest = false;
  _onViewportResize = () => {
    if (!this._viewComponent)
      return;
    mat4_exports.invert(this._projectionMatrix, this._viewComponent.projectionMatrix);
  };
  start() {
    this._collisionMask = 1 << this.collisionGroup;
    if (this.handedness == 0) {
      const inputComp = this.object.getComponent("input");
      if (!inputComp) {
        console.warn("cursor component on object", this.object.name, 'was configured with handedness "input component", but object has no input component.');
      } else {
        this.handedness = inputComp.handedness || "none";
        this._input = inputComp;
      }
    } else {
      this.handedness = ["left", "right", "none"][this.handedness - 1];
    }
    this._viewComponent = this.object.getComponent(ViewComponent);
    if (this.useWebXRHitTest) {
      this._hitTestObject = this.engine.scene.addObject(this.object);
      this._hitTestLocation = this._hitTestObject.addComponent(HitTestLocation, {
        scaleObject: false
      }) ?? null;
    }
    this._onSessionStartCallback = this.setupVREvents.bind(this);
  }
  onActivate() {
    this.engine.onXRSessionStart.add(this._onSessionStartCallback);
    this.engine.onResize.add(this._onViewportResize);
    this._setCursorVisibility(true);
    if (this._viewComponent != null) {
      const canvas2 = this.engine.canvas;
      const onClick = this.onClick.bind(this);
      const onPointerMove = this.onPointerMove.bind(this);
      const onPointerDown = this.onPointerDown.bind(this);
      const onPointerUp = this.onPointerUp.bind(this);
      canvas2.addEventListener("click", onClick);
      canvas2.addEventListener("pointermove", onPointerMove);
      canvas2.addEventListener("pointerdown", onPointerDown);
      canvas2.addEventListener("pointerup", onPointerUp);
      this._onDeactivateCallbacks.push(() => {
        canvas2.removeEventListener("click", onClick);
        canvas2.removeEventListener("pointermove", onPointerMove);
        canvas2.removeEventListener("pointerdown", onPointerDown);
        canvas2.removeEventListener("pointerup", onPointerUp);
      });
    }
    this._onViewportResize();
    this.object.getTranslationWorld(this._origin);
    this.object.getForward(this._direction);
    if (this.cursorRayObject) {
      this._cursorRayScale.set(this.cursorRayObject.scalingLocal);
      this._setCursorRayTransform(vec3_exports.add(tempVec2, this._origin, this._direction));
    }
  }
  _setCursorRayTransform(hitPosition) {
    if (!this.cursorRayObject)
      return;
    const dist2 = vec3_exports.dist(this._origin, hitPosition);
    this.cursorRayObject.setTranslationLocal([0, 0, -dist2 / 2]);
    if (this.cursorRayScalingAxis != 4) {
      this.cursorRayObject.resetScaling();
      this._cursorRayScale[this.cursorRayScalingAxis] = dist2 / 2;
      this.cursorRayObject.scale(this._cursorRayScale);
    }
  }
  _setCursorVisibility(visible) {
    if (this.visible == visible)
      return;
    this.visible = visible;
    if (!this.cursorObject)
      return;
    if (visible) {
      this.cursorObject.resetScaling();
      this.cursorObject.scale(this._cursorObjScale);
    } else {
      this._cursorObjScale.set(this.cursorObject.scalingLocal);
      this.cursorObject.scale([0, 0, 0]);
    }
  }
  update() {
    if (this.engine.xr && this._arTouchDown && this._input && this.engine.xr.session.inputSources[0].handedness === "none" && this.engine.xr.session.inputSources[0].gamepad) {
      const p = this.engine.xr.session.inputSources[0].gamepad.axes;
      this._direction[0] = p[0];
      this._direction[1] = -p[1];
      this._direction[2] = -1;
      this.updateDirection();
    } else {
      this.object.getTranslationWorld(this._origin);
      this.object.getForwardWorld(this._direction);
    }
    this.rayCast(null, this.engine.xr?.frame);
    if (this.cursorObject) {
      if (this.hoveringObject && (this.cursorPos[0] != 0 || this.cursorPos[1] != 0 || this.cursorPos[2] != 0)) {
        this._setCursorVisibility(true);
        this.cursorObject.setTranslationWorld(this.cursorPos);
        this._setCursorRayTransform(this.cursorPos);
      } else {
        this._setCursorVisibility(false);
      }
    }
  }
  /* Returns the hovered cursor target, if available */
  notify(event, originalEvent) {
    const target = this.hoveringObject;
    if (target) {
      const cursorTarget = this.hoveringObjectTarget;
      if (cursorTarget)
        cursorTarget[event].notify(target, this, originalEvent ?? void 0);
      this.globalTarget[event].notify(target, this, originalEvent ?? void 0);
    }
  }
  hoverBehaviour(rayHit, hitTestResult, doClick, originalEvent) {
    const hit = !this.hoveringReality && rayHit.hitCount > 0 ? rayHit.objects[0] : null;
    if (hit) {
      if (!this.hoveringObject || !this.hoveringObject.equals(hit)) {
        if (this.hoveringObject) {
          this.notify("onUnhover", originalEvent);
        }
        this.hoveringObject = hit;
        this.hoveringObjectTarget = this.hoveringObject.getComponent(CursorTarget);
        if (this.styleCursor)
          this.engine.canvas.style.cursor = "pointer";
        this.notify("onHover", originalEvent);
      }
    } else if (this.hoveringObject) {
      this.notify("onUnhover", originalEvent);
      this.hoveringObject = null;
      this.hoveringObjectTarget = null;
      if (this.styleCursor)
        this.engine.canvas.style.cursor = "default";
    }
    if (this.hoveringObject) {
      if (this._isDown !== this._lastIsDown) {
        this.notify(this._isDown ? "onDown" : "onUp", originalEvent);
      }
      if (doClick)
        this.notify("onClick", originalEvent);
    } else if (this.hoveringReality) {
      if (this._isDown !== this._lastIsDown) {
        (this._isDown ? this.hitTestTarget.onDown : this.hitTestTarget.onUp).notify(hitTestResult, this, originalEvent ?? void 0);
      }
      if (doClick)
        this.hitTestTarget.onClick.notify(hitTestResult, this, originalEvent ?? void 0);
    }
    if (hit) {
      if (this.hoveringObject) {
        this.hoveringObject.toLocalSpaceTransform(tempVec2, this.cursorPos);
      } else {
        tempVec2.set(this.cursorPos);
      }
      if (this._lastCursorPosOnTarget[0] != tempVec2[0] || this._lastCursorPosOnTarget[1] != tempVec2[1] || this._lastCursorPosOnTarget[2] != tempVec2[2]) {
        this.notify("onMove", originalEvent);
        this._lastCursorPosOnTarget.set(tempVec2);
      }
    } else if (this.hoveringReality) {
      if (this._lastCursorPosOnTarget[0] != this.cursorPos[0] || this._lastCursorPosOnTarget[1] != this.cursorPos[1] || this._lastCursorPosOnTarget[2] != this.cursorPos[2]) {
        this.hitTestTarget.onMove.notify(hitTestResult, this, originalEvent ?? void 0);
        this._lastCursorPosOnTarget.set(this.cursorPos);
      }
    }
    this._lastIsDown = this._isDown;
  }
  /**
   * Setup event listeners on session object
   * @param s WebXR session
   *
   * Sets up 'select' and 'end' events.
   */
  setupVREvents(s) {
    if (!s)
      console.error("setupVREvents called without a valid session");
    const onSelect = this.onSelect.bind(this);
    s.addEventListener("select", onSelect);
    const onSelectStart = this.onSelectStart.bind(this);
    s.addEventListener("selectstart", onSelectStart);
    const onSelectEnd = this.onSelectEnd.bind(this);
    s.addEventListener("selectend", onSelectEnd);
    this._onDeactivateCallbacks.push(() => {
      if (!this.engine.xrSession)
        return;
      s.removeEventListener("select", onSelect);
      s.removeEventListener("selectstart", onSelectStart);
      s.removeEventListener("selectend", onSelectEnd);
    });
    this._onViewportResize();
  }
  onDeactivate() {
    this.engine.onXRSessionStart.remove(this._onSessionStartCallback);
    this.engine.onResize.remove(this._onViewportResize);
    this._setCursorVisibility(false);
    if (this.hoveringObject)
      this.notify("onUnhover", null);
    if (this.cursorRayObject)
      this.cursorRayObject.scale([0, 0, 0]);
    for (const f of this._onDeactivateCallbacks)
      f();
    this._onDeactivateCallbacks.length = 0;
  }
  onDestroy() {
    this._hitTestObject?.destroy();
  }
  /** 'select' event listener */
  onSelect(e) {
    if (e.inputSource.handedness != this.handedness)
      return;
    this.rayCast(e, e.frame, true);
  }
  /** 'selectstart' event listener */
  onSelectStart(e) {
    this._arTouchDown = true;
    if (e.inputSource.handedness == this.handedness) {
      this._isDown = true;
      this.rayCast(e, e.frame);
    }
  }
  /** 'selectend' event listener */
  onSelectEnd(e) {
    this._arTouchDown = false;
    if (e.inputSource.handedness == this.handedness) {
      this._isDown = false;
      this.rayCast(e, e.frame);
    }
  }
  /** 'pointermove' event listener */
  onPointerMove(e) {
    if (!e.isPrimary)
      return;
    this.updateMousePos(e);
    this.rayCast(e, null);
  }
  /** 'click' event listener */
  onClick(e) {
    this.updateMousePos(e);
    this.rayCast(e, null, true);
  }
  /** 'pointerdown' event listener */
  onPointerDown(e) {
    if (!e.isPrimary || e.button !== 0)
      return;
    this.updateMousePos(e);
    this._isDown = true;
    this.rayCast(e);
  }
  /** 'pointerup' event listener */
  onPointerUp(e) {
    if (!e.isPrimary || e.button !== 0)
      return;
    this.updateMousePos(e);
    this._isDown = false;
    this.rayCast(e);
  }
  /**
   * Update mouse position in non-VR mode and raycast for new position
   * @returns @ref WL.RayHit for new position.
   */
  updateMousePos(e) {
    const bounds = this.engine.canvas.getBoundingClientRect();
    const left = e.clientX / bounds.width;
    const top = e.clientY / bounds.height;
    this._direction[0] = left * 2 - 1;
    this._direction[1] = -top * 2 + 1;
    this._direction[2] = -1;
    this.updateDirection();
  }
  updateDirection() {
    this.object.getTranslationWorld(this._origin);
    vec3_exports.transformMat4(this._direction, this._direction, this._projectionMatrix);
    vec3_exports.normalize(this._direction, this._direction);
    vec3_exports.transformQuat(this._direction, this._direction, this.object.transformWorld);
  }
  rayCast(originalEvent, frame = null, doClick = false) {
    const rayHit = this.rayCastMode == 0 ? this.engine.scene.rayCast(this._origin, this._direction, this._collisionMask) : this.engine.physics.rayCast(this._origin, this._direction, this._collisionMask, this.maxDistance);
    let hitResultDistance = Infinity;
    let hitTestResult = null;
    if (this._hitTestLocation?.visible) {
      this._hitTestObject.getTranslationWorld(this.cursorPos);
      hitResultDistance = vec3_exports.distance(this.object.getTranslationWorld(tempVec2), this.cursorPos);
      hitTestResult = this._hitTestLocation?.getHitTestResults(frame)[0];
    }
    let hoveringReality = false;
    if (rayHit.hitCount > 0) {
      const d = rayHit.distances[0];
      if (hitResultDistance >= d) {
        this.cursorPos.set(rayHit.locations[0]);
      } else {
        hoveringReality = true;
      }
    } else if (hitResultDistance < Infinity) {
    } else {
      this.cursorPos.fill(0);
    }
    if (hoveringReality && !this.hoveringReality) {
      this.hitTestTarget.onHover.notify(hitTestResult, this);
    } else if (!hoveringReality && this.hoveringReality) {
      this.hitTestTarget.onUnhover.notify(hitTestResult, this);
    }
    this.hoveringReality = hoveringReality;
    this.hoverBehaviour(rayHit, hitTestResult, doClick, originalEvent);
    return rayHit;
  }
};
__publicField(Cursor, "TypeName", "cursor");
/* Dependencies is deprecated, but we keep it here for compatibility
 * with 1.0.0-rc2 until 1.0.0 is released */
__publicField(Cursor, "Dependencies", [HitTestLocation]);
__decorate4([
  property.int(1)
], Cursor.prototype, "collisionGroup", void 0);
__decorate4([
  property.object()
], Cursor.prototype, "cursorRayObject", void 0);
__decorate4([
  property.enum(["x", "y", "z", "none"], "z")
], Cursor.prototype, "cursorRayScalingAxis", void 0);
__decorate4([
  property.object()
], Cursor.prototype, "cursorObject", void 0);
__decorate4([
  property.enum(["input component", "left", "right", "none"], "input component")
], Cursor.prototype, "handedness", void 0);
__decorate4([
  property.enum(["collision", "physx"], "collision")
], Cursor.prototype, "rayCastMode", void 0);
__decorate4([
  property.bool(true)
], Cursor.prototype, "styleCursor", void 0);
__decorate4([
  property.bool(false)
], Cursor.prototype, "useWebXRHitTest", void 0);

// node_modules/@wonderlandengine/components/dist/debug-object.js
var __decorate5 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DebugObject = class extends Component {
  /** A second object to print the name of */
  obj = null;
  start() {
    let origin = new Float32Array(3);
    quat2_exports.getTranslation(origin, this.object.transformWorld);
    console.log("Debug object:", this.object.name);
    console.log("Other object:", this.obj?.name);
    console.log("	translation", origin);
    console.log("	transformWorld", this.object.transformWorld);
    console.log("	transformLocal", this.object.transformLocal);
  }
};
__publicField(DebugObject, "TypeName", "debug-object");
__decorate5([
  property.object()
], DebugObject.prototype, "obj", void 0);

// node_modules/@wonderlandengine/components/dist/fixed-foveation.js
var FixedFoveation = class extends Component {
  start() {
    this.onSessionStartCallback = this.setFixedFoveation.bind(this);
  }
  onActivate() {
    this.engine.onXRSessionStart.add(this.onSessionStartCallback);
  }
  onDeactivate() {
    this.engine.onXRSessionStart.remove(this.onSessionStartCallback);
  }
  setFixedFoveation() {
    this.engine.xr.baseLayer.fixedFoveation = this.fixedFoveation;
  }
};
__publicField(FixedFoveation, "TypeName", "fixed-foveation");
__publicField(FixedFoveation, "Properties", {
  /** Amount to apply from 0 (none) to 1 (full) */
  fixedFoveation: { type: Type.Float, default: 0.5 }
});

// node_modules/@wonderlandengine/components/dist/hand-tracking.js
var ORDERED_JOINTS = [
  "wrist",
  "thumb-metacarpal",
  "thumb-phalanx-proximal",
  "thumb-phalanx-distal",
  "thumb-tip",
  "index-finger-metacarpal",
  "index-finger-phalanx-proximal",
  "index-finger-phalanx-intermediate",
  "index-finger-phalanx-distal",
  "index-finger-tip",
  "middle-finger-metacarpal",
  "middle-finger-phalanx-proximal",
  "middle-finger-phalanx-intermediate",
  "middle-finger-phalanx-distal",
  "middle-finger-tip",
  "ring-finger-metacarpal",
  "ring-finger-phalanx-proximal",
  "ring-finger-phalanx-intermediate",
  "ring-finger-phalanx-distal",
  "ring-finger-tip",
  "pinky-finger-metacarpal",
  "pinky-finger-phalanx-proximal",
  "pinky-finger-phalanx-intermediate",
  "pinky-finger-phalanx-distal",
  "pinky-finger-tip"
];
var invTranslation = new Float32Array(3);
var invRotation = new Float32Array(4);
var HandTracking = class extends Component {
  init() {
    this.handedness = ["left", "right"][this.handedness];
  }
  joints = {};
  session = null;
  /* Whether last update had a hand pose */
  hasPose = false;
  _childrenActive = true;
  start() {
    if (!("XRHand" in window)) {
      console.warn("WebXR Hand Tracking not supported by this browser.");
      this.active = false;
      return;
    }
    if (this.handSkin) {
      let skin = this.handSkin;
      let jointIds = skin.jointIds;
      this.joints[ORDERED_JOINTS[0]] = this.engine.wrapObject(jointIds[0]);
      for (let j = 0; j < jointIds.length; ++j) {
        let joint = this.engine.wrapObject(jointIds[j]);
        this.joints[joint.name] = joint;
      }
      return;
    }
    const jointObjects = this.engine.scene.addObjects(ORDERED_JOINTS.length, this.object.parent, ORDERED_JOINTS.length);
    for (let j = 0; j < ORDERED_JOINTS.length; ++j) {
      let joint = jointObjects[j];
      joint.addComponent(MeshComponent, {
        mesh: this.jointMesh,
        material: this.jointMaterial
      });
      this.joints[ORDERED_JOINTS[j]] = joint;
    }
  }
  update(dt) {
    if (!this.session) {
      if (this.engine.xr)
        this.setupVREvents(this.engine.xr.session);
    }
    if (!this.session)
      return;
    this.hasPose = false;
    if (this.session && this.session.inputSources) {
      for (let i = 0; i < this.session.inputSources.length; ++i) {
        const inputSource = this.session.inputSources[i];
        if (!inputSource || !inputSource.hand || inputSource.handedness != this.handedness)
          continue;
        this.hasPose = true;
        const wristSpace = inputSource.hand.get("wrist");
        if (wristSpace !== null) {
          const p = this.engine.xr.frame.getJointPose(wristSpace, this.engine.xr.currentReferenceSpace);
          if (p) {
            setXRRigidTransformLocal(this.object, p.transform);
          }
        }
        this.object.getRotationLocal(invRotation);
        quat_exports.conjugate(invRotation, invRotation);
        this.object.getTranslationLocal(invTranslation);
        for (let j = 0; j < ORDERED_JOINTS.length; ++j) {
          const jointName = ORDERED_JOINTS[j];
          const joint = this.joints[jointName];
          if (joint === null)
            continue;
          let jointPose = null;
          const jointSpace = inputSource.hand.get(jointName);
          if (jointSpace !== null) {
            jointPose = this.engine.xr.frame.getJointPose(jointSpace, this.engine.xr.currentReferenceSpace);
          }
          if (jointPose !== null) {
            if (this.handSkin) {
              joint.resetTranslationRotation();
              joint.translate([
                jointPose.transform.position.x - invTranslation[0],
                jointPose.transform.position.y - invTranslation[1],
                jointPose.transform.position.z - invTranslation[2]
              ]);
              joint.rotate(invRotation);
              joint.rotateObject([
                jointPose.transform.orientation.x,
                jointPose.transform.orientation.y,
                jointPose.transform.orientation.z,
                jointPose.transform.orientation.w
              ]);
            } else {
              setXRRigidTransformLocal(joint, jointPose.transform);
              const r = jointPose.radius || 7e-3;
              joint.setScalingLocal([r, r, r]);
            }
          }
        }
      }
    }
    if (!this.hasPose && this._childrenActive) {
      this._childrenActive = false;
      if (this.deactivateChildrenWithoutPose) {
        this.setChildrenActive(false);
      }
      if (this.controllerToDeactivate) {
        this.controllerToDeactivate.active = true;
        this.setChildrenActive(true, this.controllerToDeactivate);
      }
    } else if (this.hasPose && !this._childrenActive) {
      this._childrenActive = true;
      if (this.deactivateChildrenWithoutPose) {
        this.setChildrenActive(true);
      }
      if (this.controllerToDeactivate) {
        this.controllerToDeactivate.active = false;
        this.setChildrenActive(false, this.controllerToDeactivate);
      }
    }
  }
  setChildrenActive(active, object) {
    object = object || this.object;
    const children = object.children;
    for (const o of children) {
      o.active = active;
      this.setChildrenActive(active, o);
    }
  }
  isGrabbing() {
    const indexTipPos = [0, 0, 0];
    quat2_exports.getTranslation(indexTipPos, this.joints["index-finger-tip"].transformLocal);
    const thumbTipPos = [0, 0, 0];
    quat2_exports.getTranslation(thumbTipPos, this.joints["thumb-tip"].transformLocal);
    return vec3_exports.sqrDist(thumbTipPos, indexTipPos) < 1e-3;
  }
  setupVREvents(s) {
    this.session = s;
  }
};
__publicField(HandTracking, "TypeName", "hand-tracking");
__publicField(HandTracking, "Properties", {
  /** Handedness determining whether to receive tracking input from right or left hand */
  handedness: { type: Type.Enum, default: "left", values: ["left", "right"] },
  /** (optional) Mesh to use to visualize joints */
  jointMesh: { type: Type.Mesh, default: null },
  /** Material to use for display. Applied to either the spawned skinned mesh or the joint spheres. */
  jointMaterial: { type: Type.Material, default: null },
  /** (optional) Skin to apply tracked joint poses to. If not present, joint spheres will be used for display instead. */
  handSkin: { type: Type.Skin, default: null },
  /** Deactivate children if no pose was tracked */
  deactivateChildrenWithoutPose: { type: Type.Bool, default: true },
  /** Controller objects to activate including children if no pose is available */
  controllerToDeactivate: { type: Type.Object }
});

// node_modules/@wonderlandengine/components/dist/howler-audio-listener.js
var import_howler = __toESM(require_howler(), 1);
var HowlerAudioListener = class extends Component {
  init() {
    this.origin = new Float32Array(3);
    this.fwd = new Float32Array(3);
    this.up = new Float32Array(3);
  }
  update() {
    if (!this.spatial)
      return;
    this.object.getTranslationWorld(this.origin);
    this.object.getForward(this.fwd);
    this.object.getUp(this.up);
    Howler.pos(this.origin[0], this.origin[1], this.origin[2]);
    Howler.orientation(this.fwd[0], this.fwd[1], this.fwd[2], this.up[0], this.up[1], this.up[2]);
  }
};
__publicField(HowlerAudioListener, "TypeName", "howler-audio-listener");
__publicField(HowlerAudioListener, "Properties", {
  /** Whether audio should be spatialized/positional. */
  spatial: { type: Type.Bool, default: true }
});

// node_modules/@wonderlandengine/components/dist/howler-audio-source.js
var import_howler2 = __toESM(require_howler(), 1);
var HowlerAudioSource = class extends Component {
  start() {
    this.audio = new Howl({
      src: [this.src],
      loop: this.loop,
      volume: this.volume,
      autoplay: this.autoplay
    });
    this.lastPlayedAudioId = null;
    this.origin = new Float32Array(3);
    this.lastOrigin = new Float32Array(3);
    if (this.spatial && this.autoplay) {
      this.updatePosition();
      this.play();
    }
  }
  update() {
    if (!this.spatial || !this.lastPlayedAudioId)
      return;
    this.object.getTranslationWorld(this.origin);
    if (Math.abs(this.lastOrigin[0] - this.origin[0]) > 5e-3 || Math.abs(this.lastOrigin[1] - this.origin[1]) > 5e-3 || Math.abs(this.lastOrigin[2] - this.origin[2]) > 5e-3) {
      this.updatePosition();
    }
  }
  updatePosition() {
    this.audio.pos(this.origin[0], this.origin[1], this.origin[2], this.lastPlayedAudioId);
    this.lastOrigin.set(this.origin);
  }
  play() {
    if (this.lastPlayedAudioId)
      this.audio.stop(this.lastPlayedAudioId);
    this.lastPlayedAudioId = this.audio.play();
    if (this.spatial)
      this.updatePosition();
  }
  stop() {
    if (!this.lastPlayedAudioId)
      return;
    this.audio.stop(this.lastPlayedAudioId);
    this.lastPlayedAudioId = null;
  }
  onDeactivate() {
    this.stop();
  }
};
__publicField(HowlerAudioSource, "TypeName", "howler-audio-source");
__publicField(HowlerAudioSource, "Properties", {
  /** Volume */
  volume: { type: Type.Float, default: 1 },
  /** Whether audio should be spatialized/positional */
  spatial: { type: Type.Bool, default: true },
  /** Whether to loop the sound */
  loop: { type: Type.Bool, default: false },
  /** Whether to start playing automatically */
  autoplay: { type: Type.Bool, default: false },
  /** URL to a sound file to play */
  src: { type: Type.String, default: "" }
});

// node_modules/@wonderlandengine/components/dist/utils/utils.js
function setFirstMaterialTexture(mat, texture, customTextureProperty) {
  if (customTextureProperty !== "auto") {
    mat[customTextureProperty] = texture;
    return true;
  }
  const shader = mat.shader;
  if (shader === "Flat Opaque Textured") {
    mat.flatTexture = texture;
    return true;
  } else if (shader === "Phong Opaque Textured" || shader === "Foliage" || shader === "Phong Normalmapped" || shader === "Phong Lightmapped") {
    mat.diffuseTexture = texture;
    return true;
  } else if (shader === "Particle") {
    mat.mainTexture = texture;
    return true;
  } else if (shader === "DistanceFieldVector") {
    mat.vectorTexture = texture;
    return true;
  } else if (shader === "Background" || shader === "Sky") {
    mat.texture = texture;
    return true;
  } else if (shader === "Physical Opaque Textured") {
    mat.albedoTexture = texture;
    return true;
  }
  return false;
}

// node_modules/@wonderlandengine/components/dist/image-texture.js
var ImageTexture = class extends Component {
  start() {
    if (!this.material) {
      throw Error("image-texture: material property not set");
    }
    this.engine.textures.load(this.url, "anonymous").then((texture) => {
      const mat = this.material;
      if (!setFirstMaterialTexture(mat, texture, this.textureProperty)) {
        console.error("Shader", mat.shader, "not supported by image-texture");
      }
    }).catch(console.err);
  }
};
__publicField(ImageTexture, "TypeName", "image-texture");
__publicField(ImageTexture, "Properties", {
  /** URL to download the image from */
  url: Property.string(),
  /** Material to apply the video texture to */
  material: Property.material(),
  /** Name of the texture property to set */
  textureProperty: Property.string("auto")
});

// node_modules/@wonderlandengine/components/dist/mouse-look.js
var MouseLookComponent = class extends Component {
  init() {
    this.currentRotationY = 0;
    this.currentRotationX = 0;
    this.origin = new Float32Array(3);
    this.parentOrigin = new Float32Array(3);
    this.rotationX = 0;
    this.rotationY = 0;
  }
  start() {
    document.addEventListener("mousemove", (e) => {
      if (this.active && (this.mouseDown || !this.requireMouseDown)) {
        this.rotationY = -this.sensitity * e.movementX / 100;
        this.rotationX = -this.sensitity * e.movementY / 100;
        this.currentRotationX += this.rotationX;
        this.currentRotationY += this.rotationY;
        this.currentRotationX = Math.min(1.507, this.currentRotationX);
        this.currentRotationX = Math.max(-1.507, this.currentRotationX);
        this.object.getTranslationWorld(this.origin);
        const parent = this.object.parent;
        if (parent !== null) {
          parent.getTranslationWorld(this.parentOrigin);
          vec3_exports.sub(this.origin, this.origin, this.parentOrigin);
        }
        this.object.resetTranslationRotation();
        this.object.rotateAxisAngleRad([1, 0, 0], this.currentRotationX);
        this.object.rotateAxisAngleRad([0, 1, 0], this.currentRotationY);
        this.object.translate(this.origin);
      }
    });
    const canvas2 = this.engine.canvas;
    if (this.pointerLockOnClick) {
      canvas2.addEventListener("mousedown", () => {
        canvas2.requestPointerLock = canvas2.requestPointerLock || canvas2.mozRequestPointerLock || canvas2.webkitRequestPointerLock;
        canvas2.requestPointerLock();
      });
    }
    if (this.requireMouseDown) {
      if (this.mouseButtonIndex == 2) {
        canvas2.addEventListener("contextmenu", (e) => {
          e.preventDefault();
        }, false);
      }
      canvas2.addEventListener("mousedown", (e) => {
        if (e.button == this.mouseButtonIndex) {
          this.mouseDown = true;
          document.body.style.cursor = "grabbing";
          if (e.button == 1) {
            e.preventDefault();
            return false;
          }
        }
      });
      canvas2.addEventListener("mouseup", (e) => {
        if (e.button == this.mouseButtonIndex) {
          this.mouseDown = false;
          document.body.style.cursor = "initial";
        }
      });
    }
  }
};
__publicField(MouseLookComponent, "TypeName", "mouse-look");
__publicField(MouseLookComponent, "Properties", {
  /** Mouse look sensitivity */
  sensitity: { type: Type.Float, default: 0.25 },
  /** Require a mouse button to be pressed to control view.
   * Otherwise view will allways follow mouse movement */
  requireMouseDown: { type: Type.Bool, default: true },
  /** If "moveOnClick" is enabled, mouse button which should
   * be held down to control view */
  mouseButtonIndex: { type: Type.Int },
  /** Enables pointer lock on "mousedown" event on canvas */
  pointerLockOnClick: { type: Type.Bool, default: false }
});

// node_modules/@wonderlandengine/components/dist/player-height.js
var PlayerHeight = class extends Component {
  start() {
    this.object.resetTranslationRotation();
    this.object.translate([0, this.height, 0]);
    this.onSessionStartCallback = this.onXRSessionStart.bind(this);
    this.onSessionEndCallback = this.onXRSessionEnd.bind(this);
  }
  onActivate() {
    this.engine.onXRSessionStart.add(this.onSessionStartCallback);
    this.engine.onXRSessionEnd.add(this.onSessionEndCallback);
  }
  onDeactivate() {
    this.engine.onXRSessionStart.remove(this.onSessionStartCallback);
    this.engine.onXRSessionEnd.remove(this.onSessionEndCallback);
  }
  onXRSessionStart() {
    if (!["local", "viewer"].includes(this.engine.xr.currentReferenceSpace)) {
      this.object.resetTranslationRotation();
    }
  }
  onXRSessionEnd() {
    if (!["local", "viewer"].includes(this.engine.xr.currentReferenceSpace)) {
      this.object.resetTranslationRotation();
      this.object.translate([0, this.height, 0]);
    }
  }
};
__publicField(PlayerHeight, "TypeName", "player-height");
__publicField(PlayerHeight, "Properties", {
  height: { type: Type.Float, default: 1.75 }
});

// node_modules/@wonderlandengine/components/dist/target-framerate.js
var TargetFramerate = class extends Component {
  start() {
    this.onSessionStartCallback = this.setTargetFramerate.bind(this);
  }
  onActivate() {
    this.engine.onXRSessionStart.add(this.onSessionStartCallback);
  }
  onDeactivate() {
    this.engine.onXRSessionStart.remove(this.onSessionStartCallback);
  }
  setTargetFramerate(s) {
    if (s.supportedFrameRates && s.updateTargetFrameRate) {
      const a = this.engine.xr.session.supportedFrameRates;
      a.sort((a2, b) => Math.abs(a2 - this.framerate) - Math.abs(b - this.framerate));
      this.engine.xr.session.updateTargetFrameRate(a[0]);
    }
  }
};
__publicField(TargetFramerate, "TypeName", "target-framerate");
__publicField(TargetFramerate, "Properties", {
  framerate: { type: Type.Float, default: 90 }
});

// node_modules/@wonderlandengine/components/dist/teleport.js
var TeleportComponent = class extends Component {
  init() {
    this._prevThumbstickAxis = new Float32Array(2);
    this._tempVec = new Float32Array(3);
    this._tempVec0 = new Float32Array(3);
    this._currentIndicatorRotation = 0;
    this.input = this.object.getComponent("input");
    if (!this.input) {
      console.error(this.object.name, "generic-teleport-component.js: input component is required on the object");
      return;
    }
    if (!this.teleportIndicatorMeshObject) {
      console.error(this.object.name, "generic-teleport-component.js: Teleport indicator mesh is missing");
      return;
    }
    if (!this.camRoot) {
      console.error(this.object.name, "generic-teleport-component.js: camRoot not set");
      return;
    }
    this.isIndicating = false;
    this.indicatorHidden = true;
    this.hitSpot = new Float32Array(3);
    this._hasHit = false;
    this._extraRotation = 0;
    this._currentStickAxes = new Float32Array(2);
  }
  start() {
    if (this.cam) {
      this.isMouseIndicating = false;
      canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
      canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
    }
    if (this.handedness == 0) {
      const inputComp = this.object.getComponent("input");
      if (!inputComp) {
        console.warn("teleport component on object", this.object.name, 'was configured with handedness "input component", but object has no input component.');
      } else {
        this.handedness = inputComp.handedness;
        this.input = inputComp;
      }
    } else {
      this.handedness = ["left", "right"][this.handedness - 1];
    }
    this.onSessionStartCallback = this.setupVREvents.bind(this);
    this.teleportIndicatorMeshObject.active = false;
  }
  onActivate() {
    this.engine.onXRSessionStart.add(this.onSessionStartCallback);
  }
  onDeactivate() {
    this.engine.onXRSessionStart.remove(this.onSessionStartCallback);
  }
  /* Get current camera Y rotation */
  _getCamRotation() {
    this.eyeLeft.getForward(this._tempVec);
    this._tempVec[1] = 0;
    vec3_exports.normalize(this._tempVec, this._tempVec);
    return Math.atan2(this._tempVec[0], this._tempVec[2]);
  }
  update() {
    let inputLength = 0;
    if (this.gamepad && this.gamepad.axes) {
      this._currentStickAxes[0] = this.gamepad.axes[2];
      this._currentStickAxes[1] = this.gamepad.axes[3];
      inputLength = Math.abs(this._currentStickAxes[0]) + Math.abs(this._currentStickAxes[1]);
    }
    if (!this.isIndicating && this._prevThumbstickAxis[1] >= this.thumbstickActivationThreshhold && this._currentStickAxes[1] < this.thumbstickActivationThreshhold) {
      this.isIndicating = true;
    } else if (this.isIndicating && inputLength < this.thumbstickDeactivationThreshhold) {
      this.isIndicating = false;
      this.teleportIndicatorMeshObject.active = false;
      if (this._hasHit) {
        this._teleportPlayer(this.hitSpot, this._extraRotation);
      }
    }
    if (this.isIndicating && this.teleportIndicatorMeshObject && this.input) {
      const origin = this._tempVec0;
      this.object.getPositionWorld(origin);
      const direction2 = this.object.getForwardWorld(this._tempVec);
      let rayHit = this.rayHit = this.rayCastMode == 0 ? this.engine.scene.rayCast(origin, direction2, 1 << this.floorGroup) : this.engine.physics.rayCast(origin, direction2, 1 << this.floorGroup, this.maxDistance);
      if (rayHit.hitCount > 0) {
        this.indicatorHidden = false;
        this._extraRotation = Math.PI + Math.atan2(this._currentStickAxes[0], this._currentStickAxes[1]);
        this._currentIndicatorRotation = this._getCamRotation() + (this._extraRotation - Math.PI);
        this.teleportIndicatorMeshObject.resetPositionRotation();
        this.teleportIndicatorMeshObject.rotateAxisAngleRad([0, 1, 0], this._currentIndicatorRotation);
        this.teleportIndicatorMeshObject.translate(rayHit.locations[0]);
        this.teleportIndicatorMeshObject.translate([
          0,
          this.indicatorYOffset,
          0
        ]);
        this.teleportIndicatorMeshObject.active = true;
        this.hitSpot.set(rayHit.locations[0]);
        this._hasHit = true;
      } else {
        if (!this.indicatorHidden) {
          this.teleportIndicatorMeshObject.active = false;
          this.indicatorHidden = true;
        }
        this._hasHit = false;
      }
    } else if (this.teleportIndicatorMeshObject && this.isMouseIndicating) {
      this.onMousePressed();
    }
    this._prevThumbstickAxis.set(this._currentStickAxes);
  }
  setupVREvents(s) {
    this.session = s;
    s.addEventListener("end", function() {
      this.gamepad = null;
      this.session = null;
    }.bind(this));
    if (s.inputSources && s.inputSources.length) {
      for (let i = 0; i < s.inputSources.length; i++) {
        let inputSource = s.inputSources[i];
        if (inputSource.handedness == this.handedness) {
          this.gamepad = inputSource.gamepad;
        }
      }
    }
    s.addEventListener("inputsourceschange", function(e) {
      if (e.added && e.added.length) {
        for (let i = 0; i < e.added.length; i++) {
          let inputSource = e.added[i];
          if (inputSource.handedness == this.handedness) {
            this.gamepad = inputSource.gamepad;
          }
        }
      }
    }.bind(this));
  }
  onMouseDown() {
    this.isMouseIndicating = true;
  }
  onMouseUp() {
    this.isMouseIndicating = false;
    this.teleportIndicatorMeshObject.active = false;
    if (this._hasHit) {
      this._teleportPlayer(this.hitSpot, 0);
    }
  }
  onMousePressed() {
    let origin = [0, 0, 0];
    this.cam.getPositionWorld(origin);
    const direction2 = this.cam.getForward(this._tempVec);
    let rayHit = this.rayHit = this.rayCastMode == 0 ? this.engine.scene.rayCast(origin, direction2, 1 << this.floorGroup) : this.engine.physics.rayCast(origin, direction2, 1 << this.floorGroup, this.maxDistance);
    if (rayHit.hitCount > 0) {
      this.indicatorHidden = false;
      direction2[1] = 0;
      vec3_exports.normalize(direction2, direction2);
      this._currentIndicatorRotation = -Math.sign(direction2[2]) * Math.acos(direction2[0]) - Math.PI * 0.5;
      this.teleportIndicatorMeshObject.resetPositionRotation();
      this.teleportIndicatorMeshObject.rotateAxisAngleRad([0, 1, 0], this._currentIndicatorRotation);
      this.teleportIndicatorMeshObject.translate(rayHit.locations[0]);
      this.teleportIndicatorMeshObject.active = true;
      this.hitSpot = rayHit.locations[0];
      this._hasHit = true;
    } else {
      if (!this.indicatorHidden) {
        this.teleportIndicatorMeshObject.active = false;
        this.indicatorHidden = true;
      }
      this._hasHit = false;
    }
  }
  _teleportPlayer(newPosition, rotationToAdd) {
    this.camRoot.rotateAxisAngleRad([0, 1, 0], rotationToAdd);
    const p = this._tempVec;
    const p1 = this._tempVec0;
    if (this.session) {
      this.eyeLeft.getPositionWorld(p);
      this.eyeRight.getPositionWorld(p1);
      vec3_exports.add(p, p, p1);
      vec3_exports.scale(p, p, 0.5);
    } else {
      this.cam.getPositionWorld(p);
    }
    this.camRoot.getPositionWorld(p1);
    vec3_exports.sub(p, p1, p);
    p[0] += newPosition[0];
    p[1] = newPosition[1];
    p[2] += newPosition[2];
    this.camRoot.setPositionWorld(p);
  }
};
__publicField(TeleportComponent, "TypeName", "teleport");
__publicField(TeleportComponent, "Properties", {
  /** Object that will be placed as indiciation forwhere the player will teleport to. */
  teleportIndicatorMeshObject: { type: Type.Object },
  /** Root of the player, the object that will be positioned on teleportation. */
  camRoot: { type: Type.Object },
  /** Non-vr camera for use outside of VR */
  cam: { type: Type.Object },
  /** Left eye for use in VR*/
  eyeLeft: { type: Type.Object },
  /** Right eye for use in VR*/
  eyeRight: { type: Type.Object },
  /** Handedness for VR cursors to accept trigger events only from respective controller. */
  handedness: {
    type: Type.Enum,
    values: ["input component", "left", "right", "none"],
    default: "input component"
  },
  /** Collision group of valid "floor" objects that can be teleported on */
  floorGroup: { type: Type.Int, default: 1 },
  /** How far the thumbstick needs to be pushed to have the teleport target indicator show up */
  thumbstickActivationThreshhold: { type: Type.Float, default: -0.7 },
  /** How far the thumbstick needs to be released to execute the teleport */
  thumbstickDeactivationThreshhold: { type: Type.Float, default: 0.3 },
  /** Offset to apply to the indicator object, e.g. to avoid it from Z-fighting with the floor */
  indicatorYOffset: { type: Type.Float, default: 0.01 },
  /** Mode for raycasting, whether to use PhysX or simple collision components */
  rayCastMode: {
    type: Type.Enum,
    values: ["collision", "physx"],
    default: "collision"
  },
  /** Max distance for PhysX raycast */
  maxDistance: { type: Type.Float, default: 100 }
});

// node_modules/@wonderlandengine/components/dist/trail.js
var direction = vec3_exports.create();
var offset = vec3_exports.create();
var normal = vec3_exports.create();
var Trail = class extends Component {
  init() {
    this.points = new Array(this.segments + 1);
    for (let i = 0; i < this.points.length; ++i) {
      this.points[i] = vec3_exports.create();
    }
    this.currentPointOffset = 0;
    this.up = [0, 1, 0];
    this.timeTillNext = this.interval;
  }
  start() {
    this.trailContainer = this.engine.scene.addObject();
    this.meshComp = this.trailContainer.addComponent("mesh");
    this.meshComp.material = this.material;
    const vertexCount = 2 * this.points.length;
    this.indexData = new Uint32Array(6 * this.segments);
    for (let i = 0, v = 0; i < vertexCount - 2; i += 2, v += 6) {
      this.indexData.subarray(v, v + 6).set([i + 1, i + 0, i + 2, i + 2, i + 3, i + 1]);
    }
    this.mesh = new Mesh(this.engine, {
      vertexCount,
      indexData: this.indexData,
      indexType: MeshIndexType.UnsignedInt
    });
    this.meshComp.mesh = this.mesh;
  }
  updateVertices() {
    const positions = this.mesh.attribute(MeshAttribute.Position);
    const texCoords = this.mesh.attribute(MeshAttribute.TextureCoordinate);
    const normals = this.mesh.attribute(MeshAttribute.Normal);
    vec3_exports.set(direction, 0, 0, 0);
    for (let i = 0; i < this.points.length; ++i) {
      const curr = this.points[(this.currentPointIndex + i + 1) % this.points.length];
      const next = this.points[(this.currentPointIndex + i + 2) % this.points.length];
      if (i !== this.points.length - 1) {
        vec3_exports.sub(direction, next, curr);
      }
      vec3_exports.cross(offset, this.up, direction);
      vec3_exports.normalize(offset, offset);
      const timeFraction = 1 - this.timeTillNext / this.interval;
      const fraction = (i - timeFraction) / this.segments;
      vec3_exports.scale(offset, offset, (this.taper ? fraction : 1) * this.width / 2);
      positions.set(i * 2, [
        curr[0] - offset[0],
        curr[1] - offset[1],
        curr[2] - offset[2]
      ]);
      positions.set(i * 2 + 1, [
        curr[0] + offset[0],
        curr[1] + offset[1],
        curr[2] + offset[2]
      ]);
      if (normals) {
        vec3_exports.cross(normal, direction, offset);
        vec3_exports.normalize(normal, normal);
        normals.set(i * 2, normal);
        normals.set(i * 2 + 1, normal);
      }
      if (texCoords) {
        texCoords.set(i * 2, [0, fraction]);
        texCoords.set(i * 2 + 1, [1, fraction]);
      }
    }
    this.mesh.update();
  }
  resetTrail() {
    this.object.getTranslationWorld(this.points[0]);
    for (let i = 1; i < this.points.length; ++i) {
      vec3_exports.copy(this.points[i], this.points[0]);
    }
    this.currentPointIndex = 0;
    this.timeTillNext = this.interval;
  }
  update(dt) {
    this.timeTillNext -= dt;
    if (dt > this.resetThreshold) {
      this.resetTrail();
    }
    if (this.timeTillNext < 0) {
      this.currentPointIndex = (this.currentPointIndex + 1) % this.points.length;
      this.timeTillNext = this.timeTillNext % this.interval + this.interval;
    }
    this.object.getTranslationWorld(this.points[this.currentPointIndex]);
    this.updateVertices();
  }
  onActivate() {
    this.resetTrail();
  }
  onDestroy() {
    this.trailContainer.destroy();
    this.mesh.destroy();
  }
};
__publicField(Trail, "TypeName", "trail");
__publicField(Trail, "Properties", {
  /** The material to apply to the trail mesh */
  material: { type: Type.Material },
  /** The number of segments in the trail mesh */
  segments: { type: Type.Int, default: 50 },
  /** The time interval before recording a new point */
  interval: { type: Type.Float, default: 0.1 },
  /** The width of the trail (in world space) */
  width: { type: Type.Float, default: 1 },
  /** Whether or not the trail should taper off */
  taper: { type: Type.Bool, default: true },
  /**
   * The maximum delta time in seconds, above which the trail resets.
   * This prevents the trail from jumping around when updates happen
   * infrequently (e.g. when the tab doesn't have focus).
   */
  resetThreshold: { type: Type.Float, default: 0.5 }
});

// node_modules/@wonderlandengine/components/dist/two-joint-ik-solver.js
Math.clamp = function(v, a, b) {
  return Math.max(a, Math.min(v, b));
};
var twoJointIK = function() {
  let ta = new Float32Array(3);
  let ca = new Float32Array(3);
  let ba = new Float32Array(3);
  let ab = new Float32Array(3);
  let cb = new Float32Array(3);
  let axis0 = new Float32Array(3);
  let axis1 = new Float32Array(3);
  let temp = new Float32Array(4);
  let r0 = new Float32Array(4);
  let r1 = new Float32Array(4);
  let r2 = new Float32Array(4);
  return function(a_lr, b_lr, a, b, c, t, eps, a_gr, b_gr, helper) {
    vec3_exports.sub(ba, b, a);
    const lab = vec3_exports.length(ba);
    vec3_exports.sub(ta, b, c);
    const lcb = vec3_exports.length(ta);
    vec3_exports.sub(ta, t, a);
    const lat = Math.clamp(vec3_exports.length(ta), eps, lab + lcb - eps);
    vec3_exports.sub(ca, c, a);
    vec3_exports.sub(ab, a, b);
    vec3_exports.sub(cb, c, b);
    vec3_exports.normalize(ca, ca);
    vec3_exports.normalize(ba, ba);
    vec3_exports.normalize(ab, ab);
    vec3_exports.normalize(cb, cb);
    vec3_exports.normalize(ta, ta);
    const ac_ab_0 = Math.acos(Math.clamp(vec3_exports.dot(ca, ba), -1, 1));
    const ba_bc_0 = Math.acos(Math.clamp(vec3_exports.dot(ab, cb), -1, 1));
    const ac_at_0 = Math.acos(Math.clamp(vec3_exports.dot(ca, ta), -1, 1));
    const ac_ab_1 = Math.acos(Math.clamp((lcb * lcb - lab * lab - lat * lat) / (-2 * lab * lat), -1, 1));
    const ba_bc_1 = Math.acos(Math.clamp((lat * lat - lab * lab - lcb * lcb) / (-2 * lab * lcb), -1, 1));
    vec3_exports.sub(ca, c, a);
    vec3_exports.sub(ba, b, a);
    vec3_exports.sub(ta, t, a);
    vec3_exports.cross(axis0, ca, ba);
    vec3_exports.cross(axis1, ca, ta);
    if (helper) {
      vec3_exports.sub(ba, helper, b);
      vec3_exports.transformQuat(ba, [0, 0, -1], b_gr);
    } else {
      vec3_exports.sub(ba, b, a);
    }
    const l = vec3_exports.length(axis0);
    if (l == 0) {
      axis0.set([1, 0, 0]);
    } else {
      vec3_exports.scale(axis0, axis0, 1 / l);
    }
    vec3_exports.normalize(axis1, axis1);
    quat_exports.conjugate(a_gr, a_gr);
    quat_exports.setAxisAngle(r0, vec3_exports.transformQuat(temp, axis0, a_gr), ac_ab_1 - ac_ab_0);
    quat_exports.setAxisAngle(r2, vec3_exports.transformQuat(temp, axis1, a_gr), ac_at_0);
    quat_exports.mul(a_lr, a_lr, quat_exports.mul(temp, r0, r2));
    quat_exports.normalize(a_lr, a_lr);
    quat_exports.conjugate(b_gr, b_gr);
    quat_exports.setAxisAngle(r1, vec3_exports.transformQuat(temp, axis0, b_gr), ba_bc_1 - ba_bc_0);
    quat_exports.mul(b_lr, b_lr, r1);
    quat_exports.normalize(b_lr, b_lr);
  };
}();
var TwoJointIkSolver = class extends Component {
  init() {
    this.pos = new Float32Array(3 * 7);
    this.p = [
      this.pos.subarray(0, 3),
      this.pos.subarray(3, 6),
      this.pos.subarray(6, 9),
      this.pos.subarray(9, 12),
      this.pos.subarray(12, 15),
      this.pos.subarray(15, 18),
      this.pos.subarray(18, 21)
    ];
  }
  update() {
    const p = this.p;
    this.root.getTranslationWorld(p[0]);
    this.middle.getTranslationWorld(p[1]);
    this.end.getTranslationWorld(p[2]);
    this.target.getTranslationWorld(p[3]);
    const tla = p[4];
    const tlb = p[5];
    this.root.getTranslationLocal(tla);
    this.middle.getTranslationLocal(tlb);
    if (this.helper)
      this.helper.getTranslationWorld(p[6]);
    twoJointIK(this.root.transformLocal, this.middle.transformLocal, p[0], p[1], p[2], p[3], 0.01, this.root.transformWorld.subarray(0, 4), this.middle.transformWorld.subarray(0, 4), this.helper ? p[6] : null);
    this.root.setTranslationLocal(tla);
    this.middle.setTranslationLocal(tlb);
    this.root.setDirty();
    this.middle.setDirty();
  }
};
__publicField(TwoJointIkSolver, "TypeName", "two-joint-ik-solver");
__publicField(TwoJointIkSolver, "Properties", {
  /** Root bone, never moves */
  root: { type: Type.Object },
  /** Bone attached to the root */
  middle: { type: Type.Object },
  /** Bone attached to the middle */
  end: { type: Type.Object },
  /** Target the joins should reach for */
  target: { type: Type.Object },
  /** Helper object to use to determine joint rotation axis */
  helper: { type: Type.Object }
});

// node_modules/@wonderlandengine/components/dist/video-texture.js
var VideoTexture = class extends Component {
  init() {
    if (!this.material) {
      throw Error("video-texture: material property not set");
    }
    this.loaded = false;
    this.frameUpdateRequested = true;
  }
  start() {
    this.video = document.createElement("video");
    this.video.src = this.url;
    this.video.crossOrigin = "anonymous";
    this.video.playsInline = true;
    this.video.loop = this.loop;
    this.video.muted = this.muted;
    this.video.addEventListener("playing", () => {
      this.loaded = true;
    });
    if (this.autoplay) {
      const playAfterUserGesture = () => {
        this.video.play();
        window.removeEventListener("click", playAfterUserGesture);
        window.removeEventListener("touchstart", playAfterUserGesture);
      };
      window.addEventListener("click", playAfterUserGesture);
      window.addEventListener("touchstart", playAfterUserGesture);
    }
  }
  applyTexture() {
    const mat = this.material;
    const shader = mat.shader;
    const texture = this.texture = new Texture(this.engine, this.video);
    if (!setFirstMaterialTexture(mat, texture, this.textureProperty)) {
      console.error("Shader", shader, "not supported by video-texture");
    }
    if ("requestVideoFrameCallback" in this.video) {
      this.video.requestVideoFrameCallback(this.updateVideo.bind(this));
    } else {
      this.video.addEventListener("timeupdate", () => {
        this.frameUpdateRequested = true;
      });
    }
  }
  update(dt) {
    if (this.loaded && this.frameUpdateRequested) {
      if (this.texture) {
        this.texture.update();
      } else {
        this.applyTexture();
      }
      this.frameUpdateRequested = false;
    }
  }
  updateVideo() {
    this.frameUpdateRequested = true;
    this.video.requestVideoFrameCallback(this.updateVideo.bind(this));
  }
};
__publicField(VideoTexture, "TypeName", "video-texture");
__publicField(VideoTexture, "Properties", {
  /** URL to download video from */
  url: Property.string(),
  /** Material to apply the video texture to */
  material: Property.material(),
  /** Whether to loop the video */
  loop: Property.bool(true),
  /** Whether to automatically start playing the video */
  autoplay: Property.bool(true),
  /** Whether to mute sound */
  muted: Property.bool(true),
  /** Name of the texture property to set */
  textureProperty: Property.string("auto")
});

// node_modules/@wonderlandengine/components/dist/vr-mode-active-switch.js
var VrModeActiveSwitch = class extends Component {
  start() {
    this.components = [];
    this.getComponents(this.object);
    this.onXRSessionEnd();
    this.onSessionStartCallback = this.onXRSessionStart.bind(this);
    this.onSessionEndCallback = this.onXRSessionEnd.bind(this);
  }
  onActivate() {
    this.engine.onXRSessionStart.add(this.onSessionStartCallback);
    this.engine.onXRSessionEnd.add(this.onSessionEndCallback);
  }
  onDeactivate() {
    this.engine.onXRSessionStart.remove(this.onSessionStartCallback);
    this.engine.onXRSessionEnd.remove(this.onSessionEndCallback);
  }
  getComponents(obj) {
    const comps = obj.getComponents().filter((c) => c.type !== "vr-mode-active-switch");
    this.components = this.components.concat(comps);
    if (this.affectChildren) {
      let children = obj.children;
      for (let i = 0; i < children.length; ++i) {
        this.getComponents(children[i]);
      }
    }
  }
  setComponentsActive(active) {
    const comps = this.components;
    for (let i = 0; i < comps.length; ++i) {
      comps[i].active = active;
    }
  }
  onXRSessionStart() {
    this.setComponentsActive(this.activateComponents == 0);
  }
  onXRSessionEnd() {
    this.setComponentsActive(this.activateComponents != 0);
  }
};
__publicField(VrModeActiveSwitch, "TypeName", "vr-mode-active-switch");
__publicField(VrModeActiveSwitch, "Properties", {
  /** When components should be active: In VR or when not in VR */
  activateComponents: {
    type: Type.Enum,
    values: ["in VR", "in non-VR"],
    default: "in VR"
  },
  /** Whether child object's components should be affected */
  affectChildren: { type: Type.Bool, default: true }
});

// node_modules/@wonderlandengine/components/dist/plane-detection.js
var import_earcut = __toESM(require_earcut(), 1);
var __decorate6 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var tempVec32 = new Float32Array(3);
function extentsFromContour(out, points) {
  if (points.length == 0)
    return out;
  let absMaxX = Math.abs(points[0].x);
  let absMaxZ = Math.abs(points[0].z);
  for (let i = 1; i < points.length; ++i) {
    absMaxX = Math.max(absMaxX, Math.abs(points[i].x));
    absMaxZ = Math.max(absMaxZ, Math.abs(points[i].z));
  }
  out[0] = absMaxX;
  out[1] = 0;
  out[2] = absMaxZ;
}
function planeMeshFromContour(engine2, points, meshToUpdate = null) {
  const vertexCount = points.length;
  const vertices = new Float32Array(vertexCount * 2);
  for (let i = 0, d = 0; i < vertexCount; ++i, d += 2) {
    vertices[d] = points[i].x;
    vertices[d + 1] = points[i].z;
  }
  const triangles = (0, import_earcut.default)(vertices);
  const mesh = meshToUpdate || new Mesh(engine2, {
    vertexCount,
    /* Assumption here that we will never have more than 256 points
     * in the detected plane meshes! */
    indexType: MeshIndexType.UnsignedByte,
    indexData: triangles
  });
  if (mesh.vertexCount !== vertexCount) {
    console.warn("vertexCount of meshToUpdate did not match required vertexCount");
    return mesh;
  }
  const positions = mesh.attribute(MeshAttribute.Position);
  const textureCoords = mesh.attribute(MeshAttribute.TextureCoordinate);
  const normals = mesh.attribute(MeshAttribute.Normal);
  tempVec32[1] = 0;
  for (let i = 0, s = 0; i < vertexCount; ++i, s += 2) {
    tempVec32[0] = vertices[s];
    tempVec32[2] = vertices[s + 1];
    positions.set(i, tempVec32);
  }
  textureCoords?.set(0, vertices);
  if (normals) {
    tempVec32[0] = 0;
    tempVec32[1] = 1;
    tempVec32[2] = 0;
    for (let i = 0; i < vertexCount; ++i) {
      normals.set(i, tempVec32);
    }
  }
  if (meshToUpdate)
    mesh.update();
  return mesh;
}
var _planeLost, planeLost_fn, _planeFound, planeFound_fn, _planeUpdate, planeUpdate_fn, _planeUpdatePose, planeUpdatePose_fn;
var PlaneDetection = class extends Component {
  constructor() {
    super(...arguments);
    __privateAdd(this, _planeLost);
    __privateAdd(this, _planeFound);
    __privateAdd(this, _planeUpdate);
    __privateAdd(this, _planeUpdatePose);
    /**
     * Material to assign to created plane meshes or `null` if meshes should not be created.
     */
    __publicField(this, "planeMaterial", null);
    /**
     * Collision mask to assign to newly created collision components or a negative value if
     * collision components should not be created.
     */
    __publicField(this, "collisionMask", -1);
    /** Map of all planes and their last updated timestamps */
    __publicField(this, "planes", /* @__PURE__ */ new Map());
    /** Objects generated for each XRPlane */
    __publicField(this, "planeObjects", /* @__PURE__ */ new Map());
    /** Called when a plane starts tracking */
    __publicField(this, "onPlaneFound", new Emitter());
    /** Called when a plane stops tracking */
    __publicField(this, "onPlaneLost", new Emitter());
  }
  update() {
    if (!this.engine.xr?.frame)
      return;
    if (this.engine.xr.frame.detectedPlanes === void 0) {
      console.error("plane-detection: WebXR feature not available.");
      this.active = false;
      return;
    }
    const detectedPlanes = this.engine.xr.frame.detectedPlanes;
    for (const [plane, _] of this.planes) {
      if (!detectedPlanes.has(plane)) {
        __privateMethod(this, _planeLost, planeLost_fn).call(this, plane);
      }
    }
    detectedPlanes.forEach((plane) => {
      if (this.planes.has(plane)) {
        if (plane.lastChangedTime > this.planes.get(plane)) {
          __privateMethod(this, _planeUpdate, planeUpdate_fn).call(this, plane);
        }
      } else {
        __privateMethod(this, _planeFound, planeFound_fn).call(this, plane);
      }
      __privateMethod(this, _planeUpdatePose, planeUpdatePose_fn).call(this, plane);
    });
  }
};
_planeLost = new WeakSet();
planeLost_fn = function(plane) {
  this.planes.delete(plane);
  const o = this.planeObjects.get(plane);
  this.onPlaneLost.notify(plane, o);
  if (o.objectId > 0)
    o.destroy();
};
_planeFound = new WeakSet();
planeFound_fn = function(plane) {
  this.planes.set(plane, plane.lastChangedTime);
  const o = this.engine.scene.addObject(this.object);
  this.planeObjects.set(plane, o);
  if (this.planeMaterial) {
    o.addComponent(MeshComponent, {
      mesh: planeMeshFromContour(this.engine, plane.polygon),
      material: this.planeMaterial
    });
  }
  if (this.collisionMask >= 0) {
    extentsFromContour(tempVec32, plane.polygon);
    tempVec32[1] = 0.025;
    o.addComponent(CollisionComponent, {
      group: this.collisionMask,
      collider: Collider.Box,
      extents: tempVec32
    });
  }
  this.onPlaneFound.notify(plane, o);
};
_planeUpdate = new WeakSet();
planeUpdate_fn = function(plane) {
  this.planes.set(plane, plane.lastChangedTime);
  const planeMesh = this.planeObjects.get(plane).getComponent(MeshComponent);
  if (!planeMesh)
    return;
  planeMeshFromContour(this.engine, plane.polygon, planeMesh.mesh);
};
_planeUpdatePose = new WeakSet();
planeUpdatePose_fn = function(plane) {
  const o = this.planeObjects.get(plane);
  const pose = this.engine.xr.frame.getPose(plane.planeSpace, this.engine.xr.currentReferenceSpace);
  if (!pose) {
    o.active = false;
    return;
  }
  setXRRigidTransformLocal(o, pose.transform);
};
__publicField(PlaneDetection, "TypeName", "plane-detection");
__decorate6([
  property.material()
], PlaneDetection.prototype, "planeMaterial", void 0);
__decorate6([
  property.int()
], PlaneDetection.prototype, "collisionMask", void 0);

// node_modules/@wonderlandengine/components/dist/vrm.js
var VRM_ROLL_AXES = {
  X: [1, 0, 0],
  Y: [0, 1, 0],
  Z: [0, 0, 1]
};
var VRM_AIM_AXES = {
  PositiveX: [1, 0, 0],
  NegativeX: [-1, 0, 0],
  PositiveY: [0, 1, 0],
  NegativeY: [0, -1, 0],
  PositiveZ: [0, 0, 1],
  NegativeZ: [0, 0, -1]
};
var Vrm = class extends Component {
  /** Meta information about the VRM model */
  meta = null;
  /** The humanoid bones of the VRM model */
  bones = {
    /* Torso */
    hips: null,
    spine: null,
    chest: null,
    upperChest: null,
    neck: null,
    /* Head */
    head: null,
    leftEye: null,
    rightEye: null,
    jaw: null,
    /* Legs */
    leftUpperLeg: null,
    leftLowerLeg: null,
    leftFoot: null,
    leftToes: null,
    rightUpperLeg: null,
    rightLowerLeg: null,
    rightFoot: null,
    rightToes: null,
    /* Arms */
    leftShoulder: null,
    leftUpperArm: null,
    leftLowerArm: null,
    leftHand: null,
    rightShoulder: null,
    rightUpperArm: null,
    rightLowerArm: null,
    rightHand: null,
    /* Fingers */
    leftThumbMetacarpal: null,
    leftThumbProximal: null,
    leftThumbDistal: null,
    leftIndexProximal: null,
    leftIndexIntermediate: null,
    leftIndexDistal: null,
    leftMiddleProximal: null,
    leftMiddleIntermediate: null,
    leftMiddleDistal: null,
    leftRingProximal: null,
    leftRingIntermediate: null,
    leftRingDistal: null,
    leftLittleProximal: null,
    leftLittleIntermediate: null,
    leftLittleDistal: null,
    rightThumbMetacarpal: null,
    rightThumbProximal: null,
    rightThumbDistal: null,
    rightIndexProximal: null,
    rightIndexIntermediate: null,
    rightIndexDistal: null,
    rightMiddleProximal: null,
    rightMiddleIntermediate: null,
    rightMiddleDistal: null,
    rightRingProximal: null,
    rightRingIntermediate: null,
    rightRingDistal: null,
    rightLittleProximal: null,
    rightLittleIntermediate: null,
    rightLittleDistal: null
  };
  /** Rotations of the bones in the rest pose (T-pose) */
  restPose = {};
  /* All node constraints, ordered to deal with dependencies */
  _nodeConstraints = [];
  /* VRMC_springBone chains */
  _springChains = [];
  /* Spherical colliders for spring bones */
  _sphereColliders = [];
  /* Capsule shaped colliders for spring bones */
  _capsuleColliders = [];
  /* Indicates which meshes are rendered in first/third person views */
  _firstPersonAnnotations = [];
  /* Contains details for (bone type) lookAt behaviour */
  _lookAt = null;
  /* Whether or not the VRM component has been initialized with `initializeVrm` */
  _initialized = false;
  init() {
    this._tempV3 = vec3_exports.create();
    this._tempV3A = vec3_exports.create();
    this._tempV3B = vec3_exports.create();
    this._tempQuat = quat_exports.create();
    this._tempQuatA = quat_exports.create();
    this._tempQuatB = quat_exports.create();
    this._tempMat4A = mat4_exports.create();
    this._tempQuat2 = quat2_exports.create();
    this._tailToShape = vec3_exports.create();
    this._headToTail = vec3_exports.create();
    this._inertia = vec3_exports.create();
    this._stiffness = vec3_exports.create();
    this._external = vec3_exports.create();
    this._rightVector = vec3_exports.set(vec3_exports.create(), 1, 0, 0);
    this._upVector = vec3_exports.set(vec3_exports.create(), 0, 1, 0);
    this._forwardVector = vec3_exports.set(vec3_exports.create(), 0, 0, 1);
    this._identityQuat = quat_exports.identity(quat_exports.create());
    this._rad2deg = 180 / Math.PI;
  }
  start() {
    if (!this.src) {
      console.error("vrm: src property not set");
      return;
    }
    this.engine.scene.append(this.src, { loadGltfExtensions: true }).then(({ root, extensions }) => {
      root.children.forEach((child) => child.parent = this.object);
      this._initializeVrm(extensions);
      root.destroy();
    });
  }
  /**
   * Parses the VRM glTF extensions and initializes the vrm component.
   * @param {GLTFExtensions} extensions The glTF extensions for the VRM model
   */
  _initializeVrm(extensions) {
    if (this._initialized) {
      throw Error("VRM component has already been initialized");
    }
    const VRMC_vrm = extensions.root["VRMC_vrm"];
    if (!VRMC_vrm) {
      throw Error("Missing VRM extensions");
    }
    if (VRMC_vrm.specVersion !== "1.0") {
      throw Error(`Unsupported VRM version, only 1.0 is supported, but encountered '${VRMC_vrm.specVersion}'`);
    }
    this.meta = VRMC_vrm.meta;
    this._parseHumanoid(VRMC_vrm.humanoid, extensions);
    if (VRMC_vrm.firstPerson) {
      this._parseFirstPerson(VRMC_vrm.firstPerson, extensions);
    }
    if (VRMC_vrm.lookAt) {
      this._parseLookAt(VRMC_vrm.lookAt);
    }
    this._findAndParseNodeConstraints(extensions);
    const springBone = extensions.root["VRMC_springBone"];
    if (springBone) {
      this._parseAndInitializeSpringBones(springBone, extensions);
    }
    this._initialized = true;
  }
  _parseHumanoid(humanoid, extensions) {
    for (const boneName in humanoid.humanBones) {
      if (!(boneName in this.bones)) {
        console.warn(`Unrecognized bone '${boneName}'`);
        continue;
      }
      const node = humanoid.humanBones[boneName].node;
      const objectId = extensions.idMapping[node];
      this.bones[boneName] = this.engine.wrapObject(objectId);
      this.restPose[boneName] = quat_exports.copy(quat_exports.create(), this.bones[boneName].rotationLocal);
    }
  }
  _parseFirstPerson(firstPerson, extensions) {
    for (const meshAnnotation of firstPerson.meshAnnotations) {
      const annotation = {
        node: this.engine.wrapObject(extensions.idMapping[meshAnnotation.node]),
        firstPerson: true,
        thirdPerson: true
      };
      switch (meshAnnotation.type) {
        case "firstPersonOnly":
          annotation.thirdPerson = false;
          break;
        case "thirdPersonOnly":
          annotation.firstPerson = false;
          break;
        case "both":
          break;
        case "auto":
          console.warn("First person mesh annotation type 'auto' is not supported, treating as 'both'!");
          break;
        default:
          console.error(`Invalid mesh annotation type '${meshAnnotation.type}'`);
          break;
      }
      this._firstPersonAnnotations.push(annotation);
    }
  }
  _parseLookAt(lookAt2) {
    if (lookAt2.type !== "bone") {
      console.warn(`Unsupported lookAt type '${lookAt2.type}', only 'bone' is supported`);
      return;
    }
    const parseRangeMap = (rangeMap) => {
      return {
        inputMaxValue: rangeMap.inputMaxValue,
        outputScale: rangeMap.outputScale
      };
    };
    this._lookAt = {
      offsetFromHeadBone: lookAt2.offsetFromHeadBone || [0, 0, 0],
      horizontalInner: parseRangeMap(lookAt2.rangeMapHorizontalInner),
      horizontalOuter: parseRangeMap(lookAt2.rangeMapHorizontalOuter),
      verticalDown: parseRangeMap(lookAt2.rangeMapVerticalDown),
      verticalUp: parseRangeMap(lookAt2.rangeMapVerticalUp)
    };
  }
  _findAndParseNodeConstraints(extensions) {
    const traverse = (object) => {
      const nodeExtensions = extensions.node[object.objectId];
      if (nodeExtensions && "VRMC_node_constraint" in nodeExtensions) {
        const nodeConstraintExtension = nodeExtensions["VRMC_node_constraint"];
        const constraint = nodeConstraintExtension.constraint;
        let type, axis;
        if ("roll" in constraint) {
          type = "roll";
          axis = VRM_ROLL_AXES[constraint.roll.rollAxis];
        } else if ("aim" in constraint) {
          type = "aim";
          axis = VRM_AIM_AXES[constraint.aim.aimAxis];
        } else if ("rotation" in constraint) {
          type = "rotation";
        }
        if (type) {
          const source = this.engine.wrapObject(extensions.idMapping[constraint[type].source]);
          this._nodeConstraints.push({
            type,
            source,
            destination: object,
            axis,
            weight: constraint[type].weight,
            /* Rest pose */
            destinationRestLocalRotation: quat_exports.copy(quat_exports.create(), object.rotationLocal),
            sourceRestLocalRotation: quat_exports.copy(quat_exports.create(), source.rotationLocal),
            sourceRestLocalRotationInv: quat_exports.invert(quat_exports.create(), source.rotationLocal)
          });
        } else {
          console.warn("Unrecognized or invalid VRMC_node_constraint, ignoring it");
        }
      }
      for (const child of object.children) {
        traverse(child);
      }
    };
    traverse(this.object);
  }
  _parseAndInitializeSpringBones(springBone, extensions) {
    const colliders = (springBone.colliders || []).map((collider, i) => {
      const shapeType = "capsule" in collider.shape ? "capsule" : "sphere";
      return {
        id: i,
        object: this.engine.wrapObject(extensions.idMapping[collider.node]),
        shape: {
          isCapsule: shapeType === "capsule",
          radius: collider.shape[shapeType].radius,
          offset: collider.shape[shapeType].offset,
          tail: collider.shape[shapeType].tail
        },
        cache: {
          head: vec3_exports.create(),
          tail: vec3_exports.create()
        }
      };
    });
    this._sphereColliders = colliders.filter((c) => !c.shape.isCapsule);
    this._capsuleColliders = colliders.filter((c) => c.shape.isCapsule);
    const colliderGroups = (springBone.colliderGroups || []).map((group) => ({
      name: group.name,
      colliders: group.colliders.map((c) => colliders[c])
    }));
    for (const spring of springBone.springs) {
      const joints = [];
      for (const joint of spring.joints) {
        const springJoint = {
          hitRadius: 0,
          stiffness: 1,
          gravityPower: 0,
          gravityDir: [0, -1, 0],
          dragForce: 0.5,
          node: null,
          state: null
        };
        Object.assign(springJoint, joint);
        springJoint.node = this.engine.wrapObject(extensions.idMapping[springJoint.node]);
        joints.push(springJoint);
      }
      const springChainColliders = (spring.colliderGroups || []).flatMap((cg) => colliderGroups[cg].colliders);
      this._springChains.push({
        name: spring.name,
        center: spring.center ? this.engine.wrapObject(extensions.idMapping[spring.center]) : null,
        joints,
        sphereColliders: springChainColliders.filter((c) => !c.shape.isCapsule),
        capsuleColliders: springChainColliders.filter((c) => c.shape.isCapsule)
      });
    }
    for (const springChain of this._springChains) {
      for (let i = 0; i < springChain.joints.length - 1; ++i) {
        const springBoneJoint = springChain.joints[i];
        const childSpringBoneJoint = springChain.joints[i + 1];
        const springBonePosition = springBoneJoint.node.getTranslationWorld(vec3_exports.create());
        const childSpringBonePosition = childSpringBoneJoint.node.getTranslationWorld(vec3_exports.create());
        const boneDirection = vec3_exports.subtract(this._tempV3A, springBonePosition, childSpringBonePosition);
        const state = {
          prevTail: childSpringBonePosition,
          currentTail: vec3_exports.copy(vec3_exports.create(), childSpringBonePosition),
          initialLocalRotation: quat_exports.copy(quat_exports.create(), springBoneJoint.node.rotationLocal),
          initialLocalTransformInvert: quat2_exports.invert(quat2_exports.create(), springBoneJoint.node.transformLocal),
          boneAxis: vec3_exports.normalize(vec3_exports.create(), childSpringBoneJoint.node.getTranslationLocal(this._tempV3)),
          /* Ensure bone length is at least 1cm to avoid jittery behaviour from zero-length bones */
          boneLength: Math.max(0.01, vec3_exports.length(boneDirection)),
          /* Tail positions in center space, if needed */
          prevTailCenter: null,
          currentTailCenter: null
        };
        if (springChain.center) {
          state.prevTailCenter = springChain.center.transformPointInverseWorld(vec3_exports.create(), childSpringBonePosition);
          state.currentTailCenter = vec3_exports.copy(vec3_exports.create(), childSpringBonePosition);
        }
        springBoneJoint.state = state;
      }
    }
  }
  update(dt) {
    if (!this._initialized) {
      return;
    }
    this._resolveLookAt();
    this._resolveConstraints();
    this._updateSpringBones(dt);
  }
  _rangeMap(rangeMap, input) {
    const maxValue = rangeMap.inputMaxValue;
    const outputScale = rangeMap.outputScale;
    return Math.min(input, maxValue) / maxValue * outputScale;
  }
  _resolveLookAt() {
    if (!this._lookAt || !this.lookAtTarget) {
      return;
    }
    const lookAtSource = this.bones.head.transformPointWorld(this._tempV3A, this._lookAt.offsetFromHeadBone);
    const lookAtTarget = this.lookAtTarget.getTranslationWorld(this._tempV3B);
    const lookAtDirection = vec3_exports.sub(this._tempV3A, lookAtTarget, lookAtSource);
    vec3_exports.normalize(lookAtDirection, lookAtDirection);
    this.bones.head.parent.transformVectorInverseWorld(lookAtDirection);
    const z = vec3_exports.dot(lookAtDirection, this._forwardVector);
    const x = vec3_exports.dot(lookAtDirection, this._rightVector);
    const yaw = Math.atan2(x, z) * this._rad2deg;
    const xz = Math.sqrt(x * x + z * z);
    const y = vec3_exports.dot(lookAtDirection, this._upVector);
    let pitch = Math.atan2(-y, xz) * this._rad2deg;
    if (pitch > 0) {
      pitch = this._rangeMap(this._lookAt.verticalDown, pitch);
    } else {
      pitch = -this._rangeMap(this._lookAt.verticalUp, -pitch);
    }
    if (this.bones.leftEye) {
      let yawLeft = yaw;
      if (yawLeft > 0) {
        yawLeft = this._rangeMap(this._lookAt.horizontalInner, yawLeft);
      } else {
        yawLeft = -this._rangeMap(this._lookAt.horizontalOuter, -yawLeft);
      }
      const eyeRotation = quat_exports.fromEuler(this._tempQuatA, pitch, yawLeft, 0);
      this.bones.leftEye.rotationLocal = quat_exports.multiply(eyeRotation, this.restPose.leftEye, eyeRotation);
    }
    if (this.bones.rightEye) {
      let yawRight = yaw;
      if (yawRight > 0) {
        yawRight = this._rangeMap(this._lookAt.horizontalOuter, yawRight);
      } else {
        yawRight = -this._rangeMap(this._lookAt.horizontalInner, -yawRight);
      }
      const eyeRotation = quat_exports.fromEuler(this._tempQuatA, pitch, yawRight, 0);
      this.bones.rightEye.rotationLocal = quat_exports.multiply(eyeRotation, this.restPose.rightEye, eyeRotation);
    }
  }
  _resolveConstraints() {
    for (const nodeConstraint of this._nodeConstraints) {
      this._resolveConstraint(nodeConstraint);
    }
  }
  _resolveConstraint(nodeConstraint) {
    const dstRestQuat = nodeConstraint.destinationRestLocalRotation;
    const srcRestQuatInv = nodeConstraint.sourceRestLocalRotationInv;
    const targetQuat = quat_exports.identity(this._tempQuatA);
    switch (nodeConstraint.type) {
      case "roll":
        {
          const deltaSrcQuat = quat_exports.multiply(this._tempQuatA, srcRestQuatInv, nodeConstraint.source.rotationLocal);
          const deltaSrcQuatInParent = quat_exports.multiply(this._tempQuatA, nodeConstraint.sourceRestLocalRotation, deltaSrcQuat);
          quat_exports.mul(deltaSrcQuatInParent, deltaSrcQuatInParent, srcRestQuatInv);
          const dstRestQuatInv = quat_exports.invert(this._tempQuatB, dstRestQuat);
          const deltaSrcQuatInDst = quat_exports.multiply(this._tempQuatB, dstRestQuatInv, deltaSrcQuatInParent);
          quat_exports.multiply(deltaSrcQuatInDst, deltaSrcQuatInDst, dstRestQuat);
          const toVec = vec3_exports.transformQuat(this._tempV3A, nodeConstraint.axis, deltaSrcQuatInDst);
          const fromToQuat = quat_exports.rotationTo(this._tempQuatA, nodeConstraint.axis, toVec);
          quat_exports.mul(targetQuat, dstRestQuat, quat_exports.invert(this._tempQuat, fromToQuat));
          quat_exports.mul(targetQuat, targetQuat, deltaSrcQuatInDst);
        }
        break;
      case "aim":
        {
          const dstParentWorldQuat = nodeConstraint.destination.parent.rotationWorld;
          const fromVec = vec3_exports.transformQuat(this._tempV3A, nodeConstraint.axis, dstRestQuat);
          vec3_exports.transformQuat(fromVec, fromVec, dstParentWorldQuat);
          const toVec = nodeConstraint.source.getTranslationWorld(this._tempV3B);
          vec3_exports.sub(toVec, toVec, nodeConstraint.destination.getTranslationWorld(this._tempV3));
          vec3_exports.normalize(toVec, toVec);
          const fromToQuat = quat_exports.rotationTo(this._tempQuatA, fromVec, toVec);
          quat_exports.mul(targetQuat, quat_exports.invert(this._tempQuat, dstParentWorldQuat), fromToQuat);
          quat_exports.mul(targetQuat, targetQuat, dstParentWorldQuat);
          quat_exports.mul(targetQuat, targetQuat, dstRestQuat);
        }
        break;
      case "rotation":
        {
          const srcDeltaQuat = quat_exports.mul(targetQuat, srcRestQuatInv, nodeConstraint.source.rotationLocal);
          quat_exports.mul(targetQuat, dstRestQuat, srcDeltaQuat);
        }
        break;
    }
    quat_exports.slerp(targetQuat, dstRestQuat, targetQuat, nodeConstraint.weight);
    nodeConstraint.destination.rotationLocal = targetQuat;
  }
  _updateSpringBones(dt) {
    this._sphereColliders.forEach(({ object, shape, cache }) => {
      const offset2 = vec3_exports.copy(cache.head, shape.offset);
      object.transformVectorWorld(offset2);
      vec3_exports.add(cache.head, object.getTranslationWorld(this._tempV3), offset2);
    });
    this._capsuleColliders.forEach(({ object, shape, cache }) => {
      const shapeCenter = object.getTranslationWorld(this._tempV3A);
      const headOffset = vec3_exports.copy(cache.head, shape.offset);
      object.transformVectorWorld(headOffset);
      vec3_exports.add(cache.head, shapeCenter, headOffset);
      const tailOffset = vec3_exports.copy(cache.tail, shape.tail);
      object.transformVectorWorld(tailOffset);
      vec3_exports.add(cache.tail, shapeCenter, tailOffset);
    });
    this._springChains.forEach((springChain) => {
      for (let i = 0; i < springChain.joints.length - 1; ++i) {
        const joint = springChain.joints[i];
        const parentWorldRotation = joint.node.parent ? joint.node.parent.rotationWorld : this._identityQuat;
        const inertia = this._inertia;
        if (springChain.center) {
          vec3_exports.sub(inertia, joint.state.currentTailCenter, joint.state.prevTailCenter);
          springChain.center.transformVectorWorld(inertia);
        } else {
          vec3_exports.sub(inertia, joint.state.currentTail, joint.state.prevTail);
        }
        vec3_exports.scale(inertia, inertia, 1 - joint.dragForce);
        const stiffness = vec3_exports.copy(this._stiffness, joint.state.boneAxis);
        vec3_exports.transformQuat(stiffness, stiffness, joint.state.initialLocalRotation);
        vec3_exports.transformQuat(stiffness, stiffness, parentWorldRotation);
        vec3_exports.scale(stiffness, stiffness, dt * joint.stiffness);
        const external = vec3_exports.scale(this._external, joint.gravityDir, dt * joint.gravityPower);
        const nextTail = vec3_exports.copy(this._tempV3A, joint.state.currentTail);
        vec3_exports.add(nextTail, nextTail, inertia);
        vec3_exports.add(nextTail, nextTail, stiffness);
        vec3_exports.add(nextTail, nextTail, external);
        const worldPosition = joint.node.getTranslationWorld(this._tempV3B);
        vec3_exports.sub(nextTail, nextTail, worldPosition);
        vec3_exports.normalize(nextTail, nextTail);
        vec3_exports.scaleAndAdd(nextTail, worldPosition, nextTail, joint.state.boneLength);
        for (const { shape, cache } of springChain.sphereColliders) {
          let tailToShape = this._tailToShape;
          const sphereCenter = cache.head;
          tailToShape = vec3_exports.sub(tailToShape, nextTail, sphereCenter);
          const radius = shape.radius + joint.hitRadius;
          const dist2 = vec3_exports.length(tailToShape) - radius;
          if (dist2 < 0) {
            vec3_exports.normalize(tailToShape, tailToShape);
            vec3_exports.scaleAndAdd(nextTail, nextTail, tailToShape, -dist2);
            vec3_exports.sub(nextTail, nextTail, worldPosition);
            vec3_exports.normalize(nextTail, nextTail);
            vec3_exports.scaleAndAdd(nextTail, worldPosition, nextTail, joint.state.boneLength);
          }
        }
        for (const { shape, cache } of springChain.capsuleColliders) {
          let tailToShape = this._tailToShape;
          const head = cache.head;
          const tail = cache.tail;
          tailToShape = vec3_exports.sub(tailToShape, nextTail, head);
          const headToTail = vec3_exports.sub(this._headToTail, tail, head);
          const dot5 = vec3_exports.dot(headToTail, tailToShape);
          if (vec3_exports.squaredLength(headToTail) <= dot5) {
            vec3_exports.sub(tailToShape, nextTail, tail);
          } else if (dot5 > 0) {
            vec3_exports.scale(headToTail, headToTail, dot5 / vec3_exports.squaredLength(headToTail));
            vec3_exports.sub(tailToShape, tailToShape, headToTail);
          }
          const radius = shape.radius + joint.hitRadius;
          const dist2 = vec3_exports.length(tailToShape) - radius;
          if (dist2 < 0) {
            vec3_exports.normalize(tailToShape, tailToShape);
            vec3_exports.scaleAndAdd(nextTail, nextTail, tailToShape, -dist2);
            vec3_exports.sub(nextTail, nextTail, worldPosition);
            vec3_exports.normalize(nextTail, nextTail);
            vec3_exports.scaleAndAdd(nextTail, worldPosition, nextTail, joint.state.boneLength);
          }
        }
        vec3_exports.copy(joint.state.prevTail, joint.state.currentTail);
        vec3_exports.copy(joint.state.currentTail, nextTail);
        if (springChain.center) {
          vec3_exports.copy(joint.state.prevTailCenter, joint.state.currentTailCenter);
          vec3_exports.copy(joint.state.currentTailCenter, nextTail);
          springChain.center.transformPointInverseWorld(joint.state.currentTailCenter);
        }
        joint.node.parent.transformPointInverseWorld(nextTail);
        const nextTailDualQuat = quat2_exports.fromTranslation(this._tempQuat2, nextTail);
        quat2_exports.multiply(nextTailDualQuat, joint.state.initialLocalTransformInvert, nextTailDualQuat);
        quat2_exports.getTranslation(nextTail, nextTailDualQuat);
        vec3_exports.normalize(nextTail, nextTail);
        const jointRotation = quat_exports.rotationTo(this._tempQuatA, joint.state.boneAxis, nextTail);
        joint.node.rotationLocal = quat_exports.mul(this._tempQuatA, joint.state.initialLocalRotation, jointRotation);
      }
    });
  }
  /**
   * @param {boolean} firstPerson Whether the model should render for first person or third person views
   */
  set firstPerson(firstPerson) {
    this._firstPersonAnnotations.forEach((annotation) => {
      const visible = firstPerson == annotation.firstPerson || firstPerson != annotation.thirdPerson;
      annotation.node.getComponents("mesh").forEach((mesh) => {
        mesh.active = visible;
      });
    });
  }
};
__publicField(Vrm, "TypeName", "vrm");
__publicField(Vrm, "Properties", {
  /** URL to a VRM file to load */
  src: { type: Type.String },
  /** Object the VRM is looking at */
  lookAtTarget: { type: Type.Object }
});

// node_modules/@wonderlandengine/components/dist/wasd-controls.js
var WasdControlsComponent = class extends Component {
  init() {
    this.up = false;
    this.right = false;
    this.down = false;
    this.left = false;
    window.addEventListener("keydown", this.press.bind(this));
    window.addEventListener("keyup", this.release.bind(this));
  }
  start() {
    this.headObject = this.headObject || this.object;
  }
  update() {
    let direction2 = [0, 0, 0];
    if (this.up)
      direction2[2] -= 1;
    if (this.down)
      direction2[2] += 1;
    if (this.left)
      direction2[0] -= 1;
    if (this.right)
      direction2[0] += 1;
    vec3_exports.normalize(direction2, direction2);
    direction2[0] *= this.speed;
    direction2[2] *= this.speed;
    vec3_exports.transformQuat(direction2, direction2, this.headObject.transformWorld);
    this.object.translate(direction2);
  }
  press(e) {
    if (e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 90) {
      this.up = true;
    } else if (e.keyCode === 39 || e.keyCode === 68) {
      this.right = true;
    } else if (e.keyCode === 40 || e.keyCode === 83) {
      this.down = true;
    } else if (e.keyCode === 37 || e.keyCode === 65 || e.keyCode === 81) {
      this.left = true;
    }
  }
  release(e) {
    if (e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 90) {
      this.up = false;
    } else if (e.keyCode === 39 || e.keyCode === 68) {
      this.right = false;
    } else if (e.keyCode === 40 || e.keyCode === 83) {
      this.down = false;
    } else if (e.keyCode === 37 || e.keyCode === 65 || e.keyCode === 81) {
      this.left = false;
    }
  }
};
__publicField(WasdControlsComponent, "TypeName", "wasd-controls");
__publicField(WasdControlsComponent, "Properties", {
  /** Movement speed in m/s. */
  speed: { type: Type.Float, default: 0.1 },
  /** Object of which the orientation is used to determine forward direction */
  headObject: { type: Type.Object }
});

// force-on-click.js
var force = new Float32Array(3);
var ApplyForceOnClick = class extends Component {
  start() {
    const target = this.object.getComponent(Cursor).globalTarget;
    target.onClick.add(this.onClick.bind(this));
  }
  onClick(object, cursor) {
    const body = object.getComponent("physx");
    if (body.static)
      return;
    cursor.object.getForwardWorld(force);
    force[0] *= this.strength;
    force[1] *= this.strength;
    force[2] *= this.strength;
    body.addForce(force, ForceMode.Force, false, cursor.cursorPos);
  }
};
__publicField(ApplyForceOnClick, "TypeName", "apply-force-on-click");
__publicField(ApplyForceOnClick, "Properties", {
  strength: { type: Type.Float, default: 800 }
});

// js/index.js
var RuntimeOptions = {
  physx: true,
  loader: false,
  xrFramebufferScaleFactor: 1,
  canvas: "canvas"
};
var Constants = {
  ProjectName: "physics",
  RuntimeBaseName: "WonderlandRuntime",
  WebXRRequiredFeatures: ["local"],
  WebXROptionalFeatures: ["local", "hand-tracking", "hit-test"]
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
  engine.requestXRSession(
    mode,
    Constants.WebXRRequiredFeatures,
    Constants.WebXROptionalFeatures
  ).catch((e) => console.error(e));
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
engine.registerComponent(Cursor);
engine.registerComponent(MouseLookComponent);
engine.registerComponent(WasdControlsComponent);
engine.registerComponent(ApplyForceOnClick);
engine.scene.load(`${Constants.ProjectName}.bin`);
/*! Bundled license information:

howler/dist/howler.js:
  (*!
   *  howler.js v2.2.3
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)
  (*!
   *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
   *  
   *  howler.js v2.2.3
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)
*/
//# sourceMappingURL=physics-bundle.js.map
