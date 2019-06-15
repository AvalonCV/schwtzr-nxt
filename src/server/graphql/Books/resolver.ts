import { classifications } from './data';
import { IResolvers } from 'graphql-tools';

export const resolver: IResolvers = {
	Query: {
		getBook: () => {
			return null;
		},

		getBooks: (_parent, args, _context) => {
			const { q } = args;
			if (q) {
				return classifications.books_indexed.filter(book => {
					return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
				});
			} else {
				return classifications.books_indexed;
			}
		}
	}
};
