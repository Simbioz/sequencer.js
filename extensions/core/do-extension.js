var ActionTask = function (action) {
    this.perform = function (handle) { action(); handle.release(); };
};

Sequencer.prototype.do = function (action) {
    this.push(new ActionTask(action));
    return this;
};