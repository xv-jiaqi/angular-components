import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { GtModalToastComponent } from './modal-toast.component';
import { GtToastOption } from './modal-toast';

@Injectable()

export class GtModalToastService {
  private _overlayEle: Element;

  private _timer;

  constructor (
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _applicationRef: ApplicationRef,
    private _injector: Injector
  ) { }

  toast (options: GtToastOption) {
    /** clear async task **/
    clearTimeout(this._timer);

    /** create host container **/
    this._overlayEle = document.createElement('div');
    document.body.appendChild(this._overlayEle);

    /** parse ModalToastComponent **/
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(GtModalToastComponent);

    /** create componentRef by default injector **/
    const componentRef = componentFactory.create(this._injector);

    /** assign instance data **/
    (<GtModalToastComponent>componentRef.instance).type = options.type;
    (<GtModalToastComponent>componentRef.instance).message = options.message;

    /** attach to application ref to watch view changes **/
    this._applicationRef.attachView(componentRef.hostView);

    /** append rendered component dom to host container **/
    this._overlayEle.appendChild((componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement);

    /** open toast modal **/
    (<GtModalToastComponent>componentRef.instance).modalRef.openModal();
    this._timer = setTimeout(() => {
      /** if not closed by click, close and remove dom after timeout **/
      if (!(<GtModalToastComponent>componentRef.instance).closed) {
        (<GtModalToastComponent>componentRef.instance).closeModal();
      }
      document.body.removeChild(this._overlayEle);
    }, options.timeout || 3000);
  }
}
