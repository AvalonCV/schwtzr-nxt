import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema from './Navigation/test.gql';

import { resolver as NavigationResolver } from './Navigation/resolver';

export function initGraphQLServer(app: Express) {
	const apollo_server = new ApolloServer({
		typeDefs: schema,
		resolvers: NavigationResolver
	});
	apollo_server.applyMiddleware({ app: app, path: '/graphql' });
}
