import { navigations } from './data';
import { IResolvers } from 'graphql-tools';

export const resolver: IResolvers = {
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
