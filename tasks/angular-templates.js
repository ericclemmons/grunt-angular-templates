/*
 * grunt-angular-templates
 * https://github.com/ericclemmons/grunt-angular-templates
 *
 * Copyright (c) 2013 Eric Clemmons
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var util = require('util');

module.exports = function(grunt) {

  var compiler = require('./lib/compiler').init(grunt);

  grunt.registerMultiTask('ngtemplates', 'Compile AngularJS templates', function() {
    var id        = this.target;
    var files     = grunt.file.expand(this.files[0].src);
    var dest      = path.normalize(this.files[0].dest);
    var done      = this.async();
    var options   = this.options();

    compiler.compile(id, options, files, function(err, compiled) {
      if (err) {
        done(false);
      } else {
        grunt.file.write(dest, compiled);
        grunt.log.writeln('File ' + dest.cyan + ' created.');

        if (options.concat){
          var concat = grunt.config('concat') || {};
          var concatSrc = concat[options.concat];
          if (grunt.util.kindOf(concatSrc) === 'object'){
            concatSrc = concat[options.concat].src;
          }
          if (grunt.util.kindOf(concatSrc) !== 'array'){
            grunt.log.error('Unable to update concat config. Unable to find valid concat config for ' + options.concat.cyan + '.');
            done(false);
            return;
          } else {
            concatSrc.push(dest);
            grunt.config('concat',concat);
            grunt.log.subhead('Updating concat config. Config is now:').writeln('   ' + util.inspect(concat,false,4,true));
          }
        }
        done();
      }
    });
  });

};
