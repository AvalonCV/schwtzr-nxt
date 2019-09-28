import { Document } from './../../../generated/graphql';

import services_for_libraries_image from './../../../app/images/Bristol-WML-2.84.jpg';
import services_for_libraries_markdown from './Markdown/de/services_for_libraries.md';

import right_of_withdrawal_markdown from './Markdown/de/right_of_withdrawal.md';

interface DocumentData {
	[identifier: string]: Document;
}

export const documents: DocumentData = {
	services_for_libraries: {
		title: 'Serviceseite Bibliotheken',
		teaser_image: {
			src: services_for_libraries_image.src,
			width: services_for_libraries_image.width,
			height: services_for_libraries_image.height,
			placeholder: services_for_libraries_image.placeholder
		},
		markdown_content: services_for_libraries_markdown
	},
	right_of_withdrawal: {
		title: 'Widerrufsrecht',
		markdown_content: right_of_withdrawal_markdown
	}
};
