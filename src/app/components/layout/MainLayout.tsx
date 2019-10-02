import React from 'react';
import { FelaComponent } from 'react-fela';
import { useFela } from 'react-fela';
import { NestedStyle } from '../../styles/fela';

import { DrawPicture } from '../elements/Image';
import logo from './../../images/schweitzer_logo_white.svg';
import teaser_image from './../../images/image_teaser_woman.gimp2.84.jpg';

import { FontAwesomeIcon } from '../elements/fontAwesomeIcon';

import { MainLayoutFooter } from './MainLayoutFooter';

import { Switch, Route } from 'react-router';
import { Link } from './../elements/Link';
import { Status } from './../elements/HTTPStatus';

import { Document } from '../EditorialContent/Document';

interface MainLayoutProps {}
interface MainLayoutState {}

const header_styles: NestedStyle = {
	backgroundColor: '#1d3c8d',
	color: 'white',
	minHeight: '50px',
	position: 'sticky',
	display: 'flex',
	top: 0,
	width: '100%',
	zIndex: 2,
	'@media (min-width:640px)': {
		minHeight: '95px'
	}
};

const header_content_styles: NestedStyle = {
	maxWidth: '1280px',
	margin: '0 auto',
	padding: '0 1em',
	boxSizing: 'border-box',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	flexGrow: 1
};

const main_styles: NestedStyle = {
	maxWidth: '1280px',
	margin: '0 auto'
};

const header_menu_items = [
	'Neuerscheinungen',
	'Datenbanken',
	'E-Books',
	'E-Learning',
	'Loseblattwerke',
	'Zeitschriften | E-Paper',
	'Kontakt'
];

const header_menu_list_styles: NestedStyle = {
	display: 'none',
	'@media (min-width:640px)': {
		display: 'block'
	}
};

const header_menu_list_item_styles: NestedStyle = {
	display: 'inline-block',
	padding: '0.4em 2em 0.4em 1em'
};

const header_option_list_style: NestedStyle = {
	float: 'right',
	display: 'inline-block'
};
const header_option_list_item_style: NestedStyle = {
	display: 'inline-block',
	paddingTop: '1em',
	paddingLeft: '1.5em',
	paddingRight: '0.5em'
};
const header_option_list_item_icon_style: NestedStyle = {
	fontSize: '2em',
	color: '#7f9acb'
};

const HeaderOptions: React.FunctionComponent = props => {
	const { css } = useFela(props);
	return (
		<ol className={css(header_option_list_style)}>
			<li className={css(header_option_list_item_style)}>
				<FontAwesomeIcon icon="star" type="regular" additional_styles={header_option_list_item_icon_style} />
			</li>
			<li className={css(header_option_list_item_style)}>
				<FontAwesomeIcon icon="user" type="regular" additional_styles={header_option_list_item_icon_style} />
			</li>
			<li className={css(header_option_list_item_style)}>
				<FontAwesomeIcon icon="shopping-cart" additional_styles={header_option_list_item_icon_style} />
			</li>
		</ol>
	);
};

export class MainLayout extends React.PureComponent<MainLayoutProps, MainLayoutState> {
	public render(): JSX.Element[] {
		return [
			<FelaComponent key="header" as="header" style={header_styles}>
				<FelaComponent as="div" style={header_content_styles}>
					<div>
						<Link to="/" style={{ display: 'inline-block', maxWidth: '40%' }}>
							<DrawPicture image={logo} />
						</Link>

						<HeaderOptions />
					</div>

					<FelaComponent as="ol" style={header_menu_list_styles}>
						{header_menu_items.map((element, index) => {
							return (
								<FelaComponent as="li" key={index} style={header_menu_list_item_styles}>
									{element}
								</FelaComponent>
							);
						})}
					</FelaComponent>
				</FelaComponent>
			</FelaComponent>,
			<FelaComponent key="main" as="main" style={main_styles}>
				<Switch>
					<Route path="/document/:identifier" component={Document} />
					<Route exact path="/">
						<div>
							<DrawPicture image={teaser_image} />
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
