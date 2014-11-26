module.exports = function(grunt){
    'use strict';

    function copyConfig(options){
        return {
            src             : 'src/uxrocket.utils.js',
            dest            : options.dest,
            template        : 'build/umd/umd.hbs',
            objectToExport  : '__',
            globalAlias     : '__',
            indent          : '    ',
            deps            : {
                args        : ['_'],
                'default'   : ['_'],
                amd         : {
                    indent      : '      ',
                    items       : options.requireItems,
                    prefix      : '\'',
                    separator   : ',\n',
                    suffix      : '\''
                },
                cjs         : {
                    indent      : '      ',
                    items       : options.requireItems,
                    prefix      : 'require(\'',
                    separator   : ',\n',
                    suffix      : '\')'
                },
                global      : {
                    items: ['_'],
                    prefix: ''
                }
            }
        };
    }

    grunt.config('umd', {
        global: copyConfig({
            dest        : 'dist/uxrocket.utils.js',
            requireItems: ['lodash']
        }),
        standalone: copyConfig({
            dest        : 'dist/uxrocket.utils-standalone.js',
            requireItems: ['./vendors/lodash.custom.js']
        })
    });
};