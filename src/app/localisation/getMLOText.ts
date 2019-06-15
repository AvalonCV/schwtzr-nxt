import i18next from 'i18next';
import { TranslationItemKey } from '../../shared/localisation/translations';

class MLO {
	protected t: i18next.TFunction;
	protected key: TranslationItemKey | TranslationItemKey[];
	protected options?: i18next.TOptions | string;

	public constructor(
		t: i18next.TFunction,
		key: TranslationItemKey | TranslationItemKey[],
		options?: i18next.TOptions | string
	) {
		this.t = t;
		this.key = key;
		this.options = options;
	}

	public toString() {
		return this.t(this.key, this.options);
	}
}

export function getMLOText(
	t: i18next.TFunction,
	key: TranslationItemKey | TranslationItemKey[],
	options?: i18next.TOptions | string
) {
	return t(key, options);
}

export function getMLO(
	t: i18next.TFunction,
	key: TranslationItemKey | TranslationItemKey[],
	options?: i18next.TOptions | string
): MLO {
	return new MLO(t, key, options);
}
