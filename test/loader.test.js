
var execSync = require('child_process').execSync,
    workingDir = __dirname;
    execOptions = {
        cwd: workingDir
    };

describe('grunt-load-npm-run-tasks', function() {

    var DEFAULT_TASK_OUTPUT = 'I am just the default task defined in Gruntfile.js.',
        SUCCESS_TASK_OUTPUT = 'I am a nicely finishing script, yee.',
        FAILING_TASK_OUTPUT = 'I am a failing script, boom.';

    it('should leave other Grunt tasks untouched', function() {
        var output = execSync('grunt default', execOptions).toString();
        expect(output).toContain(DEFAULT_TASK_OUTPUT);
    });

    it('should finish without errors for npm tasks terminating with status 0', function() {
        var output = execSync('grunt npmRun:succeedingScript', execOptions).toString();
        expect(output).not.toContain(DEFAULT_TASK_OUTPUT);
        expect(output).toContain(SUCCESS_TASK_OUTPUT);
    });

    it('should work nicely in batch with other Grunt tasks', function() {
        var output = execSync('grunt defaultPlusSucceeding', execOptions).toString();
        expect(output).toContain(SUCCESS_TASK_OUTPUT);
        expect(output).toContain(DEFAULT_TASK_OUTPUT);
        expect(output.indexOf(DEFAULT_TASK_OUTPUT)).toBeLessThan(output.indexOf(SUCCESS_TASK_OUTPUT));
    });

    it('should finish with error for npm tasks terminating with non-zero status', function() {
        var output,
            hasFailed = false,
            error;

        try {
            output = execSync('grunt npmRun:failingScript', execOptions).toString();
        } catch (err) {
            hasFailed = true;
            error = err;
        }

        expect(hasFailed).toBe(true);
        expect(output).toBeUndefined();
        expect(typeof error).toBe('object');

        // (!) expected error code here is 6, as that's what Grunt sets for "Task warning"
        // -> see https://gruntjs.com/api/exit-codes
        expect(error.status).toBe(6);

        expect(error.stderr.toString()).toContain(FAILING_TASK_OUTPUT);

        // since we use the `npm --silent` option by default,
        // the error log should be free of irrelevant npm debugging messages
        expect(error.stderr.toString()).not.toContain('This is probably not a problem with npm.');
        expect(error.stderr.toString()).not.toContain('A complete log of this run can be found in:');
    });

});