'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    regarde: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile'],
        spawn: true
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib'],
        spawn: true
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test'],
        spawn: true
      },
    },

    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        //grep: '*-test',
        ui: 'bdd',
        reporter: 'list'
      },

      all: { src: ['<%= jshint.test.src %>'] }
    }
  });

    // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.registerTask('test', ['simplemocha']);
    // Default task.
  grunt.registerTask('default', ['jshint', 'simplemocha']);
};
