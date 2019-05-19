import React from 'react';
import { FelaComponent } from 'react-fela';
import { IStyle } from 'fela';
import { NestedStyle } from '../../styles/fela';

import { useTranslation } from 'react-i18next';
import { getMLOText } from '../../localisation/getMLOText';
import { TranslationItemKeys } from '../../../shared/localisation/translations';

import { FontAwesomeIcon, FontAwesomeIconName } from '../elements/fontAwesomeIcon';

import { DrawPicture } from '../elements/Image';
import logo from './../../images/schweitzer_logo_white.svg';
import teaser_image from './../../images/image_teaser_woman.gimp2.jpg';

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

const header_menu_list_styles: IStyle = {};

const header_menu_list_item_styles: IStyle = {
	display: 'inline-block',
	padding: '0.4em 2em 0.4em 1em'
};

const footer_styles: NestedStyle = {
	marginTop: '40px',
	backgroundColor: '#1d3c8d',
	color: 'white',
	minHeight: '480px',
	boxSizing: 'border-box',
	padding: '1em 1em 1em 40px',
	borderTopLeftRadius: '40px',
	'@media (min-width: 1280px)': {
		marginLeft: 'calc((100% - 1280px) / 2)',
		paddingRight: 'calc((100% - 1280px) / 2 + 1em)'
	}
};

interface NavigationElements {
	icon?: FontAwesomeIcon | FontAwesomeIconName;
	name?: string;
	name_mlo_key?: TranslationItemKeys;
	description_mlo_key?: TranslationItemKeys;
}

const footer_feature_elements: NavigationElements[] = [
	{ name: 'Top Auswahl', icon: 'cubes' },
	{ name: 'Umfangreiche Beratung', icon: 'graduation-cap' },
	{ name: 'Persöhnliche Fachberatung', icon: 'comment' },
	{ name: 'Nachhaltigkeit', icon: 'leaf' },
	{ name: 'Schnelle Lieferung', icon: 'truck' },
	{ name: 'Versandkostenfrei', icon: 'thumbs-up' },
	{
		icon: 'credit-card',
		name_mlo_key: 'footer_features.secure_payment.name',
		description_mlo_key: 'footer_features.secure_payment.description'
	}
];

const footer_service_elements: NavigationElements[] = [
	{ name_mlo_key: 'webshop' },
	{ name_mlo_key: 'connect' },
	{ name_mlo_key: 'intranet' },
	{ name_mlo_key: 'mediacenter' },
	{ name_mlo_key: 'publication_notice' },
	{ name_mlo_key: 'app_ios' }
];

const footer_service_element_styles: NestedStyle = {
	lineHeight: '2em'
};

const footer_service_element_description_styles: NestedStyle = {
	display: 'block',
	color: 'white',
	fontSize: '80%',
	lineHeight: '1em'
};

const MainLayoutFooter: React.StatelessComponent = (_props: object) => {
	const { t } = useTranslation();

	return (
		<FelaComponent key="footer" as="footer" style={footer_styles}>
			<h3>{t('footer_features.headline')}</h3>
			<ol>
				{footer_feature_elements.map((element, index) => (
					<FelaComponent key={index} as="li" style={{ ...footer_service_element_styles, color: 'orange' }}>
						{element.icon && <FontAwesomeIcon icon={element.icon} />}
						{element.name_mlo_key ? getMLOText(t, element.name_mlo_key) : element.name}
						{element.description_mlo_key && (
							<FelaComponent as="span" style={footer_service_element_description_styles}>
								{getMLOText(t, element.description_mlo_key)}
							</FelaComponent>
						)}
					</FelaComponent>
				))}
			</ol>

			<h3>Services</h3>
			<ol>
				{footer_service_elements.map((element, index) => (
					<FelaComponent key={index} as="li" style={footer_service_element_styles}>
						{element.icon && <FontAwesomeIcon icon={element.icon} />}
						{element.name_mlo_key ? getMLOText(t, element.name_mlo_key) : element.name}
					</FelaComponent>
				))}
			</ol>
		</FelaComponent>
	);
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
			<MainLayoutFooter key="footer" />
		];
	}
}
