(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
    UMD Template
    Using UMD with grunt-umd.
    Look at build/umd/umd.hbs for more information.
*/ 
(function (root, factory) {
    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        /** AMD. Register as an anonymous module. */
        define(['./vendors/lodash.custom.js'], function (_) {
            return (root['__'] = factory(_));
        });
    } else if (typeof exports === 'object') {
        /**
            Node. Does not work with strict CommonJS, but
            only CommonJS-like enviroments that support module.exports,
            like Node.
        */
        var module_exports = factory(require('./vendors/lodash.custom.js'));
        module.exports = module_exports;

        /** FIX FOR BROWSERIFY: Set global alias if we in browserify. */
        if(typeof window !== "undefined"){
            window['__'] = module_exports;
        }
    } else {
        /** Browser globals */
        root['__'] = factory(_);
    }
}(this, function (_) {
    var __ =     /**
     *  UXRocket.Utils
     *  Missing utils/helpers for JavaScript.
     */
    (function(root){
        'use strict';

        /** jshint in-file settings*/
        /* global _ */

        /** Ignore dependency control in coverage. */
        /* istanbul ignore if */
        if(typeof _ === 'undefined'){
            throw 'UXRocket Utils require Lodash.';
        }

        /** Get previous binding to double underscore. */
        var previousDoubleUnderscore = root.__;

        /** Charmap for standardise */
        var standardiseMap = {
            a   : ['ā', 'ă', 'ą'],
            A   : ['Ā', 'Ă', 'Ą'],
            c   : ['ç', 'ć', 'ĉ', 'ċ', 'č'],
            C   : ['Ç', 'Ć', 'Ĉ', 'Ċ', 'Č'],
            d   : ['ď', 'đ'],
            D   : ['ď', 'đ'],
            e   : ['ē', 'ĕ', 'ė', 'ę', 'ě'],
            E   : ['Ē', 'Ĕ', 'Ė', 'Ę', 'Ě'],
            g   : ['ğ', 'ĝ', 'ġ', 'ģ'],
            G   : ['Ğ', 'Ĝ', 'Ġ', 'Ģ'],
            h   : ['ĥ', 'ħ'],
            H   : ['Ĥ', 'Ħ'],
            i   : ['ı', 'i', 'ĩ', 'ī', 'ĭ', 'į'],
            I   : ['I', 'İ', 'Ĩ', 'Ī', 'Ĭ', 'Į'],
            j   : ['ĳ', 'ĵ'],
            J   : ['Ĳ', 'Ĵ'],
            k   : ['ķ', 'ĸ'],
            K   : ['ķ', 'ĸ'],
            l   : ['ĺ', 'ļ', 'ľ', 'ŀ', 'ł'],
            L   : ['Ĺ', 'Ļ', 'Ľ', 'Ŀ', 'Ł'],
            n   : ['ń', 'ņ', 'ň', 'ŉ', 'ŋ'],
            N   : ['Ń', 'Ņ', 'Ň', 'ŉ', 'Ŋ'],
            o   : ['ö', 'ō', 'ŏ', 'ő', 'œ'],
            O   : ['Ö', 'Ō', 'Ŏ', 'Ő', 'Œ'],
            r   : ['ŕ', 'ŗ', 'ř'],
            R   : ['Ŕ', 'Ŗ', 'Ř'],
            s   : ['ş', 'ś', 'ŝ', 'ş', 'š'],
            S   : ['Ş', 'Ś', 'Ŝ', 'Ş', 'Š'],
            t   : ['ţ', 'ť', 'ŧ'],
            T   : ['Ţ', 'Ť', 'Ŧ'],
            u   : ['ü', 'ũ', 'ū', 'ŭ', 'ů', 'ű', 'ų'],
            U   : ['Ü', 'Ũ', 'Ū', 'Ŭ', 'Ů', 'Ű', 'Ų'],
            w   : ['ŵ'],
            W   : ['Ŵ'],
            y   : ['ŷ', 'Ÿ'],
            Y   : ['Ŷ', 'Ÿ'],
            z   : ['ź', 'ż', 'ž'],
            Z   : ['Ź', 'Ż', 'Ž']
        };

        /** Language char maps */
        var languagesCharMap = {
            turkish: {
                lowerCase: ['ç', 'ğ', 'ı', 'i', 'ö', 'ş', 'ü'],
                upperCase: ['Ç', 'Ğ', 'I', 'İ', 'Ö', 'Ş', 'Ü']
            }
        };

        // ## Structral Functions
        // __.noConflict
        /**
         * Reverts the '__' variable to its previous value and returns a reference the UXRocket Utils.
         *
         * @returns {object} UXRocket Utils
         *
         * @examples
         * var UXRocketUtils = __.noConflict();
         */
        function noConflict(){
            root.__ = previousDoubleUnderscore;
            return UXRocketUtils;
        }

        // ## Utils Functions

        // ### Array

        // __.find
        /**
         * Find items from given array which ones return true from comparisor given target.
         *
         * @param {array} array
         * @param {string|number|object|function|boolean|null|undefined} target
         * @param {object} [options]
         * @returns {array}
         *
         * @options
         *
         * > searchType
         *      Determine how function gonna search item inside array items.
         *      type    : string | function
         *      default : exact
         *
         *      values  :
         *      -'exact'          Looks for exact matching. Will use lodash _.isEqual for comparising. (all types)
         *      -'partial'        Will find items which has equivalent values with target. (for objects)
         *      -'bigger'         Brings bigger numbers than given one. (for numbers)
         *      -'smaller'        Brings smaller numbers than given one. (for numbers)
         *      -'contains'       Check if item contains given string. (for strings)
         *      -'containsOnly'   Item should only contain string, not start or end with it. (for strings)
         *      -'startsWith'     Item should start with given string. (for strings)
         *      -'endsWith'       Item should end with given string. (for strings)
         *
         * > key
         *      If items of array is not string and is a object, specify a key to perform search.
         *      type    : string
         *      default : null
         *
         * > includeIndex
         *      Wrap founded item with object which contains index of item and item itself.
         *      type    : boolean
         *      default : false
         *
         * > standardise
         *      Standardise item and target before comparison.
         *      type    : boolean
         *      default : false
         *
         * @examples
         *
         * var  dataArray   = ['cat', 'data', 'meta', 'atv'],
         *      numberArray = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
         *      objectArray = [
         *          {value: 'data'},
         *          {value: 'cat'},
         *          {value: 'meta'},
         *          {value: 'atv'}
         *      ];
         *      objectArray2 = [
         *          {value: 'data', index: 0},
         *          {value: 'cat', index: 1},
         *          {value: 'meta', index: 2},
         *          {value: 'atv', index: 3}
         *      ];
         *
         * __.find(dataArray, 'at');
         * //=> ['cat', 'data', 'atv']
         *
         * __.find(numberArray, 63, {searchType: 'bigger'});
         * //=> [64, 128, 256, 512, 1024]
         *
         * __.find(objectArray, 'cat', {key: 'value'});
         * //=> [{value: 'cat'}]
         *
         * __.find(objectArray, 'cat', {key: 'value', includeIndex: true});
         * //=>[{index: 1, item: {value: 'cat'}}]
         *
         * __.find(objectArray2, {value: 'cat'}, {searchType: 'partial'});
         * //=> [{value: 'cat', index: 1}]
         *
         * __.find(objectArray2, {value: 'cat'}, {searchType: 'partial', includeIndex: true});
         * //=> [{index: 1, item: {value: 'cat', index: 1}}]
         *
         * __.find(numberArray, function(item){ return item > 63; });
         * //=> [64, 128, 256, 512, 1024]
         *
         */
        function find(array, target, options){
            /* Extend options */
            options = extend({
                searchType  : 'exact',
                key         : null,
                includeIndex: false,
                standardise : false
            }, options || {});

            /* Standardise string */
            if(options.standardise){
                target = standardiseString(target);
            }

            /* Include index to search results */
            if(options.includeIndex){
                array = map(array, function(item, index){
                    return {item: item, index: index};
                });
            }

            /* Actual comparisor function */
            var finder = curry(function(comparisor, item){
                /* Get original item if wrapper exist */
                if(options.includeIndex){
                    item = item.item;
                }

                /* Use key name if exist */
                if(options.key !== null){
                    item = item[options.key];
                }

                /* Use key name if exist */
                if(options.standardise){
                    item = standardiseString(item);
                }

                /* Return result */
                return comparisor(item, target);
            });

            /* Determine search method. */
            var searchMethod;
            if(type(target) === 'function'){
                searchMethod = finder(target);
            }else{
                switch(options.searchType){
                    case 'exact':
                        searchMethod = finder(isEqual);
                        break;
                    case 'partial':
                        searchMethod = finder(function(item, target){
                            return isEqual(target, pick(item, keys(target)));
                        });
                        break;
                    case 'bigger':
                        searchMethod = finder(function(item, target){
                            return item > target;
                        });
                        break;
                    case 'smaller':
                        searchMethod = finder(function(item, target){
                            return item < target;
                        });
                        break;
                    case 'contains':
                        searchMethod = finder(contains);
                        break;
                    case 'containsOnly':
                        searchMethod = finder(containsOnly);
                        break;
                    case 'startsWith':
                        searchMethod = finder(startsWith);
                        break;
                    case 'endsWith':
                        searchMethod = finder(endsWith);
                        break;
                    default:
                        return array;
                }
            }

            /* Filter array */
            return filter(array, searchMethod);
        }

        // ### Collection

        // ### DOM

        // __.collectAttributes
        /**
         * Collects attributes from element whichs starts with given prefix. (default prefix is data-)
         *
         * Important: The attributes which contains underscore '_' going to accept as new namespace. And values after underscore
         * will nested under this namespace. For disabling it set options.underscoreNesting = false; Check examples for more info.
         *
         * @param {HTMLElement} element
         * @param {string} prefix
         * @param {object} [options]
         * @returns {object} collected attributes
         *
         * @options
         *
         *
         * @examples
         *
         *
         */
        function collectAttributes(element, prefix, options){
            /* Extend options */
            options = extend({
                underscoreNesting: true
            }, options || {});

            /* Hold attributes */
            var attributes = {};

            /* Collect attributes */
            each(element.attributes, function(attribute){
                /* Get node info */
                var nodeName = attribute.name,
                    nodeValue = attribute.value;

                /* Skip if prefix provided but attribute doesnt start with it. */
                if(prefix && !startsWith(nodeName, prefix)) return;

                /* Underscore nesting mode. */
                if(options.underscoreNesting){
                    /* Keep previous namespace */
                    var previousNamespace = attributes;

                    /* Split with underscore and process the list */
                    each(nodeName.split('_'), function(nestingName, index, collection){
                        /* Remove prefix and convert to camel case */
                        if(prefix) nestingName = nestingName.replace(prefix + '-', '');

                        /* Convert underscore-seperated name to camelCase */
                        nestingName = toCamelCase(nestingName);

                        /* If there is another values */
                        if(index < collection.length - 1){
                            /* Create name space if doesnt exist */
                            if(!previousNamespace[nestingName]) previousNamespace[nestingName] = {};

                            /* Change previous name space. */
                            previousNamespace = previousNamespace[nestingName];
                        }
                        /* If this is the last value. */
                        else{
                            previousNamespace[nestingName] = nodeValue;
                        }
                    });
                }
                /* Simple mode */
                else{
                    attributes[toCamelCase(nodeName.replace(prefix + '-', ''))] = nodeValue;
                }
            });
            /* Return attributes object. */
            return attributes;
        }

        // ### FUNCTION

        // __.runAsync
        /**
         * Runs function asynchronously.
         * If callback provided, callback gonna call with returned value from evaluated function.
         *
         * @param {function} func
         * @param {function} callback
         */
        function runAsync(func, callback){
            return setTimeout(function(){
                var returnedValue = func();

                /* Call callback if provided with returned value. */
                if(type(callback) === 'function'){
                    callback(returnedValue);
                }
            }, 0);
        }

        // __.evaluateFunctionCall
        /**
         * Evaluates function calls in correct context without using 'eval'.
         * If callback provided, and it is afunction; options.async will set to true as default
         * and callback gonna call with returned value from evaluated function.
         *
         * @param {string} functionCallString
         * @param {function} callback
         * @param {object} options
         *
         * @options
         *
         * > async
         *      If true, will run function asynchronously.
         *      type    : boolean
         *      default : false
         *
         * @example
         *
         */
        function evaluateFunctionCall(functionCallString, callback, options){
            /* Extend options */
            options = extend({
                async: type(callback) === 'function'
            }, options || {});

            /* Control and Seperation RegExps */
            var isFunctionCall                      = /(.*)\((.*)\)/,
                seperateParamsFromFunctionNamespace = /\((.*)\)/,
                seperateContextFromFunctionName     = /\.(?=[^.]*$)/;

            /* Test if string is realy a function call */
            if(!isFunctionCall.test(functionCallString)) return false;

            /* Seperate function name from parameters. */
            var seperatedCall   = functionCallString.split(seperateParamsFromFunctionNamespace),
                functionName    = seperatedCall[0],
                functionContext = root,
                parameters      = (seperatedCall[1] ? seperatedCall[1].split(',') : []);

            /* If there is nested context in function name*/
            if(contains(functionName, '.')){
                /* Seperate context from function name */
                var seperatedContext = seperatedCall[0].split(seperateContextFromFunctionName);

                /* Get correct context and function name */
                functionName     = seperatedContext[1];
                functionContext  = parseNesting(seperatedContext[0]);
            }

            /* Evaluater */
            var evaluateFunction = function(){
                return functionContext[functionName].apply(functionContext, parameters);
            };

            /* Run function sync or async */
            if(options.async){
                return runAsync(evaluateFunction, callback);
            }else{
                return evaluateFunction();
            }
        }

        // ### RegExp

        // __.regexpEscape
        /**
         * Escape regexp inside string.
         *
         * @param {string} string that contains regexp
         * @returns {string} escaped regexp
         *
         * @example
         *
         * __.regexpEscape('.*');
         * //=> '\.\*'
         */
        function regexpEscape(string){
            return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
        }

        // ### String

        // __.containsOnly
        /**
         * Checks if string contains target but not starts or ends with it.
         *
         * @param {string} string
         * @param {string} target
         * @returns {boolean}
         *
         * @example
         *
         * __.containsOnly('data', 'at');
         * //=> true
         *
         * __.containsOnly('at', 'at');
         * //=> true
         *
         * __.containsOnly('cat', 'at');
         * //=> false
         */
        function containsOnly(string, target){
            return string === target || (!startsWith(string, target) && !endsWith(string, target) && contains(string, target));
        }

        // __.startsWith
        /**
         * Checks if string starts with given string target.
         *
         * @param string
         * @param target
         * @returns {boolean}
         *
         * @example
         *
         * __.startsWith('atv', 'at');
         * //=> true
         *
         * __.startsWith('at', 'at');
         * //=> true
         *
         * __.startsWith('cat', 'at');
         * //=> false
         */
        function startsWith(string, target){
            return string.substr(0, target.length) === target;
        }

        // __.endsWith
        /**
         * Checks if string ends with target.
         *
         * @param {string} string
         * @param {string} target
         * @returns {boolean}
         *
         * @example
         *
         * __.endsWith('cat', 'at');
         * //=> true
         *
         * __.endsWith('at', 'at');
         * //=> true
         *
         * __.endsWith('atv', 'at');
         * //=> false
         */
        function endsWith(string, target){
            return string.substr(string.length - target.length, target.length) === target;
        }

        // __.isUrl
        /**
         * Checks if string is an url.
         * http://www.regexr.com/39v08
         *
         * @param {url} string
         *
         * @example
         *
         *
         */
        function isUrl(string){
            return (new RegExp(
                '(' +
                    '^((http|https)://)|' +
                    '^\/[a-zA-Z0-9_]+|' +
                    '^\\.\\.*\/[a-zA-Z0-9_]+|' +
                    '^(([0-9]{1,3}\\.){3}([0-9]{1,3}))|' +
                    '^(([a-zA-Z0-9_]+\\.)?[a-zA-Z0-9_]+\\.[a-zA-Z0-9_]{2,})|' +
                    '^([a-zA-Z0-9_]*\/)+' +
                ')'
            )).test(string);
        }

        // __.standardiseString
        /**
         * Standardise given string into english letters.
         * Disallow converting lower case is optional.
         *
         * @param {string} string
         * @param {boolean} dontLowerCase
         * @returns {string} standardised string.
         *
         * @example
         *
         * __.standardiseString('Örneğin ilginçtir, müzik ruhun gıdasıdır.');
         * //=> 'ornegin ilginctir, muzik ruhun gidasidir.'
         */
        function standardiseString(string, dontLowerCase){
            /* Proccess standardise map */
            each(standardiseMap, function(replaceIt, replaceWith){
                /* Replace string. */
                string = replaceString(string, replaceIt, replaceWith);
            });

            /* Lower case string by settings. */
            if(!dontLowerCase) string = string.toLowerCase();

            /* Return string. */
            return string;
        }

        // __.replaceString
        /**
         * Replace string.
         * Supports arrays as replace map.
         *
         * @param {string} string
         * @param {string|object} replaceIt
         * @param {string|object|function} replaceWith
         * @param {object} [options]
         * @returns {string} replaced string
         */
        function replaceString(string, replaceIt, replaceWith, options){
            /* Extend options */
            options = extend({
                regexp          : false,
                global          : true,
                caseSensitive   : true,
                multiline       : false
            }, options || {});

            /* Create regexp settings by options */
            var regexpSettings = '';
            if(options.global)
                regexpSettings += 'g';
            if(!options.caseSensitive)
                regexpSettings += 'i';
            if(options.multiline)
                regexpSettings += 'm';

            /* Replace if all items are string. */
            if(type(replaceIt) === 'string' && (type(replaceWith) === 'string' || type(replaceWith) === 'function')){
                /* Escape regexp by settings. */
                if(!options.regexp) replaceIt = regexpEscape(replaceIt);

                /* Return replaced string. */
                return string.replace(new RegExp(replaceIt, regexpSettings), replaceWith);
            }

            /* If replaceIt is an array. */
            if(type(replaceIt) === 'array' &&
                (type(replaceWith) === 'array' || type(replaceWith) === 'string' || type(replaceWith) === 'function')){

                /* Check if replace with is an array. */
                var replaceWithArray = (type(replaceWith) === 'array');

                /* Process replace list. */
                each(replaceIt, function(value, index){
                    /* Escape regexp by settings. */
                    if(!options.regexp) value = regexpEscape(value);

                    /* If replaceWith is an array, find out counter item. */
                    var replaceWithItem = replaceWithArray ? replaceWith[index] : replaceWith;

                    /* Replace string. */
                    string = string.replace(new RegExp(value, regexpSettings), replaceWithItem);
                });

                /* Return replaced string. */
                return string;
            }

            /* Return original string if nothing changed. */
            return string;
        }

        // __.replaceStringByPosition
        /**
         * Replace string between start and end positions.
         *
         * @param {string} string
         * @param {string} replaceWith
         * @param {number} startPos
         * @param {number} endPos
         * @returns {string} replaced string
         */
        function replaceStringByPosition(string, replaceWith, startPos, endPos){
            /* Split text by position. */
            var length = string.length,
                before = string.substring(0, startPos),
                after  = string.substring(endPos, length);

            /* Return replaced string. */
            return before + replaceWith + after;
        }

        // __.toLowerCase
        /**
         * Convert letters to lower case, and perform language based conversion if specified.
         *
         * @param {string} string
         * @param {object} [options]
         * @returns {string} lowerized string
         *
         * @options
         *
         * > language
         *      Which language gonna used for language based conversion.
         *
         *      type    : string
         *      default : null
         *      values  : properties of languagesCharMap
         *
         * @examples
         *
         * toLowerCase('Information Technologies');
         * //=> 'information technologies'
         *
         * toLowerCase('Isınma Sorunu');
         * //=> 'isınma sorunu'
         *
         * toLowerCase('Isınma Sorunu', {language: 'turkish'});
         * //=> 'ısınma sorunu'
         */
        function toLowerCase(string, options){
            /* Extend options */
            options = extend({
                language: null
            }, options || {});

            /* If language specified first perform replace, then lowerize cases. */
            if(options.language){
                var map = languagesCharMap[options.language];
                return replaceString(string, map.upperCase, map.lowerCase).toLocaleLowerCase();
            }

            /* If there isnt language, simply lower case string. */
            return string.toLowerCase();
        }

        // __.toUpperCase
        /**
         * Convert letters to upper case, and perform language based conversion if specified.
         *
         * @param {string} string
         * @param {object} [options]
         * @returns {string} upperized string
         *
         * @options
         *
         * > language
         *      Which language gonna used for language based conversion.
         *
         *      type    : string
         *      default : null
         *      values  : properties of languagesCharMap
         *
         * @examples
         *
         * toUpperCase('information technologies');
         * //=> 'INFORMATION TECHNOLOGIES'
         *
         * toUpperCase('istanbul');
         * //=> 'ISTANBUL'
         *
         * toUpperCase('istanbul', {language: 'turkish'});
         * //=> 'İSTANBUL'
         */
        function toUpperCase(string, options){
            /* Extend options */
            options = extend({
                language: null
            }, options || {});

            /* If language specified first perform replace, then upperize cases. */
            if(options.language){
                var map = languagesCharMap[options.language];
                return replaceString(string, map.lowerCase, map.upperCase).toLocaleUpperCase();
            }

            /* If there isnt language, simply upper case string. */
            return string.toUpperCase();
        }

        // __.toCamelCase
        /**
         * Converts given underscore seperated string to camel case.
         *
         * @param {string} string
         * @returns {string} camelCased string.
         *
         * @example
         *
         * toCamelCase('data-source');
         * //=> 'dataSource'
         */
        function toCamelCase(string){
            return replaceString(toLowerCase(string), '-(.)', function(match, firstLetter){
                return toUpperCase(firstLetter);
            }, {regexp: true});
        }

        // __.toDashSeperated
        /**
         * Converts given camelCase and PascalCase string to dash seperated string.
         *
         * @param {string} string
         * @param {string} [symbol='-'] if provided gonna use instead of dash.
         * @returns {string} dash-seperated string.
         *
         * @example
         *
         * toDashSeperated('dataSource');
         * //=> 'data-source'
         *
         * toDashSeperated('dataSource', '_');
         * //=> 'data_source'
         *
         */
        function toDashSeperated(string, symbol){
            /* Assign default */
            symbol || (symbol = '-');

            /* Lower case first letter of string. */
            string = toLowerCase(string[0]) + string.substr(1);

            /* Return symbol-seperated string */
            return replaceString(string, '([A-Z])', function(match, firstLetter){
                return symbol + firstLetter.toLowerCase();
            }, {regexp: true});
        }

        // ### Misc

        // __.type
        /**
         * Returns exact type of item.
         * @param item
         * @returns {string} type of item
         */
        function type(item){
            return Object.prototype.toString.call(item).toLowerCase().match(/\[object (.*)\]/)[1];
        }

        // __.parseNesting
        /**
         * Going to parse given dot orienting nesting and return finded value.
         *
         * @param {string} nestingExpression
         * @param {object} [context=root]
         * @returns {*}
         *
         * @example
         *
         * window.stuff = {
         *      nested: {
         *          deep: {
         *              wow: 'such'
         *          }
         *      }
         * }
         *
         * __.parseNesting('stuff.nested.deep.wow');
         * //=> 'such'
         *
         * __.parseNesting('nested.deep.wow', stuff);
         * //=> 'such'
         */
        function parseNesting(nestingExpression, context){
            /* If context not provided, take root as context (root is window in browser) */
            context || (context = root);

            /* Dig into nesting. */
            return reduce(nestingExpression.split('.'), function(parent, child){
                return (parent && parent[child] ? parent[child] : undefined);
            }, context);
        }

        // ## Export & Architecture

        /**
         * Lodash Aliases
         * Check lodash documentation for explanations.
         */
        var contains    = _.contains,
            curry       = _.curry,
            each        = _.each,
            extend      = _.extend,
            filter      = _.filter,
            forOwn      = _.forOwn,
            isEqual     = _.isEqual,
            keys        = _.keys,
            map         = _.map,
            pick        = _.pick,
            reduce      = _.reduce;

        /**
         * Creates an UXRocketUtils object, which wraps given value to enable chaining.
         */
        var UXRocketUtils = function(value){
            return (value && type(value) === 'object' && value.hasOwnProperty('__value__')) ? value : new UXRocketUtilsWrapper(value);
        };

        /* Actual chain wrapper. */
        function UXRocketUtilsWrapper(value){
            this.__value__ = value;
        }

        /* Wrap actual functions to they can work with chained values and returns chainable or bare values. */
        function chainWrapper(continueChaining){
            forOwn(UXRocketUtils, function(method, name){
                if(!UXRocketUtils.prototype[name]){
                    UXRocketUtils.prototype[name] = function(){
                        /* Arguments have to start with actual value. */
                        var args = [this.__value__];

                        /* Add arguments to after */
                        args.push.apply(args, arguments);

                        /* Get results */
                        var result = method.apply(UXRocketUtils, args);

                        /* If chaining has to continue, assign value and return wrapper itself. */
                        if(continueChaining){
                            this.__value__ = result;
                            return this;
                        }

                        /* If we dont want chaining return bare results. */
                        else{
                            return result;
                        }
                    };
                }
            });
        }

        /* Inherit wrapper from utils constructor. */
        UXRocketUtilsWrapper.prototype = UXRocketUtils.prototype;

        /* Custom correction of .toString() */
        function wrapperToString(){
            /*jshint validthis:true */
            return String(this.__value__);
        }

        /* Custom correction of .valueOf() */
        function wrapperValueOf(){
            /*jshint validthis:true */
            return this.__value__;
        }

        /* Correct built-in .toString(), .valueOf() and add custom .value() method. */
        UXRocketUtils.prototype.toString    = wrapperToString;
        UXRocketUtils.prototype.value       = wrapperValueOf;
        UXRocketUtils.prototype.valueOf     = wrapperValueOf;

        /* Chainable Methods */
        UXRocketUtils.collectAttributes         = collectAttributes;
        UXRocketUtils.find                      = find;
        UXRocketUtils.replaceString             = replaceString;
        UXRocketUtils.replaceStringByPosition   = replaceStringByPosition;
        UXRocketUtils.standardiseString         = standardiseString;
        UXRocketUtils.toCamelCase               = toCamelCase;
        UXRocketUtils.toDashSeperated           = toDashSeperated;
        UXRocketUtils.toLowerCase               = toLowerCase;
        UXRocketUtils.toUpperCase               = toUpperCase;

        /**
         * Wrap chainable methods on prototype level
         * for they can work with chained values and
         * return chainable values.
         */
        chainWrapper(true);

        /* Not Chainable Methods */
        UXRocketUtils.contains                  = contains;
        UXRocketUtils.containsOnly              = containsOnly;
        UXRocketUtils.endsWith                  = endsWith;
        UXRocketUtils.evaluateFunctionCall      = evaluateFunctionCall;
        UXRocketUtils.isUrl                     = isUrl;
        UXRocketUtils.noConflict                = noConflict;
        UXRocketUtils.parseNesting              = parseNesting;
        UXRocketUtils.regexpEscape              = regexpEscape;
        UXRocketUtils.runAsync                  = runAsync;
        UXRocketUtils.startsWith                = startsWith;
        UXRocketUtils.type                      = type;

        /**
         * Wrap non-chainable methods on protoype level
         * for they can work with chained values, but
         * these functions will return bare values.
         */
        chainWrapper(false);

        /* Return utils. */
        return UXRocketUtils;
    })(this);;
    return __;
}));
},{"./vendors/lodash.custom.js":2}],2:[function(require,module,exports){
(function (global){
/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash exports="commonjs,node" include="contains,curry,each,extend,filter,forOwn,keys,isEqual,map,pick,reduce" moduleId="lodash" --output dist/vendors/lodash.custom.js`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
;(function() {

  /** Used to pool arrays and objects used internally */
  var arrayPool = [];

  /** Used internally to indicate various things */
  var indicatorObject = {};

  /** Used as the max size of the `arrayPool` and `objectPool` */
  var maxPoolSize = 40;

  /** Used to detected named functions */
  var reFuncName = /^\s*function[ \n\r\t]+\w/;

  /** Used to detect functions containing a `this` reference */
  var reThis = /\bthis\b/;

  /** Used to fix the JScript [[DontEnum]] bug */
  var shadowedProps = [
    'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
    'toLocaleString', 'toString', 'valueOf'
  ];

  /** `Object#toString` result shortcuts */
  var argsClass = '[object Arguments]',
      arrayClass = '[object Array]',
      boolClass = '[object Boolean]',
      dateClass = '[object Date]',
      errorClass = '[object Error]',
      funcClass = '[object Function]',
      numberClass = '[object Number]',
      objectClass = '[object Object]',
      regexpClass = '[object RegExp]',
      stringClass = '[object String]';

  /** Used as the property descriptor for `__bindData__` */
  var descriptor = {
    'configurable': false,
    'enumerable': false,
    'value': null,
    'writable': false
  };

  /** Used as the data object for `iteratorTemplate` */
  var iteratorData = {
    'args': '',
    'array': null,
    'bottom': '',
    'firstArg': '',
    'init': '',
    'keys': null,
    'loop': '',
    'shadowedProps': null,
    'support': null,
    'top': '',
    'useHas': false
  };

  /** Used to determine if values are of the language type Object */
  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  /** Used as a reference to the global object */
  var root = (objectTypes[typeof window] && window) || this;

  /** Detect free variable `exports` */
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  /** Detect free variable `module` */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports` */
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
  var freeGlobal = objectTypes[typeof global] && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    root = freeGlobal;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The base implementation of `_.indexOf` without support for binary searches
   * or `fromIndex` constraints.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {number} Returns the index of the matched value or `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    var index = (fromIndex || 0) - 1,
        length = array ? array.length : 0;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Gets an array from the array pool or creates a new one if the pool is empty.
   *
   * @private
   * @returns {Array} The array from the pool.
   */
  function getArray() {
    return arrayPool.pop() || [];
  }

  /**
   * Checks if `value` is a DOM node in IE < 9.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is a DOM node, else `false`.
   */
  function isNode(value) {
    // IE < 9 presents DOM nodes as `Object` objects except they have `toString`
    // methods that are `typeof` "string" and still can coerce nodes to strings
    return typeof value.toString != 'function' && typeof (value + '') == 'string';
  }

  /**
   * Releases the given array back to the array pool.
   *
   * @private
   * @param {Array} [array] The array to release.
   */
  function releaseArray(array) {
    array.length = 0;
    if (arrayPool.length < maxPoolSize) {
      arrayPool.push(array);
    }
  }

  /**
   * Slices the `collection` from the `start` index up to, but not including,
   * the `end` index.
   *
   * Note: This function is used instead of `Array#slice` to support node lists
   * in IE < 9 and to ensure dense arrays are returned.
   *
   * @private
   * @param {Array|Object|string} collection The collection to slice.
   * @param {number} start The start index.
   * @param {number} end The end index.
   * @returns {Array} Returns the new array.
   */
  function slice(array, start, end) {
    start || (start = 0);
    if (typeof end == 'undefined') {
      end = array ? array.length : 0;
    }
    var index = -1,
        length = end - start || 0,
        result = Array(length < 0 ? 0 : length);

    while (++index < length) {
      result[index] = array[start + index];
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Used for `Array` method references.
   *
   * Normally `Array.prototype` would suffice, however, using an array literal
   * avoids issues in Narwhal.
   */
  var arrayRef = [];

  /** Used for native method references */
  var errorProto = Error.prototype,
      objectProto = Object.prototype,
      stringProto = String.prototype;

  /** Used to resolve the internal [[Class]] of values */
  var toString = objectProto.toString;

  /** Used to detect if a method is native */
  var reNative = RegExp('^' +
    String(toString)
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/toString| for [^\]]+/g, '.*?') + '$'
  );

  /** Native method shortcuts */
  var fnToString = Function.prototype.toString,
      hasOwnProperty = objectProto.hasOwnProperty,
      push = arrayRef.push,
      propertyIsEnumerable = objectProto.propertyIsEnumerable,
      unshift = arrayRef.unshift;

  /** Used to set meta data on functions */
  var defineProperty = (function() {
    // IE 8 only accepts DOM elements
    try {
      var o = {},
          func = isNative(func = Object.defineProperty) && func,
          result = func(o, o, o) && func;
    } catch(e) { }
    return result;
  }());

  /* Native method shortcuts for methods with the same name as other `lodash` methods */
  var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate,
      nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray,
      nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys,
      nativeMax = Math.max;

  /** Used to avoid iterating non-enumerable properties in IE < 9 */
  var nonEnumProps = {};
  nonEnumProps[arrayClass] = nonEnumProps[dateClass] = nonEnumProps[numberClass] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };
  nonEnumProps[boolClass] = nonEnumProps[stringClass] = { 'constructor': true, 'toString': true, 'valueOf': true };
  nonEnumProps[errorClass] = nonEnumProps[funcClass] = nonEnumProps[regexpClass] = { 'constructor': true, 'toString': true };
  nonEnumProps[objectClass] = { 'constructor': true };

  (function() {
    var length = shadowedProps.length;
    while (length--) {
      var key = shadowedProps[length];
      for (var className in nonEnumProps) {
        if (hasOwnProperty.call(nonEnumProps, className) && !hasOwnProperty.call(nonEnumProps[className], key)) {
          nonEnumProps[className][key] = false;
        }
      }
    }
  }());

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a `lodash` object which wraps the given value to enable intuitive
   * method chaining.
   *
   * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
   * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
   * and `unshift`
   *
   * Chaining is supported in custom builds as long as the `value` method is
   * implicitly or explicitly included in the build.
   *
   * The chainable wrapper functions are:
   * `after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`,
   * `compose`, `concat`, `countBy`, `create`, `createCallback`, `curry`,
   * `debounce`, `defaults`, `defer`, `delay`, `difference`, `filter`, `flatten`,
   * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
   * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
   * `invoke`, `keys`, `map`, `max`, `memoize`, `merge`, `min`, `object`, `omit`,
   * `once`, `pairs`, `partial`, `partialRight`, `pick`, `pluck`, `pull`, `push`,
   * `range`, `reject`, `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`,
   * `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`, `transform`,
   * `union`, `uniq`, `unshift`, `unzip`, `values`, `where`, `without`, `wrap`,
   * and `zip`
   *
   * The non-chainable wrapper functions are:
   * `clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `findIndex`,
   * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `has`, `identity`,
   * `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
   * `isEmpty`, `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`,
   * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`,
   * `lastIndexOf`, `mixin`, `noConflict`, `parseInt`, `pop`, `random`, `reduce`,
   * `reduceRight`, `result`, `shift`, `size`, `some`, `sortedIndex`, `runInContext`,
   * `template`, `unescape`, `uniqueId`, and `value`
   *
   * The wrapper functions `first` and `last` return wrapped values when `n` is
   * provided, otherwise they return unwrapped values.
   *
   * Explicit chaining can be enabled by using the `_.chain` method.
   *
   * @name _
   * @constructor
   * @category Chaining
   * @param {*} value The value to wrap in a `lodash` instance.
   * @returns {Object} Returns a `lodash` instance.
   * @example
   *
   * var wrapped = _([1, 2, 3]);
   *
   * // returns an unwrapped value
   * wrapped.reduce(function(sum, num) {
   *   return sum + num;
   * });
   * // => 6
   *
   * // returns a wrapped value
   * var squares = wrapped.map(function(num) {
   *   return num * num;
   * });
   *
   * _.isArray(squares);
   * // => false
   *
   * _.isArray(squares.value());
   * // => true
   */
  function lodash() {
    // no operation performed
  }

  /**
   * An object used to flag environments features.
   *
   * @static
   * @memberOf _
   * @type Object
   */
  var support = lodash.support = {};

  (function() {
    var ctor = function() { this.x = 1; },
        object = { '0': 1, 'length': 1 },
        props = [];

    ctor.prototype = { 'valueOf': 1, 'y': 1 };
    for (var key in new ctor) { props.push(key); }
    for (key in arguments) { }

    /**
     * Detect if an `arguments` object's [[Class]] is resolvable (all but Firefox < 4, IE < 9).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.argsClass = toString.call(arguments) == argsClass;

    /**
     * Detect if `arguments` objects are `Object` objects (all but Narwhal and Opera < 10.5).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.argsObject = arguments.constructor == Object && !(arguments instanceof Array);

    /**
     * Detect if `name` or `message` properties of `Error.prototype` are
     * enumerable by default. (IE < 9, Safari < 5.1)
     *
     * @memberOf _.support
     * @type boolean
     */
    support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') || propertyIsEnumerable.call(errorProto, 'name');

    /**
     * Detect if `prototype` properties are enumerable by default.
     *
     * Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
     * (if the prototype or a property on the prototype has been set)
     * incorrectly sets a function's `prototype` property [[Enumerable]]
     * value to `true`.
     *
     * @memberOf _.support
     * @type boolean
     */
    support.enumPrototypes = propertyIsEnumerable.call(ctor, 'prototype');

    /**
     * Detect if functions can be decompiled by `Function#toString`
     * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.funcDecomp = !isNative(root.WinRTError) && reThis.test(function() { return this; });

    /**
     * Detect if `Function#name` is supported (all but IE).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.funcNames = typeof Function.name == 'string';

    /**
     * Detect if `arguments` object indexes are non-enumerable
     * (Firefox < 4, IE < 9, PhantomJS, Safari < 5.1).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.nonEnumArgs = key != 0;

    /**
     * Detect if properties shadowing those on `Object.prototype` are non-enumerable.
     *
     * In IE < 9 an objects own properties, shadowing non-enumerable ones, are
     * made non-enumerable as well (a.k.a the JScript [[DontEnum]] bug).
     *
     * @memberOf _.support
     * @type boolean
     */
    support.nonEnumShadows = !/valueOf/.test(props);

    /**
     * Detect if `Array#shift` and `Array#splice` augment array-like objects correctly.
     *
     * Firefox < 10, IE compatibility mode, and IE < 9 have buggy Array `shift()`
     * and `splice()` functions that fail to remove the last element, `value[0]`,
     * of array-like objects even though the `length` property is set to `0`.
     * The `shift()` method is buggy in IE 8 compatibility mode, while `splice()`
     * is buggy regardless of mode in IE < 9 and buggy in compatibility mode in IE 9.
     *
     * @memberOf _.support
     * @type boolean
     */
    support.spliceObjects = (arrayRef.splice.call(object, 0, 1), !object[0]);

    /**
     * Detect lack of support for accessing string characters by index.
     *
     * IE < 8 can't access characters by index and IE 8 can only access
     * characters by index on string literals.
     *
     * @memberOf _.support
     * @type boolean
     */
    support.unindexedChars = ('x'[0] + Object('x')[0]) != 'xx';

    /**
     * Detect if a DOM node's [[Class]] is resolvable (all but IE < 9)
     * and that the JS engine errors when attempting to coerce an object to
     * a string without a `toString` function.
     *
     * @memberOf _.support
     * @type boolean
     */
    try {
      support.nodeClass = !(toString.call(document) == objectClass && !({ 'toString': 0 } + ''));
    } catch(e) {
      support.nodeClass = true;
    }
  }(1));

  /*--------------------------------------------------------------------------*/

  /**
   * The template used to create iterator functions.
   *
   * @private
   * @param {Object} data The data object used to populate the text.
   * @returns {string} Returns the interpolated text.
   */
  var iteratorTemplate = function(obj) {

    var __p = 'var index, iterable = ' +
    (obj.firstArg) +
    ', result = ' +
    (obj.init) +
    ';\nif (!iterable) return result;\n' +
    (obj.top) +
    ';';
     if (obj.array) {
    __p += '\nvar length = iterable.length; index = -1;\nif (' +
    (obj.array) +
    ') {  ';
     if (support.unindexedChars) {
    __p += '\n  if (isString(iterable)) {\n    iterable = iterable.split(\'\')\n  }  ';
     }
    __p += '\n  while (++index < length) {\n    ' +
    (obj.loop) +
    ';\n  }\n}\nelse {  ';
     } else if (support.nonEnumArgs) {
    __p += '\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += \'\';\n      ' +
    (obj.loop) +
    ';\n    }\n  } else {  ';
     }

     if (support.enumPrototypes) {
    __p += '\n  var skipProto = typeof iterable == \'function\';\n  ';
     }

     if (support.enumErrorProps) {
    __p += '\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  ';
     }

        var conditions = [];    if (support.enumPrototypes) { conditions.push('!(skipProto && index == "prototype")'); }    if (support.enumErrorProps)  { conditions.push('!(skipErrorProps && (index == "message" || index == "name"))'); }

     if (obj.useHas && obj.keys) {
    __p += '\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n';
        if (conditions.length) {
    __p += '    if (' +
    (conditions.join(' && ')) +
    ') {\n  ';
     }
    __p +=
    (obj.loop) +
    ';    ';
     if (conditions.length) {
    __p += '\n    }';
     }
    __p += '\n  }  ';
     } else {
    __p += '\n  for (index in iterable) {\n';
        if (obj.useHas) { conditions.push("hasOwnProperty.call(iterable, index)"); }    if (conditions.length) {
    __p += '    if (' +
    (conditions.join(' && ')) +
    ') {\n  ';
     }
    __p +=
    (obj.loop) +
    ';    ';
     if (conditions.length) {
    __p += '\n    }';
     }
    __p += '\n  }    ';
     if (support.nonEnumShadows) {
    __p += '\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ';
     for (k = 0; k < 7; k++) {
    __p += '\n    index = \'' +
    (obj.shadowedProps[k]) +
    '\';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))';
            if (!obj.useHas) {
    __p += ' || (!nonEnum[index] && iterable[index] !== objectProto[index])';
     }
    __p += ') {\n      ' +
    (obj.loop) +
    ';\n    }      ';
     }
    __p += '\n  }    ';
     }

     }

     if (obj.array || support.nonEnumArgs) {
    __p += '\n}';
     }
    __p +=
    (obj.bottom) +
    ';\nreturn result';

    return __p
  };

  /*--------------------------------------------------------------------------*/

  /**
   * The base implementation of `_.bind` that creates the bound function and
   * sets its meta data.
   *
   * @private
   * @param {Array} bindData The bind data array.
   * @returns {Function} Returns the new bound function.
   */
  function baseBind(bindData) {
    var func = bindData[0],
        partialArgs = bindData[2],
        thisArg = bindData[4];

    function bound() {
      // `Function#bind` spec
      // http://es5.github.io/#x15.3.4.5
      if (partialArgs) {
        // avoid `arguments` object deoptimizations by using `slice` instead
        // of `Array.prototype.slice.call` and not assigning `arguments` to a
        // variable as a ternary expression
        var args = slice(partialArgs);
        push.apply(args, arguments);
      }
      // mimic the constructor's `return` behavior
      // http://es5.github.io/#x13.2.2
      if (this instanceof bound) {
        // ensure `new bound` is an instance of `func`
        var thisBinding = baseCreate(func.prototype),
            result = func.apply(thisBinding, args || arguments);
        return isObject(result) ? result : thisBinding;
      }
      return func.apply(thisArg, args || arguments);
    }
    setBindData(bound, bindData);
    return bound;
  }

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} prototype The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  function baseCreate(prototype, properties) {
    return isObject(prototype) ? nativeCreate(prototype) : {};
  }
  // fallback for browsers without `Object.create`
  if (!nativeCreate) {
    baseCreate = (function() {
      function Object() {}
      return function(prototype) {
        if (isObject(prototype)) {
          Object.prototype = prototype;
          var result = new Object;
          Object.prototype = null;
        }
        return result || root.Object();
      };
    }());
  }

  /**
   * The base implementation of `_.createCallback` without support for creating
   * "_.pluck" or "_.where" style callbacks.
   *
   * @private
   * @param {*} [func=identity] The value to convert to a callback.
   * @param {*} [thisArg] The `this` binding of the created callback.
   * @param {number} [argCount] The number of arguments the callback accepts.
   * @returns {Function} Returns a callback function.
   */
  function baseCreateCallback(func, thisArg, argCount) {
    if (typeof func != 'function') {
      return identity;
    }
    // exit early for no `thisArg` or already bound by `Function#bind`
    if (typeof thisArg == 'undefined' || !('prototype' in func)) {
      return func;
    }
    var bindData = func.__bindData__;
    if (typeof bindData == 'undefined') {
      if (support.funcNames) {
        bindData = !func.name;
      }
      bindData = bindData || !support.funcDecomp;
      if (!bindData) {
        var source = fnToString.call(func);
        if (!support.funcNames) {
          bindData = !reFuncName.test(source);
        }
        if (!bindData) {
          // checks if `func` references the `this` keyword and stores the result
          bindData = reThis.test(source);
          setBindData(func, bindData);
        }
      }
    }
    // exit early if there are no `this` references or `func` is bound
    if (bindData === false || (bindData !== true && bindData[1] & 1)) {
      return func;
    }
    switch (argCount) {
      case 1: return function(value) {
        return func.call(thisArg, value);
      };
      case 2: return function(a, b) {
        return func.call(thisArg, a, b);
      };
      case 3: return function(value, index, collection) {
        return func.call(thisArg, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(thisArg, accumulator, value, index, collection);
      };
    }
    return bind(func, thisArg);
  }

  /**
   * The base implementation of `createWrapper` that creates the wrapper and
   * sets its meta data.
   *
   * @private
   * @param {Array} bindData The bind data array.
   * @returns {Function} Returns the new function.
   */
  function baseCreateWrapper(bindData) {
    var func = bindData[0],
        bitmask = bindData[1],
        partialArgs = bindData[2],
        partialRightArgs = bindData[3],
        thisArg = bindData[4],
        arity = bindData[5];

    var isBind = bitmask & 1,
        isBindKey = bitmask & 2,
        isCurry = bitmask & 4,
        isCurryBound = bitmask & 8,
        key = func;

    function bound() {
      var thisBinding = isBind ? thisArg : this;
      if (partialArgs) {
        var args = slice(partialArgs);
        push.apply(args, arguments);
      }
      if (partialRightArgs || isCurry) {
        args || (args = slice(arguments));
        if (partialRightArgs) {
          push.apply(args, partialRightArgs);
        }
        if (isCurry && args.length < arity) {
          bitmask |= 16 & ~32;
          return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);
        }
      }
      args || (args = arguments);
      if (isBindKey) {
        func = thisBinding[key];
      }
      if (this instanceof bound) {
        thisBinding = baseCreate(func.prototype);
        var result = func.apply(thisBinding, args);
        return isObject(result) ? result : thisBinding;
      }
      return func.apply(thisBinding, args);
    }
    setBindData(bound, bindData);
    return bound;
  }

  /**
   * The base implementation of `_.flatten` without support for callback
   * shorthands or `thisArg` binding.
   *
   * @private
   * @param {Array} array The array to flatten.
   * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
   * @param {boolean} [isStrict=false] A flag to restrict flattening to arrays and `arguments` objects.
   * @param {number} [fromIndex=0] The index to start from.
   * @returns {Array} Returns a new flattened array.
   */
  function baseFlatten(array, isShallow, isStrict, fromIndex) {
    var index = (fromIndex || 0) - 1,
        length = array ? array.length : 0,
        result = [];

    while (++index < length) {
      var value = array[index];

      if (value && typeof value == 'object' && typeof value.length == 'number'
          && (isArray(value) || isArguments(value))) {
        // recursively flatten arrays (susceptible to call stack limits)
        if (!isShallow) {
          value = baseFlatten(value, isShallow, isStrict);
        }
        var valIndex = -1,
            valLength = value.length,
            resIndex = result.length;

        result.length += valLength;
        while (++valIndex < valLength) {
          result[resIndex++] = value[valIndex];
        }
      } else if (!isStrict) {
        result.push(value);
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.isEqual`, without support for `thisArg` binding,
   * that allows partial "_.where" style comparisons.
   *
   * @private
   * @param {*} a The value to compare.
   * @param {*} b The other value to compare.
   * @param {Function} [callback] The function to customize comparing values.
   * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.
   * @param {Array} [stackA=[]] Tracks traversed `a` objects.
   * @param {Array} [stackB=[]] Tracks traversed `b` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */
  function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {
    // used to indicate that when comparing objects, `a` has at least the properties of `b`
    if (callback) {
      var result = callback(a, b);
      if (typeof result != 'undefined') {
        return !!result;
      }
    }
    // exit early for identical values
    if (a === b) {
      // treat `+0` vs. `-0` as not equal
      return a !== 0 || (1 / a == 1 / b);
    }
    var type = typeof a,
        otherType = typeof b;

    // exit early for unlike primitive values
    if (a === a &&
        !(a && objectTypes[type]) &&
        !(b && objectTypes[otherType])) {
      return false;
    }
    // exit early for `null` and `undefined` avoiding ES3's Function#call behavior
    // http://es5.github.io/#x15.3.4.4
    if (a == null || b == null) {
      return a === b;
    }
    // compare [[Class]] names
    var className = toString.call(a),
        otherClass = toString.call(b);

    if (className == argsClass) {
      className = objectClass;
    }
    if (otherClass == argsClass) {
      otherClass = objectClass;
    }
    if (className != otherClass) {
      return false;
    }
    switch (className) {
      case boolClass:
      case dateClass:
        // coerce dates and booleans to numbers, dates to milliseconds and booleans
        // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
        return +a == +b;

      case numberClass:
        // treat `NaN` vs. `NaN` as equal
        return (a != +a)
          ? b != +b
          // but treat `+0` vs. `-0` as not equal
          : (a == 0 ? (1 / a == 1 / b) : a == +b);

      case regexpClass:
      case stringClass:
        // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
        // treat string primitives and their corresponding object instances as equal
        return a == String(b);
    }
    var isArr = className == arrayClass;
    if (!isArr) {
      // unwrap any `lodash` wrapped values
      var aWrapped = hasOwnProperty.call(a, '__wrapped__'),
          bWrapped = hasOwnProperty.call(b, '__wrapped__');

      if (aWrapped || bWrapped) {
        return baseIsEqual(aWrapped ? a.__wrapped__ : a, bWrapped ? b.__wrapped__ : b, callback, isWhere, stackA, stackB);
      }
      // exit for functions and DOM nodes
      if (className != objectClass || (!support.nodeClass && (isNode(a) || isNode(b)))) {
        return false;
      }
      // in older versions of Opera, `arguments` objects have `Array` constructors
      var ctorA = !support.argsObject && isArguments(a) ? Object : a.constructor,
          ctorB = !support.argsObject && isArguments(b) ? Object : b.constructor;

      // non `Object` object instances with different constructors are not equal
      if (ctorA != ctorB &&
            !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
            ('constructor' in a && 'constructor' in b)
          ) {
        return false;
      }
    }
    // assume cyclic structures are equal
    // the algorithm for detecting cyclic structures is adapted from ES 5.1
    // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
    var initedStack = !stackA;
    stackA || (stackA = getArray());
    stackB || (stackB = getArray());

    var length = stackA.length;
    while (length--) {
      if (stackA[length] == a) {
        return stackB[length] == b;
      }
    }
    var size = 0;
    result = true;

    // add `a` and `b` to the stack of traversed objects
    stackA.push(a);
    stackB.push(b);

    // recursively compare objects and arrays (susceptible to call stack limits)
    if (isArr) {
      // compare lengths to determine if a deep comparison is necessary
      length = a.length;
      size = b.length;
      result = size == length;

      if (result || isWhere) {
        // deep compare the contents, ignoring non-numeric properties
        while (size--) {
          var index = length,
              value = b[size];

          if (isWhere) {
            while (index--) {
              if ((result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB))) {
                break;
              }
            }
          } else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) {
            break;
          }
        }
      }
    }
    else {
      // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
      // which, in this case, is more costly
      forIn(b, function(value, key, b) {
        if (hasOwnProperty.call(b, key)) {
          // count the number of properties.
          size++;
          // deep compare each property value.
          return (result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB));
        }
      });

      if (result && !isWhere) {
        // ensure both objects have the same number of properties
        forIn(a, function(value, key, a) {
          if (hasOwnProperty.call(a, key)) {
            // `size` will be `-1` if `a` has more properties than `b`
            return (result = --size > -1);
          }
        });
      }
    }
    stackA.pop();
    stackB.pop();

    if (initedStack) {
      releaseArray(stackA);
      releaseArray(stackB);
    }
    return result;
  }

  /**
   * Creates a function that, when called, either curries or invokes `func`
   * with an optional `this` binding and partially applied arguments.
   *
   * @private
   * @param {Function|string} func The function or method name to reference.
   * @param {number} bitmask The bitmask of method flags to compose.
   *  The bitmask may be composed of the following flags:
   *  1 - `_.bind`
   *  2 - `_.bindKey`
   *  4 - `_.curry`
   *  8 - `_.curry` (bound)
   *  16 - `_.partial`
   *  32 - `_.partialRight`
   * @param {Array} [partialArgs] An array of arguments to prepend to those
   *  provided to the new function.
   * @param {Array} [partialRightArgs] An array of arguments to append to those
   *  provided to the new function.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {number} [arity] The arity of `func`.
   * @returns {Function} Returns the new function.
   */
  function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
    var isBind = bitmask & 1,
        isBindKey = bitmask & 2,
        isCurry = bitmask & 4,
        isCurryBound = bitmask & 8,
        isPartial = bitmask & 16,
        isPartialRight = bitmask & 32;

    if (!isBindKey && !isFunction(func)) {
      throw new TypeError;
    }
    if (isPartial && !partialArgs.length) {
      bitmask &= ~16;
      isPartial = partialArgs = false;
    }
    if (isPartialRight && !partialRightArgs.length) {
      bitmask &= ~32;
      isPartialRight = partialRightArgs = false;
    }
    var bindData = func && func.__bindData__;
    if (bindData && bindData !== true) {
      // clone `bindData`
      bindData = slice(bindData);
      if (bindData[2]) {
        bindData[2] = slice(bindData[2]);
      }
      if (bindData[3]) {
        bindData[3] = slice(bindData[3]);
      }
      // set `thisBinding` is not previously bound
      if (isBind && !(bindData[1] & 1)) {
        bindData[4] = thisArg;
      }
      // set if previously bound but not currently (subsequent curried functions)
      if (!isBind && bindData[1] & 1) {
        bitmask |= 8;
      }
      // set curried arity if not yet set
      if (isCurry && !(bindData[1] & 4)) {
        bindData[5] = arity;
      }
      // append partial left arguments
      if (isPartial) {
        push.apply(bindData[2] || (bindData[2] = []), partialArgs);
      }
      // append partial right arguments
      if (isPartialRight) {
        unshift.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
      }
      // merge flags
      bindData[1] |= bitmask;
      return createWrapper.apply(null, bindData);
    }
    // fast path for `_.bind`
    var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;
    return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
  }

  /**
   * Creates compiled iteration functions.
   *
   * @private
   * @param {...Object} [options] The compile options object(s).
   * @param {string} [options.array] Code to determine if the iterable is an array or array-like.
   * @param {boolean} [options.useHas] Specify using `hasOwnProperty` checks in the object loop.
   * @param {Function} [options.keys] A reference to `_.keys` for use in own property iteration.
   * @param {string} [options.args] A comma separated string of iteration function arguments.
   * @param {string} [options.top] Code to execute before the iteration branches.
   * @param {string} [options.loop] Code to execute in the object loop.
   * @param {string} [options.bottom] Code to execute after the iteration branches.
   * @returns {Function} Returns the compiled function.
   */
  function createIterator() {
    // data properties
    iteratorData.shadowedProps = shadowedProps;

    // iterator options
    iteratorData.array = iteratorData.bottom = iteratorData.loop = iteratorData.top = '';
    iteratorData.init = 'iterable';
    iteratorData.useHas = true;

    // merge options into a template data object
    for (var object, index = 0; object = arguments[index]; index++) {
      for (var key in object) {
        iteratorData[key] = object[key];
      }
    }
    var args = iteratorData.args;
    iteratorData.firstArg = /^[^,]+/.exec(args)[0];

    // create the function factory
    var factory = Function(
        'baseCreateCallback, errorClass, errorProto, hasOwnProperty, ' +
        'indicatorObject, isArguments, isArray, isString, keys, objectProto, ' +
        'objectTypes, nonEnumProps, stringClass, stringProto, toString',
      'return function(' + args + ') {\n' + iteratorTemplate(iteratorData) + '\n}'
    );

    // return the compiled function
    return factory(
      baseCreateCallback, errorClass, errorProto, hasOwnProperty,
      indicatorObject, isArguments, isArray, isString, iteratorData.keys, objectProto,
      objectTypes, nonEnumProps, stringClass, stringProto, toString
    );
  }

  /**
   * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
   * customized, this method returns the custom method, otherwise it returns
   * the `baseIndexOf` function.
   *
   * @private
   * @returns {Function} Returns the "indexOf" function.
   */
  function getIndexOf() {
    var result = (result = lodash.indexOf) === indexOf ? baseIndexOf : result;
    return result;
  }

  /**
   * Checks if `value` is a native function.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
   */
  function isNative(value) {
    return typeof value == 'function' && reNative.test(value);
  }

  /**
   * Sets `this` binding data on a given function.
   *
   * @private
   * @param {Function} func The function to set data on.
   * @param {Array} value The data array to set.
   */
  var setBindData = !defineProperty ? noop : function(func, value) {
    descriptor.value = value;
    defineProperty(func, '__bindData__', descriptor);
  };

  /*--------------------------------------------------------------------------*/

  /**
   * Checks if `value` is an `arguments` object.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
   * @example
   *
   * (function() { return _.isArguments(arguments); })(1, 2, 3);
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  function isArguments(value) {
    return value && typeof value == 'object' && typeof value.length == 'number' &&
      toString.call(value) == argsClass || false;
  }
  // fallback for browsers that can't detect `arguments` objects by [[Class]]
  if (!support.argsClass) {
    isArguments = function(value) {
      return value && typeof value == 'object' && typeof value.length == 'number' &&
        hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee') || false;
    };
  }

  /**
   * Checks if `value` is an array.
   *
   * @static
   * @memberOf _
   * @type Function
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is an array, else `false`.
   * @example
   *
   * (function() { return _.isArray(arguments); })();
   * // => false
   *
   * _.isArray([1, 2, 3]);
   * // => true
   */
  var isArray = nativeIsArray || function(value) {
    return value && typeof value == 'object' && typeof value.length == 'number' &&
      toString.call(value) == arrayClass || false;
  };

  /**
   * A fallback implementation of `Object.keys` which produces an array of the
   * given object's own enumerable property names.
   *
   * @private
   * @type Function
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns an array of property names.
   */
  var shimKeys = createIterator({
    'args': 'object',
    'init': '[]',
    'top': 'if (!(objectTypes[typeof object])) return result',
    'loop': 'result.push(index)'
  });

  /**
   * Creates an array composed of the own enumerable property names of an object.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The object to inspect.
   * @returns {Array} Returns an array of property names.
   * @example
   *
   * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
   * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
   */
  var keys = !nativeKeys ? shimKeys : function(object) {
    if (!isObject(object)) {
      return [];
    }
    if ((support.enumPrototypes && typeof object == 'function') ||
        (support.nonEnumArgs && object.length && isArguments(object))) {
      return shimKeys(object);
    }
    return nativeKeys(object);
  };

  /** Reusable iterator options shared by `each`, `forIn`, and `forOwn` */
  var eachIteratorOptions = {
    'args': 'collection, callback, thisArg',
    'top': "callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)",
    'array': "typeof length == 'number'",
    'keys': keys,
    'loop': 'if (callback(iterable[index], index, collection) === false) return result'
  };

  /** Reusable iterator options for `assign` and `defaults` */
  var defaultsIteratorOptions = {
    'args': 'object, source, guard',
    'top':
      'var args = arguments,\n' +
      '    argsIndex = 0,\n' +
      "    argsLength = typeof guard == 'number' ? 2 : args.length;\n" +
      'while (++argsIndex < argsLength) {\n' +
      '  iterable = args[argsIndex];\n' +
      '  if (iterable && objectTypes[typeof iterable]) {',
    'keys': keys,
    'loop': "if (typeof result[index] == 'undefined') result[index] = iterable[index]",
    'bottom': '  }\n}'
  };

  /** Reusable iterator options for `forIn` and `forOwn` */
  var forOwnIteratorOptions = {
    'top': 'if (!objectTypes[typeof iterable]) return result;\n' + eachIteratorOptions.top,
    'array': false
  };

  /**
   * A function compiled to iterate `arguments` objects, arrays, objects, and
   * strings consistenly across environments, executing the callback for each
   * element in the collection. The callback is bound to `thisArg` and invoked
   * with three arguments; (value, index|key, collection). Callbacks may exit
   * iteration early by explicitly returning `false`.
   *
   * @private
   * @type Function
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array|Object|string} Returns `collection`.
   */
  var baseEach = createIterator(eachIteratorOptions);

  /*--------------------------------------------------------------------------*/

  /**
   * Assigns own enumerable properties of source object(s) to the destination
   * object. Subsequent sources will overwrite property assignments of previous
   * sources. If a callback is provided it will be executed to produce the
   * assigned values. The callback is bound to `thisArg` and invoked with two
   * arguments; (objectValue, sourceValue).
   *
   * @static
   * @memberOf _
   * @type Function
   * @alias extend
   * @category Objects
   * @param {Object} object The destination object.
   * @param {...Object} [source] The source objects.
   * @param {Function} [callback] The function to customize assigning values.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Object} Returns the destination object.
   * @example
   *
   * _.assign({ 'name': 'fred' }, { 'employer': 'slate' });
   * // => { 'name': 'fred', 'employer': 'slate' }
   *
   * var defaults = _.partialRight(_.assign, function(a, b) {
   *   return typeof a == 'undefined' ? b : a;
   * });
   *
   * var object = { 'name': 'barney' };
   * defaults(object, { 'name': 'fred', 'employer': 'slate' });
   * // => { 'name': 'barney', 'employer': 'slate' }
   */
  var assign = createIterator(defaultsIteratorOptions, {
    'top':
      defaultsIteratorOptions.top.replace(';',
        ';\n' +
        "if (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n" +
        '  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\n' +
        "} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n" +
        '  callback = args[--argsLength];\n' +
        '}'
      ),
    'loop': 'result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]'
  });

  /**
   * Iterates over own and inherited enumerable properties of an object,
   * executing the callback for each property. The callback is bound to `thisArg`
   * and invoked with three arguments; (value, key, object). Callbacks may exit
   * iteration early by explicitly returning `false`.
   *
   * @static
   * @memberOf _
   * @type Function
   * @category Objects
   * @param {Object} object The object to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Object} Returns `object`.
   * @example
   *
   * function Shape() {
   *   this.x = 0;
   *   this.y = 0;
   * }
   *
   * Shape.prototype.move = function(x, y) {
   *   this.x += x;
   *   this.y += y;
   * };
   *
   * _.forIn(new Shape, function(value, key) {
   *   console.log(key);
   * });
   * // => logs 'x', 'y', and 'move' (property order is not guaranteed across environments)
   */
  var forIn = createIterator(eachIteratorOptions, forOwnIteratorOptions, {
    'useHas': false
  });

  /**
   * Iterates over own enumerable properties of an object, executing the callback
   * for each property. The callback is bound to `thisArg` and invoked with three
   * arguments; (value, key, object). Callbacks may exit iteration early by
   * explicitly returning `false`.
   *
   * @static
   * @memberOf _
   * @type Function
   * @category Objects
   * @param {Object} object The object to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Object} Returns `object`.
   * @example
   *
   * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
   *   console.log(key);
   * });
   * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
   */
  var forOwn = createIterator(eachIteratorOptions, forOwnIteratorOptions);

  /**
   * Performs a deep comparison between two values to determine if they are
   * equivalent to each other. If a callback is provided it will be executed
   * to compare values. If the callback returns `undefined` comparisons will
   * be handled by the method instead. The callback is bound to `thisArg` and
   * invoked with two arguments; (a, b).
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} a The value to compare.
   * @param {*} b The other value to compare.
   * @param {Function} [callback] The function to customize comparing values.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'name': 'fred' };
   * var copy = { 'name': 'fred' };
   *
   * object == copy;
   * // => false
   *
   * _.isEqual(object, copy);
   * // => true
   *
   * var words = ['hello', 'goodbye'];
   * var otherWords = ['hi', 'goodbye'];
   *
   * _.isEqual(words, otherWords, function(a, b) {
   *   var reGreet = /^(?:hello|hi)$/i,
   *       aGreet = _.isString(a) && reGreet.test(a),
   *       bGreet = _.isString(b) && reGreet.test(b);
   *
   *   return (aGreet || bGreet) ? (aGreet == bGreet) : undefined;
   * });
   * // => true
   */
  function isEqual(a, b, callback, thisArg) {
    return baseIsEqual(a, b, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 2));
  }

  /**
   * Checks if `value` is a function.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   */
  function isFunction(value) {
    return typeof value == 'function';
  }
  // fallback for older versions of Chrome and Safari
  if (isFunction(/x/)) {
    isFunction = function(value) {
      return typeof value == 'function' && toString.call(value) == funcClass;
    };
  }

  /**
   * Checks if `value` is the language type of Object.
   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(1);
   * // => false
   */
  function isObject(value) {
    // check if the value is the ECMAScript language type of Object
    // http://es5.github.io/#x8
    // and avoid a V8 bug
    // http://code.google.com/p/v8/issues/detail?id=2291
    return !!(value && objectTypes[typeof value]);
  }

  /**
   * Checks if `value` is a string.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is a string, else `false`.
   * @example
   *
   * _.isString('fred');
   * // => true
   */
  function isString(value) {
    return typeof value == 'string' ||
      value && typeof value == 'object' && toString.call(value) == stringClass || false;
  }

  /**
   * Creates a shallow clone of `object` composed of the specified properties.
   * Property names may be specified as individual arguments or as arrays of
   * property names. If a callback is provided it will be executed for each
   * property of `object` picking the properties the callback returns truey
   * for. The callback is bound to `thisArg` and invoked with three arguments;
   * (value, key, object).
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {Object} object The source object.
   * @param {Function|...string|string[]} [callback] The function called per
   *  iteration or property names to pick, specified as individual property
   *  names or arrays of property names.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Object} Returns an object composed of the picked properties.
   * @example
   *
   * _.pick({ 'name': 'fred', '_userid': 'fred1' }, 'name');
   * // => { 'name': 'fred' }
   *
   * _.pick({ 'name': 'fred', '_userid': 'fred1' }, function(value, key) {
   *   return key.charAt(0) != '_';
   * });
   * // => { 'name': 'fred' }
   */
  function pick(object, callback, thisArg) {
    var result = {};
    if (typeof callback != 'function') {
      var index = -1,
          props = baseFlatten(arguments, true, false, 1),
          length = isObject(object) ? props.length : 0;

      while (++index < length) {
        var key = props[index];
        if (key in object) {
          result[key] = object[key];
        }
      }
    } else {
      callback = lodash.createCallback(callback, thisArg, 3);
      forIn(object, function(value, key, object) {
        if (callback(value, key, object)) {
          result[key] = value;
        }
      });
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Checks if a given value is present in a collection using strict equality
   * for comparisons, i.e. `===`. If `fromIndex` is negative, it is used as the
   * offset from the end of the collection.
   *
   * @static
   * @memberOf _
   * @alias include
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {*} target The value to check for.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {boolean} Returns `true` if the `target` element is found, else `false`.
   * @example
   *
   * _.contains([1, 2, 3], 1);
   * // => true
   *
   * _.contains([1, 2, 3], 1, 2);
   * // => false
   *
   * _.contains({ 'name': 'fred', 'age': 40 }, 'fred');
   * // => true
   *
   * _.contains('pebbles', 'eb');
   * // => true
   */
  function contains(collection, target, fromIndex) {
    var index = -1,
        indexOf = getIndexOf(),
        length = collection ? collection.length : 0,
        result = false;

    fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex) || 0;
    if (isArray(collection)) {
      result = indexOf(collection, target, fromIndex) > -1;
    } else if (typeof length == 'number') {
      result = (isString(collection) ? collection.indexOf(target, fromIndex) : indexOf(collection, target, fromIndex)) > -1;
    } else {
      baseEach(collection, function(value) {
        if (++index >= fromIndex) {
          return !(result = value === target);
        }
      });
    }
    return result;
  }

  /**
   * Iterates over elements of a collection, returning an array of all elements
   * the callback returns truey for. The callback is bound to `thisArg` and
   * invoked with three arguments; (value, index|key, collection).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @alias select
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback, respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns a new array of elements that passed the callback check.
   * @example
   *
   * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
   * // => [2, 4, 6]
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36, 'blocked': false },
   *   { 'name': 'fred',   'age': 40, 'blocked': true }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.filter(characters, 'blocked');
   * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
   *
   * // using "_.where" callback shorthand
   * _.filter(characters, { 'age': 36 });
   * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
   */
  function filter(collection, callback, thisArg) {
    var result = [];
    callback = lodash.createCallback(callback, thisArg, 3);

    if (isArray(collection)) {
      var index = -1,
          length = collection.length;

      while (++index < length) {
        var value = collection[index];
        if (callback(value, index, collection)) {
          result.push(value);
        }
      }
    } else {
      baseEach(collection, function(value, index, collection) {
        if (callback(value, index, collection)) {
          result.push(value);
        }
      });
    }
    return result;
  }

  /**
   * Iterates over elements of a collection, executing the callback for each
   * element. The callback is bound to `thisArg` and invoked with three arguments;
   * (value, index|key, collection). Callbacks may exit iteration early by
   * explicitly returning `false`.
   *
   * Note: As with other "Collections" methods, objects with a `length` property
   * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
   * may be used for object iteration.
   *
   * @static
   * @memberOf _
   * @alias each
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array|Object|string} Returns `collection`.
   * @example
   *
   * _([1, 2, 3]).forEach(function(num) { console.log(num); }).join(',');
   * // => logs each number and returns '1,2,3'
   *
   * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { console.log(num); });
   * // => logs each number and returns the object (property order is not guaranteed across environments)
   */
  function forEach(collection, callback, thisArg) {
    if (callback && typeof thisArg == 'undefined' && isArray(collection)) {
      var index = -1,
          length = collection.length;

      while (++index < length) {
        if (callback(collection[index], index, collection) === false) {
          break;
        }
      }
    } else {
      baseEach(collection, callback, thisArg);
    }
    return collection;
  }

  /**
   * Creates an array of values by running each element in the collection
   * through the callback. The callback is bound to `thisArg` and invoked with
   * three arguments; (value, index|key, collection).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @alias collect
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback, respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {Array} Returns a new array of the results of each `callback` execution.
   * @example
   *
   * _.map([1, 2, 3], function(num) { return num * 3; });
   * // => [3, 6, 9]
   *
   * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
   * // => [3, 6, 9] (property order is not guaranteed across environments)
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40 }
   * ];
   *
   * // using "_.pluck" callback shorthand
   * _.map(characters, 'name');
   * // => ['barney', 'fred']
   */
  function map(collection, callback, thisArg) {
    var index = -1,
        length = collection ? collection.length : 0,
        result = Array(typeof length == 'number' ? length : 0);

    callback = lodash.createCallback(callback, thisArg, 3);
    if (isArray(collection)) {
      while (++index < length) {
        result[index] = callback(collection[index], index, collection);
      }
    } else {
      baseEach(collection, function(value, key, collection) {
        result[++index] = callback(value, key, collection);
      });
    }
    return result;
  }

  /**
   * Reduces a collection to a value which is the accumulated result of running
   * each element in the collection through the callback, where each successive
   * callback execution consumes the return value of the previous execution. If
   * `accumulator` is not provided the first element of the collection will be
   * used as the initial `accumulator` value. The callback is bound to `thisArg`
   * and invoked with four arguments; (accumulator, value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @alias foldl, inject
   * @category Collections
   * @param {Array|Object|string} collection The collection to iterate over.
   * @param {Function} [callback=identity] The function called per iteration.
   * @param {*} [accumulator] Initial value of the accumulator.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {*} Returns the accumulated value.
   * @example
   *
   * var sum = _.reduce([1, 2, 3], function(sum, num) {
   *   return sum + num;
   * });
   * // => 6
   *
   * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
   *   result[key] = num * 3;
   *   return result;
   * }, {});
   * // => { 'a': 3, 'b': 6, 'c': 9 }
   */
  function reduce(collection, callback, accumulator, thisArg) {
    var noaccum = arguments.length < 3;
    callback = lodash.createCallback(callback, thisArg, 4);

    if (isArray(collection)) {
      var index = -1,
          length = collection.length;

      if (noaccum) {
        accumulator = collection[++index];
      }
      while (++index < length) {
        accumulator = callback(accumulator, collection[index], index, collection);
      }
    } else {
      baseEach(collection, function(value, index, collection) {
        accumulator = noaccum
          ? (noaccum = false, value)
          : callback(accumulator, value, index, collection)
      });
    }
    return accumulator;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Gets the index at which the first occurrence of `value` is found using
   * strict equality for comparisons, i.e. `===`. If the array is already sorted
   * providing `true` for `fromIndex` will run a faster binary search.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {boolean|number} [fromIndex=0] The index to search from or `true`
   *  to perform a binary search on a sorted array.
   * @returns {number} Returns the index of the matched value or `-1`.
   * @example
   *
   * _.indexOf([1, 2, 3, 1, 2, 3], 2);
   * // => 1
   *
   * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
   * // => 4
   *
   * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
   * // => 2
   */
  function indexOf(array, value, fromIndex) {
    if (typeof fromIndex == 'number') {
      var length = array ? array.length : 0;
      fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0);
    } else if (fromIndex) {
      var index = sortedIndex(array, value);
      return array[index] === value ? index : -1;
    }
    return baseIndexOf(array, value, fromIndex);
  }

  /**
   * Uses a binary search to determine the smallest index at which a value
   * should be inserted into a given sorted array in order to maintain the sort
   * order of the array. If a callback is provided it will be executed for
   * `value` and each element of `array` to compute their sort ranking. The
   * callback is bound to `thisArg` and invoked with one argument; (value).
   *
   * If a property name is provided for `callback` the created "_.pluck" style
   * callback will return the property value of the given element.
   *
   * If an object is provided for `callback` the created "_.where" style callback
   * will return `true` for elements that have the properties of the given object,
   * else `false`.
   *
   * @static
   * @memberOf _
   * @category Arrays
   * @param {Array} array The array to inspect.
   * @param {*} value The value to evaluate.
   * @param {Function|Object|string} [callback=identity] The function called
   *  per iteration. If a property name or object is provided it will be used
   *  to create a "_.pluck" or "_.where" style callback, respectively.
   * @param {*} [thisArg] The `this` binding of `callback`.
   * @returns {number} Returns the index at which `value` should be inserted
   *  into `array`.
   * @example
   *
   * _.sortedIndex([20, 30, 50], 40);
   * // => 2
   *
   * // using "_.pluck" callback shorthand
   * _.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
   * // => 2
   *
   * var dict = {
   *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50 }
   * };
   *
   * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
   *   return dict.wordToNumber[word];
   * });
   * // => 2
   *
   * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
   *   return this.wordToNumber[word];
   * }, dict);
   * // => 2
   */
  function sortedIndex(array, value, callback, thisArg) {
    var low = 0,
        high = array ? array.length : low;

    // explicitly reference `identity` for better inlining in Firefox
    callback = callback ? lodash.createCallback(callback, thisArg, 1) : identity;
    value = callback(value);

    while (low < high) {
      var mid = (low + high) >>> 1;
      (callback(array[mid]) < value)
        ? low = mid + 1
        : high = mid;
    }
    return low;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a function that, when called, invokes `func` with the `this`
   * binding of `thisArg` and prepends any additional `bind` arguments to those
   * provided to the bound function.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to bind.
   * @param {*} [thisArg] The `this` binding of `func`.
   * @param {...*} [arg] Arguments to be partially applied.
   * @returns {Function} Returns the new bound function.
   * @example
   *
   * var func = function(greeting) {
   *   return greeting + ' ' + this.name;
   * };
   *
   * func = _.bind(func, { 'name': 'fred' }, 'hi');
   * func();
   * // => 'hi fred'
   */
  function bind(func, thisArg) {
    return arguments.length > 2
      ? createWrapper(func, 17, slice(arguments, 2), null, thisArg)
      : createWrapper(func, 1, null, null, thisArg);
  }

  /**
   * Creates a function which accepts one or more arguments of `func` that when
   * invoked either executes `func` returning its result, if all `func` arguments
   * have been provided, or returns a function that accepts one or more of the
   * remaining `func` arguments, and so on. The arity of `func` can be specified
   * if `func.length` is not sufficient.
   *
   * @static
   * @memberOf _
   * @category Functions
   * @param {Function} func The function to curry.
   * @param {number} [arity=func.length] The arity of `func`.
   * @returns {Function} Returns the new curried function.
   * @example
   *
   * var curried = _.curry(function(a, b, c) {
   *   console.log(a + b + c);
   * });
   *
   * curried(1)(2)(3);
   * // => 6
   *
   * curried(1, 2)(3);
   * // => 6
   *
   * curried(1, 2, 3);
   * // => 6
   */
  function curry(func, arity) {
    arity = typeof arity == 'number' ? arity : (+arity || func.length);
    return createWrapper(func, 4, null, null, null, arity);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Produces a callback bound to an optional `thisArg`. If `func` is a property
   * name the created callback will return the property value for a given element.
   * If `func` is an object the created callback will return `true` for elements
   * that contain the equivalent object properties, otherwise it will return `false`.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {*} [func=identity] The value to convert to a callback.
   * @param {*} [thisArg] The `this` binding of the created callback.
   * @param {number} [argCount] The number of arguments the callback accepts.
   * @returns {Function} Returns a callback function.
   * @example
   *
   * var characters = [
   *   { 'name': 'barney', 'age': 36 },
   *   { 'name': 'fred',   'age': 40 }
   * ];
   *
   * // wrap to create custom callback shorthands
   * _.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {
   *   var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);
   *   return !match ? func(callback, thisArg) : function(object) {
   *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
   *   };
   * });
   *
   * _.filter(characters, 'age__gt38');
   * // => [{ 'name': 'fred', 'age': 40 }]
   */
  function createCallback(func, thisArg, argCount) {
    var type = typeof func;
    if (func == null || type == 'function') {
      return baseCreateCallback(func, thisArg, argCount);
    }
    // handle "_.pluck" style callback shorthands
    if (type != 'object') {
      return property(func);
    }
    var props = keys(func),
        key = props[0],
        a = func[key];

    // handle "_.where" style callback shorthands
    if (props.length == 1 && a === a && !isObject(a)) {
      // fast path the common case of providing an object with a single
      // property containing a primitive value
      return function(object) {
        var b = object[key];
        return a === b && (a !== 0 || (1 / a == 1 / b));
      };
    }
    return function(object) {
      var length = props.length,
          result = false;

      while (length--) {
        if (!(result = baseIsEqual(object[props[length]], func[props[length]], null, true))) {
          break;
        }
      }
      return result;
    };
  }

  /**
   * This method returns the first argument provided to it.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'name': 'fred' };
   * _.identity(object) === object;
   * // => true
   */
  function identity(value) {
    return value;
  }

  /**
   * A no-operation function.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @example
   *
   * var object = { 'name': 'fred' };
   * _.noop(object) === undefined;
   * // => true
   */
  function noop() {
    // no operation performed
  }

  /**
   * Creates a "_.pluck" style function, which returns the `key` value of a
   * given object.
   *
   * @static
   * @memberOf _
   * @category Utilities
   * @param {string} key The name of the property to retrieve.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var characters = [
   *   { 'name': 'fred',   'age': 40 },
   *   { 'name': 'barney', 'age': 36 }
   * ];
   *
   * var getName = _.property('name');
   *
   * _.map(characters, getName);
   * // => ['barney', 'fred']
   *
   * _.sortBy(characters, getName);
   * // => [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 }]
   */
  function property(key) {
    return function(object) {
      return object[key];
    };
  }

  /*--------------------------------------------------------------------------*/

  lodash.assign = assign;
  lodash.bind = bind;
  lodash.createCallback = createCallback;
  lodash.curry = curry;
  lodash.filter = filter;
  lodash.forEach = forEach;
  lodash.forIn = forIn;
  lodash.forOwn = forOwn;
  lodash.keys = keys;
  lodash.map = map;
  lodash.pick = pick;
  lodash.property = property;

  // add aliases
  lodash.collect = map;
  lodash.each = forEach;
  lodash.extend = assign;
  lodash.select = filter;

  /*--------------------------------------------------------------------------*/

  lodash.contains = contains;
  lodash.identity = identity;
  lodash.indexOf = indexOf;
  lodash.isArguments = isArguments;
  lodash.isArray = isArray;
  lodash.isEqual = isEqual;
  lodash.isFunction = isFunction;
  lodash.isObject = isObject;
  lodash.isString = isString;
  lodash.noop = noop;
  lodash.reduce = reduce;
  lodash.sortedIndex = sortedIndex;

  lodash.foldl = reduce;
  lodash.include = contains;
  lodash.inject = reduce;

  /*--------------------------------------------------------------------------*/

  /**
   * The semantic version number.
   *
   * @static
   * @memberOf _
   * @type string
   */
  lodash.VERSION = '2.4.1';

  /*--------------------------------------------------------------------------*/

  if (freeExports && freeModule) {
    // in Node.js or RingoJS
    if (moduleExports) {
      (freeModule.exports = lodash)._ = lodash;
    }
    // in Narwhal or Rhino -require
    else {
      freeExports._ = lodash;
    }
  }

}.call(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
