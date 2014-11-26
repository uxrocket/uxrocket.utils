module.exports = function(grunt){
    'use strict';

    grunt.config('uglify', {
        options: {
            sourceMap: true,
            mangle   : true
        },
        dependent: {
            files: {
                'dist/uxrocket.utils.min.js'             : ['dist/uxrocket.utils.js']
            }
        },
        'with-lodash': {
            files: {
                'dist/uxrocket.utils-with-lodash.min.js' : ['dist/uxrocket.utils-with-lodash.js']
            }
        },
        standalone: {
            files: {
                'dist/uxrocket.utils-standalone.min.js'  : ['dist/uxrocket.utils-standalone.js']
            }
        }
    });
};