import { Component } from '@angular/core';
import { GtModalToastService, GtToastType } from 'get-ui-ng/base';

/**
 * @title
 * Modal-Toast
 */
@Component({
  moduleId: module.id,
  templateUrl: './modal-toast-overview-example.component.html',
  styleUrls: ['./modal-toast-overview-example.component.css']
})
export class ModalToastOverviewExampleComponent {
  constructor(
    private _toastService: GtModalToastService
  ) {}

  toast(type: GtToastType): void {
    switch (type) {
      case GtToastType.INFO: this._toastService.toast({type: GtToastType.INFO, message: '产品要跑路了'}); break;
      case GtToastType.SUCCESS: this._toastService.toast({type: GtToastType.SUCCESS, message: '产品跑路成功'}); break;
      case GtToastType.WARNING: this._toastService.toast({type: GtToastType.WARNING, message: '警告，产品要跑路了！'}); break;
      case GtToastType.ERROR: this._toastService.toast({type: GtToastType.ERROR, message: '产品跑错路了'}); break;
    }
  }
}
