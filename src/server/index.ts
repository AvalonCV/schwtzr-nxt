import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpacHotMiddleware from 'webpack-hot-middleware';

import getWebpackConfiguration from '../../webpack.config';

import { minify } from 'html-minifier';

const app = express();
const port = process.env.PORT || 3000;

// server side rendering
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from './../app/App';

// Or use 'webpack.compilation.Asset' ?
type Assets = string | [] | {};

// This function makes server rendering of asset references consistent with different webpack chunk/entry configurations
// https://github.com/webpack/webpack-dev-middleware#server-side-rendering
const normalizeAssets: (assets: Assets) => string[] = (assets: Assets) => {
	if (typeof assets === 'object' && assets !== null) {
		return Object.values(assets);
	} else {
		return Array.isArray(assets) ? assets : [assets];
	}
};

const webpack_configuration = getWebpackConfiguration({ platform: 'web' }, {});
const compiler = webpack(webpack_configuration);
app.use(
	webpackDevMiddleware(compiler, {
		publicPath: '/static',
		serverSideRender: true,
		stats: { colors: true }
	})
);
app.use(webpacHotMiddleware(compiler, { reload: true }));

//app.use(express.static('dist'));

app.get('/', (_req: express.Request, res: express.Response) => {
	const body = ReactDOMServer.renderToString(React.createElement(App));

	const webpackStats: webpack.Stats = res.locals.webpackStats;

	const assetsByChunkName: { main: Assets } = webpackStats
		.toJson()
		.children.filter((config: { name: string }) => config.name === 'client')[0].assetsByChunkName;

	const response = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="utf-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
			<meta name="theme-color" content="#000000">

			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.css" />

			<title>Test</title>
		</head>
		<body>
			<div class="main_root" id="root">${body}</div>
			<script src="js/client.js" defer="defer"></script>
			${normalizeAssets(assetsByChunkName.main)
				.filter(path => path.endsWith('.js'))
				.map(path => `<script type="javascript" src="${path}" defer></script>`)
				.join('\n')}
		</body>
		</html>
	`;

	res.send(minify(response, { collapseWhitespace: true }));
});

const server = app.listen(port, () => {
	console.log(`App is listening on port ${port}`);
});

// https://medium.com/@edward17/node-js-typescript-webpack-js-hot-module-replacement-express-js-8d92dad60119
declare let module: any;
if (module.hot) {
	module.hot.accept();
	module.hot.dispose(() => server.close());
}
