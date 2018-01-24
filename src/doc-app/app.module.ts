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

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ExampleModule,
    GtModule
  ],
  declarations: [
    AppComponent,
    ExampleViewComponent,
    ExampleHostDirective,
    DocViewComponent
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
