export interface GtSubMenu {
  label: string;
  name: string;
  link: string;
  selected?: boolean;
  activeLink: string;
}

export interface GtMenu {
  label: string;
  name: string;
  icon: string;
  selected?: boolean;
  activeLink?: string;
  items?: GtSubMenu[];
}

export type GtMenus = GtMenu[];
