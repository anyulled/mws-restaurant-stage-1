/* eslint-disable no-console */
const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const jasmine = require("gulp-jasmine-phantom");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const eslint = require("eslint");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");

browserSync.init({
    server: "./",
});
browserSync.stream();

gulp.task("default", done => {
    console.info("Gulping");
    done();
});

gulp.task("styles", () => {
    gulp.src("sass/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./css"));
});

gulp.task("lint", () => gulp.src(["**/*.js", "!node_modules/**"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));

gulp.task("default", ["lint"], () => {
});

gulp.task("default", () => {
    gulp.watch("sass/**/*.scss", ["styles"]);// eslint-disable-line fp/no-mutating-methods
});

gulp.task("default", () => gulp.src("src/images/*")
    .pipe(imagemin({
        progressive: true,
        use: [pngquant()],
    }))
    .pipe(gulp.dest("dist/images")));


gulp.task("default", () => gulp.src("spec/test.js").babel().pipe(jasmine()));


gulp.task("scripts-dist", () => {
    gulp.src("js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/js"));
});