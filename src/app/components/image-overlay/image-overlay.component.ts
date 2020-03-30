import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

// Services
import { ImageOverlayService } from './image-overlay.service';

// Interfaces
import { Articulo, Pagination } from '../../interfaces/interfaces.index';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as articulosActions from '../../store/actions';

@Component({
  selector: 'app-image-overlay',
  templateUrl: './image-overlay.component.html',
  styleUrls: ['./image-overlay.component.css']
})
export class ImageOverlayComponent implements OnInit {
  public articulos: Articulo[];
  public articulosForm: FormGroup;
  public pagination: Pagination;
  public loading: boolean;
  @Output() eventArticulos: EventEmitter<Articulo[]> = new EventEmitter();

  constructor(private store: Store<AppState>,
              public imgOverlayService: ImageOverlayService) {
    this.store.select('articulos').subscribe(node => {
      this.articulos = node.articulos;
      this.pagination = node.pagination;
      this.loading = this.loading;
    });
  }

  ngOnInit() {
    this.articulosForm = new FormGroup({
      articulos: new FormArray([])
    });
  }

  public get getArticulosForm(): FormArray { return this.articulosForm.get('articulos') as FormArray; }

  public createArticulo(articulo: Articulo): FormGroup {
    return new FormGroup({
      idArticulo: new FormControl(articulo.idArticulo),
      nombre: new FormControl(articulo.nombre),
      cantidad: new FormControl(1, [Validators.required, Validators.min(1)]),
      precio: new FormControl(articulo.precio_venta, [Validators.required, Validators.min(1)])
    });
  }

  public agregarArticulo(articulo: Articulo): void { this.getArticulosForm.push(this.createArticulo(articulo)); }

  public filtrarArticulos(filter: string, page: number = 0): void {
    if (filter.length) {
      this.store.dispatch(new articulosActions.FiltrarArticulosNombre({
        filter,
        page: this.pagination ? this.pagination.CurrentPage + page : 1,
        pageSize: 5
      }));
    }
  }

  public articuloYaAgregado(articulo: Articulo): boolean {
    return this.getArticulosForm.getRawValue().map(item => item.idArticulo).includes(articulo.idArticulo);
  }

  public revisarArticulos(selected: boolean, articuloSeleccionado: Articulo): void {
    if (selected) {
      this.agregarArticulo(articuloSeleccionado);
    } else {
      const indexArticulo = this.getArticulosForm.getRawValue()
                                                 .indexOf(item => item.idArticulo === articuloSeleccionado.idArticulo);
      this.getArticulosForm.removeAt(indexArticulo);
    }
  }

  public agregarArticulos(): void {
    this.eventArticulos.emit(this.getArticulosForm.getRawValue());
    this.getArticulosForm.clear();
    this.imgOverlayService.ocultarModal();
  }

}
