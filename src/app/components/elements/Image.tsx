import React from 'react';

import { useFela } from 'react-fela';
import { NestedStyle } from '../../styles/fela';
import { IStyle } from 'fela';

interface ResponsiveImage {
	src: string;
	width: number;
	type: string;
}

export interface Image {
	src: string;
	width?: number;
	height?: number;
	placeholder?: string;
	reponsive_images?: ResponsiveImage[];
}

interface ImageProperties {
	image: Image;
	additional_styles?: IStyle;
	alt?: string;
	title?: string;
	max_width?: number;
	max_height?: number;
}

type PictureComponentProps = ImageProperties & {
	[additional: string]: unknown;
};

const getStyles: (
	height: number,
	width: number,
	placeholder?: string
) => { picture: NestedStyle; image: NestedStyle } = (height: number, width: number, placeholder?: string) => {
	/* some global 'img & picture' styles are defined in core.css(.ts) */

	const styles = {
		picture: {
			width: width + 'px',
			'::after': {
				paddingBottom: (100.0 * height) / width + '%'
			}
		} as NestedStyle,
		image: {} as NestedStyle
	};

	if (placeholder) {
		styles.picture.backgroundImage = `url(${placeholder})`;
		styles.picture.backgroundRepeat = 'no-repeat';
		styles.picture.backgroundRepeat = 'no-repeat';
		styles.picture.backgroundSize = 'cover';
		styles.image.animation = 'fadeIn 1000ms 1';
	}

	return styles;
};

export const DrawPicture: React.FunctionComponent<PictureComponentProps> = (props: ImageProperties) => {
	const { css } = useFela(props);
	const { image, additional_styles, alt = 'No description :(', title } = props;

	if (image.height && image.height > 0 && image.width && image.width > 0) {
		const styles = getStyles(image.height, image.width, image.placeholder);

		return (
			<picture className={css({ ...styles.picture, ...additional_styles })}>
				<img
					alt={alt}
					title={title}
					src={image.src}
					height={image.height}
					width={image.width}
					className={css(styles.image)}
				/>
			</picture>
		);
	} else {
		return <img alt={alt} title={title} src={image.src} height={image.height} width={image.width} />;
	}
};
