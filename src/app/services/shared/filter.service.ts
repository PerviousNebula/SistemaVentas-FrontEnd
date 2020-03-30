import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient) { }

  public filterAll(hint: string) {
    return this.http.get(`${environment.url}/Buscar/FiltrarTodo/${hint}`);
  }

}
