import i18next from 'i18next';
import { TranslationItemKeys } from '../../shared/localisation/translations';

export function getMLOText(
	t: i18next.TFunction,
	key: TranslationItemKeys | TranslationItemKeys[],
	options?: i18next.TOptions | string
) {
	return t(key, options);
}
