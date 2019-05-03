import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware = require('webpack-hot-middleware');
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import getWebpackConfiguration from '../../webpack.config';

const app = express();
const port = process.env.PORT || 3000;

const webpack_configuration = getWebpackConfiguration({}, {});
const compiler = webpack(webpack_configuration);

app.use(webpackDevMiddleware(compiler, { publicPath: '/', serverSideRender: true }));
// NOTE: Only the client bundle needs to be passed to `webpack-hot-middleware`.
const client_compiler = compiler.compilers.find(compiler => compiler.name === 'client');
if (client_compiler) {
	app.use(webpackHotMiddleware(client_compiler));
}
app.use(webpackHotServerMiddleware(compiler));

app.listen(port, () => {
	console.log(`App is listening on port ${port}`);
});
