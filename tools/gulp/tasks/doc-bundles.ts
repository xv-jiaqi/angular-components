import { task } from 'gulp';
import { buildConfig, sequenceTask, copyFiles, inlineResourcesForDirectory } from 'build-tools';
import { join } from 'path';
import { copySync } from 'fs-extra';
import { lstatSync, readdirSync } from "fs";

const rollupNodeResolutionPlugin = require('rollup-plugin-node-resolve');
const rollupCommonjsPlugin = require('rollup-plugin-commonjs');
const rollupAlias = require('rollup-plugin-alias');

const {outputDir, packagesDir} = buildConfig;
const rollup = require('rollup');

const libDir = join(packagesDir, 'lib');
const targetDir = join(outputDir, 'releases', 'doc-app');
const sourceDir = join(outputDir, 'packages', 'doc-app');

task('doc-bundles', sequenceTask(
  'stage-deploy:docapp',
  ':doc-inline-resources',
  [':doc-bundles', ':doc-copy-assets']
));

task(':doc-inline-resources', () => {
  return inlineResourcesForDirectory(sourceDir);
});

task(':doc-bundles', () => {
  const dirList = readdirSync(libDir).filter(f => lstatSync(join(libDir, f)).isDirectory());
  const aliasList = dirList.map(v => ({name: `ng5/${v}`, value: `./${v}/index`}));
  const alias: any = {};
  aliasList.forEach(item => alias[item.name] = item.value);

  const bundleOptions = {
    context: 'this',
    entry: join(sourceDir, 'main.js'),
    onwarn: (message: string) => {
      // TODO(jelbourn): figure out *why* rollup warns about certain symbols not being found
      // when those symbols don't appear to be in the input file in the first place.
      if (/but never used/.test(message)) {
        return false;
      }

      console.warn(message);
    },
    plugins: [
      rollupAlias({
        ...alias,
        ng5: './dist/packages/ng5/public-api'
      }),
      rollupNodeResolutionPlugin(),
      rollupCommonjsPlugin()
    ]
  };

  const writeOptions: any = {
    // Keep the moduleId empty because we don't want to force developers to a specific moduleId.
    moduleId: '',
    moduleName: 'DocApp',
    format: 'iife',
    dest: join(targetDir, 'main.js'),
    sourceMap: false
  };

  return rollup.rollup(bundleOptions).then((bundle: any) => bundle.write(writeOptions));
});

/** Array of vendors that are required to serve the doc-app. */
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
  'highlight.js'
];
/** Glob that matches all required vendors for the doc-app. */
const vendorGlob = `+(${appVendors.join('|')})/**/*.+(html|css|js|map)`;

task(':doc-copy-assets', () => {
  copyFiles(join(sourceDir, 'node_modules'), vendorGlob, join(targetDir, 'node_modules'));
  copyFiles(join(sourceDir, 'docs'), '**/*.html', join(targetDir, 'docs'));
  copySync(join(sourceDir, 'index.html'), join(targetDir, 'index.html'));
  copySync(join(sourceDir, 'system-config.js'), join(targetDir, 'system-config.js'));
});
