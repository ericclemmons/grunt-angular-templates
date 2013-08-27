/*
 * grunt-angular-templates
 * https://github.com/ericclemmons/grunt-angular-templates
 *
 * Copyright (c) 2013 Eric Clemmons
 * Licensed under the MIT license.
 */

'use strict';

var minify  = require('html-minifier').minify;
var path    = require('path');

module.exports.init = function(grunt) {

  var concat = function(options, files, callback) {
    grunt.util.async.concatSeries(files, function(file, next) {
      var id        = (options.prepend || '') + path.relative(options.base || '.', file).replace( /\\/g, '/');
      var template  = '\n  $templateCache.put("<%= id %>",\n    <%= content %>\n  );\n';
      var source    = grunt.file.read(file);

      if (options.htmlmin) {
        try {
          source = minify(source, options.htmlmin);
        } catch (err) {
          grunt.warn(file + '\n' + err);
        }
      }

      var cleaned   = source.split(/^/gm).map(function(line) { return JSON.stringify(line); }).join(' +\n    ');
      var cached    = process(template, id, cleaned);

      next(null, cached);
    }, callback);
  };

  var compile = function(id, noConflict, define, options, files, callback) {
    var template = '<%= noConflict %>.module("<%= id %>"';

    if (define) {
      template += ', []';
    }

    template += ').run(["$templateCache", function($templateCache) {\n<%= content %>\n}]);\n';

    concat(options, files, function(err, concated) {
      var compiled = process(template, id, concated.join(''), noConflict);

      callback(false, compiled);
    });
  };

  var process = function(template, id, content, noConflict) {
    return grunt.template.process(template, {
      data: {
        id:         id,
        content:    content.length ? content : '""',
        noConflict: noConflict
      }
    });
  };

  return {
    compile: compile
  };

};
