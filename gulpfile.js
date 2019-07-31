const gulp = require('gulp');
const del = require('del');
const connect = require('gulp-connect');
const CacheBuster = require('gulp-cachebust');

const cachebust = new CacheBuster();

function clean() {
    return del('dist');
}

function css() {
    return gulp.src('styles/*.css')
        .pipe(cachebust.resources())
        .pipe(gulp.dest('dist/css'));
}

function html() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
}

function server(done) {
   connect.server( {
        root: 'dist'
    }, () => {
      return done();
    });
}

exports.clean = clean;
exports.css = css;
exports.html = html;
exports.server = server;

/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = gulp.series(clean, css, html, server);
