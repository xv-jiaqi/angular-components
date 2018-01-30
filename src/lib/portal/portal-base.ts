import { ComponentRef, Injector, TemplateRef, ViewContainerRef } from '@angular/core';

export abstract class GtPortal<T> {
  private _portalOutlet: GtPortalOutlet | null;

  attach(host: GtPortalOutlet): T {
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

  setPortalHost(host: GtPortalOutlet | null) {
    this._portalOutlet = host;
  }
}

export class GtPortalOutlet {
  private _isDisposed: boolean = false;

  private _disposeFn: (() => void) | null;

  protected _attachedPortal: GtPortal<any> | null;

  private _invokeDispose() {
    if (this._disposeFn) {
      this._disposeFn();
      this._disposeFn = null;
    }
  }

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
    return this._attachedPortal !== null;
  }

  setDisposeFn(fn: () => void) {
    this._disposeFn = fn;
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

  attach(host: GtPortalOutlet, context: T | undefined = this.context): T {
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
