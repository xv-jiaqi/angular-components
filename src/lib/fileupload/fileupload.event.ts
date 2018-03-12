export type GtParsedResponseHeaders = {
  [headerFieldName: string]: string;
};

export interface GtFileUploadSuccessEvent {
  /** 请求响应内容 */
  response: string;

  /** 响应状态码 */
  status: number;

  /** 响应头信息 */
  headers: GtParsedResponseHeaders
}

export interface GtFileUploadFailEvent {
  /** 请求响应内容 */
  response: string;

  /** 响应状态码 */
  status: number;

  /** 响应头信息 */
  headers: GtParsedResponseHeaders
}

export interface GtFileUploadCompleteEvent {
  /** 请求响应内容 */
  response: string;

  /** 响应状态码 */
  status: number;

  /** 响应头信息 */
  headers: GtParsedResponseHeaders
}
