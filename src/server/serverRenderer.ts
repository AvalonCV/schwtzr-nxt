import webpack from 'webpack';
import { Request, Response } from 'express';
import { minify } from 'html-minifier';

import React from 'react';
import { App } from './../app/App';

import { ApolloClient } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { renderToStringWithData } from '@apollo/react-ssr';
import { gql_schema } from './graphql/index';

// import { useSSR } from 'react-i18next';
// import { translations } from './../shared/localisation/translations';

import { createRenderer } from 'fela';
import { renderToMarkup } from 'fela-dom';
import { media_query_order } from '../app/styles/fela';
import { corecss } from './../shared/css/core.css';
import normalizecss from './../shared/css/normalize.css';
// import { i18n_instance } from '../app/localisation/instance';

import { StaticRouter } from 'react-router';

import { FilledContext } from 'react-helmet-async';

const is_production = process.env.NODE_ENV === 'production';

// Or use 'webpack.compilation.Asset' ?
type Assets = string | [] | {};
interface CompilationWithName extends webpack.compilation.Compilation {
	name?: string;
}

// This function makes server rendering of asset references consistent with different webpack chunk/entry configurations
// https://github.com/webpack/webpack-dev-middleware#server-side-rendering
const normalizeAssets: (assets: Assets) => string[] = (assets: Assets) => {
	if (typeof assets === 'object' && assets !== null) {
		return Object.values(assets);
	} else {
		return Array.isArray(assets) ? assets : [assets];
	}
};

const getWebpackScriptAssets = (res: Response) => {
	const assets: string[] = [];

	if (is_production) {
		assets.push('/public/js/client.js');
	} else {
		const webpackStats: webpack.Stats[] = res.locals.webpackStats.stats;

		webpackStats
			.filter(element => {
				const { compilation }: { compilation: CompilationWithName } = element;
				return compilation.name === 'client';
			})
			.forEach(element => {
				for (let asset in element.compilation.assets) {
					if (element.compilation.assets.hasOwnProperty(asset)) {
						normalizeAssets(asset).forEach(value => {
							// tslint:disable-next-line: no-unused-expression
							value.endsWith('.js') && assets.push(value);
						});
					}
				}
			});
	}

	return assets
		.map(
			(path, _index, array) =>
				`<script type="text/javascript" src="${path}" ${array.length === 1 ? 'async' : 'defer'}></script>`
		)
		.join('\n');
};

type EventuallyFilledContext = Partial<FilledContext>;

export default function serverRenderer() {
	return function(req: Request, res: Response, _next: any) {
		switch (req.path) {
			case '/':
			case '/gtc':
				const fela_renderer = createRenderer({
					mediaQueryOrder: media_query_order,
					devMode: !is_production
				});
				fela_renderer.renderStatic(normalizecss + ' ' + corecss);

				const apollo_client = new ApolloClient({
					ssrMode: true,
					link: new SchemaLink({ schema: gql_schema }),
					cache: new InMemoryCache()
				});

				const router_context = {};
				const helmet_context: EventuallyFilledContext = {};
				const getReactApp = () => {
					return React.createElement(App, {
						fela_renderer: fela_renderer,
						i18n: req.i18n,
						apollo_client: apollo_client,
						RouterComponent: StaticRouter,
						router_props: { location: req.path, context: router_context },
						react_helmet_context: helmet_context
					});
				};

				renderToStringWithData(getReactApp())
					.then((content: string) => {
						const response = `
							<!DOCTYPE html>
							<html lang="en">
							<head>
								<meta charset="utf-8">
								<meta http-equiv="X-UA-Compatible" content="IE=edge">
								<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
								<meta name="theme-color" content="#1d3c8d">

								${renderToMarkup(fela_renderer)}
								${(helmet_context.helmet && helmet_context.helmet.title.toString()) || '<title>Test</title>'}
								${helmet_context.helmet && helmet_context.helmet.meta.toString()}
							</head>
							<body>
								<div class="main_root" id="root">${content}</div>
								<script>
									window.__APOLLO_STATE__ = ${JSON.stringify(apollo_client.extract()).replace(/</g, '\\u003c')}
								</script>
								${getWebpackScriptAssets(res)}
							</body>
							</html>
						`;

						// res.status(200).send(response);
						res.status(200).send(
							minify(response, {
								collapseWhitespace: true,
								minifyJS: false,
								minifyCSS: {
									/* try to disable any optimizations: FELA is not going to re-hydrate them correctly if anything has changed */
									compatibility: {
										properties: {
											colors: false,
											merging: false
										}
									}
								}
							})
						);
					})
					.catch(error => {
						res.status(503).send(error.message);
					});
				break;

			default:
				res.status(404).send();
		}
	};
}
