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
      }
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('default', ['jshint', 'ngtemplates', 'nodeunit']);
};
