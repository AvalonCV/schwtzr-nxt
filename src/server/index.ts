import express from 'express';
import serveStatic from 'serve-static';
import compression from 'compression';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware = require('webpack-hot-middleware');
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import getWebpackConfiguration from '../../webpack.config';

import i18nextMiddleware from 'i18next-express-middleware';
import { createLocalisationInstance } from './localisation/instance';

import serverRenderer from './serverRenderer';
import { initGraphQLServer } from './graphql/initServer';

const is_production = process.env.NODE_ENV === 'production';
const webpack_configuration = getWebpackConfiguration(process.env, {});
// try to find configured publicPath
let public_path = '/';
webpack_configuration.forEach(element => {
	if (is_production && element.externals) {
		element.externals = undefined;
	}
	if (element.name === 'client' && element.output.publicPath) {
		public_path = element.output.publicPath;
	}
});

const main = (): void => {
	const app = express();
	app.disable('x-powered-by');
	const port = process.env.PORT || 3000;

	initGraphQLServer(app);

	createLocalisationInstance()
		.then(i18next => {
			// internationalisation
			app.use(i18nextMiddleware.handle(i18next));

			if (is_production) {
				const static_file_options: serveStatic.ServeStaticOptions = {
					etag: false,
					maxAge: 1000 * 60 * 24 * 30, // one month?
					immutable: true
				};
				app.use(compression());
				app.use(public_path + 'images/', express.static('dist/images', static_file_options));
				app.use(public_path + 'fonts/', express.static('dist/fonts', static_file_options));
				app.use(public_path, express.static('dist/client'));
				app.use('/', serverRenderer());
			} else {
				const compiler = webpack(webpack_configuration);
				const client_compiler = compiler.compilers.find(current_compiler => current_compiler.name === 'client');
				const dev_middleware = webpackDevMiddleware(compiler, {
					publicPath: public_path,
					serverSideRender: true
				});
				app.use(dev_middleware);

				// NOTE: Only the client bundle needs to be passed to `webpack-hot-middleware`.
				if (client_compiler) {
					app.use(webpackHotMiddleware(client_compiler));
				}
				app.use(webpackHotServerMiddleware(compiler));
			}
			return {};
		})
		.then(() => {
			app.listen(port, () => {
				console.log(`App is listening on port ${port}`);
			});
		})
		.catch(error => {
			throw error;
		});
};

export function applicationServer() {
	return main;
}

if (is_production) {
	main();
}
