module.exports = function(grunt){
    'use strict';

    grunt.config('lodash', {
        lodash: {
            dest: 'dist/vendors/lodash.custom.js',
            options: {
                exports : ['commonjs', 'node'],
                include : [
                    'contains',
                    'curry',
                    'each',
                    'extend',
                    'filter',
                    'keys',
                    'isEqual',
                    'map',
                    'pick',
                    'reduce'
                ],
                moduleId: 'lodash'
            }
        }
    });
};