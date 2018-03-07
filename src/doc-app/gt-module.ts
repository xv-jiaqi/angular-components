import { NgModule } from '@angular/core';
import { GtTabsModule, GtMenuModule, GtModalModule, GtStepperModule, GtPaginationModule } from 'get-ui-ng/base';

@NgModule({
  exports: [
    GtTabsModule,
    GtMenuModule,
    GtModalModule,
    GtStepperModule,
    GtPaginationModule
  ]
})

export class GtModule { }
