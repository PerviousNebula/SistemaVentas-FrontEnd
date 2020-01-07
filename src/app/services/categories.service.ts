import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  public numPage = 0;
  public numPageFilter = 0;

  constructor(private http: HttpClient) { }

  public getCategories(next: boolean = true) {
    this.numPageFilter = 0;
    (next) ? ++this.numPage : --this.numPage;
    return this.http.get(`${environment.url}/categorias/listar?page=${   this.numPage}`);
  }

  public filterCategories(hint: string) {
    this.numPage = 1;
    return this.http.get(`${environment.url}/categorias/filtrar?page=${++this.numPageFilter}&hint=${hint}`)
                    .pipe(
                        catchError((error => {
                          Swal.fire('Error', error.error.message, 'error');
                          return of();
                    })));
  }

  public createCategory(nombre: string, descripcion: string) {
    if (nombre.length > 3) {
      return this.http.post(`${environment.url}/categorias/crear`, {nombre, descripcion})
                      .pipe(
                        catchError((error) => {
                          Swal.fire('Error', error.error.message, 'error');
                          return of();
                      }));
    } else {
      Swal.fire('Nombre inválido', 'El nombre de la categoría debe tener por lo menos 3 caracteres', 'error');
      return of();
    }
  }
}
