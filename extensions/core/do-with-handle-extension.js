var DoWithHandleTask = function (action) {
    this.perform = function (handle) { action(handle); };
};

Sequencer.prototype.doWithHandle = function(action) {
    this.push(new DoWithHandleTask(action));
    return this;
};