import { Action } from '@ngrx/store';

export const CARGAR_PROVEEDORES = '[Proveedores] Cargar proveedores';
export const CARGAR_PROVEEDORES_FAIL = '[Proveedores] Cargar proveedores FAIL';
export const CARGAR_PROVEEDORES_SUCCESS = '[Proveedores] Cargar proveedores SUCCESS';

export const CREAR_PROVEEDORES = '[Proveedores] Crear proveedores';
export const CREAR_PROVEEDORES_FAIL = '[Proveedores] Crear proveedores FAIL';
export const CREAR_PROVEEDORES_SUCCESS = '[Proveedores] Crear proveedores SUCCESS';

export const EDITAR_PROVEEDORES = '[Proveedores] Editar proveedores';
export const EDITAR_PROVEEDORES_FAIL = '[Proveedores] Editar proveedores FAIL';
export const EDITAR_PROVEEDORES_SUCCESS = '[Proveedores] Editar proveedores SUCCESS';

export const FILTRAR_PROVEEDORES = '[Proveedores] Filtrar proveedores';
export const FILTRAR_PROVEEDORES_FAIL = '[Proveedores] Filtrar proveedores FAIL';
export const FILTRAR_PROVEEDORES_SUCCESS = '[Proveedores] Filtrar proveedores SUCCESS';

export class CargarProveedores implements Action {
    readonly type = CARGAR_PROVEEDORES;

    constructor(public payload: any) { }
}

export class CargarProveedoresFail implements Action {
    readonly type = CARGAR_PROVEEDORES_FAIL;

    constructor(public payload?: any) { }
}

export class CargarProveedoresSuccess implements Action {
    readonly type = CARGAR_PROVEEDORES_SUCCESS;

    constructor(public payload: any) { }
}

export class CrearProveedores implements Action {
    readonly type = CREAR_PROVEEDORES;

    constructor(public payload: any) { }
}

export class CrearProveedoresFail implements Action {
    readonly type = CREAR_PROVEEDORES_FAIL;

    constructor(public payload?: any) { }
}

export class CrearProveedoresSuccess implements Action {
    readonly type = CREAR_PROVEEDORES_SUCCESS;

    constructor(public payload: any) { }
}

export class EditarProveedores implements Action {
    readonly type = EDITAR_PROVEEDORES;

    constructor(public payload: any) { }
}

export class EditarProveedoresFail implements Action {
    readonly type = EDITAR_PROVEEDORES_FAIL;

    constructor(public payload?: any) { }
}

export class EditarProveedoresSuccess implements Action {
    readonly type = EDITAR_PROVEEDORES_SUCCESS;

    constructor(public payload: any) { }
}

export class FiltrarProveedores implements Action {
    readonly type = FILTRAR_PROVEEDORES;

    constructor(public payload: any) { }
}

export class FiltrarProveedoresFail implements Action {
    readonly type = FILTRAR_PROVEEDORES_FAIL;

    constructor(public payload?: any) { }
}

export class FiltrarProveedoresSuccess implements Action {
    readonly type = FILTRAR_PROVEEDORES_SUCCESS;

    constructor(public payload: any) { }
}

export type proveedoresAcciones =  CargarProveedores |
                                CargarProveedoresFail |
                                CargarProveedoresSuccess |
                                CrearProveedores |
                                CrearProveedoresFail |
                                CrearProveedoresSuccess |
                                EditarProveedores |
                                EditarProveedoresFail |
                                EditarProveedoresSuccess |
                                FiltrarProveedores |
                                FiltrarProveedoresFail |
                                FiltrarProveedoresSuccess;
