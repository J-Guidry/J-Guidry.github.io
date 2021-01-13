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
})({"live/todolist/script.js":[function(require,module,exports) {
// require('~bootstrap/dist/css/bootstrap.min.css');
// Todo List
//Data
var todoList = {
  todos: [],
  createStorage: function createStorage() {
    localStorage.setItem("todoArray", JSON.stringify(todoList.todos));
  },
  getTodos: function getTodos() {
    var todoStorage = JSON.parse(localStorage.getItem("todoArray"));
    todoArr = todoStorage;
    return todoArr;
  },
  setTodos: function setTodos(todoArr) {
    localStorage.setItem("todoArray", JSON.stringify(todoArr));
  },
  addTodo: function addTodo(todoText) {
    this.getTodos();
    todoArr.push({
      todoText: todoText,
      completed: false
    });
    this.setTodos(todoArr);
  },
  changeTodo: function changeTodo(position, todoText) {
    this.getTodos();
    todoArr[position].todoText = todoText;
    this.setTodos(todoArr);
  },
  deleteTodo: function deleteTodo(position) {
    this.getTodos();
    todoArr.splice(position, 1);
    this.setTodos(todoArr);
  },
  toggleCompleted: function toggleCompleted(position) {
    this.getTodos();
    var todo = todoArr[position];
    todo.completed = !todo.completed;
    this.setTodos(todoArr);
  },
  toggleAll: function toggleAll() {
    this.getTodos();
    var totalTodos = todoArr.length;
    var completedTodos = 0; //Get number of completed todos

    todoArr.forEach(function (todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    todoArr.forEach(function (todo) {
      // Case 1: If everything's true, make everything false
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        // Case 2: Otherwise, make everything true
        todo.completed = true;
      }
    });
    this.setTodos(todoArr);
  }
};
var view = {
  displayTodos: function displayTodos() {
    //render
    var todosUl = document.querySelector("#todolist");
    todosUl.innerHTML = "";
    var toggleIcon = "<i class='fa fa-circle-o fa-lg'></i>";
    var completedIcon = "<i class='fa fa-check-circle-o fa-lg'></i>";
    todoList.getTodos();

    if (todoArr == undefined || null) {
      todoList.createStorage();
    }

    todoArr.forEach(function (todo, position) {
      var todoLi = document.createElement("li");
      var todoTextWithCompletion = "";

      if (todo.completed === true) {
        todoTextWithCompletion = completedIcon + todo.todoText;
        todoLi.classList.toggle("completed");
      } else {
        todoTextWithCompletion = toggleIcon + todo.todoText;
      }

      todoLi.id = position;
      todoLi.innerHTML = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteIcon());
      todosUl.appendChild(todoLi);
    }, this);
    todoList.setTodos(todoArr);
  },
  createDeleteIcon: function createDeleteIcon() {
    var deleteIcon = document.createElement("i");
    deleteIcon.id = "delete";
    deleteIcon.className = "fa fa-times fa-lg";
    return deleteIcon;
  },
  addTodo: function addTodo(value) {
    var todosUl = document.querySelector("#todolist");
    var toggleIcon = "<i class='fa fa-circle-o fa-lg'></i>";
    var todoLi = document.createElement("li");
    var todoTextWithCompletion = "";
    todoTextWithCompletion = toggleIcon + value;
    todoLi.innerHTML = todoTextWithCompletion;
    todoLi.appendChild(this.createDeleteIcon());
    todosUl.appendChild(todoLi);
  },
  changeTextToEdit: function changeTextToEdit(todoText) {
    var input = document.createElement("input");
    input.value = todoText.textContent;
    input.maxLength = "22";
    todoText.parentNode.replaceChild(input, todoText);
    input.id = "input";
    input.focus();
    return input;
  },
  changeEditToText: function changeEditToText(todoText, input) {
    input.parentNode.replaceChild(todoText, input);
  },
  getInput: function getInput() {
    var addTodoTextInput = document.getElementById("addTodoTextInput").value;
    return addTodoTextInput;
  },
  deleteTodo: function deleteTodo(todo) {
    todo.remove();
  },
  toggleCompleted: function toggleCompleted(todo, completed, uncompleted) {
    icon = document.createElement("i");

    if (!(todo.className === "completed")) {
      icon.className = completed;
      todo.replaceChild(icon, todo.childNodes[0]);
      todo.classList.toggle("completed");
    } else {
      icon.className = uncompleted;
      todo.replaceChild(icon, todo.childNodes[0]);
      todo.classList.toggle("completed");
    }
  },
  toggleAll: function toggleAll(listItems, completed, uncompleted) {
    listItems.forEach(function (todo) {
      icon = document.createElement("i");

      if (!(todo.className === "completed")) {
        icon.className = completed;
        todo.replaceChild(icon, todo.childNodes[0]);
        todo.classList.toggle("completed");
      } else {
        icon.className = uncompleted;
        todo.replaceChild(icon, todo.childNodes[0]);
        todo.classList.toggle("completed");
      }
    });
  }
};
var controller = {
  setEventListeners: function setEventListeners() {
    var todosUl = document.querySelector("#todolist");
    var addTodo = document.querySelector("#addTodoTextInput");
    var checked = "fa fa-check-circle-o fa-lg";
    var unchecked = "fa fa-circle-o fa-lg";
    todosUl.addEventListener("click", function (event) {
      controller.deleteTodo(event);
      controller.toggleCompleted(event);
    });
    todosUl.addEventListener("dblclick", this.editTodo);
    addTodo.addEventListener("keydown", function (event) {
      if (event.which === 13) {
        controller.addTodo(event);
      }
    });
  },
  addTodo: function addTodo(event) {
    var input = view.getInput();
    todoList.addTodo(input);
    addTodoTextInput.value = '';
    view.addTodo(input); //view.displayTodos();
  },
  editTodo: function editTodo(event) {
    var elementClicked = event.target;
    var todoText = elementClicked.childNodes[1];

    if (todoText) {
      var input = view.changeTextToEdit(todoText);
      input.addEventListener("keydown", function (event) {
        var todoIndex = elementClicked.id;

        if (event.which === 13 || event.keyCode === 13) {
          todoText.textContent = input.value;
          this.blur();
          todoList.changeTodo(parseInt(todoIndex), input.value); //data change
        } else if (event.which === 27 || event.keyCode === 27) {
          this.blur();
        }
      });
      input.addEventListener("blur", function (event) {
        view.changeEditToText(todoText, input);
      });
    }
  },
  deleteTodo: function deleteTodo(event) {
    var elementClicked = event.target;
    var todoIndex = elementClicked.parentNode.id;

    if (elementClicked.id === "delete") {
      todoList.deleteTodo(todoIndex);
      view.deleteTodo(elementClicked.parentNode);
    }
  },
  toggleCompleted: function toggleCompleted(todoIndex) {
    var checked = "fa fa-check-circle-o fa-lg";
    var unchecked = "fa fa-circle-o fa-lg";
    var elementClicked = event.target;
    var todoIndex = elementClicked.parentNode.id;

    if (elementClicked.className === unchecked || elementClicked.className === checked) {
      todoList.toggleCompleted(parseInt(todoIndex));
      view.toggleCompleted(elementClicked.parentNode, checked, unchecked);
    }
  },
  toggleAll: function toggleAll() {
    var checked = "fa fa-check-circle-o fa-lg";
    var unchecked = "fa fa-circle-o fa-lg";
    todoList.toggleAll();
    var todosUl = document.querySelector("#todolist");
    view.toggleAll(todosUl.childNodes, checked, unchecked);
  },
  init: function init() {
    controller.setEventListeners();
    view.displayTodos();
  }
};
controller.init();
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","live/todolist/script.js"], null)
//# sourceMappingURL=/script.5bef83b4.js.map