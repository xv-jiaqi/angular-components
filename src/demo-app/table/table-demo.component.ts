import { Component, OnInit } from '@angular/core';

//import { SliderDemoComponent } from '../slider/slider-demo.component';
import { ExpandDemoComponent } from './expand-demo.component';
@Component({
  moduleId: module.id,
  selector: 'gt-table-demo',
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.css']
})

export class TableDemoComponent implements OnInit {
  columns: any[];
  data: any[];
  actions: any[];
  expand: any;
  row: any;
  constructor() {
    this.columns = [
      {
        id: 'firstName',
        field: 'firstName',
        label: '姓',
        width: '400px',
        style: function () {
            //  console.log(row);
            // console.log(val);
          return {
            'color': 'red'
          }
        },
        component: ExpandDemoComponent,
        hidden: false
      },
      {
        id: 'lastName',
        field: 'lastName',
        label: '名',
        style: {
          'color': 'red'
        }
      }
    ];
    this.data =  [
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
    this.actions = [
      {
        label: '查看',
        click: () => {
        }
      }, {
        label: '删除',
        disabled: false,
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
    this.expand = ExpandDemoComponent
  }

  ngOnInit() {

  }

  changeData() {
    this.data.push(this.data[1]);
  }
  onCheckedRow(event: any) {
    console.log(event)
  }
  onExpandRow(event: any) {
    console.log(event)
  }
}
