import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  public showError(error: HttpErrorResponse) {
    Swal.fire(`Error ${error.status}`, error.error.message, 'error');
    return throwError(error || 'Error del servidor, intente más tarde');
  }
}
