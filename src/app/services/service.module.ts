import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { SettingsService, SidebarService, SharedService } from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService
  ]
})
export class ServiceModule { }
