module.exports = function(grunt){
    'use strict';

    grunt.config('clean', {
        all     : ['dist/*'],
        vendors : ['dist/vendors'],
        docco   : ['docs/api/uxrocket.utils.html']
    });
};