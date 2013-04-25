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
    var id        = this.options().module || this.target;
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

        if (options.updatetask){
          if (!options.updatetask.task || !options.updatetask.target){
            grunt.log.error('Incorrect configuration. updatetask is missing \'task\' or \'target\'.');
            done(false);
            return;
          }
          var task = grunt.config(options.updatetask.task) || {};
          var target = task[options.updatetask.target];
          if (grunt.util.kindOf(target) === 'object'){
            target = target.src;
          }
          if (grunt.util.kindOf(target) !== 'array'){
            grunt.log.error('Unable to update '+options.updatetask.task+' config. Unable to find valid config for ' + options.updatetask.target.cyan + '.');
            done(false);
            return;
          } else {
            target.push(dest);
            grunt.config(options.updatetask.task,task);
            grunt.log.subhead('Updating '+options.updatetask.task+' config. Config is now:').writeln('   ' + util.inspect(target,false,4,true));
          }
        }

        done();
      }
    });
  });

};
