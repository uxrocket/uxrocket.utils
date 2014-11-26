module.exports = function(grunt){
    'use strict';

    grunt.config('release', {
        options: {
            files: ['package.json', 'bower.json']
        }
    });
};