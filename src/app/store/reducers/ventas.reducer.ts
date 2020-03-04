import { Venta, Pagination } from 'src/app/interfaces/interfaces.index';
import * as fromVentas from '../actions';

export interface VentasState {
    ventas: Venta[];
    pagination: Pagination;
    loaded: boolean;
    loading: boolean;
    error: any;
}

const estadoInicial: VentasState = {
    ventas: [],
    pagination: null,
    loaded: false,
    loading: false,
    error: null
};

export function ventasReducer(state = estadoInicial, action: fromVentas.ventasAcciones): VentasState {
    switch (action.type) {
        case fromVentas.CARGAR_VENTAS:
            return {
                ...state,
                loading: true
            };
        case fromVentas.CARGAR_VENTAS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                ventas: [...action.payload.ventas],
                pagination: {...action.payload.pagination}
            };
        case fromVentas.CARGAR_VENTAS_FAIL:
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
        case fromVentas.MOSTRAR_VENTAS:
            return {
                ...state,
                loading: true
            };
        case fromVentas.MOSTRAR_VENTAS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                ventas: [action.payload]
            };
        case fromVentas.MOSTRAR_VENTAS_FAIL:
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
        case fromVentas.CREAR_VENTAS:
            return {
                ...state,
                loading: true
            };
        case fromVentas.CREAR_VENTAS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                ventas: [...action.payload.ventas],
                pagination: {...action.payload.pagination}
            };
        case fromVentas.CREAR_VENTAS_FAIL:
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
        case fromVentas.FILTRAR_VENTAS:
            return {
                ...state,
                loading: true
            };
        case fromVentas.FILTRAR_VENTAS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                ventas: [...action.payload.ventas],
                pagination: {...action.payload.pagination}
            };
        case fromVentas.FILTRAR_VENTAS_FAIL:
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
        case fromVentas.ANULAR_VENTAS:
            return {
                ...state,
                loading: true
            };
        case fromVentas.ANULAR_VENTAS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                ventas: state.ventas.map((venta: Venta) =>
                (venta.idVenta === action.payload) ? { ...venta, estado: 'Anulado' } : { ...venta })
            };
        case fromVentas.ANULAR_VENTAS_FAIL:
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
