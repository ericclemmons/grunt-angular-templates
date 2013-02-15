/*
 * grunt-angular-templates
 * https://github.com/ericclemmons/grunt-angular-templates
 *
 * Copyright (c) 2013 Eric Clemmons
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports.init = function(grunt) {

  var concat = function(base, files, callback) {
    grunt.util.async.concatSeries(files, function(file, next) {
      var id        = path.relative(base, file).replace( /\\/g, '/');
      var template  = '\n  $templateCache.put("<%= id %>",\n    "<%= content %>"\n  );\n';
      var cleaned   = grunt.file.read(file).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, '" +\n    "');
      var options   = {
        data: {
          id: id,
          content: cleaned
        }
      };
      var cached    = grunt.template.process(template, options);

      next(null, cached);
    }, callback);
  };

  var compile = function(id, base, files, callback) {
    var template = 'angular.module("<%= id %>", []).run(["$templateCache", function($templateCache) {\n<%= content %>\n}]);\n';

    concat(base, files, function(err, concated) {
      var options = {
        data: {
          id: id,
          content: concated.join('')
        }
      };
      var compiled = grunt.template.process(template, options);

      callback(false, compiled);
    });
  };

  return {
    compile: compile
  };

};
