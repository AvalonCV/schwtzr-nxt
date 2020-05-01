import React from 'react';

import { useFela } from 'react-fela';

import { FontAwesomeIcon } from 'fontawesome-webfont-react-fela';
import { faStarRegular } from 'fontawesome-webfont-react-fela/dist/icon/faStar';
import { faUserRegular } from 'fontawesome-webfont-react-fela/dist/icon/faUser';
import { faShoppingCartSolid } from 'fontawesome-webfont-react-fela/dist/icon/faShoppingCart';

import { Link } from '../../elements/Link';

import { DrawPicture } from '../../elements/Image';
import logo from './../../../images/schweitzer_logo_white.svg';

import { useQuery } from '@apollo/react-hooks';
import getHeaderNavigationData from './getHeaderNavigationData.gql';
import { GetHeaderDataQuery } from '../../../../generated/graphql';

import { useTranslation } from 'react-i18next';
import { getMLOText } from '../../../localisation/getMLOText';

import {
	header_content_styles,
	header_menu_list_item_styles,
	header_menu_list_styles,
	header_option_list_item_icon_style,
	header_option_list_item_style,
	header_option_list_style,
	header_styles,
	logo_link_styles
} from './HeaderStyles';

interface HeaderProperties {}

const HeaderOptions: React.FunctionComponent = props => {
	const { css } = useFela(props);
	return (
		<ol className={css(header_option_list_style)}>
			<li className={css(header_option_list_item_style)}>
				<FontAwesomeIcon icon={faStarRegular} additional_styles={header_option_list_item_icon_style} />
			</li>
			<li className={css(header_option_list_item_style)}>
				<FontAwesomeIcon icon={faUserRegular} additional_styles={header_option_list_item_icon_style} />
			</li>
			<li className={css(header_option_list_item_style)}>
				<FontAwesomeIcon icon={faShoppingCartSolid} additional_styles={header_option_list_item_icon_style} />
			</li>
		</ol>
	);
};

export const Header: React.FunctionComponent<HeaderProperties> = props => {
	const { data } = useQuery<GetHeaderDataQuery>(getHeaderNavigationData);
	const { css } = useFela(props);
	const { t } = useTranslation();

	return (
		<header className={css(header_styles)}>
			<div className={css(header_content_styles)}>
				<div>
					<Link to="/" style={logo_link_styles}>
						<DrawPicture image={logo} />
					</Link>

					<HeaderOptions />
				</div>

				<ol className={css(header_menu_list_styles)}>
					{data &&
						data.getHeaderNavigation.sections
							.filter(section => section.section_key === 'header_main')
							.map(section => {
								return section.elements.map((element, index) => {
									return (
										<li key={index} className={css(header_menu_list_item_styles)}>
											{element.name_mlo_key && getMLOText(t, element.name_mlo_key)}
										</li>
									);
								});
							})}
				</ol>
			</div>
		</header>
	);
};
