// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/vue.js":[function(require,module,exports) {
var url = "http://localhost:3000";
var picture = PictureInput;
var Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000
});
var app = new Vue({
  el: "#app",
  data: {
    loading: false,
    tags: [],
    show: {
      myImage: false,
      allImage: true,
      islogin: false,
      image: false
    },
    register: {
      name: "",
      email: "",
      password: ""
    },
    login: {
      email: "",
      password: ""
    },
    error: {
      register: "",
      login: "",
      fetch: ""
    },
    searchImage: "",
    images: [],
    userImages: []
  },
  components: {
    "picture-input": PictureInput
  },
  methods: {
    searchingImage: function searchingImage() {
      var _this = this;

      this.findAll(function () {
        if (_this.searchImage != "") {
          var arr = [];

          _this.images.forEach(function (image) {
            var temp = image.tags.join("").toLowerCase();

            if (temp.includes(_this.searchImage)) {
              arr.push(image);
            }
          });

          _this.images = arr;
        }
      });
    },
    showImage: function showImage() {
      if (this.show.image == false) {
        this.show.image = true;
      } else if (this.show.image == true) {
        this.show.image = false;
      }
    },
    userRegister: function userRegister() {
      var _this2 = this;

      this.error.register = "";
      axios({
        method: "POST",
        url: "".concat(url, "/signup"),
        data: {
          name: this.register.name,
          email: this.register.email,
          password: this.register.password
        }
      }).then(function (_ref) {
        var data = _ref.data;
        _this2.register.name = "";
        _this2.register.email = "";
        _this2.register.password = "";
        Toast.fire({
          type: 'success',
          title: 'Register Success, You can login now'
        });
      }).catch(function (error) {
        _this2.error.register = "Error: ".concat(error.response.data.message);
      });
    },
    userLogin: function userLogin() {
      var _this3 = this;

      this.errorLogin = "";
      axios({
        method: "POST",
        url: "".concat(url, "/signin"),
        data: {
          email: this.login.email,
          password: this.login.password
        }
      }).then(function (_ref2) {
        var data = _ref2.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.id);

        _this3.findAll();

        console.log(localStorage);
        _this3.show.islogin = true;
        Toast.fire({
          type: 'success',
          title: 'Logged in successfully'
        });
      }).catch(function (error) {
        _this3.error.login = "Error: ".concat(error);
      });
    },
    logout: function logout() {
      var _this4 = this;

      Swal.fire({
        title: 'Gotta go?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes !'
      }).then(function (result) {
        if (result.value) {
          localStorage.clear();
          _this4.show.islogin = false;
          Toast.fire({
            title: 'Logged out successfully'
          });
        }
      });
    },
    findAll: function findAll(cb) {
      var _this5 = this;

      axios({
        method: "GET",
        url: "".concat(url, "/image"),
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(function (_ref3) {
        var data = _ref3.data;
        console.log(data);
        _this5.images = data;

        if (cb) {
          cb();
        }
      }).catch(function (error) {
        _this5.error.login = "Error: ".concat(error);
      });
    },
    findUserImage: function findUserImage() {
      var _this6 = this;

      axios({
        method: "GET",
        url: "".concat(url, "/image?find=user"),
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(function (_ref4) {
        var data = _ref4.data;
        _this6.userImages = data;
        console.log(data);
      }).catch(function (error) {
        _this6.error.login = "Error: ".concat(error);
      });
    },
    tes: function tes() {
      var _this7 = this;

      console.log(this.$refs.pictureInput);
      console.log(this.$refs.pictureInput.file);
      console.log(this.tags);
      var newImage = new FormData();
      newImage.append("image", this.$refs.pictureInput.file);
      newImage.append("tags", this.tags);
      console.log(newImage);
      this.loading = true;
      axios({
        url: "".concat(url, "/image"),
        method: "post",
        data: newImage,
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(function (_ref5) {
        var data = _ref5.data;
        _this7.loading = false;
        _this7.show.image = false;
        _this7.show.allImage = true;

        _this7.findAll();

        Toast.fire({
          type: 'success',
          title: 'Image posted successully'
        });
        console.log(data);
      }).catch(function (err) {
        console.log(err);
      });
    },
    deleteImage: function deleteImage(id) {
      var _this8 = this;

      Swal.fire({
        title: 'Delete this image?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then(function (result) {
        if (result.value) {
          axios({
            url: "".concat(url, "/image/").concat(id),
            method: "DELETE",
            headers: {
              token: localStorage.getItem("token")
            }
          }).then(function (_ref6) {
            var data = _ref6.data;

            _this8.showMyImage();

            Toast.fire({
              type: 'success',
              title: 'Image deleted'
            });
            console.log(data);
          }).catch(function (err) {
            console.log(err);
          });
        }
      });
    },
    showMyImage: function showMyImage() {
      this.show.allImage = false;
      this.show.myImage = true;
      this.show.image = false;
      this.findUserImage();
    },
    showAllImage: function showAllImage() {
      this.show.allImage = true;
      this.show.myImage = false;
      this.show.image = false;
      this.findAll();
    },
    isVote: function isVote(imageId) {
      var image = this.images.find(function (image) {
        return image._id === imageId;
      });

      if (image.voters.indexOf(localStorage.id) === -1) {
        return false;
      } else {
        return true;
      }
    },
    vote: function vote(id, option) {
      var _this9 = this;

      console.log('masuk vote');
      axios({
        url: "".concat(url, "/image/").concat(id),
        method: "patch",
        data: {
          option: option
        },
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(function (_ref7) {
        var data = _ref7.data;
        console.log(data);

        _this9.findAll();
      }).catch(function (err) {
        console.log(err);
      });
    }
  },
  computed: {},
  created: function created() {
    if (localStorage.getItem("token")) {
      console.log(localStorage.id); // console.log(this.$refs.pictureInput)

      this.show.islogin = true;
      this.findAll();
    }
  }
});
},{}],"../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42005" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/vue.js"], null)
//# sourceMappingURL=/vue.737ed864.js.map