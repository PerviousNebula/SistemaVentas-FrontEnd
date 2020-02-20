import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces.index';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

// Services
import { UsersService } from '../../services/pages/users/users.service';

// NGRX
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';

@Injectable()
export class UsuariosEffects {
    constructor(private actions$: Actions,
                private usuariosService: UsersService) { }

    @Effect()
    cargarUsuarios = this.actions$.pipe(
        ofType(usuariosActions.CARGAR_USUARIOS),
        switchMap((action: usuariosActions.CargarUsuarios) => {
            return this.usuariosService.getUsuarios(action.payload).pipe(
                map((resp: any) => new usuariosActions.CargarUsuariosSuccess(
                    {
                        usuarios: resp.usuarios,
                        pagination: resp.pagination
                    })
                ),
                catchError(error => of(new usuariosActions.CargarUsuariosFail(error)))
            );
        })
    );

    @Effect()
    filtrarUsuarios = this.actions$.pipe(
        ofType(usuariosActions.FILTRAR_USUARIOS),
        switchMap((action: usuariosActions.FiltrarUsuarios) => {
            return this.usuariosService.filtrarUsuarios(action.payload.hint, action.payload.page).pipe(
                map((resp: any) => new usuariosActions.FiltrarUsuariosSuccess(
                    {
                        usuarios: resp.usuarios,
                        pagination: resp.pagination
                    })
                ),
                catchError(error => of(new usuariosActions.FiltrarUsuariosFail(error)))
            );
        })
    );

    @Effect()
    crearUsuarios = this.actions$.pipe(
        ofType(usuariosActions.CREAR_USUARIOS),
        switchMap((action: usuariosActions.CrearUsuarios) => {
            return this.usuariosService.createUsuarios(action.payload).pipe(
                map((resp: any) => new usuariosActions.CrearUsuariosSuccess(resp)),
                catchError(error => of(new usuariosActions.CrearUsuariosFail(error)))
            );
        })
    );

    @Effect()
    editarUsuarios = this.actions$.pipe(
        ofType(usuariosActions.EDITAR_USUARIOS),
        switchMap((action: usuariosActions.EditarUsuarios) => {
            return this.usuariosService.editUsuario(action.payload).pipe(
                map((resp: any) => new usuariosActions.EditarUsuariosSuccess(resp)),
                catchError(error => of(new usuariosActions.EditarUsuariosFail(error)))
            );
        })
    );

    @Effect()
    mostrarUsuario = this.actions$.pipe(
        ofType(usuariosActions.MOSTRAR_USUARIOS),
        switchMap((action: usuariosActions.MostrarUsuarios) => {
            return this.usuariosService.getUsuario(action.payload).pipe(
                map((resp: Usuario) => new usuariosActions.MostrarUsuariosSuccess(resp)),
                catchError(error => of(new usuariosActions.MostrarUsuariosFail(error)))
            );
        })
    );

    @Effect()
    activarUsuario = this.actions$.pipe(
        ofType(usuariosActions.ACTIVAR_USUARIOS),
        switchMap((action: usuariosActions.ActivarUsuarios) => {
            return this.usuariosService.activarUsuario(action.payload.idUsuario).pipe(
                map(() => new usuariosActions.ActivarUsuariosSuccess(action.payload.idUsuario)),
                catchError(error => of(new usuariosActions.ActivarUsuariosFail(error)))
            );
        })
    );

    @Effect()
    desactivarUsuario = this.actions$.pipe(
        ofType(usuariosActions.DESACTIVAR_USUARIOS),
        switchMap((action: usuariosActions.DesactivarUsuarios) => {
            return this.usuariosService.desactivarUsuario(action.payload.idUsuario).pipe(
                map(() => new usuariosActions.DesactivarUsuariosSuccess(action.payload.idUsuario)),
                catchError(error => of(new usuariosActions.DesactivarUsuariosFail(error)))
            );
        })
    );
}
