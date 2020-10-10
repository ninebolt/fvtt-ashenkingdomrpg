const gulp = require("gulp");
const scss = require("gulp-sass");

const AKRPG_SCSS = ["styles/*.scss"];
function compileSCSS() {
    return gulp.src("styles/akrpg.scss").pipe(scss()).pipe(gulp.dest("./"));
}

const css = gulp.series(compileSCSS);

function watchForUpdates() {
    gulp.watch(AKRPG_SCSS, css);
}

exports.default = gulp.series(gulp.parallel(css), watchForUpdates);

exports.css = css;
