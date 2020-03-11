import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
  private filtering: boolean;
  public filterHint = '';
  private subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
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

  public getClientes(page: number) {
    if (!this.filtering) {
      this.store.dispatch(new clientesActions.CargarClientes(this.pagination.CurrentPage + page));
    } else {
      this.filtrar(page);
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
      this.filterHint = '';
    } else if (formValues && !formValues.nombre) {
      Swal.fire('Nuevo cliente', 'El nombre del cliente es obligatorio!', 'error');
    }
  }

  async editCliente(cliente: Persona) {
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

  public filtrar(page: number = 0) {
    if (this.filterHint.length) {
      this.filtering = true;
      this.store.dispatch(new clientesActions.FiltrarClientes(
        {
          hint: this.filterHint,
          page: !page ? 1 : this.pagination.CurrentPage + page
        }
      ));
    } else {
      this.filtering = false;
      this.store.dispatch(new clientesActions.CargarClientes(1));
    }
  }

  public printClients(): void {
    window.open(this.filterHint.length ? `${environment.url}/pdfcreator/Clientes?filter=${this.filterHint}`
                                       : `${environment.url}/pdfcreator/Clientes`, '_blank');
  }

}
