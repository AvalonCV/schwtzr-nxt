import { navigations, Navigation } from './data';
import { IResolvers } from 'graphql-tools';

export const resolver: IResolvers = {
	Query: {
		getHeaderNavigation: () => {
			return navigations.find(navigation => {
				return navigation.id === 'header';
			});
		},

		getFooterNavigation: (_parent, _args, _context): Navigation | undefined => {
			return navigations.find(navigation => {
				return navigation.id === 'footer';
			});
		}

		// getNavigationSection: (_parent: object, { id }: { id: string }) => {
		// 	return null;
		// }
	}
};
