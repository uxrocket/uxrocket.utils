module.exports = function(config){
    'use strict';

    config.set({
        // General options
        port      : 9876,
        colors    : true,
        singleRun : true,
        browsers  : ['PhantomJS'],

        // File/Path options
        basePath  : '..',
        frameworks: ['jasmine'],
        files     : [
            'dist/uxrocket.utils-with-lodash.js',
            'test/spec/*Spec.js'
        ],

        // Process options
        reporters       : ['progress']
    });
};