import { NgModule } from '@angular/core';
import {
  GtTabsModule,
  GtMenuModule,
  GtModalModule,
  GtStepperModule,
  GtPaginationModule,
  GtSliderModule,
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
    GtFileUploadModule
  ]
})

export class GtModule { }
