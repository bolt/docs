var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var argv = require('yargs').argv;

// Check for --production flag
var isProduction = !!(argv.production);

// Define base paths for Sass and Javascript.
var sassPaths = [
    'scss/',
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

  var minifycss = $.if(isProduction, $.minifyCss());

  return gulp.src('scss/docs.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'nested' // 'compressed' or 'nested'
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(minifycss)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('../../web/styles'));
});

// Set up 'compress' task.
gulp.task('compress', function() {
  return gulp.src('js/*.js')
    .pipe($.concat('docs.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('../../web/js'));
});


gulp.task('copyjavascript', function() {
   gulp.src(javascriptFiles)
   .pipe($.uglify())
   .pipe(gulp.dest('../../web/js'));
});

// Build the "dist" folder by running all of the above tasks
gulp.task('build', ['sass', 'compress']);


// Set up 'default' task, with watches.
gulp.task('default', ['sass', 'compress'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['js/**/*.js'], ['compress']);
});
