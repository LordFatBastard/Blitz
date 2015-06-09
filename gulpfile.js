var webpack = require('webpack');
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var webpackConfig = require('./webpack.config.js');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

gulp.task('default', function(callback) {

    // Setup sourcemapping
    webpackConfig.devtool = 'source-map';

    lessBuild(false, function() {
        gutil.log("Less", ': Built');
    });

    webpackBuild(function() {
        gulp.watch([
            'js/**/*.js',
            'js/**/*.jsx',
            'js/**/*.hbs'
        ], ["wepback:build"]);
        gulp.watch([
            'less/**/*.less'
        ], ["less:build"]);
        callback();
    });

});

gulp.task('wepback:build', function(callback) {

    webpackBuild(callback);

});

gulp.task('less:build', function(callback) {

    lessBuild(false, callback);

});

function webpackBuild(callback) {
    
    webpack(webpackConfig, function(err, stats) {
        console.log(err, stats)
        gutil.log("Webpack", stats.toString({colors: true}));

        callback();

    }); 

}

function lessBuild(isProduction, callback) {
    gulp.src(['less/main.less'])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(rename("dint.css"))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/css'));
    
    callback();
            
}