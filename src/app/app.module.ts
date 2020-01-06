//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Local Modules
import { PagesModule } from './pages/pages.module';
import { ServiceModule } from './services/service.module';

//Routes
import { APP_ROUTES } from "./app.routes";

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,    
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PagesModule,
    ServiceModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
