import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { menuList} from './menu-list.config';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  menuList = menuList;

  constructor() {
  }

  ngOnInit(): void {

  }
}
