import * as reducers from './reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    categorias: reducers.CategoriasState;
    articulos: reducers.ArticulosState;
    roles: reducers.RolesState;
    usuarios: reducers.UsuariosState;
}

export const appReducers: ActionReducerMap<AppState> = {
    categorias: reducers.categoriasReducer,
    articulos: reducers.articulosReducer,
    roles: reducers.rolesReducer,
    usuarios: reducers.usuariosReducer
};
