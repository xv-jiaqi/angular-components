import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableCellComponent } from './table-cell.component'
import { TableActionsComponent } from './table-action.component';
import { TableExpandRowComponent } from './table-expand-row.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TableComponent,
    TableCellComponent,
    TableActionsComponent,
    TableExpandRowComponent
  ],
  exports: [
    TableComponent,
    TableCellComponent,
    TableActionsComponent,
    TableExpandRowComponent
  ]
})

export class GtTableModule { }
