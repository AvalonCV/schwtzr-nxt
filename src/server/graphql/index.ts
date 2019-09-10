import { makeExecutableSchema, IResolvers } from 'graphql-tools';

import link_schema from './linkSchema.gql';

import date_schema from './Date/schema.gql';
import { resolver as DateResolver } from './Date/resolver';

import mlo_schema from './MLO/schema.gql';
import { resolver as MLOResolver } from './MLO/resolver';

import navigation_schema from './Navigation/schema.gql';
import { resolver as NavigationResolver } from './Navigation/resolver';

import book_schema from './Books/schema.gql';
import { resolver as BookResolver } from './Books/resolver';

import merge from 'lodash/merge';

export const gql_document_nodes = [link_schema, date_schema, mlo_schema, navigation_schema, book_schema];
// lodash.merge does a deep-merge (as all resolver have a 'Query' part)
export const gql_resolvers: IResolvers = merge({}, DateResolver, MLOResolver, BookResolver, NavigationResolver);
export const gql_schema = makeExecutableSchema({
	typeDefs: gql_document_nodes,
	resolvers: gql_resolvers
});
