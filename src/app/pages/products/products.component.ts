import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

// Interfaces
import { Categoria, Articulo, Pagination } from '../../interfaces/interfaces.index';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as articulosActions from '../../store/actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit, OnDestroy {
  public url = environment.url;
  public articulos: Articulo[];
  public categorias: Categoria[];
  public pagination: Pagination;
  public filterHint = '';
  public filtering: boolean;
  public loading: boolean;
  private subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription.add(this.store.select('articulos').subscribe(node => {
      this.loading = node.loading;
      this.articulos = node.articulos;
      this.pagination = node.pagination;
    }));
    this.subscription.add(this.store.select('categorias').subscribe(node => this.categorias = node.categorias));
    this.store.dispatch(new articulosActions.CargarArticulos(1));
    this.store.dispatch(new articulosActions.CargarCategorias({pageNumber: 1, pageSize: 50}));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getArticulos(page: number) {
    if (!this.filtering) {
      this.store.dispatch(new articulosActions.CargarArticulos(this.pagination.CurrentPage + page));
    } else {
      this.filter(page);
    }
  }

  async newArticulo() {
    let categoriaSELECT = '';
    for (const categoria of this.categorias) {
      if (categoria.activo) {
        categoriaSELECT += `<option value="${categoria.nombre}"></option>`;
      }
    }
    const { value: formValues } = await Swal.fire({
      title: 'Nueva artículo',
      html:
        `<label style="position:absolute" for="articulo-nombre">Nombre <span style="color:red"> *</span></label>
         <input id="articulo-nombre" class="swal2-input" placeholder="Nombre del artículo" />
         <label style="position:absolute" for="articulo-desc">Descripción</label>
         <input id="articulo-desc" class="swal2-input" placeholder="Descripción del artículo" />
         <label style="position:absolute" for="articulo-codigo">Código</label>
         <input id="articulo-codigo" class="swal2-input" placeholder="Código del artículo" />
         <label style="position:absolute" for="articulo-precio">Precio <span style="color:red"> *</span></label>
         <input id="articulo-precio" class="swal2-input" placeholder="Precio" />
         <label style="position:absolute" for="articulo-stock">Stock en almacén <span style="color:red"> *</span></label>
         <input id="articulo-stock" class="swal2-input" placeholder="Cantidad del artículo en almacen" />
         <label style="position:absolute" for="articulo-cate">Categoría <span style="color:red"> *</span></label>
         <input id="articulo-cate" list="articulo-categoria" class="swal2-input" placeholder="Categoría del artículo" />
         <datalist id="articulo-categoria">${categoriaSELECT}</datalist>`,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          nombre: (document.getElementById('articulo-nombre') as HTMLInputElement).value,
          descripcion: (document.getElementById('articulo-desc') as HTMLInputElement).value,
          codigo: (document.getElementById('articulo-codigo') as HTMLInputElement).value,
          precio_venta: +(document.getElementById('articulo-precio') as HTMLInputElement).value,
          stock: +(document.getElementById('articulo-stock') as HTMLInputElement).value,
          idCategoria: (document.getElementById('articulo-cate') as HTMLInputElement).value
        };
      }
    });
    if (formValues) {
      if (formValues.nombre && formValues.precio_venta && formValues.stock && formValues.idCategoria) {
        formValues.idCategoria = this.getCategorySelected(formValues.idCategoria);
        this.store.dispatch(new articulosActions.CrearArticulos(formValues));
      } else {
        Swal.fire('Nuevo artículo', 'Uno o más campos obligatorios no fueron llenados', 'error');
      }
    }
  }

  async editArticulo(articulo: Articulo) {
    let categoriaSELECT = '';
    for (const categoria of this.categorias) { 
      if (categoria.activo) {
        categoriaSELECT += `<option value="${categoria.nombre}"></option>`;
      }
    }
    const { value: formValues } = await Swal.fire({
      title: 'Editar artículo',
      html:
        `<label style="position:absolute" for="articulo-nombre">Nombre <span style="color:red"> *</span></label>
         <input id="articulo-nombre" class="swal2-input" placeholder="Nombre del artículo" value="${articulo.nombre}" />
         <label style="position:absolute" for="articulo-desc">Descripción</label>
         <input id="articulo-desc" class="swal2-input" placeholder="Descripción del artículo" value="${articulo.descripcion}" />
         <label style="position:absolute" for="articulo-desc">Código</label>
         <input id="articulo-codigo" class="swal2-input" placeholder="Código del artículo" value="${articulo.codigo}" />
         <label style="position:absolute" for="articulo-precio">Precio <span style="color:red"> *</span></label>
         <input id="articulo-precio" class="swal2-input" placeholder="Precio" value="${articulo.precio_venta}" />
         <label style="position:absolute" for="articulo-desc">Stock en almacén<span style="color:red"> *</span></label>
         <input id="articulo-stock" class="swal2-input" placeholder="Cantidad del artículo en almacen" value="${articulo.stock}" />
         <label style="position:absolute" for="articulo-cate">Categoría <span style="color:red"> *</span></label>
         <input id="articulo-cate" list="articulo-categoria" class="swal2-input" value="${articulo.categoria}"
                placeholder="Categoría del artículo" />
         <datalist id="articulo-categoria">${categoriaSELECT}</datalist>`,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          nombre: (document.getElementById('articulo-nombre') as HTMLInputElement).value,
          descripcion: (document.getElementById('articulo-desc') as HTMLInputElement).value,
          codigo: (document.getElementById('articulo-codigo') as HTMLInputElement).value,
          precio_venta: +(document.getElementById('articulo-precio') as HTMLInputElement).value,
          stock: +(document.getElementById('articulo-stock') as HTMLInputElement).value,
          idCategoria: (document.getElementById('articulo-cate') as HTMLInputElement).value
        };
      }
    });
    if (formValues) {
      if (formValues.nombre && formValues.precio_venta && formValues.stock && formValues.idCategoria) {
        formValues.idArticulo = articulo.idArticulo;
        formValues.idCategoria = this.getCategorySelected(formValues.idCategoria);
        this.store.dispatch(new articulosActions.EditarArticulos(formValues));
      } else {
        Swal.fire('Nuevo artículo', 'Uno o más campos obligatorios no fueron llenados', 'error');
      }
    }
  }

  desactivateArticulo(articulo: Articulo) {
    Swal.fire({
      title: 'Desactivar artículo',
      text: `¿Está seguro que desea desactivar el artículo ${articulo.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, desactivar!'
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(new articulosActions.DesactivarArticulos(articulo));
      }
    });
  }

  activateArticulo(articulo: Articulo) {
    this.store.dispatch(new articulosActions.ActivarArticulos(articulo));
  }

  getCategorySelected(categoryName: string): number {
    return this.categorias.filter(c => c.nombre === categoryName)[0].idCategoria;
  }

  filter(page: number = 0) {
    if (this.filterHint.length) {
      this.filtering = true;
      this.store.dispatch(new articulosActions.FiltrarArticulos(
        { hint: this.filterHint, page: !page ? 1 : this.pagination.CurrentPage + page }
      ));
    } else {
      this.filtering = false;
      this.store.dispatch(new articulosActions.CargarArticulos(1));
    }
  }

  public downloadPDF(): void {
    window.location.href = this.filterHint.length ? `${environment.url}/pdfcreator/Articulos?filter=${this.filterHint}`
                                                  : `${environment.url}/pdfcreator/Articulos`;
  }

}
