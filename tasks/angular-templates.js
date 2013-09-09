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
      htmlmin:    {},
      module:     this.target,
      source:     function(source) { return source; },
      standalone: false,
      url:        function(path) { return path; }
    });

    grunt.verbose.writeflags(options, 'Options');

    this.files.forEach(function(file) {
      var compiler  = new Compiler(grunt, options, file.cwd);
      var modules   = {};

      if (!file.src.length) {
        grunt.log.warn('No templates found');
      }

      file.src.forEach(function(file) {
        var module = compiler.module(file);

        if (!modules[module]) {
          modules[module] = [];
        }

        modules[module].push(file);
      });

      var compiled = [];

      for (var module in modules) {
        var files = modules[module];

        compiled.push(compiler.compile(module, files));
      }

      grunt.file.write(file.dest, compiled.join('\n'));
      grunt.log.writeln('File ' + file.dest.cyan + ' created.');
    });
  });

};
