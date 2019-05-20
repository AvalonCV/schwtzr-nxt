import webpack from 'webpack';
import { Request, Response } from 'express';
import { minify } from 'html-minifier';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from './../app/App';

// import { useSSR } from 'react-i18next';
// import { translations } from './../shared/localisation/translations';

import { createRenderer } from 'fela';
import { renderToMarkup } from 'fela-dom';
import { media_query_order } from '../app/styles/fela';
import { normalizecss } from './../shared/css/normalize.css';
import { corecss } from './../shared/css/core.css';
// import { i18n_instance } from '../app/localisation/instance';

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
					normalizeAssets(asset).forEach(value => {
						value.endsWith('.js') && assets.push(value);
					});
				}
			});
	}

	return assets.map(path => `<script type="text/javascript" src="${path}" defer></script>`).join('\n');
};

export default function serverRenderer() {
	return function(req: Request, res: Response, _next: any) {
		switch (req.path) {
			case '/':
				const fela_renderer = createRenderer({
					mediaQueryOrder: media_query_order,
					devMode: !is_production
				});
				fela_renderer.renderStatic(normalizecss + ' ' + corecss);

				const body = ReactDOMServer.renderToString(
					React.createElement(App, {
						fela_renderer: fela_renderer,
						i18n_instance: req.i18n
					})
				);

				const response = `
					<!DOCTYPE html>
					<html lang="en">
					<head>
						<meta charset="utf-8">
						<meta http-equiv="X-UA-Compatible" content="IE=edge">
						<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
						<meta name="theme-color" content="#000000">

						${renderToMarkup(fela_renderer)}
						<title>Test</title>
					</head>
					<body>
						<div class="main_root" id="root">${body}</div>
						${getWebpackScriptAssets(res)}
					</body>
					</html>
				`;
				// res.status(200).send(response);
				res.status(200).send(
					minify(response, {
						collapseWhitespace: true,
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
				break;

			default:
				res.status(404).send();
		}
	};
}
