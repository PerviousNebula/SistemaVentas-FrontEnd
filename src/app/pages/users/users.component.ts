import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario, Pagination } from 'src/app/interfaces/interfaces.index';
import { Subscription } from 'rxjs';

// Services
import { ImageOverlayService } from '../../components/image-overlay/image-overlay.service';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as usuariosActions from '../../store/actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {
  public usuarios: Usuario[];
  public pagination: Pagination;
  public loading: boolean;
  private subscription = new Subscription();

  constructor(private store: Store<AppState>,
              public imgOverlayService: ImageOverlayService) { }

  ngOnInit() {
    this.subscription.add(this.store.select('usuarios').subscribe(node => {
      this.usuarios = node.usuarios;
      this.pagination = node.pagination;
      this.loading = node.loading;
    }));
    this.store.dispatch(new usuariosActions.CargarUsuarios(1));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
