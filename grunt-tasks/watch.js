module.exports = function(grunt){
    'use strict';

    grunt.config('watch', {
        'with-lodash': {
            files: [
                'src/**/*.js',
                'test/**/*Spec.js'
            ],
            tasks: ['build-with-lodash']
        },
        standalone: {
            files: [
                'src/**/*.js',
                'test/**/*Spec.js'
            ],
            tasks: ['build-standalone']
        },
        dependent: {
            files: [
                'src/**/*.js',
                'test/**/*Spec.js'
            ],
            tasks: ['build-dependent']
        },
        dev: {
            files: [
                'src/**/*.js',
                'test/**/*Spec.js'
            ],
            tasks: ['build-dev']
        }
    });
};