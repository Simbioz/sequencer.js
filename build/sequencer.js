var Handle = function (onRelease) {
    var self = this;
    var onReleaseHandlers = [];
    
    if (!(typeof onRelease === "undefined"))
        onReleaseHandlers.push(onRelease);
    
    this.isReleased = false;
    
    this.addOnReleaseHandler = function(handler) {
        onReleaseHandlers.push(handler);
    };
    
    this.release = function() {
        self.isReleased = true;
        onReleaseHandlers.forEach(function (handler) { handler(); });
    };
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

var DoTask = function (action) {
    this.perform = function (handle) { action(); handle.release(); };
};

Sequencer.prototype.do = function (action) {
    this.push(new DoTask(action));
    return this;
};
var DoWaitTask = function (duration) {
    this.perform = function (handle) { setTimeout(handle.release, duration); };
};

Sequencer.prototype.doWait = function (duration) {
    this.push(new DoWaitTask(duration));
    return this;
};
var DoWaitForHandleTask = function (handle) {
    this.perform = function (sequencer_handle) {
        if (handle.isReleased) {
            sequencer_handle.release();
            return;
        }
        handle.addOnReleaseHandler(sequencer_handle.release);
    };
};

Sequencer.prototype.doWaitForHandle = function (handle) {
    this.push(new DoWaitForHandleTask(handle));
    return this;
};
var DoWithHandleTask = function (action) {
    this.perform = function (handle) { action(handle); };
};

Sequencer.prototype.doWithHandle = function(action) {
    this.push(new DoWithHandleTask(action));
    return this;
};