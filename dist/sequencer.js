var Handle = require("./handle");

var Sequencer = function () {
    var sequence = [];
    var currentTask = null;
    var currentHandle = null;
    var processing = false;

    this.push = function (task) {
        sequence.push(task);
        resumeProcessing();
    };

    this.clear = function () {
        sequence = [];
        if (currentTask !== null && typeof(currentTask.cancel) !== "undefined") {
            currentTask.cancel(currentHandle);
        }
    };

    function resumeProcessing() {
        if (processing) return;
        processing = true;
        process();
    }

    function finishProcessing() {
        if (sequence.length != 0) return false;
        processing = false;
        return true;
    }

    function process() {
        if (finishProcessing()) return;

        // When the handle is released, we'll process the next task
        var handle = new Handle(function () {
            currentTask = null;
            currentHandle = null;
            process();
        });

        // Perform the next task, providing it with the handle it can
        // release to signify that its job is done
        var task = sequence.shift();
        currentTask = task;
        currentHandle = handle;
        task.perform(handle);
    }
};

require("./extensions/core/do-extension");
require("./extensions/core/do-wait-extension");
require("./extensions/core/do-wait-for-handle-extension");
require("./extensions/core/do-with-handle-extension");

module.exports = Sequencer;
