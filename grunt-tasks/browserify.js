module.exports = function(grunt){
    'use strict';

    grunt.config('browserify', {
        dist: {
            files: {
                'dist/uxrocket.utils-standalone.js': 'dist/uxrocket.utils-standalone.js'
            }
        }
    });
};