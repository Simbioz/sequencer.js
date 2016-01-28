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
        if (self.isReleased) return;
        self.isReleased = true;
        onReleaseHandlers.forEach(function (handler) { handler(); });
    };
};
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

var DoTask = function (action) {
    this.perform = function (handle) { action(); handle.release(); };
};

Sequencer.prototype.do = function (action) {
    this.push(new DoTask(action));
    return this;
};
var DoWaitTask = function (duration) {
    var timeout = null;
    this.perform = function (handle) {
        timeout = setTimeout(handle.release, duration);
    };
    this.cancel = function (handle) {
        if (timeout !== null) clearTimeout(timeout); 
        handle.release();
    };
};

Sequencer.prototype.doWait = function (duration) {
    this.push(new DoWaitTask(duration));
    return this;
};
var DoWaitForHandleTask = function (handleToWaitFor) {
    this.perform = function (handle) {
        if (handleToWaitFor.isReleased) {
            handle.release();
            return;
        }
        handleToWaitFor.addOnReleaseHandler(handle.release);
    };
    this.cancel = function (handle) {
        handle.release();
    }
};

Sequencer.prototype.doWaitForHandle = function (handleToWaitFor) {
    this.push(new DoWaitForHandleTask(handleToWaitFor));
    return this;
};
var DoWithHandleTask = function (action) {
    this.perform = function (handle) { action(handle); };
    this.cancel = function (handle) { handle.release(); };
};

Sequencer.prototype.doWithHandle = function(action) {
    this.push(new DoWithHandleTask(action));
    return this;
};