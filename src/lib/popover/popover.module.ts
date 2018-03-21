import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GtPopoverContent } from './popover-content.directive';
import { GtPopoverRoot } from './popover-root.directive';
import { GtPopoverWrapComponent } from './popover-wrap.component';
import { GtPortalModule } from 'get-ui-ng/utils/portal';

@NgModule({
  imports: [
    CommonModule,
    GtPortalModule
  ],
  exports: [
    GtPopoverContent,
    GtPopoverRoot,
    GtPopoverWrapComponent
  ],
  declarations: [
    GtPopoverContent,
    GtPopoverRoot,
    GtPopoverWrapComponent
  ]
})
export class GtPopoverModule { }
