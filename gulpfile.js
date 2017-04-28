let gulp = require("gulp");
let webpack = require("webpack-stream");

let ENTRY_POINT = "sequencer.js";
let BUILD_DIR = "dist";

let webpackConfig = require("./webpack.config.js");

gulp.task("build", function () {
    return gulp.src(ENTRY_POINT)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task("default", ["build"]);
