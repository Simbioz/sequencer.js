let Handle = require("./handle");

let Sequencer = function () {
  let sequence = [];
  let currentTask = null;
  let currentHandle = null;
  let processing = false;

  this.push = function (task) {
    sequence.push(task);
    resumeProcessing();
  };

  this.clear = function () {
    sequence = [];
    if (currentTask !== null && typeof (currentTask.cancel) !== "undefined") {
      currentTask.cancel(currentHandle);
    }
  };

  function resumeProcessing() {
    if (processing) return;
    processing = true;
    process();
  }

  function finishProcessing() {
    if (sequence.length !== 0) return false;
    processing = false;
    return true;
  }

  function process() {
    if (finishProcessing()) return;

    // When the handle is released, we'll process the next task
    let handle = new Handle(function () {
      currentTask = null;
      currentHandle = null;
      process();
    });

    // Perform the next task, providing it with the handle it can
    // release to signify that its job is done
    let task = sequence.shift();
    currentTask = task;
    currentHandle = handle;
    task.perform(handle);
  }
};

require("./extensions/do-extension").extend(Sequencer.prototype);
require("./extensions/do-wait-extension").extend(Sequencer.prototype);
require("./extensions/do-wait-for-handle-extension").extend(Sequencer.prototype);
require("./extensions/do-wait-for-promise-extension").extend(Sequencer.prototype);
require("./extensions/do-wait-for-release-extension").extend(Sequencer.prototype);
require("./extensions/do-wait-for-releases-extension").extend(Sequencer.prototype);

Sequencer.Handle = Handle; // Expose the Handle type in the API

module.exports = Sequencer;
