import { Rol } from 'src/app/interfaces/interfaces.index';
import * as fromRoles from '../actions';

export interface RolesState {
    roles: Rol[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

const estadoInicial: RolesState = {
    roles: [],
    loaded: false,
    loading: false,
    error: null
};

export function rolesReducer(state = estadoInicial, action: fromRoles.rolesAcciones): RolesState {
    switch (action.type) {
        case fromRoles.CARGAR_ROLES:
            return {
                ...state,
                loading: true
            };
        case fromRoles.CARGAR_ROLES_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                roles: [...action.payload]
            };
        case fromRoles.CARGAR_ROLES_FAIL:
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
