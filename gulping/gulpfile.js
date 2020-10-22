const { parallel, task, series, watch } = require('gulp');
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');

task('hello', function(done) {
    console.log('hello world');
    done();
});

task('render-pug', function() {
    return gulp.src('src/**/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('public'))
});

task('render-sass', function() {
    return gulp.src('src/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public'))
});

task('render',parallel(['render-pug','render-sass']), function(done) {
    console.log('rendered');
    done();
});


task('watch', function (done) {
    watch(['src/**/*.pug'],series(['render-pug']));
    watch(['src/**/*.sass'],series(['render-sass']));
    done();
});

task('default',series(['render','watch']));