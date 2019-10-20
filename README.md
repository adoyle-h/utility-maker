# utility-maker
![Node Version][Node Version Image]
[![Npm Package Version][Npm Package Version Image]][Npm Package Version LINK]
[![License][License Image]][License LINK]
![NodeJS Package Dependencies][NodeJS Package Dependencies Link]
[![Build Status][Build Status Image]][Build Status Link]
[![Code Climate][Code Climate Image]][Code Climate Link]
[![Test Coverage][Test Coverage Image]][Test Coverage Link]

Make your utilities library.

## TOC

<!-- MarkdownTOC GFM -->

- [Installation](#installation)
- [Quick Start](#quick-start)
    - [Mixin JSON objects](#mixin-json-objects)
    - [Mixin files](#mixin-files)
    - [Mixin Recommends](#mixin-recommends)
- [Feature](#feature)
- [API](#api)
- [Versioning](#versioning)
- [Copyright and License](#copyright-and-license)

<!-- /MarkdownTOC -->

<a name="installation"></a>
## Installation

`npm install --save utility-maker`

<a name="quick-start"></a>
## Quick Start

Write your util functions to separate files.

```js
// util/custom.js
module.exports = {
    version: 1,
    test: () => console.log('test'),
};
```

```js
// util/overrides.js
module.exports = {
    hello: () => console.log('world'),
};
```

```js
// util/overrides.js
module.exports = {
    hello: () => console.log('world'),
};
```

```js
// util/libs.js
module.exports = {
    libs: () => console.log('libs'),
};
```

Then you could choose one of these below:

### Mixin JSON objects

```js
// util/index.js
const utilMaker = require('utility-maker');
const libs = require('./libs');
const overrides = require('./override');
const custom = require('./custom');

const util = utilMaker()
    .mixin(libs)
    .mixin(overrides, {override: true})
    .mixin(custom)
    .done();

module.exports = util;
```

### Mixin files

```js
// util/index.js
const Path = require('path');
const utilMaker = require('utility-maker');
const baseDir = Path.resolve(__dirname);
const util = utilMaker()
    .load([
        'libs',
        'custom',
    ], {baseDir})
    .load([
        'override',
    ], {baseDir, override: true})
    .done();

module.exports = util;
```

### Mixin Recommends

```js
const utilMaker = require('utility-maker');
const baseDir = __dirname;

module.exports = utilMaker()
    .mixinNodeUtil()
    .mixinRecommends()
    .mixinRecommends('lodash', require('lodash'))
    .load([
        'libs',
    ], {baseDir})
    .load([
        'overrides',
    ], {baseDir, override: true})
    .load([
        'custom',
    ], {baseDir})
    .done();
```

<a name="feature"></a>
## Feature

- Check duplicated keys when merge utils
- Allow to override util
- Separate utilities into many files for better code reading
- Chainable APIs. Very simple usage

<a name="api"></a>
## API

[TODO] The specifications of API, and details not mentioned in README, would be referenced at [API document][API].

<a name="versioning"></a>
## Versioning

The versioning follows the rules of SemVer 2.0.0.

**BUT**, anything may have **BREAKING CHANGES** at **ANY TIME** when major version is zero (0.y.z), which is for initial development and the public API should be considered unstable.

**When it is unstable, the version of installed package should be prefixed `~`.**

For more information on SemVer, please visit http://semver.org/.

<a name="copyright-and-license"></a>
## Copyright and License

Copyright (c) 2016 ADoyle. The project is licensed under the **Apache License Version 2.0**.

See the [LICENSE][] file for the specific language governing permissions and limitations under the License.

See the [NOTICE][] file distributed with this work for additional information regarding copyright ownership.


<!-- Links -->

[LICENSE]: ./LICENSE
[NOTICE]: ./NOTICE
[API]: http://adoyle.me/utility-maker/


<!-- links -->

[Node Version Image]: https://img.shields.io/node/v/utility-maker.svg
[Npm Package Version Image]: https://img.shields.io/npm/v/utility-maker.svg
[Npm Package Version LINK]: https://www.npmjs.com/package/utility-maker
[License Image]: https://img.shields.io/npm/l/utility-maker.svg
[License LINK]: https://github.com/adoyle-h/utility-maker/blob/master/LICENSE
[NodeJS Package Dependencies Link]: https://david-dm.org/adoyle-h/utility-maker.svg
[Build Status Image]: https://travis-ci.org/adoyle-h/utility-maker.svg?branch=master
[Build Status Link]: https://travis-ci.org/adoyle-h/utility-maker
[Code Climate Image]: https://codeclimate.com/github/adoyle-h/utility-maker/badges/gpa.svg
[Code Climate Link]: https://codeclimate.com/github/adoyle-h/utility-maker
[Test Coverage Image]: https://codeclimate.com/github/adoyle-h/utility-maker/badges/coverage.svg
[Test Coverage Link]: https://codeclimate.com/github/adoyle-h/utility-maker/coverage
