let Sequencer = require("scripts/sequencer.js");

require("scripts/extensions/do-extension").extend(Sequencer.prototype);
require("scripts/extensions/do-sequence-extension").extend(Sequencer.prototype);
require("scripts/extensions/do-wait-extension").extend(Sequencer.prototype);
require("scripts/extensions/do-wait-for-handle-extension").extend(Sequencer.prototype);
require("scripts/extensions/do-wait-for-promise-extension").extend(Sequencer.prototype);
require("scripts/extensions/do-wait-for-release-extension").extend(Sequencer.prototype);
require("scripts/extensions/do-wait-for-releases-extension").extend(Sequencer.prototype);

module.exports = Sequencer;
