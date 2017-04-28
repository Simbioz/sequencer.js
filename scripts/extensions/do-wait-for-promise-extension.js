// May require an ES6 promises polyfill such as "es6-promise", depending on the environment

let DoWaitForPromiseTask = function (promise, onFulfilled, onRejected) {
  this.perform = function (handle) {
    promise.then(function (value) {
      if (typeof (onFulfilled) !== "undefined") onFulfilled(value);
      handle.release();
    }, function (reason) {
      if (typeof (onRejected) !== "undefined") onRejected(reason);
      handle.release();
    });
  };
  this.cancel = function (handle) {
    // Allows monkey-patching an ES6 promise with a cancel function that will
    // automatically be invoked by the sequencer when it cancels this task.
    // Details: http://stackoverflow.com/a/25346945/167983
    if (typeof (promise.cancel) !== "undefined") promise.cancel();
    handle.release();
  };
};

module.exports = {
  extend: function (sequencerPrototype) {
    sequencerPrototype.doWaitForPromise = function (promise, onFulfilled, onRejected) {
      this.push(new DoWaitForPromiseTask(promise, onFulfilled, onRejected));
      return this;
    };
  }
};
