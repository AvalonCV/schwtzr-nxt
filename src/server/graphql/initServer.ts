import { Express } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

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

export function initGraphQLServer(app: Express) {
	const apollo_server = new ApolloServer({
		typeDefs: [linkSchema, navigation_schema, book_schema],
		resolvers: { ...NavigationResolver, ...BookResolver }
	});
	apollo_server.applyMiddleware({ app: app, path: '/graphql' });
}
