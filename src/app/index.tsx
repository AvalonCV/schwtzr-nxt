import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';

declare let module: any;
if (module.hot) {
	module.hot.accept();
}

let react_root = document.getElementById('root');
if (react_root === null) {
	react_root = document.createElement('div');
	document.body.appendChild(react_root);
}

ReactDOM.hydrate(<App />, react_root);
