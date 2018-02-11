import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TabsDemoComponent } from './tabs/tabs-demo.component';
import { BarDemoComponent } from './bar/bar-demo.component';
import { DatepickerComponent } from './datepicker/datepicker.component';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsDemoComponent
  },
  {
    path: 'bar',
    component: BarDemoComponent
  },
  {
    path: 'datepicker',
    component: DatepickerComponent
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
