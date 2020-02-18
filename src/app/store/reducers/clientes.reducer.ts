import { Persona, Pagination } from 'src/app/interfaces/interfaces.index';
import * as fromClientes from '../actions';

export interface ClientesState {
    clientes: Persona[];
    pagination: Pagination;
    loaded: boolean;
    loading: boolean;
    error: any;
}

const estadoInicial: ClientesState = {
    clientes: [],
    pagination: null,
    loaded: false,
    loading: false,
    error: null
};

export function clientesReducer(state = estadoInicial, action: fromClientes.clientesAcciones): ClientesState {
    switch (action.type) {
        case fromClientes.CARGAR_CLIENTES:
            return {
                ...state,
                loading: true
            };
        case fromClientes.CARGAR_CLIENTES_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                clientes: [...action.payload.clientes],
                pagination: {...action.payload.pagination}
            };
        case fromClientes.CARGAR_CLIENTES_FAIL:
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
        case fromClientes.CREAR_CLIENTES:
            return {
                ...state,
                loading: true
            };
        case fromClientes.CREAR_CLIENTES_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                clientes: [...action.payload.clientes],
                pagination: {...action.payload.pagination}
            };
        case fromClientes.CREAR_CLIENTES_FAIL:
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
        case fromClientes.EDITAR_CLIENTES:
            return {
                ...state,
                loading: true
            };
        case fromClientes.EDITAR_CLIENTES_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                clientes: [...action.payload.clientes],
                pagination: {...action.payload.pagination}
            };
        case fromClientes.EDITAR_CLIENTES_FAIL:
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
        case fromClientes.FILTRAR_CLIENTES:
            return {
                ...state,
                loading: true
            };
        case fromClientes.FILTRAR_CLIENTES_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                clientes: [...action.payload.clientes],
                pagination: {...action.payload.pagination}
            };
        case fromClientes.FILTRAR_CLIENTES_FAIL:
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
