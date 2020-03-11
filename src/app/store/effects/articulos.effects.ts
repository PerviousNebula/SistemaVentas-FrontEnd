import { Injectable } from '@angular/core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

// Services
import { ProductsService } from '../../services/pages/products/products.service';

// NGRX
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as articulosActions from '../actions';

@Injectable()
export class ArticulosEffects {

    constructor(private actions$: Actions,
                private articulosService: ProductsService) { }

    @Effect()
    cargarArticulos$ = this.actions$.pipe(
        ofType(articulosActions.CARGAR_ARTICULOS),
        switchMap((action: articulosActions.CargarArticulos) => {
            return this.articulosService.getArticulos(action.payload).pipe(
                map((resp: any) => new articulosActions.CargarArticulosSuccess(
                        { articulos: resp.articulos, pagination: resp.pagination })
                    ),
                catchError(error => of(new articulosActions.CargarArticulosFail(error)))
            );
        })
    );

    @Effect()
    crearArticulos$ = this.actions$.pipe(
        ofType(articulosActions.CREAR_ARTICULOS),
        switchMap((action: articulosActions.CrearArticulos) => {
            return this.articulosService.createArticulos(action.payload).pipe(
                map((resp: any) => new articulosActions.CrearArticulosSuccess(
                        { articulos: resp.articulos, pagination: resp.pagination })
                    ),
                catchError(error => of(new articulosActions.CrearArticulosFail(error)))
            );
        })
    );

    @Effect()
    editarArticulos$ = this.actions$.pipe(
        ofType(articulosActions.EDITAR_ARTICULOS),
        switchMap((action: articulosActions.EditarArticulos) => {
            return this.articulosService.editArticulos(action.payload).pipe(
                map((resp: any) => new articulosActions.EditarArticulosSuccess(
                    {articulos: resp.articulos, pagination: resp.pagination}
                )),
                catchError(error => of(new articulosActions.EditarArticulosFail(error)))
            );
        })
    );

    @Effect()
    filtrarArticulos$ = this.actions$.pipe(
        ofType(articulosActions.FILTRAR_ARTICULOS),
        switchMap((action: articulosActions.FiltrarArticulos) => {
            return this.articulosService.filterArticulos(action.payload.model, action.payload.page).pipe(
                map((resp: any) => new articulosActions.FiltrarArticulosSuccess({articulos: resp.articulos, pagination: resp.pagination})),
                catchError(error => of(new articulosActions.FiltrarArticulosFail(error)))
            );
        })
    );

    @Effect()
    activarArticulos$ = this.actions$.pipe(
        ofType(articulosActions.ACTIVAR_ARTICULOS),
        switchMap((action: articulosActions.ActivarArticulos) => {
            return this.articulosService.activateArticulo(action.payload.idArticulo).pipe(
                map(() => new articulosActions.ActivarArticulosSuccess(action.payload)),
                catchError(error => of(new articulosActions.ActivarArticulosFail(error)))
            );
        })
    );

    @Effect()
    desactivarArticulos$ = this.actions$.pipe(
        ofType(articulosActions.DESACTIVAR_ARTICULOS),
        switchMap((action: articulosActions.DesactivarArticulos) => {
            return this.articulosService.desactivateArticulo(action.payload.idArticulo).pipe(
                map(() => new articulosActions.DesactivarArticulosSuccess(action.payload)),
                catchError(error => of(new articulosActions.DesactivarArticulosFail(error)))
            );
        })
    );
}
