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
import { PaginationDemoComponent } from './pagination/pagination-demo.component';
import { SliderDemoComponent } from './slider/slider-demo.component';
import { FormsModule } from '@angular/forms';
import { TableDemoComponent } from './table/table-demo.component';
import { ButtonDemoComponent } from './button/button-demo.component';

@NgModule({
  imports: [
    BrowserModule,
    GtModule,
    AppRouterModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    TabsDemoComponent,
    StepperDemoComponent,
    DatepickerComponent,
    ModalDemoComponent,
    ButtonDemoComponent,
    SelectDemoComponent,
    PaginationDemoComponent,
    SliderDemoComponent
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
