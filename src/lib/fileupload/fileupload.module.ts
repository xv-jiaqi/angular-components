import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GtFileUploadComponent } from './fileupload.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule
  ],
  exports: [
    GtFileUploadComponent
  ],
  declarations: [
    GtFileUploadComponent
  ]
})
export class GtFileUploadModule { }
