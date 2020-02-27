import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { map, catchError } from 'rxjs/operators';

// Interfaces
import { Articulo } from '../../../interfaces/interfaces.index';
import Swal from 'sweetalert2';

// Services
import { ErrorHandlerService } from '../../shared/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) { }

  public getArticulos(pageNumber: number = 1, pageSize: number = 10) {
    return this.http.get<Articulo>(`${environment.url}/articulos/listar?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({articulos: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination'))})),
                      catchError((error: any) => this.errorHandlerService.showError(error))
                    );
  }

  public createArticulos(articulo: Articulo) {
    return this.http.post<Articulo[]>(`${environment.url}/articulos/crear`, articulo, {observe: 'response'})
                    .pipe(
                      map((resp: any) => {
                        Swal.fire('Artículo creado', 'Tu artículo ha sido agregado', 'success');
                        return {
                          articulos: resp.body.articulos,
                          pagination: JSON.parse(resp.headers.get('X-Paginastion'))
                        };
                      }),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

  public editArticulos(articulo: Articulo) {
    return this.http.put<Articulo[]>(`${environment.url}/articulos/actualizar`, articulo, {observe: 'response'})
                    .pipe(
                      map((resp: any) => {
                        Swal.fire('Editar artículo', 'Su artículo ha sido editado!', 'success');
                        return {articulos: resp.body.articulos, pagination: JSON.parse(resp.headers.get('X-Pagination'))};
                      }),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

  public activateArticulo(idArticulo: number) {
    return this.http.put<Articulo[]>(`${environment.url}/articulos/activar/${idArticulo}`, {})
                    .pipe(
                      map(() => Swal.fire('Activar artículo', 'Su artículo ha sido activado!', 'success')),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

  public desactivateArticulo(idArticulo: number) {
    return this.http.put<Articulo[]>(`${environment.url}/articulos/desactivar/${idArticulo}`, {})
                    .pipe(
                      map(() => Swal.fire('Desactivar artículo', 'Su artículo ha sido desactivado!', 'success')),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

  public filterArticulos(hint: string, pageNumber: number = 1, pageSize: number = 10) {
    return this.http.get<Articulo[]>(`${environment.url}/articulos/filtrar/${hint}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                                     {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({ articulos: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination')) })),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

  public filterArticuloByCode(code: string) {
    return this.http.get<Articulo>(`${environment.url}/Articulos/BuscarCodigoIngreso/${code}`)
             .pipe(
               catchError(error => this.errorHandlerService.showError(error))
             );
    }
}
