module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      deps: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-touch/angular-touch.js',
//          'bower_components/bootstrap/dist/js/bootstrap.js'
        ],
        dest: 'build/deps.js'
      },
      src: {
        src: [
          'scripts/xbmc.core.js',
          'scripts/xbmc.rpc.js',
          'scripts/app.js'
        ],
        dest: 'build/app.js'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'scripts/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'build-dev']
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        sourceMap: true
      },
      dist: {
        files: {
          'build/app.bundle.min.js': [
            'build/deps.js',
            'build/app.js'

          ]
        }
      }
    },
    less: {
      development: {
        files: {
          "build/styles.css": "styles/styles.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');


  grunt.registerTask('copy-deps', ['concat:deps']);
  grunt.registerTask('copy-src', ['concat:src']);

  grunt.registerTask('build-dev', ['copy-deps', 'copy-src', 'uglify', 'less']);
  grunt.registerTask('dev', ['build-dev', 'watch']);

};