import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

// Interfaces
import { Venta } from 'src/app/interfaces/interfaces.index';

// Services
import { ErrorHandlerService } from '../../shared/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SellsService {

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) { }

  public getVentas(pageNumber: number, pageSize: number = 10) {
    return this.http.get(`${environment.url}/ventas/listar?pageNumber=${pageNumber}&pageSize=${pageSize}`, {observe: 'response'})
             .pipe(
               map((resp: any) => ({ ventas: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination'))})),
               catchError(error => this.errorHandlerService.showError(error))
             );
  }

  public getVenta(idVenta: number) {
    return this.http.get<Venta>(`${environment.url}/ventas/mostrar/${idVenta}`)
                    .pipe(catchError(error => this.errorHandlerService.showError(error)));
  }

  public createVenta(venta: any) {
    return this.http.post(`${environment.url}/Ventas/Crear`, venta, {observe: 'response'})
                    .pipe(
                      map((resp: any) => {
                        Swal.fire('Venta creada', 'La venta ha sido agregada', 'success');
                        return {
                          ventas: resp.body.ventas,
                          pagination: JSON.parse(resp.headers.get('X-Pagination'))
                        };
                      }),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

  public filterVentas(model: any, pageNumber: number, pageSize: number = 10) {
    return this.http.post(`${environment.url}/ventas/Filtrar?pageNumber=${pageNumber}&pageSize=${pageSize}`, model, {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({ ventas: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination'))})),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

  public desactivateVenta(id: number) {
    return this.http.put(`${environment.url}/ventas/desactivar/${id}`, {})
                    .pipe(
                      map(() => Swal.fire('Venta anulada', 'La venta ha sido anulada', 'success')),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }
}
