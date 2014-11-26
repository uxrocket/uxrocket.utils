module.exports = function(grunt){
    'use strict';

    grunt.config('copy', {
        lodash: {
            expand: true,
            src: [
                'node_modules/lodash/dist/lodash.compat.js'
            ],
            dest: 'dist/vendors/',
            flatten: true,
            filter: 'isFile'
        },
        docco: {
            src : 'docs/api/uxrocket.utils.html',
            dest: 'docs/api/index.html'
        }
    });
};