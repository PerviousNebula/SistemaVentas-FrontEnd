import { Action } from '@ngrx/store';
import { Usuario } from '../../interfaces/interfaces.index';

export const CARGAR_USUARIOS = '[Usuarios] Cargar usuarios';
export const CARGAR_USUARIOS_FAIL = '[Usuarios] Cargar usuarios FAIL';
export const CARGAR_USUARIOS_SUCCESS = '[Usuarios] Cargar usuarios SUCCESS';

export const MOSTRAR_USUARIOS = '[Usuarios] Mostrar usuarios';
export const MOSTRAR_USUARIOS_FAIL = '[Usuarios] Mostrar usuarios FAIL';
export const MOSTRAR_USUARIOS_SUCCESS = '[Usuarios] Mostrar usuarios SUCCESS';

export const CREAR_USUARIOS = '[Usuarios] Crear usuarios';
export const CREAR_USUARIOS_FAIL = '[Usuarios] Crear usuarios FAIL';
export const CREAR_USUARIOS_SUCCESS = '[Usuarios] Crear usuarios SUCCESS';

export const EDITAR_USUARIOS = '[Usuarios] Editar usuarios';
export const EDITAR_USUARIOS_FAIL = '[Usuarios] Editar usuarios FAIL';
export const EDITAR_USUARIOS_SUCCESS = '[Usuarios] Editar usuarios SUCCESS';

export const FILTRAR_USUARIOS = '[Usuarios] Filtrar usuarios';
export const FILTRAR_USUARIOS_FAIL = '[Usuarios] Filtrar usuarios FAIL';
export const FILTRAR_USUARIOS_SUCCESS = '[Usuarios] Filtrar usuarios SUCCESS';

export const ACTIVAR_USUARIOS = '[Usuarios] Activar usuarios';
export const ACTIVAR_USUARIOS_FAIL = '[Usuarios] Activar usuarios FAIL';
export const ACTIVAR_USUARIOS_SUCCESS = '[Usuarios] Activar usuarios SUCCESS';

export const DESACTIVAR_USUARIOS = '[Usuarios] Desactivar usuarios';
export const DESACTIVAR_USUARIOS_FAIL = '[Usuarios] Desactivar usuarios FAIL';
export const DESACTIVAR_USUARIOS_SUCCESS = '[Usuarios] Desactivar usuarios SUCCESS';

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

    constructor(public payload?: any) { }
}

export class CrearUsuariosSuccess implements Action {
    readonly type = CREAR_USUARIOS_SUCCESS;

    constructor(public payload: any) { }
}

export class EditarUsuarios implements Action {
    readonly type = EDITAR_USUARIOS;

    constructor(public payload: Usuario) { }
}

export class EditarUsuariosFail implements Action {
    readonly type = EDITAR_USUARIOS_FAIL;

    constructor(public payload?: any) { }
}

export class EditarUsuariosSuccess implements Action {
    readonly type = EDITAR_USUARIOS_SUCCESS;

    constructor(public payload: any) { }
}

export class MostrarUsuarios implements Action {
    readonly type = MOSTRAR_USUARIOS;

    constructor(public payload: number) { }
}

export class MostrarUsuariosFail implements Action {
    readonly type = MOSTRAR_USUARIOS_FAIL;

    constructor(public payload?: any) { }
}

export class MostrarUsuariosSuccess implements Action {
    readonly type = MOSTRAR_USUARIOS_SUCCESS;

    constructor(public payload: Usuario) { }
}

export class FiltrarUsuarios implements Action {
    readonly type = FILTRAR_USUARIOS;

    constructor(public payload: any) { }
}

export class FiltrarUsuariosFail implements Action {
    readonly type = FILTRAR_USUARIOS_FAIL;

    constructor(public payload?: any) { }
}

export class FiltrarUsuariosSuccess implements Action {
    readonly type = FILTRAR_USUARIOS_SUCCESS;

    constructor(public payload: any) { }
}

export class ActivarUsuarios implements Action {
    readonly type = ACTIVAR_USUARIOS;

    constructor(public payload: Usuario) { }
}

export class ActivarUsuariosFail implements Action {
    readonly type = ACTIVAR_USUARIOS_FAIL;

    constructor(public payload?: any) { }
}

export class ActivarUsuariosSuccess implements Action {
    readonly type = ACTIVAR_USUARIOS_SUCCESS;

    constructor(public payload: number) { }
}

export class DesactivarUsuarios implements Action {
    readonly type = DESACTIVAR_USUARIOS;

    constructor(public payload: Usuario) { }
}

export class DesactivarUsuariosFail implements Action {
    readonly type = DESACTIVAR_USUARIOS_FAIL;

    constructor(public payload?: any) { }
}

export class DesactivarUsuariosSuccess implements Action {
    readonly type = DESACTIVAR_USUARIOS_SUCCESS;

    constructor(public payload: number) { }
}

export type usuariosAcciones = CargarUsuarios |
                               CargarUsuariosFail |
                               CargarUsuariosSuccess |
                               CrearUsuarios |
                               CrearUsuariosFail |
                               CrearUsuariosSuccess |
                               EditarUsuarios |
                               EditarUsuariosFail |
                               EditarUsuariosSuccess |
                               MostrarUsuarios |
                               MostrarUsuariosFail |
                               MostrarUsuariosSuccess |
                               FiltrarUsuarios |
                               FiltrarUsuariosFail |
                               FiltrarUsuariosSuccess |
                               ActivarUsuarios |
                               ActivarUsuariosFail |
                               ActivarUsuariosSuccess |
                               DesactivarUsuarios |
                               DesactivarUsuariosFail |
                               DesactivarUsuariosSuccess;
