var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var reactify = require('reactify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

var dependencies = [
	'react',
  	'react-dom'
];


gulp.task('live-server', function(){
  var server = new LiveServer('server/index.js');
  server.start();
});

gulp.task('bundle', function(){
  return browserify({
    entries: 'app/main.js',
    extensions: ['.js', '.jsx'],
    debug: true
  })
  .transform("babelify", {presets: ["es2015", "react"]})  
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./tmp'));
});

gulp.task('serve', ['bundle', 'live-server'], function(){
  browserSync.init(null, {
    proxy: "http://localhost:7777",
    port: 9001
  });
});
