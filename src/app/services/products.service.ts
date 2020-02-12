import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Interfaces
import { Articulo } from '../interfaces/interfaces.index';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getArticulos(pageNumber: number = 1) {
    return this.http.get<Articulo>(`${environment.url}/articulos/listar?pageNumber=${pageNumber}&pageSize=10`, {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({articulos: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination'))})),
                      catchError((error: any) => this.errorHandler(error))
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
                      catchError(error => this.errorHandler(error))
                    );
  }

  public editArticulos(articulo: Articulo) {
    return this.http.put<Articulo[]>(`${environment.url}/articulos/actualizar`, articulo, {observe: 'response'})
                    .pipe(
                      map((resp: any) => {
                        Swal.fire('Editar artículo', 'Su artículo ha sido editado!', 'success');
                        return {articulos: resp.body.articulos, pagination: JSON.parse(resp.headers.get('X-Pagination'))};
                      }),
                      catchError(error => this.errorHandler(error))
                    );
  }

  public activateArticulo(idArticulo: number) {
    return this.http.put<Articulo[]>(`${environment.url}/articulos/activar/${idArticulo}`, {})
                    .pipe(
                      map(() => Swal.fire('Activar artículo', 'Su artículo ha sido activado!', 'success')),
                      catchError(error => this.errorHandler(error))
                    );
  }

  public desactivateArticulo(idArticulo: number) {
    return this.http.put<Articulo[]>(`${environment.url}/articulos/desactivar/${idArticulo}`, {})
                    .pipe(
                      map(() => Swal.fire('Desactivar artículo', 'Su artículo ha sido desactivado!', 'success')),
                      catchError(error => this.errorHandler(error))
                    );
  }

  public filterArticulos(hint: string, pageNumber: number = 1) {
    return this.http.get<Articulo[]>(`${environment.url}/articulos/filtrar/${hint}?pageNumber=${pageNumber}&pageSize=10`,
                                     {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({ articulos: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination')) })),
                      catchError(error => this.errorHandler(error))
                    );
  }

  private errorHandler(error: HttpErrorResponse) {
    Swal.fire(`Error ${error.status}`, error.message, 'error');
    return throwError(error || 'Error del servidor, intente más tarde');
  }
}
