import React from 'react';
import ReactDOM from 'react-dom';

import { createRenderer } from 'fela';

import { App } from './App';
import { rehydrate } from 'fela-dom';

const rela_renderer = createRenderer();
// check if this is client-side rendering (ME: should not be necessary in this file!)
if (typeof window !== 'undefined' && window.document && window.document.createElement) {
	rehydrate(rela_renderer);
}

ReactDOM.hydrate(<App fela_renderer={rela_renderer} />, document.getElementById('root'));

if (module.hot) {
	module.hot.accept();
}
