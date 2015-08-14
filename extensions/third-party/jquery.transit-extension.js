var DoTransitionTask = function (jqueryElement, transition) {
    this.perform = function (handle) {
        transition.complete = handle.release;
        jqueryElement.transition(transition);
    };
};

Sequencer.prototype.doTransition = function (jqueryElement, transition) {
    this.push(new DoTransitionTask(jqueryElement, transition));
    return this;
}