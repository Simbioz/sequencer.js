var DoWithHandleTask = function (action) {
    this.perform = function (handle) { action(handle); };
    this.cancel = function (handle) { handle.release(); };
};

Sequencer.prototype.doWithHandle = function(action) {
    this.push(new DoWithHandleTask(action));
    return this;
};