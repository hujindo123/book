var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer'); // 添加 CSS 浏览器前缀
var cssnano = require('gulp-cssnano'); // CSS 压缩
var connect = require('gulp-connect'); // 自动刷新
gulp.task("sass", function () {
    console.log('监听到~~~~~~~~');
    return gulp.src("static/sass/page/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer('last 6 version')) // 添加 CSS 浏览器前缀，兼容最新的5个版本
        .pipe(cssnano()) // 压缩 CSS
        .pipe(gulp.dest("static/css/page"));
});
//定义livereload任务
gulp.task('connect', function () {
    connect.server({
        port: 8090,
        livereload: true
    });
});
gulp.task('watch', function () {
    gulp.watch("static/sass/page/*.scss", ["sass"]);
});
gulp.task('default', ['connect']);