import React from 'react';
import { FelaComponent } from 'react-fela';
import { IStyle } from 'fela';

interface MainLayoutProps {}
interface MainLayoutState {}

const header_styles: IStyle = {
	backgroundColor: 'blue',
	color: 'white',
	minHeight: '200px',
	position: 'sticky',
	top: 0,
	width: '100%'
};

const header_content_styles: IStyle = {
	maxWidth: '1280px',
	margin: '0 auto',
	padding: '0 1em',
	boxSizing: 'border-box'
};

const main_styles: IStyle = {
	// paddingTop: '200px'
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

export class MainLayout extends React.PureComponent<MainLayoutProps, MainLayoutState> {
	public render(): JSX.Element[] {
		return [
			<FelaComponent key="header" as="header" style={header_styles}>
				<FelaComponent as="div" style={header_content_styles}>
					Head
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
				Main and more?
				{this.props.children}
			</FelaComponent>,
			<footer key="footer">Footer</footer>
		];
	}
}
