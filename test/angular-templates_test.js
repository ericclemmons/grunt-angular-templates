'use strict';

var grunt     = require('grunt');
var fs        = require('fs');

exports.ngtemplates = {

  custom_angular: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/custom_angular.js');
    var expected  = grunt.file.read('test/expected/custom_angular.js');

    test.equal(expected, actual);
    test.done();
  },

  custom_bootstrap: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/custom_bootstrap.js');
    var expected  = grunt.file.read('test/expected/custom_bootstrap.js');

    test.equal(expected, actual);
    test.done();
  },

  custom_concat: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/custom_concat_combined.js');
    var expected  = grunt.file.read('test/expected/custom_concat.js');

    test.equal(expected, actual);
    test.done();
  },

  custom_htmlmin: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/custom_htmlmin.js');
    var expected  = grunt.file.read('test/expected/custom_htmlmin.js');

    test.equal(expected, actual);
    test.done();
  },

  task_htmlmin: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/task_htmlmin.js');
    var expected  = grunt.file.read('test/expected/task_htmlmin.js');

    test.equal(expected, actual);
    test.done();
  },

  default_module: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/default_module.js');
    var expected  = grunt.file.read('test/expected/default_module.js');

    test.equal(expected, actual);
    test.done();
  },

  custom_module: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/custom_module.js');
    var expected  = grunt.file.read('test/expected/custom_module.js');

    test.equal(expected, actual);
    test.done();
  },

  callback_module: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/callback_module.js');
    var expected  = grunt.file.read('test/expected/callback_module.js');

    test.equal(expected, actual);
    test.done();
  },

  custom_source: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/custom_source.js');
    var expected  = grunt.file.read('test/expected/custom_source.js');

    test.equal(expected, actual);
    test.done();
  },

  standalone: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/standalone.js');
    var expected  = grunt.file.read('test/expected/standalone.js');

    test.equal(expected, actual);
    test.done();
  },

  full_url: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/full_url.js');
    var expected  = grunt.file.read('test/expected/full_url.js');

    test.equal(expected, actual);
    test.done();
  },

  relative_url: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/relative_url.js');
    var expected  = grunt.file.read('test/expected/relative_url.js');

    test.equal(expected, actual);
    test.done();
  },

  custom_url: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/custom_url.js');
    var expected  = grunt.file.read('test/expected/custom_url.js');

    test.equal(expected, actual);
    test.done();
  },

};
