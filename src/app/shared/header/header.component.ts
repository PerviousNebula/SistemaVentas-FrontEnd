import { Component, OnInit } from '@angular/core';

// Services
import { UsersService } from '../../services/pages/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(public usersService: UsersService) { }

  ngOnInit() {
  }

}
