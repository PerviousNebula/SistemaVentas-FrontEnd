import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

// RxJS
import { Subscription } from 'rxjs';

// Services
import { UsersService } from '../../services/users.service';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as usuariosActions from '../../store/actions';

@Component({
  selector: 'app-users-managment',
  templateUrl: './users-managment.component.html'
})
export class UsersManagmentComponent implements OnInit {
  public loading: boolean;
  private subscription = new Subscription();
  public formUsuario: FormGroup;
  public profilePic: File;
  public imgUrl = './assets/images/users/rol.jpg';

  constructor(private store: Store<AppState>,
              private ar: ActivatedRoute,
              private router: Router,
              private usersService: UsersService) {
    this.subscription.add(this.ar.params.subscribe(params => {
      if (params.id === 'nuevo') {
        this.getUserInfo();
      }
    }));
    this.store.select('usuarios').subscribe(node => {
      this.loading = node.loading;
      if (this.formUsuario) {
        this.formUsuario.patchValue({
          nombre: 'Test',
          email: 'test1@test.com',
          password: '12345678',
          confirm_password: '12345678',
          direccion: 'Test 123',
          telefono: '6641234567',
          tipo_documento: 'Test',
          num_documento: 'TEST123456',
          idRol: '4',
          imgUrl: './assets/images/users/rol.jpg'
        });
      }
    });
  }

  ngOnInit() {
    this.formUsuario = new FormGroup({
      nombre: new FormControl('Test', [Validators.required]),
      email: new FormControl('test1@test.com', [Validators.required, Validators.email]),
      password: new FormControl('12345678', [Validators.required]),
      confirm_password: new FormControl('12345678', [Validators.required]),
      direccion: new FormControl('Test 123'),
      telefono: new FormControl('6641234567', [Validators.minLength(10)]),
      tipo_documento: new FormControl('Test'),
      num_documento: new FormControl('TEST123456'),
      idRol: new FormControl('4', [Validators.required]),
      imgUrl: new FormControl('./assets/images/users/rol.jpg')
    });
  }

  private getUserInfo() {

  }

  public createUser() {
    // Se carga primero la imagen en el servidor siempre y cuando el formulario sea válido
    if (this.formUsuario.valid) {
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
