
/* tslint:disable */
/** DO NOT MANUALLY EDIT THIS FILE, IT IS GENERATED VIA GULP 'build-examples-module' */
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GtModule } from '../gt-module';

export interface LiveExample {
  title: string;
  component: any;
  additionalFiles?: string[] | null;
  selectorName?: string | null;
}

import { MenuOverviewExampleComponent } from './menu-overview/menu-overview-example.component';
import { TabsOverviewExampleComponent } from './tabs-overview/tabs-overview-example.component';

export const EXAMPLE_COMPONENTS: {[key: string]: LiveExample} = {
  'menu-overview-component': {
    title: 'Menu',
    component: MenuOverviewExampleComponent,
    additionalFiles: null,
    selectorName: null
  },
  'tabs-overview-component': {
    title: 'Tabs',
    component: TabsOverviewExampleComponent,
    additionalFiles: null,
    selectorName: null
  },
};

export const EXAMPLE_LIST = [
  MenuOverviewExampleComponent,
  TabsOverviewExampleComponent,
];

@NgModule({
  declarations: EXAMPLE_LIST,
  entryComponents: EXAMPLE_LIST,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    GtModule
  ],
  exports: EXAMPLE_LIST,
})
export class ExampleModule { }
