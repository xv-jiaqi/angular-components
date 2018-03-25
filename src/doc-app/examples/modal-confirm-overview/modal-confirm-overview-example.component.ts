import { Component } from '@angular/core';
import { GtModalDialogService, GtModalToastService, GtToastType } from 'get-ui-ng/base';

/**
 * @title Modal-Confirm
 */
@Component({
  moduleId: module.id,
  templateUrl: './modal-confirm-overview-example.component.html',
  styleUrls: ['./modal-confirm-overview-example.component.css']
})
export class ModalConfirmOverviewExampleComponent {
  constructor(
    private _toastService: GtModalToastService,
    private _dialogService: GtModalDialogService
  ) { }

  confirm() {
    this._dialogService.confirm('产品跑路了吗？').then(result => result ?
      this._toastService.toast({type: GtToastType.INFO, message: '产品已经跑路了'}) :
      this._toastService.toast({type: GtToastType.INFO, message: '产品暂时还没跑路'})
    )
  }
}
