var Handle = function (onRelease) {
    this.release = function() { onRelease(); };
}

var ActionTask = function (action) {
    this.perform = function (handle) { action(); handle.release(); };
};

var WaitTask = function (duration) {
    this.perform = function (handle) { setTimeout(handle.release, duration); };
};

var WaitForHandleTask = function (action) {
    this.perform = function (handle) { action(handle); };
};

var Sequencer = function () {
    var self = this;
    var processing = false;
    var sequence = [];
    
    // Private functions
    
    function push(task) {
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
    
    // Task enqueueing helpers

    this.do = function (action) {
        push(new ActionTask(action));
        return this;
    };
    
    this.doWait = function (duration) {
        push(new WaitTask(duration));
        return this;
    };
    
    this.doWaitForHandle = function(action) {
        push(new WaitForHandleTask(action));
        return this;
    };
};
