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
  GtRadioModule,
  GtTableModule,
  GtFileUploadModule
} from 'get-ui-ng/base';

@NgModule({
  exports: [
    GtTabsModule,
    GtMenuModule,
    GtStepperModule,
    GtDatepickerModule,
    GtModalModule,
    GtButtonModule,
    GtCheckboxModule,
    GtRadioModule,
    GtPaginationModule,
    GtSliderModule,
    GtButtonModule,
    GtTableModule,
    GtFileUploadModule
  ]
})

export class GtModule { }
