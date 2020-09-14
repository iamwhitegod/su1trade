const gulp = require("gulp");
const sass = require("gulp-sass");
const { logError } = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const browserSync = require("browser-sync").create();

gulp.task("sass", () => {
  return gulp
    .src("./src/sass/main.scss")
    .pipe(sass().on("error", logError))
    .pipe(postcss([autoprefixer({ browsers: ["last 5 versions"] }), cssnano()]))
    .pipe(gulp.dest("css"));
});

gulp.task("watch:sass", () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  }),
    gulp.watch("./src/sass/**/*.scss", gulp.series(["sass"]));
  gulp.watch("./*.index.html").on("change", browserSync.reload);
});
