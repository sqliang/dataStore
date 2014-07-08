'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      files: ['dist']
    },
    copy: {
      requirejs: {
        src: 'public/bower_components/requirejs/require.js',
        dest: 'public/resources/require.min.js',
      },
      prod: {
        expand: true,
        cwd: 'public/',
        src: ['**', '!**/bower_components/**', '!**/libs/**', '!**/resources/javascripts/**', '!**/*.less', '!**/config.js', '!**/bower.json', '!**/.jshintrc'],
        dest: 'dist/'
      }
    },
   
    less: {
      dev: {
        options: {
          paths: ["public/resources/stylesheets"],
          syncImport: true
        },
        files: {
          "public/resources/stylesheets/homeMain.css": "public/resources/stylesheets/homeMain.less"
        }
      }
    },
    
    watch: {
      less: {
        files: "public/stylesheets/*.less",
        tasks: ['less:dev'],
        options: {
          debounceDelay: 250
        }
      }
    },
    requirejs: {
      options: {
        baseUrl: 'public/resources/',
        mainConfigFile: 'public/resources/config.js',
        optimize: 'none',
        logLevel: 0,
        findNestedDependencies: true,
        fileExclusionRegExp: /^\./,
        inlineText: true,
        wrap: {
          start: '<%= banner %>'
        },
      },
      global: {
        options: {
          name: 'global',
          out: 'dist/resources/global.js',
          optimize: 'uglify',
          //optimize: 'closure',
          deps: ["jquery", "bootstrap", "underscore", "backbone"],
          onBuildRead: function(moduleName, path, contents) {
            if (moduleName === 'global') {
              return contents.replace(/\/\*configStart[\s\S]*?configEnd\*\//, ' ');
            } else {
              return contents;
            }
          },
        }
      },
      homeMain: {
        options: {
          name: 'javascripts/homeMain',
          out: 'dist/resources/javascripts/homeMain.js',
          exclude: [
            "jquery", "bootstrap", "underscore", "backbone", "global"
          ]
        }
      },

    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task.用于发布成产品
  grunt.registerTask('default', ['clean', 'requirejs', 'less:dev', 'copy:prod']);

  //产品模式
  grunt.registerTask('prod', ['default']);
};