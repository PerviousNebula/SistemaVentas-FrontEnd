// Modules
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './login/login.component';

const ROUTES: Routes = [
    { path: 'login', component: LoginComponent }
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, {useHash: true});
