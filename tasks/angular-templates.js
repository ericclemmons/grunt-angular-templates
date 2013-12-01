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

  grunt.registerMultiTask('ngtemplates', 'Compile AngularJS templates for $templateCache', function() {
    var options = this.options({
      angular:    'angular',
      bootstrap:  bootstrapper,
      concat:     null,
      htmlmin:    {},
      module:     this.target,
      prefix:     '',
      source:     function(source) { return source; },
      standalone: false,
      url:        function(path) { return path; }
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

        if (process.platform === 'win32') {
          options.concat = options.concat.replace(/\//g, '\\');
        }

        var config = grunt.config(['concat', options.concat]);

        if (!config) {
          grunt.log.warn('Concat target not found: ' + options.concat.red);

          return false;
        }

        // Grunt handles files 400 different ways.  Not me.
        var normal  = grunt.task.normalizeMultiTaskFiles(config, options.concat);
        var files   = normal.map(function(files) {
          files.src.push(file.dest);
          delete files.orig;

          return files;
        });

        grunt.log.writeln('Added ' + file.dest.cyan + ' to ' + ('concat:' + options.concat).yellow);

        // Re-save processed concat target
        grunt.config(['concat', options.concat], {
          files:    files,
          options:  config.options || {}
        });
      }
    });
  });

};
