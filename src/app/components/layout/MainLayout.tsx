import React from 'react';
import { FelaComponent } from 'react-fela';
import { NestedStyle } from '../../styles/fela';

import { DrawPicture } from '../elements/Image';
import teaser_image from './../../images/image_teaser_woman.gimp2.84.jpg';

import { MainLayoutFooter } from './MainLayoutFooter';

import { Switch, Route } from 'react-router';
import { Link } from './../elements/Link';
import { Status } from './../elements/HTTPStatus';

import { Header } from './Header/Header';

import { DocumentPage } from '../EditorialContent/Document';

interface MainLayoutProps {}
interface MainLayoutState {}

const main_styles: NestedStyle = {
	maxWidth: '1280px',
	margin: '0 auto',
	'@media (max-height:640px) and (max-width: 960px) and (orientation:landscape)': {
		marginLeft: '64px'
	}
};

export class MainLayout extends React.PureComponent<MainLayoutProps, MainLayoutState> {
	public render(): JSX.Element[] {
		return [
			<Header />,
			<FelaComponent key="main" as="main" style={main_styles}>
				<Switch>
					<Route path="/document/:identifier" component={DocumentPage} />
					<Route exact path="/">
						<div>
							<DrawPicture image={teaser_image} sizes_max_width={1280} />
							<Link to="/document/services_for_libraries">zu GTC</Link>
							<br />
							<br />
							<Link to="/document/right_of_withdrawal">zu ROW</Link>
						</div>
					</Route>
					<Status status={404}>
						<div>Sorry, not found</div>
					</Status>
				</Switch>
				{this.props.children}
			</FelaComponent>,
			<MainLayoutFooter key="footer" />
		];
	}
}
