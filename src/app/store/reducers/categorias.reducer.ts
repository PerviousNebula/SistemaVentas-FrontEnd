import { Categoria, Pagination } from 'src/app/interfaces/interfaces.index';
import * as fromCategorias from '../actions';

export interface CategoriasState {
    categorias: Categoria[];
    pagination: Pagination;
    loaded: boolean;
    loading: boolean;
    error: any;
}

const estadoInicial: CategoriasState = {
    categorias: [],
    pagination: null,
    loaded: false,
    loading: false,
    error: null
};

export function categoriasReducer(state = estadoInicial, action: fromCategorias.categoriasAcciones): CategoriasState {
    switch (action.type) {
        case fromCategorias.CARGAR_CATEGORIAS:
            return {
                ...state,
                loading: true
            };
        case fromCategorias.CARGAR_CATEGORIAS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                categorias: [...action.payload.categorias],
                pagination: {...action.payload.pagination}
            };
        case fromCategorias.CARGAR_CATEGORIAS_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                }
            };
        case fromCategorias.CREAR_CATEGORIA:
            return {
                ...state,
                loading: true
            };
        case fromCategorias.CREAR_CATEGORIA_SUCCESS:
            return {
                ...state,
                categorias: [...action.payload.categorias],
                pagination: {...action.payload.pagination},
                loading: false,
                loaded: true
            };
        case fromCategorias.CREAR_CATEGORIA_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                }
            };
        case fromCategorias.EDITAR_CATEGORIA:
            return {
                ...state,
                loading: true
            };
        case fromCategorias.EDITAR_CATEGORIA_SUCCESS:
            return {
                ...state,
                categorias: [...action.categorias],
                loading: false,
                loaded: true
            };
        case fromCategorias.EDITAR_CATEGORIA_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                }
            };
        case fromCategorias.FILTRAR_CATEGORIAS:
            return {
                ...state,
                loading: true
            };
        case fromCategorias.FILTRAR_CATEGORIAS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                categorias: [...action.payload.categorias],
                pagination: {...action.payload.pagination}
            };
        case fromCategorias.FILTRAR_CATEGORIAS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                }
            };
        case fromCategorias.ACTIVAR_CATEGORIAS:
            return {
                ...state,
                loading: true
            };
        case fromCategorias.ACTIVAR_CATEGORIAS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                categorias: state.categorias.map((categoria: Categoria) =>
                (categoria.idCategoria === action.payload.idCategoria) ? { ...categoria, activo: true } : { ...categoria })
            };
        case fromCategorias.ACTIVAR_CATEGORIAS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                }
            };
        case fromCategorias.DESACTIVAR_CATEGORIAS:
            return {
                ...state,
                loading: true
            };
        case fromCategorias.DESACTIVAR_CATEGORIAS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                categorias: state.categorias.map((categoria: Categoria) =>
                (categoria.idCategoria === action.payload.idCategoria) ? { ...categoria, activo: false } : { ...categoria })
            };
        case fromCategorias.DESACTIVAR_CATEGORIAS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                }
            };
        default:
            return state;
    }
}
