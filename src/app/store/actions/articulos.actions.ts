import { Action } from '@ngrx/store';
import { Articulo } from '../../interfaces/interfaces.index';

export const CARGAR_ARTICULOS = '[Articulos] Cargar articulos';
export const CARGAR_ARTICULOS_FAIL = '[Articulos] Cargar articulos FAIL';
export const CARGAR_ARTICULOS_SUCCESS = '[Articulos] Cargar articulos SUCCESS';

export const CREAR_ARTICULOS = '[Articulos] Crear articulos';
export const CREAR_ARTICULOS_FAIL = '[Articulos] Crear articulos FAIL';
export const CREAR_ARTICULOS_SUCCESS = '[Articulos] Crear articulos SUCCESS';

export const EDITAR_ARTICULOS = '[Articulos] Editar articulos';
export const EDITAR_ARTICULOS_FAIL = '[Articulos] Editar articulos FAIL';
export const EDITAR_ARTICULOS_SUCCESS = '[Articulos] Editar articulos SUCCESS';

export const ACTIVAR_ARTICULOS = '[Articulos] Activar articulos';
export const ACTIVAR_ARTICULOS_FAIL = '[Articulos] Activar articulos FAIL';
export const ACTIVAR_ARTICULOS_SUCCESS = '[Articulos] Activar articulos SUCCESS';

export const DESACTIVAR_ARTICULOS = '[Articulos] Desactivar articulos';
export const DESACTIVAR_ARTICULOS_FAIL = '[Articulos] Desactivar articulos FAIL';
export const DESACTIVAR_ARTICULOS_SUCCESS = '[Articulos] Desactivar articulos SUCCESS';

export const FILTRAR_ARTICULOS = '[Articulos] Filtrar articulos';
export const FILTRAR_ARTICULOS_FAIL = '[Articulos] Filtrar articulos FAIL';
export const FILTRAR_ARTICULOS_SUCCESS = '[Articulos] Filtrar articulos SUCCESS';

export class CargarArticulos implements Action {
    readonly type = CARGAR_ARTICULOS;

    constructor(public payload?: any) { }
}

export class CargarArticulosFail implements Action {
    readonly type = CARGAR_ARTICULOS_FAIL;

    constructor(public payload?: any) { }
}

export class CargarArticulosSuccess implements Action {
    readonly type = CARGAR_ARTICULOS_SUCCESS;

    constructor(public payload?: any) { }
}

export class CrearArticulos implements Action {
    readonly type = CREAR_ARTICULOS;

    constructor(public payload: any) { }
}

export class CrearArticulosFail implements Action {
    readonly type = CREAR_ARTICULOS_FAIL;

    constructor(public payload: any) { }
}

export class CrearArticulosSuccess implements Action {
    readonly type = CREAR_ARTICULOS_SUCCESS;

    constructor(public payload: any) { }
}

export class EditarArticulos implements Action {
    readonly type = EDITAR_ARTICULOS;

    constructor(public payload: Articulo) { }
}

export class EditarArticulosFail implements Action {
    readonly type = EDITAR_ARTICULOS_FAIL;

    constructor(public payload: any) { }
}

export class EditarArticulosSuccess implements Action {
    readonly type = EDITAR_ARTICULOS_SUCCESS;

    constructor(public articulos: Articulo[]) { }
}

export class DesactivarArticulos implements Action {
    readonly type = DESACTIVAR_ARTICULOS;

    constructor(public payload: Articulo) { }
}

export class DesactivarArticulosFail implements Action {
    readonly type = DESACTIVAR_ARTICULOS_FAIL;

    constructor(public payload: any) { }
}

export class DesactivarArticulosSuccess implements Action {
    readonly type = DESACTIVAR_ARTICULOS_SUCCESS;

    constructor(public articulo: Articulo) { }
}

export class ActivarArticulos implements Action {
    readonly type = ACTIVAR_ARTICULOS;

    constructor(public payload: Articulo) { }
}

export class ActivarArticulosFail implements Action {
    readonly type = ACTIVAR_ARTICULOS_FAIL;

    constructor(public payload: any) { }
}

export class ActivarArticulosSuccess implements Action {
    readonly type = ACTIVAR_ARTICULOS_SUCCESS;

    constructor(public articulo: Articulo) { }
}

export class FiltrarArticulos implements Action {
    readonly type = FILTRAR_ARTICULOS;

    constructor(public payload: any) { }
}

export class FiltrarArticulosFail implements Action {
    readonly type = FILTRAR_ARTICULOS_FAIL;

    constructor(public payload: any) { }
}

export class FiltrarArticulosSuccess implements Action {
    readonly type = FILTRAR_ARTICULOS_SUCCESS;

    constructor(public payload: any) { }
}

export type articulosAcciones = CargarArticulos |
                                CargarArticulosFail |
                                CargarArticulosSuccess |
                                CrearArticulos |
                                CrearArticulosFail |
                                CrearArticulosSuccess |
                                EditarArticulos |
                                EditarArticulosFail |
                                EditarArticulosSuccess |
                                FiltrarArticulos |
                                FiltrarArticulosFail |
                                FiltrarArticulosSuccess |
                                DesactivarArticulos |
                                DesactivarArticulosFail |
                                DesactivarArticulosSuccess |
                                ActivarArticulos |
                                ActivarArticulosFail |
                                ActivarArticulosSuccess;
