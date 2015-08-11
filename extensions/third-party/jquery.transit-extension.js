var TransitionTask = function (jqueryElement, transition) {
    this.perform = function (handle) {
        transition.complete = handle.release;
        jqueryElement.transition(transition);
    };
};

Sequencer.prototype.doTransition = function (jqueryElement, transition) {
    this.push(new TransitionTask(jqueryElement, transition));
    return this;
}