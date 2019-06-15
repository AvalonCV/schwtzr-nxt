import { navigations } from './data';

export const resolver = {
	Query: {
		getHeaderNavigation: () => {
			return navigations.find(navigation => {
				return navigation.id === 'header';
			});
		},

		getFooterNavigation: () => {
			return navigations.find(navigation => {
				return navigation.id === 'footer';
			});
		}

		// getNavigationSection: (_parent: object, { id }: { id: string }) => {
		// 	return null;
		// }
	}
};
