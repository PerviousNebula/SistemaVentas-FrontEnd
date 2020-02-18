import { Action } from '@ngrx/store';

export const CARGAR_CLIENTES = '[Clientes] Cargar clientes';
export const CARGAR_CLIENTES_FAIL = '[Clientes] Cargar clientes FAIL';
export const CARGAR_CLIENTES_SUCCESS = '[Clientes] Cargar clientes SUCCESS';

export const CREAR_CLIENTES = '[Clientes] Crear clientes';
export const CREAR_CLIENTES_FAIL = '[Clientes] Crear clientes FAIL';
export const CREAR_CLIENTES_SUCCESS = '[Clientes] Crear clientes SUCCESS';

export const EDITAR_CLIENTES = '[Clientes] Editar clientes';
export const EDITAR_CLIENTES_FAIL = '[Clientes] Editar clientes FAIL';
export const EDITAR_CLIENTES_SUCCESS = '[Clientes] Editar clientes SUCCESS';

export const FILTRAR_CLIENTES = '[Clientes] Filtrar clientes';
export const FILTRAR_CLIENTES_FAIL = '[Clientes] Filtrar clientes FAIL';
export const FILTRAR_CLIENTES_SUCCESS = '[Clientes] Filtrar clientes SUCCESS';

export class CargarClientes implements Action {
    readonly type = CARGAR_CLIENTES;

    constructor(public payload: any) { }
}

export class CargarClientesFail implements Action {
    readonly type = CARGAR_CLIENTES_FAIL;

    constructor(public payload?: any) { }
}

export class CargarClientesSuccess implements Action {
    readonly type = CARGAR_CLIENTES_SUCCESS;

    constructor(public payload: any) { }
}

export class CrearClientes implements Action {
    readonly type = CREAR_CLIENTES;

    constructor(public payload: any) { }
}

export class CrearClientesFail implements Action {
    readonly type = CREAR_CLIENTES_FAIL;

    constructor(public payload?: any) { }
}

export class CrearClientesSuccess implements Action {
    readonly type = CREAR_CLIENTES_SUCCESS;

    constructor(public payload: any) { }
}

export class EditarClientes implements Action {
    readonly type = EDITAR_CLIENTES;

    constructor(public payload: any) { }
}

export class EditarClientesFail implements Action {
    readonly type = EDITAR_CLIENTES_FAIL;

    constructor(public payload?: any) { }
}

export class EditarClientesSuccess implements Action {
    readonly type = EDITAR_CLIENTES_SUCCESS;

    constructor(public payload: any) { }
}

export class FiltrarClientes implements Action {
    readonly type = FILTRAR_CLIENTES;

    constructor(public payload: any) { }
}

export class FiltrarClientesFail implements Action {
    readonly type = FILTRAR_CLIENTES_FAIL;

    constructor(public payload?: any) { }
}

export class FiltrarClientesSuccess implements Action {
    readonly type = FILTRAR_CLIENTES_SUCCESS;

    constructor(public payload: any) { }
}

export type clientesAcciones = CargarClientes |
                               CargarClientesFail |
                               CargarClientesSuccess |
                               CrearClientes |
                               CrearClientesFail |
                               CrearClientesSuccess |
                               EditarClientes |
                               EditarClientesFail |
                               EditarClientesSuccess |
                               FiltrarClientes |
                               FiltrarClientesFail |
                               FiltrarClientesSuccess;
