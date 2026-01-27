import { TranslateService } from '@ngx-translate/core';

export class TranslationHelper {
  static getTranslationKey(prefix: string, key: string): string {
    return `${prefix}.${key}`;
  }

  static async getTranslation(translateService: TranslateService, key: string): Promise<string> {
    return translateService.get(key).toPromise() || key;
  }
}
