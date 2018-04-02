import { Component } from '@angular/core';

/**
 * @title FileUpload-File
 */
@Component({
  moduleId: module.id,
  templateUrl: './fileupload-file-overview-example.component.html',
  styleUrls: ['./fileupload-file-overview-example.component.css']
})
export class FileuploadFileOverviewExampleComponent {
  url = '/api/fileupload';

  hintMsg = '上传说明（格式，大小，......）';
}
