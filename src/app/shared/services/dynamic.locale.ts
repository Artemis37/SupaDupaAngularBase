import { Injectable, LOCALE_ID } from '@angular/core';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../models/supported-languages';

@Injectable({
  providedIn: 'root'
})
export class DynamicLocaleId {
  private currentLocale: string = DEFAULT_LANGUAGE;

  setLocale(locale: string): void {
    const supported = SUPPORTED_LANGUAGES.find(lang => lang.code === locale);
    if (supported) {
      this.currentLocale = supported.locale;
    }
  }

  getLocale(): string {
    return this.currentLocale;
  }
}

export function provideDynamicLocale(): { provide: typeof LOCALE_ID; useClass: typeof DynamicLocaleId } {
  return {
    provide: LOCALE_ID,
    useClass: DynamicLocaleId
  };
}
