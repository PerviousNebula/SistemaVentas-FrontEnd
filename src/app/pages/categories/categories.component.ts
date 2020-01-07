import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

// Services
import { CategoriesService } from '../../services/categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public categories: any[] = [];
  public loading = false;
  public total = 0;
  public getCategoriesSubs = new Subscription();
  public filterCategoriesSubs = new Subscription();
  public createCategorySubs = new Subscription();

  constructor(public categoriesService: CategoriesService) { }

  ngOnInit() {
    this.loading = true;
    this.getCategoriesSubs = this.categoriesService.getCategories().subscribe((resp: any) => {
      this.categories = resp.categorias;
      this.total = resp.total;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.getCategoriesSubs.unsubscribe();
    this.filterCategoriesSubs.unsubscribe();
    this.createCategorySubs.unsubscribe();
  }

  public async createCategory() {
    const { value: formValues } = await Swal.fire({
      title: 'Nueva Categoría',
      html:
        `<div class="form-group">
          <div class="input-group">
            <div class="input-group-addon"><i class="ti-pencil"></i></div>
            <input type="text" class="form-control" id="nombreCategoria" placeholder='Nombre de la Categoría'>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-addon"><i class="ti-pencil-alt"></i></div>
            <input type="text" class="form-control" id="descCategoria" placeholder='Descripción de la Categoría'>
          </div>
        </div>
        `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          nombre: (document.getElementById('nombreCategoria') as HTMLInputElement).value,
          descripcion: (document.getElementById('descCategoria') as HTMLInputElement).value
        };
      }
    });

    if (formValues) {
      this.createCategorySubs = this.categoriesService.createCategory(formValues.nombre, formValues.descripcion).subscribe((resp: any) => {
        Swal.fire('Wojoo!', resp.message, 'success');
        this.getCategoriesSubs = this.categoriesService.getCategories().subscribe((data: any) => {
          this.categories = data.categorias;
          this.total = data.total;
        });
      });
    }
  }

  public filterCategories(hint: string) {
    this.loading = true;
    this.categories = [];
    if (hint) {
      this.filterCategoriesSubs = this.categoriesService.filterCategories(hint).subscribe((resp: any) => {
        this.categories = resp.categorias;
        this.total = resp.total;
        this.loading = false;
      });
    } else {
      this.getCategoriesSubs = this.categoriesService.getCategories().subscribe((resp: any) => {
        this.categories = resp.categorias;
        this.loading = false;
      });
    }
  }

}
