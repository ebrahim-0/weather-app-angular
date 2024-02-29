import { Routes } from '@angular/router';
import { WeatherListComponent } from './Components/weather-list/weather-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'weather-list', pathMatch: 'full' },
  { path: 'weather-list', component: WeatherListComponent },
  {
    path: 'weather/:city',
    loadComponent: () =>
      import('./Components/weather/weather.component').then(
        (m) => m.WeatherComponent
      ),
  },
];
