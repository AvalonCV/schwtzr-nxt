import React from 'react';

import max from 'lodash/max';

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
	type?: string;
	placeholder?: string;
	responsive_images?: ResponsiveImage[];
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

const buildSourceSetAndSizes: (
	images: ResponsiveImage[],
	original_size?: number
) => { srcset: string; sizes: string | undefined } = (images, _original_size) => {
	const srcset_image = images
		.sort((a, b) => a.width - b.width)
		.map(image => {
			return `${image.src} ${image.width}w`;
		});
	const max_width = max(images.map(image => image.width));
	const sizes = `(max-width: ${max_width}px) 100vw, ${max_width}px`;

	return {
		srcset: srcset_image.join(', '),
		sizes: sizes
	};
};

export const DrawPicture: React.FunctionComponent<PictureComponentProps> = (props: ImageProperties) => {
	const { css } = useFela(props);
	const { image, additional_styles, alt = 'No description :(', title } = props;

	if (image.height && image.height > 0 && image.width && image.width > 0) {
		const styles = getStyles(image.height, image.width, image.placeholder);

		const responsive_image_types: string[] = [];
		const { responsive_images = [] } = image;

		if (responsive_images.length) {
			responsive_images.forEach(responsive_image => {
				if (responsive_image_types.indexOf(responsive_image.type) === -1) {
					responsive_image_types.push(responsive_image.type);
				}
			});
		}

		let responsive_attributes = undefined;
		if (image.type) {
			const index = responsive_image_types.indexOf(image.type);
			if (index > -1) {
				responsive_image_types.splice(index, 1);

				responsive_attributes = buildSourceSetAndSizes(
					responsive_images.filter(responsive_image => image.type === responsive_image.type)
				);
			}
		}

		return (
			<picture className={css({ ...styles.picture, ...additional_styles })}>
				{image.responsive_images &&
					responsive_image_types.length &&
					responsive_image_types.map((type, index) => {
						const { srcset, sizes } = buildSourceSetAndSizes(
							responsive_images.filter(responsive_image => type === responsive_image.type)
						);

						return <source srcSet={srcset} sizes={sizes} key={index} type={type} />;
					})}
				<img
					alt={alt}
					title={title}
					src={image.src}
					srcSet={responsive_attributes && responsive_attributes.srcset}
					sizes={responsive_attributes && responsive_attributes.sizes}
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
