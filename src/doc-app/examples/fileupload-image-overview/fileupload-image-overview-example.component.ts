import { Component } from '@angular/core';
import { GtFileUploadType } from 'get-ui-ng/base';

/**
 * @title FileUpload-Image
 */
@Component({
  moduleId: module.id,
  templateUrl: './fileupload-image-overview-example.component.html',
  styleUrls: ['./fileupload-image-overview-example.component.css']
})
export class FileuploadImageOverviewExampleComponent {
  url = '/api/fileupload';

  type = GtFileUploadType.IMAGE;

  hintMsg = '上传说明（格式，大小，......）';

  allowedFileType = ['png'];
}
