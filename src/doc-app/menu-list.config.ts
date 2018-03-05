import { GtMenus } from 'get-ui-ng/base';

export const menuList: GtMenus = [
  {
    label: 'Navigate',
    name: 'navigate',
    icon: 'icon-home',
    items: [
      {
        label: 'Tabs',
        name: 'tabs',
        link: '/tabs',
        activeLink: '/tabs'
      },  {
        label: 'Menu',
        name: 'menu',
        link: '/menu',
        activeLink: '/menu'
      }
    ]
  }, {
    label: 'Popup',
    name: 'popup',
    icon: 'icon-home',
    items: [
      {
        label: 'modal',
        name: 'modal',
        link: '/modal',
        activeLink: '/modal'
      }
    ]
  }
];
