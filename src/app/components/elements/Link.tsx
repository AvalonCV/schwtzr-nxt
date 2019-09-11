import React from 'react';

import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { NestedStyle } from '../../styles/fela';
import { useFela } from 'react-fela';

type LinkProperties<S = {}> = LinkProps<S> & {
	style?: NestedStyle;
};

export const Link: React.StatelessComponent<LinkProperties> = ({
	children,
	className,
	style,
	to,
	replace,
	innerRef,
	...props
}) => {
	if (style) {
		const { css } = useFela(props);
		className = (className || '') + css(style);
	}

	if (typeof to === 'string' && to.indexOf('http') === 0) {
		// try to handle absolute links (to external URLs)
		return (
			<a className={className} rel="noreferrer noopener" href={to} {...props}>
				{children}
			</a>
		);
	} else {
		return (
			<RouterLink className={className} to={to} replace={replace} innerRef={innerRef} {...props}>
				{children}
			</RouterLink>
		);
	}
};
