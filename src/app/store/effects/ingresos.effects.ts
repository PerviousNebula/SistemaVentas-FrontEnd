import { Injectable } from '@angular/core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

// Interfaces
import { Ingreso } from '../../interfaces/interfaces.index';

// Services
import { IncomesService } from '../../services/pages/incomes/incomes.service';

// NGRX
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as ingresosActions from '../actions';

@Injectable()
export class IngresosEffects {

    constructor(private actions$: Actions,
                private ingresosService: IncomesService) { }

    @Effect()
    cargarIngresos$ = this.actions$.pipe(
        ofType(ingresosActions.CARGAR_INGRESOS),
        switchMap((action: ingresosActions.CargarIngresos) => {
            return this.ingresosService.getIngresos(action.payload).pipe(
                map((resp: any) => new ingresosActions.CargarIngresosSuccess(
                    { ingresos: resp.ingresos, pagination: resp.pagination })
                ),
                catchError(error => of(new ingresosActions.CargarIngresosFail(error)))
            );
        })
    );

    @Effect()
    mostrarIngreso$ = this.actions$.pipe(
        ofType(ingresosActions.MOSTRAR_INGRESOS),
        switchMap((action: ingresosActions.MostrarIngresos) => {
            return this.ingresosService.getIngreso(action.payload).pipe(
                map((resp: Ingreso) => new ingresosActions.MostrarIngresosSuccess(resp)),
                catchError(error => of(new ingresosActions.MostrarIngresosFail(error)))
            );
        })
    );

    @Effect()
    crearIngresos$ = this.actions$.pipe(
        ofType(ingresosActions.CREAR_INGRESOS),
        switchMap((action: ingresosActions.CrearIngresos) => {
            return this.ingresosService.createIngreso(action.payload).pipe(
                map((resp: any) => new ingresosActions.CrearIngresosSuccess(
                    { ingresos: resp.ingresos, pagination: resp.pagination })
                ),
                catchError(error => of(new ingresosActions.CrearIngresosFail(error)))
            );
        })
    );

    @Effect()
    filtrarIngresos$ = this.actions$.pipe(
        ofType(ingresosActions.FILTRAR_INGRESOS),
        switchMap((action: ingresosActions.FiltrarIngresos) => {
            return this.ingresosService.filterIngresos(action.payload.model, action.payload.page).pipe(
                map((resp: any) => new ingresosActions.FiltrarIngresosSuccess(
                    { ingresos: resp.ingresos, pagination: resp.pagination })
                ),
                catchError(error => of(new ingresosActions.FiltrarIngresosFail(error)))
            );
        })
    );

    @Effect()
    anularIngresos$ = this.actions$.pipe(
        ofType(ingresosActions.ANULAR_INGRESOS),
        switchMap((action: ingresosActions.AnularIngresos) => {
            return this.ingresosService.desactivateIngreso(action.payload).pipe(
                map(() => new ingresosActions.AnularIngresosSuccess(action.payload)),
                catchError(error => of(new ingresosActions.AnularIngresosFail(error)))
            );
        })
    );
}
