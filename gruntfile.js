module.exports = function(grunt){
    "use strict";

    // File folders.
    var filePaths = [
        "gruntfile.js",
        "src/**/*.js",
        "test/**/*.js",
        "grunt-tasks/**/*.js"
    ];

    // Init config.
    grunt.initConfig({
        pkg         : grunt.file.readJSON("package.json"),
        filePaths   : filePaths
    });

    // Load all packages.
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Load all tasks.
    grunt.loadTasks("grunt-tasks");

    // Register default tasks.
    grunt.registerTask("check",     ["jshint", "jscs"]);
    grunt.registerTask("collect",   ["copy:lodash", "check"]);
    grunt.registerTask("doccox",    ["docco", "copy:docco", "clean:docco"]);
    grunt.registerTask("complete",  ["doccox", "clean:vendors"]);
    grunt.registerTask("test",      ["copy:lodash", "lodash", "umd", "concat", "browserify", "karma"]);
    grunt.registerTask("publish",   ["build-all", "doccox", "buildcontrol", "release"]);

    // Build types.
    grunt.registerTask("build-with-lodash", [
        "umd:global",
        "collect",
        "concat",
        "karma:with-lodash",
        "uglify:with-lodash",
        "complete"
    ]);

    grunt.registerTask("build-standalone",  [
        "check",
        "lodash",
        "umd:standalone",
        "browserify",
        "karma:standalone",
        "uglify:standalone",
        "complete"
    ]);

    grunt.registerTask("build-dependent",   [
        "umd:global",
        "collect",
        "karma:dev",
        "uglify:dependent",
        "complete"
    ]);

    grunt.registerTask("build-all",         [
        "clean:all",
        "lodash",
        "umd",
        "copy:lodash",
        "concat",
        "browserify",
        "check",
        "karma",
        "uglify",
        "complete"
    ]);

    grunt.registerTask("build-dev",         [
        "umd:global",
        "collect",
        "karma:dev",
        "doccox"
    ]);

    // Watch types for builds.
    grunt.registerTask("watch-with-lodash", ["connect", "build-with-lodash", "watch:with-lodash"]);
    grunt.registerTask("watch-standalone",  ["connect", "build-standalone", "watch:standalone"]);
    grunt.registerTask("watch-dependent",   ["connect", "build-dependent", "watch:dependent"]);
    grunt.registerTask("watch-all",         ["connect", "build-all", "watch:with-lodash", "watch:standalone", "watch:dependent"]);
    grunt.registerTask("watch-dev",         ["connect", "build-dev", "watch:dev"]);
};