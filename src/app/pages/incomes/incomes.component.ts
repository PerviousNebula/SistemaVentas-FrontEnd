import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

// Interfaces
import { Ingreso, Persona, Pagination } from '../../interfaces/interfaces.index';

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
  public proveedores: Persona[];
  public loading: boolean;
  public pagination: Pagination;
  private subscription = new Subscription();

  // Filtrado
  public filterForm: FormGroup;
  public filterSubmited = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.filterForm = new FormGroup({
      idProveedor: new FormControl(0),
      tipo_comprobante: new FormControl(''),
      serie_comprobante: new FormControl(''),
      num_comprobante: new FormControl(''),
      fecha_inicio: new FormControl(null),
      fecha_fin: new FormControl(null),
      activo: new FormControl(true)
    });
    this.subscription.add(this.store.select('ingresos').subscribe(node => {
      this.loading = node.loading;
      this.ingresos = node.ingresos;
      this.pagination = node.pagination;
    }));
    this.subscription.add(this.store.select('proveedores').subscribe(node => this.proveedores = node.proveedores));
    this.store.dispatch(new ingresosActions.CargarIngresos(1));
    this.store.dispatch(new ingresosActions.CargarProveedores({ pageNumber: 1, pageSize: 50 }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public get filterFormValue(): any {
    return this.filterForm.value;
  }

  public getIngresos(page: number): void {
    if (!this.filterSubmited) {
      this.store.dispatch(new ingresosActions.CargarIngresos(this.pagination.CurrentPage + page));
    } else {
      this.filter(page);
    }
  }

  public filter(page?: number): void {
    this.filterSubmited = true;
    this.store.dispatch(new ingresosActions.FiltrarIngresos({
      model: this.filterForm.value,
      page: !page ? 1 : this.pagination.CurrentPage + page
    }));
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

  public resetAll(): void {
    this.filterForm.reset();
    this.filterForm.patchValue({ idProveedor: 0, tipo_comprobante: '', activo: true });
    this.filterSubmited = false;
    this.store.dispatch(new ingresosActions.CargarIngresos(1));
  }

  public printPDFIncomes(): void {
    if (this.filterSubmited) {
      const filter = this.filterFormValue;
      let url = `${environment.url}/pdfcreator/ingresos?activo=${filter.activo}`;
      if (filter.idProveedor > 0) { url += `&idProveedor=${filter.idProveedor}`; }
      if (filter.tipo_comprobante) { url += `&tipo_comprobante=${filter.tipo_comprobante}`; }
      if (filter.serie_comprobante) { url += `&serie_comprobante=${filter.serie_comprobante}`; }
      if (filter.num_comprobante) { url += `&num_comprobante=${filter.num_comprobante}`; }
      if (filter.fecha_inicio) { url += `&fecha_inicio=${filter.fecha_inicio}`; }
      if (filter.fecha_fin) { url += `&fecha_fin=${filter.fecha_fin}`; }
      window.open(url, '_blank');
    } else {
      window.open(`${environment.url}/pdfcreator/ingresos?filtered=false`, '_blank');
    }
  }

  public printExcelIncomes(): void {
    if (this.filterSubmited) {
      const filter = this.filterFormValue;
      let url = `${environment.url}/csvcreator/ingresos?activo=${filter.activo}`;
      if (filter.idProveedor > 0) { url += `&idProveedor=${filter.idProveedor}`; }
      if (filter.tipo_comprobante) { url += `&tipo_comprobante=${filter.tipo_comprobante}`; }
      if (filter.serie_comprobante) { url += `&serie_comprobante=${filter.serie_comprobante}`; }
      if (filter.num_comprobante) { url += `&num_comprobante=${filter.num_comprobante}`; }
      if (filter.fecha_inicio) { url += `&fecha_inicio=${filter.fecha_inicio}`; }
      if (filter.fecha_fin) { url += `&fecha_fin=${filter.fecha_fin}`; }
      window.open(url);
    } else {
      window.open(`${environment.url}/csvcreator/ingresos?filtered=false`);
    }
  }

}
