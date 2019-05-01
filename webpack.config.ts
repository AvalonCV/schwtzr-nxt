import path from 'path';
import webpack from 'webpack';

// // type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R;
// // type MyWebpackConfiguration = Modify<
// // 	webpack.Configuration,
// // 	{
// // 		output: webpack.Output;
// // 		module: webpack.Module;
// // 	}
// // >;
interface CustomWebpackConfiguration extends webpack.Configuration {
	output: webpack.Output;
	module: webpack.Module;
}

export interface ConfigurationOptions {
	platform: 'server' | 'web';
}

export default function(_env: NodeJS.ProcessEnv & ConfigurationOptions, _argv: any): CustomWebpackConfiguration[] {
	// default to the server configuration
	const base: CustomWebpackConfiguration = {
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
		plugins: [new webpack.HotModuleReplacementPlugin()]
	};

	return [
		// server-specific configuration
		{
			...base,
			name: 'server',
			entry: './src/server/index.ts',
			target: 'node'
		},
		{
			...base,
			name: 'client',
			entry: ['webpack-hot-middleware/client', './src/app/index.tsx'],
			target: 'web',
			output: {
				...base.output,
				filename: 'js/client.js'
			}
		}
	];
}
