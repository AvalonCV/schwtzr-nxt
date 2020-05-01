import React from 'react';
import { FelaComponent } from 'react-fela';
import { NestedStyle } from '../../styles/fela';

import { useTranslation } from 'react-i18next';
import { getMLOText } from '../../localisation/getMLOText';
import { TranslationItemKey } from '../../../shared/localisation/translations';

import { FontAwesomeIconDefinition, FontAwesomeIcon } from 'fontawesome-webfont-react-fela';
import faCubes from 'fontawesome-webfont-react-fela/dist/icon/faCubes';
import faGraduationCap from 'fontawesome-webfont-react-fela/dist/icon/faGraduationCap';
import faComment from 'fontawesome-webfont-react-fela/dist/icon/faComment';
import faLeaf from 'fontawesome-webfont-react-fela/dist/icon/faLeaf';
import faTruck from 'fontawesome-webfont-react-fela/dist/icon/faTruck';
import faThumbsUp from 'fontawesome-webfont-react-fela/dist/icon/faThumbsUp';
import faCreditCard from 'fontawesome-webfont-react-fela/dist/icon/faCreditCard';
import faNewspaper from 'fontawesome-webfont-react-fela/dist/icon/faNewspaper';
import faFacebookSquare from 'fontawesome-webfont-react-fela/dist/icon/faFacebookSquare';
import faTwitter from 'fontawesome-webfont-react-fela/dist/icon/faTwitter';
import faYoutube from 'fontawesome-webfont-react-fela/dist/icon/faYoutube';

import { Link } from './../elements/Link';
import { LocationDescriptor, Location } from 'history';

type Navigation = NavigationSection[];

interface NavigationSection {
	section_key: string;
	headline_mlo_key: TranslationItemKey;
	elements: NavigationSectionElements[];
	additional_styles?: NestedStyle;
	additional_list_item_styles?: NestedStyle;
}

interface NavigationSectionElements {
	icon?: FontAwesomeIconDefinition;
	name_mlo_key: TranslationItemKey;
	href?: string | LocationDescriptor | Location;
	description_mlo_key?: TranslationItemKey;
	show_as_highlight?: boolean;
	additional_styles?: NestedStyle;
	additional_content_function?: () => React.ReactNode | React.ReactNode[];
}

const footer_styles: NestedStyle = {
	marginTop: '40px',
	backgroundColor: '#1d3c8d',
	color: 'white',
	minHeight: '480px',
	boxSizing: 'border-box',
	paddingTop: '3em',
	paddingRight: '1em',
	paddingBottom: '1em',
	paddingLeft: '1em',
	borderTopLeftRadius: '40px',
	'@media (min-width:1280px)': {
		marginLeft: 'calc((100% - 1280px) / 2)',
		paddingLeft: '40px',
		paddingRight: 'calc((100% - 1280px) / 2 + 1em)'
	}
};

const footer_section_list_styles: NestedStyle = {
	textAlign: 'justify',
	fontSize: '87.5%',
	'@media (min-width:640px)': {
		fontSize: '100%'
	}
};

const footer_section_list_item_styles: NestedStyle = {
	display: 'inline-block',
	verticalAlign: 'top',
	width: '100%',
	textAlign: 'left',
	'@media (min-width:640px)': {
		width: '50%'
	},
	'@media (min-width:1280px)': {
		width: '25%'
	}
};

const footer_section_list_item_headline_styles: NestedStyle = {
	textTransform: 'uppercase',
	marginLeft: '2.5rem',
	fontSize: '150%',
	marginBottom: '0.5em'
};

const footer_section_element_list_item_styles: NestedStyle = {
	marginTop: '0.5em',
	marginBottom: '0.5em'
};

const footer_element_icon_styles: NestedStyle = {
	width: '2.5rem',
	textAlign: 'center',
	position: 'absolute',
	left: 0,
	lineHeight: 'inherit'
};

const footer_element_name_styles: NestedStyle = {
	paddingLeft: '2.5rem',
	position: 'relative'
};

const footer_element_highlight_name_styles: NestedStyle = {
	color: '#fdcb44',
	fontSize: '125%',
	fontWeight: 'bold'
};

const footer_element_description_styles: NestedStyle = {
	marginLeft: '2.5rem',
	display: 'block'
};

