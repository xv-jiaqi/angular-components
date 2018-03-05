import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TabsDemoComponent } from './tabs/tabs-demo.component';
import { ModalDemoComponent } from './modal/modal-demo.component';
import { StepperDemoComponent } from './stepper/stepper-demo.component';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsDemoComponent
  }, {
    path: 'modal',
    component: ModalDemoComponent
  }, {
    path: 'stepper',
    component: StepperDemoComponent
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
