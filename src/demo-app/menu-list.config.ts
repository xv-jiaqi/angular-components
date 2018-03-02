import { GtMenus } from 'get-ui-ng';

export const menuList: GtMenus = [
  {
    label: 'Navigate',
    name: 'assistant',
    icon: 'icon-home',
    items: [
      {
        label: 'Tabs',
        name: 'tabs',
        link: '/tabs',
        activeLink: '/tabs'
      },
      {
        label: 'Bar',
        name: 'bar',
        link: '/bar',
        activeLink: '/bar'
      },
      {
        label: 'Datepicker',
        name: 'datepicker',
        link: '/datepicker',
        activeLink: '/datepicker'
      }, {
        label: 'Modal',
        name: 'modal',
        link: '/modal',
        activeLink: '/modal'
      }
    ]
  }
];
