let DoWaitTask = function (duration) {
  let that = this;

  this.timeout = null;

  this.perform = function (handle) {
    if (duration < 0.00001) {
      handle.release();
      return;
    }
    that.timeout = setTimeout(handle.release, duration);
  };
  this.cancel = function (handle) {
    if (that.timeout !== null) clearTimeout(that.timeout);
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
