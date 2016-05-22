// Great help fromt this article: https://markgoodyear.com/2014/01/getting-started-with-gulp/

var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var del = require('del');
var inlinesource = require('gulp-inline-source');
var htmlmin = require('gulp-html-minifier');
var imagemin = require('gulp-imagemin');

gulp.task('styles', function () {
  gulp.src('css/*.css')
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/css'))
      .pipe(notify({ message: 'Styles task complete' }));


  gulp.src('views/css/*.css')
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/views/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  gulp.src('js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));

  gulp.src('views/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/views/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/views/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('inlinesource', function () {
  return gulp.src('*.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('dist'));
});

gulp.task('htmlmin', function() {
  gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));

  gulp.src('views/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/views'));
});

gulp.task('imagemin', function() {
  gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));

  gulp.src('views/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/views/images'));
});

//Clean files before each build
gulp.task('clean', function() {
  return del(['dist/css/*.css', 'dist/js/*.js', 'dist/*.html', 'dist/img', 'dist/views/images' ]);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'htmlmin', 'imagemin' );
});