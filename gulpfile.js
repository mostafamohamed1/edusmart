const gulp = require("gulp");
const concat = require("gulp-concat");
const autoPrefix = require("gulp-autoprefixer");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const reload = require("gulp-livereload");
const uglify = require("gulp-uglify");

gulp.task("html", () => {
  return gulp
    .src("./**/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("./dist"))
    .pipe(reload());
});

gulp.task("css", () => {
  return gulp
    .src([
      "./node_modules/linearicons/dist/web-font/style.css",
      "./node_modules/owl.carousel/dist/assets/owl.carousel.min.css",
      "./node_modules/bootstrap/dist/css/bootstrap.min.css",
      "sass/main.scss",
    ])
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(autoPrefix("last 2 versions"))
    .pipe(concat("main.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(reload());
});

gulp.task("js", () => {
  return gulp
    .src([
      "./node_modules/jquery/dist/jquery.min.js",
      "./node_modules/owl.carousel/dist/owl.carousel.min.js",
      "./node_modules/bootstrap/dist/js/bootstrap.min.js",
      "./js/**/*.js",
    ])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat("main.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js"))
    .pipe(reload());
});

gulp.task("watch", function () {
  require("./server");
  reload.listen();
  gulp.watch(
    ["./**/*.pug", "./sass/**/*.scss", "./js/**/*.js"],
    gulp.series("html", "css", "js")
  );
});
