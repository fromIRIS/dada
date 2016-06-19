var gulp       = require('gulp'),
    less       = require('gulp-less'),
    path       = require('path'),
    uglify     = require('gulp-uglify'),
    minifycss  = require('gulp-minify-css'),
    imagemin   = require('gulp-imagemin'),
    pngquant   = require('imagemin-pngquant'),
    webpack    = require('gulp-webpack'),
    tinypng    = require('gulp-tinypng');

var notify = require('gulp-notify');
var log = require('npmlog');
var del = require('del');
var copy = require('gulp-copy');
var clean = require('gulp-clean');
var webpackConfig = require('../dada-manager/webpack-config.js');

var srcPath    = {
      HTML : "./src/*.html",
      LESS : "./src/less/*.less",
      CSS : "./src/css",
      JS : ["./src/js/*.js","!./src/js/*min.js"],
      IMG : "./src/images",
      SPRITE: "./src/images/slice",
      LIB : "./src/lib"
    };
var distPath   = {
      ROOT : "./build",
      CSS : "./build/css",
      JS : "./build/js",
      IMG : "./build/images"
    };


module.exports = function (config) {


//压缩js css 文件，压缩后文件放入dist下   
  gulp.task('minifyjs',function(){
    return gulp.src(srcPath.JS)
    .pipe(notify({message: 'starting minifyjs!'}))
    .pipe(webpack(webpackConfig))
    .pipe(uglify())
    .pipe(gulp.dest(distPath.JS))
    .pipe(notify({message: 'finished minifyjs!'}));
  });

  gulp.task('minifycss',function(){
    return gulp.src(srcPath.LESS)
      .pipe(notify({message: 'starting minifycss!'}))
      .pipe(less())
      .pipe(gulp.dest(srcPath.CSS))
      .pipe(minifycss())
      .pipe(gulp.dest(distPath.CSS))
      .pipe(notify({message: 'finished minifycss!'}));
  });



  //压缩图片
  gulp.task('imagemin', function () {
    return gulp.src(srcPath.IMG + '/*.{png,jpg,jpeg}')
      .pipe(notify({message: 'starting imagemin!'}))
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()] //深度png压缩
      }))
      .pipe(gulp.dest(distPath.IMG))
      .pipe(notify({message: 'finished imagemin!'}));
  });


  //压缩图片 - tinypng
  gulp.task('tinypng', function () {
    gulp.src(srcPath.IMG + '/*.{png,jpg,jpeg}')
      .pipe(cache(tinypng(config.tinypngapi)))
      .pipe(gulp.dest(distPath.IMG));
  });

  //将相关项目文件复制到build 文件夹下
  gulp.task('buildfiles', function() {
    gulp.src(srcPath.HTML)
    .pipe(gulp.dest(distPath.ROOT));
    gulp.src(srcPath.LIB)
    .pipe(gulp.dest(distPath.ROOT));
  });

  gulp.task('clean', function () {
    return del.sync(distPath.ROOT);
  })

  //项目完成提交任务
  gulp.task('build', ['clean', 'imagemin', 'minifyjs', 'minifycss', 'buildfiles'], function(){
    log.info('build task finished!');
    
  });

  gulp.start('build');
} 