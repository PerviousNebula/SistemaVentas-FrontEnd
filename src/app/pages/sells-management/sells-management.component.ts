import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

// Services
import { ProductsService, UsersService } from 'src/app/services/service.index';
import { ImageOverlayService } from '../../components/image-overlay/image-overlay.service';

// Interfaces
import { Venta, Persona } from '../../interfaces/interfaces.index';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as ventasActions from '../../store/actions';

@Component({
  selector: 'app-sells-management',
  templateUrl: './sells-management.component.html'
})
export class SellsManagementComponent implements OnInit, OnDestroy {
  public sellForm: FormGroup;
  public routeParam: string;
  public venta: Venta;
  public loading: boolean;
  public clientes: Persona[];
  private subscription = new Subscription();

  constructor(private store: Store<AppState>,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private usuariosService: UsersService,
              public productsService: ProductsService,
              public imgOverlayService: ImageOverlayService) {
    // Se crea el esqueleto del formulario
    this.sellForm = new FormGroup({
      idUsuario: new FormControl(+this.usuariosService.usuario.idUsuario, [Validators.required]),
      tipo_comprobante: new FormControl('', [Validators.required]),
      serie_comprobante: new FormControl('', [Validators.required]),
      num_comprobante: new FormControl('', [Validators.required]),
      idCliente: new FormControl('', [Validators.required]),
      impuesto: new FormControl('18', [Validators.required]),
      detalles: new FormArray([], [Validators.required]),
      total: new FormControl(0, [Validators.required])
    });

    // Se verifica si se está editando un ingreso o si se va a registrar uno nuevo
    this.routeParam = this.activatedRoute.snapshot.params.id;
    if (this.routeParam !== 'nuevo') {
      this.store.dispatch(new ventasActions.MostrarVentas(+this.routeParam));
      this.subscription.add(this.store.select('ventas').subscribe(node => {
        this.loading = node.loading;
        this.venta = node.ventas[0];
        if (this.venta !== undefined && this.venta.detalles != null && this.routeParam !== 'nuevo') {
            this.popularFormulario();
        }
      }));
    }

    this.subscription.add(this.store.select('clientes').subscribe(node => this.clientes = node.clientes));
    store.dispatch(new ventasActions.CargarClientes({ page: 1, pageSize: 100}));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get getDetallesVenta(): FormArray {
    return this.sellForm.get('detalles') as FormArray;
  }

  get totalDetallesVenta(): number {
    let total = 0;
    const detalles = this.getDetallesVenta.getRawValue();
    detalles.forEach(detalle => total += (detalle.precio * detalle.cantidad) - detalle.descuento);
    return total;
  }

  public popularFormulario(): void {
    this.sellForm.patchValue({
      idUsuario: +this.venta.idUsuario,
      tipo_comprobante: this.venta.tipo_comprobante,
      serie_comprobante: this.venta.serie_comprobante,
      num_comprobante: this.venta.num_comprobante,
      idCliente: +this.venta.idCliente,
      impuesto: this.venta.impuesto
    });
    // Se desactivan los inputs ya que es sólo lectura
    this.sellForm.get('tipo_comprobante').disable();
    this.sellForm.get('serie_comprobante').disable();
    this.sellForm.get('idCliente').disable();
    this.sellForm.get('impuesto').disable();
    this.sellForm.get('num_comprobante').disable();
    this.venta.detalles.forEach((item: any) => {
      this.agregarDetalleVenta(item.idArticulo, item.articulo, item.precio, item.cantidad, item.descuento);
    });
    this.getDetallesVenta.controls.forEach(control => control.disable());
  }

  public createDetalleVenta(idArticulo: number, nombre: string, cantidad: number, descuento: number, precio: number): FormGroup {
    return new FormGroup({
      idArticulo: new FormControl(idArticulo),
      nombre: new FormControl(nombre),
      cantidad: new FormControl(cantidad, [Validators.required, Validators.min(1)]),
      descuento: new FormControl(descuento),
      precio: new FormControl(precio, [Validators.required, Validators.min(1)])
    });
  }

  public agregarDetalleVenta(idArticulo: number, nombre: string, precio: number, cantidad: number = 1, descuento: number = 0): void {
    this.getDetallesVenta.push(this.createDetalleVenta(idArticulo, nombre, cantidad, descuento, precio));
  }

  public filterProducts(code: string): void {
    if (code.length) {
      this.productsService.filterArticuloByCode(code).subscribe(resp => {
        const detallesAry = this.sellForm.get('detalles') as FormArray;
        // Se valida que el articulo no se encuentre en los detalles del ingreso
        const productsAry = detallesAry.getRawValue();
        const alreadyAdded = productsAry.find(product => product.idArticulo === resp.idArticulo);
        if (!alreadyAdded) {
          this.agregarDetalleVenta(resp.idArticulo, resp.nombre, resp.precio_venta);
        } else {
          Swal.fire('Agregar artículo', 'El artículo ya ha sido agregado a los detalles', 'error');
        }
      });
      code = '';
    }
  }

  public agregarArticulosModal(articulos: any[]): void {
    articulos.forEach(item => this.agregarDetalleVenta(item.idArticulo, item.nombre, item.precio));
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
        this.router.navigateByUrl('/sells');
      }
    });
  }

  public guardarVenta(): void {
    if (this.sellForm.valid) {
      // Si se esta creando un nuevo ingreso
      if (this.routeParam === 'nuevo') {
        // Se cambian algunas propiedades de string a int
        this.sellForm.get('idCliente').setValue(+this.sellForm.get('idCliente').value);
        this.sellForm.get('impuesto').setValue(+this.sellForm.get('impuesto').value);
        this.sellForm.get('total').setValue(this.totalDetallesVenta);
        this.store.dispatch(new ventasActions.CrearVentas(this.sellForm.value));

        // Se reinicia los valores del formulario por si se desea agregar otro
        this.sellForm.reset();
        this.sellForm.patchValue({
          idUsuario: +this.usuariosService.usuario.idUsuario,
          tipo_comprobante: '',
          idProveedor: '',
          impuesto: 18,
          total: 0
        });
        this.getDetallesVenta.clear();
      } else {
        // Si se está editando un ingreso existente
        console.log('actualizando ingreso');
      }
    }

  }

}
