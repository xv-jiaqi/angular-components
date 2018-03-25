import { Component } from '@angular/core';
import { GtFileUploadSuccessEvent } from 'get-ui-ng/base';

@Component({
  moduleId: module.id,
  templateUrl: './fileupload-demo.component.html'
})
export class FileUploadDemoComponent {
  url = '/api/fileupload';

  method = 'POST';

  isSuccess() {
    return true;
  }

  getErrorMsg() {
    return 'error msg';
  }

  success(result: GtFileUploadSuccessEvent) {
    console.log(result.response);
    console.log(result.status);
    console.log(result.headers);
  }
}
