import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Services
import { UsersService } from '../pages/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class EditUserGuard implements CanActivate {

  constructor(private usersService: UsersService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userId = +next.params.id;
    return (this.usersService.isAdmin() || +this.usersService.usuario.idUsuario === userId);
  }
}
