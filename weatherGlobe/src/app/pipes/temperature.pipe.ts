import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    const temp: string = Math.round(value).toString()
    return temp + "°C";
  }

}
