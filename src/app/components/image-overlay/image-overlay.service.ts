import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageOverlayService {
  public oculto = '';
  public imgUrl: string;

  constructor() { }

  public mostrarModal(imgUrl: string) {
    this.imgUrl = imgUrl;
    this.oculto = 'show d-block';
  }

  public ocultarModal() {
    this.oculto = '';
  }
}
