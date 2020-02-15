import { Action } from '@ngrx/store';

export const CARGAR_ROLES = '[Roles] Cargar roles';
export const CARGAR_ROLES_FAIL = '[Roles] Cargar roles FAIL';
export const CARGAR_ROLES_SUCCESS = '[Rolex] Cargar roles SUCCESS';

export class CargarRoles implements Action {
    readonly type = CARGAR_ROLES;

    constructor(public payload?: any) { }
}

export class CargarRolesFail implements Action {
    readonly type = CARGAR_ROLES_FAIL;

    constructor(public payload?: any) { }
}

export class CargarRolesSuccess implements Action {
    readonly type = CARGAR_ROLES_SUCCESS;

    constructor(public payload?: any) { }
}

export type rolesAcciones = CargarRoles |
                            CargarRolesFail |
                            CargarRolesSuccess;
