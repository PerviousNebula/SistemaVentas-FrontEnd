import { Injectable } from '@angular/core';
import { SuppliersService } from '../../services/suppliers.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as proveedoresActions from '../actions';

@Injectable()
export class ProveedoresEffects {

    constructor(private actions$: Actions,
                private proveedoresService: SuppliersService) { }

    @Effect()
    cargarProveedores = this.actions$.pipe(
        ofType(proveedoresActions.CARGAR_PROVEEDORES),
        switchMap((action: proveedoresActions.CargarProveedores) => {
            return this.proveedoresService.getProveedores(action.payload).pipe(
                map((resp: any) => new proveedoresActions.CargarProveedoresSuccess({
                    proveedores: resp.proveedores,
                    pagination: resp.pagination
                })),
                catchError(error => of(new proveedoresActions.CargarProveedoresFail(error)))
            );
        })
    );

    @Effect()
    filtrarProveedores = this.actions$.pipe(
        ofType(proveedoresActions.FILTRAR_PROVEEDORES),
        switchMap((action: proveedoresActions.FiltrarProveedores) => {
            return this.proveedoresService.filterProveedores(action.payload.hint, action.payload.page).pipe(
                map((resp: any) => new proveedoresActions.FiltrarProveedoresSuccess({
                    proveedores: resp.proveedores,
                    pagination: resp.pagination
                })),
                catchError(error => of(new proveedoresActions.FiltrarProveedoresFail(error)))
            );
        })
    );

    @Effect()
    crearProveedores = this.actions$.pipe(
        ofType(proveedoresActions.CREAR_PROVEEDORES),
        switchMap((action: proveedoresActions.CrearProveedores) => {
            return this.proveedoresService.createProveedores(action.payload).pipe(
                map((resp: any) => new proveedoresActions.CrearProveedoresSuccess({
                    proveedores: resp.proveedores,
                    pagination: resp.pagination
                })),
                catchError(error => of(new proveedoresActions.CrearProveedoresFail(error)))
            );
        })
    );

    @Effect()
    editarproveedores = this.actions$.pipe(
        ofType(proveedoresActions.EDITAR_PROVEEDORES),
        switchMap((action: proveedoresActions.EditarProveedores) => {
            return this.proveedoresService.editProveedores(action.payload).pipe(
                map((resp: any) => new proveedoresActions.EditarProveedoresSuccess({
                    proveedores: resp.proveedores,
                    pagination: resp.pagination
                })),
                catchError(error => of(new proveedoresActions.EditarProveedoresFail(error)))
            );
        })
    );
}
