import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import getDocumentDataQuery from './getDocumentData.gql';
import { GetDocumentDataQuery, GetDocumentDataQueryVariables } from '../../../generated/graphql';

import { DrawPicture } from '../elements/Image';
import { RenderMarkdown } from '../elements/Markdown';

export const Document: React.FunctionComponent = (_props: object) => {
	// const { t } = useTranslation();

	const identifier = 'services_for_libraries';
	const { loading, error, data } = useQuery<GetDocumentDataQuery, GetDocumentDataQueryVariables>(
		getDocumentDataQuery,
		{
			variables: {
				identifier: identifier
			}
		}
	);

	if (data && data.getDocument) {
		let image = undefined;
		let alt = '';
		if (data.getDocument.teaser_image) {
			image = {
				src: data.getDocument.teaser_image.src,
				height: data.getDocument.teaser_image.height || 1,
				width: data.getDocument.teaser_image.width || 1
			};
		}

		return (
			<div>
				<h1>{data.getDocument.title}</h1>
				{image && <DrawPicture image={image} alt={alt} />}
				<RenderMarkdown source={data.getDocument.markdown_content} />
			</div>
		);
	} else if (loading) {
		return <div>Still loading</div>;
	} else if (error) {
		return <div>Error: {error}</div>;
	} else {
		return <div>null?</div>;
	}
};
