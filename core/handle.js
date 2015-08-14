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