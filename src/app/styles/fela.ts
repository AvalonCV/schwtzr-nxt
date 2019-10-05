import { IStyle } from 'fela';

export interface NestedStyle extends IStyle {
	/**
	 * Pseudo-elements
	 * https://developer.mozilla.org/en/docs/Web/CSS/Pseudo-elements
	 */
	'::after'?: IStyle;
	'::before'?: IStyle;
	'::first-letter'?: IStyle;
	'::first-line'?: IStyle;
	'::selection'?: IStyle;
	'::backdrop'?: IStyle;
	'::placeholder'?: IStyle;
	'::marker'?: IStyle;
	'::spelling-error'?: IStyle;
	'::grammar-error'?: IStyle;

	/** Children */
	'> *'?: IStyle;

	/** State selector */
	':hover'?: IStyle;
	':focus'?: IStyle;
	':active'?: IStyle;
	':target'?: IStyle;

	/* Media queries */
	'@media (min-width:1280px)'?: IStyle;
	'@media (min-width:640px)'?: IStyle;
	'@media (max-height:640px) and (max-width: 960px) and (orientation:landscape)'?: IStyle;
}

export const media_query_order = [
	'(min-width:640px)',
	'(max-height:640px) and (max-width: 960px) and (orientation:landscape)',
	'(min-width:1280px)'
];

// export type FelaCSSStyles<T> = { [key in keyof T]: IStyle };

// export type FelaStylesForUnconnectedProps<T> = { [key in keyof T]: string };
