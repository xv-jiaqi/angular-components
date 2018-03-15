### Examples

#### 文件上传

<!-- example(fileupload-file-overview) -->

#### 图片上传

<!-- example(fileupload-image-overview) -->

### Inputs

| 属性             | 说明            |类型           |默认值          |
|-----------------|-----------------|--------------|---------------|
|`url`            |上传文件的url      |string        |               |
|`hintMsg`        |上传提示信息       |string        |`''`           |
|`type`           |上传类型          |GtFileUploadType|`GtFileUploadType.OTHER`|          |
|`autoUpload`     |是否自动上传       |boolean        |`true`        |
|`allowedFileType`|允许上传的文件类型  |string[]       |`[]`          |
|`method`         |请求方式          |string         |`POST`        |
|`disableMultipart`|是否允许多文件上传 |boolean        |`false`       |
|`maxFileSize`    |最大允许上传的文件大小|number       |`1024 * 1024 * 1024` |
|`getErrorMsg`    |传入的方法，根据响应、状态、请求头获取错误信息|(response: string, status: number, headers: GtParsedResponseHeaders) => string | `() => ''` |
|`isSuccess`      |传入的方法，判断是否成功 |(response: string, status: number, headers: GtParsedResponseHeaders) => boolean | `() => true` |
|`getInvalidMsg`  |传入的方法，根据校验的错误类型获取校验错误信息 | (type: GtFileUploadInvalidType) => string | |
|`previewWidth`   |预览的图片宽度     |number         |`120`          |
|`previewHeight`  |预览的图片宽度     |number         |`120`          |
|`minWidth`       |允许上传的图片最小宽度|number         |`0`          |
|`maxWidth`       |允许上传的图片最大宽度|number         |`1024 * 1024`|
|`minHeight`      |允许上传的图片最小高度|number         |`0`          |
|`maxHeight`      |允许上传的图片最大高度|number         |`1024 * 1024`|          |

### Events

| 属性             | 说明            |参数           |
|-----------------|-----------------|--------------|
|`success`        |上传成功事件       |GtFileUploadSuccessEvent |
|`fail`           |上传失败事件       |GtFileUploadFailEvent |
|`complete`       |上传完成事件       |GtFileUploadCompleteEvent |
