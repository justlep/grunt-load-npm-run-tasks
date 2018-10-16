# grunt-load-npm-run-tasks [![Build Status](https://travis-ci.org/justlep/grunt-load-npm-run-tasks.svg?branch=master)](https://travis-ci.org/justlep/grunt-load-npm-run-tasks)
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

## License
MIT