import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { deepClone } from './../utils/common';
import { GtMenus } from './menu';

@Component({
  moduleId: module.id,
  selector: 'gt-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit, AfterViewInit {
  private _menus: GtMenus;

  /** 菜单配置项 */
  @Input()
  set menus(value: GtMenus) {
    this._menus = deepClone(value);
  }
  get menus(): GtMenus {
    return this._menus;
  }

  /**
   * @docs-private
   */
  currentSubHeight;

  constructor(private _router: Router) {}

  ngOnInit () {
    setTimeout(() => {
      const url = this._router.url.replace(/\?.*/g, '');
      for (let i = 0; i < this.menus.length; i++) {
        if (url.indexOf(this.menus[i].activeLink || '') > -1) {
          this.menus[i].selected = true;
          if ((this.menus[i].items || []).length === 0) {
            return;
          }
        }

        const subMenus = this.menus[i].items || [];
        if (subMenus.length) {
          for (let j = 0; j < subMenus.length; j++) {
            if (url.indexOf(subMenus[j].activeLink) > -1) {
              this.menus[i].selected = true;
              subMenus[j].selected = true;
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

  /**
   * @docs-private
   * @param e
   * @param {number} index
   */
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

  /**
   * @docs-private
   * @param {number} parentIndex
   * @param {number} childIndex
   */
  subMenuClick (parentIndex: number, childIndex: number) {
    for (let i = 0; i < this.menus.length; i++) {
      const subMenus = this.menus[i].items || [];
      if (subMenus) {
        for (let j = 0; j < subMenus.length; j++) {
          subMenus[j].selected = false;
        }
      }
    }

    (this.menus[parentIndex].items || [])[childIndex].selected = true;
    this._router.navigateByUrl((this.menus[parentIndex].items || [])[childIndex].link);
  }
}
