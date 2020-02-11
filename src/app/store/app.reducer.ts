import * as reducers from './reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    categorias: reducers.CategoriasState;
    articulos: reducers.ArticulosState;
}

export const appReducers: ActionReducerMap<AppState> = {
    categorias: reducers.categoriasReducer,
    articulos: reducers.articulosReducer
};
