/*排序方式*/
export type GT_SORT_ORDER = 'ASC' | 'DESC' | undefined;
/*文本居中模式*/
export type GT_TABLE_COLUMN_ALIGN = 'left' | 'right' | 'center';

export type GtTableClassFunc = (row: Object, cell: any) => string;

export type GtTableStyleFunc = (row: Object, cell: any) => Object;

/*column 列的参数*/
export interface GtColumnOption {
  /*表头名称*/
  'label': string,
  /*对应列内容的字段名*/
  'field': string,
  /*列宽 默认'auto'*/
  'width'?: string,
  /*对齐方式 默认'center'*/
  'align'?: GT_TABLE_COLUMN_ALIGN,
  /*是否影藏 默认false*/
  'hidden'?: boolean,
  /*单元格类*/
  'class'?: string | GtTableClassFunc,
  /*单元格样式*/
  'style'?: Object | GtTableStyleFunc,
  /*点击回调 , 自动添加link链接样式*/
  'click'?: Function,
  /*禁用点击*/
  'disabled'?: Function,
  /*格式化	*/
  'formatter'?: string | Function,
  /*排序 默认 false*/
  'sort'?: boolean | Function,
  /*自定义组件*/
  component?: any
}
