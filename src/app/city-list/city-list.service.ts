import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';

@Injectable({
  providedIn: 'root'
})

export class CityListService {

  constructor(private http: HttpClient , lat: number, long: number) {

  }

//   getApplications(): Observable<any> {
//     return this.http.delete<void>(`${baseUrl}lat=${this.lat}&lon=${lon}&appid=f341590409220608a85321691338fca4'`);
//   }

//   deleteApplications(id: string): Observable<void> {
//     return this.http.delete<void>(`${baseUrl}lat=${lat}&lon=${lon}&appid=f341590409220608a85321691338fca4'`);
//   }
}
