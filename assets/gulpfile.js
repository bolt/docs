var gulp     = require('gulp'),
    $        = require('gulp-load-plugins')(),
    gulpIf   = require('gulp-if'),
    cleanCSS = require('gulp-clean-css'),
    isDev    = false // Set to true to include source maps in the built JS & CSS files
;

// Define base paths & options for JavaScript & SASS.
var jsFiles = [
        'bower_components/jquery/dist/jquery.js'
    ],
    sassPaths = [
        'scss/',
        'bower_components/foundation-sites/scss'
    ],
    sassOptions = {
        includePaths: sassPaths,
        outputStyle: gulpIf(isDev, 'nested', 'compressed')
    },
    prefixerOptions = {
        browsers: ['last 2 versions', 'ie >= 9']
    }
;

// Set up 'sass' task.
gulp.task('sass', function() {
    return gulp.src('scss/docs.scss')
        .pipe(gulpIf(isDev, $.sourcemaps.init()))
        .pipe($.sass(sassOptions).on('error', $.sass.logError))
        .pipe($.autoprefixer(prefixerOptions))
        .pipe(cleanCSS())
        .pipe(gulpIf(isDev, $.sourcemaps.write()))
        .pipe(gulp.dest('../../web/styles'))
        ;
});

// Set up 'compress' task.
gulp.task('compress', function() {
    return gulp.src('js/*.js')
        .pipe(gulpIf(isDev, $.sourcemaps.init()))
        .pipe($.concat('docs.js'))
        .pipe($.uglify())
        .pipe(gulpIf(isDev, $.sourcemaps.write()))
        .pipe(gulp.dest('../../web/js'))
        ;
});

// Build
gulp.task('build', ['sass', 'compress']);

// Set up 'default' task, with watches.
gulp.task('default', ['sass', 'compress'], function() {
    gulp.watch(['scss/**/*.scss'], ['sass']);
    gulp.watch(['js/**/*.js'], ['compress']);
});
