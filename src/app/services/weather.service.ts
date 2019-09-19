import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { autocompleteUrl } from '../endpoint';
import { rootCurrentWeather } from '../endpoint';
import { currentWeatherParams } from '../endpoint';
import { rootForecast5Days } from '../endpoint';
import { forecast5DaysParams } from '../endpoint';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCityAutocomplete(cityName: string): Observable<City[]> {
    return this.http.get<City[]>(`${autocompleteUrl}&q=${cityName}`);
  }

  getCurrentWeather(cityKey: string): Observable<City> {
    return this.http.get<City>(rootCurrentWeather + cityKey + currentWeatherParams);
  }

  get5DaysForecast(cityKey: string): Observable<City[]> {
    return this.http.get<City[]>(rootForecast5Days + cityKey + forecast5DaysParams);
  }
}
