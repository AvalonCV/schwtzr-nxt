import React from 'react';
import { LocationDescriptor } from 'history';
import { Route, Redirect } from 'react-router-dom';

type HTTPStatus = 404 | 301 | 302;

export interface RedirectWithStatusProps {
	from: string;
	to: LocationDescriptor;
	status: HTTPStatus;
}

export const RedirectWithStatus: React.FunctionComponent<RedirectWithStatusProps> = ({ from, to, status }) => {
	return (
		<Route
			render={({ staticContext }) => {
				if (staticContext) {
					staticContext.statusCode = status;
				}
				return <Redirect from={from} to={to} />;
			}}
		/>
	);
};

export const Status: React.FunctionComponent<{ status: HTTPStatus }> = ({ status, children }) => {
	return (
		<Route
			render={({ staticContext }) => {
				if (staticContext) {
					staticContext.statusCode = status;
				}
				return children;
			}}
		/>
	);
};
