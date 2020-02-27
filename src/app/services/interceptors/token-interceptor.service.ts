import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from '../pages/users/users.service';

@Injectable({ providedIn: 'root' })
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private usersService: UsersService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ setHeaders: { 'Authorization': `Bearer ${this.usersService.token}` }});
    return next.handle(req);
  }

  showError(error: HttpErrorResponse) {

  }
}
