let Sequencer = require("../sequencer");

let DoSequenceTask = function (action) {
  let that = this;

  this.sequencer = new Sequencer();

  this.perform = function (handle) {
    action(that.sequencer); // Let the caller enqueue his own subtasks
    that.sequencer.do(handle.release); // Enqueue a final task to release the sequence task's handle
  };
  this.cancel = function (handle) {
    that.sequencer.clear();
    handle.release();
  };
};

module.exports = {
  extend: function (sequencerPrototype) {
    sequencerPrototype.doSequence = function (action) {
      this.push(new DoSequenceTask(action));
      return this;
    };
  }
};
