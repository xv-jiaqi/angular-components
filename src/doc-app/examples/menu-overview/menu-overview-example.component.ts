import { Component } from '@angular/core';
import { GtMenus } from 'get-ui-ng/base';

/**
 * @title Menu
 */
@Component({
  moduleId: module.id,
  selector: 'gt-menu-overview-example',
  templateUrl: './menu-overview-example.component.html',
  styleUrls: ['./menu-overview-example.component.css']
})
export class MenuOverviewExampleComponent {
  menuList: GtMenus = [
    {
      label: 'Navigate',
      name: 'navigate',
      icon: 'icon-home',
      items: [
        {
          label: 'Menu',
          name: 'menu',
          link: '/menu',
          activeLink: '/menu'
        }
      ]
    }, {
      label: 'Form',
      name: 'form',
      icon: 'icon-home',
      items: [
        {
          label: 'Datetime',
          name: 'datetime',
          link: '/datetime',
          activeLink: '/datetime'
        }
      ]
    }
  ];
}
