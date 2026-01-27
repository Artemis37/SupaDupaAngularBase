import { Pipe, PipeTransform } from '@angular/core';
import { DateTimeHelpers } from '../services/datetime-helpers';

@Pipe({
  name: 'formattime',
  standalone: true
})
export class FormatTimePipe implements PipeTransform {
  transform(value: Date | string | null | undefined): string {
    return DateTimeHelpers.formatTime(value);
  }
}
