var Handle = function (onRelease) {
    this.release = function() { onRelease(); };
}

var ActionTask = function (action) {
    this.action = action;
    this.perform = function (handle) { action(); handle.release(); };
};

var WaitTask = function (duration) {
    this.duration = duration;
    this.perform = function (handle) { setTimeout(handle.release, duration); };
};

var Sequencer = function () {
    var self = this;
    var sequence = [];
    
    // Private functions
    
    function push(task) {
        sequence.push(task);
        process();
    }
    
    function process() {
        if (sequence.length == 0) return;
        
        // When the handle is released, we'll process the next task
        var handle = new Handle(function () { process(); });
        
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
};
