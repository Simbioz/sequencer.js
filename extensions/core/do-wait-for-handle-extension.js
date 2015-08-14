var DoWaitForHandleTask = function (handle) {
    this.perform = function (sequencer_handle) {
        if (handle.isReleased) {
            sequencer_handle.release();
            return;
        }
        handle.addOnReleaseHandler(sequencer_handle.release);
    };
};

Sequencer.prototype.doWaitForHandle = function (handle) {
    this.push(new DoWaitForHandleTask(handle));
    return this;
};