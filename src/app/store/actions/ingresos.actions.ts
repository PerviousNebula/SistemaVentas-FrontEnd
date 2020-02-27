import { Action } from '@ngrx/store';
import { Ingreso } from '../../interfaces/interfaces.index';

export const CARGAR_INGRESOS = '[Ingresos] Cargar ingresos';
export const CARGAR_INGRESOS_FAIL = '[Ingresos] Cargar ingresos FAIL';
export const CARGAR_INGRESOS_SUCCESS = '[Ingresos] Cargar ingresos SUCCESS';

export const MOSTRAR_INGRESOS = '[Ingresos] Mostrar ingreso';
export const MOSTRAR_INGRESOS_FAIL = '[Ingresos] Mostrar ingreso FAIL';
export const MOSTRAR_INGRESOS_SUCCESS = '[Ingresos] Mostrar ingreso SUCCESS';

export const CREAR_INGRESOS = '[Ingresos] Crear ingresos';
export const CREAR_INGRESOS_FAIL = '[Ingresos] Crear ingresos FAIL';
export const CREAR_INGRESOS_SUCCESS = '[Ingresos] Crear ingresos SUCCESS';

export const FILTRAR_INGRESOS = '[Ingresos] Filtrar ingresos';
export const FILTRAR_INGRESOS_FAIL = '[Ingresos] Filtrar ingresos FAIL';
export const FILTRAR_INGRESOS_SUCCESS = '[Ingresos] Filtrar ingresos SUCCESS';

export class CargarIngresos implements Action {
    readonly type = CARGAR_INGRESOS;

    constructor(public payload: any) { }
}

export class CargarIngresosFail implements Action {
    readonly type = CARGAR_INGRESOS_FAIL;

    constructor(public payload?: any) { }
}

export class CargarIngresosSuccess implements Action {
    readonly type = CARGAR_INGRESOS_SUCCESS;

    constructor(public payload: any) { }
}

export class MostrarIngresos implements Action {
    readonly type = MOSTRAR_INGRESOS;

    constructor(public payload: any) { }
}

export class MostrarIngresosFail implements Action {
    readonly type = MOSTRAR_INGRESOS_FAIL;

    constructor(public payload?: any) { }
}

export class MostrarIngresosSuccess implements Action {
    readonly type = MOSTRAR_INGRESOS_SUCCESS;

    constructor(public payload: any) { }
}

export class CrearIngresos implements Action {
    readonly type = CREAR_INGRESOS;

    constructor(public payload: any) { }
}

export class CrearIngresosFail implements Action {
    readonly type = CREAR_INGRESOS_FAIL;

    constructor(public payload?: any) { }
}

export class CrearIngresosSuccess implements Action {
    readonly type = CREAR_INGRESOS_SUCCESS;

    constructor(public payload: any) { }
}

export class FiltrarIngresos implements Action {
    readonly type = FILTRAR_INGRESOS;

    constructor(public payload: any) { }
}

export class FiltrarIngresosFail implements Action {
    readonly type = FILTRAR_INGRESOS_FAIL;

    constructor(public payload?: any) { }
}

export class FiltrarIngresosSuccess implements Action {
    readonly type = FILTRAR_INGRESOS_SUCCESS;

    constructor(public payload: any) { }
}

export type ingresosAcciones = CargarIngresos |
                               CargarIngresosFail |
                               CargarIngresosSuccess |
                               MostrarIngresos |
                               MostrarIngresosFail |
                               MostrarIngresosSuccess |
                               CrearIngresos |
                               CrearIngresosFail |
                               CrearIngresosSuccess |
                               FiltrarIngresos |
                               FiltrarIngresosFail |
                               FiltrarIngresosSuccess;
