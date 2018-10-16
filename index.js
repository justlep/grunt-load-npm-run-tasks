module.exports = function(grunt) {

    var path = require('path'),
        execSync = require('child_process').execSync,
        workingDir = process.cwd(),
        pkg = require( path.resolve(workingDir, 'package.json') ),
        scriptKeys = Object.keys( pkg.scripts || {} );

    scriptKeys.forEach(function(scriptKey) {
        var commandLine = 'npm run ' + scriptKey,
            taskName = 'npmRun:' + scriptKey;

        grunt.registerTask(taskName, function() {
            grunt.log.writeln('Now executing: ' + commandLine);

            try {
                execSync(commandLine, {
                    cwd: workingDir,
                    stdio: [0,1,2]
                });
            } catch (err) {
                grunt.log.error(commandLine + ' failed with status ' + err.status);
                grunt.fail.fatal();
                return;
            }

            grunt.log.ok(commandLine + ' finished without error');
        });
    });
};
