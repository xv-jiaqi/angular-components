import {
  ComponentFactoryResolver, ComponentRef, Directive, EmbeddedViewRef, Input, NgModule, OnDestroy,
  ViewContainerRef
} from '@angular/core';
import { GtComponentPortal, GtBasePortalOutlet, GtTemplatePortal } from './portal-base';

@Directive({
  selector: '[gtPortalOutlet]'
})
export class GtPortalOutlet<T> extends GtBasePortalOutlet implements OnDestroy {
  @Input() set gtPortalOutlet(value: GtTemplatePortal<any> | GtComponentPortal<any>) {
    this.attach(value);
  }

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _viewContainerRef: ViewContainerRef
  ) {
    super();
  }

  ngOnDestroy(): void {
    super.dispose();
  }

  attach<T>(portal: GtTemplatePortal<T> | GtComponentPortal<T>): EmbeddedViewRef<T> | ComponentRef<T> {
    super.attach(portal);
    portal.setPortalHost(this);

    if (portal instanceof GtTemplatePortal) {
      const viewRef = this._viewContainerRef.createEmbeddedView(portal.templateRef, portal.context);
      super.setDisposeFn(() => this._viewContainerRef.clear());
      this._attachedPortal = portal;
      return viewRef;
    } else {
      const viewContainerRef = portal.viewContainerRef ? portal.viewContainerRef : this._viewContainerRef;
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
      const ref = viewContainerRef.createComponent(
        componentFactory, viewContainerRef.length,
        portal.injector || viewContainerRef.parentInjector);

      super.setDisposeFn(() => ref.destroy());
      return ref as any as ComponentRef<T>;
    }
  }
}
