/*
 * grunt-angular-templates
 * https://github.com/ericclemmons/grunt-angular-templates
 *
 * Copyright (c) 2013 Eric Clemmons
 * Licensed under the MIT license.
 */

'use strict';

var Compiler  = require('./lib/compiler');
var path      = require('path');
var util      = require('util');

module.exports = function(grunt) {

  var bootstrapper = function(module, script, options) {
    return grunt.template.process(
      "<%= angular %>.module('<%= module %>'<%= standalone %>).run(['$templateCache', function($templateCache) {\n<%= script %>\n}]);\n",
      {
        data: {
          'angular':    options.angular,
          'module':     module,
          'standalone': options.standalone ? ', []' : '',
          'script':     script
        }
      }
    );
  };

  var appendToConcatTarget = function(target, file, filter) {
    if (process.platform === 'win32') {
      target = target.replace(/\//g, '\\');
    }

    var config = grunt.config(['concat', target]);

    if (!config) {
      grunt.log.warn('Concat target not found: ' + target.red);

      return false;
    }

    // Grunt handles files 400 different ways.  Not me.
    var normalized = grunt.task.normalizeMultiTaskFiles(config, target);

    // Only work on the original src/dest, since files.src is a [GETTER]
    var originals = normalized.map(function(files) {
      return files.orig;
    });

    originals.filter(filter || function(files) {
      return true;
    }).map(function(files) {
      files.src.push(file.dest);

      return files;
    });

    // Re-save processed concat target
    grunt.config(['concat', target], {
      files:    originals,
      options:  config.options || {}
    });
  };

  var ngtemplatesTask = function() {
    var options = this.options({
      angular:    'angular',
      bootstrap:  bootstrapper,
      concat:     null,
      htmlmin:    {},
      module:     this.target,
      prefix:     '',
      source:     function(source) { return source; },
      standalone: false,
      url:        function(path) { return path; },
      usemin:     null,
    });

    grunt.verbose.writeflags(options, 'Options');

    this.files.forEach(function(file) {
      if (!file.src.length) {
        grunt.log.warn('No templates found');
      }

      var compiler  = new Compiler(grunt, options, file.cwd);
      var modules   = compiler.modules(file.src);
      var compiled  = [];

      for (var module in modules) {
        compiled.push(compiler.compile(module, modules[module]));
      }

      grunt.file.write(file.dest, compiled.join('\n'));
      grunt.log.writeln('File ' + file.dest.cyan + ' created.');

      // Append file.dest to specified concat target
      if (options.concat) {
        appendToConcatTarget(options.concat, file);
        grunt.log.writeln('Added ' + file.dest.cyan + ' to ' + ('concat:' + options.concat).yellow);
      }
    });
  };

  grunt.registerMultiTask('ngtemplates', 'Compile AngularJS templates for $templateCache', ngtemplatesTask);

};
