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
  GtFileUploadModule
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
    GtFileUploadModule
  ]
})

export class GtModule { }
