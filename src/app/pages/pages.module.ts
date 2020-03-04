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
import { CategoriesComponent } from './categories/categories.component';

// Interceptors
import { TokenInterceptorService } from '../services/interceptors/token-interceptor.service';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { Graficas1Component } from '../pages/graficas1/graficas1.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProductsComponent } from './products/products.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { UsersManagmentComponent } from './users-managment/users-managment.component';
import { ImageOverlayComponent } from '../components/image-overlay/image-overlay.component';
import { ClientsComponent } from './clients/clients.component';
import { SupplierComponent } from './supplier/supplier.component';
import { IncomesComponent } from './incomes/incomes.component';
import { IncomesManagementComponent } from './incomes-management/incomes-management.component';
import { SellsComponent } from './sells/sells.component';
import { SellsManagementComponent } from './sells-management/sells-management.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        ImageOverlayComponent,
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
        SellsManagementComponent
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
        PagesComponent,
        DashboardComponent,
        Graficas1Component
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
