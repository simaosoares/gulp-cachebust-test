const gulp = require('gulp');
const connect = require('gulp-connect');
const CacheBuster = require('gulp-cachebust');

const cachebust = new CacheBuster();

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

exports.css = css;
exports.html = html;
exports.server = server;

/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = gulp.series(css, html, server);
