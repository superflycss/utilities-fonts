require('@superflycss/task-clean');
require('@superflycss/task-build');
require('@superflycss/task-test');
require('@superflycss/task-deploy');

var PLI = require('@superflycss/pli');
var gulp = require('gulp');

gulp.task('watch', function() {
    gulp.watch(PLI.SRC_TEST_HTML, ['clean', 'build:css', 'test:css'])
});
