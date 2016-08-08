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

  custom_usemin: function(test) {
    test.expect(5);

    test.equal(grunt.file.read('test/expected/useminUgly.html'), grunt.file.read('tmp/useminUgly.html'));
    test.equal(grunt.file.read('test/expected/useminUgly/foo.js').slice(0, -1), grunt.file.read('tmp/useminUgly/foo.js'));
    test.equal(grunt.file.read('test/expected/useminUgly/bar.js').slice(0, -1), grunt.file.read('tmp/useminUgly/bar.js'));
    test.equal(grunt.file.read('test/expected/useminUgly/all.js').slice(0, -1), grunt.file.read('tmp/useminUgly/all.js'));
    test.equal(grunt.file.read('test/expected/useminUgly/bar.css'), grunt.file.read('tmp/useminUgly/bar.css'));

    test.done();
  },

  custom_usemin_no_uglify: function(test) {
    test.expect(5);

    test.equal(grunt.file.read('test/expected/usemin.html'), grunt.file.read('tmp/usemin.html'));
    test.equal(grunt.file.read('test/expected/usemin/foo.js'), grunt.file.read('tmp/usemin/foo.js'));
    test.equal(grunt.file.read('test/expected/usemin/bar.js'), grunt.file.read('tmp/usemin/bar.js'));
    test.equal(grunt.file.read('test/expected/usemin/all.js'), grunt.file.read('tmp/usemin/all.js'));
    test.equal(grunt.file.read('test/expected/usemin/bar.css'), grunt.file.read('tmp/usemin/bar.css'));

    test.done();
  },

  custom_usemin_not_found: function(test) {
    test.expect(1);

    test.equal(grunt.file.read('test/expected/custom_concat_usemin_not_found.js'), grunt.file.read('tmp/custom_concat_usemin_not_found.js'));

    test.done();
  },

  html5: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/html5.js');
    var expected  = grunt.file.read('test/expected/html5.js');

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

  custom_prefix: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/custom_prefix.js');
    var expected  = grunt.file.read('test/expected/custom_prefix.js');

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

  relative_url_expand: function(test) {
    test.expect(2);

    var actual    = grunt.file.read('tmp/three/three.js');
    var expected  = grunt.file.read('test/expected/relative_url_expand_three.js');

    test.equal(expected, actual);

    actual    = grunt.file.read('tmp/three/three_two.js');
    expected  = grunt.file.read('test/expected/relative_url_expand_three_two.js');

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

  empty_file: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/empty_file.js');
    var expected  = grunt.file.read('test/expected/empty_file.js');

    test.equal(expected, actual);
    test.done();
  },

  undefined_file: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/undefined_file.js');
    var expected  = grunt.file.read('test/expected/undefined_file.js');

    test.equal(expected, actual);
    test.done();
  },

  single_quote: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/single_quotes.js');
    var expected  = grunt.file.read('test/expected/single_quotes.js');

    test.equal(expected, actual);
    test.done();
  },

  linebreak: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/linebreak.js');
    var expected  = grunt.file.read('test/expected/linebreak.js');

    test.equal(expected, actual);
    test.done();
  },

  regexp: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/regexp.js');
    var expected  = grunt.file.read('test/expected/regexp.js');

    test.equal(expected, actual);
    test.done();
  },

  unmerged_files: function(test) {
    test.expect(5);

    test.equal(grunt.file.read('tmp/unmerged/test/fixtures/unmerged/undefined.js'), grunt.file.read('test/expected/unmerged_files/undefined.js'));
    test.equal(grunt.file.read('tmp/unmerged/test/fixtures/unmerged/usemin.js'), grunt.file.read('test/expected/unmerged_files/usemin.js'));
    test.equal(grunt.file.read('tmp/unmerged/test/fixtures/unmerged/level2/empty.js'), grunt.file.read('test/expected/unmerged_files/empty.js'));
    test.equal(grunt.file.read('tmp/unmerged/test/fixtures/unmerged/level2/html5.js'), grunt.file.read('test/expected/unmerged_files/html5.js'));
    test.equal(grunt.file.read('tmp/unmerged/test/fixtures/unmerged/level2/level3/one.js'), grunt.file.read('test/expected/unmerged_files/one.js'));
    test.done();
  }

};
