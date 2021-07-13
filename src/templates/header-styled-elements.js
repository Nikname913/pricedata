/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import styled from 'styled-components';
import store from '../redux-hooks/store';
import logo from '../images/logo.png';

let headerBackground = '';
let headerColor = '';

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
						headerBackground = item.styles[0].backgroundColor; 
						headerColor = item.styles[0].color;
					}
				});
			}
		});

	}
});

const headerTags = {
	Header: styled.section`
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		padding-left: 10px;
		padding-right: 10px;
		position: relative;
		width: 100%;
		max-width: 1350px;
		min-width: 1000px;
		height: 80px;
		background-color: ${headerBackground};
		box-sizing: border-box;
		box-shadow: 0px 0px 4px grey;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		overflow: hidden;
	`,
	Logo: styled.span`
		display: block;
		position: absolute;
		width: 200px;
		height: 80px;
		left: 0;
		background-image: url(${logo});
		background-size: 76%;
		background-repeat: no-repeat;
		background-position: 18px center;
		:hover {
			cursor: pointer;
		}
	`,
	LogoTitle: styled.h4`
		display: block;
		position: relative;
		width: 300px;
		font-size: 14px;
	`,
	SwitchLabel: styled.span`
		color: ${headerColor};
		font-size: 13px;
		margin-right: 3px;
		margin-bottom: 2px;
		padding-left: 14px;
		border-left: 1px solid white;
	`,
	MenuBlock: styled.div`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100px;
		height: auto;
		margin-right: 16px;
		margin-top: 8px;
	`
}

export default headerTags;