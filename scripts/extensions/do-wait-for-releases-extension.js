let CounterHandle = require("handles.js").CounterHandle;

let DoWaitForReleasesTask = function (count, action) {
  let that = this;

  this.counterHandle = new CounterHandle(count);

  this.perform = function (handle) {
    // When the counter handle is released for the last time, the sequencer handle is released too.
    that.counterHandle.addOnReleaseHandler(handle.release);

    // The caller is provided with the CounterHandle release() function directly.
    // The use of a CounterHandle is an internal implementation detail.
    action(that.counterHandle.release);
  };
  this.cancel = function (handle) {
    that.counterHandle.releaseAll();
  };
};

module.exports = {
  extend: function (sequencerPrototype) {
    sequencerPrototype.doWaitForReleases = function (count, action) {
      this.push(new DoWaitForReleasesTask(count, action));
      return this;
    };
  }
};
