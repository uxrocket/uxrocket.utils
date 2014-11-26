/* global __:true */
var root = this;
describe('UXRocket Utils', function(){
    'use strict';

    // ### STRUCTURAL

    // __.noConflict
    describe('__.noConflict', function(){
        it('should free the original assignment', function(){
            var backup  = __,
                utils   = __.noConflict();

            expect(backup)
                .toEqual(utils);

            expect(__)
                .toEqual(undefined);

            // Assign back.
            __ = utils;
        });
    });

    // ### MISC

    // __.type
    describe('__.type', function(){
        it('should return \'arguments\'', function(){
            expect(__.type(arguments))
                .toEqual('arguments');
        });

        it('should return \'array\'', function(){
            expect(__.type([]))
                .toEqual('array');
        });

        it('should return \'boolean\'', function(){
            expect(__.type(true))
                .toEqual('boolean');

            expect(__.type(false))
                .toEqual('boolean');
        });

        it('should return \'date\'', function(){
            expect(__.type(new Date()))
                .toEqual('date');
        });

        it('should return \'function\'', function(){
            expect(__.type(function(){}))
                .toEqual('function');
        });

        /* buggy because of phantomjs
         it('should return 'null'', function(){
             expect(__.type(null))
                    .toEqual('null');
         });
         */

        it('should return \'number\'', function(){
            expect(__.type(1))
                .toEqual('number');
        });

        it('should return \'object\'', function(){
            expect(__.type({}))
                .toEqual('object');
        });

        it('should return \'regexp\'', function(){
            expect(__.type(/(.*)/g))
                .toEqual('regexp');

            expect(__.type(new RegExp('(.*)')))
                .toEqual('regexp');
        });

        it('should return \'string\'', function(){
            expect(__.type('string'))
                .toEqual('string');
        });

        /* buggy because of phantomjs
         it('should return 'undefined'', function(){
             var a;
             expect(__.type(undefined))
                .toEqual('undefined');

             expect(__.type(a))
                .toEqual('undefined');
         });
         */
    });

    // __.parseNesting
    describe('__.parseNesting', function(){
        root.nesting = {
            dude: {
                you_re: {
                    soo: {
                        deep: 'i can\'t see you anymore.'
                    }
                }
            }
        };

        it('should parse nesting from root as default', function(){
            expect(__.parseNesting('nesting.dude.you_re.soo.deep')).toEqual('i can\'t see you anymore.');
        });

        it('should parse nesting from provided context', function(){
            expect(__.parseNesting('dude.you_re.soo.deep', root.nesting)).toEqual('i can\'t see you anymore.');
        });

        it('should return undefined if provided by wrong nesting', function(){
            expect(__.parseNesting('dude.you_re.soo.smart')).toEqual(undefined);
        });
    });

    // ### DOM

    // __.collectAttributes
    describe('__.collectAttributes', function(){
        var element = document.createElement('div');
        element.setAttribute('id', '1');
        element.setAttribute('data-source', 'xxx');
        element.setAttribute('data-options_ajax_url', 'http://xxx');
        element.setAttribute('data-options_ajax_method', 'GET');

        it('should collect attributes from element and nest them by default', function(){
            expect(__.collectAttributes(element)).toEqual({
                id: '1',
                dataSource  : 'xxx',
                dataOptions : {
                    ajax: {
                        url     : 'http://xxx',
                        method  : 'GET'
                    }
                }
            });
        });

        it('should collect attributes from element which matches with provided prefix', function(){
            expect(__.collectAttributes(element, 'data')).toEqual({
                source  : 'xxx',
                options : {
                    ajax: {
                        url     : 'http://xxx',
                        method  : 'GET'
                    }
                }
            });
        });

        it('should collect attributes from element but dont nest them if options.underscoreNesting = false;', function(){
            expect(__.collectAttributes(element, null, {underscoreNesting: false})).toEqual({
                id                      : '1',
                dataSource              : 'xxx',
                dataOptions_ajax_url    : 'http://xxx',
                dataOptions_ajax_method : 'GET'
            });

            expect(__.collectAttributes(element, 'data', {underscoreNesting: false})).toEqual({
                source  : 'xxx',
                options_ajax_url    : 'http://xxx',
                options_ajax_method : 'GET'
            });
        });

    });

    // ### FUNCTION

    // __.runAsync
    describe('__.runAsync', function(){
        var func = {
            asnyc: function(){
                return 'im so done.';
            }
        };

        it('should not called in this callstack', function(){
            var spy = spyOn(func, 'asnyc');
            __.runAsync(func.asnyc);
            expect(spy).not.toHaveBeenCalled();
        });

        describe('it should trigger callback with returned value from function', function(){
            var whatsup = '';

            beforeEach(function(done){
                __.runAsync(func.asnyc, function(returned){
                    whatsup = returned;
                    done();
                });
            });

            it('should called async', function(){
                expect(whatsup).toEqual('im so done.');
            });
        });
    });

    // __.evaluateFunctionCall
    describe('__.evaluateFunctionCall', function(){
        root.highLevel = function(){
            return 'I\'m the king.';
        };

        root.namespace = {
            func: {
                hello: function(name){
                    if(typeof name === 'undefined') name = 'billy';
                    return 'Hello ' + name + '.';
                },
                goodbye: function(){
                    return 'Goodbye :(';
                }
            }
        };

        it('should evaluate function call with and without attributes by string', function(){
            expect(__.evaluateFunctionCall('highLevel')).toEqual(false);
            expect(__.evaluateFunctionCall('highLevel()')).toEqual('I\'m the king.');
            expect(__.evaluateFunctionCall('namespace.func.hello()')).toEqual('Hello billy.');
            expect(__.evaluateFunctionCall('namespace.func.hello(bob)', null)).toEqual('Hello bob.');
        });

        it('should do/not called in this callstack by settings', function(){
            var spyHello = spyOn(root.namespace.func, 'hello');
            var spyGoodbye = spyOn(root.namespace.func, 'goodbye');

            /* Should call in this callstack */
            __.evaluateFunctionCall('namespace.func.hello()');
            expect(spyHello).toHaveBeenCalled();

            /* Should not call in this callstack */
            __.evaluateFunctionCall('namespace.func.goodbye()', function(){}, {async: true});
            expect(spyGoodbye).not.toHaveBeenCalled();
        });

        describe('it should trigger callback with returned value from function', function(){
            var greeting = '';

            beforeEach(function(done){
                __.evaluateFunctionCall('namespace.func.hello(bob)', function(returned){
                    greeting = returned;
                    done();
                });
            });

            it('should called async', function(){
                expect(greeting).toEqual('Hello bob.');
            });
        });
    });

    // ### REGEXP

    // __.regexpEscape
    describe('__.regexpEscape', function(){
        it('should escape regexps inside string', function(){
            expect(__.regexpEscape('.'))
                .toEqual('\\.');
        });
    });

    // ### STRING

    // __.contains
    describe('__.contains', function(){
        it('should check if string contains given input', function(){
            expect(__.contains('at', 'at')).toEqual(true);
            expect(__.contains('cat', 'at')).toEqual(true);
            expect(__.contains('atv', 'at')).toEqual(true);
            expect(__.contains('data', 'at')).toEqual(true);
            expect(__.contains('meta', 'at')).toEqual(false);
        });
    });

    // __.containsOnly
    describe('__.containsOnly', function(){
        it('should check if string contains given input', function(){
            expect(__.containsOnly('at', 'at')).toEqual(true);
            expect(__.containsOnly('cat', 'at')).toEqual(false);
            expect(__.containsOnly('atv', 'at')).toEqual(false);
            expect(__.containsOnly('data', 'at')).toEqual(true);
            expect(__.containsOnly('meta', 'at')).toEqual(false);
        });
    });

    // __.startsWith
    describe('__.startsWith', function(){
        it('should check if string start swith given input', function(){
            expect(__.startsWith('at', 'at')).toEqual(true);
            expect(__.startsWith('atv', 'at')).toEqual(true);
            expect(__.startsWith('data', 'at')).toEqual(false);
            expect(__.startsWith('cat', 'at')).toEqual(false);
        });
    });

    // __.endsWith
    describe('__.endsWith', function(){
        it('should check if string ends with given input', function(){
            expect(__.endsWith('at', 'at')).toEqual(true);
            expect(__.endsWith('atv', 'at')).toEqual(false);
            expect(__.endsWith('data', 'at')).toEqual(false);
            expect(__.endsWith('cat', 'at')).toEqual(true);
        });
    });

    // __.standardiseString
    describe('__.standardiseString', function(){
        it('should standardise given string', function(){
            expect(__.standardiseString('Örneğin çok ilginç, müzik ruhun gıdasıdır.'))
                .toEqual('ornegin cok ilginc, muzik ruhun gidasidir.');

            expect(__.standardiseString('Örneğin çok ilginç, MÜZİK ruhun gıdasıdır.', true))
                .toEqual('Ornegin cok ilginc, MUZIK ruhun gidasidir.');
        });
    });

    // __.replaceString
    describe('__.replaceString', function(){
        it('should not break code when wrong get type', function(){
            expect(__.replaceString('Hello world!', null, undefined))
                .toEqual('Hello world!');

            expect(__.replaceString('Hello world!', 'o', null))
                .toEqual('Hello world!');
        });

        it('should return original value when nothing changed', function(){
            expect(__.replaceString('Hello world!', 'cat', 'cow'))
                .toEqual('Hello world!');
        });

        it('should work with strings', function(){
            expect(__.replaceString('Hello world!', 'world', 'earth'))
                .toEqual('Hello earth!');
        });

        it('should replace all matches by global settings', function(){
            expect(__.replaceString('Hello world!', 'o', 'a'))
                .toEqual('Hella warld!');

            expect(__.replaceString('Hello world!', 'o', 'a', {global: false}))
                .toEqual('Hella world!');
        });

        it('should work with arrays', function(){
            expect(__.replaceString('Hello world!', ['e', 'o'], 'a'))
                .toEqual('Halla warld!');

            expect(__.replaceString('Hello world!', ['e', 'o'], ['a', 'u']))
                .toEqual('Hallu wurld!');
        });

        it('should care about case sensitivity', function(){
            expect(__.replaceString('Hello World and world!', 'World', 'Earth'))
                .toEqual('Hello Earth and world!');

            expect(__.replaceString('Hello World and world!', 'World', 'Earth', {caseSensitive: false}))
                .toEqual('Hello Earth and Earth!');
        });

        it('should work multiline', function(){
            expect(__.replaceString('Hello\nworld!', '^world', 'earth', {multiline: true, regexp: true}))
                .toEqual('Hello\nearth!');

            expect(__.replaceString('Hello\nworld!', '^world', 'earth', {multiline: false, regexp: true}))
                .toEqual('Hello\nworld!');

            expect(__.replaceString('Hello\nworld\nearth!', ['^world', '^earth'], ['earth', 'planet'], {multiline: true, regexp: true}))
                .toEqual('Hello\nplanet\nplanet!');

            expect(__.replaceString('Hello\nworld\nearth!', ['^world', '^earth'], ['earth', 'planet'],
                {multiline: true, regexp: true, global: false}))
                .toEqual('Hello\nplanet\nearth!');
        });

        it('should work with and without regexp', function(){
            expect(__.replaceString('Hello world warld wurld!', 'w.rld', 'earth'))
                .toEqual('Hello world warld wurld!');

            expect(__.replaceString('Hello world warld wurld!', 'w.rld', 'earth', {regexp: true}))
                .toEqual('Hello earth earth earth!');

            expect(__.replaceString('Hello world warld wurld!', ['w.rld', 'Hello'], ['earth', 'Goodbye'], {regexp: true}))
                .toEqual('Goodbye earth earth earth!');

            expect(__.replaceString('Hello world warld wurld!', ['w.rld', 'Hello'], 'earth', {regexp: true}))
                .toEqual('earth earth earth earth!');

            expect(__.replaceString('Hello world!', 'Hello (.*)\\!', '$1', {regexp: true}))
                .toEqual('world');
        });

        it('should work with replacing function', function(){
            var replaced = __.replaceString('Hello world!', '([e|o])', function(match, groupOne){
                return 'a';
            }, {regexp: true});

            expect(replaced).toEqual('Halla warld!');

            var replaced2 = __.replaceString('Hello world!', ['e', 'o'], function(match, groupOne){
                return 'a';
            }, {regexp: true});

            expect(replaced).toEqual('Halla warld!');
        });
    });

    // __.replaceStringByPosition
    describe('__.replaceStringByPosition', function(){
        it('should replace string between given positions', function(){
            expect(__.replaceStringByPosition('Hello world!', 'earth', 6, 11)).toEqual('Hello earth!');
        });
    });

    // __.toLowerCase
    describe('__.toLowerCase', function(){
        it('should convert lower case given string', function(){
            expect(__.toLowerCase('Information Technologies')).toEqual('information technologies');
            expect(__.toLowerCase('Isınma Sorunu')).toEqual('isınma sorunu');
        });

        it('should do language based lowerize', function(){
            expect(__.toLowerCase('Isınma Sorunu', {language: 'turkish'})).toEqual('ısınma sorunu');
        });
    });

    // __.toUpperCase
    describe('__.toUpperCase', function(){
        it('should convert uper case given string', function(){
            expect(__.toUpperCase('information technologies')).toEqual('INFORMATION TECHNOLOGIES');
            expect(__.toUpperCase('istanbul')).toEqual('ISTANBUL');
        });

        it('should do language based upperize', function(){
            expect(__.toUpperCase('istanbul', {language: 'turkish'})).toEqual('İSTANBUL');
        });
    });

    // __.isUrl
    describe('__.isUrl', function(){
        it('should expect theese url types', function(){
            expect(__.isUrl('http://sub.domain.tld/')).toEqual(true);
            expect(__.isUrl('http://sub.domain.tld')).toEqual(true);
            expect(__.isUrl('https://sub.domain.tld/')).toEqual(true);
            expect(__.isUrl('https://sub.domain.tld')).toEqual(true);
            expect(__.isUrl('http://domain.tld/')).toEqual(true);
            expect(__.isUrl('http://domain.tld')).toEqual(true);
            expect(__.isUrl('https://domain.tld/')).toEqual(true);
            expect(__.isUrl('https://domain.tld')).toEqual(true);
            expect(__.isUrl('sub.domain.tld/')).toEqual(true);
            expect(__.isUrl('sub.domain.tld')).toEqual(true);
            expect(__.isUrl('123.domain.tld/')).toEqual(true);
            expect(__.isUrl('123.domain.tld')).toEqual(true);
            expect(__.isUrl('domain.tld/')).toEqual(true);
            expect(__.isUrl('domain.tld')).toEqual(true);
            expect(__.isUrl('1234.tld/')).toEqual(true);
            expect(__.isUrl('1234.tld')).toEqual(true);
            expect(__.isUrl('/domain.tld/')).toEqual(true);
            expect(__.isUrl('/domain.tld')).toEqual(true);
            expect(__.isUrl('/absolute/path/')).toEqual(true);
            expect(__.isUrl('/absolute/file')).toEqual(true);
            expect(__.isUrl('relative/path/')).toEqual(true);
            expect(__.isUrl('relative/file')).toEqual(true);
            expect(__.isUrl('192.168.1.1')).toEqual(true);
            expect(__.isUrl('192.168.1.1/path/')).toEqual(true);
            expect(__.isUrl('192.168.1.1/file')).toEqual(true);

            expect(__.isUrl('123')).toEqual(false);
            expect(__.isUrl('test')).toEqual(false);
        });
    });

    // __.toCamelCase
    describe('__.toCamelCase', function(){
        it('should convert dash-seperated strings to camelCase type', function(){
            expect(__.toCamelCase('here-i-am')).toEqual('hereIAm');
        });

        it('should take care of upper case strings', function(){
            expect(__.toCamelCase('HERE-I-AM')).toEqual('hereIAm');
        });
    });

    // __.toDashSeperated
    describe('__.toDashSeperated', function(){
        it('should convert camelCase type strings to dash-seperated strings by default', function(){
            expect(__.toDashSeperated('hereIAm')).toEqual('here-i-am');
        });

        it('should take care of uppercase strings', function(){
            expect(__.toDashSeperated('HereIAm')).toEqual('here-i-am');
        });

        it('should accept symbol instead of dash', function(){
            expect(__.toDashSeperated('HereIAm', '_')).toEqual('here_i_am');
        });
    });

    // ### ARRAY

    // __.find
    describe('__.find', function(){
        /* General values. */
        var dataArray       = ['data', 'cat', 'meta', 'atv'],
            numberArray     = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
            objectArray     = [{value: 'data'}, {value: 'cat'}, {value: 'meta'}, {value: 'atv'}],
            objectArray2    = [{value: 'data', index: 0}, {value: 'cat', index: 1}, {value: 'meta', index: 2}, {value: 'atv', index: 3}];

        it('should find items from array which exactly same with given string', function(){
            expect(__.find(dataArray, 'cat')).toEqual(['cat']);
            expect(__.find(dataArray, 'cat', {searchType: 'exact'})).toEqual(['cat']);
        });

        it('should make deep comparison with given keys when searchType is partial', function(){
            expect(__.find(objectArray2, {value: 'data'}, {searchType: 'partial'}))
                .toEqual([{value: 'data', index: 0}]);

            expect(__.find(objectArray2, {value: 'data'}, {searchType: 'partial', includeIndex: true}))
                .toEqual([{item: {value: 'data', index: 0}, index: 0}]);
        });

        it('should accept a function as comparisor', function(){
            expect(__.find(numberArray, function(item){ return item > 63; })).toEqual([64, 128, 256, 512, 1024]);
        });

        it('should find items from array which bigger than given number', function(){
            expect(__.find(numberArray, 63, {searchType: 'bigger'})).toEqual([64, 128, 256, 512, 1024]);
        });

        it('should find items from array which smaller than given number', function(){
            expect(__.find(numberArray, 63, {searchType: 'smaller'})).toEqual([2, 4, 8, 16, 32]);
        });

        it('should find items from array which contain given string', function(){
            expect(__.find(dataArray, 'at', {searchType: 'contains'})).toEqual(['data', 'cat', 'atv']);
        });

        it('should find items from array which containsOnly given string', function(){
            expect(__.find(dataArray, 'at', {searchType: 'containsOnly'})).toEqual(['data']);
        });

        it('should find items from array which startsWith given string', function(){
            expect(__.find(dataArray, 'at', {searchType: 'startsWith'})).toEqual(['atv']);
        });

        it('should find items from array which endsWith given string', function(){
            expect(__.find(dataArray, 'at', {searchType: 'endsWith'})).toEqual(['cat']);
        });

        it('should find items from array which contains objects with key names', function(){
            expect(__.find(objectArray, 'at', {searchType: 'endsWith', key: 'value'})).toEqual([{value: 'cat'}]);
        });

        it('should return wrapped result if includeIndex sent true', function(){
            expect(__.find(objectArray, 'at', {searchType: 'endsWith', key: 'value', includeIndex: true}))
                .toEqual([{item: {value: 'cat'}, index: 1}]);

            expect(__.find(dataArray, 'at', {searchType: 'containsOnly', includeIndex: true}))
                .toEqual([{item: 'data', index: 0}]);

            expect(__.find(['İstanbul', 'istanbul'], 'Istanbul', {standardise: true}))
                .toEqual(['İstanbul', 'istanbul']);
        });

        it('should return given value back if searchType is wrong', function(){
            expect(__.find(objectArray, 'at', {searchType: 'xxx'})).toEqual(objectArray);
        });
    });

    // ### COLLECTION
});