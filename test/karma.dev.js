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
            'dist/vendors/lodash.compat.js',
            'dist/uxrocket.utils.js',
            'test/spec/*Spec.js'
        ],

        // Process options
        reporters       : ['progress', 'coverage'],
        preprocessors   : {
            'dist/uxrocket.utils.js' : ['coverage']
        },

        // Coverage options
        coverageReporter: {
            type: 'html',
            dir : 'coverage/'
        }
    });
};