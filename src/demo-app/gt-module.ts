import { NgModule } from '@angular/core';
import { GtTabsModule, GtMenuModule, GtModalModule, GtStepperModule, GtDatepickerModule } from 'get-ui-ng/base';

@NgModule({
  exports: [
    GtTabsModule,
    GtMenuModule,
	GtDatepickerModule,
    GtStepperModule,
    GtDatepickerModule,
    GtModalModule
  ]
})

export class GtModule { }
