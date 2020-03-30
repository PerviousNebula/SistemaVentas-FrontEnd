import { Component, OnInit } from '@angular/core';

// Services
import { SettingsService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sistema de Ventas';

  constructor(private _settings: SettingsService) { }

  ngOnInit(): void { }

}
