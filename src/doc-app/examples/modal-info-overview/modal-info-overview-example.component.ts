import { Component } from '@angular/core';
import { GtModalDialogService, GtModalToastService, GtToastType } from 'get-ui-ng/base';

/**
 * @title Modal-Info
 */
@Component({
  moduleId: module.id,
  templateUrl: './modal-info-overview-example.component.html',
  styleUrls: ['./modal-info-overview-example.component.css']
})
export class ModalInfoOverviewExampleComponent {
  constructor(
    private _toastService: GtModalToastService,
    private _dialogService: GtModalDialogService
  ) { }

  info() {
    this._dialogService.info('产品已经跑路');
  }
}
