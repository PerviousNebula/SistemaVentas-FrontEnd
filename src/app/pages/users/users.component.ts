import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario, Pagination } from 'src/app/interfaces/interfaces.index';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

// Services
import { ImageOverlayService } from '../../components/image-overlay/image-overlay.service';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as usuariosActions from '../../store/actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {
  public usuarios: Usuario[];
  public pagination: Pagination;
  public loading: boolean;
  private filtering: boolean;
  public filterHint: string;
  private subscription = new Subscription();

  constructor(private store: Store<AppState>,
              public imgOverlayService: ImageOverlayService) { }

  ngOnInit() {
    this.subscription.add(this.store.select('usuarios').subscribe(node => {
      this.usuarios = node.usuarios;
      this.pagination = node.pagination;
      this.loading = node.loading;
    }));
    this.store.dispatch(new usuariosActions.CargarUsuarios(1));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getUsuarios(page: number) {
    if (!this.filtering) {
      this.store.dispatch(new usuariosActions.CargarUsuarios(this.pagination.CurrentPage + page));
    } else {
      this.filtrar(page);
    }
  }

  public filtrar(page: number = 0) {
    if (this.filterHint.length) {
      this.filtering = true;
      this.store.dispatch(new usuariosActions.FiltrarUsuarios(
        {
          hint: this.filterHint,
          page: !page ? 1 : this.pagination.CurrentPage + page
        }
      ));
    } else {
      this.filtering = false;
      this.store.dispatch(new usuariosActions.CargarUsuarios(1));
    }
  }

  public activarUsuario(usuario: Usuario) {
    this.store.dispatch(new usuariosActions.ActivarUsuarios(usuario));
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
    }).then((result) => {
      if (result.value) {
        usuario.activo = false;
        this.store.dispatch(new usuariosActions.DesactivarUsuarios(usuario));
      }
    });
  }

}
