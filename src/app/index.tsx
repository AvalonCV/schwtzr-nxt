import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {App} from './App';

declare let module: any
if (module.hot) {
    module.hot.accept();
 }

ReactDOM.render(
	<App/>,
	document.getElementById('root')
);
