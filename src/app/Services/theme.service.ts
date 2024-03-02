import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode!: boolean;
  constructor() {
    let stringValue =
      window.localStorage.getItem('darkMode') ||
      window.matchMedia('(prefers-color-scheme: dark)').matches.toString();

    let boolValue = /true/i.test(stringValue);
    this.isDarkMode = boolValue;
  }

  toggleDarkMode(isDarkMode: boolean): void {
    this.isDarkMode = isDarkMode;
    window.localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }
}
