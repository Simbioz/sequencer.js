let Handle = require("handles.js").Handle;

let Sequencer = function () {
  let sequence = [];
  let currentTask = null;
  let currentHandle = null;
  let processing = false;

  this.push = function (task) {
    sequence.push(task);
    resumeProcessing();
  };

  this.clear = function(options) {
    options = options || {};
    options.cancelCurrentTask =
      typeof options.cancelCurrentTask === "undefined" ? true : options.cancelCurrentTask;

    sequence = [];
    if (currentTask !== null && typeof currentTask.cancel !== "undefined" && options.cancelCurrentTask) {
      currentTask.cancel(currentHandle);
    }
  };

  this.isEmpty = function () {
    return sequence.length === 0;
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

module.exports = Sequencer;
