import { RouterModule, Routes } from '@angular/router';
import { ComponentViewComponent } from './views/component-view/component-view.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '**',
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
