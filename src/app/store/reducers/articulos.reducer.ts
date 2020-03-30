import { Articulo, Pagination } from 'src/app/interfaces/interfaces.index';
import * as fromArticulos from '../actions';

export interface ArticulosState {
    articulos: Articulo[];
    pagination: Pagination;
    loaded: boolean;
    loading: boolean;
    error: any;
}

const estadoInicial: ArticulosState = {
    articulos: [],
    pagination: null,
    loaded: false,
    loading: false,
    error: null
};

export function articulosReducer(state = estadoInicial, action: fromArticulos.articulosAcciones): ArticulosState {
    switch (action.type) {
        case fromArticulos.CARGAR_ARTICULOS:
            return {
                ...state,
                loading: true
            };
        case fromArticulos.CARGAR_ARTICULOS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                articulos: [...action.payload.articulos],
                pagination: {...action.payload.pagination}
            };
        case fromArticulos.CARGAR_ARTICULOS_FAIL:
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
        case fromArticulos.CREAR_ARTICULOS:
            return {
                ...state,
                loading: true
            };
        case fromArticulos.CREAR_ARTICULOS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                articulos: [...action.payload.articulos],
                pagination: {...action.payload.pagination}
            };
        case fromArticulos.CREAR_ARTICULOS_FAIL:
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
        case fromArticulos.EDITAR_ARTICULOS:
            return {
                ...state,
                loading: true
            };
        case fromArticulos.EDITAR_ARTICULOS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                articulos: [...action.payload.articulos],
                pagination: {...action.payload.pagination}
            };
        case fromArticulos.EDITAR_ARTICULOS_FAIL:
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
        case fromArticulos.FILTRAR_ARTICULOS:
            return {
                ...state,
                loading: true
            };
        case fromArticulos.FILTRAR_ARTICULOS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                articulos: [...action.payload.articulos],
                pagination: {...action.payload.pagination}
            };
        case fromArticulos.FILTRAR_ARTICULOS_FAIL:
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
        case fromArticulos.FILTRAR_ARTICULOS_NOMBRE:
            return {
                ...state,
                loading: true
            };
        case fromArticulos.FILTRAR_ARTICULOS_NOMBRE_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                articulos: [...action.payload.articulos],
                pagination: {...action.payload.pagination}
            };
        case fromArticulos.FILTRAR_ARTICULOS_NOMBRE_FAIL:
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
        case fromArticulos.ACTIVAR_ARTICULOS:
            return {
                ...state,
                loading: true
            };
        case fromArticulos.ACTIVAR_ARTICULOS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                articulos: state.articulos.map((articulo: Articulo) =>
                    (articulo.idArticulo === action.articulo.idArticulo) ? { ...articulo, activo: true } : { ...articulo })
            };
        case fromArticulos.ACTIVAR_ARTICULOS_FAIL:
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
        case fromArticulos.DESACTIVAR_ARTICULOS:
            return {
                ...state,
                loading: true
            };
        case fromArticulos.DESACTIVAR_ARTICULOS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                articulos: state.articulos.map((articulo: Articulo) =>
                    (articulo.idArticulo === action.articulo.idArticulo) ? { ...articulo, activo: false } : { ...articulo })
            };
        case fromArticulos.DESACTIVAR_ARTICULOS_FAIL:
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
