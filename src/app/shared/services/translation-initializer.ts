import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE } from '../models/supported-languages';

export function initializeTranslation(
  translateService: TranslateService
): () => Promise<void> {
  return () => {
    translateService.setDefaultLang(DEFAULT_LANGUAGE);
    return Promise.resolve();
  };
}
