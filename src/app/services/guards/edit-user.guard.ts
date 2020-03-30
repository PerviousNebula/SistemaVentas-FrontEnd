import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

// Services
import { UsersService } from '../pages/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class EditUserGuard implements CanActivate {

  constructor(private usersService: UsersService) { }

  canActivate(next: ActivatedRouteSnapshot) {
    const userId = +next.params.id;
    return (this.usersService.isAdmin() || +this.usersService.usuario.idUsuario === userId);
  }
}
