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
    grunt.utils.async.concatSeries(files, function(file, next) {
      var id        = path.relative(base, file);
      var template  = '\n  $templateCache.put("<%= id %>", "<%= content %>"\n  );\n';
      var cleaned   = grunt.file.read(file).replace(/"/g, '\\"').replace(/\r?\n/g, '" +\n    "');
      var cached    = grunt.template.process(template, {
        id:       id,
        content:  cleaned
      });

      next(cached);
    }, callback);
  };

  var compile = function(id, base, files, callback) {
    var template = 'angular.module("<%= id %>", []).run(["$templateCache", function($templateCache) {\n<%= content %>\n}]);\n';

    concat(base, files, function(concated) {
      var compiled = grunt.template.process(template, {
        id:       id,
        content:  concated
      });

      callback(false, compiled);
    });
  };

  return {
    compile: compile
  };

};
