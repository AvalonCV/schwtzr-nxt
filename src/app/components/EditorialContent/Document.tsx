import React from 'react';

import getDocumentDataQuery from './getDocumentData.gql';
import { GetDocumentDataQuery, GetDocumentDataQueryVariables } from '../../../generated/graphql';

import { DrawPicture } from '../elements/Image';
import { RenderMarkdown } from '../elements/Markdown';

import { Status } from '../elements/HTTPStatus';
import { asPage } from '../Pages/asPage';

interface DocumentContentProperties {
	data: GetDocumentDataQuery;
}

interface DocumentRouteParameters {
	identifier: string;
}

const DocumentContent: React.FunctionComponent<DocumentContentProperties> = props => {
	if (props.data && props.data.getDocument) {
		let image = undefined;
		let alt = '';
		if (props.data.getDocument.teaser_image) {
			image = {
				src: props.data.getDocument.teaser_image.src,
				height: props.data.getDocument.teaser_image.height || undefined,
				width: props.data.getDocument.teaser_image.width || undefined,
				placeholder: props.data.getDocument.teaser_image.placeholder || undefined
			};
		}

		return (
			<div>
				<h1>{props.data.getDocument.title}</h1>
				{image && <DrawPicture image={image} alt={alt} sizes_max_width={1280} />}
				<RenderMarkdown source={props.data.getDocument.markdown_content} />
			</div>
		);
	} else {
		return (
			<Status status={404}>
				<div>Document not found</div>
			</Status>
		);
	}
};

export const DocumentPage = asPage<GetDocumentDataQuery, GetDocumentDataQueryVariables, DocumentRouteParameters>(
	DocumentContent,
	{
		getQueryData: route_params => {
			return {
				query: getDocumentDataQuery,
				variables: { identifier: route_params.identifier }
			};
		},
		getPageTitle: data => {
			return (data.getDocument && data.getDocument.title) || 'No title found';
		},
		getMetaData: data => {
			return data.getDocument && data.getDocument.title
				? [
						{
							name: 'description',
							content: data.getDocument.title
						}
						// tslint:disable-next-line: indent
				  ]
				: [];
		}
	}
);
