import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'length',
  standalone: true
})
export class LengthPipe implements PipeTransform {
  transform(value: number | null | undefined, unit: 'm' | 'ft' = 'm'): string {
    if (value === null || value === undefined) {
      return '';
    }
    return `${value.toFixed(2)} ${unit}`;
  }
}
