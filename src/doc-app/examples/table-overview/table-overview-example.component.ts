import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    styleUrls: ['./table-overview-example.component.css'],
    templateUrl: './table-overview-example.component.html'
})
export class TableOverviewExampleComponent implements OnInit {
  columns = [
      {
        id: 'firstName',
        field: 'firstName',
        label: '姓',
        width: '400px',
        sort: true,
        sortOrder: 'asc',
        sortKey: 'first_name',
        style: () => {
          return {'color': 'red'};
        },
        hidden: false
      },
      {
        id: 'lastName',
        field: 'lastName',
        label: '名',
        sort: true,
        style: {
          'color': 'red'
        }
      }
  ];
  data =  [
    {

      'id': 45,
      'firstName': '产',
      'lastName': '品'

    },
    {
      'id': 66,
      'firstName': '开',
      'lastName': '发'
    }
  ];
  actions = [
    {
      label: '查看',
      click: () => {

      }
    }, {
      label: '删除',
      disabled: true,
      confirm: '确定删除吗',
      click: () => {} //点击后的回调
    },  {
      label: '任务结果',
      hidden: false,
      click: (row: any) => {
        console.log(row)
      }//点击后的回调
    }
  ];
  sortStatus = {};
  constructor() {

  }

  ngOnInit() {

  }

  onCheckedRow(event: any) {
    console.log(event)
  }
  onExpandRow(event: any) {
    console.log(event)
  }
  onSortStateChange(event: any) {
    this.sortStatus = event;
  }
}
