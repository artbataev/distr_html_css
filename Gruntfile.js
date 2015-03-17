module.exports = function(grunt) {



  require('load-grunt-tasks')(grunt); // теперь все задачи — в package.json
  require('time-grunt')(grunt);



  grunt.initConfig({



    less: {
      style: {
        files: {
          'build/css/style.css': ['src/less/style.less']
        }
      }
    },



    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 9']
      },
      style: {
        src: 'build/css/style.css'
      }
    },



    cmq: {
      style: {
        files: {
          'build/css/style.css': ['build/css/style.css']
        }
      }
    },



    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          'build/css/style.min.css': ['build/css/style.css']
        }
      }
    },



    concat: {
      start: {
        src: [
          // 'src/js/plugin.js',
          'src/js/script.js'
        ],
        dest: 'build/js/script.min.js'
      }
    },



    uglify: {
      start: {
        files: {
          'build/js/script.min.js': ['build/js/script.min.js']
        }
      }
    },



    sprite:{
      sprite_large: {
        src: 'src/img/sprite-2x/*.png',
        dest: 'build/img/sprite-2x.png',
        padding: 8,
        imgPath: '../img/sprite-2x.png',
        destCss: 'src/less/components/sprite-2x.less', 
        'cssVarMap': function (sprite) {
          sprite.name = sprite.name + '-2x';
        },
      },
      sprite: {
        src: 'src/img/sprite/*.png',
        dest: 'build/img/sprite-1x.png',
        padding: 4,
        imgPath: '../img/sprite-1x.png',
        destCss: 'src/less/components/sprite-1x.less',
      }
    },



    imagemin: {
      build: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ['build/img/*.{png,jpg,gif,svg}']
        }]
      }
    },



    // replace: {
    //   dist: {
    //     options: {
    //       patterns: [
    //         {
    //           match: /<script src=\"js\/plugins.js/g,
    //           replacement: '<script src="js/plugins.min.js'
    //         },
    //         {
    //           match: /<script src=\"js\/script.js/g,
    //           replacement: '<script src="js/script.min.js'
    //         }
    //       ]
    //     },
    //     files: [
    //       {
    //         expand: true,
    //         src: ['src/*.html']
    //       }
    //     ]
    //   }
    // },



    clean: {
      build: [
        'build/css', 
        'build/img', 
        'build/js', 
        'build/*.html', 
      ]
    },



    copy: {
      js_vendors: {
        expand: true,
        cwd: 'src/js/vendors/',
        src: ['**'],
        dest: 'build/js/',
      },
      img: {
        expand: true,
        cwd: 'src/img/',
        src: ['*.{png,jpg,gif,svg}'],
        dest: 'build/img/',
      },
      // fonts: {
      //   expand: true,
      //   cwd: 'src/font/',
      //   src: ['*.{eot,svg,woff,ttf}'],
      //   dest: 'build/font/',
      // },
    },



    includereplace: {
      html: {
        src: '*.html', 
        dest: 'build/', 
        expand: true, 
        cwd: 'src/'
      }
    },



    watch: {
      style: {
        files: ['src/less/*.less'],
        tasks: ['style'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      scripts: {
        files: ['src/js/script.js'],
        tasks: ['js'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      images: {
        files: ['src/img/**/*.{png,jpg,gif,svg}'],
        tasks: ['img'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      html: {
        files: ['src/*.html', 'src/_html_inc/*.html'],
        tasks: ['includereplace:html'],
        options: {
          spawn: false,
          livereload: true
        },
      },
    },



    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'build/css/*.css',
            'build/js/*.js',
            'build/img/*.{png,jpg,gif,svg}',
            'build/*.html',
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "build/",
          },
          // startPath: "/index.html",
          ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
          }
        }
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
    'copy:js_vendors',
    'copy:img',
    // 'copy:font',
    'sprite',
    'imagemin',
    'includereplace:html',
    'browserSync',
    'watch'
  ]);



  grunt.registerTask('build', [
    'clean:build',
    'less',
    'autoprefixer',
    'cmq',
    'cssmin',
    'concat',
    'uglify',
    'copy:js_vendors',
    'copy:img',
    // 'copy:font',
    'sprite',
    'imagemin',
    'includereplace:html',
  ]);



  grunt.registerTask('js', [
    'concat',
    'uglify',
    'copy:js_vendors',
  ]);



  grunt.registerTask('style', [
    'less',
    'autoprefixer',
    'cmq',
    'cssmin'
  ]);



  grunt.registerTask('img', [
    'sprite',
    'copy:img',
    'imagemin',
    'less',
    'autoprefixer',
    'cmq',
    'cssmin'
  ]);

};