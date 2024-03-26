import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'unit',
    standalone: true
})
export class UnitPipe implements PipeTransform {
  unitMapping : Record<string, string[]> = {"Kelvin": ["K", "K", "", "%", "metre/sec", "hPa"], "Celsius": ["C", "C", "", "%", "metre/sec", "hpa"], 
                                            "Farenheit": ["F", "F", "", "%", "miles/hr", "hPa"]};

  transform(value: string, index: number): string {
    return this.unitMapping[value][index];
  }
}