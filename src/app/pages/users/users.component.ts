import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

// Interfaces
import { Usuario, Rol, Pagination } from 'src/app/interfaces/interfaces.index';

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
  public roles: Rol[];
  public pagination: Pagination;
  public loading: boolean;
  private subscription = new Subscription();

  // Filter
  public filterForm: FormGroup;
  private filterSubmited = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.filterForm = new FormGroup({
      nombre: new FormControl(''),
      email: new FormControl(''),
      telefono: new FormControl(''),
      idRol: new FormControl(0),
      activo: new FormControl(true)
    });
    this.subscription.add(this.store.select('usuarios').subscribe(node => {
      this.usuarios = node.usuarios;
      this.pagination = node.pagination;
      this.loading = node.loading;
    }));
    this.subscription.add(this.store.select('roles').subscribe(node => this.roles = node.roles));
    this.store.dispatch(new usuariosActions.CargarUsuarios(1));
    this.store.dispatch(new usuariosActions.CargarRoles(1));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getUsuarios(page: number): void {
    if (!this.filterSubmited) {
      this.store.dispatch(new usuariosActions.CargarUsuarios(this.pagination.CurrentPage + page));
    } else {
      this.filtrar(page);
    }
  }

  public filtrar(page: number = 0): void {
    this.filterSubmited = true;
    this.store.dispatch(new usuariosActions.FiltrarUsuarios({
        model: this.filterForm.value,
        page: !page ? 1 : this.pagination.CurrentPage + page
    }));
  }

  public activarUsuario(usuario: Usuario): void {
    usuario.activo = true;
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

  public resetAll(): void {
    this.filterForm.reset();
    this.filterForm.patchValue({ idRol: 0, activo: true });
    this.store.dispatch(new usuariosActions.CargarUsuarios(1));
  }

}
