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
    babel = require('gulp-babel'),
    webp = require('gulp-webp');
    image = require('gulp-image');

gulp.task('serve', function() {
  return gulp.src('index.html', { read: false })
    .pipe(shell([
      'bundle exec jekyll serve --livereload'
  ]));
});

gulp.task('jekyll-build', function() {
    return gulp.src('index.html', { read: false })
      .pipe(shell([
        'bundle exec jekyll build'
    ]));
  });

const rootImgFolder = '_site/assets/images';
var imgFolders = [`${rootImgFolder}/work/`, `${rootImgFolder}/post/`];

gulp.task('compressImages', () => {
  var _compressImages = imgFolders.map((element) => {
    return gulp.src(element + '*')
      .pipe(image({
        pngquant: true,
        optipng: false,
        zopflipng: true,
        jpegRecompress: false,
        mozjpeg: true,
        guetzli: false,
        gifsicle: true,
        svgo: true,
        concurrent: 10,
        quiet: true // defaults to false
      }))
      .pipe(gulp.dest(element));
  });

  return merge(_compressImages);
});

gulp.task('convertToWebp', () => {
    var _convertToWebp = imgFolders.map((element) => {
      return gulp.src(element + '*')
      .pipe(webp({
        quality: 10,
        sns: 0
      }))
      .pipe(gulp.dest(element));
    });
  return merge(_convertToWebp);
});

gulp.task('images', gulp.series('compressImages', 'convertToWebp', function (done) {
  done();
}));

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
