import webpack from 'webpack';
import MemoryFS from 'memory-fs';

import getWebpackConfiguration from './../../webpack.config';

import requireFromString from 'require-from-string';

const server_configuration = getWebpackConfiguration(process.env, {}).filter(element => {
	if (element.name === 'server') {
		element.entry = ['./src/server/index.dev.ts'];
		return true;
	} else {
		return false;
	}
})[0];

function runApplicationServerFromMemory(compiler: webpack.Compiler) {
	// Compile to in-memory file system.
	const fs = new MemoryFS();
	compiler.outputFileSystem = fs;
	compiler.run((err, stats) => {
		if (err) {
			throw err;
		}
		if (stats.hasErrors()) {
			const errors = stats.compilation ? stats.compilation.errors : null;
			if (errors) {
				errors.forEach(error => console.error(error.message));
			}
			throw errors;
		}

		const { path, filename } = server_configuration.output;
		const buffer = fs.readFileSync(path + '/' + filename);

		const dev = requireFromString(buffer.toString(), 'applicationServer');
		dev.applicationServer();
	});
}

runApplicationServerFromMemory(webpack(server_configuration));
