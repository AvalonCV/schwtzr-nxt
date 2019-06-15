import { FontAwesomeIcon, FontAwesomeIconName } from '../../../app/components/elements/fontAwesomeIcon';
import { NestedStyle } from '../../../app/styles/fela';
import { TranslationItemKey } from '../../../shared/localisation/translations';

interface Navigation {
	id: string;
	sections: NavigationSection[];
}

export interface NavigationSection {
	section_key: string;
	headline_mlo_key?: TranslationItemKey;
	description_mlo_key?: TranslationItemKey;
	elements: NavigationSectionElements[];
	additional_styles?: NestedStyle;
	additional_list_item_styles?: NestedStyle;
}

interface NavigationSectionElements {
	icon?: FontAwesomeIcon | FontAwesomeIconName;
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
				elements: [
					{ name_mlo_key: 'header.navigation.new_releases' },
					{ name_mlo_key: 'header.navigation.ebooks' },
					{ name_mlo_key: 'header.navigation.databases' },
					{ name_mlo_key: 'header.navigation.elearning' },
					{ name_mlo_key: 'header.navigation.loose_leaf' },
					{ name_mlo_key: 'header.navigation.magazines' },
					{ name_mlo_key: 'header.navigation.contact' }
				]
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
						icon: 'cubes',
						show_as_highlight: true,
						name_mlo_key: 'footer_features.top_selection.name',
						description_mlo_key: 'footer_features.top_selection.description'
					},
					{
						icon: 'graduation-cap',
						show_as_highlight: true,
						name_mlo_key: 'footer_features.experience.name',
						description_mlo_key: 'footer_features.experience.description'
					},
					{
						icon: 'comment',
						show_as_highlight: true,
						name_mlo_key: 'footer_features.personal_service.name',
						description_mlo_key: 'footer_features.personal_service.description'
					},
					{
						icon: 'leaf',
						show_as_highlight: true,
						name_mlo_key: 'footer_features.sustainability.name',
						description_mlo_key: 'footer_features.sustainability.description'
					},
					{
						icon: 'truck',
						show_as_highlight: true,
						name_mlo_key: 'footer_features.fast_delivery.name',
						description_mlo_key: 'footer_features.fast_delivery.description'
					},
					{
						icon: 'thumbs-up',
						show_as_highlight: true,
						name_mlo_key: 'footer_features.free_shipping.name',
						description_mlo_key: 'footer_features.free_shipping.description'
					},
					{
						icon: 'credit-card',
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
						icon: 'newspaper',
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
