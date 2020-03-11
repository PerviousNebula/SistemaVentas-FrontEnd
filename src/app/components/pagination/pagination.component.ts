import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Interfaces
import { Pagination } from '../../interfaces/interfaces.index';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {
  @Input() pagination: Pagination;
  @Output() event: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public changePage(page: number): void {
    this.event.emit(page);
  }

}
