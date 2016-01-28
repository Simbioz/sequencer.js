var DoWaitTask = function (duration) {
    var timeout = null;
    this.perform = function (handle) {
        timeout = setTimeout(handle.release, duration);
    };
    this.cancel = function (handle) {
        if (timeout !== null) clearTimeout(timeout); 
        handle.release();
    };
};

Sequencer.prototype.doWait = function (duration) {
    this.push(new DoWaitTask(duration));
    return this;
};