var gulp       = require('gulp'),
    less       = require('gulp-less'),
    path       = require('path'),
    browserSync= require("browser-sync"),
    imageResize= require('gulp-image-resize'),
    webpack    = require('gulp-webpack');

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
  gulp.task("serve", ["less", "js-watch", "html"], function() {
    browserSync.init({
        server : "./src"
    });

    gulp.watch(srcPath.LESS, ["less"]);
    gulp.watch(srcPath.JS, ["js-watch"]);
    gulp.watch(srcPath.HTML, ["html"]);
    gulp.watch(srcPath.HTML).on("change", function() {
        browserSync.reload;
    });
  });

  gulp.task("less", function() {
    gulp.src(srcPath.LESS)
      .pipe(less())
      .pipe(gulp.dest(srcPath.CSS))
      .pipe(browserSync.stream());
  })

  gulp.task("js-watch", function() {
    gulp.src(srcPath.JS)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./src/js'))
    .pipe(browserSync.stream());
  })

  gulp.task("html", function() {
    gulp.src(srcPath.HTML)
    .pipe(browserSync.stream());
  })

  gulp.task("go", ["serve"])

  gulp.start('go');

} 