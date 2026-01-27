import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../models/supported-languages';
import { DynamicLocaleId } from './dynamic.locale';

export function initializeTranslation(
  translateService: TranslateService,
  dynamicLocale: DynamicLocaleId
): () => Promise<void> {
  return () => {
    const defaultLang = DEFAULT_LANGUAGE;
    const supportedLang = SUPPORTED_LANGUAGES.find(lang => lang.code === defaultLang);
    
    if (supportedLang) {
      dynamicLocale.setLocale(supportedLang.locale);
    }
    
    translateService.setDefaultLang(defaultLang);
    
    return Promise.resolve();
  };
}