const footer_navigation: Navigation = [
	{
		section_key: 'features',
		headline_mlo_key: 'footer_features.headline',
		additional_styles: {},
		additional_list_item_styles: {
			marginTop: '1em'
		},
		elements: [
			{
				icon: faCubes,
				show_as_highlight: true,
				name_mlo_key: 'footer_features.top_selection.name',
				description_mlo_key: 'footer_features.top_selection.description'
			},
			{
				icon: faGraduationCap,
				show_as_highlight: true,
				name_mlo_key: 'footer_features.experience.name',
				description_mlo_key: 'footer_features.experience.description'
			},
			{
				icon: faComment,
				show_as_highlight: true,
				name_mlo_key: 'footer_features.personal_service.name',
				description_mlo_key: 'footer_features.personal_service.description'
			},
			{
				icon: faLeaf,
				show_as_highlight: true,
				name_mlo_key: 'footer_features.sustainability.name',
				description_mlo_key: 'footer_features.sustainability.description'
			},
			{
				icon: faTruck,
				show_as_highlight: true,
				name_mlo_key: 'footer_features.fast_delivery.name',
				description_mlo_key: 'footer_features.fast_delivery.description'
			},
			{
				icon: faThumbsUp,
				show_as_highlight: true,
				name_mlo_key: 'footer_features.free_shipping.name',
				description_mlo_key: 'footer_features.free_shipping.description'
			},
			{
				icon: faCreditCard,
				show_as_highlight: true,
				name_mlo_key: 'footer_features.secure_payment.name',
				description_mlo_key: 'footer_features.secure_payment.description'
			}
		]
	},
	{
		section_key: 'services',
		headline_mlo_key: 'footer_services.headline',
		elements: [
			{ name_mlo_key: 'footer_services.webshop.name' },
			{ name_mlo_key: 'footer_services.connect.name' },
			{ name_mlo_key: 'footer_services.intranet.name' },
			{ name_mlo_key: 'footer_services.mediacenter.name' },
			{ name_mlo_key: 'footer_services.publication_notice.name' },
			{ name_mlo_key: 'footer_services.app_ios.name' },
			{
				icon: faNewspaper,
				show_as_highlight: true,
				name_mlo_key: 'footer_services.newsletter.name',
				description_mlo_key: 'footer_services.newsletter.description',
				additional_styles: {
					marginTop: '1.5em'
				}
			},
			{
				show_as_highlight: true,
				name_mlo_key: 'footer_services.social_media.name',
				additional_styles: {
					marginTop: '1.5em'
				},
				additional_content_function: () => {
					return (
						<FelaComponent
							as="div"
							style={{
								marginLeft: '2.5rem',
								fontSize: '300%',
								display: 'flex',
								justifyContent: 'space-between'
							}}
						>
							<Link to="https://de-de.facebook.com/schweitzer.social">
								<FontAwesomeIcon key="facebook" icon={faFacebookSquare} />
							</Link>
							<Link to="https://www.youtube.com/channel/UC7dRHcw83GaLrPjN-aZ_scg">
								<FontAwesomeIcon key="youtube" icon={faYoutube} />
							</Link>
							<Link to="https://twitter.com/SchweitzerInfo">
								<FontAwesomeIcon key="twitter" icon={faTwitter} />
							</Link>
						</FelaComponent>
					);
				}
			}
		]
	},
	{
		section_key: 'target_audience',
		headline_mlo_key: 'footer_target_audience.headline',
		elements: [
			{ name_mlo_key: 'footer_target_audience.lawyers.name' },
			{ name_mlo_key: 'footer_target_audience.tax_consultants.name' },
			{ name_mlo_key: 'footer_target_audience.companies.name' },
			{ name_mlo_key: 'footer_target_audience.libraries.name', href: '/document/services_for_libraries' },
			{ name_mlo_key: 'footer_target_audience.communes.name' },
			{ name_mlo_key: 'footer_target_audience.students.name' }
		]
	},
	{
		section_key: 'company',
		headline_mlo_key: 'footer_company.headline',
		elements: [
			{ name_mlo_key: 'footer_company.about_us.name' },
			{ name_mlo_key: 'footer_company.sites.name' },
			{ name_mlo_key: 'footer_company.events.name' },
			{ name_mlo_key: 'footer_company.magazine.name' },
			{ name_mlo_key: 'footer_company.press.name' },
			{ name_mlo_key: 'footer_company.carreer.name' },
			{ name_mlo_key: 'footer_company.contact.name' },
			{ name_mlo_key: 'footer_company.data_privacy.name' },
			{ name_mlo_key: 'footer_company.gtac.name' },
			{ name_mlo_key: 'footer_company.right_of_withdrawal.name', href: '/document/right_of_withdrawal' },
			{ name_mlo_key: 'footer_company.imprint.name' }
		]
	}
];

export const MainLayoutFooter: React.FunctionComponent = (_props: object) => {
	const { t } = useTranslation();

	return (
		<FelaComponent key="footer" as="footer" style={footer_styles}>
			<FelaComponent as="ol" style={footer_section_list_styles}>
				{footer_navigation.map(section => (
					<FelaComponent
						as="li"
						key={section.section_key}
						style={{ ...footer_section_list_item_styles, ...(section.additional_styles || {}) }}
					>
						<FelaComponent as="h3" style={footer_section_list_item_headline_styles}>
							{getMLOText(t, section.headline_mlo_key)}
						</FelaComponent>
						<FelaComponent as="ol" style={{}}>
							{section.elements.map((element, index) => (
								<FelaComponent
									as="li"
									key={section.section_key + '_list_item_' + index}
									style={{
										...footer_section_element_list_item_styles,
										...(section.additional_list_item_styles || {}),
										...(element.additional_styles || {})
									}}
								>
									<FelaComponent
										as="div"
										style={{
											...footer_element_name_styles,
											...(element.show_as_highlight ? footer_element_highlight_name_styles : {})
										}}
									>
										{element.icon && (
											<FontAwesomeIcon
												icon={element.icon}
												additional_styles={footer_element_icon_styles}
											/>
										)}

										{element.href ? (
											<Link to={element.href as string}>{getMLOText(t, element.name_mlo_key)}</Link>
										) : (
											getMLOText(t, element.name_mlo_key)
										)}
									</FelaComponent>
									{element.description_mlo_key && (
										<FelaComponent as="span" style={footer_element_description_styles}>
											{getMLOText(t, element.description_mlo_key)}
										</FelaComponent>
									)}
									{element.additional_content_function && element.additional_content_function()}
								</FelaComponent>
							))}
						</FelaComponent>
					</FelaComponent>
				))}
			</FelaComponent>

			<FelaComponent as="div" style={{ textAlign: 'center', fontSize: '80%' }}>
				<strong>{getMLOText(t, 'footer.price_info')}</strong>
				<div>{getMLOText(t, 'footer.copyright_hint_text')}</div>
			</FelaComponent>
		</FelaComponent>
	);
};
