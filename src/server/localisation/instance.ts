import express from 'express';
import i18n from 'i18next';
import { initReactI18next, useSSR } from 'react-i18next';
import i18nextMiddleware from 'i18next-express-middleware';
import { translations } from './../../shared/localisation/translations';

type myUseSSR = (initialI18nStore: any, initialLanguage: any, props: object) => void;

export async function createLocalisationInstance(app: express.Express, initial_language = 'de') {
	const i18next_instance = i18n.use(initReactI18next).use(i18nextMiddleware.LanguageDetector);
	return await i18next_instance
		.init({
			resources: translations,
			lng: initial_language,
			preload: ['de'],
			fallbackLng: ['de', 'dev'],
			keySeparator: false,
			interpolation: {
				escapeValue: false // react already safes from xss
			},
			react: {
				useSuspense: false
			},
			debug: false
		})
		.then(() => {
			const myUseSSR: myUseSSR = useSSR;
			myUseSSR(translations, 'de', { i18n: i18next_instance });
			return i18next_instance.changeLanguage('de');
		})
		.then(() => {
			app.use(i18nextMiddleware.handle(i18next_instance));
			return app;
		});
}
