import React from 'react';
import { FelaComponent } from 'react-fela';
import { NestedStyle } from '../../styles/fela';

const page_container_styles: NestedStyle = {
	backgroundColor: '#1d3c8d',
	color: 'white',
	minHeight: '95px',
	position: 'sticky',
	display: 'flex',
	top: 0,
	width: '100%',
	zIndex: 2
};

export function asPage(SiteComponent: React.ComponentType) {
	return class extends React.PureComponent {
		constructor(props: {}) {
			// this.handleChange = this.handleChange.bind(this);
			super(props);
		}

		componentDidMount() {}

		componentDidUpdate() {}

		componentWillUnmount() {}

		render() {
			return (
				<FelaComponent style={page_container_styles}>
					<SiteComponent />
				</FelaComponent>
			);
		}
	};
}
