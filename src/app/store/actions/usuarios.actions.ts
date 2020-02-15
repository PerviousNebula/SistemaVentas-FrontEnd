import { Action } from '@ngrx/store';

export const CARGAR_USUARIOS = '[Usuarios] Cargar usuarios';
export const CARGAR_USUARIOS_FAIL = '[Usuarios] Cargar usuarios FAIL';
export const CARGAR_USUARIOS_SUCCESS = '[Usuarios] Cargar usuarios SUCCESS';

export const MOSTRAR_USUARIOS = '[Usuarios] Mostrar usuarios';
export const MOSTRAR_USUARIOS_FAIL = '[Usuarios] Mostrar usuarios FAIL';
export const MOSTRAR_USUARIOS_SUCCESS = '[Usuarios] Mostrar usuarios SUCCESS';

export const CREAR_USUARIOS = '[Usuarios] Crear usuarios';
export const CREAR_USUARIOS_FAIL = '[Usuarios] Crear usuarios FAIL';
export const CREAR_USUARIOS_SUCCESS = '[Usuarios] Crear usuarios SUCCESS';

export class CargarUsuarios implements Action {
    readonly type = CARGAR_USUARIOS;

    constructor(public payload: any) { }
}

export class CargarUsuariosFail implements Action {
    readonly type = CARGAR_USUARIOS_FAIL;

    constructor(public payload: any) { }
}

export class CargarUsuariosSuccess implements Action {
    readonly type = CARGAR_USUARIOS_SUCCESS;

    constructor(public payload: any) { }
}

export class CrearUsuarios implements Action {
    readonly type = CREAR_USUARIOS;

    constructor(public payload: any) { }
}

export class CrearUsuariosFail implements Action {
    readonly type = CREAR_USUARIOS_FAIL;

    constructor(public payload: any) { }
}

export class CrearUsuariosSuccess implements Action {
    readonly type = CREAR_USUARIOS_SUCCESS;

    constructor(public payload?: any) { }
}

export class MostrarUsuarios implements Action {
    readonly type = MOSTRAR_USUARIOS;

    constructor(public payload: any) { }
}

export class MostrarUsuariosFail implements Action {
    readonly type = MOSTRAR_USUARIOS_FAIL;

    constructor(public payload: any) { }
}

export class MostrarUsuariosSuccess implements Action {
    readonly type = MOSTRAR_USUARIOS_SUCCESS;

    constructor(public payload?: any) { }
}

export type usuariosAcciones = CargarUsuarios |
                               CargarUsuariosFail |
                               CargarUsuariosSuccess |
                               CrearUsuarios |
                               CrearUsuariosFail |
                               CrearUsuariosSuccess |
                               MostrarUsuarios |
                               MostrarUsuariosFail |
                               MostrarUsuariosSuccess;
