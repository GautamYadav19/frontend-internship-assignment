import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Book } from 'src/app/core/models/book-response.model';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  books: Book[] = [];
  itemsPerPage = 10;
  currentPage = 1;
  totalItems = 0;
  state = 'initial';
  status = false;
  ResultDisplay = false;
  query = '';
  start = 0;
  endEntryCount = 0;
  paginationWaiting = '';

  constructor(private searchService: SearchService) {
    this.bookSearch = new FormControl('');
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value: string) => {
        this.status = true;
        this.fetchSearchData(value, this.currentPage, this.itemsPerPage);
      });
  }

  fetchSearchData(value: string, currentPage: number, itemsPerPage: number) {
    this.state = 'Loading';
    this.paginationWaiting = 'waiting';
    this.searchService.submitSearch(value, currentPage, itemsPerPage).subscribe(
      (data) => {
        this.books = data.docs;

        if (data.docs.length > 0) {
          this.ResultDisplay = true;
          this.state = 'completed';
          this.query = value;
          this.totalItems = data.numFound;
          this.start = ++data.start;
          this.endEntryCount = Number(itemsPerPage * currentPage);
        } else {
          this.state = 'notfound';
        }
      },
      (err: HttpErrorResponse) => {
        if (err) {
          this.state = 'notfound';
        }
      }
    );
  }

  renderPage(event: number) {
    this.currentPage = event;
    this.fetchSearchData(
      this.bookSearch.value,
      this.currentPage,
      this.itemsPerPage
    );
  }

  displayPageNum(event: any) {
    this.itemsPerPage = event.target.value;
    this.fetchSearchData(
      this.bookSearch.value,
      this.currentPage,
      this.itemsPerPage
    );
  }
}
