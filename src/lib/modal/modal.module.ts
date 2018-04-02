import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GtModalWrapComponent } from './modal-wrap.component';
import {
  GtModalWrapBodyContentComponent, GtModalWrapFooterContentComponent,
  GtModalWrapHeaderContentComponent
} from './modal-wrap-content.component';
import { GtModalToastComponent } from './modal-toast.component';
import { GtModalDialogComponent } from './modal-dialog.component';
import { GtModalToastService } from './modal-toast.service';
import { GtModalDialogService } from './modal-dialog.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    GtModalToastService,
    GtModalDialogService
  ],
  declarations: [
    GtModalWrapComponent,
    GtModalWrapHeaderContentComponent,
    GtModalWrapBodyContentComponent,
    GtModalWrapFooterContentComponent,
    GtModalToastComponent,
    GtModalDialogComponent
  ],
  entryComponents: [
    GtModalToastComponent,
    GtModalDialogComponent
  ],
  exports: [
    GtModalWrapComponent,
    GtModalWrapHeaderContentComponent,
    GtModalWrapBodyContentComponent,
    GtModalWrapFooterContentComponent
  ]
})

export class GtModalModule { }
