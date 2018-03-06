import {NgModule} from '@angular/core';
import {
  GtTabsModule, GtMenuModule, GtModalModule,
  GtStepperModule, GtDatepickerModule, GtSelectModule
} from 'get-ui-ng/base';

@NgModule({
  exports: [
    GtTabsModule,
    GtMenuModule,
    GtDatepickerModule,
    GtStepperModule,
    GtDatepickerModule,
    GtModalModule,
    GtSelectModule
  ]
})

export class GtModule { }
