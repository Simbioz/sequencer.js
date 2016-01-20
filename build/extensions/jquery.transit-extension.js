// Requires jquery.transit

var DoTransitTask = function (jqueryElement, transit) {
    this.perform = function (handle) {
        transit.complete = handle.release;
        jqueryElement.transition(transit);
    };
};

Sequencer.prototype.doTransit = function (jqueryElement, transit) {
    this.push(new DoTransitTask(jqueryElement, transit));
    return this;
}