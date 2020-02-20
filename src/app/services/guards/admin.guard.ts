import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Services
import { UsersService } from '../pages/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private usersService: UsersService, private router: Router) { }

  canActivate() { return this.usersService.isAdmin(); }

}
