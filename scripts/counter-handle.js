let CounterHandle = function (count, onRelease) {
  let that = this;
  let onReleaseHandlers = [];

  if (count === 0)
    throw new Error("Count must be greater than zero!");

  if (!(typeof onRelease === "undefined"))
    onReleaseHandlers.push(onRelease);

  function callReleaseHandlers() {
    onReleaseHandlers.forEach(handler => handler());
  }

  this.isReleased = false;
  this.releaseCount = 0;

  this.addOnReleaseHandler = function (handler) {
    onReleaseHandlers.push(handler);
  };

  this.release = function () {
    if (that.isReleased) return;
    that.releaseCount += 1;
    if (that.releaseCount === count) {
      that.isReleased = true;
      callReleaseHandlers();
    }
  };

  this.releaseAll = function () {
    if (that.isReleased) return;
    that.isReleased = true;
    callReleaseHandlers();
  };
};

module.exports = CounterHandle;
