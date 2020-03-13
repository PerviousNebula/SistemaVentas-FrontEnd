import { Injectable } from '@angular/core';
import { ClientsService } from '../../services/pages/clients/clients.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as clientesActions from '../actions';

@Injectable()
export class ClientesEffects {

    constructor(private actions$: Actions,
                private clientesService: ClientsService) { }

    @Effect()
    cargarClientes = this.actions$.pipe(
        ofType(clientesActions.CARGAR_CLIENTES),
        switchMap((action: clientesActions.CargarClientes) => {
            return this.clientesService.getClientes(action.payload.page, action.payload.pageSize).pipe(
                map((resp: any) => new clientesActions.CargarClientesSuccess({
                    clientes: resp.clientes,
                    pagination: resp.pagination
                })),
                catchError(error => of(new clientesActions.CargarClientesFail(error)))
            );
        })
    );

    @Effect()
    filtrarClientes = this.actions$.pipe(
        ofType(clientesActions.FILTRAR_CLIENTES),
        switchMap((action: clientesActions.FiltrarClientes) => {
            return this.clientesService.filterClientes(action.payload.model, action.payload.page).pipe(
                map((resp: any) => new clientesActions.FiltrarClientesSuccess({
                    clientes: resp.clientes,
                    pagination: resp.pagination
                })),
                catchError(error => of(new clientesActions.FiltrarClientesFail(error)))
            );
        })
    );

    @Effect()
    crearClientes = this.actions$.pipe(
        ofType(clientesActions.CREAR_CLIENTES),
        switchMap((action: clientesActions.CrearClientes) => {
            return this.clientesService.createClientes(action.payload).pipe(
                map((resp: any) => new clientesActions.CrearClientesSuccess({
                    clientes: resp.clientes,
                    pagination: resp.pagination
                })),
                catchError(error => of(new clientesActions.CrearClientesFail(error)))
            );
        })
    );

    @Effect()
    editarClientes = this.actions$.pipe(
        ofType(clientesActions.EDITAR_CLIENTES),
        switchMap((action: clientesActions.EditarClientes) => {
            return this.clientesService.editClientes(action.payload).pipe(
                map((resp: any) => new clientesActions.EditarClientesSuccess({
                    clientes: resp.clientes,
                    pagination: resp.pagination
                })),
                catchError(error => of(new clientesActions.EditarClientesFail(error)))
            );
        })
    );
}
