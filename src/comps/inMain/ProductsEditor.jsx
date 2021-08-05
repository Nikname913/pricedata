/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useContext, useRef } from "react";
import { ReduxHooksContext } from "../../Context";
import fetchDispatcher from "../../services/fetch-query.service";
import middleware from "../../redux-hooks/middleware";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPenSquare, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
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
	const dataLine = useRef();

	return (
		<Editor 
			style={{ 
				marginTop: state[10].label[8].label[0].label === true ? '0vh' : '-100vh'  
			}}
		>
			<Header>
				<Title>
					<span style={{ color: '#ffc000'}}>
					{ state[10].label[8].label[4].label === 'products' ? 'P' : 'S' }</span>
					{ state[10].label[8].label[4].label === 'products' ? `RODUCTS VIEWER` : `OURCES VIEWER` }
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
					<SideMenuButton style={{ fontWeight: '500' }}>
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
						style={{ fontWeight: 
							state[10].label[8].label[2].label === 'table' 
							? '500' : '' 
						}}
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
						style={{ fontWeight: 
							state[10].label[8].label[2].label !== 'table' 
							? '500' : '' 
						}}
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

						{ state[10].label[8].label[4].label === 'products' ? <React.Fragment>

						<CodeHereLine style={{ paddingLeft: 0, paddingRight: '10%' }}>
							<span style={{ marginRight: 0, color: 'rgb(255, 192, 0)', width: '12.5%', display: 'block', textAlign: 'center' }}>номер</span>
							<span style={{ marginRight: 0, width: '12.5%', display: 'block', textAlign: 'center' }}>название</span>
							<span style={{ marginRight: 0, width: '12.5%', display: 'block', textAlign: 'center' }}>артикул</span>
							<span style={{ marginRight: 0, width: '12.5%', display: 'block', textAlign: 'center' }}>бренд</span>
							<span style={{ marginRight: 0, width: '12.5%', display: 'block', textAlign: 'center' }}>поисковые запросы</span>
							<span style={{ marginRight: 0, width: '12.5%', display: 'block', textAlign: 'center' }}>плюс-слова</span>
							<span style={{ marginRight: 0, width: '12.5%', display: 'block', textAlign: 'center' }}>минус-слова</span>
							<span style={{ marginRight: 0, width: '12.5%', display: 'block', textAlign: 'center' }}>regexp</span>

							<span style={{ marginRight: 0, width: '12.5%', display: 'none', textAlign: 'center' }}>комментарий</span>
							<span style={{ marginRight: 0, width: '12.5%', display: 'none', textAlign: 'center' }}>категория</span>
							<span style={{ marginRight: 0, width: '12.5%', display: 'none', textAlign: 'center' }}>штрихкод</span>
						</CodeHereLine>

						{ state[10].label[8].label[1].label.data !== undefined ? state[10].label[8].label[1].label.data.map((item, index) => (

							<CodeHereLine style={{ paddingLeft: 0, paddingRight: '10%' }}>
								<SaveIcon>
									<FontAwesomeIcon 
										style={{
											display: 'block',
											position: 'absolute',
											color: 'white',
											top: '50%',
											left: 0,
											marginLeft: 8,
											marginTop: -9,
											transition: 'all 300ms'
										}}
        						size="lg" 
        						icon={faTrash}
										onClick={() => {

											const query = fetchDispatcher({
												fetchType: 'REMOVE_PRODUCT',
												value: item.UUID
											});

											setTimeout(() => {

												const getProductsFromMonitoring = fetchDispatcher({
													fetchType: 'GET_PRODUCTS_MONITORING',
													value: item.MonitoringUUID
												});
					
												getProductsFromMonitoring.then(data => {
													middleware({
														type: 'PRODUCTS_DATA',
														value: JSON.stringify(data)
													});
												});

												setTimeout(() => {
				
													let baseProduct = JSON.parse(localStorage.getItem('productData')).data;
													let arrProduct = [];
													baseProduct.forEach(item => arrProduct.push(0));
								
													dispatch({
														type: 'EDITOR_DATA',
														value: JSON.parse(localStorage.getItem('productData'))
													});
													dispatch({
														type: 'EDITOR_DATA_SAVEARR',
														value: arrProduct
													});
					
													middleware({ type: 'CLEAR_PRODUCTS_DATA' });
													middleware({ type: 'CLEAR_SOURCE_DATA' });
					
												}, 800);

											}, 400);

										}}
      						/>
								</SaveIcon>
								<span style={{ 
									marginRight: 0, 
									color: 'rgb(255, 192, 0)', 
									width: '12.5%', 
									display: 'block', 
									textAlign: 'center',
									borderRight: '1px solid #2d2d2d' }}
								>
									
									{ index + 1 }
								
								</span>
								
								<span style={{ marginRight: 0, width: '12.5%', display: 'block', borderRight: '1px solid #2d2d2d', textAlign: 'center' }}>{`${item.Name}`}</span>
								<span style={{ marginRight: 0, width: '12.5%', display: 'block', borderRight: '1px solid #2d2d2d', textAlign: 'center' }}>{`${item.SKU}`}</span>
								<span style={{ marginRight: 0, width: '12.5%', display: 'block', borderRight: '1px solid #2d2d2d', textAlign: 'center' }}>{
									!!item.Brand ? `${item.Brand}` : 'no data'
								}</span>
								<span style={{ marginRight: 0, width: '12.5%', display: 'block', borderRight: '1px solid #2d2d2d', textAlign: 'center' }}>{
									!!item.SearchRequest ? `${item.SearchRequest}` : 'no data'
								}</span>
								<span style={{ 
									marginRight: 0, 
									width: '12.5%', 
									display: 'block', 
									borderRight: '1px solid #2d2d2d', 
									textAlign: 'center',
									boxSizing: 'border-box',
									paddingLeft: 8,
									paddingRight: 8 }}>{
										item.RequiredWords?.length > 0 ? item.RequiredWords.join(', ') : 'no data'
								}</span>
								<span style={{ marginRight: 0, width: '12.5%', display: 'block', borderRight: '1px solid #2d2d2d', textAlign: 'center' }}>{
									item.ExcludingWords?.length > 0 ? item.ExcludingWords.join(', ') : 'no data'	
								}</span>
								<span style={{ marginRight: 0, width: '12.5%', display: 'block', textAlign: 'center' }}>no data</span>
								
								<span style={{ marginRight: 0, width: '30%', display: 'none' }}>{`${item?.Note}`}</span>
								<span style={{ marginRight: 0, width: '30%', display: 'none' }}>{`${item?.Category}`}</span>
								<span style={{ width: '30%', display: 'none' }}>{`${item?.Barcode}`}</span>
								<span style={{ width: '30%', display: 'none' }}>{`${item?.UUID}`}</span>
							</CodeHereLine>

						)) : null }

						</React.Fragment> : <React.Fragment>

						<CodeHereLine style={{ paddingLeft: 0, paddingRight: '10%' }}>
							<span style={{ marginRight: 0, color: 'rgb(255, 192, 0)', width: '12.5%', display: 'block', textAlign: 'center' }}>номер</span>
							<span style={{ marginRight: 0, width: '12.5%', display: 'block', textAlign: 'center' }}>название</span>
							<span style={{ marginRight: 0, width: '12.5%', display: 'block', textAlign: 'center' }}>наименование парсера</span>
							<span style={{ marginRight: 0, width: '12.5%', display: 'block', textAlign: 'center' }}>тип парсера</span>
							<span style={{ marginRight: 0, width: '12.5%', display: 'block', textAlign: 'center' }}>uuid источника</span>
							<span style={{ marginRight: 0, width: '12.5%', display: 'block', textAlign: 'center' }}>--</span>
							<span style={{ marginRight: 0, width: '12.5%', display: 'block', textAlign: 'center' }}>--</span>
							<span style={{ marginRight: 0, width: '12.5%', display: 'block', textAlign: 'center' }}>--</span>
						</CodeHereLine>

						{ state[10].label[8].label[1].label.data !== undefined ? state[10].label[8].label[1].label.data.map((item, index) => (

							<CodeHereLine style={{ paddingLeft: 0, paddingRight: '10%' }}>
								<SaveIcon>
									<FontAwesomeIcon 
										style={{
											display: 'block',
											position: 'absolute',
											color: 'white',
											top: '50%',
											left: 0,
											marginLeft: 8,
											marginTop: -9,
											transition: 'all 300ms'
										}}
        						size="lg" 
        						icon={faTrash}
      						/>
								</SaveIcon>
								<span style={{ 
									marginRight: 0, 
									color: 'rgb(255, 192, 0)', 
									width: '12.5%', 
									display: 'block', 
									textAlign: 'center',
									borderRight: '1px solid #2d2d2d' }}
								>
									
									{ index + 1 }
								
								</span>
								
								<span style={{ marginRight: 0, width: '12.5%', display: 'block', borderRight: '1px solid #2d2d2d', textAlign: 'center' }}>{`${item.Name}`}</span>
								<span style={{ marginRight: 0, width: '12.5%', display: 'block', borderRight: '1px solid #2d2d2d', textAlign: 'center' }}>{`${item.Parser}`}</span>
								<span style={{ marginRight: 0, width: '12.5%', display: 'block', borderRight: '1px solid #2d2d2d', textAlign: 'center' }}>{
									!!item.PersingType ? `${item.PersingType}` : 'no data'
								}</span>
								<span 
									style={{ 
										marginRight: 0, 
										width: '12.5%', 
										display: 'block', 
										borderRight: '1px solid #2d2d2d', 
										textAlign: 'center',
										boxSizing: 'border-box',
										paddingLeft: 8,
										paddingRight: 8,
										overflow: 'hidden'
									}}
								>
									
									{`${item.UUID}`}
								
								</span>
								<span style={{ marginRight: 0, width: '12.5%', display: 'block', borderRight: '1px solid #2d2d2d', textAlign: 'center' }}>--</span>
								<span style={{ marginRight: 0, width: '12.5%', display: 'block', borderRight: '1px solid #2d2d2d', textAlign: 'center' }}>--</span>
								<span style={{ marginRight: 0, width: '12.5%', display: 'block', textAlign: 'center' }}>--</span>
								
								<span style={{ marginRight: 10, width: '30%', display: 'none' }}>{`${item.UUID}`}</span>
								<span style={{ width: '30%', display: 'none' }}>{`${item.MonitoringUUID}`}</span>
							</CodeHereLine>

						)) : null }

						</React.Fragment> }
					
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