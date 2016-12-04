module.exports = (_, lodash) => {
    const o = lodash.omit(lodash, ['VERSION', 'toString']);
    o.lodashVersion = lodash.VERSION;
    return [o, {
        toString: lodash.toString,
    }];
};
