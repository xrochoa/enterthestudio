'use strict';

// GULP
var gulp = require('gulp');

// PLUGINS
//js
var uglify = require('gulp-uglify');
//css
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
//img
var imagemin = require('gulp-imagemin');
//server
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
//utils
var clean = require('gulp-clean');
var runSequence = require('run-sequence');


//Clean folders before tasks
gulp.task('clean', function() {
    return gulp.src(['dist/*'], {
            read: false
        })
        .pipe(clean());
});

//Browserify and Minify Javascript
gulp.task('js', function() {
    return gulp.src('src/js/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

//Compile Sass to CSS and Minify
gulp.task('css', function() {
    return gulp.src('src/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css')) //saves at source
        .pipe(autoprefixer({
            browsers: [
                "Android 2.3",
                "Android >= 4",
                "Chrome >= 20",
                "Firefox >= 24",
                "Explorer >= 8",
                "iOS >= 6",
                "Opera >= 12",
                "Safari >= 6"
            ],
            cascade: false
        }))
        .pipe(livereload());

});

//Copies unmodified html (could be minified with gulp-minify-html)
gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest("dist"))
        .pipe(livereload());
});

//Copies and minifies css filed
gulp.task('mincss', function() {
    return gulp.src('src/css/**/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});

//Minify images
gulp.task('img', function() {
    return gulp.src('src/images/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))
        .pipe(gulp.dest('dist/images'))
        .pipe(livereload());
});

//Watches Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/scss/**/*.scss', ['css', 'mincss']);
    gulp.watch('src/**/*.html', ['html']);

});

//Node server start
gulp.task('server', function() {
    nodemon({
        script: 'server.js'
    });
});

// Default Task
gulp.task('default', function() {
    runSequence('clean', 'html', 'js', 'css', 'mincss', 'img', 'watch', 'server');
});