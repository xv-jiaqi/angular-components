import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TabsDemoComponent } from './tabs/tabs-demo.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ModalDemoComponent } from './modal/modal-demo.component';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsDemoComponent
  },
  {
    path: 'datepicker',
    component: DatepickerComponent
  }, {
    path: 'modal',
    component: ModalDemoComponent
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

export class AppRouterModule { }
