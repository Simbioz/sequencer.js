var Handle = function (onRelease) {
    this.release = function() { onRelease(); };
}
var Sequencer = function () {
    var processing = false;
    var sequence = [];
    
    this.push = function (task) {
        sequence.push(task);
        resumeProcessing();
    }
    
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
        var handle = new Handle(process);
        
        // Perform the next task, providing it with the handle it can
        // release to signify that its job is done
        var task = sequence.shift();
        task.perform(handle);
    }
};

var ActionTask = function (action) {
    this.perform = function (handle) { action(); handle.release(); };
};

Sequencer.prototype.do = function (action) {
    this.push(new ActionTask(action));
    return this;
};
var WaitTask = function (duration) {
    this.perform = function (handle) { setTimeout(handle.release, duration); };
};

Sequencer.prototype.doWait = function (duration) {
    this.push(new WaitTask(duration));
    return this;
};
var WaitForHandleTask = function (action) {
    this.perform = function (handle) { action(handle); };
};

Sequencer.prototype.doWaitForHandle = function(action) {
    this.push(new WaitForHandleTask(action));
    return this;
};