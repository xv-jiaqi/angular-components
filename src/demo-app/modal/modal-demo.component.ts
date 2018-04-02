import { Component, ViewChild } from '@angular/core';
import { GtModalDialogService, GtModalToastService, GtModalWrapComponent, GtToastType } from 'get-ui-ng/base';

@Component({
  moduleId: module.id,
  templateUrl: './modal-demo.component.html'
})
export class ModalDemoComponent {
  constructor(
    private _toastService: GtModalToastService,
    private _dialogService: GtModalDialogService
  ) { }

  @ViewChild(GtModalWrapComponent) modalRef: GtModalWrapComponent;

  toast(type: GtToastType): void {
    switch (type) {
      case GtToastType.INFO: this._toastService.toast({type: GtToastType.INFO, message: '产品要跑路了'}); break;
      case GtToastType.SUCCESS: this._toastService.toast({type: GtToastType.SUCCESS, message: '产品跑路成功'}); break;
      case GtToastType.WARNING: this._toastService.toast({type: GtToastType.WARNING, message: '警告，产品要跑路了！'}); break;
      case GtToastType.ERROR: this._toastService.toast({type: GtToastType.ERROR, message: '产品跑错路了'}); break;
    }
  }

  info(): void {
    this._dialogService.info('产品已经跑路了').then(() => {
      console.log('产品已经跑路了');
    })
  }

  confirm(): void {
    this._dialogService.confirm('产品跑路了吗？').then(result => result ?
      this._toastService.toast({type: GtToastType.INFO, message: '产品已经跑路了'}) :
      this._toastService.toast({type: GtToastType.INFO, message: '产品暂时还没跑路'})
    )
  }

  modal(): void {
    this.modalRef.openModal();
  }

  closeModal(): void {
    this.modalRef.closeModal();
  }
}
