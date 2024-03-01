import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeather } from '../Models/Weather';
import { Countries } from '../Models/Countries';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(
    @Inject('WEATHER_API_URL') private WEATHER_API_URL: string,
    @Inject('WEATHER_API_KEY') private WEATHER_API_KEY: string,
    @Inject('COUNTRIES_API_URL') private COUNTRIES_API_URL: string,
    private _HttpClient: HttpClient
  ) {}

  getAllCountries(): Observable<Countries[]> {
    return this._HttpClient.get<Countries[]>(`${this.COUNTRIES_API_URL}`);
  }

  getWeatherDataByCity(city: string): Observable<IWeather> {
    return this._HttpClient.get<IWeather>(this.WEATHER_API_URL, {
      params: {
        q: city,
        appid: this.WEATHER_API_KEY,
      },
    });
  }
}
