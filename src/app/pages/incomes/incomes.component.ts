import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingreso, Pagination } from '../../interfaces/interfaces.index';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

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
  public filterHint = '';
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

  public desactivateIngreso({ idIngreso}: Ingreso): void {
    Swal.fire({
      title: 'Anular Ingreso',
      text: '¿Está seguro que deseas anular este ingreso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, anular!'
    }).then(resp => {
      if (resp.value) {
        this.store.dispatch(new ingresosActions.AnularIngresos(idIngreso));
      }
    });
  }

  public downloadPDF(): void {
    window.location.href = this.filterHint.length ? `${environment.url}/pdfcreator/Ingresos?filter=${this.filterHint}`
                                                  : `${environment.url}/pdfcreator/Ingresos`;
  }

}
