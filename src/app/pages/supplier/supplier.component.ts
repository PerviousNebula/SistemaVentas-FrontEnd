import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Persona, Pagination } from '../../interfaces/interfaces.index';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as proveedoressActions from '../../store/actions';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html'
})
export class SupplierComponent implements OnInit, OnDestroy {
  public proveedores: Persona[];
  public pagination: Pagination;
  public loading: boolean;
  private subscription = new Subscription();

  // Filtrado
  private filterSubmited = false;
  public filterForm: FormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.filterForm = new FormGroup({
      nombre: new FormControl(''),
      direccion: new FormControl(''),
      telefono: new FormControl(''),
      email: new FormControl('')
    });
    this.subscription.add(this.store.select('proveedores').subscribe(node => {
      this.loading = node.loading;
      this.proveedores = node.proveedores;
      this.pagination = node.pagination;
    }));
    this.store.dispatch(new proveedoressActions.CargarProveedores(1));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getProveedores(page: number): void {
    if (!this.filterSubmited) {
      this.store.dispatch(new proveedoressActions.CargarProveedores(this.pagination.CurrentPage + page));
    } else {
      this.filtrar(page);
    }
  }

  public async newProveedor() {
    const { value: formValues } = await Swal.fire({
      title: 'Nuevo proveedor',
      html:
        `<label style="position:absolute" for="proveedor-nombre">Nombre <span style="color:red"> *</span></label>
         <input id="proveedor-nombre" class="swal2-input" placeholder="Nombre del proveedor" />
         <label style="position:absolute" for="proveedor-tipo-documento">Tipo Documento</label>
         <select id="proveedor-tipo-documento" class="swal2-input">
            <option value="" selected>Seleccione uno</option>
            <option value="CURP">CURP</option>
            <option value="RFC">RFC</option>
            <option value="PASAPORTE">PASAPORTE</option>
            <option value="CEDULA">CÉDULA</option>
            <option value="NSS">NSS</option>
         </select>
         <label style="position:absolute" for="proveedor-tipo-documento">No. Documento</label>
         <input id="proveedor-documento" class="swal2-input" placeholder="Documento de referencia" />
         <label style="position:absolute" for="proveedor-tipo-documento">Teléfono</label>
         <input id="proveedor-telefono" class="swal2-input" placeholder="Número de contacto" />
         <label style="position:absolute" for="proveedor-tipo-documento">Dirección</label>
         <input id="proveedor-direccion" class="swal2-input" placeholder="Dirección del proveedores" />
         <label style="position:absolute" for="proveedor-tipo-documento">Email</label>
         <input id="proveedor-email" class="swal2-input" placeholder="Email de contacto" />`,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          nombre: (document.getElementById('proveedor-nombre') as HTMLInputElement).value,
          tipo_documento: (document.getElementById('proveedor-tipo-documento') as HTMLInputElement).value,
          num_documento: (document.getElementById('proveedor-documento') as HTMLInputElement).value,
          telefono: (document.getElementById('proveedor-telefono') as HTMLInputElement).value,
          direccion: (document.getElementById('proveedor-direccion') as HTMLInputElement).value,
          email: (document.getElementById('proveedor-email') as HTMLInputElement).value
        };
      }
    });

    if (formValues && formValues.nombre) {
      formValues.tipo_persona = 'proveedor';
      this.store.dispatch(new proveedoressActions.CrearProveedores(formValues));
    } else if (formValues && !formValues.nombre) {
      Swal.fire('Nuevo proveedor', 'El nombre del proveedor es obligatorio!', 'error');
    }
  }

  public async editProveedor(proveedor: Persona) {
    const { value: formValues } = await Swal.fire({
      title: 'Editar proveedor',
      html:
        `<label style="position:absolute" for="proveedor-nombre">Nombre <span style="color:red"> *</span></label>
         <input id="proveedor-nombre" class="swal2-input" placeholder="Nombre del proveedor" value="${proveedor.nombre}" />
         <label style="position:absolute" for="proveedor-tipo-documento">Tipo Documento</label>
         <select id="proveedor-tipo-documento" class="swal2-input" value="${proveedor.tipo_documento}">
            <option value="" selected>Actualizar documento</option>
            <option value="CURP">CURP</option>
            <option value="RFC">RFC</option>
            <option value="PASAPORTE">PASAPORTE</option>
            <option value="CEDULA">CÉDULA</option>
            <option value="NSS">NSS</option>
         </select>
         <label style="position:absolute" for="proveedor-tipo-documento">No. Documento</label>
         <input id="proveedor-documento" class="swal2-input" placeholder="Documento de referencia" value="${proveedor.num_documento}" />
         <label style="position:absolute" for="proveedor-tipo-documento">Teléfono</label>
         <input id="proveedor-telefono" class="swal2-input" placeholder="Número de contacto" value="${proveedor.telefono}" />
         <label style="position:absolute" for="proveedor-tipo-documento">Dirección</label>
         <input id="proveedor-direccion" class="swal2-input" placeholder="Dirección del proveedores" value="${proveedor.direccion}" />
         <label style="position:absolute" for="proveedor-tipo-documento">Email</label>
         <input id="proveedor-email" class="swal2-input" placeholder="Email de contacto" value="${proveedor.email}" />`,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          nombre: (document.getElementById('proveedor-nombre') as HTMLInputElement).value,
          tipo_documento: (document.getElementById('proveedor-tipo-documento') as HTMLInputElement).value,
          num_documento: (document.getElementById('proveedor-documento') as HTMLInputElement).value,
          telefono: (document.getElementById('proveedor-telefono') as HTMLInputElement).value,
          direccion: (document.getElementById('proveedor-direccion') as HTMLInputElement).value,
          email: (document.getElementById('proveedor-email') as HTMLInputElement).value
        };
      }
    });
    if (formValues && formValues.nombre) {
      formValues.idPersona = proveedor.idPersona;
      formValues.tipo_persona = 'proveedor';
      if (!formValues.tipo_documento) {
        formValues.tipo_documento = proveedor.tipo_documento;
      }
      this.store.dispatch(new proveedoressActions.EditarProveedores(formValues));
    } else if (formValues && !formValues.nombre) {
      Swal.fire('Editar proveedor', 'El nombre del proveedor es obligatorio!', 'error');
    }
  }

  public filtrar(page?: number): void {
    this.filterSubmited = true;
    this.store.dispatch(new proveedoressActions.FiltrarProveedores({
        model: this.filterForm.value,
        page: !page ? 1 : this.pagination.CurrentPage + page
    }));
  }

  public printPDFSuppliers(): void {
    if (this.filterSubmited) {
      const filter = this.filterForm.value;
      let url = `${environment.url}/pdfcreator/proveedores?nombre=${filter.nombre}&direccion=${filter.direccion}&telefono=${filter.telefono}&email=${filter.email}`;
      window.open(url);
    } else {
      window.open(`${environment.url}/pdfcreator/proveedores?filtered=false`);
    }
  }

  public printExcelSuppliers(): void {
    if (this.filterSubmited) {
      const filter = this.filterForm.value;
      let url = `${environment.url}/csvcreator/proveedores?nombre=${filter.nombre}&direccion=${filter.direccion}&telefono=${filter.telefono}&email=${filter.email}`;
      window.open(url);
    } else {
      window.open(`${environment.url}/csvcreator/proveedores?filtered=false`);
    }
  }

  public resetAll(): void {
    this.filterForm.reset();
    this.filterSubmited = false;
    this.store.dispatch(new proveedoressActions.CargarProveedores(1));
  }

}
