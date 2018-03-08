import { NgModule } from '@angular/core';
import {
  GtTabsModule,
  GtMenuModule,
  GtModalModule,
  GtStepperModule,
  GtPaginationModule,
  GtSliderModule
} from 'get-ui-ng/base';

@NgModule({
  exports: [
    GtTabsModule,
    GtMenuModule,
    GtModalModule,
    GtStepperModule,
    GtPaginationModule,
    GtSliderModule
  ]
})

export class GtModule { }
