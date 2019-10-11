import { NestedStyle } from '../../../styles/fela';

export const header_styles: NestedStyle = {
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
	},
	'@media (max-height:640px) and (max-width: 960px) and (orientation:landscape)': {
		position: 'fixed',
		left: 0,
		height: '100%',
		width: '64px',
		display: 'block'
	}
};

export const header_content_styles: NestedStyle = {
	maxWidth: '1280px',
	margin: '0 auto',
	padding: '0 1em',
	boxSizing: 'border-box',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	flexGrow: 1,
	'@media (max-height:640px) and (max-width: 960px) and (orientation:landscape)': {
		padding: 0
	}
};

export const logo_link_styles: NestedStyle = {
	display: 'inline-block',
	maxWidth: '40%',
	'@media (max-height:640px) and (max-width: 960px) and (orientation:landscape)': {
		maxWidth: '100%',
		display: 'block',
		paddingTop: '0.5em',
		paddingRight: '0.25em',
		paddingBottom: '0.5em',
		paddingLeft: '0.25em'
	}
};

export const header_menu_list_styles: NestedStyle = {
	display: 'none',
	'@media (min-width:640px)': {
		display: 'block'
	}
};

export const header_menu_list_item_styles: NestedStyle = {
	display: 'inline-block',
	padding: '0.4em 2em 0.4em 1em'
};

export const header_option_list_style: NestedStyle = {
	float: 'right',
	display: 'inline-block',
	margin: '0 auto',
	'@media (max-height:640px) and (max-width: 960px) and (orientation:landscape)': {
		display: 'block',
		float: 'none'
	}
};
export const header_option_list_item_style: NestedStyle = {
	display: 'inline-block',
	paddingTop: '1em',
	paddingLeft: '1.5em',
	paddingRight: '0.5em',
	'@media (max-height:640px) and (max-width: 960px) and (orientation:landscape)': {
		display: 'block',
		paddingLeft: 0,
		paddingRight: 0,
		textAlign: 'center'
	}
};
export const header_option_list_item_icon_style: NestedStyle = {
	fontSize: '2em',
	color: '#7f9acb'
};
