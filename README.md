# sequencer.js

A simple but powerful and *extensible* JavaScript task sequencer.

# Installation

## Using Bower

    bower install sequencer.js

## Using NPM

    npm install sequencer.js

# Usage

```javascript    
var sequencer = new Sequencer();

// Enqueue a simple synchronous action
sequencer.do(function () { console.log("1st"); });

// Waits for one second then performs an action after the delay has elapsed.
// This also demonstrates "do" task chaining.
sequencer.doWait(1000).do(function () { console.log("2nd after 1 second"); });

// Performs an action and waits until the given handle is released
sequencer.doWithHandle(function (handle) { setTimeout(handle.release, 3000); });

// Another simple synchronous action
sequencer.do(function () { console.log("3rd after waiting for handle for 3 seconds"); });

// A jquery.transit transition (optional jquery.transit-extension)
sequencer.doTransit($(".animated"), { scale: 2, duration: 2000 });

// Continues only after the transition is complete
sequencer.do(function () { console.log("4th after jquery.transit transition is complete"); });

// Create a handle and wait until some asynchronous code releases it
var blockUntilLaterHandle = new Handle();
sequencer.doWaitForHandle(blockUntilLaterHandle);

// Wait for the promise to be fulfilled (optional es6-promise-extension)
// You can optionally obtain the promise's value or rejection reason
var url = "https://cors-test.appspot.com/test";
sequencer.doWaitForPromise(fetch(url), function (response) {
    console.log("Received HTTP " + response.status + " from " + url);
});

// This will run after the external handle is released
sequencer.do(function () { console.log("5th after waiting for an external handle to be released"); });

// Release the handle sometime later so that the sequence can continue.
// Note that a long delay is used here because enqueueing tasks in the sequencer
// is an instantaneous operation; this line runs almost instantly at page load!
setTimeout(blockUntilLaterHandle.release, 15000);
```

# Development

1. Install development dependencies using `npm install`
2. Build the latest version by running `gulp` (default task)
3. Require `build/sequencer.min.js` in an html file.

# Creating an Extension

A sequencer.js extension looks like this:

```javascript
var DoSomethingTask = function (someValue) {
    this.perform = function (handle) {
        // Do something, synchronously or asynchronously
        console.log("My sequencer.js extension task performed with value " + someValue);
        
        // Then release the handle to indicate that the task is complete:
        handle.release();
    };
};

Sequencer.prototype.doSomething = function (someValue) {
    this.push(new DoSomethingTask(someValue));
    return this;
}
```

Take a look at core and third-party extensions in the sequencer.js source for concrete examples.
