import { Component, ViewChild } from '@angular/core';
import { GtModalWrapComponent } from 'get-ui-ng/base';

/**
 * @title
 * Modal-Wrap
 */
@Component({
  moduleId: module.id,
  templateUrl: './modal-wrap-overview-example.component.html',
  styleUrls: ['./modal-wrap-overview-example.component.css']
})
export class ModalWrapOverviewExampleComponent {
  @ViewChild(GtModalWrapComponent) modalRef: GtModalWrapComponent;

  modal(): void {
    this.modalRef.openModal();
  }

  closeModal(): void {
    this.modalRef.closeModal();
  }
}
