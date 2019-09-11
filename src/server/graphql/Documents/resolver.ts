import { documents } from './data';
import { IResolvers } from 'graphql-tools';

import { Document, QueryResolvers } from './../../../generated/graphql';

export const resolver: IResolvers & { Query: Pick<QueryResolvers, 'getDocument'> } = {
	Query: {
		getDocument: (_parent, args, _context): Document | null => {
			const { identifier } = args;
			return (identifier && documents[identifier]) || null;
		}
	}
};
