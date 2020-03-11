import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

// Interfaces
import { Pagination, Venta } from '../../interfaces/interfaces.index';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as ventasActions from '../../store/actions';

@Component({
  selector: 'app-sells',
  templateUrl: './sells.component.html'
})
export class SellsComponent implements OnInit {
  public ventas: Venta[];
  public loading: boolean;
  public pagination: Pagination;
  public filterHint = '';
  public filtering: boolean;

  constructor(private store: Store<AppState>) {
    this.store.select('ventas').subscribe(node => {
      this.loading = node.loading;
      this.ventas = node.ventas;
      this.pagination = node.pagination;
    });
    this.store.dispatch(new ventasActions.CargarVentas(1));
  }

  ngOnInit() {
  }

  public getVentas(page: number): void {
    if (!this.filtering) {
      this.store.dispatch(new ventasActions.CargarVentas(this.pagination.CurrentPage + page));
    } else {
      this.filter(page);
    }
  }

  public filter(page: number): void {
    if (this.filterHint.length) {
      this.filtering = true;
      this.store.dispatch(new ventasActions.FiltrarVentas(
        { hint: this.filterHint, page: !page ? 1 : this.pagination.CurrentPage + page }
      ));
    } else {
      this.filtering = false;
      this.store.dispatch(new ventasActions.CargarVentas(1));
    }
  }

  public desactivateVenta({ idVenta}: Venta): void {
    Swal.fire({
      title: 'Anular Venta',
      text: '¿Está seguro que deseas anular esta venta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, anular!'
    }).then(resp => {
      if (resp.value) {
        this.store.dispatch(new ventasActions.AnularVentas(idVenta));
      }
    });
  }

  public printVentas(): void {
    window.open(this.filterHint.length ? `${environment.url}/pdfcreator/Ventas?filter=${this.filterHint}`
                                       : `${environment.url}/pdfcreator/Ventas`, '_blank');
  }

  public printVenta({ idVenta }: Venta): void {
    window.open(`${environment.url}/pdfcreator/venta/${idVenta}`, '_blank');
  }

}
