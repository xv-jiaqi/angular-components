import {
  ComponentFactoryResolver, ComponentRef, Directive, EmbeddedViewRef, Input, NgModule, OnDestroy,
  ViewContainerRef
} from '@angular/core';
import { GtComponentPortal, GtPortalOutlet, GtTemplatePortal } from './portal-base';

@Directive({
  selector: '[gtTemplatePortalOutlet]'
})
export class GtTemplatePortalOutlet<T> extends GtPortalOutlet implements OnDestroy {
  @Input() set gtTemplatePortalOutlet(value: GtTemplatePortal<any>) {
    this.attach(value);
  }

  constructor(private _viewContainerRef: ViewContainerRef) {
    super();
  }

  ngOnDestroy(): void {
    super.dispose();
  }

  attach<T>(portal: GtTemplatePortal<T>): EmbeddedViewRef<T> {
    super.attach(portal);
    portal.setPortalHost(this);
    const viewRef = this._viewContainerRef.createEmbeddedView(portal.templateRef, portal.context);
    super.setDisposeFn(() => this._viewContainerRef.clear());
    this._attachedPortal = portal;
    return viewRef;
  }
}

@Directive({
  selector: '[gtComponentPortalOutlet]',
  exportAs: 'gtComponentPortalOutlet',
  inputs: ['portal: gtComponentPortalOutlet']
})
export class GtComponentPortalOutlet<T> extends GtPortalOutlet implements OnDestroy {
  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _viewContainerRef: ViewContainerRef
  ) {
    super()
  }

  ngOnDestroy(): void {
    super.dispose();
  }

  attach<T>(portal: GtComponentPortal<T>): ComponentRef<T> {
    super.attach(portal);
    const viewContainerRef = portal.viewContainerRef ? portal.viewContainerRef : this._viewContainerRef;
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
    const ref = viewContainerRef.createComponent(
      componentFactory, viewContainerRef.length,
      portal.injector || viewContainerRef.parentInjector);

    super.setDisposeFn(() => ref.destroy());
    return ref as any as ComponentRef<T>;
  }
}
