import { Component, Input } from '@angular/core';
import { Book } from 'src/app/core/models/book-response.model';

@Component({
  selector: 'front-end-internship-assignment-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  @Input() itemsPerPage = 10;
  @Input() currentPage = 1;
  @Input() totalItems = 0;
  @Input() booksList: Book[] = [];
  @Input() subjectName = '';
  @Input() state = '';
}
