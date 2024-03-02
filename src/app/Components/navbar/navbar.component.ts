import { Component, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from '../../Services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  location: string = '';

  darkMode: boolean = false;

  constructor(private _Router: Router, private _ThemeService: ThemeService) {}

  ngOnInit(): void {
    this.darkMode = this._ThemeService.isDarkMode;
  }

  toggleDarkMode(isDarkMode: boolean): void {
    this._ThemeService.toggleDarkMode(!isDarkMode);
    this.darkMode = this._ThemeService.isDarkMode;
  }

  getWeather() {
    this._Router.navigate(['/weather', this.location]);
  }
}
