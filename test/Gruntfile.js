module.exports = function (grunt) {

    'use strict';

    grunt.registerTask('default', function() {
        grunt.log.ok('I am just the default task defined in Gruntfile.js.');
    });

    grunt.registerTask('defaultPlusSucceeding', [
        'default',
        'npmRun:succeedingScript'
    ]);

    require('../index')(grunt);

};
