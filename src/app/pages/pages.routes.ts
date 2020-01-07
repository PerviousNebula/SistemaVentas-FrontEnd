// Modules
import { RouterModule, Routes } from '@angular/router';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { CategoriesComponent } from './categories/categories.component';

const ROUTES: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: { title: 'Dashboard', desc: 'Main menu of the app, useful information only' }
            },
            {
                path: 'graficas1',
                component: Graficas1Component,
                data: { title: 'Charts', desc: 'Useful charts for the user' }
            },
            {
                path: 'progreso',
                component: ProgressComponent,
                data: { title: 'Progress', desc: 'Customizables and animated progresses controls' }
            },
            {
                path: 'account-settings',
                component: AccountSettingsComponent,
                data: { title: 'Theme Settings', desc: 'Customizables app theme colors' }
            },
            {
                path: 'promesas',
                component: PromesasComponent,
                data: { title: 'Promises', desc: 'Async managment with promises' }
            },
            {
                path: 'rxjs',
                component: RxjsComponent,
                data: { title: 'RxJS', desc: 'Async managment with observables from RxJS library' }
            },
            {
                path: 'categories',
                component: CategoriesComponent,
                data: { title: 'Categorías', desc: 'Categorías de los productos registrados por el usuario' }
            },
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            }
            /*{ path: '**', component: NopagefoundComponent }*/
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(ROUTES);
