import { Component, ViewChild } from '@angular/core';
import { DialogOption } from './modal-dialog-options';
import { GtModalWrapComponent } from './modal-wrap.component';

@Component({
  moduleId: module.id,
  templateUrl: './modal-dialog.component.html'
})

export class GtModalDialogComponent {
  options: DialogOption;

  resolve: (params: boolean) => void;

  @ViewChild(GtModalWrapComponent)
  modalRef: GtModalWrapComponent;

  close (event: string) {
    this.modalRef.closeModal().then(() => {
      this.resolve(event === 'ok');
    });
  }
}
