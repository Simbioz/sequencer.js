var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var BUILD_DIR = 'build/';
var BUILD_EXTENSIONS_DIR = 'build/extensions';

gulp.task('core', function () {
    return gulp.src(["core/*.js", "extensions/core/*.js"])
        .pipe(concat("sequencer.js"))
        .pipe(gulp.dest(BUILD_DIR)) // Output non-minified js
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js"}))
        .pipe(gulp.dest(BUILD_DIR)); // Output minified js
});

gulp.task('extensions', function () {
    return gulp.src(["extensions/third-party/*.js"])
        .pipe(gulp.dest(BUILD_EXTENSIONS_DIR)) // Output non-minified js
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js"}))
        .pipe(gulp.dest(BUILD_EXTENSIONS_DIR)); // Output minified js
});

gulp.task('default', ['core', 'extensions']);