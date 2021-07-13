/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import styled from 'styled-components';
import store from '../redux-hooks/store';

let footerBackground = '';
let footerColor = '';

let THEME = localStorage.getItem('theme');
if ( THEME === null || THEME == 'null' ) {
	THEME = 'brandPolTheme';
}

store.map(item => {
	if ( item.value === 'theme' ) {
		
		let theme = item.label;
		theme.map(item => {
			if ( item.value === THEME ) {
				let pack = item.pack;
				pack.map(item => {
					if ( item.value === 'header' ) {
						footerBackground = item.styles[0].backgroundColor; 
					}
				});
			}
		});

	}
});

const footerTags = {
	Footer: styled.section`
		display: block;
		position: relative;
		width: 100%;
		max-width: 1350px;
		min-width: 1000px;
		height: 40px;
		background-color: ${footerBackground};
		box-sizing: border-box;
		box-shadow: 0px 0px 4px grey;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	`
}

export default footerTags;