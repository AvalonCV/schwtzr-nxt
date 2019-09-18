import React from 'react';
import { FelaComponent } from 'react-fela';
import { IStyle } from 'fela';
import { NestedStyle } from '../../styles/fela';

import { DrawPicture } from '../elements/Image';
import logo from './../../images/schweitzer_logo_white.svg';
import teaser_image from './../../images/image_teaser_woman.gimp2.jpg';

import { MainLayoutFooter } from './MainLayoutFooter';

import { Switch, Route } from 'react-router';
import { Link } from './../elements/Link';

import { Document } from '../EditorialContent/Document';

interface MainLayoutProps {}
interface MainLayoutState {}

const header_styles: NestedStyle = {
	backgroundColor: '#1d3c8d',
	color: 'white',
	minHeight: '95px',
	position: 'sticky',
	display: 'flex',
	top: 0,
	width: '100%',
	zIndex: 2
};

const header_content_styles: IStyle = {
	maxWidth: '1280px',
	margin: '0 auto',
	padding: '0 1em',
	boxSizing: 'border-box',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	flexGrow: 1
};

const main_styles: IStyle = {
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

const header_menu_list_styles: IStyle = {};

const header_menu_list_item_styles: IStyle = {
	display: 'inline-block',
	padding: '0.4em 2em 0.4em 1em'
};

export class MainLayout extends React.PureComponent<MainLayoutProps, MainLayoutState> {
	public render(): JSX.Element[] {
		return [
			<FelaComponent key="header" as="header" style={header_styles}>
				<FelaComponent as="div" style={header_content_styles}>
					<Link to="/">
						<DrawPicture image={logo} />
					</Link>
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
					<Route path="/gtc">
						<div>
							GTC <Link to="/">zu Hauptseite</Link>
							<Document />
						</div>
					</Route>
					<Route path="/">
						<div>
							<DrawPicture image={teaser_image} />
							Main and more?
							<Link to="/gtc">zu GTC</Link>
						</div>
					</Route>
				</Switch>
				{this.props.children}
			</FelaComponent>,
			<MainLayoutFooter key="footer" />
		];
	}
}
