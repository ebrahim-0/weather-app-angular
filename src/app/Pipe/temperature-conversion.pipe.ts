import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureConversion',
  standalone: true,
})
export class TemperatureConversionPipe implements PipeTransform {
  transform(temperature: number, unit: string): number {
    return unit.toLocaleUpperCase() === 'C'
      ? temperature - 273.15
      : unit.toLocaleUpperCase() === 'F'
      ? temperature * (9 / 5) - 459.67
      : temperature;
  }
}
