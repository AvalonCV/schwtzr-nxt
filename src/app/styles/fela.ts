import { IStyle } from 'fela';

export interface NestedStyle extends IStyle {
	':before'?: IStyle;
	':after'?: IStyle;
	':hover'?: IStyle;
	':focus'?: IStyle;
	':active'?: IStyle;
	':target'?: IStyle;
}

// export type FelaCSSStyles<T> = { [key in keyof T]: IStyle };

// export type FelaStylesForUnconnectedProps<T> = { [key in keyof T]: string };
