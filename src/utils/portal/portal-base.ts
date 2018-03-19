import {
  ApplicationRef,
  ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injector, TemplateRef,
  ViewContainerRef
} from '@angular/core';

export abstract class GtPortal<T> {
  private _portalOutlet: GtBasePortalOutlet | null;

  attach(host: GtBasePortalOutlet): T {
    if (!host) {
      throw new Error('Portal host can not be null or undefined');
    }

    if (host.hasAttached) {
      throw new Error('Portal host has been attached');
    }

    this._portalOutlet = host;

    return <T> host.attach(this);
  }

  detach(): void {
    const host = this._portalOutlet;
    if (host === null) {
      throw new Error('Portal host is null and no need to detach');
    }

    this._portalOutlet = null;
    host.detach();
  }

  get isAttached(): boolean {
    return this._portalOutlet !== null;
  }

  setPortalHost(host: GtBasePortalOutlet | null) {
    this._portalOutlet = host;
  }
}

export abstract class GtBasePortalOutlet {
  private _isDisposed: boolean = false;

  private _disposeFn: (() => void) | null;

  protected _attachedPortal: GtPortal<any> | null;

  private _invokeDispose() {
    if (this._disposeFn) {
      this._disposeFn();
      this._disposeFn = null;
    }
  }

  protected abstract _attachTemplatePortal<T>(portal: GtTemplatePortal<T>): EmbeddedViewRef<T>;

  protected abstract _attachComponentPortal<T>(portal: GtComponentPortal<T>): ComponentRef<T>;

  attach(portal: GtPortal<any>): any {
    if (!portal) {
      throw new Error('Portal can not be null or undefined');
    }

    if (this._isDisposed) {
      throw new Error('Portal host has been disposed');
    }

    if (this.hasAttached) {
      return new Error('Portal host has been attached');
    }

    this._attachedPortal = portal;

    portal.setPortalHost(this);

    if (portal instanceof GtTemplatePortal) {
      return this._attachTemplatePortal(portal);
    }
    if (portal instanceof GtComponentPortal) {
      return this._attachComponentPortal(portal);
    }
  }

  detach(): void {
    if (this._attachedPortal) {
      this._attachedPortal.setPortalHost(null);
      this._attachedPortal = null;
    }
    this._invokeDispose();
  }

  dispose(): void {
    if (this.hasAttached) {
      this.detach();
    }
    this._invokeDispose();
    this._isDisposed = true;
  }

  get hasAttached(): boolean {
    return this._attachedPortal !== null && this._attachedPortal !== undefined;
  }

  setDisposeFn(fn: () => void) {
    this._disposeFn = fn;
  }
}

export class GtDomPortalOutlet extends GtBasePortalOutlet {
  constructor(
    public outletElement: Element,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _defaultInjector: Injector
  ) {
    super();
  }

  private _getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  protected _attachTemplatePortal<T>(portal: GtTemplatePortal<T>): EmbeddedViewRef<T> {
    let viewContainer = portal.viewContainerRef;
    let viewRef = viewContainer.createEmbeddedView(portal.templateRef, portal.context);
    viewRef.detectChanges();
    viewRef.rootNodes.forEach(rootNode => this.outletElement.appendChild(rootNode));

    this.setDisposeFn((() => {
      let index = viewContainer.indexOf(viewRef);
      if (index !== -1) {
        viewContainer.remove(index);
      }
    }));

    return viewRef;
  }

  protected _attachComponentPortal<T>(portal: GtComponentPortal<T>): ComponentRef<T> {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);

    let ref: ComponentRef<T>;
    if (portal.viewContainerRef) {
      ref = portal.viewContainerRef.createComponent(componentFactory,
        portal.viewContainerRef.length,
        portal.injector || portal.viewContainerRef.parentInjector);

      this.setDisposeFn(() => ref.destroy());
    } else {
      ref = componentFactory.create(portal.injector || this._defaultInjector);
      this._appRef.attachView(ref.hostView);
      this.setDisposeFn(() => {
        this._appRef.detachView(ref.hostView);
        ref.destroy();
      });
    }

    this.outletElement.appendChild(this._getComponentRootNode(ref));
    return ref;
  }
}

export class GtTemplatePortal<T> extends GtPortal<T> {
  templateRef: TemplateRef<T>;

  viewContainerRef: ViewContainerRef;

  context: T | undefined;

  constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef, context?: T) {
    super();
    this.templateRef = templateRef;
    this.viewContainerRef = viewContainerRef;
    this.context = context;
  }

  attach(host: GtBasePortalOutlet, context: T | undefined = this.context): T {
    this.context = context;
    return super.attach(host);
  }

  detach(): void {
    this.context = undefined;
    return super.detach();
  }
}

export interface ComponentType<T> extends Object {
  new (...args: any[]): T;
}

export class GtComponentPortal<T> extends GtPortal<ComponentRef<T>> {
  component: ComponentType<T>;

  viewContainerRef?: ViewContainerRef | null;

  injector?: Injector | null;

  constructor(
    component: ComponentType<T>,
    viewContainerRef?: ViewContainerRef | null,
    injector?: Injector | null
  ) {
    super();
    this.component = component;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
  }
}
