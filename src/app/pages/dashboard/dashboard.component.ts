import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from '../../services/service.index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  public ingresosChartLabels: any;
  public ingresosChartData: any;
  public ventasChartLabels: any;
  public ventasChartData: any;
  public totalIngresos: number;
  public totalVentas: number;
  public loading: boolean;
  private subscription = new Subscription();

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.loading = true;
    this.subscription.add(this.dashboardService.getGraficas().subscribe(resp => {
      this.ingresosChartLabels  = resp.ingresos.bartChartLabels;
      this.ingresosChartData    = resp.ingresos.barChartData;
      this.totalIngresos        = resp.totalIngresos;
      this.ventasChartLabels    = resp.ventas.bartChartLabels;
      this.ventasChartData      = resp.ventas.barChartData;
      this.totalVentas          = resp.totalVentas;
      this.loading = false;
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
