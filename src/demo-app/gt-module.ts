import {NgModule} from '@angular/core';
import {
  GtTabsModule,
  GtMenuModule,
  GtModalModule,
  GtStepperModule,
  GtDatepickerModule,
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
    GtPaginationModule,
    GtSliderModule,
    GtButtonModule,
    GtTableModule
  ]
})

export class GtModule { }
