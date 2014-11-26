module.exports = function(grunt){
    'use strict';

    grunt.config('jscs', {
        src: grunt.config.get('filePaths'),
        options: {
            config: '.jscsrc'
        }
    });
};