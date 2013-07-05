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
    var id          = this.target;
    var noConflict  = this.options().noConflict || 'angular';
    var files       = grunt.file.expand(this.files[0].src);
    var dest        = path.normalize(this.files[0].dest);
    var done        = this.async();
    var options     = this.options();
    var define      = false;

    if (options.module) {
      if (typeof options.module === 'string') {
        id = options.module;
      } else if (options.module.hasOwnProperty('name') && typeof options.module.name === 'string') {
        id = options.module.name;
      }

      if (options.module.hasOwnProperty('define') && options.module.define === true ) {
        define = true;
      }
    }

    compiler.compile(id, noConflict, define, options, files, function(err, compiled) {
      if (err) {
        done(false);
      } else {
        grunt.file.write(dest, compiled);
        grunt.log.writeln('File ' + dest.cyan + ' created.');

        if (options.concat) {
          var targets = Array.isArray(options.concat) ? options.concat : [ options.concat ];
          var concat  = grunt.config('concat') || {};

          targets.forEach(function(target) {
            target = path.normalize(target);
            var task = concat[target];

            if (!task) {
              grunt.log.error('Unknown concat target: ' + target);
              done(false);

              return;
            }

            if (task.src) {
              task.src = Array.isArray(task.src) ? task.src : [ task.src ];
              task.src.push(dest);
            } else if (task.files) {
              var files = task.files;

              for (var key in files) {
                files[key] = Array.isArray(files[key]) ? files[key] : [ files[key] ];
                files[key].push(dest);
              }
            } else if (Array.isArray(task)) {
                task.push(dest);
            } else {
              grunt.log.error('Could not find src or files in concat target: ' + target);
              done(false);

              return;
            }

            grunt.log.writeln('Added ' + dest.cyan + ' to ' + ('concat.' + target).cyan);

            grunt.config('concat', concat);
          });
        }

        done();
      }
    });
  });

};
