var Handle = function (onRelease) {
    this.release = function() { onRelease(); };
}