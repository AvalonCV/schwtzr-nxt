import UniversLight from './../../app/fonts/UniversLight.woff2';
import Univers from './../../app/fonts/Univers.woff2';

export const corecss = `

@font-face {
	font-family: 'Universe';
	font-style: normal;
	font-weight: 400;
	font-display: auto;
	src: url("${UniversLight}") format("woff2");
}

@font-face {
	font-family: 'Universe';
	font-style: normal;
	font-weight: 700;
	font-display: auto;
	src: url("${Univers}") format("woff2");
}

@font-face {
	font-family: 'Font Awesome 5 Free';
	font-style: normal;
	font-weight: 900;
	font-display: auto;
	src: url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/webfonts/fa-solid-900.woff2") format("woff2");
}

@font-face {
	font-family: 'Font Awesome 5 Free';
	font-style: normal;
	font-weight: 400;
	font-display: auto;
	src: url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/webfonts/fa-regular-400.woff2") format("woff2");
}

@font-face {
	font-family: 'Font Awesome 5 Brands';
	font-style: normal;
	font-weight: 400;
	font-display: auto;
	src: url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/webfonts/fa-brands-400.woff2") format("woff2");
}

html {
	font-family: 'Universe', sans-serif;
	/* should lead to a height of '24px', as the default font-size is '16px' */
	font-size: calc(14px + (100vw / 960));
}

body {
	min-height: 100vh;
	position: relative;
	color: #4d4d4d;
	line-height: 1.4;
	overflow-y: scroll;
}
#root {
	min-height: 100vh;
}

/* Lists are used for semantic purposes all around the layout. If we need nicer looking
	lists with margin/padding/indents/etc. => add a 'document-style'-container-class around
	them and style it there.
*/

ul,
ol,
dl,
dd,
p,
td {
	margin: 0;
	padding: 0;
}

ul,
ol {
	list-style: none;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}

img {
	display: block;
	max-width: 100%;
	height: auto;
}


picture {
	display: inline-block;
	position: relative;
	line-height: 0;
	max-width: 100%;
}

picture::after {
	content: '';
	display: block;

}

picture > img {
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
}


/* We put links around almost everything, but its */

a {
	color: inherit;
	text-decoration: none;
	background-color: rgba(255, 255, 255, 0);
}

/*
        A reset, of sorts, to force all inline-elements like <ins>World!</ins>
        to NOT adjust the line-height of the parent <p>Hello <ins>World!</ins></p>
*/
small,
s,
q,
u,
i,
b,
strike,
strong,
mark,
abbr,
def,
cite,
var,
kbd,
em,
ins,
del,
code,
samp {
	line-height: 1em;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	margin: 0;
}
`;
