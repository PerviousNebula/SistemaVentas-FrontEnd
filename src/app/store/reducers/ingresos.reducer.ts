import { Ingreso, Pagination } from 'src/app/interfaces/interfaces.index';
import * as fromIngresos from '../actions';

export interface IngresosState {
    ingresos: Ingreso[];
    pagination: Pagination;
    loaded: boolean;
    loading: boolean;
    error: any;
}

const estadoInicial: IngresosState = {
    ingresos: [],
    pagination: null,
    loaded: false,
    loading: false,
    error: null
};

export function ingresosReducer(state = estadoInicial, action: fromIngresos.ingresosAcciones): IngresosState {
    switch (action.type) {
        case fromIngresos.CARGAR_INGRESOS:
            return {
                ...state,
                loading: true
            };
        case fromIngresos.CARGAR_INGRESOS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                ingresos: [...action.payload.ingresos],
                pagination: {...action.payload.pagination}
            };
        case fromIngresos.CARGAR_INGRESOS_FAIL:
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
        case fromIngresos.MOSTRAR_INGRESOS:
            return {
                ...state,
                loading: true
            };
        case fromIngresos.MOSTRAR_INGRESOS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                ingresos: [action.payload]
            };
        case fromIngresos.MOSTRAR_INGRESOS_FAIL:
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
        case fromIngresos.CREAR_INGRESOS:
            return {
                ...state,
                loading: true
            };
        case fromIngresos.CREAR_INGRESOS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                ingresos: [...action.payload.ingresos],
                pagination: {...action.payload.pagination}
            };
        case fromIngresos.CREAR_INGRESOS_FAIL:
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
        case fromIngresos.FILTRAR_INGRESOS:
            return {
                ...state,
                loading: true
            };
        case fromIngresos.FILTRAR_INGRESOS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                ingresos: [...action.payload.ingresos],
                pagination: {...action.payload.pagination}
            };
        case fromIngresos.FILTRAR_INGRESOS_FAIL:
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
