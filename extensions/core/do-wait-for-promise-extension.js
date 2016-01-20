var DoWaitForPromiseTask = function (promise, onFulfilled, onRejected) {
    this.perform = function (handle) {
        promise.then(function (value) {
            if (typeof(onFulfilled) !== 'undefined') onFulfilled(value);
            handle.release();
        }, function (reason) {
            if (typeof(onRejected) !== 'undefined') onRejected(reason);
            handle.release();
        });
    };
};

Sequencer.prototype.doWaitForPromise = function (promise, onFulfilled, onRejected) {
    this.push(new DoWaitForPromiseTask(promise, onFulfilled, onRejected));
    return this;
};