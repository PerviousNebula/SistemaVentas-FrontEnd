import { NgModule } from '@angular/core';

// Services
import {
  DashboardService,
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
  SharedService,
  FilterService
} from './service.index';

@NgModule({
  providers: [
    DashboardService,
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
    SidebarService,
    FilterService
  ]
})
export class ServiceModule { }
