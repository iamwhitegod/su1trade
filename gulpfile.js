const gulp = require("gulp");
const sass = require("gulp-sass");
const { logError } = require("gulp-sass");
const postcss = require("gulp-postcss");
const imageMin = require("gulp-imagemin");
const concat = require("gulp-concat");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const webpack = require("webpack-stream");
const { dest } = require("gulp");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

gulp.task("scss", () => {
  return gulp
    .src("./src/sass/main.scss")
    .pipe(sass().on("error", logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());
});

gulp.task("sass", () => {
  return gulp
    .src("./src/sass/main.scss")
    .pipe(sass().on("error", logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", () => {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(
      webpack({
        output: {
          filename: "bundle.js",
        },
      })
    )
    .pipe(gulp.dest("js"));
});

gulp.task("webpack", () => {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(webpack(require("./webpack.config")))
    .pipe(gulp.dest("build"));
});

gulp.task("img", () => {
  return gulp
    .src("./images/*")
    .pipe(imageMin())
    .pipe(gulp.dest("build/images"));
});

gulp.task("watch:sass", () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  }),
    gulp.watch(
      ["./src/sass/**/*.scss", "./src/js/**/*.js"],
      gulp.series(["scss", "js"])
    ),
    gulp.watch("./*.html").on("change", browserSync.reload);
});

gulp.task("prod", gulp.parallel(["webpack", "sass", "img"]));
