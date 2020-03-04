import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

// Interfaces
import { Ingreso } from '../../../interfaces/interfaces.index';

// Services
import { ErrorHandlerService } from '../../shared/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) { }

  public getIngresos(pageNumber: number = 1, pageSize: number = 10) {
    return this.http.get(`${environment.url}/ingresos/listar?pageNumber=${pageNumber}&pageSize=${pageSize}`, {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({ ingresos: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination'))})),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

  public getIngreso(idIngreso: number) {
    return this.http.get<Ingreso>(`${environment.url}/Ingresos/Mostrar/${idIngreso}`)
                    .pipe(catchError(error => this.errorHandlerService.showError(error)));
  }

  public createIngreso(ingreso: any) {
    return this.http.post(`${environment.url}/Ingresos/Crear`, ingreso, {observe: 'response'})
                    .pipe(
                      map((resp: any) => {
                        Swal.fire('Ingreso creado', 'El ingreso ha sido agregado', 'success');
                        return {
                          ingresos: resp.body.ingresos,
                          pagination: JSON.parse(resp.headers.get('X-Pagination'))
                        };
                      }),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

  public filterIngresos(hint: string, pageNumber: number, pageSize: number = 10) {
    return this.http.get(`${environment.url}/ingresos/Filtrar/${hint}?pageNumber=${pageNumber}&pageSize=${pageSize}`, {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({ ingresos: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination'))})),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

  public desactivateIngreso(id: number) {
    return this.http.put(`${environment.url}/ingresos/desactivar/${id}`, {}, {observe: 'response'})
                    .pipe(
                      map((resp: any) => {
                        Swal.fire('Ingreso anulado', 'El ingreso ha sido anulado', 'success');
                        return resp;
                      }),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }
}
