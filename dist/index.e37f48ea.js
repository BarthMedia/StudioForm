// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"d8XZh":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "d113fd8ce37f48ea";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"aenu9":[function(require,module,exports) {
// + Imports +
// Base
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _esRegexpFlagsJs = require("core-js/modules/es.regexp.flags.js");
var _webImmediateJs = require("core-js/modules/web.immediate.js");
var _runtime = require("regenerator-runtime/runtime");
// Custom
var _viewJs = require("./views/view.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _modelJs = require("./model.js");
var _loaderJs = require("./helper/loader.js");
var _loaderJsDefault = parcelHelpers.interopDefault(_loaderJs);
var _configJs = require("./config.js");
var _creatNextStepObjectJs = require("./helper/creatNextStepObject.js");
var _creatNextStepObjectJsDefault = parcelHelpers.interopDefault(_creatNextStepObjectJs);
// + Functions +
// Main
const controlMain = function() {
    // Multi instance loop
    $((0, _configJs.FORM_BLOCK_SELECTOR)).each(function(index) {
        // Create state
        const stateData = _modelJs.createState($(this), index);
        // Values
        const { devMode  } = stateData, { elements  } = stateData, { handlers  } = stateData;
        // - Functions -
        // Remove visual dividers
        (0, _viewJsDefault.default).removeVisualDividers(devMode, elements);
        // Initialize buttons
        (0, _viewJsDefault.default).initButtons(stateData);
        // - Create next step object -
        stateData.stepLogic = (0, _creatNextStepObjectJsDefault.default)(elements.$steps);
        // Initialize progress bar
        (0, _viewJsDefault.default).initProgressBar(stateData);
        // Initialize progress bar
        (0, _viewJsDefault.default).initAnchor(stateData);
        // Add step view handlers
        (0, _viewJsDefault.default).addStepViewHandlers(stateData);
        // Dev mode log
        handlers.devModeLog(stateData);
    });
};
// + Initialize +
const init = function() {
    (0, _loaderJsDefault.default)(controlMain);
};
init();

},{"core-js/modules/es.regexp.flags.js":"gSXXb","core-js/modules/web.immediate.js":"49tUX","regenerator-runtime/runtime":"dXNgZ","./views/view.js":"bWlJ9","./model.js":"Y4A21","./helper/loader.js":"iyspg","./config.js":"k5Hzs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./helper/creatNextStepObject.js":"cYr2M"}],"gSXXb":[function(require,module,exports) {
var global = require("c2ac71b1e9895a4c");
var DESCRIPTORS = require("e1b20573b451ef90");
var defineBuiltInAccessor = require("21be03f45557950c");
var regExpFlags = require("2abd130efb15bede");
var fails = require("9c2d9b476fc52d56");
// babel-minify and Closure Compiler transpiles RegExp('.', 'd') -> /./d and it causes SyntaxError
var RegExp = global.RegExp;
var RegExpPrototype = RegExp.prototype;
var FORCED = DESCRIPTORS && fails(function() {
    var INDICES_SUPPORT = true;
    try {
        RegExp(".", "d");
    } catch (error) {
        INDICES_SUPPORT = false;
    }
    var O = {};
    // modern V8 bug
    var calls = "";
    var expected = INDICES_SUPPORT ? "dgimsy" : "gimsy";
    var addGetter = function(key, chr) {
        // eslint-disable-next-line es/no-object-defineproperty -- safe
        Object.defineProperty(O, key, {
            get: function() {
                calls += chr;
                return true;
            }
        });
    };
    var pairs = {
        dotAll: "s",
        global: "g",
        ignoreCase: "i",
        multiline: "m",
        sticky: "y"
    };
    if (INDICES_SUPPORT) pairs.hasIndices = "d";
    for(var key in pairs)addGetter(key, pairs[key]);
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var result = Object.getOwnPropertyDescriptor(RegExpPrototype, "flags").get.call(O);
    return result !== expected || calls !== expected;
});
// `RegExp.prototype.flags` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
if (FORCED) defineBuiltInAccessor(RegExpPrototype, "flags", {
    configurable: true,
    get: regExpFlags
});

},{"c2ac71b1e9895a4c":"i8HOC","e1b20573b451ef90":"92ZIi","21be03f45557950c":"592rH","2abd130efb15bede":"9bz1x","9c2d9b476fc52d56":"hL6D2"}],"i8HOC":[function(require,module,exports) {
var global = arguments[3];
var check = function(it) {
    return it && it.Math == Math && it;
};
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == "object" && self) || check(typeof global == "object" && global) || // eslint-disable-next-line no-new-func -- fallback
function() {
    return this;
}() || Function("return this")();

},{}],"92ZIi":[function(require,module,exports) {
var fails = require("36886925eb6f4ed3");
// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, {
        get: function() {
            return 7;
        }
    })[1] != 7;
});

},{"36886925eb6f4ed3":"hL6D2"}],"hL6D2":[function(require,module,exports) {
module.exports = function(exec) {
    try {
        return !!exec();
    } catch (error) {
        return true;
    }
};

},{}],"592rH":[function(require,module,exports) {
var makeBuiltIn = require("1d9beb75f88c551a");
var defineProperty = require("f8cc9182159e13e3");
module.exports = function(target, name, descriptor) {
    if (descriptor.get) makeBuiltIn(descriptor.get, name, {
        getter: true
    });
    if (descriptor.set) makeBuiltIn(descriptor.set, name, {
        setter: true
    });
    return defineProperty.f(target, name, descriptor);
};

},{"1d9beb75f88c551a":"cTB4k","f8cc9182159e13e3":"iJR4w"}],"cTB4k":[function(require,module,exports) {
var uncurryThis = require("f1161bff7b1364c5");
var fails = require("f1a9fd5c2c4eda6a");
var isCallable = require("5b00d6af0304e7bd");
var hasOwn = require("5df722c3f7b66f02");
var DESCRIPTORS = require("af73dc844184c587");
var CONFIGURABLE_FUNCTION_NAME = require("b4bc790cda3ff662").CONFIGURABLE;
var inspectSource = require("84f27ea96ebc1fb0");
var InternalStateModule = require("550b876a4d506645");
var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis("".slice);
var replace = uncurryThis("".replace);
var join = uncurryThis([].join);
var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function() {
    return defineProperty(function() {}, "length", {
        value: 8
    }).length !== 8;
});
var TEMPLATE = String(String).split("String");
var makeBuiltIn = module.exports = function(value, name, options) {
    if (stringSlice($String(name), 0, 7) === "Symbol(") name = "[" + replace($String(name), /^Symbol\(([^)]*)\)/, "$1") + "]";
    if (options && options.getter) name = "get " + name;
    if (options && options.setter) name = "set " + name;
    if (!hasOwn(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
        if (DESCRIPTORS) defineProperty(value, "name", {
            value: name,
            configurable: true
        });
        else value.name = name;
    }
    if (CONFIGURABLE_LENGTH && options && hasOwn(options, "arity") && value.length !== options.arity) defineProperty(value, "length", {
        value: options.arity
    });
    try {
        if (options && hasOwn(options, "constructor") && options.constructor) {
            if (DESCRIPTORS) defineProperty(value, "prototype", {
                writable: false
            });
        } else if (value.prototype) value.prototype = undefined;
    } catch (error) {}
    var state = enforceInternalState(value);
    if (!hasOwn(state, "source")) state.source = join(TEMPLATE, typeof name == "string" ? name : "");
    return value;
};
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
    return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, "toString");

},{"f1161bff7b1364c5":"7GlkT","f1a9fd5c2c4eda6a":"hL6D2","5b00d6af0304e7bd":"l3Kyn","5df722c3f7b66f02":"gC2Q5","af73dc844184c587":"92ZIi","b4bc790cda3ff662":"l6Kgd","84f27ea96ebc1fb0":"9jh7O","550b876a4d506645":"7AMlF"}],"7GlkT":[function(require,module,exports) {
var NATIVE_BIND = require("5b906b3c34e9daf9");
var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);
module.exports = NATIVE_BIND ? uncurryThisWithBind : function(fn) {
    return function() {
        return call.apply(fn, arguments);
    };
};

},{"5b906b3c34e9daf9":"i16Dq"}],"i16Dq":[function(require,module,exports) {
var fails = require("c7127c9bee8e72d");
module.exports = !fails(function() {
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var test = (function() {}).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != "function" || test.hasOwnProperty("prototype");
});

},{"c7127c9bee8e72d":"hL6D2"}],"l3Kyn":[function(require,module,exports) {
var $documentAll = require("2cdc059d5d9e673c");
var documentAll = $documentAll.all;
// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = $documentAll.IS_HTMLDDA ? function(argument) {
    return typeof argument == "function" || argument === documentAll;
} : function(argument) {
    return typeof argument == "function";
};

},{"2cdc059d5d9e673c":"5MHqB"}],"5MHqB":[function(require,module,exports) {
var documentAll = typeof document == "object" && document.all;
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll == "undefined" && documentAll !== undefined;
module.exports = {
    all: documentAll,
    IS_HTMLDDA: IS_HTMLDDA
};

},{}],"gC2Q5":[function(require,module,exports) {
var uncurryThis = require("cf258ba1e9133285");
var toObject = require("a8c4c4b673624eaa");
var hasOwnProperty = uncurryThis({}.hasOwnProperty);
// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject(it), key);
};

},{"cf258ba1e9133285":"7GlkT","a8c4c4b673624eaa":"5cb35"}],"5cb35":[function(require,module,exports) {
var requireObjectCoercible = require("297adb5ae08ccffd");
var $Object = Object;
// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function(argument) {
    return $Object(requireObjectCoercible(argument));
};

},{"297adb5ae08ccffd":"fOR0B"}],"fOR0B":[function(require,module,exports) {
var isNullOrUndefined = require("7f1508a6d7a18608");
var $TypeError = TypeError;
// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function(it) {
    if (isNullOrUndefined(it)) throw $TypeError("Can't call method on " + it);
    return it;
};

},{"7f1508a6d7a18608":"gM5ar"}],"gM5ar":[function(require,module,exports) {
// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function(it) {
    return it === null || it === undefined;
};

},{}],"l6Kgd":[function(require,module,exports) {
var DESCRIPTORS = require("c9c0029ceb2957b5");
var hasOwn = require("31bdbcebf53c53ef");
var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn(FunctionPrototype, "name");
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() {}).name === "something";
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, "name").configurable);
module.exports = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
};

},{"c9c0029ceb2957b5":"92ZIi","31bdbcebf53c53ef":"gC2Q5"}],"9jh7O":[function(require,module,exports) {
var uncurryThis = require("78492bea197a1e41");
var isCallable = require("4636f835f370852");
var store = require("b56347289da4f3e7");
var functionToString = uncurryThis(Function.toString);
// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) store.inspectSource = function(it) {
    return functionToString(it);
};
module.exports = store.inspectSource;

},{"78492bea197a1e41":"7GlkT","4636f835f370852":"l3Kyn","b56347289da4f3e7":"l4ncH"}],"l4ncH":[function(require,module,exports) {
var global = require("4f304ed85c64e5dc");
var defineGlobalProperty = require("95ec54a47847e2b0");
var SHARED = "__core-js_shared__";
var store = global[SHARED] || defineGlobalProperty(SHARED, {});
module.exports = store;

},{"4f304ed85c64e5dc":"i8HOC","95ec54a47847e2b0":"ggjnO"}],"ggjnO":[function(require,module,exports) {
var global = require("d4cfcb706e06ec43");
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
module.exports = function(key, value) {
    try {
        defineProperty(global, key, {
            value: value,
            configurable: true,
            writable: true
        });
    } catch (error) {
        global[key] = value;
    }
    return value;
};

},{"d4cfcb706e06ec43":"i8HOC"}],"7AMlF":[function(require,module,exports) {
var NATIVE_WEAK_MAP = require("e9b020aece9520a9");
var global = require("255de542e3e159b");
var isObject = require("16cbb66dcf5461f4");
var createNonEnumerableProperty = require("80bacf6344715aba");
var hasOwn = require("236d2ec9960bf90c");
var shared = require("dda5df3ef8277");
var sharedKey = require("7a11d4ed668da1eb");
var hiddenKeys = require("6e713636be2d19e7");
var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;
var enforce = function(it) {
    return has(it) ? get(it) : set(it, {});
};
var getterFor = function(TYPE) {
    return function(it) {
        var state;
        if (!isObject(it) || (state = get(it)).type !== TYPE) throw TypeError("Incompatible receiver, " + TYPE + " required");
        return state;
    };
};
if (NATIVE_WEAK_MAP || shared.state) {
    var store = shared.state || (shared.state = new WeakMap());
    /* eslint-disable no-self-assign -- prototype methods protection */ store.get = store.get;
    store.has = store.has;
    store.set = store.set;
    /* eslint-enable no-self-assign -- prototype methods protection */ set = function(it, metadata) {
        if (store.has(it)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        store.set(it, metadata);
        return metadata;
    };
    get = function(it) {
        return store.get(it) || {};
    };
    has = function(it) {
        return store.has(it);
    };
} else {
    var STATE = sharedKey("state");
    hiddenKeys[STATE] = true;
    set = function(it, metadata) {
        if (hasOwn(it, STATE)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        createNonEnumerableProperty(it, STATE, metadata);
        return metadata;
    };
    get = function(it) {
        return hasOwn(it, STATE) ? it[STATE] : {};
    };
    has = function(it) {
        return hasOwn(it, STATE);
    };
}
module.exports = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
};

},{"e9b020aece9520a9":"2PZTl","255de542e3e159b":"i8HOC","16cbb66dcf5461f4":"Z0pBo","80bacf6344715aba":"8CL42","236d2ec9960bf90c":"gC2Q5","dda5df3ef8277":"l4ncH","7a11d4ed668da1eb":"eAjGz","6e713636be2d19e7":"661m4"}],"2PZTl":[function(require,module,exports) {
var global = require("d401d2e7bdff1b1d");
var isCallable = require("910661b8a6bf5dd8");
var WeakMap = global.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));

},{"d401d2e7bdff1b1d":"i8HOC","910661b8a6bf5dd8":"l3Kyn"}],"Z0pBo":[function(require,module,exports) {
var isCallable = require("1e9ddab158bf95ce");
var $documentAll = require("ae33f06562725d42");
var documentAll = $documentAll.all;
module.exports = $documentAll.IS_HTMLDDA ? function(it) {
    return typeof it == "object" ? it !== null : isCallable(it) || it === documentAll;
} : function(it) {
    return typeof it == "object" ? it !== null : isCallable(it);
};

},{"1e9ddab158bf95ce":"l3Kyn","ae33f06562725d42":"5MHqB"}],"8CL42":[function(require,module,exports) {
var DESCRIPTORS = require("d0b72d2f5bbc8c70");
var definePropertyModule = require("2f991a0f4816b7ca");
var createPropertyDescriptor = require("4d3eb61976c02b3c");
module.exports = DESCRIPTORS ? function(object, key, value) {
    return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function(object, key, value) {
    object[key] = value;
    return object;
};

},{"d0b72d2f5bbc8c70":"92ZIi","2f991a0f4816b7ca":"iJR4w","4d3eb61976c02b3c":"1lpav"}],"iJR4w":[function(require,module,exports) {
var DESCRIPTORS = require("bf3629e3dbca932e");
var IE8_DOM_DEFINE = require("5d4305105fef505b");
var V8_PROTOTYPE_DEFINE_BUG = require("572dd259f2dbd7d6");
var anObject = require("a1c688a8cb119653");
var toPropertyKey = require("2a4dfa8ba7e053b0");
var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = "enumerable";
var CONFIGURABLE = "configurable";
var WRITABLE = "writable";
// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);
    if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
        var current = $getOwnPropertyDescriptor(O, P);
        if (current && current[WRITABLE]) {
            O[P] = Attributes.value;
            Attributes = {
                configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
                enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
                writable: false
            };
        }
    }
    return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey(P);
    anObject(Attributes);
    if (IE8_DOM_DEFINE) try {
        return $defineProperty(O, P, Attributes);
    } catch (error) {}
    if ("get" in Attributes || "set" in Attributes) throw $TypeError("Accessors not supported");
    if ("value" in Attributes) O[P] = Attributes.value;
    return O;
};

},{"bf3629e3dbca932e":"92ZIi","5d4305105fef505b":"qS9uN","572dd259f2dbd7d6":"ka1Un","a1c688a8cb119653":"4isCr","2a4dfa8ba7e053b0":"5XWKd"}],"qS9uN":[function(require,module,exports) {
var DESCRIPTORS = require("8205046013be31cc");
var fails = require("7ed34d99efa64d70");
var createElement = require("a92860b85fc0745b");
// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement("div"), "a", {
        get: function() {
            return 7;
        }
    }).a != 7;
});

},{"8205046013be31cc":"92ZIi","7ed34d99efa64d70":"hL6D2","a92860b85fc0745b":"4bOHl"}],"4bOHl":[function(require,module,exports) {
var global = require("4b7b9400b0234aef");
var isObject = require("515dbca6d5564388");
var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);
module.exports = function(it) {
    return EXISTS ? document.createElement(it) : {};
};

},{"4b7b9400b0234aef":"i8HOC","515dbca6d5564388":"Z0pBo"}],"ka1Un":[function(require,module,exports) {
var DESCRIPTORS = require("496308a37d39dc56");
var fails = require("2090742dce06d93e");
// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function() {}, "prototype", {
        value: 42,
        writable: false
    }).prototype != 42;
});

},{"496308a37d39dc56":"92ZIi","2090742dce06d93e":"hL6D2"}],"4isCr":[function(require,module,exports) {
var isObject = require("6e67b59453532b41");
var $String = String;
var $TypeError = TypeError;
// `Assert: Type(argument) is Object`
module.exports = function(argument) {
    if (isObject(argument)) return argument;
    throw $TypeError($String(argument) + " is not an object");
};

},{"6e67b59453532b41":"Z0pBo"}],"5XWKd":[function(require,module,exports) {
var toPrimitive = require("5936b35cb58f7050");
var isSymbol = require("78c8b6d086445742");
// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function(argument) {
    var key = toPrimitive(argument, "string");
    return isSymbol(key) ? key : key + "";
};

},{"5936b35cb58f7050":"a2mK1","78c8b6d086445742":"4aV4F"}],"a2mK1":[function(require,module,exports) {
var call = require("89fdf5ee81edfc9d");
var isObject = require("99a9c66e4eb8f2ac");
var isSymbol = require("ab7a86accdd23523");
var getMethod = require("58591b7fd8382c20");
var ordinaryToPrimitive = require("ed59cb0245e1486c");
var wellKnownSymbol = require("cc20b1e2090f3d04");
var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function(input, pref) {
    if (!isObject(input) || isSymbol(input)) return input;
    var exoticToPrim = getMethod(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
        if (pref === undefined) pref = "default";
        result = call(exoticToPrim, input, pref);
        if (!isObject(result) || isSymbol(result)) return result;
        throw $TypeError("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = "number";
    return ordinaryToPrimitive(input, pref);
};

},{"89fdf5ee81edfc9d":"d7JlP","99a9c66e4eb8f2ac":"Z0pBo","ab7a86accdd23523":"4aV4F","58591b7fd8382c20":"9Zfiw","ed59cb0245e1486c":"7MME2","cc20b1e2090f3d04":"gTwyA"}],"d7JlP":[function(require,module,exports) {
var NATIVE_BIND = require("9aabd5f16a5c7332");
var call = Function.prototype.call;
module.exports = NATIVE_BIND ? call.bind(call) : function() {
    return call.apply(call, arguments);
};

},{"9aabd5f16a5c7332":"i16Dq"}],"4aV4F":[function(require,module,exports) {
var getBuiltIn = require("236735427648ae4e");
var isCallable = require("2d19883e05475a1f");
var isPrototypeOf = require("7899c3b7d5c14e15");
var USE_SYMBOL_AS_UID = require("d28dc454fb6abf6f");
var $Object = Object;
module.exports = USE_SYMBOL_AS_UID ? function(it) {
    return typeof it == "symbol";
} : function(it) {
    var $Symbol = getBuiltIn("Symbol");
    return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};

},{"236735427648ae4e":"6ZUSY","2d19883e05475a1f":"l3Kyn","7899c3b7d5c14e15":"3jtKQ","d28dc454fb6abf6f":"2Ye8Q"}],"6ZUSY":[function(require,module,exports) {
var global = require("4df49c53a9ae2cc");
var isCallable = require("f514b21982b01a64");
var aFunction = function(argument) {
    return isCallable(argument) ? argument : undefined;
};
module.exports = function(namespace, method) {
    return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};

},{"4df49c53a9ae2cc":"i8HOC","f514b21982b01a64":"l3Kyn"}],"3jtKQ":[function(require,module,exports) {
var uncurryThis = require("b05d42b1f9de1c63");
module.exports = uncurryThis({}.isPrototypeOf);

},{"b05d42b1f9de1c63":"7GlkT"}],"2Ye8Q":[function(require,module,exports) {
/* eslint-disable es/no-symbol -- required for testing */ var NATIVE_SYMBOL = require("462c089b49b3da01");
module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";

},{"462c089b49b3da01":"8KyTD"}],"8KyTD":[function(require,module,exports) {
/* eslint-disable es/no-symbol -- required for testing */ var V8_VERSION = require("47c4be53abaf5668");
var fails = require("ce6bbc17d976f850");
// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function() {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

},{"47c4be53abaf5668":"bjFlO","ce6bbc17d976f850":"hL6D2"}],"bjFlO":[function(require,module,exports) {
var global = require("e3cf965fc4309b6f");
var userAgent = require("ddfd8d98c5c70fda");
var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;
if (v8) {
    match = v8.split(".");
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}
// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
        match = userAgent.match(/Chrome\/(\d+)/);
        if (match) version = +match[1];
    }
}
module.exports = version;

},{"e3cf965fc4309b6f":"i8HOC","ddfd8d98c5c70fda":"73xBt"}],"73xBt":[function(require,module,exports) {
module.exports = typeof navigator != "undefined" && String(navigator.userAgent) || "";

},{}],"9Zfiw":[function(require,module,exports) {
var aCallable = require("95fa51a5645c41ff");
var isNullOrUndefined = require("2bf1fdce248d2463");
// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function(V, P) {
    var func = V[P];
    return isNullOrUndefined(func) ? undefined : aCallable(func);
};

},{"95fa51a5645c41ff":"gOMir","2bf1fdce248d2463":"gM5ar"}],"gOMir":[function(require,module,exports) {
var isCallable = require("5a7a97f506ef1cae");
var tryToString = require("7086b57d862dafa6");
var $TypeError = TypeError;
// `Assert: IsCallable(argument) is true`
module.exports = function(argument) {
    if (isCallable(argument)) return argument;
    throw $TypeError(tryToString(argument) + " is not a function");
};

},{"5a7a97f506ef1cae":"l3Kyn","7086b57d862dafa6":"4O7d7"}],"4O7d7":[function(require,module,exports) {
var $String = String;
module.exports = function(argument) {
    try {
        return $String(argument);
    } catch (error) {
        return "Object";
    }
};

},{}],"7MME2":[function(require,module,exports) {
var call = require("21cfa619c0d02e90");
var isCallable = require("e1f831cee92ee191");
var isObject = require("ff9902452be32f18");
var $TypeError = TypeError;
// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function(input, pref) {
    var fn, val;
    if (pref === "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
    if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
    if (pref !== "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
    throw $TypeError("Can't convert object to primitive value");
};

},{"21cfa619c0d02e90":"d7JlP","e1f831cee92ee191":"l3Kyn","ff9902452be32f18":"Z0pBo"}],"gTwyA":[function(require,module,exports) {
var global = require("bc2d919b23d925fb");
var shared = require("bd97bcb05efb6b2a");
var hasOwn = require("e5dea2ec6b01dc86");
var uid = require("6d4f85d6b5b4bc94");
var NATIVE_SYMBOL = require("35eb1c61b3d8bf6");
var USE_SYMBOL_AS_UID = require("909cfc2ddbe54a84");
var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared("wks");
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol["for"] || Symbol : Symbol && Symbol.withoutSetter || uid;
module.exports = function(name) {
    if (!hasOwn(WellKnownSymbolsStore, name)) WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name) ? Symbol[name] : createWellKnownSymbol("Symbol." + name);
    return WellKnownSymbolsStore[name];
};

},{"bc2d919b23d925fb":"i8HOC","bd97bcb05efb6b2a":"i1mHK","e5dea2ec6b01dc86":"gC2Q5","6d4f85d6b5b4bc94":"a3SEE","35eb1c61b3d8bf6":"8KyTD","909cfc2ddbe54a84":"2Ye8Q"}],"i1mHK":[function(require,module,exports) {
var IS_PURE = require("951e1a08b915cfac");
var store = require("64a12b8ccdc41d57");
(module.exports = function(key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
})("versions", []).push({
    version: "3.29.0",
    mode: IS_PURE ? "pure" : "global",
    copyright: "\xa9 2014-2023 Denis Pushkarev (zloirock.ru)",
    license: "https://github.com/zloirock/core-js/blob/v3.29.0/LICENSE",
    source: "https://github.com/zloirock/core-js"
});

},{"951e1a08b915cfac":"5ZsyC","64a12b8ccdc41d57":"l4ncH"}],"5ZsyC":[function(require,module,exports) {
module.exports = false;

},{}],"a3SEE":[function(require,module,exports) {
var uncurryThis = require("1ec5c591711716f4");
var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);
module.exports = function(key) {
    return "Symbol(" + (key === undefined ? "" : key) + ")_" + toString(++id + postfix, 36);
};

},{"1ec5c591711716f4":"7GlkT"}],"1lpav":[function(require,module,exports) {
module.exports = function(bitmap, value) {
    return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
    };
};

},{}],"eAjGz":[function(require,module,exports) {
var shared = require("7d83b149af087579");
var uid = require("88dd0d6e5df49830");
var keys = shared("keys");
module.exports = function(key) {
    return keys[key] || (keys[key] = uid(key));
};

},{"7d83b149af087579":"i1mHK","88dd0d6e5df49830":"a3SEE"}],"661m4":[function(require,module,exports) {
module.exports = {};

},{}],"9bz1x":[function(require,module,exports) {
"use strict";
var anObject = require("b3ce076c6c822525");
// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function() {
    var that = anObject(this);
    var result = "";
    if (that.hasIndices) result += "d";
    if (that.global) result += "g";
    if (that.ignoreCase) result += "i";
    if (that.multiline) result += "m";
    if (that.dotAll) result += "s";
    if (that.unicode) result += "u";
    if (that.unicodeSets) result += "v";
    if (that.sticky) result += "y";
    return result;
};

},{"b3ce076c6c822525":"4isCr"}],"49tUX":[function(require,module,exports) {
// TODO: Remove this module from `core-js@4` since it's split to modules listed below
require("155f6fd6fc562850");
require("15ddebf5cbdc4660");

},{"155f6fd6fc562850":"fOGFr","15ddebf5cbdc4660":"l7FDS"}],"fOGFr":[function(require,module,exports) {
var $ = require("8b3c40fbf1a8b0ed");
var global = require("c43c74933a407ad8");
var clearImmediate = require("dc07e87ccd3a2253").clear;
// `clearImmediate` method
// http://w3c.github.io/setImmediate/#si-clearImmediate
$({
    global: true,
    bind: true,
    enumerable: true,
    forced: global.clearImmediate !== clearImmediate
}, {
    clearImmediate: clearImmediate
});

},{"8b3c40fbf1a8b0ed":"dIGt4","c43c74933a407ad8":"i8HOC","dc07e87ccd3a2253":"7jDg7"}],"dIGt4":[function(require,module,exports) {
var global = require("2d361e68bc196328");
var getOwnPropertyDescriptor = require("a456f0180637dc07").f;
var createNonEnumerableProperty = require("1da295b476420dd");
var defineBuiltIn = require("82df8237eeb9059b");
var defineGlobalProperty = require("ad0dd8583d2a6078");
var copyConstructorProperties = require("91843d5217dc56dc");
var isForced = require("54c81064c16a2956");
/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/ module.exports = function(options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) target = global;
    else if (STATIC) target = global[TARGET] || defineGlobalProperty(TARGET, {});
    else target = (global[TARGET] || {}).prototype;
    if (target) for(key in source){
        sourceProperty = source[key];
        if (options.dontCallGetSet) {
            descriptor = getOwnPropertyDescriptor(target, key);
            targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
        // contained in target
        if (!FORCED && targetProperty !== undefined) {
            if (typeof sourceProperty == typeof targetProperty) continue;
            copyConstructorProperties(sourceProperty, targetProperty);
        }
        // add a flag to not completely full polyfills
        if (options.sham || targetProperty && targetProperty.sham) createNonEnumerableProperty(sourceProperty, "sham", true);
        defineBuiltIn(target, key, sourceProperty, options);
    }
};

},{"2d361e68bc196328":"i8HOC","a456f0180637dc07":"lk5NI","1da295b476420dd":"8CL42","82df8237eeb9059b":"6XwEX","ad0dd8583d2a6078":"ggjnO","91843d5217dc56dc":"9Z12i","54c81064c16a2956":"6uTCZ"}],"lk5NI":[function(require,module,exports) {
var DESCRIPTORS = require("d63b042f68412c46");
var call = require("c948a37420b3822b");
var propertyIsEnumerableModule = require("2d5cd0f785ee00dd");
var createPropertyDescriptor = require("f401061a64d09ac8");
var toIndexedObject = require("49df394a6a376549");
var toPropertyKey = require("aed85c2a83e55bc1");
var hasOwn = require("ecaae307606230b");
var IE8_DOM_DEFINE = require("547b545637a306c9");
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPropertyKey(P);
    if (IE8_DOM_DEFINE) try {
        return $getOwnPropertyDescriptor(O, P);
    } catch (error) {}
    if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

},{"d63b042f68412c46":"92ZIi","c948a37420b3822b":"d7JlP","2d5cd0f785ee00dd":"7SuiS","f401061a64d09ac8":"1lpav","49df394a6a376549":"jLWwQ","aed85c2a83e55bc1":"5XWKd","ecaae307606230b":"gC2Q5","547b545637a306c9":"qS9uN"}],"7SuiS":[function(require,module,exports) {
"use strict";
var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
    1: 2
}, 1);
// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

},{}],"jLWwQ":[function(require,module,exports) {
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require("194222834fd3ab31");
var requireObjectCoercible = require("97d55064be90f448");
module.exports = function(it) {
    return IndexedObject(requireObjectCoercible(it));
};

},{"194222834fd3ab31":"kPk5h","97d55064be90f448":"fOR0B"}],"kPk5h":[function(require,module,exports) {
var uncurryThis = require("8d2aa80bf2cd84cf");
var fails = require("6f0b049f68fa06ae");
var classof = require("e1fdc1d7b69c0439");
var $Object = Object;
var split = uncurryThis("".split);
// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function() {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object("z").propertyIsEnumerable(0);
}) ? function(it) {
    return classof(it) == "String" ? split(it, "") : $Object(it);
} : $Object;

},{"8d2aa80bf2cd84cf":"7GlkT","6f0b049f68fa06ae":"hL6D2","e1fdc1d7b69c0439":"bdfmm"}],"bdfmm":[function(require,module,exports) {
var uncurryThis = require("1eea47d12fdd1b2a");
var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis("".slice);
module.exports = function(it) {
    return stringSlice(toString(it), 8, -1);
};

},{"1eea47d12fdd1b2a":"7GlkT"}],"6XwEX":[function(require,module,exports) {
var isCallable = require("e80bc8aa5aa4971e");
var definePropertyModule = require("da51de1dd34dc420");
var makeBuiltIn = require("111c8c6921b7ebe5");
var defineGlobalProperty = require("9d78caea96008b09");
module.exports = function(O, key, value, options) {
    if (!options) options = {};
    var simple = options.enumerable;
    var name = options.name !== undefined ? options.name : key;
    if (isCallable(value)) makeBuiltIn(value, name, options);
    if (options.global) {
        if (simple) O[key] = value;
        else defineGlobalProperty(key, value);
    } else {
        try {
            if (!options.unsafe) delete O[key];
            else if (O[key]) simple = true;
        } catch (error) {}
        if (simple) O[key] = value;
        else definePropertyModule.f(O, key, {
            value: value,
            enumerable: false,
            configurable: !options.nonConfigurable,
            writable: !options.nonWritable
        });
    }
    return O;
};

},{"e80bc8aa5aa4971e":"l3Kyn","da51de1dd34dc420":"iJR4w","111c8c6921b7ebe5":"cTB4k","9d78caea96008b09":"ggjnO"}],"9Z12i":[function(require,module,exports) {
var hasOwn = require("f660e70e95e953ef");
var ownKeys = require("6e4caa64a6d253e1");
var getOwnPropertyDescriptorModule = require("a3e89ff573b99812");
var definePropertyModule = require("11dc50bcfe6944c7");
module.exports = function(target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for(var i = 0; i < keys.length; i++){
        var key = keys[i];
        if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
};

},{"f660e70e95e953ef":"gC2Q5","6e4caa64a6d253e1":"1CX1A","a3e89ff573b99812":"lk5NI","11dc50bcfe6944c7":"iJR4w"}],"1CX1A":[function(require,module,exports) {
var getBuiltIn = require("da33a386066093ab");
var uncurryThis = require("1f9c58f4206a488f");
var getOwnPropertyNamesModule = require("fb0d419499c8509c");
var getOwnPropertySymbolsModule = require("7b7a6d046287766b");
var anObject = require("2cc67ec1d0f8124c");
var concat = uncurryThis([].concat);
// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn("Reflect", "ownKeys") || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

},{"da33a386066093ab":"6ZUSY","1f9c58f4206a488f":"7GlkT","fb0d419499c8509c":"fjY04","7b7a6d046287766b":"4DWO3","2cc67ec1d0f8124c":"4isCr"}],"fjY04":[function(require,module,exports) {
var internalObjectKeys = require("dfc42b83221589b");
var enumBugKeys = require("52dd5f881dff550e");
var hiddenKeys = enumBugKeys.concat("length", "prototype");
// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys);
};

},{"dfc42b83221589b":"hl5T1","52dd5f881dff550e":"9RnJm"}],"hl5T1":[function(require,module,exports) {
var uncurryThis = require("936fb36d320048e4");
var hasOwn = require("418873a32d44a852");
var toIndexedObject = require("fe3c84d30693e23e");
var indexOf = require("3e3f17dd9481c144").indexOf;
var hiddenKeys = require("1e4b95ef61e6bcd5");
var push = uncurryThis([].push);
module.exports = function(object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for(key in O)!hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
    // Don't enum bug & hidden keys
    while(names.length > i)if (hasOwn(O, key = names[i++])) ~indexOf(result, key) || push(result, key);
    return result;
};

},{"936fb36d320048e4":"7GlkT","418873a32d44a852":"gC2Q5","fe3c84d30693e23e":"jLWwQ","3e3f17dd9481c144":"n5IsC","1e4b95ef61e6bcd5":"661m4"}],"n5IsC":[function(require,module,exports) {
var toIndexedObject = require("e583c312172bbcf2");
var toAbsoluteIndex = require("ed94e62cd49edcb8");
var lengthOfArrayLike = require("6159ea922198d62b");
// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function(IS_INCLUDES) {
    return function($this, el, fromIndex) {
        var O = toIndexedObject($this);
        var length = lengthOfArrayLike(O);
        var index = toAbsoluteIndex(fromIndex, length);
        var value;
        // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare -- NaN check
        if (IS_INCLUDES && el != el) while(length > index){
            value = O[index++];
            // eslint-disable-next-line no-self-compare -- NaN check
            if (value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
        }
        else for(; length > index; index++){
            if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
        }
        return !IS_INCLUDES && -1;
    };
};
module.exports = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
};

},{"e583c312172bbcf2":"jLWwQ","ed94e62cd49edcb8":"5yh27","6159ea922198d62b":"lY4mS"}],"5yh27":[function(require,module,exports) {
var toIntegerOrInfinity = require("3f490eb5246643b0");
var max = Math.max;
var min = Math.min;
// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function(index, length) {
    var integer = toIntegerOrInfinity(index);
    return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"3f490eb5246643b0":"kLXGe"}],"kLXGe":[function(require,module,exports) {
var trunc = require("39f01eb7c56a47a");
// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function(argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number || number === 0 ? 0 : trunc(number);
};

},{"39f01eb7c56a47a":"7O8gb"}],"7O8gb":[function(require,module,exports) {
var ceil = Math.ceil;
var floor = Math.floor;
// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
    var n = +x;
    return (n > 0 ? floor : ceil)(n);
};

},{}],"lY4mS":[function(require,module,exports) {
var toLength = require("388217bc5300008b");
// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function(obj) {
    return toLength(obj.length);
};

},{"388217bc5300008b":"fU04N"}],"fU04N":[function(require,module,exports) {
var toIntegerOrInfinity = require("d017c1726c914dd9");
var min = Math.min;
// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function(argument) {
    return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"d017c1726c914dd9":"kLXGe"}],"9RnJm":[function(require,module,exports) {
// IE8- don't enum bug keys
module.exports = [
    "constructor",
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "toLocaleString",
    "toString",
    "valueOf"
];

},{}],"4DWO3":[function(require,module,exports) {
// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

},{}],"6uTCZ":[function(require,module,exports) {
var fails = require("565889e50948dbff");
var isCallable = require("2271fc759f949278");
var replacement = /#|\.prototype\./;
var isForced = function(feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
};
var normalize = isForced.normalize = function(string) {
    return String(string).replace(replacement, ".").toLowerCase();
};
var data = isForced.data = {};
var NATIVE = isForced.NATIVE = "N";
var POLYFILL = isForced.POLYFILL = "P";
module.exports = isForced;

},{"565889e50948dbff":"hL6D2","2271fc759f949278":"l3Kyn"}],"7jDg7":[function(require,module,exports) {
var global = require("30893b3e727fb363");
var apply = require("41593d8f0c91d0fd");
var bind = require("5699edc4959878d5");
var isCallable = require("c051fee8ef8e0a84");
var hasOwn = require("e73f40a160dedfbd");
var fails = require("bc15dff82e89f107");
var html = require("13f99e73f55ca104");
var arraySlice = require("b6dc57b24eb47b49");
var createElement = require("a678782b1a3bf570");
var validateArgumentsLength = require("b03e4e2a783966bc");
var IS_IOS = require("3143aa8994408568");
var IS_NODE = require("9693406cd4875180");
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var Dispatch = global.Dispatch;
var Function = global.Function;
var MessageChannel = global.MessageChannel;
var String = global.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = "onreadystatechange";
var $location, defer, channel, port;
fails(function() {
    // Deno throws a ReferenceError on `location` access without `--location` flag
    $location = global.location;
});
var run = function(id) {
    if (hasOwn(queue, id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
    }
};
var runner = function(id) {
    return function() {
        run(id);
    };
};
var eventListener = function(event) {
    run(event.data);
};
var globalPostMessageDefer = function(id) {
    // old engines have not location.origin
    global.postMessage(String(id), $location.protocol + "//" + $location.host);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
    set = function setImmediate(handler) {
        validateArgumentsLength(arguments.length, 1);
        var fn = isCallable(handler) ? handler : Function(handler);
        var args = arraySlice(arguments, 1);
        queue[++counter] = function() {
            apply(fn, undefined, args);
        };
        defer(counter);
        return counter;
    };
    clear = function clearImmediate(id) {
        delete queue[id];
    };
    // Node.js 0.8-
    if (IS_NODE) defer = function(id) {
        process.nextTick(runner(id));
    };
    else if (Dispatch && Dispatch.now) defer = function(id) {
        Dispatch.now(runner(id));
    };
    else if (MessageChannel && !IS_IOS) {
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = eventListener;
        defer = bind(port.postMessage, port);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (global.addEventListener && isCallable(global.postMessage) && !global.importScripts && $location && $location.protocol !== "file:" && !fails(globalPostMessageDefer)) {
        defer = globalPostMessageDefer;
        global.addEventListener("message", eventListener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in createElement("script")) defer = function(id) {
        html.appendChild(createElement("script"))[ONREADYSTATECHANGE] = function() {
            html.removeChild(this);
            run(id);
        };
    };
    else defer = function(id) {
        setTimeout(runner(id), 0);
    };
}
module.exports = {
    set: set,
    clear: clear
};

},{"30893b3e727fb363":"i8HOC","41593d8f0c91d0fd":"148ka","5699edc4959878d5":"7vpmS","c051fee8ef8e0a84":"l3Kyn","e73f40a160dedfbd":"gC2Q5","bc15dff82e89f107":"hL6D2","13f99e73f55ca104":"2pze4","b6dc57b24eb47b49":"RsFXo","a678782b1a3bf570":"4bOHl","b03e4e2a783966bc":"b9O3D","3143aa8994408568":"bzGah","9693406cd4875180":"2Jcp4"}],"148ka":[function(require,module,exports) {
var NATIVE_BIND = require("c15b71577cb391cf");
var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;
// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == "object" && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function() {
    return call.apply(apply, arguments);
});

},{"c15b71577cb391cf":"i16Dq"}],"7vpmS":[function(require,module,exports) {
var uncurryThis = require("90d3f605a7d16728");
var aCallable = require("5724bd92e383b95");
var NATIVE_BIND = require("8c10a421eb77c2db");
var bind = uncurryThis(uncurryThis.bind);
// optional / simple context binding
module.exports = function(fn, that) {
    aCallable(fn);
    return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function() {
        return fn.apply(that, arguments);
    };
};

},{"90d3f605a7d16728":"5Hioa","5724bd92e383b95":"gOMir","8c10a421eb77c2db":"i16Dq"}],"5Hioa":[function(require,module,exports) {
var classofRaw = require("7b8210665650ba6");
var uncurryThis = require("b69b288e1e5d66c5");
module.exports = function(fn) {
    // Nashorn bug:
    //   https://github.com/zloirock/core-js/issues/1128
    //   https://github.com/zloirock/core-js/issues/1130
    if (classofRaw(fn) === "Function") return uncurryThis(fn);
};

},{"7b8210665650ba6":"bdfmm","b69b288e1e5d66c5":"7GlkT"}],"2pze4":[function(require,module,exports) {
var getBuiltIn = require("8f4f6eff907565c1");
module.exports = getBuiltIn("document", "documentElement");

},{"8f4f6eff907565c1":"6ZUSY"}],"RsFXo":[function(require,module,exports) {
var uncurryThis = require("930fabb68f859a8a");
module.exports = uncurryThis([].slice);

},{"930fabb68f859a8a":"7GlkT"}],"b9O3D":[function(require,module,exports) {
var $TypeError = TypeError;
module.exports = function(passed, required) {
    if (passed < required) throw $TypeError("Not enough arguments");
    return passed;
};

},{}],"bzGah":[function(require,module,exports) {
var userAgent = require("57a32cb5136f9ef2");
// eslint-disable-next-line redos/no-vulnerable -- safe
module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);

},{"57a32cb5136f9ef2":"73xBt"}],"2Jcp4":[function(require,module,exports) {
var process = require("45aec2adcca04e91");
var classof = require("e06d8181d5aee80f");
module.exports = typeof process != "undefined" && classof(process) == "process";

},{"45aec2adcca04e91":"d5jf4","e06d8181d5aee80f":"bdfmm"}],"d5jf4":[function(require,module,exports) {
// shim for using process in browser
var process = module.exports = {};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
}
(function() {
    try {
        if (typeof setTimeout === "function") cachedSetTimeout = setTimeout;
        else cachedSetTimeout = defaultSetTimout;
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === "function") cachedClearTimeout = clearTimeout;
        else cachedClearTimeout = defaultClearTimeout;
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) //normal enviroments in sane situations
    return setTimeout(fun, 0);
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) //normal enviroments in sane situations
    return clearTimeout(marker);
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
    if (!draining || !currentQueue) return;
    draining = false;
    if (currentQueue.length) queue = currentQueue.concat(queue);
    else queueIndex = -1;
    if (queue.length) drainQueue();
}
function drainQueue() {
    if (draining) return;
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while(len){
        currentQueue = queue;
        queue = [];
        while(++queueIndex < len)if (currentQueue) currentQueue[queueIndex].run();
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) for(var i = 1; i < arguments.length; i++)args[i - 1] = arguments[i];
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) runTimeout(drainQueue);
};
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function() {
    this.fun.apply(null, this.array);
};
process.title = "browser";
process.browser = true;
process.env = {};
process.argv = [];
process.version = ""; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function(name) {
    return [];
};
process.binding = function(name) {
    throw new Error("process.binding is not supported");
};
process.cwd = function() {
    return "/";
};
process.chdir = function(dir) {
    throw new Error("process.chdir is not supported");
};
process.umask = function() {
    return 0;
};

},{}],"l7FDS":[function(require,module,exports) {
var $ = require("ec05fdda27e62b88");
var global = require("afa9984d947ef517");
var setTask = require("133831b60199ac68").set;
var schedulersFix = require("cfd901ac4a578a5c");
// https://github.com/oven-sh/bun/issues/1633
var setImmediate = global.setImmediate ? schedulersFix(setTask, false) : setTask;
// `setImmediate` method
// http://w3c.github.io/setImmediate/#si-setImmediate
$({
    global: true,
    bind: true,
    enumerable: true,
    forced: global.setImmediate !== setImmediate
}, {
    setImmediate: setImmediate
});

},{"ec05fdda27e62b88":"dIGt4","afa9984d947ef517":"i8HOC","133831b60199ac68":"7jDg7","cfd901ac4a578a5c":"cAPb6"}],"cAPb6":[function(require,module,exports) {
"use strict";
var global = require("6f9ff02aeef95856");
var apply = require("c46df52e5de60b80");
var isCallable = require("14eaf8ca0384b9bf");
var ENGINE_IS_BUN = require("a09819e4b02c222e");
var USER_AGENT = require("14e189365a76463e");
var arraySlice = require("11eef772a169af8f");
var validateArgumentsLength = require("a3204f970fbb6dd9");
var Function = global.Function;
// dirty IE9- and Bun 0.3.0- checks
var WRAP = /MSIE .\./.test(USER_AGENT) || ENGINE_IS_BUN && function() {
    var version = global.Bun.version.split(".");
    return version.length < 3 || version[0] == 0 && (version[1] < 3 || version[1] == 3 && version[2] == 0);
}();
// IE9- / Bun 0.3.0- setTimeout / setInterval / setImmediate additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
// https://github.com/oven-sh/bun/issues/1633
module.exports = function(scheduler, hasTimeArg) {
    var firstParamIndex = hasTimeArg ? 2 : 1;
    return WRAP ? function(handler, timeout /* , ...arguments */ ) {
        var boundArgs = validateArgumentsLength(arguments.length, 1) > firstParamIndex;
        var fn = isCallable(handler) ? handler : Function(handler);
        var params = boundArgs ? arraySlice(arguments, firstParamIndex) : [];
        var callback = boundArgs ? function() {
            apply(fn, this, params);
        } : fn;
        return hasTimeArg ? scheduler(callback, timeout) : scheduler(callback);
    } : scheduler;
};

},{"6f9ff02aeef95856":"i8HOC","c46df52e5de60b80":"148ka","14eaf8ca0384b9bf":"l3Kyn","a09819e4b02c222e":"2BA6V","14e189365a76463e":"73xBt","11eef772a169af8f":"RsFXo","a3204f970fbb6dd9":"b9O3D"}],"2BA6V":[function(require,module,exports) {
/* global Bun -- Deno case */ module.exports = typeof Bun == "function" && Bun && typeof Bun.version == "string";

},{}],"dXNgZ":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var runtime = function(exports) {
    "use strict";
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    };
    var undefined; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
        return obj[key];
    }
    try {
        // IE 8 has a broken Object.defineProperty that only works on DOM objects.
        define({}, "");
    } catch (err) {
        define = function(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);
        // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.
        defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        });
        return generator;
    }
    exports.wrap = wrap;
    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};
    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: true
    });
    defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: true
    });
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    exports.isGeneratorFunction = function(genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function(genFun) {
        if (Object.setPrototypeOf) Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            define(genFun, toStringTagSymbol, "GeneratorFunction");
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
    };
    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
        return {
            __await: arg
        };
    };
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if (record.type === "throw") reject(record.arg);
            else {
                var result = record.arg;
                var value = result.value;
                if (value && typeof value === "object" && hasOwn.call(value, "__await")) return PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                });
                return PromiseImpl.resolve(value).then(function(unwrapped) {
                    // When a yielded Promise is resolved, its final value becomes
                    // the .value of the Promise<{value,done}> result for the
                    // current iteration.
                    result.value = unwrapped;
                    resolve(result);
                }, function(error) {
                    // If a rejected Promise was yielded, throw the rejection back
                    // into the async generator function so it can be handled there.
                    return invoke("throw", error, resolve, reject);
                });
            }
        }
        var previousPromise;
        function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
                return new PromiseImpl(function(resolve, reject) {
                    invoke(method, arg, resolve, reject);
                });
            }
            return previousPromise = // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
        // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).
        defineProperty(this, "_invoke", {
            value: enqueue
        });
    }
    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    });
    exports.AsyncIterator = AsyncIterator;
    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
         : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    };
    function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
            if (state === GenStateExecuting) throw new Error("Generator is already running");
            if (state === GenStateCompleted) {
                if (method === "throw") throw arg;
                // Be forgiving, per 25.3.3.3.3 of the spec:
                // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                return doneResult();
            }
            context.method = method;
            context.arg = arg;
            while(true){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if (context.method === "next") // Setting context._sent for legacy support of Babel's
                // function.sent implementation.
                context.sent = context._sent = context.arg;
                else if (context.method === "throw") {
                    if (state === GenStateSuspendedStart) {
                        state = GenStateCompleted;
                        throw context.arg;
                    }
                    context.dispatchException(context.arg);
                } else if (context.method === "return") context.abrupt("return", context.arg);
                state = GenStateExecuting;
                var record = tryCatch(innerFn, self, context);
                if (record.type === "normal") {
                    // If an exception is thrown from innerFn, we leave state ===
                    // GenStateExecuting and loop back for another invocation.
                    state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                    if (record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                } else if (record.type === "throw") {
                    state = GenStateCompleted;
                    // Dispatch the exception by looping back around to the
                    // context.dispatchException(context.arg) call above.
                    context.method = "throw";
                    context.arg = record.arg;
                }
            }
        };
    }
    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method;
        var method = delegate.iterator[methodName];
        if (method === undefined) {
            // A .throw or .return when the delegate iterator has no .throw
            // method, or a missing .next mehtod, always terminate the
            // yield* loop.
            context.delegate = null;
            // Note: ["return"] must be used for ES3 parsing compatibility.
            if (methodName === "throw" && delegate.iterator["return"]) {
                // If the delegate iterator has a return method, give it a
                // chance to clean up.
                context.method = "return";
                context.arg = undefined;
                maybeInvokeDelegate(delegate, context);
                if (context.method === "throw") // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
            }
            if (methodName !== "return") {
                context.method = "throw";
                context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method");
            }
            return ContinueSentinel;
        }
        var record = tryCatch(method, delegate.iterator, context.arg);
        if (record.type === "throw") {
            context.method = "throw";
            context.arg = record.arg;
            context.delegate = null;
            return ContinueSentinel;
        }
        var info = record.arg;
        if (!info) {
            context.method = "throw";
            context.arg = new TypeError("iterator result is not an object");
            context.delegate = null;
            return ContinueSentinel;
        }
        if (info.done) {
            // Assign the result of the finished delegate to the temporary
            // variable specified by delegate.resultName (see delegateYield).
            context[delegate.resultName] = info.value;
            // Resume execution at the desired location (see delegateYield).
            context.next = delegate.nextLoc;
            // If context.method was "throw" but the delegate handled the
            // exception, let the outer generator proceed normally. If
            // context.method was "next", forget context.arg since it has been
            // "consumed" by the delegate iterator. If context.method was
            // "return", allow the original .return call to continue in the
            // outer generator.
            if (context.method !== "return") {
                context.method = "next";
                context.arg = undefined;
            }
        } else // Re-yield the result returned by the delegate method.
        return info;
        // The delegate iterator is finished, so forget it and continue with
        // the outer generator.
        context.delegate = null;
        return ContinueSentinel;
    }
    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
        return this;
    });
    define(Gp, "toString", function() {
        return "[object Generator]";
    });
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        if (1 in locs) entry.catchLoc = locs[1];
        if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
        }
        this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
    }
    function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
    }
    exports.keys = function(val) {
        var object = Object(val);
        var keys = [];
        for(var key in object)keys.push(key);
        keys.reverse();
        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
            while(keys.length){
                var key = keys.pop();
                if (key in object) {
                    next.value = key;
                    next.done = false;
                    return next;
                }
            }
            // To avoid creating an additional object, we just hang the .value
            // and .done properties off the next function object itself. This
            // also ensures that the minifier will not anonymize the function.
            next.done = true;
            return next;
        };
    };
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if (typeof iterable.next === "function") return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    while(++i < iterable.length)if (hasOwn.call(iterable, i)) {
                        next.value = iterable[i];
                        next.done = false;
                        return next;
                    }
                    next.value = undefined;
                    next.done = true;
                    return next;
                };
                return next.next = next;
            }
        }
        // Return an iterator with no values.
        return {
            next: doneResult
        };
    }
    exports.values = values;
    function doneResult() {
        return {
            value: undefined,
            done: true
        };
    }
    Context.prototype = {
        constructor: Context,
        reset: function(skipTempReset) {
            this.prev = 0;
            this.next = 0;
            // Resetting context._sent for legacy support of Babel's
            // function.sent implementation.
            this.sent = this._sent = undefined;
            this.done = false;
            this.delegate = null;
            this.method = "next";
            this.arg = undefined;
            this.tryEntries.forEach(resetTryEntry);
            if (!skipTempReset) {
                for(var name in this)// Not sure about the optimal order of these conditions:
                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) this[name] = undefined;
            }
        },
        stop: function() {
            this.done = true;
            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;
            if (rootRecord.type === "throw") throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                record.type = "throw";
                record.arg = exception;
                context.next = loc;
                if (caught) {
                    // If the dispatched exception was caught by a catch block,
                    // then let that catch block handle the exception normally.
                    context.method = "next";
                    context.arg = undefined;
                }
                return !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                var record = entry.completion;
                if (entry.tryLoc === "root") // Exception thrown outside of any try block that could handle
                // it, so set the completion value of the entire function to
                // throw the exception.
                return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc");
                    var hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                        else if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                    } else if (hasFinally) {
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else throw new Error("try statement without catch or finally");
                }
            }
        },
        abrupt: function(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
            var record = finallyEntry ? finallyEntry.completion : {};
            record.type = type;
            record.arg = arg;
            if (finallyEntry) {
                this.method = "next";
                this.next = finallyEntry.finallyLoc;
                return ContinueSentinel;
            }
            return this.complete(record);
        },
        complete: function(record, afterLoc) {
            if (record.type === "throw") throw record.arg;
            if (record.type === "break" || record.type === "continue") this.next = record.arg;
            else if (record.type === "return") {
                this.rval = this.arg = record.arg;
                this.method = "return";
                this.next = "end";
            } else if (record.type === "normal" && afterLoc) this.next = afterLoc;
            return ContinueSentinel;
        },
        finish: function(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) {
                    this.complete(entry.completion, entry.afterLoc);
                    resetTryEntry(entry);
                    return ContinueSentinel;
                }
            }
        },
        "catch": function(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if (record.type === "throw") {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            // The context.catch method must only be called with a location
            // argument that corresponds to a known catch block.
            throw new Error("illegal catch attempt");
        },
        delegateYield: function(iterable, resultName, nextLoc) {
            this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            };
            if (this.method === "next") // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined;
            return ContinueSentinel;
        }
    };
    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;
}(// If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
(0, module.exports));
try {
    regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") globalThis.regeneratorRuntime = runtime;
    else Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"bWlJ9":[function(require,module,exports) {
// + Imports +
// Base
// Custom
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _configJs = require("../config.js");
var _buttonViewJs = require("./buttonView.js");
var _buttonViewJsDefault = parcelHelpers.interopDefault(_buttonViewJs);
var _progressBarViewJs = require("./progressBarView.js");
var _progressBarViewJsDefault = parcelHelpers.interopDefault(_progressBarViewJs);
var _anchorViewJs = require("./anchorView.js");
var _anchorViewJsDefault = parcelHelpers.interopDefault(_anchorViewJs);
var _stepViewJs = require("./stepView.js");
var _stepViewJsDefault = parcelHelpers.interopDefault(_stepViewJs);
// + Classes +
// Base form view
class WebflowView {
    // Add step view handlers
    addStepViewHandlers(stateData) {
        (0, _stepViewJsDefault.default).addHandlers(stateData);
    }
    // Initialize progress bar
    initProgressBar(stateData) {
        // Init
        (0, _progressBarViewJsDefault.default).update(stateData);
    }
    // Initialize buttons
    initButtons(stateData) {
        (0, _buttonViewJsDefault.default).init(stateData);
    }
    // Initialize anchor
    initAnchor(stateData) {
        (0, _anchorViewJsDefault.default).init(stateData);
    }
    // Delete visual dividers
    removeVisualDividers(devMode, elements) {
        if (devMode < 2) {
            // If dev mode is 200% or higher, do not:
            elements.$form.find(_configJs.DIVIDER_SELCTOR).remove();
            elements.$steps.hide();
            elements.$steps.eq(0).show();
        } else console.log(`Dev mode ${devMode}: Visual dividers not removed...`);
    }
}
// + Exports +
// WebflowView object
exports.default = new WebflowView();

},{"../config.js":"k5Hzs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./buttonView.js":"6ARYD","./progressBarView.js":"avjhP","./anchorView.js":"2Yxx6","./stepView.js":"igI8F"}],"k5Hzs":[function(require,module,exports) {
// + Global strings +
// Functional defaults
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ESC_EVENT_DEFAULT", ()=>ESC_EVENT_DEFAULT);
parcelHelpers.export(exports, "ENTER_EVENT_DEFAULT", ()=>ENTER_EVENT_DEFAULT);
parcelHelpers.export(exports, "LEFT_EVENT_DEFAULT", ()=>LEFT_EVENT_DEFAULT);
parcelHelpers.export(exports, "RIGHT_EVENT_DEFAULT", ()=>RIGHT_EVENT_DEFAULT);
parcelHelpers.export(exports, "LEFT_RIGHT_KEY_EVENT_INFINITY_ALLOWED_DEFAULT", ()=>LEFT_RIGHT_KEY_EVENT_INFINITY_ALLOWED_DEFAULT);
parcelHelpers.export(exports, "AUTO_DETECT_NEXT_STEP_DEFAULT", ()=>AUTO_DETECT_NEXT_STEP_DEFAULT);
parcelHelpers.export(exports, "CSS_SHOW_DEFAULT", ()=>CSS_SHOW_DEFAULT);
parcelHelpers.export(exports, "CSS_HIDE_DEFAULT", ()=>CSS_HIDE_DEFAULT);
parcelHelpers.export(exports, "CSS_ACTIVE_DEFAULT", ()=>CSS_ACTIVE_DEFAULT);
parcelHelpers.export(exports, "CSS_INACTIVE_DEFAULT", ()=>CSS_INACTIVE_DEFAULT);
parcelHelpers.export(exports, "CSS_BACK_FORTH_ACTIVE_DEFAULT", ()=>CSS_BACK_FORTH_ACTIVE_DEFAULT);
parcelHelpers.export(exports, "CSS_BACK_FORTH_INACTIVE_DEFAULT", ()=>CSS_BACK_FORTH_INACTIVE_DEFAULT);
parcelHelpers.export(exports, "ANIMATION_MS_TIME_DEFAULT", ()=>ANIMATION_MS_TIME_DEFAULT);
parcelHelpers.export(exports, "EQUAL_HEIGHT_TRANSITION_SPEED_MULTIPLIER_DEFAULT", ()=>EQUAL_HEIGHT_TRANSITION_SPEED_MULTIPLIER_DEFAULT);
parcelHelpers.export(exports, "ERROR_COLOR_DEFAULT", ()=>ERROR_COLOR_DEFAULT);
parcelHelpers.export(exports, "SLIDE_DIRECTION_DEFAULT", ()=>SLIDE_DIRECTION_DEFAULT);
parcelHelpers.export(exports, "CUSTOM_NEXT_SLIDE_IN_DEFAULT", ()=>CUSTOM_NEXT_SLIDE_IN_DEFAULT);
parcelHelpers.export(exports, "CUSTOM_NEXT_SLIDE_OUT_DEFAULT", ()=>CUSTOM_NEXT_SLIDE_OUT_DEFAULT);
parcelHelpers.export(exports, "CUSTOM_PREV_SLIDE_IN_DEFAULT", ()=>CUSTOM_PREV_SLIDE_IN_DEFAULT);
parcelHelpers.export(exports, "CUSTOM_PREV_SLIDE_OUT_DEFAULT", ()=>CUSTOM_PREV_SLIDE_OUT_DEFAULT);
parcelHelpers.export(exports, "CUSTOM_X_MULTIPLIER_DEFAULT", ()=>CUSTOM_X_MULTIPLIER_DEFAULT);
parcelHelpers.export(exports, "CUSTOM_Y_MULTIPLIER_DEFAULT", ()=>CUSTOM_Y_MULTIPLIER_DEFAULT);
parcelHelpers.export(exports, "AUTO_RESIZE_TIME_MULTIPLIER_1_DEFAULT", ()=>AUTO_RESIZE_TIME_MULTIPLIER_1_DEFAULT);
parcelHelpers.export(exports, "AUTO_RESIZE_TIME_MULTIPLIER_2_DEFAULT", ()=>AUTO_RESIZE_TIME_MULTIPLIER_2_DEFAULT);
parcelHelpers.export(exports, "AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_1_DEFAULT", ()=>AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_1_DEFAULT);
parcelHelpers.export(exports, "AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_2_DEFAULT", ()=>AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_2_DEFAULT);
parcelHelpers.export(exports, "MAX_SWIPE_SCREEN_SIZE_DEFAULT", ()=>MAX_SWIPE_SCREEN_SIZE_DEFAULT);
parcelHelpers.export(exports, "MIN_SWIPE_SCREEN_SIZE_DEFAULT", ()=>MIN_SWIPE_SCREEN_SIZE_DEFAULT);
parcelHelpers.export(exports, "REDIRECT_MS_TIME_DEFAULT", ()=>REDIRECT_MS_TIME_DEFAULT);
parcelHelpers.export(exports, "PROGRESS_BAR_AXIS_DEFAULT", ()=>PROGRESS_BAR_AXIS_DEFAULT);
parcelHelpers.export(exports, "ANCHOR_MIN_SCREEN_SIZE_DEFAULT", ()=>ANCHOR_MIN_SCREEN_SIZE_DEFAULT);
parcelHelpers.export(exports, "ANCHOR_MAX_SCREEN_SIZE_DEFAULT", ()=>ANCHOR_MAX_SCREEN_SIZE_DEFAULT);
parcelHelpers.export(exports, "DEV_MODE_OBJECT", ()=>DEV_MODE_OBJECT);
parcelHelpers.export(exports, "TYPEOF_GSAP_DEPENDENCY", ()=>TYPEOF_GSAP_DEPENDENCY);
parcelHelpers.export(exports, "TYPEOF_GSAP_SCROLL_TO_DEPENDENCY", ()=>TYPEOF_GSAP_SCROLL_TO_DEPENDENCY);
parcelHelpers.export(exports, "TYPEOF_HAMMER_JS_DEPENDENCY", ()=>TYPEOF_HAMMER_JS_DEPENDENCY);
parcelHelpers.export(exports, "FORM_BLOCK_SELECTOR", ()=>FORM_BLOCK_SELECTOR);
parcelHelpers.export(exports, "FORM_SELECTOR", ()=>FORM_SELECTOR);
parcelHelpers.export(exports, "STEP_SELECTOR", ()=>STEP_SELECTOR);
parcelHelpers.export(exports, "DIVIDER_SELCTOR", ()=>DIVIDER_SELCTOR);
parcelHelpers.export(exports, "SUBMIT_BUTTON_SELECTOR", ()=>SUBMIT_BUTTON_SELECTOR);
parcelHelpers.export(exports, "CONTINUE_BUTTON_SELECTOR", ()=>CONTINUE_BUTTON_SELECTOR);
parcelHelpers.export(exports, "BACKWARDS_BUTTON_SELECTOR", ()=>BACKWARDS_BUTTON_SELECTOR);
parcelHelpers.export(exports, "NOT_A_BUTTON_SELECTOR", ()=>NOT_A_BUTTON_SELECTOR);
parcelHelpers.export(exports, "QUIZ_RESULT_SELECTOR", ()=>QUIZ_RESULT_SELECTOR);
parcelHelpers.export(exports, "PROGRESS_BAR_SELECTOR", ()=>PROGRESS_BAR_SELECTOR);
parcelHelpers.export(exports, "ANCHOR_ELEMENT_SELECTOR", ()=>ANCHOR_ELEMENT_SELECTOR);
parcelHelpers.export(exports, "RADIO_SELECTOR", ()=>RADIO_SELECTOR);
parcelHelpers.export(exports, "CHECKBOX_SELECTOR", ()=>CHECKBOX_SELECTOR);
parcelHelpers.export(exports, "W_BUTTON_SELECTOR", ()=>W_BUTTON_SELECTOR);
parcelHelpers.export(exports, "SUCCESS_SELECTOR", ()=>SUCCESS_SELECTOR);
parcelHelpers.export(exports, "CONDITION_INVISIBLE_SELECTOR", ()=>CONDITION_INVISIBLE_SELECTOR);
parcelHelpers.export(exports, "FORM_BLOCK_INDEX_ATTRIBUTE", ()=>FORM_BLOCK_INDEX_ATTRIBUTE);
parcelHelpers.export(exports, "STEP_INDEX_ATTRIBUTE", ()=>STEP_INDEX_ATTRIBUTE);
parcelHelpers.export(exports, "STEP_TYPE_ATTRIBUTE", ()=>STEP_TYPE_ATTRIBUTE);
parcelHelpers.export(exports, "STEP_REQUIRED_ATTRIBUTE", ()=>STEP_REQUIRED_ATTRIBUTE);
parcelHelpers.export(exports, "STEP_CUSTOM_REQUIREMENTS_PASSED_ATTRIBUTE", ()=>STEP_CUSTOM_REQUIREMENTS_PASSED_ATTRIBUTE);
parcelHelpers.export(exports, "RELATIVE_LAST_STEP_ATTRIBUTE", ()=>RELATIVE_LAST_STEP_ATTRIBUTE);
parcelHelpers.export(exports, "CONDITIONAL_ATTRIBUTE", ()=>CONDITIONAL_ATTRIBUTE);
parcelHelpers.export(exports, "CONDITIONAL_NEXT_ATTRIBUTE", ()=>CONDITIONAL_NEXT_ATTRIBUTE);
parcelHelpers.export(exports, "NOT_AUTO_CONTINUE_ATTRIBUTE", ()=>NOT_AUTO_CONTINUE_ATTRIBUTE);
parcelHelpers.export(exports, "MARK_CLICK_ELEMENT_ATTRIBUTE", ()=>MARK_CLICK_ELEMENT_ATTRIBUTE);
parcelHelpers.export(exports, "ELEMENT_GOT_CHECKED_ATTRIBUTE", ()=>ELEMENT_GOT_CHECKED_ATTRIBUTE);
parcelHelpers.export(exports, "CLICK_ELEMENT_ID_ATTRIBUTE", ()=>CLICK_ELEMENT_ID_ATTRIBUTE);
parcelHelpers.export(exports, "REMOVE_OTHER_STEPS_ATTRIBUTE", ()=>REMOVE_OTHER_STEPS_ATTRIBUTE);
parcelHelpers.export(exports, "AUTO_FOCUS_ATTRIBUTE", ()=>AUTO_FOCUS_ATTRIBUTE);
parcelHelpers.export(exports, "KEYBOARD_EVENTS_ON_STEP_ATTRIBUTE", ()=>KEYBOARD_EVENTS_ON_STEP_ATTRIBUTE);
parcelHelpers.export(exports, "ESC_EVENT_ATTRIBUTE", ()=>ESC_EVENT_ATTRIBUTE);
parcelHelpers.export(exports, "ENTER_EVENT_ATTRIBUTE", ()=>ENTER_EVENT_ATTRIBUTE);
parcelHelpers.export(exports, "LEFT_EVENT_ATTRIBUTE", ()=>LEFT_EVENT_ATTRIBUTE);
parcelHelpers.export(exports, "LEFT_RIGHT_KEY_EVENT_INFINITY_ALLOWED_ATTRIBUTE", ()=>LEFT_RIGHT_KEY_EVENT_INFINITY_ALLOWED_ATTRIBUTE);
parcelHelpers.export(exports, "RIGHT_EVENT_ATTRIBUTE", ()=>RIGHT_EVENT_ATTRIBUTE);
parcelHelpers.export(exports, "DEV_MODE_ATTRIBUTE", ()=>DEV_MODE_ATTRIBUTE);
parcelHelpers.export(exports, "SWIPE_ALLOWED_ATTRIBUTE", ()=>SWIPE_ALLOWED_ATTRIBUTE);
parcelHelpers.export(exports, "QUIZ_PATH_ATTRIBUTE", ()=>QUIZ_PATH_ATTRIBUTE);
parcelHelpers.export(exports, "REDIRECT_URL_ATTRIBUTE", ()=>REDIRECT_URL_ATTRIBUTE);
parcelHelpers.export(exports, "AUTO_DELETE_CONDITIONALLY_INVISIBLE_ITEMS_ATTRIBUTE", ()=>AUTO_DELETE_CONDITIONALLY_INVISIBLE_ITEMS_ATTRIBUTE);
parcelHelpers.export(exports, "AUTO_DETECT_NEXT_STEP_ATTRIBUTE", ()=>AUTO_DETECT_NEXT_STEP_ATTRIBUTE);
parcelHelpers.export(exports, "CSS_SHOW_ATTRIBUTE", ()=>CSS_SHOW_ATTRIBUTE);
parcelHelpers.export(exports, "CSS_HIDE_ATTRIBUTE", ()=>CSS_HIDE_ATTRIBUTE);
parcelHelpers.export(exports, "CSS_ACTIVE_ATTRIBUTE", ()=>CSS_ACTIVE_ATTRIBUTE);
parcelHelpers.export(exports, "CSS_INACTIVE_ATTRIBUTE", ()=>CSS_INACTIVE_ATTRIBUTE);
parcelHelpers.export(exports, "CSS_BACK_FORTH_ACTIVE_ATTRIBUTE", ()=>CSS_BACK_FORTH_ACTIVE_ATTRIBUTE);
parcelHelpers.export(exports, "CSS_BACK_FORTH_INACTIVE_ATTRIBUTE", ()=>CSS_BACK_FORTH_INACTIVE_ATTRIBUTE);
parcelHelpers.export(exports, "SET_CSS_INACTIVE_ATTRIBUTE", ()=>SET_CSS_INACTIVE_ATTRIBUTE);
parcelHelpers.export(exports, "CSS_SELECT_ATTRIBUTE", ()=>CSS_SELECT_ATTRIBUTE);
parcelHelpers.export(exports, "CSS_DESELECT_ATTRIBUTE", ()=>CSS_DESELECT_ATTRIBUTE);
parcelHelpers.export(exports, "ANIMATION_MS_TIME_ATTRIBUTE", ()=>ANIMATION_MS_TIME_ATTRIBUTE);
parcelHelpers.export(exports, "EQUAL_HEIGHT_TRANSITION_SPEED_MULTIPLIER_ATTRIBUTE", ()=>EQUAL_HEIGHT_TRANSITION_SPEED_MULTIPLIER_ATTRIBUTE);
parcelHelpers.export(exports, "ERROR_COLOR_ATTRIBUTE", ()=>ERROR_COLOR_ATTRIBUTE);
parcelHelpers.export(exports, "CSS_ERROR_STATUS_ATTRIBUTE", ()=>CSS_ERROR_STATUS_ATTRIBUTE);
parcelHelpers.export(exports, "CSS_ERROR_STATUS_RESOLVED_ATTRIBUTE", ()=>CSS_ERROR_STATUS_RESOLVED_ATTRIBUTE);
parcelHelpers.export(exports, "SLIDE_DIRECTION_ATTRIBUTE", ()=>SLIDE_DIRECTION_ATTRIBUTE);
parcelHelpers.export(exports, "CUSTOM_NEXT_SLIDE_IN_ATTRIBUTE", ()=>CUSTOM_NEXT_SLIDE_IN_ATTRIBUTE);
parcelHelpers.export(exports, "CUSTOM_NEXT_SLIDE_OUT_ATTRIBUTE", ()=>CUSTOM_NEXT_SLIDE_OUT_ATTRIBUTE);
parcelHelpers.export(exports, "CUSTOM_PREV_SLIDE_IN_ATTRIBUTE", ()=>CUSTOM_PREV_SLIDE_IN_ATTRIBUTE);
parcelHelpers.export(exports, "CUSTOM_PREV_SLIDE_OUT_ATTRIBUTE", ()=>CUSTOM_PREV_SLIDE_OUT_ATTRIBUTE);
parcelHelpers.export(exports, "CUSTOM_X_MULTIPLIER_ATTRIBUTE", ()=>CUSTOM_X_MULTIPLIER_ATTRIBUTE);
parcelHelpers.export(exports, "CUSTOM_Y_MULTIPLIER_ATTRIBUTE", ()=>CUSTOM_Y_MULTIPLIER_ATTRIBUTE);
parcelHelpers.export(exports, "AUTO_RESIZE_TIME_MULTIPLIER_1_ATTRIBUTE", ()=>AUTO_RESIZE_TIME_MULTIPLIER_1_ATTRIBUTE);
parcelHelpers.export(exports, "AUTO_RESIZE_TIME_MULTIPLIER_2_ATTRIBUTE", ()=>AUTO_RESIZE_TIME_MULTIPLIER_2_ATTRIBUTE);
parcelHelpers.export(exports, "AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_1_ATTRIBUTE", ()=>AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_1_ATTRIBUTE);
parcelHelpers.export(exports, "AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_2_ATTRIBUTE", ()=>AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_2_ATTRIBUTE);
parcelHelpers.export(exports, "MAX_SWIPE_SCREEN_SIZE_ATTRIBUTE", ()=>MAX_SWIPE_SCREEN_SIZE_ATTRIBUTE);
parcelHelpers.export(exports, "MIN_SWIPE_SCREEN_SIZE_ATTRIBUTE", ()=>MIN_SWIPE_SCREEN_SIZE_ATTRIBUTE);
parcelHelpers.export(exports, "SWIPE_TYPE_ANIMATION_ATTRIBUTE", ()=>SWIPE_TYPE_ANIMATION_ATTRIBUTE);
parcelHelpers.export(exports, "SUBMIT_MS_TIME_1_ATTRIBUTE", ()=>SUBMIT_MS_TIME_1_ATTRIBUTE);
parcelHelpers.export(exports, "SUBMIT_MS_TIME_2_ATTRIBUTE", ()=>SUBMIT_MS_TIME_2_ATTRIBUTE);
parcelHelpers.export(exports, "SUBMIT_SHOW_ATTRIBUTE", ()=>SUBMIT_SHOW_ATTRIBUTE);
parcelHelpers.export(exports, "SUBMIT_HIDE_ATTRIBUTE", ()=>SUBMIT_HIDE_ATTRIBUTE);
parcelHelpers.export(exports, "REDIRECT_MS_TIME_ATTRIBUTE", ()=>REDIRECT_MS_TIME_ATTRIBUTE);
parcelHelpers.export(exports, "PROGRESS_BAR_ANIMATION_MS_TIME_ATTRIBUTE", ()=>PROGRESS_BAR_ANIMATION_MS_TIME_ATTRIBUTE);
parcelHelpers.export(exports, "PROGRESS_BAR_AXIS_ATTRIBUTE", ()=>PROGRESS_BAR_AXIS_ATTRIBUTE);
parcelHelpers.export(exports, "ANCHOR_MIN_SCREEN_SIZE_ATTRIBUTE", ()=>ANCHOR_MIN_SCREEN_SIZE_ATTRIBUTE);
parcelHelpers.export(exports, "ANCHOR_MAX_SCREEN_SIZE_ATTRIBUTE", ()=>ANCHOR_MAX_SCREEN_SIZE_ATTRIBUTE);
parcelHelpers.export(exports, "ANCHOR_ANIMATION_MS_TIME_ATTRIBUTE", ()=>ANCHOR_ANIMATION_MS_TIME_ATTRIBUTE);
parcelHelpers.export(exports, "ANCHOR_Y_OFF_SETSELECTOR_ATTRIBUTE", ()=>ANCHOR_Y_OFF_SETSELECTOR_ATTRIBUTE);
parcelHelpers.export(exports, "ANCHOR_RELATED_ELEMENT_TO_SCROLL_SELECTOR_ATTRIBUTE", ()=>ANCHOR_RELATED_ELEMENT_TO_SCROLL_SELECTOR_ATTRIBUTE);
const ESC_EVENT_DEFAULT = "escape, esc, arrowup, up";
const ENTER_EVENT_DEFAULT = "enter, arrowdown, down";
const LEFT_EVENT_DEFAULT = "arrowleft, left";
const RIGHT_EVENT_DEFAULT = "arrowright, right";
const LEFT_RIGHT_KEY_EVENT_INFINITY_ALLOWED_DEFAULT = "true";
const AUTO_DETECT_NEXT_STEP_DEFAULT = "true";
const CSS_SHOW_DEFAULT = {
    opacity: 1,
    display: "flex"
};
const CSS_HIDE_DEFAULT = {
    opacity: 0,
    display: "none"
};
const CSS_ACTIVE_DEFAULT = {
    opacity: 1,
    duration: 0.1
};
const CSS_INACTIVE_DEFAULT = {
    opacity: 0.5,
    duration: 0.1
};
const CSS_BACK_FORTH_ACTIVE_DEFAULT = {
    opacity: 1
};
const CSS_BACK_FORTH_INACTIVE_DEFAULT = {
    opacity: 0.5
};
const ANIMATION_MS_TIME_DEFAULT = 500;
const EQUAL_HEIGHT_TRANSITION_SPEED_MULTIPLIER_DEFAULT = 0.25;
const ERROR_COLOR_DEFAULT = "red";
const SLIDE_DIRECTION_DEFAULT = "to left";
const CUSTOM_NEXT_SLIDE_IN_DEFAULT = {
    ...CSS_SHOW_DEFAULT
};
const CUSTOM_NEXT_SLIDE_OUT_DEFAULT = {
    ...CSS_HIDE_DEFAULT
};
const CUSTOM_PREV_SLIDE_IN_DEFAULT = {
    ...CSS_SHOW_DEFAULT
};
const CUSTOM_PREV_SLIDE_OUT_DEFAULT = {
    ...CSS_HIDE_DEFAULT
};
const CUSTOM_X_MULTIPLIER_DEFAULT = 0;
const CUSTOM_Y_MULTIPLIER_DEFAULT = 0;
const AUTO_RESIZE_TIME_MULTIPLIER_1_DEFAULT = 1;
const AUTO_RESIZE_TIME_MULTIPLIER_2_DEFAULT = 0.5;
const AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_1_DEFAULT = 1;
const AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_2_DEFAULT = 0.85;
const MAX_SWIPE_SCREEN_SIZE_DEFAULT = 767;
const MIN_SWIPE_SCREEN_SIZE_DEFAULT = 0;
const REDIRECT_MS_TIME_DEFAULT = 1;
const PROGRESS_BAR_AXIS_DEFAULT = "x";
const ANCHOR_MIN_SCREEN_SIZE_DEFAULT = 0;
const ANCHOR_MAX_SCREEN_SIZE_DEFAULT = 767;
const DEV_MODE_OBJECT = [
    {
        names: [
            "false"
        ],
        value: 0
    },
    {
        names: [
            "half",
            "50%"
        ],
        value: 0.5
    },
    {
        names: [
            "on",
            "true",
            "100%"
        ],
        value: 1
    },
    {
        names: [
            "extreme",
            "200%"
        ],
        value: 2
    }
];
const TYPEOF_GSAP_DEPENDENCY = typeof gsap;
const TYPEOF_GSAP_SCROLL_TO_DEPENDENCY = typeof $("body").attr("bmg-data-gsap-scroll-already-installed");
const TYPEOF_HAMMER_JS_DEPENDENCY = typeof Hammer;
const FORM_BLOCK_SELECTOR = '[bmg-form = "Form Block"]';
const FORM_SELECTOR = '[bmg-form = "Form"]';
const STEP_SELECTOR = '[bmg-form = "Form Step"]';
const DIVIDER_SELCTOR = '[bmg-form = "Visual Divider"]';
const SUBMIT_BUTTON_SELECTOR = '[bmg-form = "Submit Button"]';
const CONTINUE_BUTTON_SELECTOR = '[bmg-form = "Continue Button"]';
const BACKWARDS_BUTTON_SELECTOR = '[bmg-form = "Backwards Button"]';
const NOT_A_BUTTON_SELECTOR = '[bmg-form = "Not a Button"]';
const QUIZ_RESULT_SELECTOR = '[bmg-form = "Quiz Result"]';
const PROGRESS_BAR_SELECTOR = '[bmg-form = "Progress Bar"]';
const ANCHOR_ELEMENT_SELECTOR = '[bmg-form = "Anchor Element"]';
const RADIO_SELECTOR = ".w-radio";
const CHECKBOX_SELECTOR = ".w-checkbox";
const W_BUTTON_SELECTOR = ".w-button";
const SUCCESS_SELECTOR = ".w-form-done";
const CONDITION_INVISIBLE_SELECTOR = ".w-condition-invisible";
const FORM_BLOCK_INDEX_ATTRIBUTE = "bmg-data-form-block-index";
const STEP_INDEX_ATTRIBUTE = "bmg-data-step-index";
const STEP_TYPE_ATTRIBUTE = "bmg-data-step-type";
const STEP_REQUIRED_ATTRIBUTE = "bmg-data-required";
const STEP_CUSTOM_REQUIREMENTS_PASSED_ATTRIBUTE = "bmg-data-custom-requirements-passed";
const RELATIVE_LAST_STEP_ATTRIBUTE = "bmg-data-relative-last-step";
const CONDITIONAL_ATTRIBUTE = "bmg-data-conditional";
const CONDITIONAL_NEXT_ATTRIBUTE = "bmg-data-conditional-next";
const NOT_AUTO_CONTINUE_ATTRIBUTE = "bmg-data-not-auto-continue";
const MARK_CLICK_ELEMENT_ATTRIBUTE = "bmg-data-click-element";
const ELEMENT_GOT_CHECKED_ATTRIBUTE = "bmg-data-element-checked";
const CLICK_ELEMENT_ID_ATTRIBUTE = "bmg-data-click-element-id";
const REMOVE_OTHER_STEPS_ATTRIBUTE = "bmg-data-remove-other-steps";
const AUTO_FOCUS_ATTRIBUTE = "bmg-data-autofocus";
const KEYBOARD_EVENTS_ON_STEP_ATTRIBUTE = "bmg-data-keyboard-events";
const ESC_EVENT_ATTRIBUTE = "bmg-data-esc-event";
const ENTER_EVENT_ATTRIBUTE = "bmg-data-enter-event";
const LEFT_EVENT_ATTRIBUTE = "bmg-data-left-event";
const LEFT_RIGHT_KEY_EVENT_INFINITY_ALLOWED_ATTRIBUTE = "bmg-data-left-key-event-infintiy-allowed";
const RIGHT_EVENT_ATTRIBUTE = "bmg-data-right-event";
const DEV_MODE_ATTRIBUTE = "bmg-data-dev-mode";
const SWIPE_ALLOWED_ATTRIBUTE = "bmg-data-swipe-allowed";
const QUIZ_PATH_ATTRIBUTE = "bmg-data-quiz-path";
const REDIRECT_URL_ATTRIBUTE = "bmg-data-redirect-url";
const AUTO_DELETE_CONDITIONALLY_INVISIBLE_ITEMS_ATTRIBUTE = "bmg-data-auto-delete-conditionally-invisible-elements";
const AUTO_DETECT_NEXT_STEP_ATTRIBUTE = "bmg-data-auto-detect-next-step";
const CSS_SHOW_ATTRIBUTE = "bmg-data-css-show";
const CSS_HIDE_ATTRIBUTE = "bmg-data-css-hide";
const CSS_ACTIVE_ATTRIBUTE = "bmg-data-css-active";
const CSS_INACTIVE_ATTRIBUTE = "bmg-data-css-inactive";
const CSS_BACK_FORTH_ACTIVE_ATTRIBUTE = "bmg-data-back-forth-css-active";
const CSS_BACK_FORTH_INACTIVE_ATTRIBUTE = "bmg-data-back-forth-css-inactive";
const SET_CSS_INACTIVE_ATTRIBUTE = "bmg-data-set-css-inactive";
const CSS_SELECT_ATTRIBUTE = "bmg-data-css-select";
const CSS_DESELECT_ATTRIBUTE = "bmg-data-css-deselect";
const ANIMATION_MS_TIME_ATTRIBUTE = "bmg-data-animation-ms-time";
const EQUAL_HEIGHT_TRANSITION_SPEED_MULTIPLIER_ATTRIBUTE = "bmg-data-equal-height-transition-speed-multiplier";
const ERROR_COLOR_ATTRIBUTE = "bmg-data-error-color";
const CSS_ERROR_STATUS_ATTRIBUTE = "bmg-data-css-error-status";
const CSS_ERROR_STATUS_RESOLVED_ATTRIBUTE = "bmg-data-css-error-status-resolved";
const SLIDE_DIRECTION_ATTRIBUTE = "bmg-data-slide-direction";
const CUSTOM_NEXT_SLIDE_IN_ATTRIBUTE = "bmg-data-custom-next-slide-in";
const CUSTOM_NEXT_SLIDE_OUT_ATTRIBUTE = "bmg-data-custom-next-slide-out";
const CUSTOM_PREV_SLIDE_IN_ATTRIBUTE = "bmg-data-custom-prev-slide-in";
const CUSTOM_PREV_SLIDE_OUT_ATTRIBUTE = "bmg-data-custom-prev-slide-out";
const CUSTOM_X_MULTIPLIER_ATTRIBUTE = "bmg-data-custom-x-percentage-multiplier";
const CUSTOM_Y_MULTIPLIER_ATTRIBUTE = "bmg-data-custom-y-percentage-multiplier";
const AUTO_RESIZE_TIME_MULTIPLIER_1_ATTRIBUTE = "bmg-data-auto-resize-time-multiplier-1";
const AUTO_RESIZE_TIME_MULTIPLIER_2_ATTRIBUTE = "bmg-data-auto-resize-time-multiplier-2";
const AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_1_ATTRIBUTE = "bmg-data-success-auto-resize-time-multiplier-1";
const AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_2_ATTRIBUTE = "bmg-data-success-auto-resize-time-multiplier-2";
const MAX_SWIPE_SCREEN_SIZE_ATTRIBUTE = "bmg-data-max-swipe-screen-size";
const MIN_SWIPE_SCREEN_SIZE_ATTRIBUTE = "bmg-data-min-swipe-screen-size";
const SWIPE_TYPE_ANIMATION_ATTRIBUTE = "bmg-data-swipe-type-animation";
const SUBMIT_MS_TIME_1_ATTRIBUTE = "bmg-data-submit-ms-time-1";
const SUBMIT_MS_TIME_2_ATTRIBUTE = "bmg-data-submit-ms-time-2";
const SUBMIT_SHOW_ATTRIBUTE = "bmg-data-submit-show";
const SUBMIT_HIDE_ATTRIBUTE = "bmg-data-submit-hide";
const REDIRECT_MS_TIME_ATTRIBUTE = "bmg-data-redirect-ms-time";
const PROGRESS_BAR_ANIMATION_MS_TIME_ATTRIBUTE = "bmg-data-progress-bar-ms-time";
const PROGRESS_BAR_AXIS_ATTRIBUTE = "bmg-data-progress-bar-axis";
const ANCHOR_MIN_SCREEN_SIZE_ATTRIBUTE = "bmg-data-anchor-min-screen-size";
const ANCHOR_MAX_SCREEN_SIZE_ATTRIBUTE = "bmg-data-anchor-max-screen-size";
const ANCHOR_ANIMATION_MS_TIME_ATTRIBUTE = "bmg-data-anchor-animation-ms-time";
const ANCHOR_Y_OFF_SETSELECTOR_ATTRIBUTE = "bmg-data-anchor-y-offset-selector";
const ANCHOR_RELATED_ELEMENT_TO_SCROLL_SELECTOR_ATTRIBUTE = "bmg-data-anchor-related-element-to-scroll-selector";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"6ARYD":[function(require,module,exports) {
// + Imports +
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _configJs = require("../config.js");
var _defineStepTypeJs = require("../helper/defineStepType.js");
var _defineStepTypeJsDefault = parcelHelpers.interopDefault(_defineStepTypeJs);
var _helper = require("../helper");
// + Classes +
class ButtonView {
    // Initialze buttons
    init(stateData) {
        // Initialize back & forth buttons
        this.#initBackForthButtons(stateData.elements, stateData.styles);
        // Initialize continue buttons
        this.#initContinueButtons(stateData.elements);
        // - Backwards buttons -
        this.#addBackwardButtonHandler(stateData.elements);
        // - Next button(s) -
        this.#addNextButtonHandler(stateData.elements, stateData.autoDetectNextStep);
        // - Submit buttons -
        this.#addSubmitButtonHandler(stateData.elements);
    }
    // - Update next button -
    #updateNextButton(stepId) {
        // Security return check
        if ($nextButton.length < 1) return;
        // Elements
        let $step = $form.find(`[${stepIndexAttribute} = "${stepId}"]`), $clickedButton = $step.find(`[${markClickElementAttribute} = "true"]`);
        // Action logic
        if ($clickedButton.length > 0 && stepRequirementsPassed($formBlock, $step)) // If a clicked button exists
        gsap.to(nextButtons, stylesObject[formBlockIndex]["cssBackForthActive"]);
        else gsap.to(nextButtons, stylesObject[formBlockIndex]["cssBackForthInactive"]);
    }
    // - Backwards buttons -
    #addBackwardButtonHandler(elements) {
        elements.$backwardsButtons.add(elements.$backButton).each(function() {
            $(this).click(()=>{
                goToPrevStep();
            });
        });
    }
    // - Next button(s) -
    #addNextButtonHandler(elements1, autoDetectNextStep) {
        elements1.$nextButton.each(function() {
            $(this).click(()=>{
                findNext(false, autoDetectNextStep);
            });
        });
    }
    // - Submit buttons -
    #addSubmitButtonHandler(elements2) {
        elements2.$submitButtons.each(function() {
            $(this).click(()=>{
                submitForm();
            });
        });
    }
    // Initialize back & forth buttons
    #initBackForthButtons(elements3, styles) {
        // Inactivate back and forth buttons
        gsap.set([
            elements3.backButtons,
            elements3.nextButtons
        ], {
            ...styles.cssBackForthInactive,
            duration: 0
        });
    }
    // Initialize continue buttons
    #initContinueButtons(elements4) {
        // - For each step - Find continue buttons -
        elements4.$steps.each(function(stepIndex) {
            // Local elments
            let $step = $(this), preventDoubleClick = false;
            // Local functions
            // Define step types
            let $buttons = (0, _defineStepTypeJsDefault.default)($step, stepIndex, elements4.$formBlock); // Returns click elements
            // Init click elements
            (0, _helper.markClickElement)($buttons);
            // Define click actions
            $buttons.each(function(buttonIndex) {
                // Element
                let $button = $(this);
                // Help future code by indexing
                $button.attr(_configJs.CLICK_ELEMENT_ID_ATTRIBUTE, buttonIndex);
                // Button click function
                $button.click(()=>{
                    // Prevent double clicking
                    if (!preventDoubleClick) {
                        setTimeout(()=>{
                            preventDoubleClick = false;
                        }, 10);
                        // Call function
                        (0, _helper.markClickElement)($buttons, $button);
                        findNext();
                    }
                    preventDoubleClick = true;
                });
            });
        });
    }
}
// + Exports +
exports.default = new ButtonView();

},{"../config.js":"k5Hzs","../helper/defineStepType.js":"iGQpR","../helper":"lVRAz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iGQpR":[function(require,module,exports) {
// + Imports +
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _configJs = require("../config.js");
var _initActiveInactiveClickStateJs = require("./initActiveInactiveClickState.js");
var _initActiveInactiveClickStateJsDefault = parcelHelpers.interopDefault(_initActiveInactiveClickStateJs);
// + Exports +
// - - Define step type - -
exports.default = function($step, stepIndex, $formBlock) {
    // Local elements
    let $radios = $step.find(_configJs.RADIO_SELECTOR), $checkboxes = $step.find(_configJs.CHECKBOX_SELECTOR), $buttons = $step.find(`a, ${_configJs.CONTINUE_BUTTON_SELECTOR}, ${_configJs.W_BUTTON_SELECTOR}`).not(_configJs.NOT_A_BUTTON_SELECTOR).not(_configJs.BACKWARDS_BUTTON_SELECTOR), $inputs = $step.find("input"), formBlockIndex = parseInt($formBlock.attr(_configJs.FORM_BLOCK_INDEX_ATTRIBUTE));
    // Set step index
    $step.attr(_configJs.STEP_INDEX_ATTRIBUTE, stepIndex);
    // Check for radio
    if ($radios.length > 0) {
        if ($step.attr(_configJs.STEP_TYPE_ATTRIBUTE) == undefined) $step.attr(_configJs.STEP_TYPE_ATTRIBUTE, "radio");
        (0, _initActiveInactiveClickStateJsDefault.default)($radios, formBlockIndex, $step);
        // Make sure to remove accidental radio requires
        $radios.find("input").removeAttr("required");
        return $step.attr(_configJs.NOT_AUTO_CONTINUE_ATTRIBUTE) != undefined ? $buttons : $radios;
    }
    // Check for checkbox
    if ($checkboxes.length > 0) {
        if ($step.attr(_configJs.STEP_TYPE_ATTRIBUTE) == undefined) $step.attr(_configJs.STEP_TYPE_ATTRIBUTE, "checkbox");
        (0, _initActiveInactiveClickStateJsDefault.default)($checkboxes, formBlockIndex, $step);
        // Make sure to remove accidental checkbox requires (for full checkbox steps only)
        if ($step.attr(_configJs.STEP_TYPE_ATTRIBUTE) == "checkbox") $checkboxes.find("input").removeAttr("required");
        return $buttons;
    }
    // Check for checkbox
    if ($inputs.length > 0) {
        if ($step.attr(_configJs.STEP_TYPE_ATTRIBUTE) == undefined) $step.attr(_configJs.STEP_TYPE_ATTRIBUTE, "other input");
        (0, _initActiveInactiveClickStateJsDefault.default)($checkboxes, formBlockIndex, $step);
        return $buttons;
    }
    // Else return empty
    if ($step.attr(_configJs.STEP_TYPE_ATTRIBUTE) == undefined) $step.attr(_configJs.STEP_TYPE_ATTRIBUTE, "empty");
    return $buttons;
};

},{"../config.js":"k5Hzs","./initActiveInactiveClickState.js":"i4vGN","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"i4vGN":[function(require,module,exports) {
// + Imports +
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _configJs = require("../config.js");
var _modelJs = require("../model.js");
var _helperJs = require("../helper.js");
// + Exports +
// - - Initialize click state for input fields - -
exports.default = function($elements, styleObjectIndex, $parent) {
    // Local variables
    const styles = (0, _modelJs.state).data[`form${styleObjectIndex}`].styles, cssActive = styles["cssActive"], cssInactive = styles["cssInactive"], cssInactiveSet = styles["setCssInactive"], isRadio = $parent.attr(_configJs.STEP_TYPE_ATTRIBUTE) == "radio" ? true : false, elements = (0, _helperJs.jQueryToJs)($elements);
    // Functions
    gsap.set(elements, cssInactiveSet); // Init
    if (isRadio) $elements.each(function() {
        const $element = $(this);
        $element.click(()=>{
            // Animation
            gsap.to(elements, cssInactive);
            gsap.to($element[0], cssActive);
            // Attributes
            $elements.removeAttr(_configJs.ELEMENT_GOT_CHECKED_ATTRIBUTE);
            $element.attr(_configJs.ELEMENT_GOT_CHECKED_ATTRIBUTE, true);
        });
    });
    else $elements.each(function() {
        const $element = $(this);
        let firstClick = true, preventDoubleClick = false;
        // Skip element if that is specified
        if ($element.attr(_configJs.CSS_ACTIVE_ATTRIBUTE) == "none") return true;
        // Click event
        $element.click(()=>{
            // Prevent double clicking
            if (!preventDoubleClick) {
                setTimeout(()=>{
                    preventDoubleClick = false;
                }, 10);
                // Call checkbox click logic
                if (firstClick) {
                    // Animation
                    gsap.to($element[0], cssActive);
                    // Attributes
                    $element.attr(_configJs.ELEMENT_GOT_CHECKED_ATTRIBUTE, true);
                    // Logic
                    firstClick = false; // Int 2nd click
                } else {
                    // Animation
                    gsap.to($element[0], cssInactive);
                    // Attributes
                    $element.removeAttr(_configJs.ELEMENT_GOT_CHECKED_ATTRIBUTE);
                    // Logic
                    firstClick = true;
                }
            }
            preventDoubleClick = true;
        });
    });
};

},{"../config.js":"k5Hzs","../model.js":"Y4A21","../helper.js":"lVRAz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"Y4A21":[function(require,module,exports) {
// + Imports +
// Base
// Custom
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "state", ()=>state);
parcelHelpers.export(exports, "createState", ()=>createState);
var _configJs = require("./config.js");
var _helper = require("./helper");
var _createElementsJs = require("./helper/createElements.js");
var _createElementsJsDefault = parcelHelpers.interopDefault(_createElementsJs);
var _populateStylesObjectJs = require("./helper/populateStylesObject.js");
var _populateStylesObjectJsDefault = parcelHelpers.interopDefault(_populateStylesObjectJs);
const state = {
    data: {}
};
const createState = function($formBlock, index) {
    // Add
    state.data[`form${index}`] = {
        // Index
        formBlockIndex: index,
        // Create initial elements
        elements: (0, _createElementsJsDefault.default)($formBlock, index),
        // Initial click record object
        clickRecord: [
            {
                step: 0
            }
        ],
        // Styles
        styles: (0, _populateStylesObjectJsDefault.default)($formBlock),
        // Environment variables
        keyEventsAllowed: true,
        devMode: (0, _helper.returnDevModeIndex)($formBlock),
        autoDetectNextStep: ($formBlock.attr(_configJs.AUTO_DETECT_NEXT_STEP_ATTRIBUTE) || _configJs.AUTO_DETECT_NEXT_STEP_DEFAULT) == "true",
        // Handlers
        handlers: {
            devModeLog: function(stateData) {
                if (stateData.devMode) console.log(`Dev Mode ${stateData.devMode}:\nstate -> data -> form${stateData.formBlockIndex}:\n`, stateData);
            }
        }
    };
    // Return
    return state.data[`form${index}`];
};

},{"./config.js":"k5Hzs","./helper":"lVRAz","./helper/createElements.js":"6bWx7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./helper/populateStylesObject.js":"aSMyv"}],"lVRAz":[function(require,module,exports) {
// + Imports +
// Base
// Custom
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// + Functions +
// Mark click element
parcelHelpers.export(exports, "markClickElement", ()=>markClickElement);
// jQuery to native JS
parcelHelpers.export(exports, "jQueryToJs", ()=>jQueryToJs);
// - - Return child elements - -
parcelHelpers.export(exports, "returnChildElements", ()=>returnChildElements);
// - - Development mode - -
parcelHelpers.export(exports, "returnDevModeIndex", ()=>returnDevModeIndex);
// - - String related functions - -
// - Get attribute values -
parcelHelpers.export(exports, "getJsonAttrVals", ()=>getJsonAttrVals);
var _configJs = require("./config.js");
function markClickElement($buttons, $button = false) {
    $buttons.attr(_configJs.MARK_CLICK_ELEMENT_ATTRIBUTE, false);
    if ($button) $button.attr(_configJs.MARK_CLICK_ELEMENT_ATTRIBUTE, true);
}
function jQueryToJs($elements) {
    // Guard
    if ($elements.length === 0) return "[not-findable]";
    // Vars
    let nodeList = [];
    $elements.each(function() {
        nodeList.push(this);
    });
    return nodeList;
}
function returnChildElements($element, selector, eqValue = "false", notSelector = "false") {
    // Values
    const $foundElements = $element.find(selector);
    let $childElements = $element.children();
    // Logic
    if ($foundElements.length > 0) return $foundElements;
    if (notSelector != "false") $childElements = $childElements.not(notSelector);
    if (eqValue != "false") $childElements = $childElements.eq(eqValue);
    return $childElements;
}
function returnDevModeIndex($element) {
    // Local variables
    let attrString = $element.attr(_configJs.DEV_MODE_ATTRIBUTE), returnValue = 0;
    // Local function
    _configJs.DEV_MODE_OBJECT.forEach((item)=>{
        // Loop through
        item.names.forEach((name)=>{
            if (name == attrString) returnValue = item.value;
        });
    });
    return returnValue;
}
function getJsonAttrVals($element, attribute, defaultVals, objectMode = true) {
    let val = ($element.attr(attribute) || "{}") == "{}" ? {
        ...defaultVals
    } : JSON.parse(preJsonParse($element.attr(attribute), objectMode));
    return val;
}
// - Prepare for JSON parse -
function preJsonParse(string, objectMode = true) {
    let array = trimBothStringSides(string.replace(/\, /g, ",")).split(","), newString = "", arrayLength = array.length - 1;
    array.forEach((item, i)=>{
        item.replace(/\'/g, "").replace(/\: /g, ":").split(":").forEach((item, i2)=>{
            newString += `"${item}"${i2 > 0 ? "" : ": "}`;
        });
        newString += i < arrayLength ? ", " : "";
    });
    if (objectMode) return `{${newString}}`;
    else return newString;
}
// Removes curly brackets
function trimBothStringSides(string) {
    return string.substring(1).slice(0, -1);
}

},{"./config.js":"k5Hzs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6bWx7":[function(require,module,exports) {
// + Imports +
// Base
// Custom
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _configJs = require("../config.js");
var _autoDeleteConditionallyInvisibleElementsJs = require("./autoDeleteConditionallyInvisibleElements.js");
var _autoDeleteConditionallyInvisibleElementsJsDefault = parcelHelpers.interopDefault(_autoDeleteConditionallyInvisibleElementsJs);
var _helperJs = require("../helper.js");
// + Exports +
exports.default = function($this, formBlockIndex) {
    // Auto delete
    (0, _autoDeleteConditionallyInvisibleElementsJsDefault.default)($this);
    // Values
    const elements = {};
    // Elements
    elements.$formBlock = $this;
    elements.$form = (0, _helperJs.returnChildElements)(elements.$formBlock, _configJs.FORM_SELECTOR, 0);
    elements.$steps = (0, _helperJs.returnChildElements)(elements.$form, _configJs.STEP_SELECTOR, "false", `${_configJs.DIVIDER_SELCTOR}, ${_configJs.QUIZ_RESULT_SELECTOR}`);
    elements.$backwardsButtons = elements.$form.find(_configJs.BACKWARDS_BUTTON_SELECTOR);
    elements.$submitButtons = elements.$form.find(_configJs.SUBMIT_BUTTON_SELECTOR);
    elements.$notForm = elements.$formBlock.children().not(elements.$form);
    elements.$backButton = elements.$notForm.find(_configJs.BACKWARDS_BUTTON_SELECTOR);
    elements.$nextButton = elements.$notForm.find(_configJs.CONTINUE_BUTTON_SELECTOR);
    elements.backButtons = (0, _helperJs.jQueryToJs)(elements.$backButton);
    elements.nextButtons = (0, _helperJs.jQueryToJs)(elements.$nextButton);
    elements.$progressBar = elements.$formBlock.find(_configJs.PROGRESS_BAR_SELECTOR);
    elements.progressBars = (0, _helperJs.jQueryToJs)(elements.$progressBar);
    elements.$anchor = elements.$formBlock.find(_configJs.ANCHOR_ELEMENT_SELECTOR).eq(0);
    // Save form block index in the DOM
    elements.$formBlock.attr(_configJs.FORM_BLOCK_INDEX_ATTRIBUTE, formBlockIndex);
    // Return
    return elements;
};

},{"../config.js":"k5Hzs","./autoDeleteConditionallyInvisibleElements.js":"2PNJc","../helper.js":"lVRAz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2PNJc":[function(require,module,exports) {
// + Imports +
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _config = require("../config");
// + Exports +
// - - Remove webflow invisible steps / items / elements - -
exports.default = function($formBlock) {
    if ($formBlock.attr((0, _config.AUTO_DELETE_CONDITIONALLY_INVISIBLE_ITEMS_ATTRIBUTE)) != "false") $formBlock.find((0, _config.CONDITION_INVISIBLE_SELECTOR)).remove();
};

},{"../config":"k5Hzs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aSMyv":[function(require,module,exports) {
// + Imports +
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _configJs = require("../config.js");
var _helperJs = require("../helper.js");
// + Exports +
// - - Populate styles object - -
exports.default = function($element) {
    // Initial varaible
    const styles = {
        animationMsTime: parseFloat($element.attr(_configJs.ANIMATION_MS_TIME_ATTRIBUTE) || _configJs.ANIMATION_MS_TIME_DEFAULT),
        equalHeightTransitionSpeedMultiplier: parseFloat($element.attr(_configJs.EQUAL_HEIGHT_TRANSITION_SPEED_MULTIPLIER_ATTRIBUTE) || _configJs.EQUAL_HEIGHT_TRANSITION_SPEED_MULTIPLIER_DEFAULT),
        cssShow: (0, _helperJs.getJsonAttrVals)($element, _configJs.CSS_SHOW_ATTRIBUTE, _configJs.CSS_SHOW_DEFAULT),
        cssHide: (0, _helperJs.getJsonAttrVals)($element, _configJs.CSS_HIDE_ATTRIBUTE, _configJs.CSS_HIDE_DEFAULT),
        cssActive: (0, _helperJs.getJsonAttrVals)($element, _configJs.CSS_ACTIVE_ATTRIBUTE, _configJs.CSS_ACTIVE_DEFAULT),
        cssInactive: (0, _helperJs.getJsonAttrVals)($element, _configJs.CSS_INACTIVE_ATTRIBUTE, _configJs.CSS_INACTIVE_DEFAULT),
        cssBackForthActive: (0, _helperJs.getJsonAttrVals)($element, _configJs.CSS_BACK_FORTH_ACTIVE_ATTRIBUTE, _configJs.CSS_BACK_FORTH_ACTIVE_DEFAULT),
        cssBackForthInactive: (0, _helperJs.getJsonAttrVals)($element, _configJs.CSS_BACK_FORTH_INACTIVE_ATTRIBUTE, _configJs.CSS_BACK_FORTH_INACTIVE_DEFAULT),
        errorColor: $element.attr(_configJs.ERROR_COLOR_ATTRIBUTE) || _configJs.ERROR_COLOR_DEFAULT,
        slideDirection: $element.attr(_configJs.SLIDE_DIRECTION_ATTRIBUTE) || _configJs.SLIDE_DIRECTION_DEFAULT,
        customNextSlideIn: (0, _helperJs.getJsonAttrVals)($element, _configJs.CUSTOM_NEXT_SLIDE_IN_ATTRIBUTE, _configJs.CUSTOM_NEXT_SLIDE_IN_DEFAULT),
        customNextSlideOut: (0, _helperJs.getJsonAttrVals)($element, _configJs.CUSTOM_NEXT_SLIDE_OUT_ATTRIBUTE, _configJs.CUSTOM_NEXT_SLIDE_OUT_DEFAULT),
        customPrevSlideIn: (0, _helperJs.getJsonAttrVals)($element, _configJs.CUSTOM_PREV_SLIDE_IN_ATTRIBUTE, _configJs.CUSTOM_PREV_SLIDE_IN_DEFAULT),
        customPrevSlideOut: (0, _helperJs.getJsonAttrVals)($element, _configJs.CUSTOM_PREV_SLIDE_OUT_ATTRIBUTE, _configJs.CUSTOM_PREV_SLIDE_OUT_DEFAULT),
        customXMultiplier: parseFloat($element.attr(_configJs.CUSTOM_X_MULTIPLIER_ATTRIBUTE) || _configJs.CUSTOM_X_MULTIPLIER_DEFAULT),
        customYMultiplier: parseFloat($element.attr(_configJs.CUSTOM_Y_MULTIPLIER_ATTRIBUTE) || _configJs.CUSTOM_Y_MULTIPLIER_DEFAULT),
        autoResizeTimeMultiplier1: parseFloat($element.attr(_configJs.AUTO_RESIZE_TIME_MULTIPLIER_1_ATTRIBUTE) || _configJs.AUTO_RESIZE_TIME_MULTIPLIER_1_DEFAULT),
        autoResizeTimeMultiplier2: parseFloat($element.attr(_configJs.AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_2_ATTRIBUTE) || _configJs.AUTO_RESIZE_TIME_MULTIPLIER_2_DEFAULT),
        autoResizeSuccessTimeMultiplier1: parseFloat($element.attr(_configJs.AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_1_ATTRIBUTE) || _configJs.AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_1_DEFAULT),
        autoResizeSuccessTimeMultiplier2: parseFloat($element.attr(_configJs.AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_2_ATTRIBUTE) || _configJs.AUTO_RESIZE_SUCCESS_TIME_MULTIPLIER_2_DEFAULT),
        maxSwipeScreenSize: parseInt($element.attr(_configJs.MAX_SWIPE_SCREEN_SIZE_ATTRIBUTE) || _configJs.MAX_SWIPE_SCREEN_SIZE_DEFAULT),
        minSwipeScreenSize: parseInt($element.attr(_configJs.MIN_SWIPE_SCREEN_SIZE_ATTRIBUTE) || _configJs.MIN_SWIPE_SCREEN_SIZE_DEFAULT),
        leftRightKeyEventInfinityAllowed: $element.attr(_configJs.LEFT_RIGHT_KEY_EVENT_INFINITY_ALLOWED_ATTRIBUTE) || _configJs.LEFT_RIGHT_KEY_EVENT_INFINITY_ALLOWED_DEFAULT,
        redirectMsTime: parseFloat($element.attr(_configJs.REDIRECT_MS_TIME_ATTRIBUTE) || _configJs.REDIRECT_MS_TIME_DEFAULT)
    };
    // Iterate over created object
    const cssShow = styles["cssShow"], cssHide = styles["cssHide"], cssBackForthActive = styles["cssBackForthActive"], cssBackForthInactive = styles["cssBackForthInactive"], cssActive = styles["cssActive"], cssInactive = styles["cssInactive"], customNextSlideIn = styles["customNextSlideIn"], customNextSlideOut = styles["customNextSlideOut"], customPrevSlideIn = styles["customPrevSlideIn"], customPrevSlideOut = styles["customPrevSlideOut"];
    // Format time ms time
    styles["animationSTime"] = styles["animationMsTime"] / 1000;
    // Set duration if not declared
    if (cssShow["duration"] == undefined) cssShow["duration"] = styles["animationSTime"];
    if (cssHide["duration"] == undefined) cssHide["duration"] = styles["animationSTime"];
    if (cssBackForthActive["duration"] == undefined) cssBackForthActive["duration"] = styles["animationSTime"];
    if (cssBackForthInactive["duration"] == undefined) cssBackForthInactive["duration"] = styles["animationSTime"];
    if (cssActive["duration"] == undefined) cssActive["duration"] = styles["animationSTime"];
    if (cssInactive["duration"] == undefined) cssInactive["duration"] = styles["animationSTime"];
    if (customNextSlideIn["duration"] == undefined) customNextSlideIn["duration"] = styles["animationSTime"];
    if (customNextSlideOut["duration"] == undefined) customNextSlideOut["duration"] = styles["animationSTime"];
    if (customPrevSlideIn["duration"] == undefined) customPrevSlideIn["duration"] = styles["animationSTime"];
    if (customPrevSlideOut["duration"] == undefined) customPrevSlideOut["duration"] = styles["animationSTime"];
    // Define submission time
    styles["submitMsTime1"] = parseFloat($element.attr(_configJs.SUBMIT_MS_TIME_1_ATTRIBUTE)) || styles["animationMsTime"];
    styles["submitMsTime2"] = parseFloat($element.attr(_configJs.SUBMIT_MS_TIME_2_ATTRIBUTE)) || styles["animationMsTime"];
    // Define submit animation type
    styles["submitHide"] = (0, _helperJs.getJsonAttrVals)($element, _configJs.SUBMIT_HIDE_ATTRIBUTE, cssHide);
    styles["submitShow"] = (0, _helperJs.getJsonAttrVals)($element, _configJs.SUBMIT_SHOW_ATTRIBUTE, {
        ...cssShow,
        duration: styles["animationSTime"] * 1.5
    });
    if (styles["submitHide"]["duration"] == undefined) styles["submitHide"]["duration"] = styles["submitMsTime1"] / 1000;
    if (styles["submitShow"]["duration"] == undefined) styles["submitShow"]["duration"] = styles["submitMsTime2"] / 1000;
    // Set css inactive
    styles["setCssInactive"] = (0, _helperJs.getJsonAttrVals)($element, _configJs.SET_CSS_INACTIVE_ATTRIBUTE, cssInactive);
    delete styles["setCssInactive"].duration;
    // Select / Deselect
    styles["cssSelect"] = (0, _helperJs.getJsonAttrVals)($element, _configJs.CSS_SELECT_ATTRIBUTE, cssActive);
    styles["cssDeselect"] = (0, _helperJs.getJsonAttrVals)($element, _configJs.CSS_DESELECT_ATTRIBUTE, cssInactive);
    // Error status CSS cssErrorStatusResolved
    styles["cssErrorStatus"] = (0, _helperJs.getJsonAttrVals)($element, _configJs.CSS_ERROR_STATUS_ATTRIBUTE, {
        duration: styles["animationSTime"]
    });
    styles["cssErrorStatusResolved"] = (0, _helperJs.getJsonAttrVals)($element, _configJs.CSS_ERROR_STATUS_RESOLVED_ATTRIBUTE, {
        duration: styles["animationSTime"]
    });
    if (styles["cssErrorStatus"]["borderColor"] == undefined) styles["cssErrorStatus"]["borderColor"] = styles["errorColor"];
    if (styles["cssErrorStatusResolved"]["borderColor"] == undefined) styles["cssErrorStatusResolved"]["borderColor"] = "";
    // Progress bar
    styles["progressBarAnimationSTime"] = parseFloat($element.attr(_configJs.PROGRESS_BAR_ANIMATION_MS_TIME_ATTRIBUTE) || styles["animationMsTime"]) / 1000;
    styles["progressBarAxis"] = $element.attr(_configJs.PROGRESS_BAR_AXIS_ATTRIBUTE) || _configJs.PROGRESS_BAR_AXIS_DEFAULT;
    // Anchor functionality
    styles["anchorAnimationSTime"] = parseFloat($element.attr(_configJs.ANCHOR_ANIMATION_MS_TIME_ATTRIBUTE) || styles["animationMsTime"]) / 1000;
    // Return
    return styles;
};

},{"../config.js":"k5Hzs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../helper.js":"lVRAz"}],"avjhP":[function(require,module,exports) {
// + Imports +
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _returnPathFloat = require("../helper/returnPathFloat");
var _returnPathFloatDefault = parcelHelpers.interopDefault(_returnPathFloat);
// + Classes +
class ProgressBarView {
    // Function
    update(stateData, isSubmit = false) {
        // Security return check
        if (stateData.elements.$progressBar.length < 1) return;
        // Values
        const pbAnimationtime = stateData.styles["progressBarAnimationSTime"], pbAxis = stateData.styles["progressBarAxis"].toLowerCase();
        // Values
        const percentageFloat = isSubmit ? 100 : (0, _returnPathFloatDefault.default)("longest", stateData.clickRecord, stateData.stepLogic); // Return longest path
        // Axis logic
        if ([
            "x",
            "x, y",
            "y, x"
        ].includes(pbAxis)) // X axis animation
        gsap.to(stateData.elements.progressBars, {
            width: percentageFloat + "%",
            duration: pbAnimationtime
        });
        if ([
            "y",
            "x, y",
            "y, x"
        ].includes(pbAxis)) // Y axis animation
        gsap.to(stateData.elements.progressBars, {
            height: percentageFloat + "%",
            duration: pbAnimationtime
        });
    }
}
// + Exports +
exports.default = new ProgressBarView();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../helper/returnPathFloat":"bvKWK"}],"bvKWK":[function(require,module,exports) {
// + Imports +
// + Exports +
// - Return longest or shortest path -
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(mode, clickRecord, stepLogic) {
    // Values
    const latestRecordId = clickRecord[clickRecord.length - 1].step, clickRecordLength = clickRecord.length;
    let min = stepLogic.length, max = 0, count = 0, tmpCount = 0, treeArray = [];
    // Loop function
    function objectLoop(object) {
        // Values
        let array = returnNextStepIds(object);
        // Math
        count++;
        tmpCount++;
        // Handle multi steps logic
        if (array.length > 1) {
            // a tree split
            treeArray.push(tmpCount);
            tmpCount = 0;
        }
        // Update values
        if (object.isLast) {
            // Update values
            max = Math.max(max, count);
            min = Math.min(min, count);
            count = 0;
            // Add base value to tree
            treeArray.forEach((n)=>{
                count += n;
            });
            // Trim back a leaf
            treeArray.pop();
            // Security conditional
            return;
        }
        // Action loop
        array.forEach((id, index)=>{
            // Iniciate loop
            objectLoop(stepLogic[id]);
        });
    }
    // Return buttons
    function returnNextStepIds(object) {
        // Value
        let arr = [];
        object.buttons.forEach((button)=>{
            if (arr.indexOf(button.nextStepId) === -1) arr.push(button.nextStepId);
        });
        // Return
        return arr;
    }
    // Intiliaze loop
    objectLoop(stepLogic[latestRecordId]);
    // Finetune math values
    min += clickRecordLength;
    max += clickRecordLength;
    // Logic
    if (mode == "shortest") {
        let x = clickRecordLength / min;
        return x * 100;
    } else {
        let x = clickRecordLength / max;
        return x * 100;
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2Yxx6":[function(require,module,exports) {
// + Imports +
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _configJs = require("../config.js");
// + Classes +
// - Anchor funcitonality -
class AnchorView {
    // Function
    functionality(stateData) {
        if (stateData.elements.$anchor.length == 1) {
            // Values
            let width = $(window).outerWidth(true), height = stateData.elements.$anchorYOffset.outerHeight(true) || 0;
            // If within specified scren size
            if (width <= stateData.anchorData.anchorMaxScreenSize && width >= stateData.anchorData.anchorMinScreenSize) gsap.to(stateData.elements.anchorScrollTarget, {
                scrollTo: {
                    y: `#anchor-element-${formBlockIndex}`,
                    offsetY: height
                },
                duration: stateData.anchorData.anchorAnimationTime
            });
        }
    }
    init(stateData) {
        // Values
        let anchorMinScreenSize = parseInt(stateData.elements.$anchor.attr(_configJs.ANCHOR_MIN_SCREEN_SIZE_ATTRIBUTE) || _configJs.ANCHOR_MIN_SCREEN_SIZE_DEFAULT), anchorMaxScreenSize = parseInt(stateData.elements.$anchor.attr(_configJs.ANCHOR_MAX_SCREEN_SIZE_ATTRIBUTE) || _configJs.ANCHOR_MAX_SCREEN_SIZE_DEFAULT), anchorAnimationTime = stateData.styles["anchorAnimationSTime"], anchorYOffsetSelector = stateData.elements.$anchor.attr(_configJs.ANCHOR_Y_OFF_SETSELECTOR_ATTRIBUTE);
        // Elements
        const $anchorYOffset = $(anchorYOffsetSelector);
        let anchorScrollTarget = document.querySelectorAll(stateData.elements.$anchor.attr(_configJs.ANCHOR_RELATED_ELEMENT_TO_SCROLL_SELECTOR_ATTRIBUTE));
        anchorScrollTarget = anchorScrollTarget.length > 0 ? anchorScrollTarget : window; // Give webflower full customizability
        // Dom preperation
        stateData.elements.$anchor.attr("id", `anchor-element-${stateData.formBlockIndex}`);
        // Enrich stateData
        stateData.anchorData = {
            anchorMinScreenSize: anchorMinScreenSize,
            anchorMaxScreenSize: anchorMaxScreenSize,
            anchorAnimationTime: anchorAnimationTime
        };
        stateData.elements.$anchorYOffset = $anchorYOffset;
        stateData.elements.anchorScrollTarget = anchorScrollTarget;
        // Function
        this.functionality(stateData);
    }
}
// + Exports +
exports.default = new AnchorView();

},{"../config.js":"k5Hzs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"igI8F":[function(require,module,exports) {
// + Imports +
// + Classes +
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class StepView {
    addHandlers(stateData) {
        // Find next
        stateData.handlers.findNextStep = this.#findNext(stateData, triggeredBySwipe, autoDetectNextStep);
        // Go to next
        stateData.handlers.goToNextStep = this.#goToNext(stateData, stepIndex, buttonIndex);
        // Go to prev
        stateData.handlers.goToPreviousStep = this.#goToPrev(stateData, triggeredBySwipe);
        // Submit form
        stateData.handlers.submit = this.#submitForm(stateData);
    }
    // - Find next -
    #findNext(triggeredBySwipe1 = false, autoDetectNextStep1 = true) {
        // Variables
        let currentStepId = clickRecord[clickRecord.length - 1].step, object = stepLogicObject[currentStepId];
        // Prevent swipe gestures when turned off on step
        if (triggeredBySwipe1 && object.swipeAllowed.toLowerCase() == "false") return;
         // Check if swipe gesture is allowed in stepLogicObject
        // Elements
        let $currentStep = object.$, $clickedButton = $currentStep.find(`[${markClickElementAttribute} = "true"]`), clickedButtonId = $clickedButton.attr(clickElementIdAttribute);
        // Logic
        if ($clickedButton.length == 1) {
            if (stepRequirementsPassed($formBlock, $currentStep)) goToNextStep(currentStepId, clickedButtonId);
        } else {
            // Select button number 1
            if (autoDetectNextStep1) selectButton(0, $currentStep, $formBlock);
            // Update next button
            updateNextButton(currentStepId);
        }
    }
    // - Go to next step -
    #goToNext(stepIndex1, buttonIndex1) {
        // Variable
        let nextStepId = stepLogicObject[stepIndex1].buttons[buttonIndex1].nextStepId;
        // Activate back button
        gsap.to(backButtons, stylesObject[formBlockIndex]["cssBackForthActive"]);
        // Submit if last step
        if (stepLogicObject[stepIndex1].isLast) submitForm();
        else {
            // Variables
            let $currentStep = stepLogicObject[stepIndex1].$;
            $nextStep = stepLogicObject[nextStepId].$;
            // Functions
            // Update click record
            clickRecord.push({
                step: nextStepId
            });
            // Call transition animation
            animateStepTransition($currentStep, $nextStep, $form, devMode);
            // Update next button
            updateNextButton(nextStepId);
            // Update progres bar
            updateProgressBar();
            // Perfomr anchor functionality
            anchorFunctionality();
        }
        // Dev mode
        if (devMode > 0.5) console.log(`Dev mode ${devMode}; Click record: `, clickRecord);
    }
    // - Go to prev step -
    #goToPrev(triggeredBySwipe2 = false) {
        // Variables
        let currentStepId = clickRecord[clickRecord.length - 1].step, prevStepId = clickRecord[Math.max(clickRecord.length - 2, 0)].step;
        // Prevent swipe gestures when turned off on step
        if (triggeredBySwipe2 && stepLogicObject[currentStepId].swipeAllowed.toLowerCase() == "false") return;
        // Prevent going before first step
        if (currentStepId != prevStepId) {
            // Elements
            let $currentStep = $form.find(`[${stepIndexAttribute} = "${currentStepId}"]`), $prevStep = $form.find(`[${stepIndexAttribute} = "${prevStepId}"]`);
            // Functions
            clickRecord.pop(); // Remove last element
            animateStepTransition($currentStep, $prevStep, $form, devMode);
        }
        if (clickRecord.length <= 1 && $backButton.length > 0) // Is approaching first step
        // Inactivate back button
        gsap.to(backButtons, stylesObject[formBlockIndex]["cssBackForthInactive"]);
        // Update next button
        updateNextButton(prevStepId);
        // Update progres bar
        updateProgressBar();
        // Perfomr anchor functionality
        anchorFunctionality();
        // Dev mode
        if (devMode > 0.5) console.log(`Dev mode ${devMode}; Click record: `, clickRecord);
    }
    // - - Submit Form - -
    #submitForm() {
        // - Requirement logic -
        // Variables
        let currentStepId = clickRecord[clickRecord.length - 1].step, object = stepLogicObject[currentStepId], $currentStep = object.$;
        // Request
        if (!stepRequirementsPassed($formBlock, $currentStep)) return false; // Break
        // Turn off keyboard form navigation
        keyEventsAllowed = false;
        // Remove all steps that are not part of the click record before submitting
        removeOtherSteps(stepLogicObject, clickRecord, $formBlock);
        // Initialize quiz mode
        initQuizMode($formBlock, clickRecord);
        // Update progress bar
        updateProgressBar(true);
        // Hide back & next buttons
        gsap.to([
            backButtons,
            nextButtons
        ], stylesObject[formBlockIndex]["cssHide"]);
        // Submit
        performVisualSubmit($formBlock, $form, devMode);
    }
}
// + Exports +
exports.default = new StepView();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iyspg":[function(require,module,exports) {
// + Imports +
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _config = require("../config");
// + Load helper +
// Allows for loading other scripts
jQuery.loadScript = function(url, callback) {
    jQuery.ajax({
        url: url,
        dataType: "script",
        success: callback,
        async: true
    });
};
// + Exports +
// Loader
exports.default = function(handler) {
    "undefined" == (0, _config.TYPEOF_GSAP_DEPENDENCY) ? $.loadScript("https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js", function() {
        loadGsap();
    }) : loadGsap();
    function loadGsap() {
        "undefined" == (0, _config.TYPEOF_GSAP_SCROLL_TO_DEPENDENCY) ? $.loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js", function() {
            loadGsapScrollTo();
        }) : loadGsapScrollTo();
    }
    function loadGsapScrollTo() {
        "undefined" == (0, _config.TYPEOF_HAMMER_JS_DEPENDENCY) ? $.loadScript("https://cdn.jsdelivr.net/gh/BarthMedia/js@main/ScrollToPlugin.min.js", function() {
            handler();
        }) : handler();
    }
};

},{"../config":"k5Hzs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cYr2M":[function(require,module,exports) {
// + Imports +
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _config = require("../config");
// + Exports +
// - - Create next steps object - -
exports.default = function($steps) {
    // Local variables
    let stepsObject = [];
    // Initialize stepsObject
    $steps.each(function(stepIndex) {
        // Local elements
        let $step = $(this), $buttons = $step.find(`[${_config.CLICK_ELEMENT_ID_ATTRIBUTE}]`), buttonsObject = [];
        $buttons.each(function() {
            // Element
            let $button = $(this);
            // Populate buttons object
            buttonsObject.push({
                id: $button.attr(_config.CLICK_ELEMENT_ID_ATTRIBUTE),
                conditional: $button.attr(_config.CONDITIONAL_ATTRIBUTE)
            });
        });
        // Populate steps object
        stepsObject.push({
            $: $step,
            step: stepIndex,
            swipeAllowed: $step.attr(_config.SWIPE_ALLOWED_ATTRIBUTE) || "true",
            conditional: $step.attr(_config.CONDITIONAL_ATTRIBUTE),
            conditionalNext: $step.attr(_config.CONDITIONAL_NEXT_ATTRIBUTE),
            buttons: buttonsObject
        });
    });
    // Add logic to stepsObject
    let stepsCount = stepsObject.length;
    stepsObject.forEach((step)=>{
        // Local val
        let stepIndex = step.step, relativeLast = step.$.attr(_config.RELATIVE_LAST_STEP_ATTRIBUTE);
        // Conditional last logic
        step.isLast = stepIndex == stepsCount - 1 ? true : false;
        if (relativeLast == "true") step.isLast = true;
        // Next id logic
        step.buttons.forEach((button)=>{
            if (button.conditional != undefined) button.nextStepId = (()=>{
                for (step of stepsObject){
                    if (step.conditional == button.conditional) return step.step;
                }
            })();
            else if (step.conditionalNext != undefined) button.nextStepId = stepIndex + 1;
            else button.nextStepId = (()=>{
                for (step of stepsObject){
                    if (step.step > stepIndex && step.conditional == undefined) return step.step;
                }
            })();
        });
    });
    return stepsObject;
};

},{"../config":"k5Hzs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["d8XZh","aenu9"], "aenu9", "parcelRequire1c1c")

//# sourceMappingURL=index.e37f48ea.js.map
