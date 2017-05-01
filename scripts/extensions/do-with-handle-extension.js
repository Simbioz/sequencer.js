let DoWithHandleTask = function (action) {
  this.perform = function (handle) {
    action(handle);
  };
  this.cancel = function (handle) {
    handle.release();
  };
};

module.exports = {
  extend: function (sequencerPrototype) {
    sequencerPrototype.doWithHandle = function (action) {
      this.push(new DoWithHandleTask(action));
      return this;
    };
  }
};
