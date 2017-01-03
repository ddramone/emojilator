var gulp = require('gulp');
var sprity = require('sprity');

// generate sprite.png and _sprite.scss 
gulp.task('sprites', function () {
    return sprity.src({
        src: './emojis/new/**/*.{png,jpg}',
        orientation: 'binary-tree',
        margin: 0
    })
        .pipe(gulp.dest('./public/img/'))
});
