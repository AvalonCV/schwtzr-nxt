import path from 'path';
import webpack from 'webpack';
import WebpackNodeExternals from 'webpack-node-externals';

// // type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R;
// // type MyWebpackConfiguration = Modify<
// // 	webpack.Configuration,
// // 	{
// // 		output: webpack.Output;
// // 		module: webpack.Module;
// // 	}
// // >;

interface CustomWebpackOutput extends webpack.Output {
	filename: string;
	path: string;
	publicPath: string;
}

export interface CustomWebpackConfiguration extends webpack.Configuration {
	name: '' | 'server' | 'client';
	output: CustomWebpackOutput;
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
		name: '',
		// Enable sourcemaps for debugging webpack's output.
		devtool: is_production ? 'source-map' : 'cheap-module-eval-source-map',
		output: {
			filename: '',
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
								name: 'images/[name].[hash:7].[ext]'
							}
						}
					]
				},
				{
					test: /\.woff2?$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								context: path.resolve(__dirname, 'src'),
								outputPath: 'fonts',
								name: '[name].[hash:7].[ext]'
							}
						}
					]
				},
				{
					test: /\.(css|md)$/,
					use: [
						{
							loader: 'raw-loader'
						}
					]
				},
				{
					test: /\.(graphql|gql)$/,
					exclude: /node_modules/,
					loader: 'graphql-tag/loader'
				},
				// github.com/kangax/html-minifier/issues/727
				{
					test: [
						path.resolve(__dirname, 'node_modules/uglify-js/tools/node.js'),
						path.resolve(__dirname, 'node_modules/express/lib/view.js')
					],
					loader: 'null-loader'
				}
			]
		},
		plugins: [],
		watchOptions: { poll: 2000 }
	};

	return [
		{
			// server-specific configuration
			...base,
			name: 'server',
			externals: [WebpackNodeExternals()],
			entry: is_production ? ['./src/server/index.prod.ts'] : ['./src/server/serverRenderer.ts'],
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
