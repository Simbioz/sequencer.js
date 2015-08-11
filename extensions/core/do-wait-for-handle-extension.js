var WaitForHandleTask = function (action) {
    this.perform = function (handle) { action(handle); };
};

Sequencer.prototype.doWaitForHandle = function(action) {
    this.push(new WaitForHandleTask(action));
    return this;
};