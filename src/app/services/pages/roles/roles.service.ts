import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Rol } from '../../../interfaces/interfaces.index';

// RxJS
import { catchError } from 'rxjs/operators';

// Services
import { ErrorHandlerService } from '../../shared/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient,
              private  errorHandlerService: ErrorHandlerService) { }

  public getRoles() {
    return this.http.get<Rol[]>(`${environment.url}/roles/listar`)
                    .pipe(
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

}
