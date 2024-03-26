import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'excludeLastKey',
    standalone: true
})
export class ExcludeLastKeyPipe implements PipeTransform {
  transform(value: any): string[] {
    if (!value || typeof value !== 'object') {
      return [];
    }

    const keys = Object.keys(value);
    return keys.slice(0, -1);
  }
}