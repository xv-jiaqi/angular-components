import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GtTabGroupComponent } from './tab-group.component';
import { GtTabComponent } from './tab.component';
import { GtTabHeaderComponent } from './tab-header.component';
import { GtTabBodyComponent, GtTabBodyHost } from './tab-body.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GtTabGroupComponent,
    GtTabHeaderComponent,
    GtTabBodyComponent,
    GtTabComponent,
    GtTabBodyHost
  ],
  exports: [
    GtTabGroupComponent,
    GtTabHeaderComponent,
    GtTabBodyComponent,
    GtTabComponent
  ]
})

export class GtTabsModule { }
