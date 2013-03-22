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
    var id        = this.target;
    //var base      = grunt.file.expand(this.options().base || '.')[0];
    var files     = grunt.file.expand(this.files[0].src);
    var dest      = path.normalize(this.files[0].dest);
    var done      = this.async();

    compiler.compile(id, this.options(), files, function(err, compiled) {
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
