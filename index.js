module.exports = function(grunt, opts) {

    var path = require('path'),
        exec = require('child_process').exec,
        workingDir = process.cwd(),
        pkg = require( path.resolve(workingDir, 'package.json') ),
        scriptKeys = Object.keys( pkg.scripts || {} ),
        silent = (opts && typeof opts.silent === 'boolean') ? opts.silent : true;

    scriptKeys.forEach(function(scriptKey) {
        var commandLine = (silent ? 'npm run --silent ' : 'npm run ') + scriptKey,
            taskName = 'npmRun:' + scriptKey;

        grunt.registerTask(taskName, function() {
            grunt.log.writeln('Executing: ' + commandLine);

            var done = this.async(),
                npmProcess = exec(commandLine, {
                    maxBuffer: 1024 * 1024,
                    // encoding: 'utf8',
                    cwd: workingDir
                });

            npmProcess.stdout.pipe(process.stdout);
            npmProcess.stderr.pipe(process.stderr);

            npmProcess.on('close', function(code) {
                if (code !== 0) {
                    grunt.fail.warn(taskName + ' exited with status ' + code);
                } else {
                    grunt.log.ok(taskName + ' finished');
                }
                done();
            });
        });
    });
};
