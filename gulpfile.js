var gulp = require('gulp'),
    shell = require('gulp-shell'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    jpegtran = require('imagemin-jpegtran'),
    gifsicle = require('imagemin-gifsicle'),
    optipng = require('imagemin-optipng'),
    gm = require('gulp-gm'),
    purgecss = require('gulp-purgecss'),
    merge = require('merge-stream'),
    babel = require('gulp-babel');

gulp.task('serve', function() {
  return gulp.src('index.html', { read: false })
    .pipe(shell([
      'bundle exec jekyll serve'
  ]));
});

gulp.task('jekyll-build', function() {
    return gulp.src('index.html', { read: false })
      .pipe(shell([
        'bundle exec jekyll build'
    ]));
  });

  // needs both ImageMagick and GraphicsMagick installed!!
  var imgFolders = ['_site/assets/images/work/sonar/', '_site/assets/images/work/ypt/', '_site/assets/images/work/refoodgees/'];

  gulp.task('images', function () {

    var tasks = imgFolders.map(function(element){
      return gulp.src(element + '*')
      .pipe(gm(function (gmfile) {
        return gmfile.resize(800);
      },{
        imageMagick: true
      }))
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant({
              quality: [0, 0],
              speed: 1,
              dithering: 1
          
          }), 
          jpegtran(), optipng(), gifsicle()]
      }))
      .pipe(gulp.dest(element));
    });

    return merge(tasks);

});

gulp.task('purgecss', () => {
  return gulp
    .src('_site/assets/css/*.css')
    .pipe(
      purgecss({
        content: ['_site/**/*.html', '_site/**/*.js' ]
      })
    )
    .pipe(gulp.dest('_site/assets/css') )
});

gulp.task("babel", function () {
  return gulp.src("_site/assets/js/app.js")
  .pipe(babel({
    presets: ['@babel/preset-env']
  }))
    .pipe(gulp.dest("_site/assets/js/"));
});


gulp.task('build', gulp.series('jekyll-build', 'images', 'purgecss', 'babel', function (done) {
    done();
}));
