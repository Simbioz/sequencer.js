let DoTask = function (action) {
  this.perform = function (handle) {
    action();
    handle.release();
  };
};

module.exports = {
  extend: function (sequencerPrototype) {
    sequencerPrototype.do = function (action) {
      this.push(new DoTask(action));
      return this;
    };
  }
};
