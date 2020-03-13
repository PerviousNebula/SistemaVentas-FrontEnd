import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

// Interfaces
import { Venta, Persona, Pagination } from '../../interfaces/interfaces.index';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as ventasActions from '../../store/actions';

@Component({
  selector: 'app-sells',
  templateUrl: './sells.component.html'
})
export class SellsComponent implements OnInit, OnDestroy {
  public ventas: Venta[];
  public clientes: Persona[];
  public loading: boolean;
  public pagination: Pagination;
  private subscription = new Subscription();

  // Filtrado
  public filterForm: FormGroup;
  public filterSubmited = false;

  constructor(private store: Store<AppState>) {
    this.filterForm = new FormGroup({
      idCliente: new FormControl(0),
      tipo_comprobante: new FormControl(''),
      serie_comprobante: new FormControl(''),
      num_comprobante: new FormControl(''),
      fecha_inicio: new FormControl(null),
      fecha_fin: new FormControl(null),
      activo: new FormControl(true)
    });
    this.subscription.add(this.store.select('ventas').subscribe(node => {
      this.loading = node.loading;
      this.ventas = node.ventas;
      this.pagination = node.pagination;
    }));
    this.subscription.add(this.store.select('clientes').subscribe(node => this.clientes = node.clientes));
    this.store.dispatch(new ventasActions.CargarVentas(1));
    this.store.dispatch(new ventasActions.CargarClientes(1));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getVentas(page: number): void {
    if (!this.filterSubmited) {
      this.store.dispatch(new ventasActions.CargarVentas(this.pagination.CurrentPage + page));
    } else {
      this.filter(page);
    }
  }

  public filter(page?: number): void {
    this.filterSubmited = true;
    this.store.dispatch(new ventasActions.FiltrarVentas({
      model: this.filterForm.value,
      page: !page ? 1 : this.pagination.CurrentPage + page
    }));
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

  public printPDFVentas(): void {
    if (this.filterSubmited) {
      const filter = this.filterForm.value;
      let url = `${environment.url}/pdfcreator/ventas?activo=${filter.activo}`;
      if (filter.idCliente > 0) {  url += `&idCliente=${filter.idCliente}`; }
      if (filter.tipo_comprobante) {  url += `&tipo_comprobante=${filter.tipo_comprobante}`; }
      if (filter.serie_comprobante) {  url += `&serie_comprobante=${filter.serie_comprobante}`; }
      if (filter.num_comprobante) {  url += `&num_comprobante=${filter.num_comprobante}`; }
      if (filter.fecha_inicio) {  url += `&fecha_inicio=${filter.fecha_inicio}`; }
      if (filter.fecha_fin) {  url += `&fecha_fin=${filter.fecha_fin}`; }
      window.open(url);
    } else {
      window.open(`${environment.url}/pdfcreator/ventas?filtered=false`);
    }
  }

  public printExcelVentas(): void {
    if (this.filterSubmited) {
      const filter = this.filterForm.value;
      let url = `${environment.url}/csvcreator/ventas?activo=${filter.activo}`;
      if (filter.idCliente > 0) {  url += `&idCliente=${filter.idCliente}`; }
      if (filter.tipo_comprobante) {  url += `&tipo_comprobante=${filter.tipo_comprobante}`; }
      if (filter.serie_comprobante) {  url += `&serie_comprobante=${filter.serie_comprobante}`; }
      if (filter.num_comprobante) {  url += `&num_comprobante=${filter.num_comprobante}`; }
      if (filter.fecha_inicio) {  url += `&fecha_inicio=${filter.fecha_inicio}`; }
      if (filter.fecha_fin) {  url += `&fecha_fin=${filter.fecha_fin}`; }
      window.open(url);
    } else {
      window.open(`${environment.url}/csvcreator/ventas?filtered=false`);
    }
  }

  public printVenta({ idVenta }: Venta): void {
    window.open(`${environment.url}/pdfcreator/venta/${idVenta}`, '_blank');
  }

  public resetAll(): void {
    this.filterForm.reset();
    this.filterForm.patchValue({ idCliente: 0, tipo_comprobante: '', activo: true });
    this.filterSubmited = false;
    this.store.dispatch(new ventasActions.CargarVentas(1));
  }

}
