import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Rol } from '../interfaces/interfaces.index';
import Swal from 'sweetalert2';

// RxJS
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  public getRoles() {
    return this.http.get<Rol[]>(`${environment.url}/roles/listar`)
                    .pipe(
                      catchError(error => this.errorHandler(error))
                    );
  }

  private errorHandler(error: HttpErrorResponse) {
    Swal.fire(`Error ${error.status}`, error.message, 'error');
    return throwError(error || 'Error en el servidor, intente más tarde');
  }
}
