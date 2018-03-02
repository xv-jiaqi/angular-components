import {BuildPackage, buildConfig} from 'build-tools';
import {join} from 'path';

export const utilPackage = new BuildPackage('utils');
export const componentPackage = new BuildPackage('base', [utilPackage]);
export const examplesPackage = new BuildPackage('examples', [componentPackage]);

// The material package re-exports its secondary entry-points at the root so that all of the
// components can still be imported through `get-ui-ng/material`.
componentPackage.exportsSecondaryEntryPointsAtRoot = true;

// To avoid refactoring of the project the material package will map to the source path `lib/`.
utilPackage.sourceDir = join(buildConfig.packagesDir, 'utils');

// To avoid refactoring of the project the material package will map to the source path `utils/`.
componentPackage.sourceDir = join(buildConfig.packagesDir, 'lib');
