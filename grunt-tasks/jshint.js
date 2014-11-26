module.exports = function(grunt){
    'use strict';

    grunt.config('jshint', {
        options: {
            jshintrc: true
        },
        all: grunt.config.get('filePaths')
    });
};