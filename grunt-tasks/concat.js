module.exports = function(grunt){
    'use strict';

    grunt.config('concat', {
        options: {
            separator: ';'
        },
        build: {
            src : [
                'dist/vendors/lodash.compat.js',
                'dist/uxrocket.utils.js'
            ],
            dest: 'dist/uxrocket.utils-with-lodash.js'
        }
    });
};