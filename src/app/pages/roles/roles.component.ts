import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Rol } from 'src/app/interfaces/interfaces.index';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as rolesActions from '../../store/actions';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html'
})
export class RolesComponent implements OnInit, OnDestroy {
  public roles: Rol[];
  public loading: boolean;
  private susbscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {
    this.susbscription.add(this.store.select('roles').subscribe(node => {
      this.loading = node.loading;
      this.roles = node.roles;
    }));
    this.store.dispatch(new rolesActions.CargarRoles());
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.susbscription.unsubscribe();
  }

}
