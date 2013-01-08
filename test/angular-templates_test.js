'use strict';

var grunt     = require('grunt');
var fs        = require('fs');

exports.ngtemplates = {

  simple: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/simple.js');
    var expected  = grunt.file.read('test/expected/simple.js');

    test.equal(expected, actual, 'should compile template as module `simple.templates`');
    test.done();
  }

};
