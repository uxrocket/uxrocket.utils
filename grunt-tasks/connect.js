module.exports = function(grunt){
    'use strict';

    grunt.config('connect', {
        server: {
            options: {
                livereload: true,
                port: 9001,
                base: 'coverage/'
            }
        }
    });
};