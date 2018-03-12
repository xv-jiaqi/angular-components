import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'gt-table-demo',
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.css']
})

export class TableDemoComponent implements OnInit {
  columns = [];
  data = [];
  constructor() {
    this.columns = [
      {
        id: 'firstName',
        field: 'firstName',
        label: '姓',
        width: 100
      },
      {
        id: 'lastName',
        field: 'lastName',
        label: '名'
      }
    ];
    this.data =  [
      {
        'firstName': '产',
        'lastName': '品'
      },
      {
        'firstName': '开',
        'lastName': '发'
      }
    ];
  }

  ngOnInit() {

  }

  changeData() {
    this.data.push(this.data[1]);
  }
}
