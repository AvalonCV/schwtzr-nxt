import React from 'react';

import { FelaComponent } from 'react-fela';
import { NestedStyle } from '../../styles/fela';
import { IStyle } from 'fela';

interface Image {
	src: string;
	width: number;
	height: number;
	type: string;
}

interface ImageProperties {
	image: Image;
	additional_styles?: IStyle;
	alt?: string;
	title?: string;
	max_width?: number;
	max_height?: number;
}

const getPictureStyles: (height: number, width: number) => NestedStyle = (height: number, width: number) => {
	/* some global 'img & picture' styles are defined in core.css(.ts) */
	return {
		width: width + 'px',
		':after': {
			paddingBottom: (100.0 * height) / width + '%'
		}
	};
};

export const DrawPicture: React.StatelessComponent<ImageProperties> = (props: ImageProperties) => {
	const { image, additional_styles, alt = 'No description :(', title } = props;

	const picture_styles = { ...getPictureStyles(image.height, image.width), ...additional_styles };

	return (
		<FelaComponent as="picture" style={picture_styles}>
			<img alt={alt} title={title} src={image.src} height={image.height} width={image.width} />
		</FelaComponent>
	);
};
