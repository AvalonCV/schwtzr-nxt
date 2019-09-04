import React from 'react';
import ReactDOM from 'react-dom';

import { createRenderer } from 'fela';
import { media_query_order } from './styles/fela';
// import { rehydrate } from 'fela-dom';
import { i18n_instance } from './localisation/instance';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';

import { BrowserRouter } from 'react-router-dom';

import { App } from './App';

const is_production = process.env.NODE_ENV === 'production';
const rela_renderer = createRenderer({ devMode: !is_production, mediaQueryOrder: media_query_order });
// check if this is client-side rendering (ME: should not be necessary in this file!)
// if (typeof window !== 'undefined' && window.document && window.document.createElement) {
// 	rehydrate(rela_renderer);
// }

const apollo_cache = new InMemoryCache();

type window_with_apollo_state = Window & { __APOLLO_STATE__?: NormalizedCacheObject };
const window_with_state: window_with_apollo_state = window;
if (window_with_state.__APOLLO_STATE__) {
	apollo_cache.restore(window_with_state.__APOLLO_STATE__);
}

const apollo_client = new ApolloClient({
	link: new HttpLink(),
	cache: apollo_cache
});

ReactDOM.hydrate(
	<App
		apollo_client={apollo_client}
		fela_renderer={rela_renderer}
		i18n_instance={i18n_instance}
		RouterComponent={BrowserRouter}
		router_props={{}}
	/>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept();
}
