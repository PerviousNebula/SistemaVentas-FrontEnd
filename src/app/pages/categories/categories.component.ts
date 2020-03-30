import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
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

  // Formulario para el filtrado
  public filterForm: FormGroup;
  private filterSubmited = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    // Formulario para el filtrado
    this.filterForm = new FormGroup({
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      activo: new FormControl(true)
    });

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

  public get filterFormValue(): any {
    return this.filterForm.value;
  }

  public getCategorias(page: number = 0): void {
    if (!this.filterSubmited) {
      this.store.dispatch(new categoriasActions.CargarCategorias({
        pageNumber: this.pagination.CurrentPage + page,
        pageSize: 10
      }));
    } else {
      this.filtrar(page);
    }
  }

  public async newCategoria() {
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
    } else if (formValues && !formValues.nombre) {
      Swal.fire('Nueva categoría', 'El nombre de la categoría es obligatorio!', 'error');
    }
  }

  public async editCategoria(categoria: Categoria) {
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

  public activateCategoria(categoria: Categoria): void {
    categoria.activo = true;
    this.store.dispatch(new categoriasActions.ActivarCategorias(categoria));
  }

  public async desactivateCategoria(categoria: Categoria) {
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

  public filtrar(page?: number): void {
    this.filterSubmited = true;
    this.store.dispatch(new categoriasActions.FiltrarCategorias({
        model: this.filterForm.value,
        page: !page ? 1 : this.pagination.CurrentPage + page
    }));
  }

  public resetAll(): void {
    this.filterForm.reset();
    this.filterForm.patchValue({ activo: true });
    this.filterSubmited = false;
    this.store.dispatch(new categoriasActions.CargarCategorias(1));
  }

  public printExcelCategories(): void {
    if (this.filterSubmited) {
      window.open(`${environment.url}/csvcreator/categorias?nombre=${this.filterForm.value.nombre}&descripcion=${this.filterForm.value.descripcion}&activo=${this.filterForm.value.activo}`, '_blank');
    } else {
      window.open(`${environment.url}/csvcreator/categorias?filtered=false`, '_blank');
    }
  }

  public printPDFCategories(): void {
    if (this.filterSubmited) {
      window.open(`${environment.url}/pdfcreator/categorias?nombre=${this.filterForm.value.nombre}&descripcion=${this.filterForm.value.descripcion}&activo=${this.filterForm.value.activo}`, '_blank');
    } else {
      window.open(`${environment.url}/pdfcreator/categorias?filtered=false`, '_blank');
    }
  }

}
