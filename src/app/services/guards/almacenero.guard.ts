import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

// Services
import { UsersService } from '../pages/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AlmaceneroGuard implements CanActivate {

  constructor(private usersService: UsersService) { }

  canActivate() { return this.usersService.isAdmin() || this.usersService.isAlmacenero(); }

}
