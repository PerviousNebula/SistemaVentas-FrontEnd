import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../interfaces/interfaces.index';
import Swal from 'sweetalert2';

// RxJS
import { Subscription } from 'rxjs';

// Services
import { UsersService } from '../../services/pages/users/users.service';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as usuariosActions from '../../store/actions';

@Component({
  selector: 'app-users-managment',
  templateUrl: './users-managment.component.html'
})
export class UsersManagmentComponent implements OnInit, OnDestroy {
  private usuario: Usuario;
  private routeParam: string;
  public loading: boolean;
  private subscription = new Subscription();
  public formUsuario: FormGroup;
  public profilePic: File;
  public imgUrl = './assets/images/users/rol.jpg';

  constructor(private store: Store<AppState>,
              private ar: ActivatedRoute,
              private router: Router,
              private usersService: UsersService) {
    // Se crea el formulario
    this.formUsuario = new FormGroup({
      idUsuario: new FormControl(0),
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
      confirm_password: new FormControl(''),
      direccion: new FormControl(''),
      telefono: new FormControl('', [Validators.minLength(10)]),
      tipo_documento: new FormControl(''),
      num_documento: new FormControl(''),
      idRol: new FormControl('', [Validators.required]),
      imgUrl: new FormControl('./assets/images/users/rol.jpg'),
      act_password: new FormControl(false)
    });

    // Leemos los parametros del URL para ver si es nuevo o edicion
    this.subscription.add(this.ar.params.subscribe(params => {
      this.routeParam = params.id;
      if (params.id !== 'nuevo') {
        this.store.dispatch(new usuariosActions.MostrarUsuarios(params.id));
      }
    }));

    // Subscripcion al store con el nodo de usuarios
    this.subscription.add(this.store.select('usuarios').subscribe(node => {
      this.loading = node.loading;
      this.usuario = node.usuarios[0];

      // Si se trata de un nuevo usuario se agrega la validación de required al campo password
      if (this.routeParam === 'nuevo') {
        this.formUsuario.controls.password.setValidators(Validators.required);
        this.formUsuario.controls.confirm_password.setValidators(Validators.required);
      }

      // Se popula el formulario si se trata de una edición de usuario
      if (this.usuario && this.routeParam !== 'nuevo') {
        this.formUsuario.patchValue({
          idUsuario: +this.routeParam,
          nombre: this.usuario.nombre,
          email: this.usuario.email,
          password: '',
          confirm_password: '',
          direccion: this.usuario.direccion,
          telefono: this.usuario.telefono,
          tipo_documento: this.usuario.tipo_documento,
          num_documento: this.usuario.num_documento,
          idRol: this.usuario.idRol,
          imgUrl: this.usuario.imgUrl ? `http://localhost:5000${this.usuario.imgUrl}` : './assets/images/users/rol.jpg'
        });
      }
    }));
  }

  ngOnInit() {
    this.onFormChanges();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onFormChanges() {
    this.subscription.add(this.formUsuario.controls.password.valueChanges.subscribe((value: string) => {
      // Si el usuario escribio una nueva contraseña la confirmacion de la misma es obligatoria
      if (value.length) {
        this.formUsuario.controls.act_password.setValue(true);
        this.formUsuario.controls.confirm_password.setValidators([Validators.required]);
        this.formUsuario.controls.confirm_password.updateValueAndValidity();
      } else {
        // Si el usuario no actualizara su contraseña quitamos el validador de requerido
        this.formUsuario.controls.act_password.setValue(false);
        this.formUsuario.controls.confirm_password.setValidators([]);
        this.formUsuario.controls.confirm_password.updateValueAndValidity();
      }
    }));
  }

  public guardarCambios() {
    // Se carga primero la imagen en el servidor siempre y cuando el formulario sea válido
    if (this.formUsuario.valid) {
      // Creación de un nuevo usuario
      if (this.routeParam === 'nuevo') {
        if (this.profilePic) {
          this.usersService.uploadProfilePic(this.profilePic).subscribe(resp => {
            // Se actualiza la ruta real de la imagen de perfil en el formulario
            this.formUsuario.controls.imgUrl.setValue(resp);
            // Casteo el idRol a number
            this.formUsuario.controls.idRol.setValue(+this.formUsuario.controls.idRol.value);
            this.store.dispatch(new usuariosActions.CrearUsuarios(this.formUsuario.value));
          });
        } else {
          this.formUsuario.controls.imgUrl.setValue('');
          this.formUsuario.controls.idRol.setValue(+this.formUsuario.controls.idRol.value);
          this.store.dispatch(new usuariosActions.CrearUsuarios(this.formUsuario.value));
        }
      } else {
        // Edición de un usuario existente
        if (this.profilePic) {
          this.usersService.uploadProfilePic(this.profilePic).subscribe(resp => {
            // Se actualiza la ruta real de la imagen de perfil en el formulario
            this.formUsuario.controls.imgUrl.setValue(resp);
            // Casteo el idRol a number
            this.formUsuario.controls.idRol.setValue(+this.formUsuario.controls.idRol.value);
            this.store.dispatch(new usuariosActions.EditarUsuarios(this.formUsuario.value));
          });
        } else {
          this.formUsuario.controls.idRol.setValue(+this.formUsuario.controls.idRol.value);
          this.store.dispatch(new usuariosActions.EditarUsuarios(this.formUsuario.value));
        }
      }
    }
  }

  public selectImg() { document.getElementById('imgUrlInput').click(); }

  public showImgPreview(img) {
    this.profilePic = img.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.profilePic);
    reader.onload = (() => this.formUsuario.controls.imgUrl.setValue(reader.result));
  }

  public async confirmCancel(event: Event) {
    // Cancelar el submit del formulario
    event.preventDefault();
    Swal.fire({
      title: 'Cancelar captura',
      text: 'Si cancela no se guardarán los datos introducidos, ¿Está seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, salir!'
    }).then(resp => {
      if (resp.value) {
        this.router.navigateByUrl('/users');
      }
    });
  }

}
