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
    test: {
      files: ['test/*.js']
    },
    lint: {
      files: ['grunt.js', 'tasks/**/*.js', 'test/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
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
    ngtemplates: {
      simple: {
        options: {
          base: 'test/fixtures'
        },
        src: ['test/fixtures/**/simple.html'],
        dest: 'tmp/simple.js'
      }
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  grunt.registerTask('default', 'lint ngtemplates test');
};
