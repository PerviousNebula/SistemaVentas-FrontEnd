import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageOverlayService {
  public oculto = '';

  constructor() { }

  public mostrarModal() { this.oculto = 'show d-block'; }

  public ocultarModal() { this.oculto = ''; }
}
