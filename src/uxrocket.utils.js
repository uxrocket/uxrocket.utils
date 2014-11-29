/**
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

    function UXRocketUtilsWrapper(value){
        this.__value__ = value;
    }

    UXRocketUtilsWrapper.prototype = UXRocketUtils.prototype;

    function wrapperToString(){
        /*jshint validthis:true */
        return String(this.__value__);
    }

    function wrapperValueOf(){
        /*jshint validthis:true */
        return this.__value__;
    }

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
    forOwn(UXRocketUtils, function(method, name){
        UXRocketUtils.prototype[name] = function(){
            var args = [this.__value__];
            args.push.apply(args, arguments);
            this.__value__ = method.apply(UXRocketUtils, args);
            return this;
        };
    });

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
    forOwn(UXRocketUtils, function(method, name){
        if(!UXRocketUtils.prototype[name]){
            UXRocketUtils.prototype[name] = function(){
                var args = [this.__value__];
                args.push.apply(args, arguments);
                return method.apply(UXRocketUtils, args);
            };
        }
    });

    /* Return utils. */
    return UXRocketUtils;
})(this);