// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Local Modules
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';

// Routes
import { PAGES_ROUTES } from './pages.routes';

// Shared Components
import { PaginationComponent } from '../components/pagination/pagination.component';
import { ImageOverlayComponent } from '../components/image-overlay/image-overlay.component';
import { GraficoComponent } from '../components/grafico/grafico.component';

// Interceptors
import { TokenInterceptorService } from '../services/interceptors/token-interceptor.service';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
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
import { StoreModule } from '@ngrx/store';

@NgModule({
    declarations: [
        DashboardComponent,
        ImageOverlayComponent,
        GraficoComponent,
        PaginationComponent,
        AccountSettingsComponent,
        CategoriesComponent,
        ProductsComponent,
        RolesComponent,
        UsersComponent,
        UsersManagmentComponent,
        ClientsComponent,
        SupplierComponent,
        IncomesComponent,
        IncomesManagementComponent,
        SellsComponent,
        SellsManagementComponent,
        SearchComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ChartsModule,
        PAGES_ROUTES,
        SharedModule,
        PipesModule
    ],
    exports: [
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }
    ],
})
export class PagesModule {}
