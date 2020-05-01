import { TFunction, TOptions } from 'i18next';
import { TranslationItemKey } from '../../shared/localisation/translations';

class MLO {
	protected t: TFunction;
	protected key: TranslationItemKey | TranslationItemKey[];
	protected options?: TOptions | string;

	public constructor(t: TFunction, key: TranslationItemKey | TranslationItemKey[], options?: TOptions | string) {
		this.t = t;
		this.key = key;
		this.options = options;
	}

	public toString() {
		return this.t(this.key, this.options);
	}
}

export function getMLOText(t: TFunction, key: TranslationItemKey | TranslationItemKey[], options?: TOptions | string) {
	return t(key, options);
}

export function getMLO(t: TFunction, key: TranslationItemKey | TranslationItemKey[], options?: TOptions | string): MLO {
	return new MLO(t, key, options);
}
