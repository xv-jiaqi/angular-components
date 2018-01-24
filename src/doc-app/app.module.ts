import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ExampleModule } from './examples/example-module';
import { ExampleViewComponent } from './views/example-view/example-view.component';
import { ExampleHostDirective } from './views/example-view/example-host.directive';
import { DocViewComponent } from './views/doc-view/doc-view.component';
import { GtModule } from './gt-module';
import { AppRouterModule } from './app-router.module';
import { ComponentViewComponent } from './views/component-view/component-view.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRouterModule,
    ExampleModule,
    GtModule
  ],
  declarations: [
    AppComponent,
    ExampleViewComponent,
    ExampleHostDirective,
    DocViewComponent,
    ComponentViewComponent
  ],
  entryComponents: [
    AppComponent,
    ExampleViewComponent
  ],
})
export class DemoAppModule {
  constructor(private _appRef: ApplicationRef) { }

  ngDoBootstrap() {
    this._appRef.bootstrap(AppComponent);
  }
}
