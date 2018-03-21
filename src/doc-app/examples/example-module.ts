
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

import { FileuploadFileOverviewExampleComponent } from './fileupload-file-overview/fileupload-file-overview-example.component';
import { FileuploadImageOverviewExampleComponent } from './fileupload-image-overview/fileupload-image-overview-example.component';
import { MenuOverviewExampleComponent } from './menu-overview/menu-overview-example.component';
import { ModalConfirmOverviewExampleComponent } from './modal-confirm-overview/modal-confirm-overview-example.component';
import { ModalInfoOverviewExampleComponent } from './modal-info-overview/modal-info-overview-example.component';
import { ModalToastOverviewExampleComponent } from './modal-toast-overview/modal-toast-overview-example.component';
import { ModalWrapOverviewExampleComponent } from './modal-wrap-overview/modal-wrap-overview-example.component';
import { PaginationOverviewComponent } from './pagination-overview/pagination-overview-example.component';
import { PopoverOverviewExampleComponent } from './popover-overview/popover-overview-example.component';
import { SliderOverviewExampleComponent } from './slider-overview/slider-overview-example.component';
import { StepperOverviewExampleComponent } from './stepper-overview/stepper-overview-example.component';
import { TabsOverviewExampleComponent } from './tabs-overview/tabs-overview-example.component';

export const EXAMPLE_COMPONENTS: {[key: string]: LiveExample} = {
  'fileupload-file-overview-component': {
    title: 'FileUpload-File',
    component: FileuploadFileOverviewExampleComponent,
    additionalFiles: null,
    selectorName: null
  },
  'fileupload-image-overview-component': {
    title: 'FileUpload-Image',
    component: FileuploadImageOverviewExampleComponent,
    additionalFiles: null,
    selectorName: null
  },
  'menu-overview-component': {
    title: 'Menu',
    component: MenuOverviewExampleComponent,
    additionalFiles: null,
    selectorName: null
  },
  'modal-confirm-overview-component': {
    title: 'Modal-Confirm',
    component: ModalConfirmOverviewExampleComponent,
    additionalFiles: null,
    selectorName: null
  },
  'modal-info-overview-component': {
    title: 'Modal-Info',
    component: ModalInfoOverviewExampleComponent,
    additionalFiles: null,
    selectorName: null
  },
  'modal-toast-overview-component': {
    title: 'Modal-Toast',
    component: ModalToastOverviewExampleComponent,
    additionalFiles: null,
    selectorName: null
  },
  'modal-wrap-overview-component': {
    title: 'Modal-Wrap',
    component: ModalWrapOverviewExampleComponent,
    additionalFiles: null,
    selectorName: null
  },
  'pagination-overview-component': {
    title: 'Pagination',
    component: PaginationOverviewComponent,
    additionalFiles: null,
    selectorName: null
  },
  'popover-overview-component': {
    title: 'Popover',
    component: PopoverOverviewExampleComponent,
    additionalFiles: null,
    selectorName: null
  },
  'slider-overview-component': {
    title: 'Slider',
    component: SliderOverviewExampleComponent,
    additionalFiles: null,
    selectorName: null
  },
  'stepper-overview-component': {
    title: 'Stepper',
    component: StepperOverviewExampleComponent,
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
  FileuploadFileOverviewExampleComponent,
  FileuploadImageOverviewExampleComponent,
  MenuOverviewExampleComponent,
  ModalConfirmOverviewExampleComponent,
  ModalInfoOverviewExampleComponent,
  ModalToastOverviewExampleComponent,
  ModalWrapOverviewExampleComponent,
  PaginationOverviewComponent,
  PopoverOverviewExampleComponent,
  SliderOverviewExampleComponent,
  StepperOverviewExampleComponent,
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
