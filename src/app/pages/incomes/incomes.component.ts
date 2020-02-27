import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingreso, Pagination } from '../../interfaces/interfaces.index';
import { Subscription } from 'rxjs';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as ingresosActions from '../../store/actions';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html'
})
export class IncomesComponent implements OnInit, OnDestroy {
  public ingresos: Ingreso[];
  public loading: boolean;
  public pagination: Pagination;
  public filterHint: string;
  public filtering: boolean;
  private subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription.add(this.store.select('ingresos').subscribe(node => {
      this.loading = node.loading;
      this.ingresos = node.ingresos;
      this.pagination = node.pagination;
    }));
    this.store.dispatch(new ingresosActions.CargarIngresos(1));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getIngresos(page: number): void {
    if (!this.filtering) {
      this.store.dispatch(new ingresosActions.CargarIngresos(this.pagination.CurrentPage + page));
    } else {
      this.filter(page);
    }
  }

  public filter(page: number): void {
    if (this.filterHint.length) {
      this.filtering = true;
      this.store.dispatch(new ingresosActions.FiltrarIngresos(
        { hint: this.filterHint, page: !page ? 1 : this.pagination.CurrentPage + page }
      ));
    } else {
      this.filtering = false;
      this.store.dispatch(new ingresosActions.CargarIngresos(1));
    }
  }

}
