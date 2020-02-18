import { Component, OnInit } from '@angular/core';

// Services
import { SidebarService } from 'src/app/services/service.index';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor(public _sidebar: SidebarService,
              public usersService: UsersService) { }

  ngOnInit() {
  }

}
