import { initExpressServer, startListening } from './express/index';
import { createLocalisationInstance } from './localisation/instance';
import { initGraphQLServer } from './graphql/initServer';
import { initDevMiddleware } from './webpack';

export function applicationServer() {
	const app = initExpressServer();
	initGraphQLServer(app);

	createLocalisationInstance(app)
		.then(initDevMiddleware)
		.then(startListening);
}
