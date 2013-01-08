/*
 * grunt-angular-templates
 * https://github.com/ericclemmons/grunt-angular-templates
 *
 * Copyright (c) 2013 Eric Clemmons
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

  var compiler = require('./lib/compiler').init(grunt);

  grunt.registerMultiTask('ngtemplates', 'Compile AngularJS templates', function() {
    var id        = this.target + '.templates';
    var base      = grunt.file.expandDirs(this.data.options.base || '.')[0];
    var files     = grunt.file.expandFiles(this.file.src);
    var dest      = path.normalize(this.file.dest);
    var done      = this.async();

    compiler.compile(id, base, files, function(err, compiled) {
      if (err) {
        done(false);
      } else {
        grunt.file.write(dest, compiled);
        grunt.log.writeln('File ' + dest.cyan + ' created.');
        done();
      }
    });
  });

};
