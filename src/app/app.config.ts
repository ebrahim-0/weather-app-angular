import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    {
      provide: 'WEATHER_API_URL',
      useValue: 'https://api.openweathermap.org/data/2.5/weather',
    },
    {
      provide: 'WEATHER_API_KEY',
      useValue: 'ce9d642e471b47b8b5b12a0d8a55db11',
    },
    {
      provide: 'COUNTRIES_API_URL',
      useValue: 'https://restcountries.com/v3.1/all',
    },
  ],
};
