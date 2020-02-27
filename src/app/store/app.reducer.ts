import * as reducers from './reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    categorias: reducers.CategoriasState;
    articulos: reducers.ArticulosState;
    roles: reducers.RolesState;
    usuarios: reducers.UsuariosState;
    clientes: reducers.ClientesState;
    proveedores: reducers.ProveedoresState;
    ingresos: reducers.IngresosState;
}

export const appReducers: ActionReducerMap<AppState> = {
    categorias: reducers.categoriasReducer,
    articulos: reducers.articulosReducer,
    roles: reducers.rolesReducer,
    usuarios: reducers.usuariosReducer,
    clientes: reducers.clientesReducer,
    proveedores: reducers.proveedoresReducer,
    ingresos: reducers.ingresosReducer
};
