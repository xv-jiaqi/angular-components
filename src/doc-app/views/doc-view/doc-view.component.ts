import {
  Component, ComponentFactoryResolver, ElementRef, EmbeddedViewRef, Injector, Input,
  ViewContainerRef
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExampleViewComponent } from '../example-view/example-view.component';

@Component({
  moduleId: module.id,
  selector: 'gt-doc-view',
  templateUrl: './doc-view.component.html'
})

export class DocViewComponent {
  private _exampleUrl: string;

  @Input()
  set exampleUrl(value: string) {
    this._exampleUrl = value;
    this._fetchDocument(value);
  }
  get exampleUrl(): string {
    return this._exampleUrl;
  }

  constructor(
    private _http: HttpClient,
    private _elementRef: ElementRef,
    private _injector: Injector,
    private _viewContainerRef: ViewContainerRef,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {}

  private _fetchDocument(url: string) {
    this._http.get(url, {
      responseType: 'text'
    }).subscribe((response) => {
      this._elementRef.nativeElement.innerHTML = response;
      this._renderComponent('gt-example-view');
      this._renderComponent('gt-docs-example');
    }, () => {});
  }

  private _renderComponent(selector: string): void {
    const exampleElements =
      this._elementRef.nativeElement.querySelectorAll(`[${selector}]`);

    Array.prototype.slice.call(exampleElements).forEach((element: Element) => {
      const example = element.getAttribute(selector);

      /** parse ModalDialogComponent **/
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(ExampleViewComponent);

      /** create componentRef by default injector **/
      const componentRef = this._viewContainerRef.createComponent(componentFactory);

      /** assign instance data **/
      (<ExampleViewComponent>componentRef.instance).example = example || '';

      element.innerHTML = '';
      element.appendChild((componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement);
    });
  }
}
