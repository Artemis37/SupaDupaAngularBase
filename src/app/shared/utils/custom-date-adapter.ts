import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { DynamicLocaleId } from '../services/dynamic.locale';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  constructor(private dynamicLocale: DynamicLocaleId) {
    super(dynamicLocale.getLocale());
  }

  override getFirstDayOfWeek(): number {
    return 1; // Monday
  }
}
