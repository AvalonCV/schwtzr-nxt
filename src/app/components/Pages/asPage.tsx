import React from 'react';
import { Helmet } from 'react-helmet-async';

import { DocumentNode } from 'graphql';
import { useQuery } from '@apollo/react-hooks';

import { useParams } from 'react-router';

import { Status } from '../elements/HTTPStatus';
import { PageElementLoader } from '../elements/PageLoader';

interface MetaData {
	name: string;
	content: string;
}

interface QueryData<TQueryVariables> {
	query: DocumentNode;
	variables?: TQueryVariables;
}

interface AsPageConfiguration<TQuery, TQueryVariables, TRouteParameters> {
	getQueryData: (route_params: Partial<TRouteParameters>) => QueryData<TQueryVariables>;
	getPageTitle: (data: TQuery) => string;
	getMetaData?: (data: TQuery) => MetaData[];
}

interface PageContentProperties<TQuery> {
	data: TQuery;
}

export function asPage<TQuery, TQueryVariables = {}, TRouteParameters = {}>(
	PageComponent: React.ComponentType<PageContentProperties<TQuery>>,
	configuration: AsPageConfiguration<TQuery, TQueryVariables, TRouteParameters>
): React.FunctionComponent<PageContentProperties<TQuery>> {
	return (_props: object) => {
		// useParams is still missing the correct type / generic
		// -> useParams<TRouteParameters> leads to
		// Argument of type '{ [p in keyof TRouteParameters]: string; }' is not assignable to parameter of
		// type 'Partial<TRouteParameters>'. Type 'string' is not assignable to type 'TRouteParameters[P] | undefined
		const route_params = useParams();
		const { query, variables } = configuration.getQueryData(route_params);
		const { loading, error, data } = useQuery<TQuery, TQueryVariables>(query, {
			variables: variables
		});

		if (loading) {
			return <PageElementLoader />;
		} else if (error) {
			return <div>Error: {error}</div>;
		} else if (data) {
			const meta_data = (configuration.getMetaData && configuration.getMetaData(data)) || [];
			return (
				<React.Fragment>
					<Helmet key="helmet_data">
						<title>{configuration.getPageTitle(data)}</title>
						{meta_data.map(current => {
							return <meta key={current.name} name={current.name} content={current.content} />;
						})}
					</Helmet>
					<PageComponent key="page_content" data={data} />
				</React.Fragment>
			);
		} else {
			return (
				<Status status={404}>
					<div>Page not found</div>
				</Status>
			);
		}
	};
}
