// Great help fromt this article: https://markgoodyear.com/2014/01/getting-started-with-gulp/

var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var del = require('del');

gulp.task('styles', function () {
  return gulp.src('css/*.css')
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('../css'))
      .pipe(notify({ message: 'Styles task complete' }));
  });

gulp.task('scripts', function() {
  return gulp.src('js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('../js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

//Clean files before each build
gulp.task('clean', function() {
  return del(['../css', '../js']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts');
});