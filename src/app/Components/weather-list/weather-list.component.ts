import { Component, HostListener, OnInit } from '@angular/core';
import { WeatherService } from '../../Services/weather.service';
import { Router, RouterLink } from '@angular/router';
import { BackgroundColorDirective } from '../../Directives/background-color.directive';
import { Countries } from '../../Models/Countries';

@Component({
  selector: 'app-weather-list',
  standalone: true,
  imports: [RouterLink, BackgroundColorDirective],
  templateUrl: './weather-list.component.html',
  styleUrl: './weather-list.component.css',
})
export class WeatherListComponent implements OnInit {
  constructor(
    private _WeatherService: WeatherService,
    private _Router: Router
  ) {}

  seeMore: boolean = true;

  loading: boolean = true;

  countries: Countries[] = [] as Countries[];

  allCountries: Countries[] = [] as Countries[];

  sliceStart = 0;
  sliceEnd = 9;

  ngOnInit(): void {
    this.loadInitialCountries();
  }

  loadInitialCountries() {
    this._WeatherService.searchLocation.subscribe({
      next: (city) => {
        this._WeatherService.getAllCountries().subscribe({
          next: (data) => {
            if (city) {
              this.countries = this.allCountries.filter(
                (country) =>
                  ((country.capital || country.name) &&
                    country.capital &&
                    country.capital.length > 0 &&
                    country.capital[0]
                      .toLowerCase()
                      .includes(city.toLowerCase())) ||
                  country.name.official
                    .toLowerCase()
                    .includes(city.toLowerCase())
              );

              this.seeMore = false;
            } else {
              this.allCountries = data.filter(
                (country) => country.name.official !== 'State of Israel'
              );

              this.countries = data
                .filter(
                  (country) => country.name.official !== 'State of Israel'
                )
                .slice(this.sliceStart, this.sliceEnd);
              this.loading = false;
            }
          },

          error: (err) => console.log('err', err),
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadMoreCountries() {
    if (this.sliceEnd < this.allCountries.length) {
      this.sliceEnd += 3;
      this.countries = this.allCountries.slice(this.sliceStart, this.sliceEnd);

      this.seeMore = true;
    } else {
      this.seeMore = false;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (this.countries.length === this.allCountries.length) return;

    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      setTimeout(() => {
        this.loadMoreCountries();
      }, 500);
    }
  }

  searchCity(event: Event, city: HTMLInputElement) {
    event.preventDefault();

    this._Router.navigate(['/weather', city.value]);
  }
}
