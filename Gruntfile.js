/*
 * grunt-angular-templates
 * https://github.com/ericclemmons/grunt-angular-templates
 *
 * Copyright (c) 2013 Eric Clemmons
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    nodeunit: {
      files: ['test/*.js']
    },
    watch: {
      files: '<config:jshint.files>',
      tasks: 'default'
    },
    jshint: {
      files: ['Gruntfile.js', 'tasks/**/*.js', 'test/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      globals: {}
    },
    concat: {
      simple: {
        files: {
          'tmp/concat_simple_expected.js': 'test/fixtures/DOES_NOT_EXIST/**/*.html'
        }
      },
      multiple: {
        src: ['test/fixtures/DOES_NOT_EXIST/**/*.html'],
        dest: 'tmp/concat_multiple_expected.js'
      }
    },
    ngtemplates: {
      multiple: {
        options: {
          base: 'test/fixtures'
        },
        src: ['test/fixtures/multiple/**/*.html'],
        dest: 'tmp/multiple.js'
      },
      simple: {
        options: {
          base: 'test/fixtures'
        },
        src: ['test/fixtures/simple.html'],
        dest: 'tmp/simple.js'
      },
      prepend: {
        options: {
          base: 'test/fixtures',
          prepend: '/prepend/'
        },
        src: ['test/fixtures/simple.html'],
        dest: 'tmp/simple_prepend.js'
      },
      target: {
        options: {
          base: 'test/fixtures',
          module: 'ImAModuleNotATarget'
        },
        src: ['test/fixtures/simple.html'],
        dest: 'tmp/options_module.js'
      },
      concatSimple: {
        options: {
          concat: 'simple'
        },
        src: 'test/fixtures/simple.html',
        dest: 'tmp/concat_simple_fixture.js'
      },
      concatMultiple: {
        options: {
          concat: ['multiple']
        },
        src: 'test/fixtures/multiple/**/*.html',
        dest: 'tmp/concat_multiple_fixture.js'
      },
      noConflict: {
        options: {
          base: 'test/fixtures',
          noConflict: 'notGlobalAngular'
        },
        src: 'test/fixtures/simple.html',
        dest: 'tmp/options_noConflict_fixture.js'
      },
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('default', ['jshint', 'ngtemplates', 'concat', 'nodeunit']);
};
