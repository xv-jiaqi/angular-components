import {
  ApplicationRef,
  ComponentFactoryResolver, ComponentRef, Directive, ElementRef, EmbeddedViewRef, EventEmitter, Inject, Injector, Input,
  NgModule,
  OnDestroy, Output,
  ViewContainerRef
} from '@angular/core';
import { GtComponentPortal, GtBasePortalOutlet, GtTemplatePortal, GtDomPortalOutlet } from './portal-base';
import { GtPortal } from 'get-ui-ng/utils/portal/portal-base';
import { DOCUMENT } from '@angular/common';

export type GtPortalOutletAttachedRef = EmbeddedViewRef<any> | ComponentRef<any>;

@Directive({
  selector: '[gtPortalOutlet]'
})
export class GtPortalOutlet<T> extends GtBasePortalOutlet implements OnDestroy {
  @Input() set gtPortalOutlet(value: GtTemplatePortal<any> | GtComponentPortal<any>) {
    this.attach(value);
  }

  @Output() attached: EventEmitter<GtPortalOutletAttachedRef> = new EventEmitter();

  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private _viewContainerRef: ViewContainerRef) {
    super();
  }

  ngOnDestroy(): void {
    super.dispose();
  }

  protected _attachTemplatePortal<T>(portal: GtTemplatePortal<T>): EmbeddedViewRef<T> {
    const viewRef = this._viewContainerRef.createEmbeddedView(portal.templateRef, portal.context);
    super.setDisposeFn(() => this._viewContainerRef.clear());
    this._attachedPortal = portal;

    this.attached.emit(viewRef);
    return viewRef;
  }

  protected _attachComponentPortal<T>(portal: GtComponentPortal<T>): ComponentRef<T> {
    const viewContainerRef = portal.viewContainerRef ? portal.viewContainerRef : this._viewContainerRef;
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
    const ref = viewContainerRef.createComponent(
      componentFactory, viewContainerRef.length,
      portal.injector || viewContainerRef.parentInjector);

    super.setDisposeFn(() => ref.destroy());

    this.attached.emit(ref);
    return ref as any as ComponentRef<T>;
  }
}

@Directive({
  selector: '[gtRootPortalOutlet]'
})
export class GtRootPortalOutlet extends GtBasePortalOutlet {
  @Input() set gtRootPortalOutlet(value: GtTemplatePortal<any> | GtComponentPortal<any>) {
    this.attach(value);
  }

  @Output() attached: EventEmitter<GtPortalOutletAttachedRef> = new EventEmitter();

  private _domPortalOutlet: GtDomPortalOutlet;

  private _element: HTMLElement;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private _document: any,
    private _appRef: ApplicationRef,
    private _injector: Injector
  ) {
    super();
  }

  private _createAndAppendElement() {
    this._element = this._document.createElement('div');
  }

  protected _attachTemplatePortal<T>(portal: GtTemplatePortal<T>): EmbeddedViewRef<T> {
    const viewRef = this._domPortalOutlet.attach(portal);
    this.attached.emit(viewRef);
    return viewRef;
  };

  protected _attachComponentPortal<T>(portal: GtComponentPortal<T>): ComponentRef<T> {
    const componentRef = this._domPortalOutlet.attach(portal);
    this.attached.emit(componentRef);
    return componentRef;
  };

  attach(portal: GtPortal<any>) {
    if (!this._element) {
      this._createAndAppendElement();
    }
    this._element.innerText = '';
    this._domPortalOutlet = new GtDomPortalOutlet(this._element, this._componentFactoryResolver, this._appRef, this._injector);
    super.attach(portal);
    this._document.body.append(this._element);

    this.setDisposeFn(() => {
      this._document.body.removeChild(this._element);
      this._domPortalOutlet.dispose();
    })
  }
}
