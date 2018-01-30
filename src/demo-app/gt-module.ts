import { NgModule } from '@angular/core';
import { GtTabsModule, GtMenuModule, GtPortalModule } from 'get-ui-ng';

@NgModule({
  exports: [
    GtTabsModule,
    GtMenuModule,
    GtPortalModule
  ]
})

export class GtModule { }
