const nodeUtil = require('util');
const Path = require('path');

function pick(object, array) {
    const result = {};
    array.forEach((key) => {
        result[key] = object[key];
    });
    return result;
}

function each(object, func) {
    const keys = Object.keys(object);
    keys.forEach((key) => {
        func(object[key], key);
    });
}

class Maker {
    constructor() {
        this.util = {};
    }

    /**
     * @param  {Object|Function}  source
     *   If source is an Object, it will be assigned to util.
     *   If source is a Function, it will be invoked with `source(util)` whose result will be assigned to util.
     * @param  {Boolean}  [override=false] Whether override the key when duplicate definition
     * @return {Maker}  this
     */
    _mixin(source, override) {
        const {util} = this;

        if (typeof source === 'function') {
            source = source(util);
        }

        each(source, (val, key) => {
            if (util[key] !== undefined && override !== true) {
                let valueMsg = val;
                if (typeof val === 'function') valueMsg = val.toString();
                throw new Error(`Duplicate key definition. Current key="${key}" value="${valueMsg}"`);
            }
            util[key] = val;
        });
        return this;
    }

    /**
     * @param  {Object|Object[]|Function|Function[]}  sources
     *   If source is an Object, it will be assigned to util.
     *   If source is a Function, it will be invoked with `source(util)` whose result will be assigned to util.
     * @param  {Object}  [opts]
     * @param  {Boolean}  [opts.override=false] Whether override the key when duplicate definition
     * @return {Maker}  this
     */
    mixin(sources, opts) {
        opts = opts || {};
        const override = opts.override || false;

        if (!Array.isArray(sources)) sources = [sources];
        sources.forEach((source) => this._mixin(source, override));
        return this;
    }

    /**
     * @param {String|String[]} paths
     * @param  {Object}  [opts]
     * @param  {Boolean}  [opts.override=false]  Whether override the key when duplicate definition
     * @param  {String}  [opts.baseDir='']  Base directory for paths
     * @return {Maker}  this
     */
    load(paths, opts) {
        opts = opts || {};
        const override = opts.override || false;
        const baseDir = opts.baseDir || '';

        if (!Array.isArray(paths)) paths = [paths];
        paths.forEach((path) => {
            const source = require(Path.resolve(baseDir, path));
            this._mixin(source, override);
        });
        return this;
    }

    mixinNodeUtil() {
        this._mixin(pick(nodeUtil, [
            'format', 'inspect', 'inherits', 'deprecate', 'debuglog',
        ]));
        return this;
    }

    /**
     * @param {String} name
     * @param {*[]} dependencies
     * @return {Maker}  this
     */
    mixinRecommends(name, ...argv) {
        name = name || 'index';
        let r = require(`./recommends/${name}.js`);
        if (typeof r === 'function') {
            r = r(this.util, ...argv);
        }
        if (Array.isArray(r)) {
            this._mixin(r[0]);
            this._mixin(r[1] || {}, true);
        } else {
            this._mixin(r);
        }
        return this;
    }

    /**
     * @return {Object} Final util
     */
    done() {
        return this.util;
    }
}

module.exports = function utilMaker() {
    return new Maker();
};
