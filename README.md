# grunt-load-npm-run-tasks [![Build Status](https://travis-ci.org/justlep/grunt-load-npm-run-tasks.svg?branch=master)](https://travis-ci.org/justlep/grunt-load-npm-run-tasks) [![NPM Version][npm-image]][npm-url]
A Grunt task loader importing all entries from the `scripts` section of `package.json` as `npmRun:{script-key}` tasks.

## Installation
Add the loader to your project:
```shell
$ npm i --save-dev grunt-load-npm-run-tasks
```
Require the loader inside your `Gruntfile.js`, like:
```javascript
module.exports = function (grunt) {

    // ... some tasks definitions etc

    require('grunt-load-npm-run-tasks')(grunt);
};

``` 
## Example

Say your `package.json` contains some commands in the `scripts` section, like
```javascript
{
  "name": "some-project",
  "scripts": [
    "lint": "eslint --max-warnings 5 path/to/**/*.js",
    "bundle": "rollup -c"
  ],
  ...
}
```
The `grunt-load-npm-run-tasks` loader imports those scripts as Grunt tasks `npmRun:lint` and 
`npmRun:bundle` which can then be used like any other task.

Example `Gruntfile.js`:
 ```javascript
 module.exports = function (grunt) {
 
     'use strict';
 
     grunt.registerTask('default', function() {
         grunt.log.ok('I am just the default task defined in Gruntfile.js.');
     });
     
     grunt.registerTask('prepareBuild', [
         'default',
         'copy:someSources',
         'npmRun:lint',
         'npmRun:bundle'
     ]);
 
     require('grunt-load-npm-run-tasks')(grunt);
  };
 ```

### Silent mode

By default, all `npmRun:xxx` Grunt tasks will execute `npm run` with the `---silent` option 
in order to prevent irrelevant npm debugging output like 
```
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! my-appliction@1.0.0 test: \`jest test/\`
npm ERR! Exit status 1
npm ERR! 
npm ERR! Failed at the my-appliction@1.0.0 test script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
...
``` 

You can disable silent mode by adding the `{silent: false}` option to the 
task loader initialization in your `Gruntfile.js`:
```javascript
require('grunt-load-npm-run-tasks')(grunt, {silent: false});
```


## License
MIT


[npm-image]: https://img.shields.io/npm/v/grunt-load-npm-run-tasks.svg
[npm-url]: https://npmjs.org/package/grunt-load-npm-run-tasks
