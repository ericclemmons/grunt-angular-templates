module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    lint: {
      all: ["grunt.js", "tasks/*.js"]
    }
  });

  grunt.registerTask("default", "lint");
  grunt.loadTasks("tasks");
};
