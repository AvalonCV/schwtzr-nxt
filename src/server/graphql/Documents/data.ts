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
			src: 'https://www.rluk.ac.uk/wp-content/uploads/2014/07/Bristol-WML-2.jpg',
			width: 1442,
			height: 518
		},
		markdown_content: services_for_libraries_markdown
	},
	right_of_withdrawal: {
		title: 'Widerrufsrecht',
		markdown_content: right_of_withdrawal_markdown
	}
};
