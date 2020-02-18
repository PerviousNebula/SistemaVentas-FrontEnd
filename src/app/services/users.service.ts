import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';

import Swal from 'sweetalert2';

import { Usuario } from '../interfaces/interfaces.index';

// RxJS
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public token: string;
  public usuario: Usuario;

  constructor(private http: HttpClient, private router: Router) {
    this.loadFromStorage();
  }

  public isLogged() {
    return this.token.length;
  }

  public loadFromStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = jwt_decode(this.token);
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  public saveInTheStorage(token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(jwt_decode(token)));
    this.token = token;
    this.usuario = jwt_decode(token);
  }

  public login(email: string, password: string) {
    return this.http.post(`${environment.url}/usuarios/login`, { email, password })
             .pipe(
               map((resp: any) => {
                 this.saveInTheStorage(resp.token);
                 this.router.navigateByUrl('/dashboard');
               }),
               catchError(error => this.errorHandler(error))
             );
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.token = '';
    this.usuario = null;
    this.router.navigateByUrl('/login');
  }

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
    return this.http.post<Usuario[]>(`${environment.url}/usuarios/crear`, model, {observe: 'response'})
                    .pipe(
                      map((resp: any) => {
                        Swal.fire('Usuario creado', 'El usuario ha sido agregado', 'success');
                        return { usuarios: resp.usuarios, pagination: JSON.parse(resp.headers.get('X-Pagination')) };
                      }),
                      catchError(error => this.errorHandler(error))
                    );
  }

  public editUsuario(model: Usuario) {
    return this.http.put(`${environment.url}/usuarios/actualizar`, model, {observe: 'response'})
                    .pipe(
                      map((resp: any) => {
                        Swal.fire('Editar usuario', 'El usuario ha sido editado!', 'success');
                        this.router.navigateByUrl('/users');
                        return {usuarios: resp.body.usuarios, pagination: JSON.parse(resp.headers.get('X-Pagination'))};
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

  public filtrarUsuarios(hint: string, pageNumber: number = 1, pageSize: number = 10) {
    return this.http.get(`${environment.url}/usuarios/filtrar/${hint}?pageNumber=${pageNumber}&pageSize=${pageSize}`, {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({ usuarios: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination')) })),
                      catchError(error => this.errorHandler(error))
                    );
  }

  public activarUsuario(idUsuario: number) {
    return this.http.put(`${environment.url}/usuarios/activar/${idUsuario}`, {})
                    .pipe(
                      map(() => Swal.fire('Activar usuario', 'El usuario ha sido activado!', 'success')),
                      catchError(error => this.errorHandler(error))
                    );
  }

  public desactivarUsuario(idUsuario: number) {
    return this.http.put(`${environment.url}/usuarios/desactivar/${idUsuario}`, {})
                    .pipe(
                      map(() => Swal.fire('Desactivar usuario', 'El usuario ha sido desactivado!', 'success')),
                      catchError(error => this.errorHandler(error))
                    );
  }

  private errorHandler(error: HttpErrorResponse) {
    Swal.fire(`Error ${error.status}`, error.message, 'error');
    return throwError(error || 'Error en el servidor, intente más tarde');
  }

}
