const nodeUtil = require('util');
function idle() {}

module.exports = {
    /**
     * empty function. Idle ;-)
     */
    idle,
    emtpyCallback: idle,
    testCallback: function testCallback(callback) {
        return function _testCallback() {
            console.log(nodeUtil.format('[Test Callback] callback triggered, arguments: %j', arguments));
            callback.apply(this, arguments);
        };
    },
    printFunction: function printFunction(func) {
        /* eslint no-console: 0*/
        console.log(func.toString());
    },
};
