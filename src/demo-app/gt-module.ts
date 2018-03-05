import { NgModule } from '@angular/core';
import { GtTabsModule, GtMenuModule, GtModalModule, GtStepperModule } from 'get-ui-ng/base';

@NgModule({
  exports: [
    GtTabsModule,
    GtMenuModule,
    GtModalModule,
    GtStepperModule
  ]
})

export class GtModule { }
