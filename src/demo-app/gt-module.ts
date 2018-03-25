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
  GtSelectModule,
  GtTableModule,
  GtFileUploadModule,
  GtPopoverModule
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
    GtSelectModule,
    GtPaginationModule,
    GtSliderModule,
    GtButtonModule,
    GtTableModule,
    GtFileUploadModule,
    GtPopoverModule
  ]
})

export class GtModule { }
