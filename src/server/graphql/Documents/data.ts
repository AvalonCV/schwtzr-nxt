import { Document } from './../../../generated/graphql';

import services_for_libraries_markdown from './Markdown/de/services_for_libraries.md';
import right_of_withdrawal_markdown from './Markdown/de/right_of_withdrawal.md';

interface DocumentData {
	[identifier: string]: Document;
}

export const documents: DocumentData = {
	services_for_libraries: {
		title: 'Serviceseite Bibliotheken',
		teaser_image: {
			url:
				'https://content.schweitzer-online.de/static/content/uploads/StoreFront/contentItem/87637/snippet_201277/image.png?version=7',
			height: 221,
			width: 810
		},
		markdown_content: services_for_libraries_markdown
	},
	right_of_withdrawal: {
		title: 'Widerrufsrecht',
		markdown_content: right_of_withdrawal_markdown
	}
};
