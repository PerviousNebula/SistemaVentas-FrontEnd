import { Action } from '@ngrx/store';
import { Categoria } from '../../interfaces/pages/categoria';

export const CARGAR_CATEGORIAS = '[Categorias] Cargar categorias';
export const CARGAR_CATEGORIAS_FAIL = '[Categorias] Cargar categorias FAIL';
export const CARGAR_CATEGORIAS_SUCCESS = '[Categorias] Cargar categorias SUCCESS';

export const CREAR_CATEGORIA = '[Categorias] Crear categoria';
export const CREAR_CATEGORIA_FAIL = '[Categorias] Crear categoria FAIL';
export const CREAR_CATEGORIA_SUCCESS = '[Categorias] Crear categoria SUCCESS';

export const EDITAR_CATEGORIA = '[Categorias] Editar categoria';
export const EDITAR_CATEGORIA_FAIL = '[Categorias] Editar categoria FAIL';
export const EDITAR_CATEGORIA_SUCCESS = '[Categorias] Editar categoria SUCCESS';

export const FILTRAR_CATEGORIAS = '[Categorias] Filtrar categorias';
export const FILTRAR_CATEGORIAS_FAIL = '[Categorias] Filtrar categorias FAIL';
export const FILTRAR_CATEGORIAS_SUCCESS = '[Categorias] Filtrar categorias SUCCESS';

export const ACTIVAR_CATEGORIAS = '[Categorias] Activar categorias';
export const ACTIVAR_CATEGORIAS_FAIL = '[Categorias] Activar categorias FAIL';
export const ACTIVAR_CATEGORIAS_SUCCESS = '[Categorias] Activar categorias SUCCESS';

export const DESACTIVAR_CATEGORIAS = '[Categorias] Desactivar categorias';
export const DESACTIVAR_CATEGORIAS_FAIL = '[Categorias] Desactivar categorias FAIL';
export const DESACTIVAR_CATEGORIAS_SUCCESS = '[Categorias] Desactivar categorias SUCCESS';

export class CargarCategorias implements Action {
    readonly type = CARGAR_CATEGORIAS;

    constructor(public payload?: any) { }
}

export class CargarCategoriasFail implements Action {
    readonly type = CARGAR_CATEGORIAS_FAIL;

    constructor(public payload: any) { }
}

export class CargarCategoriasSuccess implements Action {
    readonly type = CARGAR_CATEGORIAS_SUCCESS;

    constructor(public payload: any) { }
}

export class CrearCategoria implements Action {
    readonly type = CREAR_CATEGORIA;

    constructor(public payload: any) { }
}

export class CrearCategoriaFail implements Action {
    readonly type = CREAR_CATEGORIA_FAIL;

    constructor(public payload: any) { }
}

export class CrearCategoriaSuccess implements Action {
    readonly type = CREAR_CATEGORIA_SUCCESS;

    constructor(public payload: any) { }
}

export class EditCategoria implements Action {
    readonly type = EDITAR_CATEGORIA;

    constructor(public payload: Categoria) { }
}

export class EditCategoriaFail implements Action {
    readonly type = EDITAR_CATEGORIA_FAIL;

    constructor(public payload: any) { }
}

export class EditCategoriaSuccess implements Action {
    readonly type = EDITAR_CATEGORIA_SUCCESS;

    constructor(public payload: any) { }
}

export class FiltrarCategorias implements Action {
    readonly type = FILTRAR_CATEGORIAS;

    constructor(public payload: any) { }
}

export class FiltrarCategoriasFail implements Action {
    readonly type = FILTRAR_CATEGORIAS_FAIL;

    constructor(public payload: any) { }
}

export class FiltrarCategoriasSuccess implements Action {
    readonly type = FILTRAR_CATEGORIAS_SUCCESS;

    constructor(public payload: any) { }
}

export class ActivarCategorias implements Action {
    readonly type = ACTIVAR_CATEGORIAS;

    constructor(public payload: Categoria) { }
}

export class ActivarCategoriasFail implements Action {
    readonly type = ACTIVAR_CATEGORIAS_FAIL;

    constructor(public payload: any) { }
}

export class ActivarCategoriasSuccess implements Action {
    readonly type = ACTIVAR_CATEGORIAS_SUCCESS;

    constructor(public payload: Categoria) { }
}

export class DesactivarCategorias implements Action {
    readonly type = DESACTIVAR_CATEGORIAS;

    constructor(public payload: Categoria) { }
}

export class DesactivarCategoriasFail implements Action {
    readonly type = DESACTIVAR_CATEGORIAS_FAIL;

    constructor(public payload: any) { }
}

export class DesactivarCategoriasSuccess implements Action {
    readonly type = DESACTIVAR_CATEGORIAS_SUCCESS;

    constructor(public payload: Categoria) { }
}

export type categoriasAcciones = CargarCategorias |
                                 CargarCategoriasFail |
                                 CargarCategoriasSuccess |
                                 CrearCategoria |
                                 CrearCategoriaFail |
                                 CrearCategoriaSuccess |
                                 EditCategoria |
                                 EditCategoriaFail |
                                 EditCategoriaSuccess |
                                 FiltrarCategorias |
                                 FiltrarCategoriasFail |
                                 FiltrarCategoriasSuccess |
                                 ActivarCategorias |
                                 ActivarCategoriasFail |
                                 ActivarCategoriasSuccess |
                                 DesactivarCategorias |
                                 DesactivarCategoriasFail |
                                 DesactivarCategoriasSuccess;

