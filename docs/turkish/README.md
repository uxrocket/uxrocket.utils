# UXRocket Utils [![Build Status](https://travis-ci.org/uxrocket/uxrocket.utils.svg)](https://travis-ci.org/uxrocket/uxrocket.utils) [![GitHub version](https://badge.fury.io/gh/uxrocket%2Fuxrocket.utils.svg)](https://github.com/uxrocket/uxrocket.utils/releases) ![Coverage](http://img.shields.io/badge/coverage-100%25-brightgreen.svg)
JavaScript'in kayıp araç/gereç kütüphanesi.

[![Dependency Status](https://david-dm.org/uxrocket/uxrocket.utils.svg)](https://david-dm.org/uxrocket/uxrocket.utils) 
[![devDependency Status](https://david-dm.org/uxrocket/uxrocket.utils/dev-status.svg)](https://david-dm.org/uxrocket/uxrocket.utils#info=devDependencies) 
[![Bower version](https://badge.fury.io/bo/uxrocket.utils.svg)](http://bower.io/search/?q=uxrocket.utils) 
[![npm version](https://badge.fury.io/js/uxrocket.utils.svg)](https://www.npmjs.org/package/uxrocket.utils)

> Psst! You speaking english? Then check this out; [English Documentation].

## Kurulum
Bower
```sh
$ bower install uxrocket.utils
```

NPM 
```sh
$ npm install uxrocket.utils
```

Geleneksel yol
> [Yayınlanmış paketler] içerisinden paketi indirin ve **dist** klasörü altından alın.
> Unutmayın; Master branch'i altındaki dist klasöründe bulunan dosyalar stabil sürümler olmayabilir .

## Kullanım
Browser
```html
<script src="uxrocket.utils-standalone.js"></script>
```

NPM
```javascript
var __ = require("uxrocket.utils");
```

Neden üç ayrı paket tipi var?
- [uxrocket.utils.js](https://github.com/uxrocket/uxrocket.utils/blob/master/dist/uxrocket.utils.js)
- [uxrocket.utils-standalone.js](https://github.com/uxrocket/uxrocket.utils/blob/master/dist/uxrocket.utils-standalone.js)
- [uxrocket.utils-with-lodash.js](https://github.com/uxrocket/uxrocket.utils/blob/master/dist/uxrocket.utils-with-lodash.js)

Bunun nedeni uxrocket.utils'in [lodash]'a ihtiyaç duyuyor olması. Ve bu paketler de kullanım tercihleri için.
- **uxrocket.utils.js** içerisinde lodash'ı içermeyen tekil dosyadır. Eğer projenizde hali hazırda lodash kullanıyorsanız, bunu tercih edin. NPM altında ve AMD içerisinde lodash'ı `require` ederek çağıracaktır. Tarayıcı içerisine doğrudan script tagı içerisine yazarak yapılan kullanımlarda ise, öncesinde lodash'ın yüklenmiş olması gerekmektedir. Aksi halde hata fırlatacaktır.

- **uxrocket.utils-standalone.js** içerisinde lodash'ın hafif sürümünü içeren versiyondur. Eğer lodash kullanmıyorsanız, kullanmaya ihtiyacınız yoksa, veya kullanmak istemiyorsanız, veya da global alt tireyi `_` kullanan başka bir kütüphane kullanıyorsanız (underscore.js gib) ve lodash'ın bunu bozmasını istemiyorsanız; bu paketi seçin. Bu paket içerisinde lodash'ın sadece uxrocket.utils tarafından kullanılan fonksiyonlarını barındıran bir lite sürümünü içerir. Ve lodash'ı global kapsamdan soyutlar.

- **uxrocket.utils-with-lodash.js** içerisinde lodash'ın sonr compatible sürümünü barındırır `lodash.compat.js`. Ve lodash'i global kapsamdan soyutlamaz. uxrocket.utils ve lodash'ı tek dosya olarak indirmek istiyorsanız, bunu kullanın.

## Dökümantasyon
Otomatik olarak üretilen satır içi dökümantasyon için; [api dökümantasyon web sitesi].

- [English]
- [Türkçe] 

## Yapılacaklar
Yapılacaklar listesi sadece ingilizce olarak tutulmaktadır; [TODOS.md]

## Sürüm Notları
Sürüm Notları sadece ingilizce olarak tutulmaktadır; [CHANGELOG.md]

## Lisans
[MIT], yani; dilediğiniz gibi kullanın.

[Yayınlanmış paketler]:https://github.com/uxrocket/uxrocket.utils/releases
[lodash]:https://github.com/lodash/lodash
[English Documentation]:https://github.com/uxrocket/uxrocket.utils/blob/master/README.md
[MIT]: https://github.com/uxrocket/uxrocket.utils/blob/master/LICENSE
[TODOS.md]: https://github.com/uxrocket/uxrocket.utils/blob/master/TODOS.md
[CHANGELOG.md]: https://github.com/uxrocket/uxrocket.utils/blob/master/CHANGELOG.md
[English]:https://github.com/uxrocket/uxrocket.utils/blob/master/docs/english/README.md
[Türkçe]:https://github.com/uxrocket/uxrocket.utils/blob/master/docs/turkish/index.md
[api dökümantasyon web sitesi]: http://uxrocket.github.io/uxrocket.utils
