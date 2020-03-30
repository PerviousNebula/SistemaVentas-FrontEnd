// Modules
import { RouterModule, Routes } from '@angular/router';

// Guards
import { LoginGuard } from '../services/guards/login.guard';
import { AdminGuard } from '../services/guards/admin.guard';
import { AlmaceneroGuard } from '../services/guards/almacenero.guard';
import { VendedorGuard } from '../services/guards/vendedor.guard';
import { EditUserGuard } from '../services/guards/edit-user.guard';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { UsersManagmentComponent } from './users-managment/users-managment.component';
import { ClientsComponent } from './clients/clients.component';
import { SupplierComponent } from './supplier/supplier.component';
import { IncomesComponent } from './incomes/incomes.component';
import { IncomesManagementComponent } from './incomes-management/incomes-management.component';
import { SellsComponent } from './sells/sells.component';
import { SellsManagementComponent } from './sells-management/sells-management.component';
import { SearchComponent } from './search/search.component';

const ROUTES: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard', desc: 'Main menu of the app, useful information only' }
    },
    {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title: 'Ajustes del sistema', desc: 'Edita el tema del sistema' }
    },
    {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AlmaceneroGuard],
        data: { title: 'Categorías', desc: 'Categorías de los productos registrados por el usuario' }
    },
    {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AlmaceneroGuard],
        data: { title: 'Artículos', desc: 'Artículos registrados por el usuario' }
    },
    {
        path: 'roles',
        component: RolesComponent,
        canActivate: [AdminGuard],
        data: { title: 'Roles', desc: 'Tipos de usuario del sistema' }
    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [AdminGuard],
        data: { title: 'Usuarios', desc: 'Usuarios registrados en el sistema' }
    },
    {
        path: 'users/:id',
        component: UsersManagmentComponent,
        canActivate: [EditUserGuard],
        data: { title: 'Usuarios', desc: 'Cree o edite usuarios en el sistema' }
    },
    {
        path: 'clients',
        component: ClientsComponent,
        canActivate: [VendedorGuard],
        data: { title: 'Clientes', desc: 'Cree o edite sus clientes en el sistema' }
    },
    {
        path: 'suppliers',
        component: SupplierComponent,
        canActivate: [AlmaceneroGuard],
        data: { title: 'Proveedores', desc: 'Cree o edite sus proveedores en el sistema' }
    },
    {
        path: 'incomes',
        component: IncomesComponent,
        canActivate: [AlmaceneroGuard],
        data: { title: 'Ingresos', desc: 'Cree o edite sus ingresos en el sistema' }
    },
    {
        path: 'incomes/:id',
        component: IncomesManagementComponent,
        canActivate: [AlmaceneroGuard],
        data: { title: 'Ingresos', desc: 'Cree o vea sus ingresos en el sistema' }
    },
    {
        path: 'sells',
        component: SellsComponent,
        canActivate: [VendedorGuard],
        data: { title: 'Ventas', desc: 'Cree o vea sus ventas en el sistema' }
    },
    {
        path: 'sells/:id',
        component: SellsManagementComponent,
        canActivate: [VendedorGuard],
        data: { title: 'Ventas', desc: 'Cree o vea sus ingresos en el sistema' }
    },
    {
        path: 'search/:hint',
        component: SearchComponent,
        canActivate: [AdminGuard],
        data: { title: 'Buscar', desc: 'Busque categorías, artículos y más' }
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];

export const PAGES_ROUTES = RouterModule.forChild(ROUTES);
