import { footer_navigation } from './data';

export const resolver = {
	Query: {
		header: () => {
			return null;
		},

		footer: () => {
			return footer_navigation;
		},

		navigation: (_parent: object, { id }: { id: string }) => {
			return footer_navigation.find(element => {
				return element.section_key === id;
			});
		}
	}
};
