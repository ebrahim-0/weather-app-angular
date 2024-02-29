import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../Services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { IWeather } from '../../Models/Weather';
import { BackgroundColorDirective } from '../../Directives/background-color.directive';
import { CommonModule } from '@angular/common';
import { TemperatureConversionPipe } from '../../Pipe/temperature-conversion.pipe';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [BackgroundColorDirective, CommonModule, TemperatureConversionPipe],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent implements OnInit {
  constructor(
    private _WeatherService: WeatherService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  unit: string = 'C';
  weatherData: IWeather = {} as IWeather;
  loading: boolean = true;
  errorMsg: string = '';

  ngOnInit(): void {
    const city = String(this._ActivatedRoute.snapshot.paramMap.get('city'));

    this._WeatherService.getWeatherDataByCity(city).subscribe({
      next: (data) => {
        this.weatherData = data;
        console.log('data', data);
      },
      error: (err) => {
        console.log('err', err);

        this.errorMsg = err.error.message;

        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }

  convertUnixTimestamp(timestamp: number): Date {
    return new Date(timestamp * 1000);
  }
}
