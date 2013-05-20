'use strict';

var grunt     = require('grunt');
var fs        = require('fs');

exports.ngtemplates = {

  simple: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/simple.js');
    var expected  = grunt.file.read('test/expected/simple.js');

    test.equal(expected, actual, 'should compile template as module `simple`');
    test.done();
  },

  multiple: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/multiple.js');
    var expected  = grunt.file.read('test/expected/multiple.js');

    test.equal(expected, actual, 'should compile multiple templates together as `multiple`');
    test.done();
  },

  prepend: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/simple_prepend.js');
    var expected  = grunt.file.read('test/expected/simple_prepend.js');

    test.equal(expected, actual, 'should prepend $templateCache ID with /prepend/simple.html"');
    test.done();
  },

  module: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/options_module.js');
    var expected  = grunt.file.read('test/expected/options_module.js');

    test.equal(expected, actual, 'should set the angular module to the provided options value');
    test.done();
  },

  noConflict: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/options_noConflict_fixture.js');
    var expected  = grunt.file.read('test/expected/options_noConflict.js');

    test.equal(expected, actual, 'should reference angular by the noConflict options value');
    test.done();
  },

  concatSimple: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/concat_simple_fixture.js');
    var expected  = grunt.file.read('tmp/concat_simple_expected.js');

    test.equal(expected, actual, 'should create concat target that equals ngtemplate');
    test.done();
  },

  concatMultiple: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/concat_multiple_fixture.js');
    var expected  = grunt.file.read('tmp/concat_multiple_expected.js');

    test.equal(expected, actual, 'should create concat target that equals ngtemplate');
    test.done();
  }

};
