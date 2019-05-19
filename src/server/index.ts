import express from 'express';
import compression from 'compression';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware = require('webpack-hot-middleware');
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import getWebpackConfiguration from '../../webpack.config';

import i18nextMiddleware from 'i18next-express-middleware';
import { createLocalisationInstance } from './localisation/instance';

const app = express();
const port = process.env.PORT || 3000;
const is_production = process.env.NODE_ENV === 'production';

const webpack_configuration = getWebpackConfiguration(process.env, {});
// try to find configured publicPath
let public_path = '/';
webpack_configuration.forEach(element => {
	if (element.name === 'client' && element.output.publicPath) {
		public_path = element.output.publicPath;
	}
});

createLocalisationInstance().then(i18next => {
	// internationalisation
	app.use(i18nextMiddleware.handle(i18next));

	if (is_production) {
		// do not import serverRenderer sync in here! It (currently) breaks 'npm run dev-server' (images cannot be resolved)
		import('./serverRenderer').then(serverRenderer => {
			app.use(compression());
			app.use(public_path + 'images/', express.static('dist/images'));
			app.use(public_path, express.static('dist/client'));
			app.use('/', serverRenderer.default());
			app.listen(port, () => {
				console.log(`App is listening on port ${port}`);
			});
		});
	} else {
		const compiler = webpack(webpack_configuration);
		const client_compiler = compiler.compilers.find(compiler => compiler.name === 'client');

		app.use(webpackDevMiddleware(compiler, { publicPath: public_path, serverSideRender: true }));
		// NOTE: Only the client bundle needs to be passed to `webpack-hot-middleware`.
		if (client_compiler) {
			app.use(webpackHotMiddleware(client_compiler));
		}
		app.use(webpackHotServerMiddleware(compiler));
		app.listen(port, () => {
			console.log(`App is listening on port ${port}`);
		});
	}
});
