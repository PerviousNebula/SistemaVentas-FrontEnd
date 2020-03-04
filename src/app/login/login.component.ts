import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Services
import { UsersService } from '../services/pages/users/users.service';
import { Subscription } from 'rxjs';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  private subscription = new Subscription();

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    init_plugins();
    this.loginForm = new FormGroup({
      email: new FormControl('arturo.nevarez.villa@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('12345678', [Validators.required])
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public login() {
    if (this.loginForm.valid) {
      this.subscription.add(this.usersService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
                                             .subscribe());
    }
  }

}
