import * as i18next from 'i18next';

declare global {
	namespace Express {
		interface Request {
			i18n: i18next.i18n;
		}
	}
}
