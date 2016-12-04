import test from 'ava';
import utilMaker from '../src';

function checkRecommands(t, util) {
    t.is(typeof util.idle, 'function');
    t.is(typeof util.emtpyCallback, 'function');
    t.is(typeof util.testCallback, 'function');
    t.is(typeof util.printFunction, 'function');
}

test('mixinRecommends default', (t) => {
    const util = utilMaker()
        .mixinRecommends()
        .done();

    checkRecommands(t, util);
});

test('mixinRecommends lodash', (t) => {
    const util = utilMaker()
        .mixinRecommends('lodash', require('lodash'))
        .done();

    t.is(util.lodashVersion, '4.17.2');
    t.is(util.keys(util).length, 308);
    t.is(util.functions(util).length, 306);
});

test('mixinRecommends default and lodash', (t) => {
    const util = utilMaker()
        .mixinRecommends()
        .mixinRecommends('lodash', require('lodash'))
        .done();

    checkRecommands(t, util);
});

test('mixinRecommends ms', (t) => {
    const util = utilMaker()
        .mixinRecommends('ms', require('ms'))
        .done();

    t.is(typeof util.ONE_MINUTE, 'number');
    t.is(typeof util.ONE_HOUR, 'number');
    t.is(typeof util.ONE_DAY, 'number');
    t.is(typeof util.ONE_MONTH, 'number');
    t.is(typeof util.ONE_YEAR, 'number');
});
