import React from 'react';

import { FelaComponent } from 'react-fela';
import { NestedStyle } from '../../styles/fela';

import fontAwesomeIconCollection from './fontAwesomeIcons.json';
type FontAwesomeIconCollection = typeof fontAwesomeIconCollection;
export type FontAwesomeIconName = keyof FontAwesomeIconCollection;
export type FontAwesomeIconType = 'solid' | 'regular' | 'light' | 'brands';
export interface FontAwesomeIcon {
	type?: FontAwesomeIconType;
	icon: FontAwesomeIconName;
}

const FontAwesomeFontFamilies = {
	solid: {
		fontFamily: '"Font Awesome 5 Free"',
		fontWeight: 900
	},
	regular: {
		fontFamily: '"Font Awesome 5 Free"',
		fontWeight: 400
	},
	light: {
		fontFamily: '"Font Awesome 5 Free"',
		fontWeight: 300
	},
	brands: {
		fontFamily: '"Font Awesome 5 Brands"',
		fontWeight: 400
	}
};

interface FontAwesomeIconProps {
	type?: FontAwesomeIconType;
	icon: FontAwesomeIcon | FontAwesomeIconName;
	additional_styles?: NestedStyle;
}

interface getFontAwesomeIconStyleProps extends FontAwesomeIconProps {
	type: FontAwesomeIconType;
	icon: FontAwesomeIconName;
}

const getFontAwesomeIconStyles: ({  }: getFontAwesomeIconStyleProps) => NestedStyle = (
	props: getFontAwesomeIconStyleProps
) => {
	return {
		display: 'inline-block',
		lineHeight: 1,
		...props.additional_styles,
		':before': {
			fontStyle: 'normal',
			fontVariant: 'normal',
			textRendering: 'auto',
			fontFamily: FontAwesomeFontFamilies[props.type].fontFamily,
			fontWeight: FontAwesomeFontFamilies[props.type].fontWeight,
			content: `"\\${fontAwesomeIconCollection[props.icon]}"`
		}
	};
};

export const FontAwesomeIcon: React.StatelessComponent<FontAwesomeIconProps> = (props: FontAwesomeIconProps) => {
	let { icon, type, ...rest } = props;
	if (typeof icon === 'object') {
		type = type || icon.type;
		icon = icon.icon;
	} else {
	}

	return (
		<FelaComponent
			as="i"
			style={getFontAwesomeIconStyles({
				...rest,
				icon: icon,
				type: type || 'solid'
			})}
		/>
	);
};
