import { initExpressServer, initForProduction, startListening } from './express/index';
import { createLocalisationInstance } from './localisation/instance';
import { initGraphQLServer } from './graphql/initServer';
import { getPublicPath } from './webpack';

const public_path = getPublicPath();
const app = initExpressServer();
initGraphQLServer(app);

createLocalisationInstance(app)
	.then(() => {
		return initForProduction(app, public_path);
	})
	.then(startListening);
