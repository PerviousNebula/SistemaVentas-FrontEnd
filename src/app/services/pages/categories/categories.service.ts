import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

// Interfaces
import { Categoria } from '../../../interfaces/interfaces.index';

// Services
import { ErrorHandlerService } from '../../shared/error-handler.service';

// Enviroments
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) { }

  public getCategorias(pageNumber: number = 1, pageSize: number = 10) {
    return this.http.get<Categoria>(`${environment.url}/categorias/listar?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                                    {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({ categorias: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination'))})),
                      catchError((error: any) => this.errorHandlerService.showError(error))
                    );
  }

  public createCategoria(categoria: Categoria) {
    return this.http.post<Categoria>(`${environment.url}/categorias/crear`, categoria, {observe: 'response'})
                    .pipe(
                      map((resp: any) => {
                        Swal.fire('Categoría creada', 'Tu categoría ha sido agregada', 'success');
                        return {
                          categorias: resp.body.categorias,
                          pagination: JSON.parse(resp.headers.get('X-Pagination'))
                        };
                      }),
                      catchError((error: any) => this.errorHandlerService.showError(error))
                    );
  }

  public editCategoria(categoria: Categoria) {
    return this.http.put<Categoria>(`${environment.url}/categorias/actualizar`, categoria, {observe: 'response'})
                    .pipe(
                      map((resp: any) => {
                        Swal.fire('Editar categoría', 'Su categoría ha sido editada!', 'success');
                        return { categorias: resp.body.categorias, pagination: JSON.parse(resp.headers.get('X-Pagination')) };
                      }),
                      catchError((error: any) => this.errorHandlerService.showError(error))
                    );
  }

  public activateCategoria(idCategoria: number) {
    return this.http.put(`${environment.url}/categorias/activar/${idCategoria}`, {})
                    .pipe(
                      map(() => Swal.fire('Activar categoría', 'Su categoría ha sido activada!', 'success')),
                      catchError((error: any) => this.errorHandlerService.showError(error))
                    );
  }

  public desactivateCategoria(idCategoria: number) {
    return this.http.put(`${environment.url}/categorias/desactivar/${idCategoria}`, {})
                    .pipe(
                      map(() => Swal.fire('Desactivar categoría', 'Su categoría ha sido desactivada!', 'success')),
                      catchError((error: any) => this.errorHandlerService.showError(error))
                    );
  }

  public filterCategoria(hint: string, pageNumber: number) {
    return this.http.get(`${environment.url}/categorias/filtrar/${hint}?pageNumber=${pageNumber}&pageSize=${10}`, {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({ categorias: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination'))})),
                      catchError((error: any) => this.errorHandlerService.showError(error))
                    );
  }
}
