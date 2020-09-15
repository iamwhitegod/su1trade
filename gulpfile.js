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
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());
});

gulp.task("watch:sass", () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  }),
    gulp.watch("./src/sass/**/*.scss", gulp.series(["sass"])),
    gulp.watch("./*.html").on("change", browserSync.reload);
});
