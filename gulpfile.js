const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const minify_js = require('gulp-js-minify');
const gulpif = require('gulp-if');
 
const env = process.env.NODE_ENV;
 
const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');
 
sass.compiler = require('node-sass');
 
task('clean', () => {
 return src(`${DIST_PATH}/**/*`, { read: false })
   .pipe(rm())
})
 
task('copy:html', () => {
 return src(`${SRC_PATH}/*.html`)
   .pipe(dest(DIST_PATH))
   .pipe(reload({ stream: true }));
});

const SRC_IMAGES = [`${SRC_PATH}/images/*.png`, `${SRC_PATH}/images/bg/*`, `${SRC_PATH}/images/team/*`, `${SRC_PATH}/images/Video_icon/*`, `${SRC_PATH}/images/icons/*`];

task('copy:image', function() {
  return src(SRC_IMAGES)
    .pipe(dest(`${DIST_PATH}/images`));
});

task('copy:fonts', function() {
  return src(`${SRC_PATH}/fonts/*`)
    .pipe(dest(`${DIST_PATH}/fonts`));
});

task('copy:libs', function() {
  return src(`${SRC_PATH}/libs/**/*`)
    .pipe(dest(`${DIST_PATH}/libs`));
});

task('copy:spriteSvg', function() {
  return src(`${SRC_PATH}/sprite.svg`)
    .pipe(dest(`${DIST_PATH}`));
});

task('copy:scripts', function() {
  return src(`${SRC_PATH}/scripts/api/*.js`)
    .pipe(dest(`${DIST_PATH}/scripts/`));
});
 
task('styles', () => {
 return src([...STYLE_LIBS, 'src/styles/main.scss'])
   .pipe(gulpif(env === 'dev', sourcemaps.init()))
   .pipe(concat('main.min.scss'))
   .pipe(sassGlob())
   .pipe(sass().on('error', sass.logError))
   .pipe(gulpif(env === 'prod', autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })))
   .pipe(gulpif(env === 'prod', gcmq()))
   .pipe(gulpif(env === 'prod', cleanCSS()))
   .pipe(gulpif(env === 'dev', sourcemaps.write()))
   .pipe(dest(DIST_PATH))
   .pipe(reload({ stream: true }));
});
 
task('scripts', () => {
 return src(['src/scripts/*.js'])
   .pipe(gulpif(env === 'dev', sourcemaps.init()))
   .pipe(concat('main.min.js', {newLine: ';'}))
   .pipe(gulpif(env === 'prod', babel({
       presets: ['@babel/env']
     })))
   .pipe(gulpif(env === 'prod', minify_js()))
   .pipe(gulpif(env === 'dev', sourcemaps.write()))
   .pipe(dest(`${DIST_PATH}/scripts`))
   .pipe(reload({ stream: true }));
});
 
task('server', () => {
 browserSync.init({
     server: {
         baseDir: "./dist"
     },
     open: false
 });
});
 
task('watch', () => {
 watch('./src/styles/**/*.scss', series('styles'));
 watch('./src/SCSS/**/*.scss', series('styles'));
 watch('./src/*.html', series('copy:html'));
 watch('./src/scripts/**/*.js', series('scripts'));
});
 
task('default',
 series(
   'clean',
   parallel('copy:html', 'copy:image', 'copy:libs', 'copy:spriteSvg', 'copy:fonts', 'styles', 'scripts', 'copy:scripts'),
   parallel('watch', 'server')
 )
);
 
task('build',
 series(
   'clean',
   parallel('copy:html', 'copy:image', 'copy:libs', 'copy:spriteSvg', 'copy:fonts', 'styles', 'scripts', 'copy:scripts'))
);
