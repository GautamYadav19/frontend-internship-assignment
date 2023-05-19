import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableViewComponent } from './table-view/table-view.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [TableViewComponent],
  imports: [CommonModule, NgxPaginationModule, MatIconModule],
  exports: [TableViewComponent, MatIconModule],
})
export class SharedModule {}
