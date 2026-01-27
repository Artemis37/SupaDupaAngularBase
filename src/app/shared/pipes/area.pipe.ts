import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'area',
  standalone: true
})
export class AreaPipe implements PipeTransform {
  transform(value: number | null | undefined, unit: 'm2' | 'ft2' = 'm2'): string {
    if (value === null || value === undefined) {
      return '';
    }
    return `${value.toFixed(2)} ${unit}`;
  }
}
