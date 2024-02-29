import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { WeatherService } from './Services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'WeatherApp';

  location: string = '';

  constructor(private _WeatherService: WeatherService) {}

  onSearchLocation(location: string) {
    this.location = location;

    this._WeatherService.searchLocation.next(location);
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
