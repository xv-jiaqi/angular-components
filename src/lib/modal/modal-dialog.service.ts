import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { GtDialogOption } from './modal-dialog-options';
import { deepClone, deepMerge } from '../utils/common';
import { GtModalDialogComponent } from './modal-dialog.component';

@Injectable()

export class GtModalDialogService {
  private _overlayEle: Element;

  constructor (
    private _componentFactoryResolve: ComponentFactoryResolver,
    private _applicationRef: ApplicationRef,
    private _injector: Injector
  ) { }

  private _openDialog (options: string | GtDialogOption, defaultOptions: GtDialogOption) {
    return new Promise(resolve => {
      /** define close modal callback function **/
      const closeCallback = (params: boolean): void => {
        /** first remove the created overlay element **/
        document.body.removeChild(this._overlayEle);
        /** then call resolve of promise callback **/
        resolve(params);
      };

      /** deal options **/
      let myOption = deepClone(defaultOptions);
      if (typeof options === 'string') {
        myOption.body = options;
      } else {
        myOption = <GtDialogOption>deepMerge(myOption, options);
      }

      /** create host container **/
      this._overlayEle = document.createElement('div');
      document.body.appendChild(this._overlayEle);

      /** parse ModalDialogComponent **/
      const componentFactory = this._componentFactoryResolve.resolveComponentFactory(GtModalDialogComponent);

      /** create componentRef by default injector **/
      const componentRef = componentFactory.create(this._injector);

      /** assign instance data **/
      (<GtModalDialogComponent>componentRef.instance).options = myOption;
      (<GtModalDialogComponent>componentRef.instance).resolve = closeCallback;

      /** attach to application ref to watch view changes **/
      this._applicationRef.attachView(componentRef.hostView);

      /** append rendered component dom to host container **/
      this._overlayEle.appendChild((componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement);

      /** open toast modal **/
      (<GtModalDialogComponent>componentRef.instance).modalRef.openModal();
    });
  }

  info (options: string | GtDialogOption): Promise<any> {
    const defaultOptions = new GtDialogOption();
    defaultOptions.buttons = [
      {
        label: '关闭',
        event: 'ok',
        'class': 'gt-btn-line'
      }
    ];
    return this._openDialog(options, defaultOptions);
  }

  confirm (options: string | GtDialogOption): Promise<any> {
    const defaultOptions = new GtDialogOption();
    defaultOptions.buttons = [
      {
        label: '取消',
        event: 'cancel',
        'class': 'gt-btn-line'
      },
      {
        label: '确定',
        event: 'ok',
        'class': 'gt-btn-solid'
      }
    ];
    return this._openDialog(options, defaultOptions);
  }
}
