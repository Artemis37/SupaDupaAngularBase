import { Pipe, PipeTransform } from '@angular/core';
import { DateTimeHelpers } from '../services/datetime-helpers';

@Pipe({
  name: 'formatdate',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {
  transform(value: Date | string | null | undefined): string {
    return DateTimeHelpers.formatDate(value);
  }
}
