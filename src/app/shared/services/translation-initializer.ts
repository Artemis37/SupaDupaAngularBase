import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../models/supported-languages';
import { DynamicLocaleId } from './dynamic.locale';

export function initializeTranslation(
  translateService: TranslateService,
  dynamicLocale: DynamicLocaleId
): () => Promise<void> {
  return () => {
    // Set locale immediately (synchronous)
    const defaultLang = DEFAULT_LANGUAGE;
    const supportedLang = SUPPORTED_LANGUAGES.find(lang => lang.code === defaultLang);
    
    if (supportedLang) {
      dynamicLocale.setLocale(supportedLang.locale);
    }
    
    // Set default language (synchronous)
    translateService.setDefaultLang(defaultLang);
    
    // Start loading translations asynchronously without blocking
    // Use setTimeout to ensure it runs after the app initializes
    setTimeout(() => {
      translateService.use(defaultLang).subscribe({
        next: () => {
          // Translations loaded successfully
        },
        error: (error) => {
          console.error('Translation loading error:', error);
        }
      });
    }, 0);
    
    // Return immediately - don't wait for translations to load
    // This prevents the app from hanging during startup
    return Promise.resolve();
  };
}
