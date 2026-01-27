export interface SupportedLanguage {
  code: string;
  name: string;
  locale: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English', locale: 'en-US' },
  { code: 'de', name: 'Deutsch', locale: 'de-DE' },
  { code: 'nl', name: 'Nederlands', locale: 'nl-NL' }
];

export const DEFAULT_LANGUAGE = 'en';
