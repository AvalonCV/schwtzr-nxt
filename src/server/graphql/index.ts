import { makeExecutableSchema, IResolvers } from 'graphql-tools';

import link_schema from './linkSchema.gql';

import image_schema from './Images/schema.gql';

import document_schema from './Documents/schema.gql';
import { resolver as DocumentResolver } from './Documents/resolver';

import date_schema from './Date/schema.gql';
import { resolver as DateResolver } from './Date/resolver';

import mlo_schema from './MLO/schema.gql';
import { resolver as MLOResolver } from './MLO/resolver';

import fa_icon_schema from './FontAwesomeIcon/schema.gql';
import { resolver as FAIconResolver } from './FontAwesomeIcon/resolver';

import navigation_schema from './Navigation/schema.gql';
import { resolver as NavigationResolver } from './Navigation/resolver';

import book_schema from './Books/schema.gql';
import { resolver as BookResolver } from './Books/resolver';

import merge from 'lodash/merge';

export const gql_document_nodes = [
	link_schema,
	date_schema,
	mlo_schema,
	fa_icon_schema,
	image_schema,
	document_schema,
	navigation_schema,
	book_schema
];
// lodash.merge does a deep-merge (as all resolver have a 'Query' part)
export const gql_resolvers: IResolvers = merge(
	{},
	DateResolver,
	MLOResolver,
	FAIconResolver,
	BookResolver,
	NavigationResolver,
	DocumentResolver
);
export const gql_schema = makeExecutableSchema({
	typeDefs: gql_document_nodes,
	resolvers: gql_resolvers
});
