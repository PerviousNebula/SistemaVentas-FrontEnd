import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

// RxJS
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Persona } from '../interfaces/interfaces.index';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private http: HttpClient) { }

  public getProveedores(pageNumber: number = 1, pageSize: number = 10) {
    return this.http.get(`${environment.url}/Personas/ListarProveedores?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                         {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({ proveedores: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination'))})),
                      catchError(error => this.errorHandler(error))
                    );
  }

  public createProveedores(model: Persona) {
    return this.http.post(`${environment.url}/Personas/Crear`, model, {observe: 'response'})
                    .pipe(
                      map((resp: any) => {
                        Swal.fire('Proveedor creado', 'El proveedor ha sido agregado', 'success');
                        return { proveedores: resp.body.personas, pagination: JSON.parse(resp.headers.get('X-Pagination')) };
                      }),
                      catchError(error => this.errorHandler(error))
                    );
  }

  public editProveedores(model: Persona) {
    return this.http.put(`${environment.url}/Personas/Actualizar`, model, {observe: 'response'})
                    .pipe(
                      map((resp: any) => {
                        Swal.fire('Proveedor actualizado', 'El proveedor ha sido actualizado', 'success');
                        return { proveedores: resp.body.personas, pagination: JSON.parse(resp.headers.get('X-Pagination')) };
                      }),
                      catchError(error => this.errorHandler(error))
                    );
  }

  public filterProveedores(hint: string, pageNumber: number = 1, pageSize: number = 10) {
    return this.http.get(`${environment.url}/Personas/FiltrarProveedores/${hint}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                         {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({ proveedores: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination'))})),
                      catchError(error => this.errorHandler(error))
                    );
  }

  private errorHandler(error: HttpErrorResponse) {
    Swal.fire(`Error ${error.status}`, error.message, 'error');
    return throwError(error || 'Error del servidor, intente más tarde');
  }
}
