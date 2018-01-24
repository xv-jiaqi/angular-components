import {
  Component, ComponentFactoryResolver, ElementRef, EmbeddedViewRef, Injector, OnInit,
  ViewContainerRef
} from '@angular/core';
import { ExampleViewComponent } from './views/example-view/example-view.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(
    private _injector: Injector,
    private _elementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this._elementRef.nativeElement.innerHTML = '<div gt-docs-example="tabs-overview-component"></ng5-example-view>';

    const exampleElements =
      this._elementRef.nativeElement.querySelectorAll('[gt-docs-example]');

    console.log(exampleElements);

    Array.prototype.slice.call(exampleElements).forEach((element: Element) => {
      const example = element.getAttribute('ng-docs-example');

      /** parse ModalDialogComponent **/
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(ExampleViewComponent);

      /** create componentRef by default injector **/
      const componentRef = this._viewContainerRef.createComponent(componentFactory);

      /** assign instance data **/
      (<ExampleViewComponent>componentRef.instance).example = example || '';
    });
  }
}
