const gulp = require('gulp');
const connect = require('gulp-connect');
const CacheBuster = require('gulp-cachebust');

const cachebust = new CacheBuster();

gulp.task('build-css', () => {
    return gulp.src('styles/*.css')
        .pipe(cachebust.resources())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('build-html', ['build-css'], () => {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});

gulp.task('server', () => {
    connect.server( {
        root: 'dist'
    })
});

gulp.task('default', ['build-html', 'server']);