import express from 'express';
import serveStatic from 'serve-static';
import compression from 'compression';

import serverRenderer from './../serverRenderer';
// import favicon from './../../app/images/favicon.png';

export const initExpressServer = () => {
	const app = express();
	app.disable('x-powered-by');
	app.use(compression());
	// app.locals.favicon = favicon;
	return app;
};

export const initForProduction = (app: express.Express, public_path: string) => {
	const static_file_options: serveStatic.ServeStaticOptions = {
		etag: false,
		maxAge: 1000 * 60 * 60 * 24 * 30, // one month?
		immutable: true
	};

	app.use(public_path + 'images/', express.static('dist/images', static_file_options));
	app.use(public_path + 'fonts/', express.static('dist/fonts', static_file_options));
	app.use(public_path, express.static('dist/client'));
	app.use('/', serverRenderer());

	return app;
};

export const startListening = (app: express.Express) => {
	const port = process.env.PORT || 3000;
	app.listen(port, () => {
		console.log(`App is listening on port ${port}`);
	});
	return app;
};
