import test from 'ava';
import Path from 'path';
import utilMaker from '../src';

const baseDir = Path.resolve(__dirname, './fixture/');

function checkNodeUtils(t, util) {
    ['format', 'inspect', 'inherits', 'deprecate', 'debuglog'].forEach((name) => {
        t.is(typeof util[name], 'function');
    });
}

test('empty util', (t) => {
    const util = utilMaker().done();
    t.deepEqual(util, {});
});

test('simple usage: load json', (t) => {
    const third = require('./fixture/third_party');
    const overrides = require('./fixture/override');
    const mixin = require('./fixture/mixin');

    const util = utilMaker()
        .mixin(third)
        .mixin(overrides, {override: true})
        .mixin(mixin)
        .done();

    t.is(util.sprintf, 'sprintf');
    t.is(typeof util.vsprintf, 'function');
    t.is(util.idle, 'hahahah');
    t.is(util.version, 1);
    t.is(typeof util.test, 'function');
});

test('simple usage: load files', (t) => {
    const util = utilMaker()
        .load([
            'third_party',
            'mixin',
        ], {baseDir})
        .done();

    t.is(typeof util.sprintf, 'function');
    t.is(typeof util.vsprintf, 'function');
    t.is(util.version, 1);
    t.is(typeof util.test, 'function');
});

test('load files', (t) => {
    const util = utilMaker()
        .load('third_party', {baseDir})
        .load('override', {baseDir, override: true})
        .load([
            'mixin',
        ], {baseDir})
        .done();

    t.is(util.sprintf, 'sprintf');
    t.is(typeof util.vsprintf, 'function');
    t.is(util.idle, 'hahahah');
    t.is(util.version, 1);
    t.is(typeof util.test, 'function');
});

test('mixinNodeUtil', (t) => {
    const util = utilMaker()
        .mixinNodeUtil()
        .done();

    checkNodeUtils(t, util);
});

test('throw error when mixin duplicated key, which value is string', (t) => {
    const error = t.throws(() => {
        utilMaker()
            .mixinNodeUtil()
            .mixin({
                format: 'for',
            })
            .done();
    });
    t.is(error.message, 'Duplicate key definition. Current key="format" value="for"');
});

test('throw error when mixin duplicated key, which value is anonymous function', (t) => {
    const error = t.throws(() => {
        utilMaker()
            .mixinNodeUtil()
            .mixin({
                format: (str) => {return str;},
            })
            .done();
    });
    t.is(error.message, 'Duplicate key definition. Current key="format" value="str => {\n                    return str;\n                }"');
});

test('throw error when mixin duplicated key, which value is named function', (t) => {
    const error = t.throws(() => {
        utilMaker()
            .mixinNodeUtil()
            .mixin({
                format: function format(str) {return str;},
            })
            .done();
    });
    t.is(error.message, 'Duplicate key definition. Current key="format" value="function format(str) {\n                    return str;\n                }"');
});

test('override', (t) => {
    const util = utilMaker()
        .mixinNodeUtil()
        .mixin({
            inspect: 'inspect',
            idle: 'format',
        }, {override: true})
        .done();

    ['format', 'debuglog', 'inherits', 'deprecate'].forEach((name) => {
        t.is(typeof util[name], 'function');
    });

    t.is(util.inspect, 'inspect');
    t.is(util.idle, 'format');
});

test('complex usage', (t) => {
    const util = utilMaker()
        .mixinNodeUtil()
        .mixinRecommends()
        .load('mixin', {baseDir})
        .mixin({
            inspect: 'inspect',
            idle: 'format',
        }, {override: true})
        .done();

    ['format', 'inherits', 'deprecate', 'debuglog'].forEach((name) => {
        t.is(typeof util[name], 'function');
    });
    t.is(util.inspect, 'inspect');
    t.is(util.idle, 'format');
    t.is(typeof util.emtpyCallback, 'function');
    t.is(typeof util.testCallback, 'function');
    t.is(typeof util.printFunction, 'function');
});

test('mixin with function', (t) => {
    const util = utilMaker()
        .mixinNodeUtil()
        .mixin((util) => {
            checkNodeUtils(t, util);
            return {
                a: 1,
            };
        })
        .done();

    checkNodeUtils(t, util);
    t.is(util.a, 1);
});
