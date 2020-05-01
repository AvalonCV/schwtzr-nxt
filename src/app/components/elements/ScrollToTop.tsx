import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface ScrollToTopProperties {
	top?: number;
	left?: number;
}

type Properties = ScrollToTopProperties & RouteComponentProps<{}>;

const ScrollToTop: React.FunctionComponent<Properties> = props => {
	useEffect(() => {
		if (window) {
			window.scrollTo(props.top || 0, props.left || 0);
		}
		// tslint:disable-next-line: align
	}, [props.location.pathname]);

	return null;
};

export const ScrollToTopOnRouteChange = withRouter(ScrollToTop);
