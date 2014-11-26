module.exports = function(grunt){
    'use strict';

    grunt.config('karma', {
        dev: {
            configFile: 'test/karma.dev.js'
        },
        standalone: {
            configFile: 'test/karma.standalone.js'
        },
        'with-lodash': {
            configFile: 'test/karma.with-lodash.js'
        }
    });
};