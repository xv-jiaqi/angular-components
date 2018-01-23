import {BuildPackage, buildConfig} from 'build-tools';
import {join} from 'path';

export const componentPackage = new BuildPackage(buildConfig.packageName);
export const examplesPackage = new BuildPackage(`${buildConfig.packageName}-examples`, [componentPackage]);

// The material package re-exports its secondary entry-points at the root so that all of the
// components can still be imported through `@angular/material`.
componentPackage.exportsSecondaryEntryPointsAtRoot = true;

// To avoid refactoring of the project the material package will map to the source path `lib/`.
componentPackage.sourceDir = join(buildConfig.packagesDir, 'lib');
