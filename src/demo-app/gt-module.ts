import {NgModule} from '@angular/core';
import {
  GtTabsModule,
  GtMenuModule,
  GtModalModule,
  GtStepperModule,
  GtDatepickerModule,
  GtButtonModule,
  GtPaginationModule
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
    GtPaginationModule
  ]
})

export class GtModule { }
