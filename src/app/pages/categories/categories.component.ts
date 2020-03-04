import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

// Interfaces
import { Categoria, Pagination } from '../../interfaces/interfaces.index';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as categoriasActions from '../../store/actions';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public loading: boolean;
  public categorias: Categoria[];
  public pagination: Pagination;
  private subscriptions: Subscription = new Subscription();

  // Variables para el manejo del filtrado
  public filterHint = '';
  public filtering = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscriptions.add(this.store.select('categorias').subscribe(node => {
      this.loading = node.loading;
      this.categorias = node.categorias;
      this.pagination = node.pagination;
    }));
    this.store.dispatch(new categoriasActions.CargarCategorias(1));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getCategorias(page: number) {
    if (!this.filtering) {
      this.store.dispatch(new categoriasActions.CargarCategorias(this.pagination.CurrentPage + page));
    } else {
      this.filtrar(page);
    }
  }

  async newCategoria() {
    const { value: formValues } = await Swal.fire({
      title: 'Nueva categoría',
      html:
        `<label style="position:absolute" for="articulo-nombre">Nombre <span style="color:red"> *</span></label>
         <input id="swal-input1" class="swal2-input" placeholder="Nombre de la categoría" />
         <label style="position:absolute" for="articulo-nombre">Descripción</label>
         <input id="swal-input2" class="swal2-input" placeholder="Descripción de la categoría" />`,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          nombre: (document.getElementById('swal-input1') as HTMLInputElement).value,
          descripcion: (document.getElementById('swal-input2') as HTMLInputElement).value
        };
      }
    });

    if (formValues && formValues.nombre) {
      this.store.dispatch(new categoriasActions.CrearCategoria(formValues));
      this.filterHint = '';
    } else if (formValues && !formValues.nombre) {
      Swal.fire('Nueva categoría', 'El nombre de la categoría es obligatorio!', 'error');
    }
  }

  async editCategoria(categoria: Categoria) {
    const { value: formValues } = await Swal.fire({
      title: 'Editar categoría',
      html:
        `<label style="position:absolute" for="swal-input1">Nombre <span style="color:red"> *</span></label>
         <input id="swal-input1" class="swal2-input" value="${categoria.nombre}" placeholder="Nombre de la categoría" />
         <label style="position:absolute" for="swal-input2">Descripción</label>
         <input id="swal-input2" class="swal2-input" value="${categoria.descripcion}" placeholder="Descripción de la categoría" />`,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          nombre: (document.getElementById('swal-input1') as HTMLInputElement).value,
          descripcion: (document.getElementById('swal-input2') as HTMLInputElement).value
        };
      }
    });
    if (formValues && formValues.nombre) {
      categoria.nombre = formValues.nombre;
      categoria.descripcion = formValues.descripcion;
      this.store.dispatch(new categoriasActions.EditCategoria(categoria));
    } else if (formValues && !formValues.nombre) {
      Swal.fire('Editar categoría', 'El nombre de la categoría es obligatorio!', 'error');
    }
  }

  activateCategoria(categoria: Categoria) {
    categoria.activo = true;
    this.store.dispatch(new categoriasActions.ActivarCategorias(categoria));
  }

  async desactivateCategoria(categoria: Categoria) {
    Swal.fire({
      title: 'Desactivar categoría',
      text: `¿Está seguro que desea desactivar la categoria ${categoria.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, desactivar!'
    }).then((result) => {
      if (result.value) {
        categoria.activo = false;
        this.store.dispatch(new categoriasActions.DesactivarCategorias(categoria));
      }
    });
  }

  filtrar(page: number = 0) {
    if (this.filterHint.length) {
      this.filtering = true;
      this.store.dispatch(new categoriasActions.FiltrarCategorias(
        {
          hint: this.filterHint,
          page: !page ? 1 : this.pagination.CurrentPage + page
        }
      ));
    } else {
      this.filtering = false;
      this.store.dispatch(new categoriasActions.CargarCategorias(1));
    }
  }

  public downloadPDF(): void {
    window.location.href = this.filterHint.length ? `${environment.url}/pdfcreator/Categorias?filter=${this.filterHint}`
                                                  : `${environment.url}/pdfcreator/Categorias`;
  }

}
