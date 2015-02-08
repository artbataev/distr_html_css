module.exports = function(grunt) {



  require('load-grunt-tasks')(grunt); // теперь все задачи — в package.json



  grunt.initConfig({



    less: {
      style: {
        files: {
          'css/style.css': ['less/style.less']
        }
      }
    },



    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 9']
      },
      style: {
        src: 'css/style.css'
      }
    },



    cmq: {
      style: {
        files: {
          'css/style.css': ['css/style.css']
        }
      }
    },



    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          'css/style.min.css': ['css/style.css']
        }
      }
    },



    concat: {
      start: {
        src: [
          'js/vendors/modernizr-2.8.3.min.js',
          'js/script.js'
        ],
        dest: 'js/script.min.js'
      }
    },



    uglify: {
      start: {
        files: {
          'js/script.min.js': ['js/script.min.js']
        }
      }
    },



    sprite:{
      sprite_large: {
        src: 'img/sprite-2x/*.png',
        dest: 'img/sprite-2x.png',
        destCss: 'less/components/sprite-2x.less',
        'cssVarMap': function (sprite) {
          sprite.name = sprite.name + '-2x';
        },
      },
      sprite: {
        src: 'img/sprite/*.png',
        dest: 'img/sprite-1x.png',
        destCss: 'less/components/sprite-1x.less',
      }
    },



    imagemin: { 
      build: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ['img/*.{png,jpg,gif,svg}']
        }]
      }
    },



    // replace: {
    //   // dist: {
    //   //   options: {
    //   //     patterns: [
    //   //       {
    //   //         match: /<script src=\"js\/build\/plugins.js/g,
    //   //         replacement: '<script src="js/build/plugins.min.js'
    //   //       },
    //   //       {
    //   //         match: /<script src=\"js\/build\/script.js/g,
    //   //         replacement: '<script src="js/build/script.min.js'
    //   //       }
    //   //     ]
    //   //   },
    //   //   files: [
    //   //     {
    //   //       expand: true,
    //   //       src: ['<%= config.dist %>/*.html']
    //   //     }
    //   //   ]
    //   // }
    // },



    // copy: {
    //   // stuff: {
    //   //   expand: true,
    //   //   cwd: '<%= config.src %>',
    //   //   // src: ['**','!less/*'],
    //   //   src: [
    //   //     '**',
    //   //     '!**/less/**', // no less
    //   //     '!**/_*/**', // ignore '_name' folders
    //   //     '!**/js/**', // ignore all js
    //   //     'js/build/*'
    //   //     ],
    //   //   dest: '<%= config.dist %>'
    //   // },
    //   // gdrive: {
    //   //   expand: true,
    //   //   cwd: '<%= config.dist %>',
    //   //   src: ['**'],
    //   //   dest: '<%= config.gdrive %>'
    //   // }
    // },



    watch: {
      style: {
        files: ['less/*.less'],
        tasks: ['less', 'autoprefixer', 'cmq', 'cssmin'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      scripts: {
        files: ['js/script.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      images: {
        files: ['img/**/*.{png,jpg,gif,svg}'],
        tasks: ['sprite', 'imagemin', 'less', 'autoprefixer', 'cmq', 'cssmin'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      livereload: {
        options: { livereload: true },
        files: ['*.html','css/*.css','js/*.js']
      }
    }

  });



  grunt.registerTask('default', [
    'less',
    'autoprefixer',
    'cmq',
    'cssmin',
    'concat',
    'uglify',
    'sprite',
    'imagemin',
    'watch'
  ]);

};