import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { UsersService } from '../../services/pages/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(public usersService: UsersService,
              private router: Router) { }

  ngOnInit() {
  }

  public filtrarTodo(hint: string): void {
    if (hint.length) {
      this.router.navigateByUrl(`/search/${hint}`);
    }
  }

}
