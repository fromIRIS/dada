var gulp       = require('gulp'),
    less       = require('gulp-less'),
    path       = require('path'),
    uglify     = require('gulp-uglify'),
    minifycss  = require('gulp-minify-css'),
    imagemin   = require('gulp-imagemin'),
    pngquant   = require('imagemin-pngquant'),
    tinypng    = require('gulp-tinypng'),
    notify     = require('gulp-notify'),
    spriter    = require('gulp-spriter-ny'),
    minimist   = require('minimist'),
    webpack    = require('gulp-webpack');
var log = require('npmlog');
var del = require('del');

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

  // 限制--sprite 必须携带 1或2
  if (typeof(config.sprite) == 'boolean') {
    return log.error('you need add 1/2 to tell yazi how to handle sprite');
  } else if (parseInt(config.sprite) != 2 && parseInt(config.sprite) != 1) {
    return log.error('you need add 1/2 to tell yazi how to handle sprite');
  }

//压缩js css 文件，压缩后文件放入build下   
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
      .pipe(notify({message: 'finished minifycss!'}))
  });


  gulp.task('minifysprite',function(){
    var isH5 = (parseInt(config.sprite) === 2) ? true : false;
    return gulp.src(srcPath.LESS)
      .pipe(notify({message: 'starting minifysprite!'}))
      .pipe(less())
      .pipe(spriter({
        sprite: "sprite.png",
        slice: srcPath.SPRITE,
        outpath: srcPath.IMG,
        imgPathFromCss: "../images",
        isH5: isH5
      }))
      .pipe(gulp.dest(srcPath.CSS))
      .pipe(minifycss())
      .pipe(gulp.dest(distPath.CSS))
      .pipe(notify({message: 'finished minifysprite!'}))
  });


  //压缩图片
  gulp.task('imagemin', ['minifysprite'], function () {
    return gulp.src(srcPath.IMG + '/*.{png,jpg,jpeg,gif}')
      .pipe(notify({message: 'starting imagemin!'}))
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()] //深度png压缩
      }))
      .pipe(gulp.dest(distPath.IMG))
      .pipe(notify({message: 'finished imagemin!'}))
  });


  //压缩图片 - tinypng
  gulp.task('tinypng', function () {
    gulp.src(srcPath.IMG + '/*.{png,jpg,jpeg,gif}')
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
  gulp.task('build', ['clean', 'imagemin', 'minifyjs', 'buildfiles'], function(){
    log.info('buildSprite task finished!');
  });

  gulp.start('build');
} 