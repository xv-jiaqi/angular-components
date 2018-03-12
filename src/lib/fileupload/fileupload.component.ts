import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { GtFileUploadType } from './fileupload.type';
import { GtFileUploadStatus } from './fileupload.status';
import {
  GtFileUploadCompleteEvent,
  GtFileUploadFailEvent,
  GtFileUploadSuccessEvent,
  GtParsedResponseHeaders
} from './fileupload.event';
import { GtFileUploadInvalidType } from './fileupload.invalid-type';

@Component({
  moduleId: module.id,
  selector: 'gt-file-upload',
  templateUrl: './fileupload.component.html'
})
export class GtFileUploadComponent implements OnInit {

  /** 文件上传 */
  @Input() url: string;

  /** 上传提示信息 */
  @Input() hintMsg: string = '';

  /** 上传类型 */
  @Input() type: GtFileUploadType = GtFileUploadType.OTHER;

  /** 是否自动上传 */
  @Input() autoUpload: boolean = true;

  /** 允许上传的文件类型 */
  @Input() allowedFileType: string[];

  /** 请求方式 */
  @Input() method = 'POST';

  /** 是否允许多文件上传 */
  @Input() disableMultipart = true;

  /** 允许上传的文件大小 */
  @Input() maxFileSize: number = 1024 * 1024 * 1024;

  /** 传入的方法，根据响应、状态、请求头获取错误信息 */
  @Input() getErrorMsg: (response: string, status: number, headers: GtParsedResponseHeaders) => string = () => '';

  /** 传入的方法，判断是否成功 */
  @Input() isSuccess: (response: string, status: number, headers: GtParsedResponseHeaders) => boolean = () => true;

  /** 传入的方法，根据校验的错误类型获取校验错误信息 */
  @Input() getInvalidMsg: (type: GtFileUploadInvalidType) => string = this._defaultValidMsgFn;

  /** 预览的图片宽度 */
  @Input() previewWidth: number = 120;

  /** 预览的图片高度 */
  @Input() previewHeight: number = 120;

  /** 允许上传的图片最小宽度 */
  @Input() minWidth: number = 0;

  /** 允许上传的图片最大宽度 */
  @Input() maxWidth: number = 1024 * 1024;

  /** 最小的图片上传高度 */
  @Input() minHeight: number = 0;

  /** 最大的图片的上传高度 */
  @Input() maxHeight: number = 1024 * 1024;

  /** 上传成功事件 */
  @Output() success: EventEmitter<GtFileUploadSuccessEvent> = new EventEmitter();

  /** 上传失败事件 */
  @Output() fail: EventEmitter<GtFileUploadFailEvent> = new EventEmitter();

  /** 请求完成事件 */
  @Output() complete: EventEmitter<GtFileUploadCompleteEvent> = new EventEmitter();

  /**
   * @docs-private
   */
  filename: string;

  /**
   * @docs-private
   */
  uploader: FileUploader;

  /**
   * @docs-private
   */
  fileItem: FileItem;

  /**
   * @docs-private
   * @type {boolean}
   */
  beginUpload: boolean = false;

  /**
   * @docs-private
   * @type {GtFileUploadStatus.NONE}
   */
  status: GtFileUploadStatus = GtFileUploadStatus.NONE;

  /**
   * @docs-private
   * @type {number}
   */
  progress: number = 0;

  /**
   * @docs-private
   * @type {string}
   */
  errorMsg = '';

  /**
   * @docs-private
   */
  imgBase64Data: string;

  /**
   * @docs-private
   * @type {boolean}
   */
  fileSelected: boolean = false;

  constructor(private _elementRef: ElementRef) { }

  ngOnInit(): void {
    this.uploader = new FileUploader({
      url: this.url,
      autoUpload: false,
      method: this.method,
      allowedFileType: this.allowedFileType,
      maxFileSize: this.maxFileSize,
      disableMultipart: this.disableMultipart
    })
  }

  /**
   * 默认的获取校验不通过的错误提示信息
   * @param {GtFileUploadInvalidType} type
   * @returns {string}
   * @private
   */
  private _defaultValidMsgFn(type: GtFileUploadInvalidType): string {
    switch (type) {
      case GtFileUploadInvalidType.FILE_SIZE_ERROR: return '文件大小不符合要求';
      case GtFileUploadInvalidType.IMG_PIXEL_ERROR: return '图片尺寸不符合要求';
      case GtFileUploadInvalidType.FILE_TYPE_ERROR: return '文件格式不符合要求';
      default: return '';
    }
  }

