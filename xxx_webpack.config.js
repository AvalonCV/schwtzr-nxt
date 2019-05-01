const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env, argv) {
	// default to the server configuration
	const base = {
		mode: 'development',
		output: {
			filename: 'js/server.js',
			// path needs to be an ABSOLUTE file path
			path: path.resolve(process.cwd(), 'dist'),
			publicPath: '/'
		},
		// Enable sourcemaps for debugging webpack's output.
		devtool: 'cheap-module-eval-source-map',
		resolve: {
			// Add '.ts' and '.tsx' as resolvable extensions.
			extensions: ['.ts', '.tsx', '.js', '.json']
		},
		module: {
			rules: [
				// All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
				{
					test: /\.tsx?$/,
					use: [
						{
							loader: 'ts-loader'
						}
					]
				},
				// https://github.com/kangax/html-minifier/issues/727
				{
					test: [
						path.resolve(__dirname, 'node_modules/uglify-js/tools/node.js'),
						path.resolve(__dirname, 'node_modules/express/lib/view.js')
					],
					loader: 'null-loader'
				}
			]
		},
		plugins: [
			// new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'app', 'index.html') }),
			new HtmlWebpackPlugin(),
			new webpack.HotModuleReplacementPlugin()
		]
	};

	if (env.platform === 'server') {
		// server-specific configuration
		return {
			...base,
			entry: './src/server/index.ts',
			target: 'node'
		};
	} else if (env.platform === 'web') {
		// client-specific configurations
		return {
			...base,
			entry: './src/app/index.tsx',
			target: 'web',
			output: {
				...base.output,
				filename: 'js/client.js'
			}
		};
	}
};
