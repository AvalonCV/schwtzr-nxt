import React from 'react';

import { IconName } from '@fortawesome/fontawesome-common-types';

import { FelaComponent } from 'react-fela';
import { NestedStyle } from '../../styles/fela';

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

const FontAwesomeIcons: { [key: string]: string } = {
	'globe-europe': '\\f7a2',
	edit: '\\f044'
};

type FontAwesomeIconType = 'solid' | 'regular' | 'light' | 'brands';

interface FontAwesomeIconProps {
	type?: FontAwesomeIconType;
	icon: IconName;
	additional_styles?: NestedStyle;
}

const getFontAwesomeIconStyles: ({  }: FontAwesomeIconProps & { type: FontAwesomeIconType }) => NestedStyle = (
	props: FontAwesomeIconProps & { type: FontAwesomeIconType }
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
			content: `"${FontAwesomeIcons[props.icon]}"`
		}
	};
};

export const FontAwesomeIcon: React.StatelessComponent<FontAwesomeIconProps> = (props: FontAwesomeIconProps) => {
	return <FelaComponent as="i" style={getFontAwesomeIconStyles({ ...props, type: props.type || 'solid' })} />;
};
