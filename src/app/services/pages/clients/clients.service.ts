import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

// RxJS
import { map, catchError } from 'rxjs/operators';
import { Persona } from '../../../interfaces/interfaces.index';

// Services
import { ErrorHandlerService } from '../../shared/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) { }

  public getClientes(pageNumber: number = 1, pageSize: number = 10) {
    return this.http.get(`${environment.url}/Personas/ListarClientes?pageNumber=${pageNumber}&pageSize=${pageSize}`, {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({ clientes: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination'))})),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

  public createClientes(model: Persona) {
    return this.http.post(`${environment.url}/Personas/Crear`, model, {observe: 'response'})
                    .pipe(
                      map((resp: any) => {
                        Swal.fire('Cliente creado', 'El cliente ha sido agregado', 'success');
                        return { clientes: resp.body.personas, pagination: JSON.parse(resp.headers.get('X-Pagination')) };
                      }),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

  public editClientes(model: Persona) {
    return this.http.put(`${environment.url}/Personas/Actualizar`, model, {observe: 'response'})
                    .pipe(
                      map((resp: any) => {
                        Swal.fire('Cliente actualizado', 'El cliente ha sido actualizado', 'success');
                        return { clientes: resp.body.personas, pagination: JSON.parse(resp.headers.get('X-Pagination')) };
                      }),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

  public filterClientes(hint: string, pageNumber: number = 1, pageSize: number = 10) {
    return this.http.get(`${environment.url}/Personas/FiltrarClientes/${hint}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                         {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({ clientes: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination'))})),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

}
