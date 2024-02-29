import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',

    redirectTo: 'weather-list',
    pathMatch: 'full',
  },
  {
    path: 'weather-list',
    loadComponent: () =>
      import('./Components/weather-list/weather-list.component').then(
        (m) => m.WeatherListComponent
      ),
  },

  {
    path: 'weather/:city',
    loadComponent: () =>
      import('./Components/weather/weather.component').then(
        (m) => m.WeatherComponent
      ),
  },
];
