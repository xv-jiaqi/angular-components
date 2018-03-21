import { RouterModule, Routes } from '@angular/router';
import { ComponentViewComponent } from './views/component-view/component-view.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'tabs',
    component: ComponentViewComponent
  }, {
    path: 'menu',
    component: ComponentViewComponent
  }, {
    path: 'modal',
    component: ComponentViewComponent
  }, {
    path: 'stepper',
    component: ComponentViewComponent
  }, {
    path: 'pagination',
    component: ComponentViewComponent
  }, {
    path: 'slider',
    component: ComponentViewComponent
  }, {
    path: 'button',
    component: ComponentViewComponent
  }, {
    path: 'radio',
    component: ComponentViewComponent
  }, {
    path: 'checkbox',
    component: ComponentViewComponent
  }, {
    path: 'fileupload',
    component: ComponentViewComponent
  }, {
    path: 'popover',
    component: ComponentViewComponent
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
