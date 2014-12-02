var map = require('map-stream');
var gutil = require('gulp-util');
var getFileSize = require("filesize");

module.exports = function(){
  'use strict';

  return map(function(file,callback){
    var filenameLong = file.path.replace(process.cwd(), '');
    var filenameShort = file.path.split(/\/|\\/).pop();


    //Check if file.stat exists (gulp.concat removes it for example)
    var filesize = file.stat ? getFileSize(file.stat.size) : getFileSize(Buffer.byteLength(String(file.contents)));

    // gutil.log(process.cwd());

    gutil.log(gutil.colors.yellow("  >>> piping asset file"), filenameLong, ":",gutil.colors.blue(filesize));

    callback(null,file)
  });

};