import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

// Interfaces
import { Persona, Pagination } from '../../interfaces/interfaces.index';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as clientesActions from '../../store/actions';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit, OnDestroy {
  public clientes: Persona[];
  public pagination: Pagination;
  public loading: boolean;
  private subscription = new Subscription();

  // Filters
  public filterForm: FormGroup;
  private filterSubmited = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.filterForm = new FormGroup({
      nombre: new FormControl(''),
      direccion: new FormControl(''),
      telefono: new FormControl(''),
      email: new FormControl('')
    });
    this.subscription.add(this.store.select('clientes').subscribe(node => {
      this.loading = node.loading;
      this.clientes = node.clientes;
      this.pagination = node.pagination;
    }));
    this.store.dispatch(new clientesActions.CargarClientes(1));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getClientes(page: number): void {
    if (!this.filterSubmited) {
      this.store.dispatch(new clientesActions.CargarClientes(this.pagination.CurrentPage + page));
    } else {
      this.filter(page);
    }
  }

  public async newCliente() {
    const { value: formValues } = await Swal.fire({
      title: 'Nuevo cliente',
      html:
        `<label style="position:absolute" for="cliente-nombre">Nombre <span style="color:red"> *</span></label>
         <input id="cliente-nombre" class="swal2-input" placeholder="Nombre del cliente" />
         <label style="position:absolute" for="cliente-tipo-documento">Tipo Documento</label>
         <select id="cliente-tipo-documento" class="swal2-input">
            <option value="" selected>Seleccione uno</option>
            <option value="CURP">CURP</option>
            <option value="RFC">RFC</option>
            <option value="PASAPORTE">PASAPORTE</option>
            <option value="CEDULA">CÉDULA</option>
            <option value="NSS">NSS</option>
         </select>
         <label style="position:absolute" for="cliente-tipo-documento">No. Documento</label>
         <input id="cliente-documento" class="swal2-input" placeholder="Documento de referencia" />
         <label style="position:absolute" for="cliente-tipo-documento">Teléfono</label>
         <input id="cliente-telefono" class="swal2-input" placeholder="Número de contacto" />
         <label style="position:absolute" for="cliente-tipo-documento">Dirección</label>
         <input id="cliente-direccion" class="swal2-input" placeholder="Dirección del clientes" />
         <label style="position:absolute" for="cliente-tipo-documento">Email</label>
         <input id="cliente-email" class="swal2-input" placeholder="Email de contacto" />`,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          nombre: (document.getElementById('cliente-nombre') as HTMLInputElement).value,
          tipo_documento: (document.getElementById('cliente-tipo-documento') as HTMLInputElement).value,
          num_documento: (document.getElementById('cliente-documento') as HTMLInputElement).value,
          telefono: (document.getElementById('cliente-telefono') as HTMLInputElement).value,
          direccion: (document.getElementById('cliente-direccion') as HTMLInputElement).value,
          email: (document.getElementById('cliente-email') as HTMLInputElement).value
        };
      }
    });

    if (formValues && formValues.nombre) {
      formValues.tipo_persona = 'cliente';
      this.store.dispatch(new clientesActions.CrearClientes(formValues));
    } else if (formValues && !formValues.nombre) {
      Swal.fire('Nuevo cliente', 'El nombre del cliente es obligatorio!', 'error');
    }
  }

  public async editCliente(cliente: Persona) {
    const { value: formValues } = await Swal.fire({
      title: 'Editar cliente',
      html:
        `<label style="position:absolute" for="cliente-nombre">Nombre <span style="color:red"> *</span></label>
         <input id="cliente-nombre" class="swal2-input" placeholder="Nombre del cliente" value="${cliente.nombre}" />
         <label style="position:absolute" for="cliente-tipo-documento">Tipo Documento</label>
         <select id="cliente-tipo-documento" class="swal2-input" value="${cliente.tipo_documento}">
            <option value="" selected>Actualizar documento</option>
            <option value="CURP">CURP</option>
            <option value="RFC">RFC</option>
            <option value="PASAPORTE">PASAPORTE</option>
            <option value="CEDULA">CÉDULA</option>
            <option value="NSS">NSS</option>
         </select>
         <label style="position:absolute" for="cliente-tipo-documento">No. Documento</label>
         <input id="cliente-documento" class="swal2-input" placeholder="Documento de referencia" value="${cliente.num_documento}" />
         <label style="position:absolute" for="cliente-tipo-documento">Teléfono</label>
         <input id="cliente-telefono" class="swal2-input" placeholder="Número de contacto" value="${cliente.telefono}" />
         <label style="position:absolute" for="cliente-tipo-documento">Dirección</label>
         <input id="cliente-direccion" class="swal2-input" placeholder="Dirección del clientes" value="${cliente.direccion}" />
         <label style="position:absolute" for="cliente-tipo-documento">Email</label>
         <input id="cliente-email" class="swal2-input" placeholder="Email de contacto" value="${cliente.email}" />`,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          nombre: (document.getElementById('cliente-nombre') as HTMLInputElement).value,
          tipo_documento: (document.getElementById('cliente-tipo-documento') as HTMLInputElement).value,
          num_documento: (document.getElementById('cliente-documento') as HTMLInputElement).value,
          telefono: (document.getElementById('cliente-telefono') as HTMLInputElement).value,
          direccion: (document.getElementById('cliente-direccion') as HTMLInputElement).value,
          email: (document.getElementById('cliente-email') as HTMLInputElement).value
        };
      }
    });
    if (formValues && formValues.nombre) {
      formValues.idPersona = cliente.idPersona;
      formValues.tipo_persona = 'cliente';
      if (!formValues.tipo_documento) {
        formValues.tipo_documento = cliente.tipo_documento;
      }
      this.store.dispatch(new clientesActions.EditarClientes(formValues));
    } else if (formValues && !formValues.nombre) {
      Swal.fire('Editar cliente', 'El nombre del cliente es obligatorio!', 'error');
    }
  }

  public filter(page: number = 0): void {
    this.filterSubmited = true;
    this.store.dispatch(new clientesActions.FiltrarClientes({
        model: this.filterForm.value,
        page: !page ? 1 : this.pagination.CurrentPage + page
    }));
  }

  public printPDFClients(): void {
    if (this.filterSubmited) {
      const filter = this.filterForm.value;
      let url = `${environment.url}/pdfcreator/clientes?filtered=true`;
      if (filter.nombre) { url += `&nombre=${filter.nombre}`; }
      if (filter.direccion) { url += `&direccion=${filter.direccion}`; }
      if (filter.telefono) { url += `&telefono=${filter.telefono}`; }
      if (filter.email) { url += `&email=${filter.email}`; }
      window.open(url);
    } else {
      window.open(`${environment.url}/pdfcreator/clientes?filtered=false`);
    }
  }

  public printExcelClients(): void {
    if (this.filterSubmited) {
      const filter = this.filterForm.value;
      let url = `${environment.url}/csvcreator/clientes?filtered=true`;
      if (filter.nombre) { url += `&nombre=${filter.nombre}`; }
      if (filter.direccion) { url += `&direccion=${filter.direccion}`; }
      if (filter.telefono) { url += `&telefono=${filter.telefono}`; }
      if (filter.email) { url += `&email=${filter.email}`; }
      window.open(url);
    } else {
      window.open(`${environment.url}/csvcreator/clientes?filtered=false`);
    }
  }

  public resetAll(): void {
    this.filterSubmited = false;
    this.filterForm.reset();
    this.store.dispatch(new clientesActions.CargarClientes(1));
  }

}
