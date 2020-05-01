// Based on https://codepen.io/jpanter/pen/PWWQXK/

import React from 'react';

import { NestedStyle } from '../../styles/fela';
import { useFela } from 'react-fela';

const blink_keyframes = () => ({
	'0%': { opacity: 0.1 },
	'30%': { opacity: 1.0 },
	'100%': { opacity: 0.1 }
});

const page_element_loader_styles: { [property: string]: NestedStyle } = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},

	row: {
		display: 'flex'
	},

	arrow: {
		width: 0,
		height: 0,
		margin: '0 -6px',
		borderLeft: '12px solid transparent',
		borderRight: '12px solid transparent',
		borderBottom: '21.6px solid #007098',
		animationDuration: '1s',
		animationIterationCount: 'infinite',
		filter: 'drop-shadow(0 0 18px #007098)'
	},

	down: {
		transform: 'rotate(180deg)'
	},

	outer1: { animationDelay: '-0.0555555556s' },
	outer2: { animationDelay: '-0.1111111111s' },
	outer3: { animationDelay: '-0.1666666667s' },
	outer4: { animationDelay: '-0.2222222222s' },
	outer5: { animationDelay: '-0.2777777778s' },
	outer6: { animationDelay: '-0.3333333333s' },
	outer7: { animationDelay: '-0.3888888889s' },
	outer8: { animationDelay: '-0.4444444444s' },
	outer9: { animationDelay: '-0.5s' },
	outer10: { animationDelay: '-0.5555555556s' },
	outer11: { animationDelay: '-0.6111111111s' },
	outer12: { animationDelay: '-0.6666666667s' },
	outer13: { animationDelay: '-0.7222222222s' },
	outer14: { animationDelay: '-0.7777777778s' },
	outer15: { animationDelay: '-0.8333333333s' },
	outer16: { animationDelay: '-0.8888888889s' },
	outer17: { animationDelay: '-0.9444444444s' },
	outer18: { animationDelay: '-1s' },

	inner1: { animationDelay: '-0.1666666667s' },
	inner2: { animationDelay: '-0.3333333333s' },
	inner3: { animationDelay: '-0.5s' },
	inner4: { animationDelay: '-0.6666666667s' },
	inner5: { animationDelay: '-0.8333333333s' },
	inner6: { animationDelay: '1s' }
};

export interface LoaderProperties {}

export const PageElementLoader: React.FunctionComponent<LoaderProperties> = props => {
	const { css, renderer } = useFela(props);

	const loader_configuration = [
		['outer18', 'outer17', 'outer16', 'outer15', 'outer14'],
		['outer1', 'outer2', 'inner6', 'inner5', 'inner4', 'outer13', 'outer12'],
		['outer3', 'outer4', 'inner1', 'inner2', 'inner3', 'outer11', 'outer10'],
		['outer5', 'outer6', 'outer7', 'outer8', 'outer9']
	];

	const animation_name = renderer.renderKeyframe(blink_keyframes, {});

	return (
		<div className={css(page_element_loader_styles.container)}>
			{loader_configuration.map((row_elements, row_index) => {
				return (
					<div key={row_index} className={css(page_element_loader_styles.row)}>
						{row_elements.map((element, element_index) => {
							return (
								<div
									key={element_index}
									className={[
										css({
											...page_element_loader_styles.arrow,
											...page_element_loader_styles[element],
											...((element_index + (row_index > 1 ? 1 : 0)) % 2
												? page_element_loader_styles.down
												: {}),
											animationName: animation_name
										})
									].join(' ')}
								/>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};
