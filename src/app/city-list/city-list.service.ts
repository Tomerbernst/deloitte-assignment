import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';

@Injectable({
  providedIn: 'root'
})

export class CityListService {

  constructor(private http: HttpClient) {

  }

   getCityWeather(lat: number, lon: number): Observable<any> {
    return this.http.get<void>(`${baseUrl}lat=${lat}&lon=${lon}&appid=f341590409220608a85321691338fca4`);
 }


}
