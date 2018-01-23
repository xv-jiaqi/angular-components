import { Component } from '@angular/core';
import { menuList } from './menu-list.config';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  menuList = menuList
}
