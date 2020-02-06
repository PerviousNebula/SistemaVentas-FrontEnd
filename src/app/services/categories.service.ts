import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

// Interfaces
import { Categoria } from '../interfaces/pages/categoria';

// Enviroments
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  public getCategorias(pageNumber: number = 1) {
    return this.http.get<Categoria>(`${environment.url}/categorias/listar?pageNumber=${pageNumber}&pageSize=${10}`, {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({ categorias: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination'))})),
                      catchError((error: any) => this.errorHandler(error))
                    );
}

  public createCategoria(categoria: Categoria) {
    return this.http.post<Categoria>(`${environment.url}/categorias/crear`, categoria, {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({ categorias: resp.body.categorias, pagination: JSON.parse(resp.headers.get('X-Pagination'))})),
                      catchError((error: any) => this.errorHandler(error))
                    );
  }

  public editCategoria(categoria: Categoria) {
    return this.http.put<Categoria>(`${environment.url}/categorias/actualizar`, categoria)
                    .pipe(
                      map((resp: any) => resp.categorias),
                      catchError((error: any) => this.errorHandler(error))
                    );
  }

  public activateCategoria(idCategoria: number) {
    return this.http.put(`${environment.url}/categorias/activar/${idCategoria}`, {})
                    .pipe(
                      catchError((error: any) => this.errorHandler(error))
                    );
  }

  public desactivateCategoria(idCategoria: number) {
    return this.http.put(`${environment.url}/categorias/desactivar/${idCategoria}`, {})
                    .pipe(
                      catchError((error: any) => this.errorHandler(error))
                    );
  }

  public filterCategoria(hint: string, pageNumber: number) {
    return this.http.get(`${environment.url}/categorias/filtrar/${hint}?pageNumber=${pageNumber}&pageSize=${10}`, {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({ categorias: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination'))})),
                      catchError((error: any) => this.errorHandler(error))
                    );
  }

  private errorHandler(error: HttpErrorResponse) {
    Swal.fire(`Error ${error.status}`, error.message, 'error');
    return throwError(error || 'Error del servidor, intente más tarde');
  }

}
