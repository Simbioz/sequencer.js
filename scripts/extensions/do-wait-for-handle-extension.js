let DoWaitForHandleTask = function (handleToWaitFor) {
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
  extend: function (sequencerPrototype) {
    sequencerPrototype.doWaitForHandle = function (handleToWaitFor) {
      this.push(new DoWaitForHandleTask(handleToWaitFor));
      return this;
    };
  }
}
