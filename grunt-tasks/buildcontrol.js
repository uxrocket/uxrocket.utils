module.exports = function(grunt){
    'use strict';

    grunt.config('buildcontrol', {
        options: {
            commit  : true,
            push    : true,
            message : 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
        },
        pages: {
            options: {
                dir   : 'docs/api',
                remote: 'git@github.com:uxrocket/uxrocket.utils.git',
                branch: 'gh-pages'
            }
        }
    });
};