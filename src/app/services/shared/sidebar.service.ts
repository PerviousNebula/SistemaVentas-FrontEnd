import { Injectable } from '@angular/core';

// Interfaces
import { Category } from 'src/app/interfaces/interfaces.index';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: Array<Category>;

  constructor() {
    this.menu = [
      {
        title: 'Principal',
        icon: 'mdi mdi-gauge',
        subcategories: [
          { title: 'Dashboard', url: '/dashboard' },
          { title: 'ProgressBar', url: '/progreso' },
          { title: 'Charts', url: '/graficas1' },
          { title: 'Promesas', url: '/promesas' },
          { title: 'RxJS', url: '/rxjs' }
        ]
      },
      {
        title: 'Almacén',
        icon: 'mdi mdi-store',
        subcategories: [
          { title: 'Categorías', url: '/categories' },
          { title: 'Articulos', url: '/products' }
        ]
      },
      {
        title: 'Compras',
        icon: 'mdi mdi-cart-outline',
        subcategories: [
          { title: 'Ingresos', url: '/incomes' },
          { title: 'Proveedores', url: '/providers' }
        ]
      },
      {
        title: 'Ventas',
        icon: 'mdi mdi-cash',
        subcategories: [
          { title: 'Ventas', url: '/sells' },
          { title: 'Clientes', url: '/clients' }
        ]
      }
    ];
  }
}
