import React from 'react';
import { FelaComponent } from 'react-fela';
import { IStyle } from 'fela';
import { NestedStyle } from '../../styles/fela';

import { FontAwesomeIcon } from '../elements/fontAwesomeIcon';

import { DrawPicture } from '../elements/Image';
import logo from './../../images/schweitzer_logo_white.svg';
import teaser_image from './../../images/image_teaser_woman.gimp2.jpg';

interface MainLayoutProps {}
interface MainLayoutState {}

const header_styles: NestedStyle = {
	backgroundColor: '#1d3c8d',
	color: 'white',
	minHeight: '128px',
	position: 'sticky',
	top: 0,
	width: '100%',
	zIndex: 2
};

const header_content_styles: IStyle = {
	maxWidth: '1280px',
	margin: '0 auto',
	padding: '0 1em',
	boxSizing: 'border-box'
};

const main_styles: IStyle = {
	maxWidth: '1280px',
	margin: '0 auto',
	backgroundColor: 'gray'
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

const header_menu_list_styles: IStyle = {
	display: 'flex',
	justifyContent: 'space-between',
	flexWrap: 'wrap'
};

const header_menu_list_item_styles: IStyle = {
	display: 'inline-block'
};

const footer_styles: IStyle = {
	maxWidth: '1280px',
	margin: '40px auto 0',
	backgroundColor: '#1d3c8d',
	color: 'white',
	minHeight: '480px',
	boxSizing: 'border-box',
	padding: '1em 1em 1em 40px',
	borderTopLeftRadius: '40px'
};

const footer_service_elements = [
	{ icon: 'faGlobeEurope', name: 'WebShop' },
	{ icon: 'faGlobeEurope', name: 'Connect' },
	{ icon: 'faGlobeEurope', name: 'Intranet' },
	{ icon: 'faGlobeEurope', name: 'Schweitzer Mediencenter' },
	{ icon: 'faGlobeEurope', name: 'Neuerscheinungsdienste' },
	{ icon: 'faGlobeEurope', name: 'App für iOS' }
];

const footer_service_element_styles: NestedStyle = {
	lineHeight: '2em'
};

export class MainLayout extends React.PureComponent<MainLayoutProps, MainLayoutState> {
	public render(): JSX.Element[] {
		return [
			<FelaComponent key="header" as="header" style={header_styles}>
				<FelaComponent as="div" style={header_content_styles}>
					<DrawPicture image={logo} />
					<FelaComponent as="ol" style={header_menu_list_styles}>
						{header_menu_items.map((element, index) => {
							return (
								<FelaComponent as="li" key={index} style={header_menu_list_item_styles}>
									<FontAwesomeIcon icon="edit" />
									{element}
								</FelaComponent>
							);
						})}
					</FelaComponent>
				</FelaComponent>
			</FelaComponent>,
			<FelaComponent key="main" as="main" style={main_styles}>
				<DrawPicture image={teaser_image} />
				Main and more?
				{this.props.children}
			</FelaComponent>,
			<FelaComponent key="footer" as="footer" style={footer_styles}>
				<DrawPicture image={logo} />
				<h3>Services</h3>
				<ol>
					{footer_service_elements.map((element, index) => (
						<FelaComponent key={index} as="li" style={footer_service_element_styles}>
							<FontAwesomeIcon icon="globe-europe" />
							{element.name}
						</FelaComponent>
					))}
				</ol>
			</FelaComponent>
		];
	}
}
