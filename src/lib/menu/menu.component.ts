import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { deepClone } from './../utils/common';

@Component({
  moduleId: module.id,
  selector: 'gt-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit, AfterViewInit {
  private _menus;

  @Input() set menus (value) {
    this._menus = deepClone(value);
  }
  get menus () {
    return this._menus;
  }

  currentSubHeight;

  constructor(private _router: Router) {}

  ngOnInit () {
    setTimeout(() => {
      const url = this._router.url.replace(/\?.*/g, '');
      for (let i = 0; i < this.menus.length; i++) {
        if (url.indexOf(this.menus[i].activeLink) > -1) {
          this.menus[i].selected = true;
          return;
        }
        if (this.menus[i].items && this.menus[i].items.length) {
          for (let j = 0; j < this.menus[i].items.length; j++) {
            if (url.indexOf(this.menus[i].items[j].activeLink) > -1) {
              this.menus[i].selected = true;
              this.menus[i].items[j].selected = true;
              return;
            }
          }
        }
      }
    });
  }

  /** component will recreate if router to different module, so set current sub height after view render **/
  ngAfterViewInit () {
    setTimeout(() => {
      const el: any = document.querySelector('.gt-menu__sub__cell .gt--sel');
      this.currentSubHeight = el ? el.parentNode.parentElement.scrollHeight + 'px' : '0px';
    });
  }

  toggleMenu (e, index: number) {
    for (let i = 0; i < this.menus.length; i++) {
      this.menus[i].selected = i === index;
    }

    e.stopPropagation();
    let target = e.target;
    if (target.classList.contains('gt-menu__txt') || target.classList.contains('gt-icon')) {
      target = target.parentNode;
    }

    this.currentSubHeight = target.nextElementSibling.scrollHeight + 'px';
  }

  subMenuClick (parentIndex: number, childIndex: number) {
    for (let i = 0; i < this.menus.length; i++) {
      if (this.menus[i].items) {
        for (let j = 0; j < this.menus[i].items.length; j++) {
          this.menus[i].items[j].selected = false;
        }
      }
    }
    this.menus[parentIndex].items[childIndex].selected = true;
    this._router.navigateByUrl(this.menus[parentIndex].items[childIndex].link);
  }
}
