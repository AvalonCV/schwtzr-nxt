import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Image, DrawPicture } from './Image';

interface CustomMarkdownProperties {
	source: string;
}

/*
	see https://github.com/rexxars/react-markdown/issues/265 for details
	(or updates if thes  makes it into ReactMarkdown)
*/

const imageSizeRegex = /_33B2BF251EFD_([0-9]+x|x[0-9]+|[0-9]+x[0-9]+)$/;
const imagePreprocessor = (source: string) => {
	return source.replace(/(!\[[^\]]*\]\([^)\s]+) =([0-9]+x|x[0-9]+|[0-9]+x[0-9]+)\)/g, '$1_33B2BF251EFD_$2)');
};

function imageRenderer({ src, ...props }: Image) {
	const match = imageSizeRegex.exec(src);
	const image: Image = { src };

	if (match) {
		const [width, height] = match[1].split('x').map(s => (s === '' ? undefined : Number(s)));
		image.src = image.src.replace(imageSizeRegex, '');
		image.width = width;
		image.height = height;
	}

	return <DrawPicture image={image} {...props} />;
}

export const RenderMarkdown: React.StatelessComponent<ReactMarkdown.ReactMarkdownProps & CustomMarkdownProperties> = ({
	source,
	...props
}) => {
	source = imagePreprocessor(source);

	return (
		<ReactMarkdown
			source={source}
			skipHtml={true}
			renderers={{
				image: imageRenderer,
				paragraph: renderer_props => {
					if (
						renderer_props.children &&
						renderer_props.children.length === 1 &&
						(renderer_props.children[0].type === 'img' ||
							('' + renderer_props.children[0].key).indexOf('image-') === 0)
					) {
						return renderer_props.children;
					} else {
						return <p {...renderer_props} />;
					}
				}
			}}
			{...props}
		/>
	);
};
