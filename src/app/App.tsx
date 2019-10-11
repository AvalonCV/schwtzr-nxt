import React from 'react';

import { IRenderer } from 'fela';
import { RendererProvider, ThemeProvider } from 'react-fela';

import * as i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

import { MainLayout } from './components/layout/MainLayout';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';

import { StaticRouterProps } from 'react-router';
import { BrowserRouterProps } from 'react-router-dom';
import { ScrollToTopOnRouteChange } from './components/elements/ScrollToTop';

import { /*Helmet,*/ HelmetProvider } from 'react-helmet-async';

interface AppProps {
	fela_renderer: IRenderer;
	apollo_client: ApolloClient<unknown>;
	RouterComponent: React.ComponentType;
	router_props: StaticRouterProps | BrowserRouterProps;
	react_helmet_context?: {};
	i18n: i18next.i18n;
	// tslint:disable-next-line: no-any
	[key: string]: any;
}

interface AppState {}

export class App extends React.PureComponent<AppProps, AppState> {
	public render(): JSX.Element {
		return (
			<ApolloProvider client={this.props.apollo_client}>
				<RendererProvider renderer={this.props.fela_renderer}>
					<ThemeProvider theme={{ main_color: '#1d3c8d' }}>
						<this.props.RouterComponent {...this.props.router_props}>
							{/* tslint:disable-next-line: no-any (as long as https://github.com/i18next/react-i18next/pull/945
							breaks this code (i18n 'only' has reportNamespaces as property)) */}
							<I18nextProvider i18n={this.props.i18n}>
								<HelmetProvider context={this.props.react_helmet_context}>
									{/* <Helmet>
										<title>B2B Panda</title>
										<meta name="description" content="Lé Content" />
									</Helmet> */}
									<ScrollToTopOnRouteChange />
									<MainLayout>
										<div>Hello &amp; Welcome....</div>
									</MainLayout>
								</HelmetProvider>
							</I18nextProvider>
						</this.props.RouterComponent>
					</ThemeProvider>
				</RendererProvider>
			</ApolloProvider>
		);
	}
}
