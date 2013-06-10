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

  var concat = function(options, files, callback) {
    grunt.util.async.concatSeries(files, function(file, next) {
      var id        = (options.prepend || '') + path.relative(options.base || '.', file).replace( /\\/g, '/');
      var template  = '\n'+(tab(options))+'$templateCache.put("<%= id %>",\n'+'<%= content %>\n'+(tab(options))+');\n';
      var cleaned   = grunt.file.read(file).split(/^/gm).map(function(line) { return tab(options,2)+JSON.stringify(line); }).join(' +\n');
      var cached    = process(template, id, cleaned);

      next(null, cached);
    }, callback);
  };

  var tab = function(options, times){
    times = times || 1;
    var str = '';
    var baseIdent = options.baseIdent || 0;
    var ident = (options.ident || 2)*times;

    return new Array(baseIdent+ident+1).join(' ');
  };

  var compile = function(id, noConflict, options, files, template, callback) {
    if(template){
      template = parseTemplate(template);
    }
    else{
      template =  '<%= noConflict %>.module("<%= id %>").run(["$templateCache", function($templateCache) {\n<%= content %>\n}]);\n';
    }
    concat(options, files, function(err, concated) {
      var compiled = process(template, id, concated.join(''), noConflict);

      callback(false, compiled);
    });
  };

  var parseTemplate = function(template){
    return template.replace(/\{\{(\w+)\}\}/gi, "<%=$1%>");
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
