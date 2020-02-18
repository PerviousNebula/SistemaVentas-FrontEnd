import { Component, OnInit } from '@angular/core';

// Services
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(public usersService: UsersService) { }

  ngOnInit() {
  }

}
