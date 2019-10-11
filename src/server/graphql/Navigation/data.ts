import { NestedStyle } from '../../../app/styles/fela';
import { TranslationItemKey } from '../../../shared/localisation/translations';

import { FontAwesomeIconDefinition } from 'fontawesome-webfont-react-fela';
import { faBarsSolid } from 'fontawesome-webfont-react-fela/dist/icon/faBars';
import { faStarRegular } from 'fontawesome-webfont-react-fela/dist/icon/faStar';
import { faUserRegular } from 'fontawesome-webfont-react-fela/dist/icon/faUser';
import { faShoppingCartSolid } from 'fontawesome-webfont-react-fela/dist/icon/faShoppingCart';
import faCubes from 'fontawesome-webfont-react-fela/dist/icon/faCubes';
import faFire from 'fontawesome-webfont-react-fela/dist/icon/faFire';
import faGraduationCap from 'fontawesome-webfont-react-fela/dist/icon/faGraduationCap';
import faComment from 'fontawesome-webfont-react-fela/dist/icon/faComment';
import faLeaf from 'fontawesome-webfont-react-fela/dist/icon/faLeaf';
import faTruck from 'fontawesome-webfont-react-fela/dist/icon/faTruck';
import faThumbsUp from 'fontawesome-webfont-react-fela/dist/icon/faThumbsUp';
import faCreditCard from 'fontawesome-webfont-react-fela/dist/icon/faCreditCard';
import faNewspaper from 'fontawesome-webfont-react-fela/dist/icon/faNewspaper';

export interface Navigation {
	id: string;
	sections: NavigationSection[];
}

export interface NavigationSection {
	section_key: string;
	icon?: FontAwesomeIconDefinition;
	headline_mlo_key?: TranslationItemKey;
	description_mlo_key?: TranslationItemKey;
	elements: NavigationSectionElements[];
	additional_styles?: NestedStyle;
	additional_list_item_styles?: NestedStyle;
}

interface NavigationSectionElements {
	icon?: FontAwesomeIconDefinition;
	name_mlo_key: TranslationItemKey;
	description_mlo_key?: TranslationItemKey;
	show_as_highlight?: boolean;
	additional_styles?: NestedStyle;
	additional_content_function?: () => React.ReactNode | React.ReactNode[];
}

export const navigations: Navigation[] = [
	{
		id: 'header',
		sections: [
			{
				section_key: 'header_main',
				icon: faBarsSolid,
				elements: [
					{ name_mlo_key: 'header.navigation.new_releases' },
					{ name_mlo_key: 'header.navigation.databases' },
					{ name_mlo_key: 'header.navigation.ebooks' },
					{ name_mlo_key: 'header.navigation.elearning' },
					{ name_mlo_key: 'header.navigation.loose_leaf' },
					{ name_mlo_key: 'header.navigation.magazines' },
					{ name_mlo_key: 'header.navigation.contact' }
				]
			},
			{
				section_key: 'watchlist',
				icon: faStarRegular,
				elements: []
			},
			{
				section_key: 'user_home',
				headline_mlo_key: 'header.user_menu.name',
				icon: faUserRegular,
				elements: [
					{ name_mlo_key: 'header.user_menu.addresses' },
					{ name_mlo_key: 'header.user_menu.quotation_history' },
					{ name_mlo_key: 'header.user_menu.order_history' },
					{ name_mlo_key: 'header.user_menu.company_settings' },
					{ name_mlo_key: 'header.user_menu.company_master_data' },
					{ name_mlo_key: 'header.user_menu.publication_notice' },
					{ name_mlo_key: 'header.user_menu.settings' },
					{ name_mlo_key: 'header.user_menu.master_data' },
					{ name_mlo_key: 'header.user_menu.employees' },
					{ name_mlo_key: 'header.user_menu.password' },
					{ name_mlo_key: 'header.user_menu.master_cart' },
					{ name_mlo_key: 'header.user_menu.master_cart_history' },
					{ name_mlo_key: 'header.user_menu.mediacenter', icon: faCubes },
					{ name_mlo_key: 'header.user_menu.connect', icon: faFire },
					{ name_mlo_key: 'header.user_menu.logout' }
				]
			},
			{
				section_key: 'cart',
				icon: faShoppingCartSolid,
				elements: []
			}
		]
	},
	{
		id: 'footer',
		sections: [
			{
				section_key: 'features',
				headline_mlo_key: 'footer_features.headline',
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
						description_mlo_key: 'footer_services.newsletter.description'
					},
					{
						show_as_highlight: true,
						name_mlo_key: 'footer_services.social_media.name'
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
					{ name_mlo_key: 'footer_target_audience.libraries.name' },
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
					{ name_mlo_key: 'footer_company.right_of_withdrawal.name' },
					{ name_mlo_key: 'footer_company.imprint.name' }
				]
			}
		]
	}
];
