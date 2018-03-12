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
  GtCheckboxModule,
  GtTableModule,
  GtFileUploadModule
} from 'get-ui-ng/base';

@NgModule({
  exports: [
    GtTabsModule,
    GtMenuModule,
    GtDatepickerModule,
    GtStepperModule,
    GtDatepickerModule,
    GtModalModule,
    GtButtonModule,
    GtCheckboxModule,
    GtPaginationModule,
    GtSliderModule,
    GtButtonModule,
    GtTableModule,
    GtFileUploadModule
  ]
})

export class GtModule { }
