/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useContext, useEffect } from "react";
import { ReduxHooksContext } from "../../Context";
import fetchDispatcher from "../../services/fetch-query.service";
import middleware from "../../redux-hooks/middleware";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPenSquare, faSave } from '@fortawesome/free-solid-svg-icons';
import bodyTags from '../../templates/body-styled-elements';

const Editor = bodyTags.TextEditor;
const Header = bodyTags.TextEditorHeader;
const Title = bodyTags.TextEditorHeaderTitle;
const Workspace = bodyTags.TextEditorWorkSpace;
const SideMenu = bodyTags.TextEditorWorkSpaceMenu;
const SideMenuButton = bodyTags.TextEditorWorkSpaceMenuItem;
const SideMenuDivider = bodyTags.TextEditorWorkSpaceMenuDivider;
const CodeHere = bodyTags.TextEditorWorkSpaceEditor;
const CodeHereLine = bodyTags.TextEditorWorkSpaceEditorLine;
const SaveIcon = bodyTags.TextEditorWorkSpaceEditorLineSave;

export default function ProductsEditor() {

	const { state, dispatch } = useContext(ReduxHooksContext);

	useEffect(() => {

		if ( state[10].label[8].label[4].label === 'products' ) {

			const getProducts = fetchDispatcher({fetchType: 'GET_PRODUCTS_TOTAL'});
			getProducts.then(data => {
				middleware({
					type: 'PRODUCTS_DATA',
					value: JSON.stringify(data)
				});
			});

			setTimeout(() => {

				let base = JSON.parse(localStorage.getItem('productData')).data;
				let arr = [];
				base.forEach(item => arr.push(0));
			
				dispatch({
					type: 'EDITOR_DATA',
					value: JSON.parse(localStorage.getItem('productData'))
				});
				dispatch({
					type: 'EDITOR_DATA_SAVEARR',
					value: arr
				});

				middleware({ type: 'CLEAR_PRODUCTS_DATA' });
		
			}, 1000);
	
		} else {

			const getSources = fetchDispatcher({fetchType: 'GET_SOURCES_TOTAL'});
			getSources.then(data => {
				middleware({
					type: 'SOURCES_DATA',
					value: JSON.stringify(data)
				});
			});

			setTimeout(() => {

				let base = JSON.parse(localStorage.getItem('sourceData')).data;
				let arr = [];
				base.forEach(item => arr.push(0));
			
				dispatch({
					type: 'EDITOR_DATA',
					value: JSON.parse(localStorage.getItem('sourceData'))
				});
				dispatch({
					type: 'EDITOR_DATA_SAVEARR',
					value: arr
				});

				middleware({ type: 'CLEAR_SOURCE_DATA' });
		
			}, 1000);

		}

	},[]);

	return (
		<Editor 
			style={{ 
				marginTop: state[10].label[8].label[0].label === true ? '0vh' : '-100vh'  
			}}
		>
			<Header>
				<Title>
					<span style={{ color: '#ffc000'}}>P</span>RODUCTS VIEWER
				</Title>
				<FontAwesomeIcon 
					style={{
						display: 'block',
						position: 'relative',
						color: 'white',
						cursor: 'pointer'
					}}
        	size="md" 
        	icon={faTimes}
					onClick={() => {
						dispatch({
							type: 'CONTROL_EDITOR',
							value: false
						});
					}}
      	/>
			</Header>
			<Workspace>
				<SideMenu>
					<SideMenuButton>
						<FontAwesomeIcon 
							style={{
								display: 'block',
								position: 'absolute',
								color: 'white',
								top: '50%',
								left: 0,
								marginLeft: -1,
								marginTop: -14,
								transition: 'all 300ms'
							}}
        			size="2x" 
        			icon={faPenSquare}
      			/>
						посмотреть все товары
					</SideMenuButton>
					<SideMenuButton>
						<FontAwesomeIcon 
							style={{
								display: 'block',
								position: 'absolute',
								color: 'white',
								top: '50%',
								left: 0,
								marginLeft: -1,
								marginTop: -14,
								transition: 'all 300ms'
							}}
        			size="2x" 
        			icon={faPenSquare}
      			/>
						товары текущего мониторинга
					</SideMenuButton>
					<SideMenuButton>
						<FontAwesomeIcon 
							style={{
								display: 'block',
								position: 'absolute',
								color: 'white',
								top: '50%',
								left: 0,
								marginLeft: -1,
								marginTop: -14,
								transition: 'all 300ms'
							}}
        			size="2x" 
        			icon={faPenSquare}
      			/>
						посмотреть все товары
					</SideMenuButton>

					<SideMenuDivider/>

					<SideMenuButton
						onClick={() => {
							dispatch({
								type: 'EDITOR_FORMAT',
								value: 'table'
							});
						}}
					>
						<FontAwesomeIcon 
							style={{
								display: 'block',
								position: 'absolute',
								color: 'white',
								top: '50%',
								left: 0,
								marginLeft: -1,
								marginTop: -14,
								transition: 'all 300ms'
							}}
        			size="2x" 
        			icon={faPenSquare}
      			/>
						данные по строкам
					</SideMenuButton>

					<SideMenuButton
						onClick={() => {
							dispatch({
								type: 'EDITOR_FORMAT',
								value: 'json'
							});
						}}
					>
						<FontAwesomeIcon 
							style={{
								display: 'block',
								position: 'absolute',
								color: 'white',
								top: '50%',
								left: 0,
								marginLeft: -1,
								marginTop: -14,
								transition: 'all 300ms'
							}}
        			size="2x" 
        			icon={faPenSquare}
      			/>
						исходный формат json
					</SideMenuButton>

					<SideMenuButton
						onClick={() => {
							dispatch({
								type: 'EDITOR_FORMAT',
								value: 'json'
							});
						}}
					>
						<FontAwesomeIcon 
							style={{
								display: 'block',
								position: 'absolute',
								color: 'white',
								top: '50%',
								left: 0,
								marginLeft: -1,
								marginTop: -14,
								transition: 'all 300ms'
							}}
        			size="2x" 
        			icon={faPenSquare}
      			/>
						сохранить и выйти
					</SideMenuButton>

				</SideMenu>
				<CodeHere>

					{ state[10].label[8].label[2].label === 'table' ? (

					<section 
						contentEditable="false" 
						autoCorrect="off"
						style={{
							display: "block",
							position: "relative",
							width: "110%",
							height: "100%",
							outline: "none",
							border: "none",
							boxSizing: "border-box",
							color: "white",
							overflowY: "scroll",
							fontSize: "13px",
							padding: "12px",
							paddingLeft: "0px",
							paddingBottom: '14px',
							paddingTop: '0px'
						}}
					>
						<CodeHereLine style={{ paddingLeft: 0 }}>
							<span style={{ marginRight: 10, color: 'rgb(255, 192, 0)', width: '10%', display: 'block', textAlign: 'center' }}>номер</span>
							<span style={{ marginRight: 10, width: '10%', display: 'block' }}>название</span>
							<span style={{ marginRight: 10, width: '10%', display: 'block' }}>артикул</span>
							<span style={{ marginRight: 10, width: '30%', display: 'block' }}>uuid товара мониторинга</span>
							<span style={{ width: '30%', display: 'block' }}>uuid мониторинга</span>
						</CodeHereLine>

						{ state[10].label[8].label[1].label.data !== undefined ? state[10].label[8].label[1].label.data.map((item, index) => (

							<CodeHereLine style={{ paddingLeft: 0 }}>
								<SaveIcon>
									<FontAwesomeIcon 
										style={{
											display: 'block',
											position: 'absolute',
											color: 'white',
											top: '50%',
											left: 0,
											marginLeft: 5,
											marginTop: -9,
											transition: 'all 300ms'
										}}
        						size="lg" 
        						icon={faSave}
      						/>
								</SaveIcon>
								<span style={{ marginRight: 10, color: 'rgb(255, 192, 0)', width: '10%', display: 'block', textAlign: 'center' }}>{ index + 1 }</span>
								<span style={{ marginRight: 10, width: '10%', display: 'block' }}>{`${item.Name}`}</span>
								<span style={{ marginRight: 10, width: '10%', display: 'block' }}>{`${item.SKU}`}</span>
								<span style={{ marginRight: 10, width: '30%', display: 'block' }}>{`${item.UUID}`}</span>
								<span style={{ width: '30%', display: 'block' }}>{`${item.MonitoringUUID}`}</span>
							</CodeHereLine>

						)) : null}
					
					</section>

					) : (

						<section 
							contentEditable="false" 
							autoCorrect="off"
							style={{
								display: "block",
								position: "relative",
								width: "110%",
								height: "100%",
								outline: "none",
								border: "none",
								boxSizing: "border-box",
								color: "white",
								overflowY: "scroll",
								fontSize: "13px",
								padding: "20px",
								paddingLeft: "23px",
								paddingBottom: "24px",
								paddingRight: "130px",
								overflowX: "hidden",
								lineHeight: "24px"
							}}
						>

							{ JSON.stringify(state[10].label[8].label[1].label, null, 2) }

						</section>

					)}

				</CodeHere>
			</Workspace>
		</Editor>
	);
}