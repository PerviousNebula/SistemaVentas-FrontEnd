import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

// Interfaces
import { Ingreso, Persona } from '../../interfaces/interfaces.index';

// Services
import { ProductsService } from '../../services/pages/products/products.service';
import { ImageOverlayService } from '../../components/image-overlay/image-overlay.service';
import { UsersService } from '../../services/pages/users/users.service';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as ingresosActions from '../../store/actions';

@Component({
  selector: 'app-incomes-management',
  templateUrl: './incomes-management.component.html'
})
export class IncomesManagementComponent implements OnInit, OnDestroy {
  public incomeForm: FormGroup;
  public routeParam: any;
  public ingreso: Ingreso;
  public loading: boolean;
  public proveedores: Persona[];
  public errorCodigoArticulo: string;
  private subscription = new Subscription();

  constructor(private store: Store<AppState>,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public imgOverlayService: ImageOverlayService,
              private productsService: ProductsService,
              private usuariosService: UsersService) {
    // Se crea el esqueleto del formulario
    this.incomeForm = new FormGroup({
      idUsuario: new FormControl(+this.usuariosService.usuario.idUsuario, [Validators.required]),
      tipo_comprobante: new FormControl('', [Validators.required]),
      serie_comprobante: new FormControl('', [Validators.required]),
      num_comprobante: new FormControl('', [Validators.required]),
      idProveedor: new FormControl('', [Validators.required]),
      impuesto: new FormControl('18', [Validators.required]),
      detalles: new FormArray([], [Validators.required]),
      total: new FormControl(0, [Validators.required])
    });

    // Se verifica si se está editando un ingreso o si se va a registrar uno nuevo
    this.routeParam = this.activatedRoute.snapshot.params.id;
    if (this.routeParam !== 'nuevo') {
      this.subscription.add(store.select('ingresos').subscribe(node => {
        this.loading = node.loading;
        this.ingreso = node.ingresos[0];
        if (this.ingreso !== null && this.ingreso.detalles !== null && this.routeParam !== 'nuevo') {
          this.popularFormulario();
        }
      }));
      this.store.dispatch(new ingresosActions.MostrarIngresos(+this.routeParam));
    }

    this.subscription.add(store.select('proveedores').subscribe(node => this.proveedores = node.proveedores));
    store.dispatch(new ingresosActions.CargarProveedores({ page: 1, pageSize: 100}));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get getDetallesIngreso(): FormArray {
    return this.incomeForm.get('detalles') as FormArray;
  }

  get totalDetallesIngreso(): number {
    let total = 0;
    const detalles = this.getDetallesIngreso.getRawValue();
    detalles.forEach(detalle => total += detalle.precio * detalle.cantidad);
    return total;
  }

  public popularFormulario(): void {
    this.incomeForm.patchValue({
      idUsuario: +this.ingreso.idUsuario,
      tipo_comprobante: this.ingreso.tipo_comprobante,
      serie_comprobante: this.ingreso.serie_comprobante,
      num_comprobante: this.ingreso.num_comprobante,
      idProveedor: +this.ingreso.idProveedor,
      impuesto: this.ingreso.impuesto
    });
    // Se desactivan los inputs ya que es sólo lectura
    this.incomeForm.get('tipo_comprobante').disable();
    this.incomeForm.get('serie_comprobante').disable();
    this.incomeForm.get('idProveedor').disable();
    this.incomeForm.get('impuesto').disable();
    this.incomeForm.get('num_comprobante').disable();
    this.ingreso.detalles.forEach((item: any) => this.agregarDetalleIngreso(item.idArticulo, item.articulo, item.precio, item.cantidad));
    this.getDetallesIngreso.controls.forEach(control => control.disable());
  }

  public createDetalleIngreso(idArticulo: number, nombre: string, cantidad: number, precio: number): FormGroup {
    return new FormGroup({
      idArticulo: new FormControl(idArticulo),
      nombre: new FormControl(nombre),
      cantidad: new FormControl(cantidad, [Validators.required, Validators.min(1)]),
      precio: new FormControl(precio, [Validators.required, Validators.min(1)])
    });
  }

  public agregarDetalleIngreso(idArticulo: number, nombre: string, precio: number, cantidad: number = 1): void {
    this.getDetallesIngreso.push(this.createDetalleIngreso(idArticulo, nombre, cantidad, precio));
  }

  public deleteDetail(index: number): void {
    this.getDetallesIngreso.removeAt(index);
  }

  public filterProducts(code: string): void {
    if (code.length) {
      this.productsService.filterArticuloByCode(code).subscribe(resp => {
        const detallesAry = this.incomeForm.get('detalles') as FormArray;
        // Se valida que el articulo no se encuentre en los detalles del ingreso
        const productsAry = detallesAry.getRawValue();
        const alreadyAdded = productsAry.find(product => product.idArticulo === resp.idArticulo);
        if (!alreadyAdded) {
          this.agregarDetalleIngreso(resp.idArticulo, resp.nombre, resp.precio_venta);
        } else {
          Swal.fire('Agregar artículo', 'El artículo ya ha sido agregado a los detalles', 'error');
        }
      });
      code = '';
    }
  }

  public agregarArticulosModal(articulos: any[]): void {
    articulos.forEach(item => this.agregarDetalleIngreso(item.idArticulo, item.nombre, item.precio));
  }

  public guardarIngreso(): void {
    if (this.incomeForm.valid) {
      // Si se esta creando un nuevo ingreso
      if (this.routeParam === 'nuevo') {
        // Se cambian algunas propiedades de string a int
        this.incomeForm.get('idProveedor').setValue(+this.incomeForm.get('idProveedor').value);
        this.incomeForm.get('impuesto').setValue(+this.incomeForm.get('impuesto').value);
        this.incomeForm.get('total').setValue(this.totalDetallesIngreso);
        this.store.dispatch(new ingresosActions.CrearIngresos(this.incomeForm.value));

        // Se reinicia los valores del formulario por si se desea agregar otro
        this.incomeForm.reset();
        this.incomeForm.patchValue({
          idUsuario: +this.usuariosService.usuario.idUsuario,
          tipo_comprobante: '',
          idProveedor: '',
          impuesto: 18,
          total: 0
        });
        this.getDetallesIngreso.clear();
      } else {
        // Si se está editando un ingreso existente
        console.log('actualizando ingreso');
      }
    }
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
        this.router.navigateByUrl('/incomes');
      }
    });
  }

}
