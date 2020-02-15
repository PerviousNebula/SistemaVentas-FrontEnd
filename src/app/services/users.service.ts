import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { Usuario } from '../interfaces/interfaces.index';

// RxJS
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUsuarios(pageNumber: number = 1, pageSize: number = 10) {
    return this.http.get<Usuario[]>(`${environment.url}/usuarios/listar?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                                    {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({ usuarios: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination'))}),
                      catchError(error => this.errorHandler(error))
                    ));
  }

  public getUsuario(idUsuario: number) {
    return this.http.get<Usuario>(`${environment.url}/usuarios/mostrar/${idUsuario}`);
  }

  public createUsuarios(model: Usuario) {
    return this.http.post<Usuario[]>(`${environment.url}/usuarios/crear`, model)
                    .pipe(
                      map((resp: any) => {
                        Swal.fire('Usuario creado', 'El usuario ha sido agregado', 'success');
                        return resp.usuarios;
                      }),
                      catchError(error => this.errorHandler(error))
                    );
  }

  public uploadProfilePic(image: File) {
    const formData = new FormData();
    formData.append('name', image.name);
    formData.append('image', image);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<string>(`${environment.url}/usuarios/UploadProfilePic`, formData, { headers })
                    .pipe(
                      map((resp: any) => resp.imgUrl),
                      catchError(error => this.errorHandler(error))
                    );
  }

  private errorHandler(error: HttpErrorResponse) {
    Swal.fire(`Error ${error.status}`, error.message, 'error');
    return throwError(error || 'Error en el servidor, intente más tarde');
  }

}
