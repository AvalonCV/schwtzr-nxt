export const corecss = `


html,
body {
	min-height: 100vh;
}

body {
	position: relative;
	color: #4d4d4d;
	font-family: 'Open Sans', sans-serif;
	/* should lead to a height of '24px', as the default font-size is '16px' */
	line-height: 1.5;
	/*	font-size: calc(14px + 0.3vw); */
	font-size: calc(14px + (100vw / 512));
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
}

#root {
	flex-grow: 1;
}

/* Lists are used for semantic purposes all around the layout. If we need nicer looking
	lists with margin/padding/indents/etc. => add a 'document-style'-container-class around
	them and style it there.
*/

ul,
ol,
dl,
dd,
p {
	margin: 0;
	padding: 0;
}

ul,
ol {
	list-style: none;
}

/* We put links around almost everything, but its */

a {
	color: inherit;
	text-decoration: none;
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
	line-height: 1.4;
	margin: 0;
	color: #982018;
}
`;
