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
	plugins: webpack.Plugin[];
}

interface CustomProcessEnv extends NodeJS.ProcessEnv {
	NODE_ENV?: 'development' | 'production' | 'none';
}

export default function(env: CustomProcessEnv = process.env, _argv: any): CustomWebpackConfiguration[] {
	const is_production = env.NODE_ENV === 'production';

	const base: CustomWebpackConfiguration = {
		mode: is_production ? 'production' : 'development',
		// Enable sourcemaps for debugging webpack's output.
		devtool: is_production ? 'source-map' : 'cheap-module-eval-source-map',
		output: {
			// path needs to be an ABSOLUTE file path
			path: path.resolve(process.cwd(), 'dist'),
			publicPath: is_production ? '/public/' : '/'
		},
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
				{
					test: /\.(gif|jpeg|jpg|png|svg)$/,
					use: [
						{
							loader: 'image-size-loader',
							options: {
								context: path.resolve(__dirname, 'src'),
								outputPath: 'images',
								name: 'images/[name].[hash].[ext]'
							}
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
		plugins: []
	};

	return [
		{
			// server-specific configuration
			...base,
			name: 'server',
			entry: is_production ? ['./src/server/index.ts'] : ['./src/server/serverRenderer.ts'],
			target: 'node',
			output: {
				...base.output,
				filename: 'server/js/server.js',
				libraryTarget: 'commonjs2'
			}
		},
		{
			// client-specific configuration
			...base,
			name: 'client',
			entry: is_production ? ['./src/app/index.tsx'] : ['webpack-hot-middleware/client', './src/app/index.tsx'],
			target: 'web',
			output: {
				...base.output,
				filename: 'client/js/client.js'
			},
			plugins: is_production ? base.plugins : [...base.plugins, new webpack.HotModuleReplacementPlugin()]
		}
	];
}
