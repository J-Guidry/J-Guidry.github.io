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
})({"live/calculator/index.js":[function(require,module,exports) {
var dataAndOperations = {
  setNumber: function setNumber(number) {
    this.dataNumber = number;
  },
  setNextNumber: function setNextNumber(nextNumber) {
    this.dataNextNumber = nextNumber;
  },
  setOperator: function setOperator(operator) {
    this.operator = operator;
  },
  performOperation: function performOperation() {
    if (this.dataNextNumber || this.dataNextNumber === 0) {
      var operator = this.operator;

      if (operator === "+") {
        var result = this.dataNumber + this.dataNextNumber;
        dataAndOperations.result = result;
        this.clear();
        return result;
      } else if (operator === "-") {
        var _result = this.dataNumber - this.dataNextNumber;

        dataAndOperations.result = _result;
        this.clear();
        return _result;
      } else if (operator === "×" || operator === "*") {
        var _result2 = this.dataNumber * this.dataNextNumber;

        dataAndOperations.result = _result2;
        this.clear();
        return _result2;
      } else if (operator === "÷" || operator === "/") {
        if (dataAndOperations.dataNextNumber === 0) {
          var _result3 = "Cannot Divide by Zero";
          dataAndOperations.result = _result3;
          this.clear();
          console.log("dividing by zero");
        } else {
          var _result4 = this.dataNumber / this.dataNextNumber;

          dataAndOperations.result = _result4;
          this.clear();
        }
      }
    }
  },
  clear: function clear() {
    this.dataNumber = "";
    this.dataNextNumber = "";
    this.operator = "";
  },
  clearAll: function clearAll() {
    this.dataNumber = "";
    this.dataNextNumber = "";
    this.operator = "";
    this.result = "";
  }
};
var UI = {
  DOMstrings: {
    numbers: ".number",
    operators: ".operator",
    display: ".display",
    equals: ".equals",
    clear: ".erase"
  },
  state: document.querySelector('.display'),
  getSelection: function getSelection(event) {
    var selection = event.target.textContent;
    return selection;
  },
  displayNumber: function displayNumber(number) {
    this.state.children[1].textContent += number;
    var displayedNumber = this.state.children[1].textContent;
    return displayedNumber;
  },
  displayOperator: function displayOperator(operator) {
    this.state.children[0].children[0].textContent = this.state.children[1].textContent;
    this.state.children[1].textContent = "";
    this.state.children[0].children[0].textContent += operator;
  },
  calculate: function calculate(result) {
    this.state.children[0].children[0].textContent = "";
    this.state.children[1].textContent = result;
  },
  clear: function clear() {
    this.state.children[0].children[0].textContent = "";
    this.state.children[1].textContent = "";
  }
};
var controller = {
  setEventListeners: function setEventListeners() {
    var DOM = UI.DOMstrings; //select number

    document.querySelectorAll(DOM.numbers).forEach(function (number) {
      number.addEventListener("click", controller.selectNumber);
    }); //select operator

    document.querySelectorAll(DOM.operators).forEach(function (operator) {
      operator.addEventListener("click", controller.selectOperator);
    }); //keybord input

    var keyCodeList = {
      48: 0,
      49: 1,
      50: 2,
      51: 3,
      52: 4,
      53: 5,
      54: 6,
      55: 7,
      56: 8,
      57: 9
    };
    document.querySelector("body").addEventListener("keydown", function (event) {
      for (var key in keyCodeList) {
        if (parseInt(event.key) === keyCodeList[key]) {
          controller.selectNumber(keyCodeList[key]);
        }
      }

      switch (event.key) {
        case "+":
          controller.selectOperator(event.key);
          break;

        case "-":
          controller.selectOperator(event.key);
          break;

        case "*":
          controller.selectOperator(event.key);
          break;

        case "/":
          controller.selectOperator(event.key);
          break;

        case "=":
          controller.calculate();
          break;

        case "Enter":
          controller.calculate();
          break;

        case "Escape":
          controller.clear();
          break;

        default:
          //Do Nothing
          break;
      }
    }); //calculate result

    document.querySelector(DOM.equals).addEventListener("click", controller.calculate); //clear data and UI

    document.querySelector(DOM.clear).addEventListener("click", controller.clear);
  },
  selectNumber: function selectNumber(event) {
    if (typeof event !== "number") {
      var number = UI.getSelection(event);
      var displayedNumber = UI.displayNumber(number);

      if (!dataAndOperations.dataNumber || !dataAndOperations.operator) {
        var parsedNumber = parseInt(displayedNumber);
        dataAndOperations.setNumber(parsedNumber);
      } else if (dataAndOperations.dataNumber || dataAndOperations.dataNumber !== 0) {
        var _parsedNumber = parseInt(displayedNumber);

        dataAndOperations.setNextNumber(_parsedNumber);
      }
    } else {
      var _displayedNumber = UI.displayNumber(event);

      if (!dataAndOperations.dataNumber && dataAndOperations.dataNumber !== 0 || !dataAndOperations.operator) {
        var _parsedNumber2 = parseInt(_displayedNumber);

        dataAndOperations.setNumber(_parsedNumber2);
      } else if (dataAndOperations.dataNumber || dataAndOperations.dataNumber === 0) {
        var _parsedNumber3 = parseInt(_displayedNumber);

        dataAndOperations.setNextNumber(_parsedNumber3);
      }
    }
  },
  selectOperator: function selectOperator(event) {
    if (typeof event !== "string") {
      var operator = UI.getSelection(event);
      controller.chainOperations(operator);
    } else {
      controller.chainOperations(event);
    }
  },
  chainOperations: function chainOperations(operator) {
    if (!dataAndOperations.result && !dataAndOperations.dataNumber && !dataAndOperations.dataNextNumber) {
      console.log("first number is zero automatically if a number isn't chosen but operator is clicked");
      var displayedNumber = UI.displayNumber("0");
      dataAndOperations.setNumber(0);
      UI.displayOperator(operator);
      dataAndOperations.setOperator(operator);
    } else if (!dataAndOperations.result && (dataAndOperations.dataNumber || dataAndOperations.dataNumber === 0) && !dataAndOperations.dataNextNumber) {
      console.log("normal condition: set operator after first number is chosen");
      UI.displayOperator(operator);
      dataAndOperations.setOperator(operator);
    } else if (dataAndOperations.result && !dataAndOperations.dataNumber && !dataAndOperations.dataNextNumber) {
      console.log("result exists and both numbers are empty and operator is selected");
      UI.displayOperator(operator);
      dataAndOperations.setNumber(dataAndOperations.result);
      dataAndOperations.result = "";
      dataAndOperations.setOperator(operator);
    } else if (dataAndOperations.result && !dataAndOperations.dataNumber && dataAndOperations.dataNextNumber) {
      console.log("result exists but first number is empty, 2nd exists");
      UI.displayOperator(operator);
      console.log("result:" + dataAndOperations.result);
      dataAndOperations.setNumber(dataAndOperations.result);
      dataAndOperations.result = "";
      controller.calculate();
      dataAndOperations.setOperator(operator);
      UI.displayOperator(operator);
    } else if (dataAndOperations.result && (dataAndOperations.dataNumber || dataAndOperations.dataNumber === 0) && !dataAndOperations.dataNextNumber) {
      console.log("result exists but second number is empty, 1st exists");
      UI.displayOperator(operator);
      dataAndOperations.setNextNumber(dataAndOperations.result);
      dataAndOperations.result = "";
      controller.calculate();
      dataAndOperations.setOperator(operator);
      UI.displayOperator(operator);
    } else if ((dataAndOperations.dataNumber || dataAndOperations.dataNumber === 0) && dataAndOperations.dataNextNumber) {
      console.log("both numbers are selected and another operator is chosen.");
      UI.displayOperator(operator);
      controller.calculate();
      dataAndOperations.setOperator(operator);
      UI.displayOperator(operator);
    }
  },
  calculate: function calculate() {
    if ((dataAndOperations.dataNumber || dataAndOperations.dataNumber === 0) && (dataAndOperations.dataNextNumber || dataAndOperations.dataNextNumber === 0) && dataAndOperations.operator) {
      dataAndOperations.performOperation();
      UI.calculate(dataAndOperations.result);
    } else if (dataAndOperations.result && dataAndOperations.dataNumber && !dataAndOperations.dataNextNumber) {
      //result exists but second number is empty, 1st exists
      dataAndOperations.setNextNumber(dataAndOperations.result);
      dataAndOperations.result = "";
      dataAndOperations.performOperation();
      UI.calculate(dataAndOperations.result);
    }
  },
  clear: function clear() {
    dataAndOperations.clearAll();
    UI.clear();
  }
};
controller.setEventListeners();
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51097" + '/');

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
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","live/calculator/index.js"], null)
//# sourceMappingURL=/calculator.58889b08.js.map