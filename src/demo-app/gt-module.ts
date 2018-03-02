import { NgModule } from '@angular/core';
import { GtTabsModule, GtMenuModule, GtBarModule, GtDatepickerModule, GtModalModule } from 'get-ui-ng';

@NgModule({
  exports: [
    GtTabsModule,
    GtMenuModule,
    GtBarModule,
    GtDatepickerModule,
    GtMenuModule,
    GtModalModule
  ]
})

export class GtModule { }
