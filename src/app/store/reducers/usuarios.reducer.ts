import * as fromUsuarios from '../actions';
import { Usuario, Pagination } from 'src/app/interfaces/interfaces.index';

export interface UsuariosState {
    usuarios: Usuario[];
    pagination: Pagination;
    loaded: boolean;
    loading: boolean;
    error: any;
}

const estadoInicial: UsuariosState = {
    usuarios: [],
    pagination: null,
    loaded: false,
    loading: false,
    error: null
};

export function usuariosReducer(state = estadoInicial, action: fromUsuarios.usuariosAcciones): UsuariosState {
    switch (action.type) {
        case fromUsuarios.CARGAR_USUARIOS:
            return {
                ...state,
                loading: true
            };
        case fromUsuarios.CARGAR_USUARIOS_SUCCESS:
            return {
                ...state,
                loaded: true,
                loading: false,
                usuarios: [...action.payload.usuarios],
                pagination: {...action.payload.pagination}
            };
        case fromUsuarios.CARGAR_USUARIOS_FAIL:
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
        case fromUsuarios.CREAR_USUARIOS:
            return {
                ...state,
                loading: true
            };
        case fromUsuarios.CREAR_USUARIOS_SUCCESS:
            return {
                ...state,
                loaded: true,
                loading: false
            };
        case fromUsuarios.CREAR_USUARIOS_FAIL:
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
        case fromUsuarios.MOSTRAR_USUARIOS:
            return {
                ...state,
                loading: true
            };
        case fromUsuarios.MOSTRAR_USUARIOS_SUCCESS:
            return {
                ...state,
                loaded: true,
                loading: false,
                usuarios: [...action.payload.usuario]
            };
        case fromUsuarios.MOSTRAR_USUARIOS_FAIL:
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
