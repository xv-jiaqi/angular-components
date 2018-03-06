import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRouterModule } from './app-router.module';
import { TabsDemoComponent } from './tabs/tabs-demo.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { GtModule } from './gt-module';
import { ModalDemoComponent } from './modal/modal-demo.component';
import { StepperDemoComponent } from './stepper/stepper-demo.component';
import { SelectDemoComponent } from './select/select-demo.component';

@NgModule({
  imports: [
    BrowserModule,
    GtModule,
    AppRouterModule,
  ],
  declarations: [
    AppComponent,
    TabsDemoComponent,
    StepperDemoComponent,
    DatepickerComponent,
    ModalDemoComponent,
    SelectDemoComponent
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
