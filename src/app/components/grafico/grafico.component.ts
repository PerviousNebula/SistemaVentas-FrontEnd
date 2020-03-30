import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html'
})
export class GraficoComponent implements OnInit {
  @Input() data: ChartDataSets[] = [];
  @Input() labels: Label[] = [];
  @Input() chartColor: any[] = [{ backgroundColor: ["#800080"] }];

  constructor() { }

  ngOnInit() {
  }

}
