import { NgModule } from '@angular/core';
import {
  GtTabsModule,
  GtMenuModule,
  GtModalModule,
  GtStepperModule,
  GtPaginationModule,
  GtSliderModule,
  GtButtonModule,
  GtCheckboxModule,
  GtRadioModule,
  GtPopoverModule,
  GtFileUploadModule,
  GtTableModule
} from 'get-ui-ng/base';

@NgModule({
  exports: [
    GtTabsModule,
    GtMenuModule,
    GtModalModule,
    GtStepperModule,
    GtPaginationModule,
    GtSliderModule,
    GtButtonModule,
    GtCheckboxModule,
    GtRadioModule,
    GtFileUploadModule,
    GtPopoverModule,
    GtTableModule
  ]
})

export class GtModule { }
