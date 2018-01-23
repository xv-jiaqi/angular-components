import {src, dest} from 'gulp';
import {join} from 'path';

// These imports lack of type definitions.
const gulpLess = require('gulp-less');
const gulpIf = require('gulp-if');
const gulpCleanCss = require('gulp-clean-css');

/** Create a gulp task that builds SCSS files. */
export function buildLessTask(outputDir: string, sourceDir: string, minifyOutput = false) {
  return () => {
    return src(join(sourceDir, '**/*.less'))
      .pipe(gulpLess().on('error', console.log))
      .pipe(gulpIf(minifyOutput, gulpCleanCss()))
      .pipe(dest(outputDir));
  };
}
