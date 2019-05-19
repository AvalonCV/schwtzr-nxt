import json_data from './translations.en.json';

type Translations = typeof translations.de.translation;
export type TranslationLanguages = keyof (typeof translations);
export type TranslationItemKeys = keyof Translations;
export const translations = json_data;
