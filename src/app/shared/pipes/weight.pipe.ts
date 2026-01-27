import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weight',
  standalone: true
})
export class WeightPipe implements PipeTransform {
  transform(value: number | null | undefined, unit: 'kg' | 'lb' = 'kg'): string {
    if (value === null || value === undefined) {
      return '';
    }
    return `${value.toFixed(2)} ${unit}`;
  }
}
