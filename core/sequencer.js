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
