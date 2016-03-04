var gulp   = require('gulp');
var $      = require('gulp-load-plugins')();

// Define base paths for Sass and Javascript.
var sassPaths = [
    'source/scss/',
    'bower_components/foundation-sites/scss',
    // 'bower_components/motion-ui/src',
    // 'bower_components/slicknav/scss',
    // 'bower_components/highlightjs/styles'
];

var javascriptFiles = [
    'bower_components/jquery/dist/jquery.js'
];

// Set up 'sass' task.
gulp.task('sass', function() {
  return gulp.src('source/scss/docs.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'nested' // 'compressed' or 'nested'
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('styles'));
});

// Set up 'compress' task.
gulp.task('compress', function() {
  return gulp.src('source/javascript/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('javascript'));
});


gulp.task('copyjavascript', function() {
   gulp.src(javascriptFiles)
   .pipe(gulp.dest('source/javascript'));
});


// Set up 'default' task, with watches.
gulp.task('default', ['sass', 'compress'], function() {
  gulp.watch(['source/scss/**/*.scss'], ['sass']);
  gulp.watch(['source/javascript/**/*.js'], ['compress']);
});