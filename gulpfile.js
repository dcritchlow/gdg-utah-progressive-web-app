var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    node;

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function() {
  if (node) node.kill()
  node = spawn('node', ['index.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('watch', function(){
    gulp.watch(
        [
            './index.js', 
            './index.js', 
            './js/**/*.js', 
            './css/**/*.css'
        ], ['server']
    );
});

/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('old', ['server'], function() {
  gulp.run('server')

  gulp.watch(['./index.js', './index.js', './js/**/*.js', './css/**/*.css'], function() {
    gulp.run('server')
  });
});

gulp.task('default', ['server', 'watch']);

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
});