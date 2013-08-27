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

  moduleString: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/module_option_string.js');
    var expected  = grunt.file.read('test/expected/module_option_string.js');

    test.equal(expected, actual, 'set angular module name to the one provided');
    test.done();
  },

  moduleObject: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/module_option_object.js');
    var expected  = grunt.file.read('test/expected/module_option_object.js');

    test.equal(expected, actual, ' define new angular module with provided name');
    test.done();
  },

  moduleObjectName: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/module_option_object_name.js');
    var expected  = grunt.file.read('test/expected/module_option_string.js');

    test.equal(expected, actual, ' set angular module name to the one provided');
    test.done();
  },

  moduleObjectDefine: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/module_option_object_define.js');
    var expected  = grunt.file.read('test/expected/module_option_object_define.js');

    test.equal(expected, actual, ' define new angular module with grunt target name');
    test.done();
  },

  noConflict: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/noConflict_option_fixture.js');
    var expected  = grunt.file.read('test/expected/noConflict_option.js');

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
  },

  markup: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/markup.js');
    var expected  = grunt.file.read('test/expected/markup.js');

    test.equal(expected, actual, 'should create minified target that equals ngtemplate');
    test.done();
  },

  markupOption: function(test) {
    test.expect(1);

    var actual    = grunt.file.read('tmp/markup.js');
    var expected  = grunt.file.read('test/expected/markup_options.js');

    test.equal(expected, actual, 'should create minified target that equals ngtemplate');
    test.done();
  }

};
