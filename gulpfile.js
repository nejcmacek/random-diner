var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var stripComments = require('gulp-strip-comments');
var removeEmptyLines = require('gulp-remove-empty-lines');
var clipEmptyFiles = require('gulp-clip-empty-files');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var license = '' +
  '// (C) Copyright 2016 Nejc Maček <macek.nejc@gmail.com>\n' +
  '//\n' +
  '// Licensed under the Apache License, Version 2.0 (the "License");\n' +
  '// you may not use this file except in compliance with the License.\n' +
  '// You may obtain a copy of the License at\n' +
  '//\n' +
  '//     http://www.apache.org/licenses/LICENSE-2.0\n' +
  '//\n' +
  '// Unless required by applicable law or agreed to in writing, software\n' +
  '// distributed under the License is distributed on an "AS IS" BASIS,\n' +
  '// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n' +
  '// See the License for the specific language governing permissions and\n' +
  '// limitations under the License.\n\n';

var paths = {
  sass: ['./scss/**/*.scss'],
  js: [
	  './www/js/modules.js',
	  './www/js/*.js',
	  './www/js/**/*.js',
	  './www/states/**/*.js',
	  './www/directives/**/*.js'
	  ],
  build: './www/build'
};

gulp.task('default', ['sass', 'build']);

gulp.task('sass', function(done) {
  gulp.src('./scss/style.scss')
    .pipe(sass())
    .on('error', sass.logError)
	.pipe(clipEmptyFiles())
	.pipe(removeEmptyLines())
	.pipe(stripComments())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['build']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('build', function() {
  gulp.src(paths.js)
    .pipe(clipEmptyFiles())
    .pipe(stripComments())
    .pipe(removeEmptyLines())
    .pipe(concat('random-diner.bundle.js'))
    .pipe(insert.prepend(license))
    .pipe(gulp.dest(paths.build));
});