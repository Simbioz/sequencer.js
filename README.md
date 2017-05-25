# sequencer.js

A simple but powerful and *extensible* JavaScript task sequencer.

# Installation

## Using NPM

    npm install --save sequencer.js

# Usage

```javascript
// Create a handle and release it after some time has passed.
// The sequence will block at `doWaitForHandle(blockUntilLaterHandle)` until the handle is released.
var blockUntilLaterHandle = new Handle();
setTimeout(blockUntilLaterHandle.release, 10000);

var sequencer = new Sequencer();

// Enqueues a simple synchronous action
sequencer.do(function () { log("1st instantly"); });

// Waits for one second then performs an action after the delay has elapsed.
// This also demonstrates `do` task chaining.
sequencer.doWait(1000).do(function () { log("2nd after 1 second"); });

// Performs an action and waits until release() is called
sequencer.doWaitForRelease(function (release) { setTimeout(release, 3000); });

sequencer.do(function () { log("3rd after waiting for a release() call"); });

// Block until the handle is released
sequencer.doWaitForHandle(blockUntilLaterHandle);

sequencer.do(function () { log("4th after waiting for a manually-created handle to be released"); });

// Performs an action and waits until release() is called a certain number of times.
// The sequencer proceeds after 5 seconds (when two releases have been performed).
sequencer.doWaitForReleases(2, function (release) {
  setTimeout(release, 5000);
  setTimeout(release, 3000);
});

sequencer.do(function () { log("5th after waiting for two release() calls"); });

// Wait for a promise to be fulfilled.
// You can optionally obtain the promise's value and/or rejection reason.
var url = "https://cors-test.appspot.com/test";
sequencer.doWaitForPromise(fetch(url), function (response) {
    log("> Promise Resolved : Received HTTP " + response.status + " from " + url);
});

sequencer.do(function () { log("6th after waiting for a promise to be resolved"); });
```

# Creating an Extension

An external sequencer.js extension looks like this:

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

Take a look at core extensions in the sequencer.js source for concrete examples. The way the
extensions are installed is slightly different from external extensions, but they still
serve as appropriate examples.
