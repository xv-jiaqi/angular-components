import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'gt-component-view',
  templateUrl: './component-view.component.html',
  styleUrls: ['./component-view.component.css']
})
export class ComponentViewComponent implements OnInit {
  apiUrl: string;

  markdownUrl: string;

  constructor(
    private _router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      const url = this._router.url.substring(1);
      this.markdownUrl = `docs/markdown/${url}/get-ui-ng-${url}.html`;
      this.apiUrl = `docs/api/get-ui-ng-${url}.html`;
    })
  }


}
