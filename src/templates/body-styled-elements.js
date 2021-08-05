/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import styled from 'styled-components';
import store from '../redux-hooks/store';
import logo from '../images/brandpollogo.png';

let asideBackground = '';
let asideBtnColor = '';
let asideBtnHoverBackground = '';
let asideBtnHoverColor = '';
let workspaceBackground = '';
let tableHeaderBackground = '';
let tableHeaderColor = '';
let cellBorderColor = '';
let cellTextColor = '';
let createMonitoringButton = '';
let removePopupBackground = '';
let removePopupColor = '';
let removeBtnsShadow = '';
let removePopupBtnYes = '';
let removePopupBtnNo = '';
let cardContainerBackground = '';
let cardButtonBackground = '';
let cardDatepicLabel = '';
let cardHeadline = '';

let THEME = localStorage.getItem('theme');
THEME === null ? THEME = 'brandPolTheme' : 
THEME == 'null' ? THEME = 'brandPolTheme' : (() => {})();

store.map(item => {
	if ( item.value === 'theme' ) {
		
		let theme = item.label;
		theme.map(item => {
			if ( item.value === THEME ) {
				let pack = item.pack;
				pack.map(item => {
					if ( item.value === 'sideBar' ) {
						asideBackground = item.styles[0].backgroundColor;
						asideBtnColor = item.styles[1].color;
						asideBtnHoverBackground = item.styles[1].hoverBackground;
						asideBtnHoverColor = item.styles[1].hoverColor;
					} else if ( item.value === 'table' ) {
						tableHeaderBackground = item.styles[0].backgroundColor;
						tableHeaderColor = item.styles[0].color;
						cellBorderColor = item.styles[1].borderColor;
						cellTextColor = item.styles[1].color;
						createMonitoringButton = item.styles[2].backgroundColor;
					} else if ( item.value === 'removePopup' ) {
						removePopupBackground = item.styles[0].backgroundColor;
						removePopupColor = item.styles[0].color;
						removeBtnsShadow = item.styles[0].btnsShadow;
						removePopupBtnYes = item.styles[1].backgroundColor;
						removePopupBtnNo = item.styles[2].backgroundColor;
					} else if ( item.value === 'cardElements' ) {
						cardContainerBackground = item.styles[0].backgroundColor;
						cardButtonBackground = item.styles[1].backgroundColor;
						cardDatepicLabel = item.styles[2].color;
						cardHeadline = item.styles[4].color;
					} else if ( item.value === 'body' ) {
						workspaceBackground = item.styles[0].backgroundColor;
					}
				});
			}
		});
	
	}
});

