import { Persona, Pagination } from 'src/app/interfaces/interfaces.index';
import * as fromProveedores from '../actions';

export interface ProveedoresState {
    proveedores: Persona[];
    pagination: Pagination;
    loaded: boolean;
    loading: boolean;
    error: any;
}

const estadoInicial: ProveedoresState = {
    proveedores: [],
    pagination: null,
    loaded: false,
    loading: false,
    error: null
};

export function proveedoresReducer(state = estadoInicial, action: fromProveedores.proveedoresAcciones): ProveedoresState {
    switch (action.type) {
        case fromProveedores.CARGAR_PROVEEDORES:
            return {
                ...state,
                loading: true
            };
        case fromProveedores.CARGAR_PROVEEDORES_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                proveedores: [...action.payload.proveedores],
                pagination: {...action.payload.pagination}
            };
        case fromProveedores.CARGAR_PROVEEDORES_FAIL:
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
        case fromProveedores.CREAR_PROVEEDORES:
            return {
                ...state,
                loading: true
            };
        case fromProveedores.CREAR_PROVEEDORES_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                proveedores: [...action.payload.proveedores],
                pagination: {...action.payload.pagination}
            };
        case fromProveedores.CREAR_PROVEEDORES_FAIL:
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
        case fromProveedores.EDITAR_PROVEEDORES:
            return {
                ...state,
                loading: true
            };
        case fromProveedores.EDITAR_PROVEEDORES_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                proveedores: [...action.payload.proveedores],
                pagination: {...action.payload.pagination}
            };
        case fromProveedores.EDITAR_PROVEEDORES_FAIL:
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
        case fromProveedores.FILTRAR_PROVEEDORES:
            return {
                ...state,
                loading: true
            };
        case fromProveedores.FILTRAR_PROVEEDORES_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                proveedores: [...action.payload.proveedores],
                pagination: {...action.payload.pagination}
            };
        case fromProveedores.FILTRAR_PROVEEDORES_FAIL:
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
        default:
            return state;
    }
}
