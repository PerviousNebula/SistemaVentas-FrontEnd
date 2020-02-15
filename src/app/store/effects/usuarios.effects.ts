import { Injectable } from '@angular/core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

// Services
import { UsersService } from '../../services/users.service';

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
    crearUsuarios = this.actions$.pipe(
        ofType(usuariosActions.CREAR_USUARIOS),
        switchMap((action: usuariosActions.CrearUsuarios) => {
            return this.usuariosService.createUsuarios(action.payload).pipe(
                map(() => new usuariosActions.CrearUsuariosSuccess()),
                catchError(error => of(new usuariosActions.CrearUsuariosFail(error)))
            );
        })
    );

    @Effect()
    mostrarUsuario = this.actions$.pipe(
        ofType(usuariosActions.MOSTRAR_USUARIOS),
        switchMap((action: usuariosActions.MostrarUsuarios) => {
            return this.usuariosService.createUsuarios(action.payload).pipe(
                map(() => new usuariosActions.MostrarUsuariosSuccess()),
                catchError(error => of(new usuariosActions.MostrarUsuariosFail(error)))
            );
        })
    );
}
