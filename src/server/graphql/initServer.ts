import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';

import { gql_document_nodes, gql_resolvers } from './index';

export function initGraphQLServer(app: Express) {
	const apollo_server = new ApolloServer({
		typeDefs: gql_document_nodes,
		resolvers: gql_resolvers
	});
	apollo_server.applyMiddleware({ app: app, path: '/graphql' });
}
