import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { translations } from './../../shared/localisation/translations';

export const i18n_instance = i18n.use(initReactI18next); // passes i18n down to react-i18next
i18n_instance.init({
	resources: translations,
	lng: 'de',
	preload: ['de'],
	fallbackLng: ['de', 'dev'],
	keySeparator: false,

	interpolation: {
		escapeValue: false // react already safes from xss
	},
	react: {
		useSuspense: false
	}
});
