export enum GtToastType {
  /** 提示 */
  INFO = 'toast-info',
  /** 成功 */
  SUCCESS = 'toast-success',
  /** 警告 */
  WARNING = 'toast-warning',
  /** 错误 */
  ERROR = 'toast-error'
}

/** Toast参数 */
export interface GtToastOption {
  /** toast类型 */
  type: GtToastType,
  /** toast信息 */
  message: string,
  /** 自动关闭时间，默认3000ms */
  timeout?: number
}
