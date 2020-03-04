import { NgModule } from '@angular/core';

// Services
import {
  CategoriesService,
  ClientsService,
  ProductsService,
  RolesService,
  SuppliersService,
  UsersService,
  IncomesService,
  SellsService,
  SettingsService,
  SidebarService,
  SharedService
} from './service.index';

@NgModule({
  providers: [
    CategoriesService,
    ClientsService,
    ProductsService,
    RolesService,
    SuppliersService,
    UsersService,
    IncomesService,
    SellsService,
    SettingsService,
    SharedService,
    SidebarService
  ]
})
export class ServiceModule { }
