import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

import { CategoriesService } from '../../services/service.index';
import * as categoriasActions from '../actions';
import { Categoria } from '../../interfaces/interfaces.index';

@Injectable()
export class CategoriasEffects {

    constructor(private actions$: Actions,
                public categoriasService: CategoriesService) { }

    @Effect()
    cargarCategorias$ = this.actions$.pipe(
        ofType(categoriasActions.CARGAR_CATEGORIAS),
        switchMap((action: categoriasActions.CargarCategorias) => {
            return this.categoriasService.getCategorias(action.payload).pipe(
                map((resp: any) => new categoriasActions.CargarCategoriasSuccess(
                        {
                            categorias: resp.categorias,
                            pagination: resp.pagination
                        })
                    ),
                catchError(error => of(new categoriasActions.CargarCategoriasFail(error)))
            );
        })
    );

    @Effect()
    crearCategoria$ = this.actions$.pipe(
        ofType(categoriasActions.CREAR_CATEGORIA),
        switchMap((action: categoriasActions.CrearCategoria) => {
            return this.categoriasService.createCategoria(action.payload).pipe(
                map((resp: any) => {
                    Swal.fire('Categoría creada', 'Tu categoría ha sido agregada', 'success');
                    return new categoriasActions.CrearCategoriaSuccess(
                        {
                            categorias: resp.categorias,
                            pagination: resp.pagination
                        });
                }),
                catchError(error => of(new categoriasActions.CrearCategoriaFail(error)))
            );
        })
    );

    @Effect()
    editarCategoria$ = this.actions$.pipe(
        ofType(categoriasActions.EDITAR_CATEGORIA),
        switchMap((action: categoriasActions.EditCategoria) => {
            return this.categoriasService.editCategoria(action.payload).pipe(
                map((categorias: Categoria[]) => {
                    Swal.fire('Editar categoría', 'Su categoría ha sido editada!', 'success');
                    return new categoriasActions.EditCategoriaSuccess(categorias);
                }),
                catchError(error => of(new categoriasActions.EditCategoriaFail(error)))
            );
        })
    );

    @Effect()
    filtrarCategorias$ = this.actions$.pipe(
        ofType(categoriasActions.FILTRAR_CATEGORIAS),
        switchMap((action: categoriasActions.FiltrarCategorias) => {
            return this.categoriasService.filterCategoria(action.payload.hint, action.payload.page).pipe(
                map((resp: any) => {
                    return new categoriasActions.FiltrarCategoriasSuccess({
                        categorias: resp.categorias,
                        pagination: resp.pagination
                    });
                }),
                catchError(error => of(new categoriasActions.FiltrarCategoriasFail(error)))
            );
        })
    );

    @Effect()
    activarCategorias$ = this.actions$.pipe(
        ofType(categoriasActions.ACTIVAR_CATEGORIAS),
        switchMap((action: categoriasActions.ActivarCategorias) => {
            return this.categoriasService.activateCategoria(action.payload.idCategoria).pipe(
                map(() => {
                    Swal.fire('Activar categoría', 'Su categoría ha sido activada!', 'success');
                    return new categoriasActions.ActivarCategoriasSuccess(action.payload);
                }),
                catchError(error => of(new categoriasActions.ActivarCategoriasFail(error)))
            );
        })
    );

    @Effect()
    desactivarCategorias$ = this.actions$.pipe(
        ofType(categoriasActions.DESACTIVAR_CATEGORIAS),
        switchMap((action: categoriasActions.DesactivarCategorias) => {
            return this.categoriasService.desactivateCategoria(action.payload.idCategoria).pipe(
                map(() => {
                    Swal.fire('Desactivar categoría', 'Su categoría ha sido desactivada!', 'success');
                    return new categoriasActions.DesactivarCategoriasSuccess(action.payload);
                }),
                catchError(error => of(new categoriasActions.DesactivarCategoriasFail(error)))
            );
        })
    );
}
