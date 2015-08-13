var Handle = function (onRelease) {
    var self = this;
    this.isReleased = false;
    this.release = function() {
        self.isReleased = true;
        onRelease();
    };
}