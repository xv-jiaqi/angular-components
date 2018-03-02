import { Component, ViewChild } from '@angular/core';
import { GtModalWrapComponent } from './modal-wrap.component';
import { GtToastType } from './modal-toast-type';

@Component({
  moduleId: module.id,
  templateUrl: './modal-toast.component.html'
})

export class GtModalToastComponent {
  /** toast type **/
  type: GtToastType;

  /** toast message **/
  message: string;

  @ViewChild(GtModalWrapComponent)
  modalRef: GtModalWrapComponent;

  closed = false;

  closeModal () {
    this.closed = true;
    return this.modalRef.closeModal();
  }
}
