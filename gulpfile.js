var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var BUILD_DIR = 'dist';
var BUILD_EXTENSIONS_DIR = BUILD_DIR + '/extensions';

gulp.task('core', function () {
    return gulp.src(["core/*.js", "extensions/core/*.js"])
        .pipe(concat("sequencer.js"))
        .pipe(gulp.dest(BUILD_DIR)) // Output non-minified js
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js"}))
        .pipe(gulp.dest(BUILD_DIR)); // Output minified js
});

gulp.task('extensions', function () {
    return gulp.src(["extensions/vendor/*.js"])
        .pipe(gulp.dest(BUILD_EXTENSIONS_DIR)) // Output non-minified js
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js"}))
        .pipe(gulp.dest(BUILD_EXTENSIONS_DIR)); // Output minified js
});

gulp.task('build', ['core', 'extensions']);

gulp.task('default', ['build']);
