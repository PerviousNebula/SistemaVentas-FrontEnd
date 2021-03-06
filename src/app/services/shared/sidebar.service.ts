import { Injectable } from '@angular/core';

// Interfaces
import { Category } from 'src/app/interfaces/interfaces.index';

// Services
import { UsersService } from '../pages/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: Category[] = [];

  constructor(private usersService: UsersService) { }

  loadMenu() {
    this.menu = this.usersService.menu;
  }
}
