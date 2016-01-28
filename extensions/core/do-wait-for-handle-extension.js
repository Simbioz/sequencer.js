var DoWaitForHandleTask = function (handleToWaitFor) {
    this.perform = function (handle) {
        if (handleToWaitFor.isReleased) {
            handle.release();
            return;
        }
        handleToWaitFor.addOnReleaseHandler(handle.release);
    };
    this.cancel = function (handle) {
        handle.release();
    }
};

Sequencer.prototype.doWaitForHandle = function (handleToWaitFor) {
    this.push(new DoWaitForHandleTask(handleToWaitFor));
    return this;
};