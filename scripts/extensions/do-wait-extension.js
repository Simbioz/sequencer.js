let DoWaitTask = function (duration) {
  let timeout = null;
  this.perform = function (handle) {
    timeout = setTimeout(handle.release, duration);
  };
  this.cancel = function (handle) {
    if (timeout !== null) clearTimeout(timeout);
    handle.release();
  };
};

module.exports = {
  extend: function (sequencerPrototype) {
    sequencerPrototype.doWait = function (duration) {
      this.push(new DoWaitTask(duration));
      return this;
    };
  }
};
