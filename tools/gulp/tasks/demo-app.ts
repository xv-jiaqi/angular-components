import {task} from 'gulp';
import {tsBuildTask, copyTask, serverTask} from '../util/task_helpers';
import {join} from 'path';
import {
  buildConfig, copyFiles, buildLessTask, sequenceTask, watchFiles, remapSourcemap
} from 'build-tools';
import {
  utilPackage,
  componentPackage
} from '../packages';
import { sync as glob } from 'glob';

const {outputDir, packagesDir, projectDir} = buildConfig;

/** Path to the directory where all bundles live. */
const bundlesDir = join(outputDir, 'bundles');

const appDir = join(packagesDir, 'demo-app');
const outDir = join(outputDir, 'packages', 'demo-app');

/** Array of vendors that are required to serve the demo-app. */
const appVendors = [
  '@angular',
  'systemjs',
  'zone.js',
  'rxjs',
  'hammerjs',
  'core-js',
  'web-animations-js',
  'moment',
  'tslib',
  'jnat-get-ui-core'
];

/** Glob that matches all required vendors for the demo-app. */
const vendorGlob = `+(${appVendors.join('|')})/**/*.+(html|css|js|map)`;

/** Glob that matches all assets that need to be copied to the output. */
const assetsGlob = join(appDir, `**/*.+(html|css|svg|png|ico)`);

task(':watch:devapp', () => {
  watchFiles(join(appDir, '**/*.ts'), [':build:devapp:ts']);
  watchFiles(join(appDir, '**/*.less'), [':build:devapp:less']);
  watchFiles(join(appDir, '**/*.html'), [':build:devapp:assets']);

  // Custom watchers for all packages that are used inside of the demo-app. This is necessary
  // because we only want to build the changed package (using the build-no-bundles task).
  watchFiles(join(utilPackage.sourceDir, '**/!(*.less)'), ['utils:build-no-bundles']);
  watchFiles(join(componentPackage.sourceDir, '**/!(*.less)'), ['base:build-no-bundles']);
  watchFiles(join(componentPackage.sourceDir, '**/*.less'), [':build:devapp:base-with-styles']);
});

/** Path to the demo-app tsconfig file. */
const tsconfigPath = join(appDir, 'tsconfig-build.json');

task(':build:devapp:ts', sequenceTask(':build:devapp:ts:compile', ':build:devapp:ts:sourcemap'));

task(':build:devapp:ts:compile', tsBuildTask(tsconfigPath));
task(':build:devapp:ts:sourcemap', () => {
  glob('**/*.+(js)', {cwd: outDir}).forEach(filePath => {
    if (filePath.indexOf('node_modules') === -1) {
      return remapSourcemap(join(outDir, filePath));
    }
  });
});

task(':build:devapp:less', buildLessTask(outDir, appDir));
task(':build:devapp:assets', copyTask(assetsGlob, outDir));

task(':serve:devapp', serverTask(outDir, true, 'demo'));

// The themes for the demo-app are built by using the SCSS mixins from Material.
// Therefore when SCSS files have been changed, the custom theme needs to be rebuilt.
task(':build:devapp:ng5-with-styles', sequenceTask(
  'base:build-no-bundles', ':build:devapp:less'
));

task('build:devapp', sequenceTask(
  'utils:build-no-bundles',
  'base:build-no-bundles',
  [':build:devapp:assets', ':build:devapp:less', ':build:devapp:ts']
));

task('serve:devapp', ['build:devapp'], sequenceTask([':serve:devapp', ':watch:devapp']));

/** Task that copies all vendors into the demo-app package. Allows hosting the app on firebase. */
task('stage-deploy:devapp', ['build:devapp'], () => {
  copyFiles(join(projectDir, 'node_modules'), vendorGlob, join(outDir, 'node_modules'));
  copyFiles(bundlesDir, '*.+(js|map)', join(outDir, 'dist/bundles'));
  copyFiles(componentPackage.outputDir, '**/*.+(js|map)', join(outDir, `dist/packages/${buildConfig.packageName}`));
  copyFiles(componentPackage.outputDir, '**/prebuilt/*.+(css|map)',
      join(outDir, `dist/packages/${buildConfig.packageName}`));
});

/**
 * Task that deploys the demo-app to Firebase. Firebase project will be the one that is
 * set for project directory using the Firebase CLI.
 */
task('deploy:devapp', ['stage-deploy:devapp']);
