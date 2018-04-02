import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TabsDemoComponent} from './tabs/tabs-demo.component';
import {DatepickerComponent} from './datepicker/datepicker.component';
import {ModalDemoComponent} from './modal/modal-demo.component';
import {StepperDemoComponent} from './stepper/stepper-demo.component';
import {PaginationDemoComponent} from './pagination/pagination-demo.component';
import {SliderDemoComponent} from './slider/slider-demo.component';
import { ButtonDemoComponent } from './button/button-demo.component';
import { CheckboxDemoComponent } from './checkbox/checkbox-demo.component';
import { RadioDemoComponent } from './radio/radio-demo.component';
import { SelectDemoComponent } from './select/select-demo.component';
import {TableDemoComponent} from './table/table-demo.component';
import { FileUploadDemoComponent } from './fileupload/fileupload-demo.component';
import { PopoverDemoComponent } from './popover/popover-demo.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsDemoComponent
  }, {
    path: 'datepicker',
    component: DatepickerComponent
  }, {
    path: 'modal',
    component: ModalDemoComponent
  }, {
    path: 'stepper',
    component: StepperDemoComponent
  }, {
    path: 'button',
    component: ButtonDemoComponent
  }, {
    path: 'checkbox',
    component: CheckboxDemoComponent
  }, {
    path: 'radio',
    component: RadioDemoComponent
  }, {
    path: 'select',
    component: SelectDemoComponent
  }, {
    path: 'pagination',
    component: PaginationDemoComponent
  }, {
    path: 'slider',
    component: SliderDemoComponent
  }, {
    path: 'table',
    component: TableDemoComponent
  }, {
    path: 'fileupload',
    component: FileUploadDemoComponent
  }, {
    path: 'popover',
    component: PopoverDemoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRouterModule {
}