  /**
   * 上传成功时的处理
   * @param {string} response
   * @param {number} status
   * @param {ParsedResponseHeaders} headers
   * @private
   */
  private _onSuccess(response: string, status: number, headers: ParsedResponseHeaders): void {
    /** 后续可能返回200的状态，但是具体的成功和失败还需要业务层做一次判断 */
    const result = this.isSuccess(response, status, headers);
    if (result) {
      this.status = GtFileUploadStatus.SUCCESS;
      this.success.emit({response, status, headers})
    } else {
      this.status = GtFileUploadStatus.FAIL;
      this.errorMsg = this.getErrorMsg(response, status, headers);
      this.fail.emit({response, status, headers});
    }
  }

  /**
   * 上传错误的处理
   * @param {string} response
   * @param {number} status
   * @param {ParsedResponseHeaders} headers
   * @private
   */
  private _onError(response: string, status: number, headers: ParsedResponseHeaders): void {
    this.status = GtFileUploadStatus.FAIL;
    this.errorMsg = this.getErrorMsg(response, status, headers);
    this.fail.emit({response, status, headers});
  }

  /**
   * 上传完成的处理
   * @param {string} response
   * @param {number} status
   * @param {ParsedResponseHeaders} headers
   * @private
   */
  private _onComplete(response: string, status: number, headers: ParsedResponseHeaders): void {
    this.beginUpload = false;
    this.complete.emit({response, status, headers});
  }

  /**
   * 上传中的处理
   * @param {number} progress
   * @private
   */
  private _onProgress(progress: number): void {
    this.progress = progress;
  }

  /**
   * 上传前的处理
   * @private
   */
  private _onBeforeUpload(): void {
    this.errorMsg = '';
    this.beginUpload = true;
  }

  /**
   * 处理图片选中的情况
   * @param {File} file
   * @private
   */
  private _dealImageUpload(file: File): void {
    /** 创建虚拟的img获取图片的真实宽高 */
    const image = new Image();
    image.onload = () => {
      const width = image.naturalWidth;
      const height = image.naturalHeight;

      if (width < this.minWidth || width > this.maxWidth || height < this.minHeight || height > this.maxWidth) {
        this.errorMsg = this.getInvalidMsg(GtFileUploadInvalidType.IMG_PIXEL_ERROR);
      }
    };

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      this.imgBase64Data = fileReader.result;
      image.src = this.imgBase64Data;
    };
  }

  private _checkFileType(file: File): boolean {
    if (!this.allowedFileType || this.allowedFileType.length === 0) {
      return true;
    }
    const type = file.type;
    const index = this.allowedFileType.findIndex(allType => type.includes(allType));

    return index !== -1;
  }

  /**
   * @docs-private
   */
  selectFile(): void {
    const input = this._elementRef.nativeElement.querySelector('input');
    input.click();
  }

  /**
   * @docs-private
   */
  fileChange($event): void {
    this.fileSelected = true;

    this.filename = $event.target.files[0].name;

    if (!this._checkFileType($event.target.files[0])) {
      this.errorMsg = this.getInvalidMsg(GtFileUploadInvalidType.FILE_TYPE_ERROR);
      this.status = GtFileUploadStatus.TYPE_ERROR;
      return;
    }

    this.status = GtFileUploadStatus.NONE;
    this.fileItem = this.uploader.queue[this.uploader.queue.length - 1];

    if (!this.fileItem) return;

    if (this.fileItem.file.size > this.maxFileSize) {
      this.errorMsg = this.getInvalidMsg(GtFileUploadInvalidType.FILE_SIZE_ERROR);
      return;
    }

    if (this.type === GtFileUploadType.IMAGE) {
      this._dealImageUpload($event.target.files[0]);
    }

    this.fileItem.onBeforeUpload = this._onBeforeUpload.bind(this);
    this.fileItem.onProgress = this._onProgress.bind(this);
    this.fileItem.onSuccess = this._onSuccess.bind(this);
    this.fileItem.onError = this._onError.bind(this);
    this.fileItem.onComplete = this._onComplete.bind(this);

    if (this.autoUpload) {
      this.status = GtFileUploadStatus.PROGRESSING;
      this.fileItem.upload();
    }
  }

  /**
   * @docs-private
   */
  uploadFile(): void {
    this.status = GtFileUploadStatus.PROGRESSING;
    this.fileItem.upload();
  }
}
