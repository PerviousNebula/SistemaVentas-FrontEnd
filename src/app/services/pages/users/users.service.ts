import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

// Interfaces
import { Usuario, Category } from '../../../interfaces/interfaces.index';

// Services
import { ErrorHandlerService } from '../../shared/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public token: string;
  public usuario: Usuario;
  public menu: Category[];

  constructor(private http: HttpClient,
              private router: Router,
              private errorHandlerService: ErrorHandlerService) {
    this.loadFromStorage();
  }

  public isLogged() { return this.token.length; }

  public isAdmin() { return this.usuario.rol === 'Administrador'; }

  public isAlmacenero() { return this.usuario.rol === 'Almacenero'; }

  public isVendedor() { return this.usuario.rol === 'Vendedor'; }

  public loadFromStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = jwt_decode(this.token);
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  public saveInTheStorage(token: string, menu: Category[]) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(jwt_decode(token)));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.token = token;
    this.usuario = jwt_decode(token);
    this.menu = menu;
  }

  public login(email: string, password: string) {
    return this.http.post(`${environment.url}/usuarios/login`, { email, password })
             .pipe(
               map((resp: any) => {
                 this.saveInTheStorage(resp.token, resp.menu);
                 this.router.navigateByUrl('/dashboard');
               }),
               catchError(error => this.errorHandlerService.showError(error))
             );
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.token = '';
    this.usuario = null;
    this.menu = [];
    this.router.navigateByUrl('/login');
  }

  public getUsuarios(pageNumber: number = 1, pageSize: number = 10) {
    return this.http.get<Usuario[]>(`${environment.url}/usuarios/listar?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                                    {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({ usuarios: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination'))}),
                      catchError(error => this.errorHandlerService.showError(error))
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
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

  public editUsuario(model: Usuario) {
    return this.http.put(`${environment.url}/usuarios/actualizar`, model, {observe: 'response'})
                    .pipe(
                      map((resp: any) => {
                        if (this.usuario.idUsuario == model.idUsuario) {
                          Swal.fire('Editar Perfil',
                                    'Tus datos han sido actualizados! Los cambios se verán reflejados la próxima vez que inicie sesión',
                                    'success');
                          this.router.navigateByUrl('/dashboard');
                        } else {
                          Swal.fire('Editar Usuario', 'El usuario ha sido editado!', 'success');
                          this.router.navigateByUrl('/users');
                        }
                        return {usuarios: resp.body.usuarios, pagination: JSON.parse(resp.headers.get('X-Pagination'))};
                      }),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

  public uploadProfilePic(image: File) {
    const formData = new FormData();
    formData.append('name', image.name);
    formData.append('image', image);
    formData.append('idUsuario', this.usuario.idUsuario.toString());
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<string>(`${environment.url}/usuarios/UploadProfilePic`, formData, { headers })
                    .pipe(
                      map((resp: any) => resp.imgUrl),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

  public filtrarUsuarios(model: any, pageNumber: number = 1, pageSize: number = 10) {
    return this.http.post(`${environment.url}/usuarios/filtrar?pageNumber=${pageNumber}&pageSize=${pageSize}`, model, {observe: 'response'})
                    .pipe(
                      map((resp: any) => ({ usuarios: resp.body, pagination: JSON.parse(resp.headers.get('X-Pagination')) })),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

  public activarUsuario(idUsuario: number) {
    return this.http.put(`${environment.url}/usuarios/activar/${idUsuario}`, {})
                    .pipe(
                      map(() => Swal.fire('Activar usuario', 'El usuario ha sido activado!', 'success')),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

  public desactivarUsuario(idUsuario: number) {
    return this.http.put(`${environment.url}/usuarios/desactivar/${idUsuario}`, {})
                    .pipe(
                      map(() => Swal.fire('Desactivar usuario', 'El usuario ha sido desactivado!', 'success')),
                      catchError(error => this.errorHandlerService.showError(error))
                    );
  }

}
