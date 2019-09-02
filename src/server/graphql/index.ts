import { gql } from 'apollo-server-express';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';

import navigation_schema from './Navigation/schema.gql';
import { resolver as NavigationResolver } from './Navigation/resolver';

import book_schema from './Books/schema.gql';
import { resolver as BookResolver } from './Books/resolver';

const linkSchema = gql`
	type Query {
		_: Boolean
	}

	type Mutation {
		_: Boolean
	}

	type Subscription {
		_: Boolean
	}
`;

export const gql_document_nodes = [linkSchema, navigation_schema, book_schema];
export const gql_resolvers: IResolvers = {
	...NavigationResolver,
	...BookResolver
};
export const gql_schema = makeExecutableSchema({
	typeDefs: gql_document_nodes,
	resolvers: gql_resolvers
});
