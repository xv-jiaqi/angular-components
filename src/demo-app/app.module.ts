import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRouterModule } from './app-router.module';
import { TabsDemoComponent } from './tabs/tabs-demo.component';
import { GtModule } from './gt-module';
import { ModalDemoComponent } from './modal/modal-demo.component';

@NgModule({
  imports: [
    BrowserModule,
    GtModule,
    AppRouterModule
  ],
  declarations: [
    AppComponent,
    TabsDemoComponent,
    ModalDemoComponent
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
