# UXRocket Utils
Missing utils/helpers library for javascript.

[![Build Status](https://travis-ci.org/uxrocket/uxrocket.utils.svg)](https://travis-ci.org/uxrocket/uxrocket.utils)
![Coverage](http://img.shields.io/badge/coverage-100%25-brightgreen.svg)
[![Dependency Status](https://david-dm.org/uxrocket/uxrocket.utils.svg)](https://david-dm.org/uxrocket/uxrocket.utils)
[![devDependency Status](https://david-dm.org/uxrocket/uxrocket.utils/dev-status.svg)](https://david-dm.org/uxrocket/uxrocket.utils#info=devDependencies)
[![GitHub version](https://badge.fury.io/gh/uxrocket%2Fuxrocket.utils.svg)](https://github.com/uxrocket/uxrocket.utils/releases)
[![npm version](https://badge.fury.io/js/uxrocket.utils.svg)](https://www.npmjs.org/package/uxrocket.utils)
[![Bower version](https://badge.fury.io/bo/uxrocket.utils.svg)](http://bower.io/search/?q=uxrocket.utils)

> Psst! Türkçe biliyor musun? Belki senin için daha uygun olabilir; [Türkçe Dökümantasyon].

## Installation
Bower
```sh
$ bower install uxrocket.utils
```

NPM
```sh
$ npm install uxrocket.utils
```

Traditional way
> Download package from [release packages] and grab file under **dist** folder.
> Remember, dist folder under master branch may not be stable. 

## Usage
Browser
```html
<script src="uxrocket.utils-standalone.js"></script>
```

NPM
```javascript
var __ = require("uxrocket.utils");
```

So, why there are three type of dist file?
- [uxrocket.utils.js](https://github.com/uxrocket/uxrocket.utils/blob/master/dist/uxrocket.utils.js)
- [uxrocket.utils-standalone.js](https://github.com/uxrocket/uxrocket.utils/blob/master/dist/uxrocket.utils-standalone.js)
- [uxrocket.utils-with-lodash.js](https://github.com/uxrocket/uxrocket.utils/blob/master/dist/uxrocket.utils-with-lodash.js)

It's because uxrocket.utils is dependent on [lodash]. And they are your usage options. 
- **uxrocket.utils.js** is single form of library which doesn't include lodash. If you already using lodash in your project. Go and use it. It gonna `require` lodash under npm and amd. In browser usages, you have to load lodash before uxrocket.utils or it gonna throw an error.

- **uxrocket.utils-standalone.js** is includes lite version of lodash and seperates it from global scope. If you're not using lodash, and don't want or need to use it, or maybe you using something different library which uses global underscore `_` (like underscore.js) and you don't want to lodash ruin it; grab this file. This package has lite version of lodash which include only functions that utils is using. And seperates lodash from global scope.

- **uxrocket.utils-with-lodash.js** is includes complete latest version of lodash compatible `lodash.compat.js`. And not seperates it from global scope. If you want download uxrocket.utils and lodash in same file, use it.

## License
MIT, it means; use as whatever you want.

[release packages]:https://github.com/uxrocket/uxrocket.utils/releases
[lodash]:https://github.com/lodash/lodash
[Türkçe Dökümantasyon]:https://github.com/uxrocket/uxrocket.utils/blob/master/docs/turkish/README.md
