'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    jade = require('gulp-jade'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    spritesmith = require('gulp.spritesmith'),
    rimraf = require('rimraf'),
    uglify = require('gulp-uglify'),
    pngquant = require('imagemin-pngquant'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var path = {
    build: {
        jade: 'dist/',
        css: 'dist/css/',
        img: 'dist/img/',
        fonts: 'dist/fonts/',
        js: 'dist/js/',
        php: 'dist/server/',
        json: 'dist/js/json/'
    },
    src: {
        jade: 'src/jade/*.jade',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        js: 'src/js/*.js',
        php: 'src/server/**/*.*',
        json: 'src/js/json/*.json'
    },
    watch: {
        jade: 'src/**/*.jade',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        php: 'src/server/**/*.*',
        js: 'src/js/**/*.*'

    },
    clean: './dist'
};


// Webserver

var config = {
    server: {
        baseDir: "./dist"
    },
    tunel: 'true',
    host: 'localhost',
    port: 3000,
    logPrefix: "Loftschool Project"
};

gulp.task('webserver', function () {
    browserSync(config);
});


// Build HTML

gulp.task('jade:build', function () {
    gulp.src(path.src.jade)
        .pipe(jade({
            pretty: '\t',
        }))
        .pipe(gulp.dest(path.build.jade))
        .pipe(reload({stream: true}));
});


// Build Stylesheets

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src/style/'],
            outputStyle: 'expanded',             // 'compact', 'nested', 'expanded', 'compressed'
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer({browsers:['>1%']}))
        //.pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});


// Create Spites

gulp.task('sprite', function () {
    var spriteData = gulp.src('src/sprites/icon/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../img/sprites/sprite.png',
        cssName: '_sprite.scss',
        algorithm: 'alt-diagonal',
        paddingg: 5
    }));
    spriteData.img.pipe(gulp.dest('./dist/img/sprites/'));
    spriteData.css.pipe(gulp.dest('./src/style/config/'));
});


// Image Optimisation

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});



// Fonts build

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});


// JSON build

gulp.task('json:build', function() {
    gulp.src(path.src.json)
        .pipe(gulp.dest(path.build.json))
});

// PHP build

gulp.task('php:build', function() {
    gulp.src(path.src.php)
        .pipe(gulp.dest(path.build.php))
});



// JS build

gulp.task('js:build', function() {
    gulp.src(path.src.js)
        .pipe(rigger())
        //.pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});


gulp.task('build', [
    'jade:build',
    'style:build',
    'fonts:build',
    'image:build',
    'js:build',
    'php:build',
    'json:build'
]);


// Clear App folder

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});



gulp.task('watch', function(){
    watch([path.watch.jade], function(event, cb) {
        gulp.start('jade:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('default', ['build', 'webserver', 'watch']);