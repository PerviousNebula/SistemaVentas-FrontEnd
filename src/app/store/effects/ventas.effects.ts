import { Injectable } from '@angular/core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

// Interfaces
import { Venta } from 'src/app/interfaces/interfaces.index';

// Services
import { SellsService } from '../../services/pages/sells/sells.service';

// NGRX
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as ventasActions from '../actions';

@Injectable()
export class VentasEffects {

    constructor(private actions$: Actions,
                private ventasService: SellsService) { }

    @Effect()
    cargarVentas$ = this.actions$.pipe(
        ofType(ventasActions.CARGAR_VENTAS),
        switchMap((action: ventasActions.CargarVentas) => {
            return this.ventasService.getVentas(action.payload).pipe(
                map((resp: any) => new ventasActions.CargarVentasSuccess(
                    { ventas: resp.ventas, pagination: resp.pagination })
                ),
                catchError(error => of(new ventasActions.CargarVentasFail(error)))
            );
        })
    );

    @Effect()
    mostrarVenta$ = this.actions$.pipe(
        ofType(ventasActions.MOSTRAR_VENTAS),
        switchMap((action: ventasActions.MostrarVentas) => {
            return this.ventasService.getVenta(action.payload).pipe(
                map((resp: Venta) => new ventasActions.MostrarVentasSuccess(resp)),
                catchError(error => of(new ventasActions.MostrarVentasFail(error)))
            );
        })
    );

    @Effect()
    crearVentas$ = this.actions$.pipe(
        ofType(ventasActions.CREAR_VENTAS),
        switchMap((action: ventasActions.CrearVentas) => {
            return this.ventasService.createVenta(action.payload).pipe(
                map((resp: any) => new ventasActions.CrearVentasSuccess(
                    { ventas: resp.ventas, pagination: resp.pagination })
                ),
                catchError(error => of(new ventasActions.CrearVentasFail(error)))
            );
        })
    );

    @Effect()
    filtrarVentas$ = this.actions$.pipe(
        ofType(ventasActions.FILTRAR_VENTAS),
        switchMap((action: ventasActions.FiltrarVentas) => {
            return this.ventasService.filterVentas(action.payload.hint, action.payload.page).pipe(
                map((resp: any) => new ventasActions.FiltrarVentasSuccess(
                    { ventas: resp.ventas, pagination: resp.pagination })
                ),
                catchError(error => of(new ventasActions.FiltrarVentasFail(error)))
            );
        })
    );

    @Effect()
    anularVentas$ = this.actions$.pipe(
        ofType(ventasActions.ANULAR_VENTAS),
        switchMap((action: ventasActions.AnularVentas) => {
            return this.ventasService.desactivateVenta(action.payload).pipe(
                map(() => new ventasActions.AnularVentasSuccess(action.payload)),
                catchError(error => of(new ventasActions.AnularVentasFail(error)))
            );
        })
    );
}
