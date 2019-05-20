import React from 'react';
import ReactDOM from 'react-dom';

import { createRenderer } from 'fela';
import { media_query_order } from './styles/fela';
// import { rehydrate } from 'fela-dom';
import { i18n_instance } from './localisation/instance';

import { App } from './App';

const is_production = process.env.NODE_ENV === 'production';
const rela_renderer = createRenderer({ devMode: !is_production, mediaQueryOrder: media_query_order });
// check if this is client-side rendering (ME: should not be necessary in this file!)
// if (typeof window !== 'undefined' && window.document && window.document.createElement) {
// 	rehydrate(rela_renderer);
// }

ReactDOM.hydrate(<App fela_renderer={rela_renderer} i18n_instance={i18n_instance} />, document.getElementById('root'));

if (module.hot) {
	module.hot.accept();
}
