import {NgModule} from '@angular/core';
import {
  GtTabsModule,
  GtMenuModule,
  GtModalModule,
  GtStepperModule,
  GtDatepickerModule,
  GtSelectModule,
  GtPaginationModule,
  GtSliderModule,
  GtButtonModule,
  GtTableModule
} from 'get-ui-ng/base';

@NgModule({
  exports: [
    GtTabsModule,
    GtMenuModule,
    GtDatepickerModule,
    GtStepperModule,
    GtDatepickerModule,
    GtModalModule,
    GtSelectModule,
    GtPaginationModule,
    GtSliderModule,
    GtButtonModule,
    GtTableModule
  ]
})

export class GtModule { }
