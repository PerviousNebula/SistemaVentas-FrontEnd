import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

// Services
import { FilterService } from '../../services/service.index';

// Interfaces
import { Categoria, Ingreso, Usuario, Articulo, Venta } from 'src/app/interfaces/interfaces.index';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as searchActions from '../../store/actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  public filtrado: any;
  public loading: boolean;
  private subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute,
              public filterService: FilterService,
              private store: Store<AppState>) {
    this.subscription.add(this.activatedRoute.params.subscribe(params => this.filterAll(params.hint)));
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public filterAll(hint: string): void {
    this.loading = true;
    this.subscription.add(this.filterService.filterAll(hint).subscribe(resp => {
      this.filtrado = resp;
      this.loading = false;
    }));
  }

  public desactivarCategoria(categoria: Categoria): void {
    Swal.fire({
      title: 'Desactivar categoría',
      text: `¿Está seguro que desea desactivar la categoria ${categoria.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, desactivar!'
    }).then((result) => {
      if (result.value) {
        categoria.activo = false;
        this.store.dispatch(new searchActions.DesactivarCategorias(categoria));
      }
    });
  }

  public activateCategoria(categoria: Categoria): void {
    categoria.activo = true;
    this.store.dispatch(new searchActions.ActivarCategorias(categoria));
  }

  public desactivateArticulo(articulo: Articulo): void {
    Swal.fire({
      title: 'Desactivar artículo',
      text: `¿Está seguro que desea desactivar el artículo ${articulo.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, desactivar!'
    }).then((result) => {
      if (result.value) {
        articulo.activo = false;
        this.store.dispatch(new searchActions.DesactivarArticulos(articulo));
      }
    });
  }

  public activateArticulo(articulo: Articulo): void {
    articulo.activo = true;
    this.store.dispatch(new searchActions.ActivarArticulos(articulo));
  }

  public activarUsuario(usuario: Usuario): void {
    usuario.activo = true;
    this.store.dispatch(new searchActions.ActivarUsuarios(usuario));
  }

  public async desactivarUsuario(usuario: Usuario) {
    Swal.fire({
      title: 'Desactivar usuario',
      text: `¿Está seguro que desea desactivar el usuario ${usuario.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, desactivar!'
    }).then(result => {
      if (result.value) {
        usuario.activo = false;
        this.store.dispatch(new searchActions.DesactivarUsuarios(usuario));
      }
    });
  }

  public desactivateIngreso(ingreso: Ingreso): void {
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
        ingreso.estado = 'Anulado';
        this.store.dispatch(new searchActions.AnularIngresos(ingreso.idIngreso));
      }
    });
  }

  public desactivateVenta(venta: Venta): void {
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
        venta.estado = 'Anulado';
        this.store.dispatch(new searchActions.AnularVentas(venta.idVenta));
      }
    });
  }

}
