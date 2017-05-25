module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	
	var Handle = __webpack_require__(3);
	
	var Sequencer = function Sequencer() {
	  var sequence = [];
	  var currentTask = null;
	  var currentHandle = null;
	  var processing = false;
	
	  this.push = function (task) {
	    sequence.push(task);
	    resumeProcessing();
	  };
	
	  this.clear = function () {
	    sequence = [];
	    if (currentTask !== null && typeof currentTask.cancel !== "undefined") {
	      currentTask.cancel(currentHandle);
	    }
	  };
	
	  function resumeProcessing() {
	    if (processing) return;
	    processing = true;
	    process();
	  }
	
	  function finishProcessing() {
	    if (sequence.length !== 0) return false;
	    processing = false;
	    return true;
	  }
	
	  function process() {
	    if (finishProcessing()) return;
	
	    // When the handle is released, we'll process the next task
	    var handle = new Handle(function () {
	      currentTask = null;
	      currentHandle = null;
	      process();
	    });
	
	    // Perform the next task, providing it with the handle it can
	    // release to signify that its job is done
	    var task = sequence.shift();
	    currentTask = task;
	    currentHandle = handle;
	    task.perform(handle);
	  }
	};
	
	__webpack_require__(4).extend(Sequencer.prototype);
	__webpack_require__(5).extend(Sequencer.prototype);
	__webpack_require__(6).extend(Sequencer.prototype);
	__webpack_require__(7).extend(Sequencer.prototype);
	__webpack_require__(8).extend(Sequencer.prototype);
	__webpack_require__(9).extend(Sequencer.prototype);
	
	Sequencer.Handle = Handle; // Expose the Handle type in the API
	
	module.exports = Sequencer;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
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
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
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
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	
	var Handle = function Handle(onRelease) {
	  var that = this;
	  var onReleaseHandlers = [];
	
	  if (!(typeof onRelease === "undefined")) onReleaseHandlers.push(onRelease);
	
	  function callReleaseHandlers() {
	    onReleaseHandlers.forEach(function (handler) {
	      return handler();
	    });
	  }
	
	  this.isReleased = false;
	
	  this.addOnReleaseHandler = function (handler) {
	    onReleaseHandlers.push(handler);
	  };
	
	  this.release = function () {
	    if (that.isReleased) return;
	    that.isReleased = true;
	    callReleaseHandlers();
	  };
	};
	
	module.exports = Handle;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";
	
	var DoTask = function DoTask(action) {
	  this.perform = function (handle) {
	    action();
	    handle.release();
	  };
	};
	
	module.exports = {
	  extend: function extend(sequencerPrototype) {
	    sequencerPrototype.do = function (action) {
	      this.push(new DoTask(action));
	      return this;
	    };
	  }
	};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	
	var DoWaitTask = function DoWaitTask(duration) {
	  var that = this;
	
	  this.timeout = null;
	
	  this.perform = function (handle) {
	    that.timeout = setTimeout(handle.release, duration);
	  };
	  this.cancel = function (handle) {
	    if (that.timeout !== null) clearTimeout(that.timeout);
	    handle.release();
	  };
	};
	
	module.exports = {
	  extend: function extend(sequencerPrototype) {
	    sequencerPrototype.doWait = function (duration) {
	      this.push(new DoWaitTask(duration));
	      return this;
	    };
	  }
	};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";
	
	var DoWaitForHandleTask = function DoWaitForHandleTask(handleToWaitFor) {
	  this.perform = function (handle) {
	    if (handleToWaitFor.isReleased) {
	      handle.release();
	      return;
	    }
	    handleToWaitFor.addOnReleaseHandler(handle.release);
	  };
	  this.cancel = function (handle) {
	    handle.release();
	  };
	};
	
	module.exports = {
	  extend: function extend(sequencerPrototype) {
	    sequencerPrototype.doWaitForHandle = function (handleToWaitFor) {
	      this.push(new DoWaitForHandleTask(handleToWaitFor));
	      return this;
	    };
	  }
	};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";
	
	// May require an ES6 promises polyfill such as "es6-promise", depending on the environment
	
	var DoWaitForPromiseTask = function DoWaitForPromiseTask(promise, onFulfilled, onRejected) {
	  this.perform = function (handle) {
	    promise.then(function (value) {
	      if (typeof onFulfilled !== "undefined") onFulfilled(value);
	      handle.release();
	    }, function (reason) {
	      if (typeof onRejected !== "undefined") onRejected(reason);
	      handle.release();
	    });
	  };
	  this.cancel = function (handle) {
	    // Allows monkey-patching an ES6 promise with a cancel function that will
	    // automatically be invoked by the sequencer when it cancels this task.
	    // Details: http://stackoverflow.com/a/25346945/167983
	    if (typeof promise.cancel !== "undefined") promise.cancel();
	    handle.release();
	  };
	};
	
	module.exports = {
	  extend: function extend(sequencerPrototype) {
	    sequencerPrototype.doWaitForPromise = function (promise, onFulfilled, onRejected) {
	      this.push(new DoWaitForPromiseTask(promise, onFulfilled, onRejected));
	      return this;
	    };
	  }
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";
	
	var DoWaitForRelease = function DoWaitForRelease(action) {
	  this.perform = function (handle) {
	    // The caller is provided with the release() function directly.
	    // The use of an handle is an internal implementation detail.
	    action(handle.release);
	  };
	  this.cancel = function (handle) {
	    handle.release();
	  };
	};
	
	module.exports = {
	  extend: function extend(sequencerPrototype) {
	    sequencerPrototype.doWaitForRelease = function (action) {
	      this.push(new DoWaitForRelease(action));
	      return this;
	    };
	  }
	};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var CounterHandle = __webpack_require__(10);
	
	var DoWaitForReleases = function DoWaitForReleases(count, action) {
	  var that = this;
	
	  this.counterHandle = new CounterHandle(count);
	
	  this.perform = function (handle) {
	    // When the counter handle is released for the last time, the sequencer handle is released too.
	    that.counterHandle.addOnReleaseHandler(handle.release);
	
	    // The caller is provided with the CounterHandle release() function directly.
	    // The use of a CounterHandle is an internal implementation detail.
	    action(that.counterHandle.release);
	  };
	  this.cancel = function (handle) {
	    that.counterHandle.releaseAll();
	  };
	};
	
	module.exports = {
	  extend: function extend(sequencerPrototype) {
	    sequencerPrototype.doWaitForReleases = function (count, action) {
	      this.push(new DoWaitForReleases(count, action));
	      return this;
	    };
	  }
	};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	"use strict";
	
	var CounterHandle = function CounterHandle(count, onRelease) {
	  var that = this;
	  var onReleaseHandlers = [];
	
	  if (count === 0) throw new Error("Count must be greater than zero!");
	
	  if (!(typeof onRelease === "undefined")) onReleaseHandlers.push(onRelease);
	
	  function callReleaseHandlers() {
	    onReleaseHandlers.forEach(function (handler) {
	      return handler();
	    });
	  }
	
	  this.isReleased = false;
	  this.releaseCount = 0;
	
	  this.addOnReleaseHandler = function (handler) {
	    onReleaseHandlers.push(handler);
	  };
	
	  this.release = function () {
	    if (that.isReleased) return;
	    that.releaseCount += 1;
	    if (that.releaseCount === count) {
	      that.isReleased = true;
	      callReleaseHandlers();
	    }
	  };
	
	  this.releaseAll = function () {
	    if (that.isReleased) return;
	    that.isReleased = true;
	    callReleaseHandlers();
	  };
	};
	
	module.exports = CounterHandle;

/***/ })
/******/ ]);
//# sourceMappingURL=sequencer.js.map