/**
 * bundleLogger
 *   - Provides gulp style logs to the bundle method in browserify.js
 */

var gutil = require('gulp-util');
var prettyHrtime = require('pretty-hrtime');
var startTime;

module.exports = {

  jekyllUpdate: function(e) {
    gutil.log(gutil.colors.yellow("  modified/jekyll", e.path.replace(process.cwd(), '')));
  },

  sassModified: function(e) {
    gutil.log(gutil.colors.yellow("modified/sass", e.path.replace(process.cwd(), '')));
    // this.emit('end');
  },

  sassError: function(err) {
    var file = err.message.slice(6).slice(0, err.message.slice(6).indexOf('('));
    var message = err.message.slice(err.message.indexOf('('), err.message.length);

    gutil.log(gutil.colors.red("error"), gutil.colors.red(file), message);
    // this.emit('end');
  },

  start: function() {
    startTime = process.hrtime();
    // gutil.log('Running', gutil.colors.green("'bundle'") + '...');
  },

  finish: function() {
    var taskTime = process.hrtime(startTime);
    var prettyTime = prettyHrtime(taskTime);
    gutil.log(gutil.colors.green("Browserified"), 'in', gutil.colors.magenta(prettyTime));
  },

  end: function() {
    var taskTime = process.hrtime(startTime);
    var prettyTime = prettyHrtime(taskTime);
    gutil.log('Finished', gutil.colors.green("'bundle'"), 'in', gutil.colors.magenta(prettyTime));
  },

  watchifyUpdate: function(e) {
    startTime = process.hrtime();

    var diff = e.toString().replace(process.cwd(), '');

    gutil.log(gutil.colors.yellow('modified/js'), gutil.colors.yellow(diff), '\n  >> Re-bundling js ...');
  },

  browserifyError: function(err) {
    var message = err.toString().slice(7).replace(process.cwd(), '');

    gutil.log(gutil.colors.red("error"), gutil.colors.red(message));
  },

  assetsDirBuilt: function() {
    gutil.log(gutil.colors.green("assets folder built"));
  }
};