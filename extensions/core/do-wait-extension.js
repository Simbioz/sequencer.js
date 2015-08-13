var DoWaitTask = function (duration) {
    this.perform = function (handle) { setTimeout(handle.release, duration); };
};

Sequencer.prototype.doWait = function (duration) {
    this.push(new DoWaitTask(duration));
    return this;
};