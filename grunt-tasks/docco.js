module.exports = function(grunt){
    'use strict';

    grunt.config('docco', {
        dist: {
            src: [
                'src/uxrocket.utils.js'
            ],
            options: {
                output: 'docs/api/'
            }
        }
    });
};