/** 次级菜单定义 */
export interface GtSubMenu {
  /** 次级菜单展示名 */
  label: string;
  /** 次级菜单名称（暂时无用）*/
  name: string;
  /** 菜单的url链接 */
  link: string;
  /** 是否选中 */
  selected?: boolean;
  /** 显示选中状态的url链接，解决二级子菜单还有子菜单时link不匹配的问题 */
  activeLink: string;
}

/** 菜单定义 */
export interface GtMenu {
  /** 一级菜单展示名 */
  label: string;
  /** 一级菜单名称（暂时无用） */
  name: string;
  /** 菜单的icon名称，与iconfont的class名称对应 */
  icon: string;
  /** 是否选中 */
  selected?: boolean;
  /** 显示选中状态的url链接，解决子菜单激活时父级菜单也要激活的问题 */
  activeLink?: string;
  /** 次级子菜单选项 */
  items?: GtSubMenu[];
}

/** 菜单列表 */
export type GtMenus = GtMenu[];
