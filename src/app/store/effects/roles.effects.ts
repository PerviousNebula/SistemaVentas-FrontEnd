import { Injectable } from '@angular/core';
import { RolesService } from '../../services/service.index';
import { Rol } from 'src/app/interfaces/interfaces.index';

// NGRX
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as rolesActions from '../actions';

// RxJS
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RolesEffects {

    constructor(private actions$: Actions,
                private rolesService: RolesService) { }

    @Effect()
    cargarRoles$ = this.actions$.pipe(
        ofType(rolesActions.CARGAR_ROLES),
        switchMap(() => {
            return this.rolesService.getRoles().pipe(
                map((roles: Rol[]) => new rolesActions.CargarRolesSuccess(roles)),
                catchError(error => of(new rolesActions.CargarRolesFail(error)))
            );
        })
    );
}