const bodyTags = {
	MainSection: styled.section`
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		position: relative;
		width: 100%;
		max-width: 1350px;
		min-width: 1000px;
		height: calc(100vh - 140px);
		background-color: ${workspaceBackground};
		box-sizing: border-box;
		box-shadow: 0px 0px 4px grey;
		border-radius: 4px;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		overflow: hidden;
	`,
	MainSectionHelloBlock: styled.section`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		width: 500px;
		height: 500px;
		border-radius: 4px;
		margin: 0 auto;
		top: 50%;
		margin-top: -250px;
	`,
	MainSectionHelloBlockLogo: styled.span`
		display: block;
		position: relative;
		width: 400px;
		height: 200px;
		left: 0;
		background-image: url(${logo});
		background-size: 60%;
		background-repeat: no-repeat;
		background-position: center;
		:hover {
			cursor: pointer;
		}
	`,
	MainSectionHelloBlockText: styled.p`
		width: 70%;
		line-height: 22px;
		color: white;
		font-size: 14px;
		text-align: center;
	`,
	SideBar: styled.aside`
		display: block;
		position: relative;
		width: 240px;
		height: 100%;
		background-color: ${asideBackground};
		box-shadow: 0px 0px 4px black;
		padding-top: 12px;
		z-index: 10;
		overflow: hidden;
	`,
	SideMenuButton: styled.span`
		display: block;
		position: relative;
		width: calc(100% - 23px);
		height: 40px;
		line-height: 39px;
		font-size: 13px;
		color: ${asideBtnColor};
		padding-left: 0px;
		border-radius: 2px;
		margin-left: 12px;
		transition: all 200ms;
		:hover {	
			cursor: pointer;
			background-color: ${asideBtnHoverBackground};
			color: ${asideBtnHoverColor};
		}
	`,
	RightSideBar: styled.section`
		display: block;
		position: relative;
		max-width: 1350px;
		min-width: 1000px;
		width: 100%;
		height: auto;
		overflow: hidden;
		border-radius: 4px;
		box-shadow: 0px 0px 4px grey;
	`,
	RightSideBarPageTitle: styled.h3`
		display: block;
		position: relative;
		width: 100%;
		height: 46px;
		line-height: 44px;
		background-color: ${cellBorderColor.split('solid ')[1]};
		color: ${cardDatepicLabel};
		font-size: 13px;
		text-align: left;
		font-weight: 200;
		box-sizing: border-box;
		padding-left: 75px;
		overflow: hidden;
		margin: 0;
		border-radius: 4px;
	`,
	RightSideBarPageTitleBack: styled.span`
		display: block;
		position: absolute;
		left: 0%;
		top: 50%;
		margin-top: -20px;
		margin-left: 14px;
		width: 40px;
		height: 40px;
		border-radius: 20px;
	`,
	RightSideBarPageTitleForward: styled.span`
		display: block;
		position: absolute;
		left: 0%;
		top: 50%;
		margin-top: -20px;
		margin-left: 44px;
		width: 40px;
		height: 40px;
		border-radius: 20px;
	`,
	TextEditor: styled.section`
		display: block;
		position: absolute;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background-color: ${asideBackground};
		z-index: 100;
		box-sizing: border-box;
		transition: all 400ms;
		opacity: 1;
	`,
	TextEditorHeader: styled.section`
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 64px;
		border-bottom: 2px solid ${cardContainerBackground};
		padding: 0 24px;
		box-sizing: border-box;
	`,
	TextEditorHeaderTitle: styled.h3`
		display: block;
		font-size: 16px;
		letter-spacing: 1px;
		color: ${asideBtnColor};
	`,
	TextEditorWorkSpace: styled.div`
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
		position: relative;
		width: 100%;
		height: calc(100vh - 100px);
		background-color: ${workspaceBackground};
	`,
	TextEditorWorkSpaceMenu: styled.div`
		display: block;
		position: relative;
		width: 300px;
		height: 100%;
		background-color: ${asideBackground};
		padding-left: 24px;
		padding-top: 20px;
		box-sizing: border-box;
	`,
	TextEditorWorkSpaceMenuItem: styled.span`
		display: block;
		position: relative;
		width: 100%;
		height: auto;
		margin-bottom: 8px;
		padding-bottom: 2px;
		font-size: 13px;
		line-height: 30px;
		padding-left: 34px;
		color: ${asideBtnColor};
		:hover {
			cursor: pointer;
		}
	`,
	TextEditorWorkSpaceMenuDivider: styled.span`
		display: block;
		position: relative;
		width: 80%;
		height: 2px;
		background-color: ${workspaceBackground};
		margin-top: 18px;
		margin-bottom: 20px;
		margin-left: -2px;
	`,
	TextEditorWorkSpaceEditor: styled.div`
		display: block;
		position: relative;
		width: calc(100% - 300px);
		height: 100%;
		overflow: hidden;
	`,
	TextEditorWorkSpaceEditorLine: styled.article`
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		width: 100%;
		height: auto;
		box-sizing: border-box;
		line-height: 20px;
		padding: 11px 0px;
		padding-left: 14px;
		border-bottom: 1px solid ${asideBackground};
		font-style: italic;
		:hover {
			cursor: pointer;
		}
	`,
	TextEditorWorkSpaceEditorLineSave: styled.span`
		display: block;
		position: absolute;
		width: 24px;
		height: 24px;
		box-sizing: border-box;
		margin-top: -1px;
		margin-left: 8px;
		:hover {
			cursor: pointer;
		}
	`,
	LogsBar: styled.section`
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: flex-start;
		position: absolute;
		width: 300px;
		height: 100vh;
		top: 0;
		left: 100%;
		background-color: ${asideBackground};
		z-index: 100;
		box-shadow: 0px 0px 4px black;
		box-sizing: border-box;
		transition: all 200ms;
	`,
	LogsBarTitle: styled.div`
		display: block;
		width: 260px;
		height: 60px;
		line-height: 58px;
		text-align: right;
		border-bottom: 2px solid rgb(255, 192, 0);
		color: white;
		font-size: 13px;
		font-weight: 500;
		letter-spacing: 2px;
		padding-right: 20px;
		box-sizing: border-box;
	`,
	LogsBarMessageSpace: styled.article`
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: flex-start;
		width: 300px;
		height: 80vh;
		overflow-y: scroll;
		overflow-x: hidden;
		box-sizing: border-box;
		padding-left: 20px;
		padding-top: 20px;
		padding-right: 24px;
		margin-right: -16px;
	`,
	LogsBarMessageSpaceLog: styled.div`
		display: block;
		position: relative;
		width: 230px;
		height: auto;
		box-sizing: border-box;
		border-left: 2px solid ${tableHeaderBackground};
		margin-bottom: 10px;
		padding-top: 8px;
		padding-bottom: 10px;
		padding-left: 12px;
		color: white;
		font-size: 13px;
		line-height: 20px;
	`,
	MonitoringAddForm: styled.div`
		display: block;
		position: relative;
		width: calc(70% - 240px);
		height: auto;
		background-color: ${cardContainerBackground};
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
		padding: 16px;
		box-sizing: border-box;
		margin-left: 12px;
	`,
	MonitoringAddFormInput: styled.input`
		display: block;
		position: relative;
		width: 100%;
		height: 44px;
		outline: none;
		border: none;
		border-radius: 4px;
		color: black;
		font-weight: 200 !important;
		font-size: 13px;
		margin-bottom: 9px;
		padding-bottom: 2px;
		text-align: center;
		background-color: white;
		box-sizing: border-box;
		border-left: 4px solid #ffc000;
		border-right: 4px solid #ffc000;
	`,
	MonitoringAddFormInputButtonsGroup: styled.div`
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		position: relative;
		width: 304px;
		height: 39px;
		outline: none;
		border: none;
		border-bottom: 2px solid #ffc000;
		color: white;
		font-size: 13px;
		margin-bottom: 16px;
		margin-left: 8px;
		background-color: transparent;
	`,
	MonitoringAddFormButtonsBlock: styled.div`
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		height: 40px;
		width: 100%;
	`,
	MonitoringAddFormSubmit: styled.span`
		display: block;
		position: relative;
		width: 200px;
		height: 40px;
		border-radius: 4px;
		text-align: center;
		line-height: 39px;
		font-size: 13px;
		background-color: ${createMonitoringButton};
		color: black;
		box-shadow: 0px 0px 3.5px #113341;
		:hover {
			cursor: pointer;
		}
	`,
	MonitoringAddFormBackHistory: styled.span`
		display: block;
		position: relative;
		width: 140px;
		height: 40px;
		border-radius: 4px;
		text-align: center;
		line-height: 39px;
		font-size: 13px;
		background-color: ${removePopupBtnNo};
		color: black;
		box-shadow: 0px 0px 3.5px #113341;
		margin-right: 16px;
		:hover {
			cursor: pointer;
		}
	`,
	MonitoringAddFormAddFile: styled.div`
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		position: relative;
		width: 55%;
		height: 110px;
		border: 1px dashed white;
		border-radius: 4px;
		margin-top: 17px;
		box-sizing: border-box;
		overflow: hidden;
		:hover {
			cursor: pointer;
		}
	`,
	MonitoringAddFormAddFileContent: styled.div`
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		height: auto;
		min-height: 20px;
		margin-left: auto;
		margin-right: auto;
	`,
	MonitoringAddFormAddFileContentText: styled.p`
		display: block;
		color: ${cardDatepicLabel};
		font-size: 14px;
		font-weight: 500;
		margin-left: 16px;
	`,
	MonitoringCard: styled.div`
		display: block;
		position: relative;
		width: calc(70% - 240px);
		height: auto;
		background-color: ${cardContainerBackground};
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
		padding: 16px;
		padding-top: 18px;
		box-sizing: border-box;
		margin-left: 12px;
	`,
	MonitoringCardTitle: styled.h4`
		display: block;
		position: relative;
		width: 80%;
		height: 24px;
		line-height: 24px;
		font-size: 16px;
		color: ${cardHeadline};
		padding-left: 12px;
	`,
	MonitoringCardParams: styled.div`
		display: block;
		position: relative;
		width: 100%;
		height: auto;
		min-height: 200px;
		border: 1px solid #424242;
		margin-bottom: 17px;
		border-radius: 4px;
		padding: 22px;
		padding-bottom: 18px;
		box-sizing: border-box;
	`,
	MonitoringCardParamsLine: styled.div`
		display: flex;
		flex-direction: column;
		width:	100%;
		height: auto;
		min-height: 20px;
		border-bottom: 1px solid #424242;
		padding-top: 11px;
		padding-bottom: 11px;
		padding-left: 8px;
		box-sizing: border-box;
		:hover {
			cursor: pointer;
		}
	`,
	MonitoringCardParamsLineLabel: styled.span`
		width: 100%;
		line-height: 18px;
		font-size: 12px;
		padding-left: 6px;
		color: ${cardDatepicLabel};
	`,
	MonitoringCardParamsLineValue: styled.span`
		display: block;
		position: relative;
		width: 100%;
		line-height: 22px;
		font-size: 15px;
		font-weight: 700;
		padding-left: 6px;
		color: white;
	`,
	MonitoringCardParamsLineInput: styled.input`
		display: block;
		position: relative;
		width: 70%;
		line-height: 34px;
		font-size: 11px;
		font-weight: 200;
		padding-left: 10px;
		margin-top: 12px;
		margin-left: 10px;
		margin-bottom: 10px;
		box-sizing: border-box;
		outline: none;
		border: none;
		box-shadow: none;
		border-radius: 4px;
		:hover {
			outline: none;
			border: none;
			box-shadow: none;
		}
	`,
	MonitoringCardCreateReportButton: styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		position: absolute;
		width: calc(100% - 380px);
		height: 300px;
		border: 2px solid white;
		border-radius: 4px;
		top: 0;
		margin-top: 26px;
		left: 352px;
	`,
	MonitoringCardCreateReportButtonTitle: styled.h4`
		display: block;
		position: relative;
		width: 100%;
		height: auto;
		line-height: 30px;
		text-align: center;
		color: white;
		font-size: 20px;
	`,
	MonitoringCardCreateReportButtonAction: styled.span`
		display: block;
		position: absolute;
		width: 160px;
		height: 40px;
		line-height: 38px;
		border-radius: 4px;
		top: 100%;
		margin-top: -60px;
		box-sizing: border-box;
		text-align: center;
		font-size: 13px;
		background-color: #ffc000;
		box-shadow: 0px 0px 3.5px #113341;
		:hover {
			cursor: pointer;
		}
	`,
	MonitoringRemoveWindow: styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		width: 440px;
		height: 350px;
		background-color: ${removePopupBackground};
		border-radius: 4px;
		margin: 0 auto;
		top: 50%;
		margin-top: -240px;
	`,
	MonitoringRemoveWindowIcon: styled.span`
		display: block;
		position: relative;
		width: 60px;
		height: 60px;
		border-radius: 30px;
		margin-top: 30px;
		background-color: rgb(216, 216, 216);
		:hover {
			cursor: pointer;
		}
	`,
	MonitoringRemoveWindowHeadline: styled.h3`
		display: block;
		width: 80%;
		height: auto;
		line-height: 28px;
		font-size: 16px;
		text-align: center;
		margin-top: 30px;
		color: ${removePopupColor};
	`,
	MonitoringRemoveWindowText: styled.p`
		display: block;
		width: 80%;
		height: auto;
		line-height: 22px;
		font-size: 13px;
		text-align: center;
		margin-top: 10px;
		color: ${removePopupColor};
	`,
	MonitoringRemoveWindowButtons: styled.div`
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		position: relative;
		width: 300px;
		height: auto;
		border-radius: 4px;
		margin-top: 42px;
	`,
	MonitoringRemoveWindowButtonsYes: styled.span`
		display: block;
		position: relative;
		width: 140px;
		height: 40px;
		border-radius: 4px;
		background-color: ${removePopupBtnYes};
		box-shadow: ${removeBtnsShadow};
		font-size: 13px;
		line-height: 39px;
		text-align: center;
		:hover {
			cursor: pointer;
		}
	`,
	MonitoringRemoveWindowButtonsNo: styled.span`
		display: block;
		position: relative;
		width: 140px;
		height: 40px;
		border-radius: 4px;
		background-color: ${removePopupBtnNo};
		box-shadow: ${removeBtnsShadow};
		font-size: 13px;
		line-height: 39px;
		text-align: center;
		:hover {
			cursor: pointer;
		}
	`,
	MonitoringCorrectForm: styled.div`
		display: block;
		position: relative;
		width: calc(70% - 240px);
		height: auto;
		background-color: ${cardContainerBackground};
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
		padding: 16px;
		box-sizing: border-box;
		margin-left: 12px;
		padding-top: 18px;
	`,
	MonitoringCorrFormInput: styled.input`
		display: block;
		position: relative;
		width: 300px;
		height: 40px;
		outline: none;
		border: none;
		background-color: white;
		box-shadow: 0px 0px 6px 0.5px grey;
		color: grey;
		font-size: 13px;
		margin-bottom: 9px;
		padding-left: 10px;
		border-radius: 4px;
	`,
	InputWrapper: styled.div`
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		width: 100%;
		margin-bottom: 9px; 
	`,
	InputWrapperVertical: styled.div`
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		position: relative;
		width: 100%;
		margin-bottom: 9px; 
	`,
	InputWrapperDiscription: styled.p`
		font-size: 13px;
		margin-left: 6px;
		color: ${cardDatepicLabel};
		font-style: italic;
	`,
	MonitoringListWrapper: styled.section`
		display: block;
		position: relative;
		width: calc(100% - 240px);
		height: calc(100% - 40px);
		box-sizing: border-box;
		overflow: hidden;
		padding-right: 22px;
		padding-bottom: 120px;
	`,
	MonitoringListWrapperScrollBarTop: styled.div`
		display: block;
		position: relative;
		width: calc(100% + 40px);
		height: auto;
		overflow-y: scroll;
		background-color: ${asideBackground};
		color: ${tableHeaderColor};
	`,
	MonitoringListWrapperScrollBar: styled.div`
		display: block;
		position: relative;
		width: calc(100% + 40px);
		height: 100%;
		overflow-y: scroll;
		color: ${cellTextColor};
	`,
	MonitoringListWrapperScrollBarPagination: styled.div`
		display: flex;
		flex-direction: row;
		align-self: center;
		justify-content: space-between;
		position: fixed;
		width: 150px;
		height: 30px;
		background-color: ${asideBackground};
		margin-top: 16px;
		margin-left: 16px;
		border-radius: 4px;
		overflow: hidden;
		z-index: 5;
		:hover {
			cursor: pointer;
		}
	`,
	MonitoringListWrapperScrollBarPaginationButton: styled.span`
		display: block;
		position: relative;
		width: 30px;
		height: 30px;
		border-right: 1px solid ${workspaceBackground};
		color: ${asideBtnColor};
		line-height: 30px;
		font-size: 10px;
		text-align: center;
		:hover {
			cursor: pointer;
		}
	`,
	MonitoringListWrapperScrollBarMenu: styled.div`
		display: flex;
		flex-direction: row;
		align-self: center;
		justify-content: space-between;
		position: fixed;
		width: 150px;
		height: 30px;
		background-color: ${asideBackground};
		margin-top: 16px;
		margin-left: 180px;
		border-radius: 4px;
		z-index: 5;
		:hover {
			cursor: pointer;
		}
	`,
	MonitoringListWrapperScrollBarMenuButton: styled.span`
		display: block;
		position: relative;
		width: 50px;
		height: 30px;
		border-right: 1px solid ${workspaceBackground};
		color: ${asideBtnColor};
		line-height: 30px;
		font-size: 10px;
		text-align: center;
		:hover {
			cursor: pointer;
		}
	`,
	MonitoringListWrapperItem: styled.div`
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 40px;
		border-bottom: ${cellBorderColor};
		box-sizing: border-box;
	`,
	MonitoringListWrapperItemCellName: styled.span`
		display: block;
		position: relative;
		width: 30%;
		height: 40px;
		line-height: 40px;
		font-size: 13px;
		padding-left: 68px;
		box-sizing: border-box;
		:hover {
			color: #ffc000;
			cursor: pointer;
		}
	`,
	MonitoringListWrapperItemCellNameHead: styled.span`
		display: block;
		position: relative;
		width: 30%;
		height: 40px;
		line-height: 40px;
		font-size: 13px;
		padding-left: 98px;
		box-sizing: border-box;
	`,
	MonitoringListWrapperItemCell: styled.span`
		display: block;
		width: 14%;
		height: 40px;
		border-left: ${cellBorderColor};
		line-height: 40px;
		font-size: 13px;
		text-align: center;
	`,
	MonitoringListWrapperItemCellView: styled.i`
		display: block;
		position: absolute;
		width: 22px;
		height: 22px;
		border-radius: 12px;
		background-color: rgb(216, 216, 216);
		top: 50%;
		margin-top: -12px;
		left: 0;
		margin-left: 10px;
		:hover {
			cursor: pointer;
		}
	`,
	MonitoringListWrapperItemCellCorrect: styled.i`
		display: block;
		position: absolute;
		width: 22px;
		height: 22px;
		border-radius: 12px;
		background-color: rgb(216, 216, 216);
		top: 50%;
		margin-top: -12px;
		left: 0;
		margin-left: 38px;
		:hover {
			cursor: pointer;
		}
	`,
	MonitoringListWrapperItemCellDelete: styled.i`
		display: block;
		position: absolute;
		width: 22px;
		height: 22px;
		border-radius: 12px;
		background-color: rgb(216, 216, 216);
		top: 50%;
		margin-top: -12px;
		left: 0;
		margin-left: 39px;
		:hover {
			cursor: pointer;
		}
	`,
	MonitoringListSorryBlock: styled.div`
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		width: 400px;
		height: 200px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -150px;
		margin-top: -100px;
	`,
	MonitoringListSorryBlockTitle: styled.p`
		color: white;
		font-size: 14px;
		margin-left: 26px;
		line-height: 24px;
	`,
	MonitoringListExportTableToCsv: styled.span`
		display: block;
		position: relative;
		width: 100px;
		height: 40px;
		border-radius: 4px;
		text-align: right;
		line-height: 39px;
		font-size: 13px;
		margin-right: 22px;
		background-color: ${createMonitoringButton};
		background-color: transparent;
		color: white;
		box-shadow: 0px 0px 3.5px #113341;
		box-shadow: none;
	`,
	MonitoringAddParamsForm: styled.div`
		display: block;
		position: relative;
		width: 100%;
		height: auto;
		min-height: 100px;
		box-sizing: border-box;
	`,
	MonitoringAddParamsFormLine: styled.div`
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		height: 40px;
		box-sizing: border-box;
	`,
	MonitoringAddParamsFormInput: styled.input`
		display: block;
		position: relative;
		width: 100%;
		height: 40px;
		outline: none;
		border: none;
		border-bottom: 2px solid #ffc000;
		color: white;
		font-size: 13px;
		padding-top: 1px;
		padding-left: 10px;
		background-color: transparent;
		box-sizing: border-box;
	`,
	MonitoringAddParamsFormShortInput: styled.input`
		display: block;
		position: relative;
		width: 25%;
		height: 46px;
		outline: none;
		border: none;
		border-bottom: 2px solid #ffc000;
		color: white;
		font-size: 11px;
		letter-spacing: 1px;
		text-align: center;
		padding-top: 1px;
		margin-right: 14px;
		background-color: transparent;
		box-sizing: border-box;
		:hover {
			cursor: pointer;
		}
	`,
	MonitoringAddParamsFormShortInputLabel: styled.span`
		display: block;
		position: relative;
		width: 40%;
		height: 40px;
		line-height: 40px;
		font-size: 13px;
		margin-left: 6px;
		font-style: italic;
		color: ${cardDatepicLabel}
	`,
	MonitoringAddParamsFormTitle: styled.span`
		display: block;
		position: relative;
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		padding-left: 14px;
		margin-top: 9px;
		font-style: italic;
		color: ${cardDatepicLabel}
	`,
}

export default bodyTags;