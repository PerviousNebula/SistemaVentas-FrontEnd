import { Action } from '@ngrx/store';

export const CARGAR_VENTAS = '[Ventas] Cargar ventas';
export const CARGAR_VENTAS_FAIL = '[Ventas] Cargar ventas FAIL';
export const CARGAR_VENTAS_SUCCESS = '[Ventas] Cargar ventas SUCCESS';

export const MOSTRAR_VENTAS = '[Ventas] Mostrar venta';
export const MOSTRAR_VENTAS_FAIL = '[Ventas] Mostrar venta FAIL';
export const MOSTRAR_VENTAS_SUCCESS = '[Ventas] Mostrar venta SUCCESS';

export const CREAR_VENTAS = '[Ventas] Crear ventas';
export const CREAR_VENTAS_FAIL = '[Ventas] Crear ventas FAIL';
export const CREAR_VENTAS_SUCCESS = '[Ventas] Crear ventas SUCCESS';

export const FILTRAR_VENTAS = '[Ventas] Filtrar ventas';
export const FILTRAR_VENTAS_FAIL = '[Ventas] Filtrar ventas FAIL';
export const FILTRAR_VENTAS_SUCCESS = '[Ventas] Filtrar ventas SUCCESS';

export const ANULAR_VENTAS = '[Ventas] Anular ventas';
export const ANULAR_VENTAS_FAIL = '[Ventas] Anular ventas FAIL';
export const ANULAR_VENTAS_SUCCESS = '[Ventas] Anular ventas SUCCESS';

export class CargarVentas implements Action {
    readonly type = CARGAR_VENTAS;

    constructor(public payload: any) { }
}

export class CargarVentasFail implements Action {
    readonly type = CARGAR_VENTAS_FAIL;

    constructor(public payload?: any) { }
}

export class CargarVentasSuccess implements Action {
    readonly type = CARGAR_VENTAS_SUCCESS;

    constructor(public payload: any) { }
}

export class MostrarVentas implements Action {
    readonly type = MOSTRAR_VENTAS;

    constructor(public payload: any) { }
}

export class MostrarVentasFail implements Action {
    readonly type = MOSTRAR_VENTAS_FAIL;

    constructor(public payload?: any) { }
}

export class MostrarVentasSuccess implements Action {
    readonly type = MOSTRAR_VENTAS_SUCCESS;

    constructor(public payload: any) { }
}

export class CrearVentas implements Action {
    readonly type = CREAR_VENTAS;

    constructor(public payload: any) { }
}

export class CrearVentasFail implements Action {
    readonly type = CREAR_VENTAS_FAIL;

    constructor(public payload?: any) { }
}

export class CrearVentasSuccess implements Action {
    readonly type = CREAR_VENTAS_SUCCESS;

    constructor(public payload: any) { }
}

export class FiltrarVentas implements Action {
    readonly type = FILTRAR_VENTAS;

    constructor(public payload: any) { }
}

export class FiltrarVentasFail implements Action {
    readonly type = FILTRAR_VENTAS_FAIL;

    constructor(public payload?: any) { }
}

export class FiltrarVentasSuccess implements Action {
    readonly type = FILTRAR_VENTAS_SUCCESS;

    constructor(public payload: any) { }
}

export class AnularVentas implements Action {
    readonly type = ANULAR_VENTAS;

    constructor(public payload: any) { }
}

export class AnularVentasFail implements Action {
    readonly type = ANULAR_VENTAS_FAIL;

    constructor(public payload?: any) { }
}

export class AnularVentasSuccess implements Action {
    readonly type = ANULAR_VENTAS_SUCCESS;

    constructor(public payload: any) { }
}

export type ventasAcciones =   CargarVentas |
                               CargarVentasFail |
                               CargarVentasSuccess |
                               MostrarVentas |
                               MostrarVentasFail |
                               MostrarVentasSuccess |
                               CrearVentas |
                               CrearVentasFail |
                               CrearVentasSuccess |
                               FiltrarVentas |
                               FiltrarVentasFail |
                               FiltrarVentasSuccess |
                               AnularVentas |
                               AnularVentasFail |
                               AnularVentasSuccess;
