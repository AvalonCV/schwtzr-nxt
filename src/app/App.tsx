import React from 'react';

import { IRenderer } from 'fela';
import { RendererProvider } from 'react-fela';

import { I18nextProvider } from 'react-i18next';

import { MainLayout } from './components/layout/MainLayout';
import i18next from 'i18next';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';

import { StaticRouterProps } from 'react-router';
import { BrowserRouterProps } from 'react-router-dom';

interface AppProps {
	fela_renderer: IRenderer;
	i18n_instance: i18next.i18n;
	apollo_client: ApolloClient<unknown>;
	RouterComponent: React.ComponentType;
	router_props: StaticRouterProps | BrowserRouterProps;
	// tslint:disable-next-line: no-any
	[key: string]: any;
}
interface AppState {}

export class App extends React.PureComponent<AppProps, AppState> {
	public render(): JSX.Element {
		return (
			<ApolloProvider client={this.props.apollo_client}>
				<RendererProvider renderer={this.props.fela_renderer}>
					<this.props.RouterComponent {...this.props.router_props}>
						<I18nextProvider i18n={this.props.i18n_instance}>
							<MainLayout>
								<div>Hello &amp; Welcome....</div>
							</MainLayout>
						</I18nextProvider>
					</this.props.RouterComponent>
				</RendererProvider>
			</ApolloProvider>
		);
	}
}
