import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
                  'Noviembre', 'Diciembre'];

  constructor(private http: HttpClient) { }

  public getGraficas() {
    return this.http.get(`${environment.url}/Chart/ObtenerGraficas`)
                    .pipe(
                      map((resp: any) => {
                        return {
                          ingresos: {
                            barChartData: [{data: resp.ingresos.map(ing => ing.data), label: 'Ingresos'}],
                            bartChartLabels: resp.ingresos.map(ing => this.meses[+ing.label])
                          },
                          totalIngresos: resp.totalIngresos,
                          ventas: {
                            barChartData: [{data: resp.ventas.map(ing => ing.data), label: 'Ventas'}],
                            bartChartLabels: resp.ventas.map(ing => this.meses[+ing.label])
                          },
                          totalVentas: resp.totalVentas
                        };
                      })
                    );
  }
}
