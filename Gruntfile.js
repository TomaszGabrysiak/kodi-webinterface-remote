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
          'bower_components/angular-touch/angular-touch.js'
        ],
        dest: 'build/deps.js'
      },
      src: {
        src: [
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
      files: ['<%= jshint.files %>', 'styles/styles.less'],
      tasks: ['jshint', 'build-dev']
    },
    copy: {
      main: {
        files: [{
          src: 'index.html',
          dest: 'build/index.html'
        },
        {
          cwd: 'bower_components/fontawesome/fonts',
          src: '*',
          dest: 'build/fonts',
          expand: true
        }, {
          src: 'addon.xml',
          dest: 'build/addon.xml'
        }]
      }
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
  grunt.loadNpmTasks('grunt-contrib-copy');


  grunt.registerTask('copy-deps', ['concat:deps']);
  grunt.registerTask('copy-src', ['concat:src']);

  grunt.registerTask('build-dev', ['copy-deps', 'copy-src', 'copy', 'uglify', 'less']);
  grunt.registerTask('dev', ['build-dev', 'watch']);

  grunt.registerTask('build-production', 'Builds whole plugin.', function(ver) {
    if (ver === null) {
      grunt.warn('Version must be specified. Eg: 0.0.1');
    } else {
      grunt.task.run('build-dev');
    }
  });

};