

// npm install --save-dev gulp gulp-less gulp-rigger browser-sync gulp-autoprefixer gulp-uglify gulp-imagemin imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo gulp-uglify imagemin-gifsicle imagemin-jpegtran imagemin-optipng


var gulp = require('gulp'),
    less = require('gulp-less'),
    rigger = require('gulp-rigger'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    autoprefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');

var src = {
    lessAll: 'app/src/styles/**/*.less',
    less: 'app/src/styles/style.less',
    html: 'app/src/*.html',
    htmlAll: 'app/src/**/*.html',
    imagel: 'app/src/image/*.{jpg,jpeg,png,gif}',
    font: 'app/src/font/*',
    jsFolder: 'app/src/script/*.js',
};

var dist = {
    css:  'app/compiled/styles/',
    html: 'app/compiled/',
    imagel: 'app/compiled/image/',
    font: 'app/compiled/font/',
    jsFolder: 'app/compiled/script/',
};

gulp.task('css', function () {
    gulp.src(src.less)
        .pipe(less())
        .pipe(autoprefix('last 3 version'))
        .pipe(gulp.dest(dist.css))
        .pipe(reload({stream: true}));
});

gulp.task('html:build', function () {
    gulp.src(src.html)
        .pipe(rigger())
        .pipe(gulp.dest(dist.html))
        .pipe(reload({stream: true}));
});

gulp.task('js', function () {
    gulp.src(src.jsFolder)
        .pipe(gulp.dest(dist.jsFolder));
});

gulp.task('image', function () {
	gulp.src(src.imagel)
		.pipe(imagemin({ optimizationLevel: 30, progressive: true, interlaced: true }))
		.pipe(gulp.dest(dist.imagel))
});

gulp.task('font:build', function() {
    gulp.src(src.font)
        .pipe(gulp.dest(dist.font))
});

gulp.task('serve', function() {
    browserSync({
        server: dist.html
    });
    gulp.watch(src.lessAll, ['css']);
    gulp.watch(src.jsFolder, ['js']);
    gulp.watch(src.imagel, ['image']);
    gulp.watch(src.htmlAll,['html:build']).on('change', reload);

});

gulp.task('default', ['serve','css','html:build',
    'font:build','js','image'], function () {});
