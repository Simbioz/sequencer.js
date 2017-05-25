let DoWaitForReleaseTask = function (action) {
  this.perform = function (handle) {
    // The caller is provided with the release() function directly.
    // The use of an handle is an internal implementation detail.
    action(handle.release);
  };
  this.cancel = function (handle) {
    handle.release();
  };
};

module.exports = {
  extend: function (sequencerPrototype) {
    sequencerPrototype.doWaitForRelease = function (action) {
      this.push(new DoWaitForReleaseTask(action));
      return this;
    };
  }
};
