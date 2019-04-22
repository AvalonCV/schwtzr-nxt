import * as path from 'path';
import * as webpack from 'webpack';
const HtmlWebpackPlugin = require('html-webpack-plugin');

interface ProcessEnv {
	[key: string]: string | undefined;
}

function getWebPackConfiguration(env: ProcessEnv, argv: []): webpack.Configuration {
	const configuration: webpack.Configuration = {
		mode: 'development', // "production" | "development" | "none"
		entry: {
			app: ['./src/app/index.tsx', 'webpack-hot-middleware/client'],
			vendor: ['react', 'react-dom']
		},
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: 'js/[name].bundle.js',
			publicPath: '/'
		},
		devtool: 'source-map',
		resolve: {
			extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					loader: 'ts-loader'
				},
				{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
			]
		},
		plugins: [
			new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'app', 'index.html') }),
			new webpack.HotModuleReplacementPlugin()
		]
	};

	// server-specific configuration
	if (env.platform === 'server') {
		configuration.target = 'node';
	}

	// client-specific configurations
	if (env.platform === 'web') {
		configuration.entry = './src/app.tsx';
		configuration.output = { ...configuration.output, filename: 'js/client.js' };
	}

	return configuration;
}

export default getWebPackConfiguration;
