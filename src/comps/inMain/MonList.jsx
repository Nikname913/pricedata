/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useContext, useEffect, useRef } from "react";
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEye, faPenSquare, faTrash, faAngleLeft, faAngleRight, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { ReduxHooksContext } from "../../Context";
import fetchDispatcher from "../../services/fetch-query.service";
import bodyTags from '../../templates/body-styled-elements';

const MonitoringListWrapper = bodyTags.MonitoringListWrapper;
const ScrollBar = bodyTags.MonitoringListWrapperScrollBar;
const ScrollBarTop = bodyTags.MonitoringListWrapperScrollBarTop;
const MonitoringItem = bodyTags.MonitoringListWrapperItem;
const ItemCell = bodyTags.MonitoringListWrapperItemCell;
const ItemCellName = bodyTags.MonitoringListWrapperItemCellName;
const ItemCellNameHead = bodyTags.MonitoringListWrapperItemCellNameHead;
const ItemCellView = bodyTags.MonitoringListWrapperItemCellView;
const ItemCellCorrect = bodyTags.MonitoringListWrapperItemCellCorrect;
const ItemCellDelete = bodyTags.MonitoringListWrapperItemCellDelete;
const Buttons = bodyTags.MonitoringAddFormButtonsBlock;
const AddMonitoring = bodyTags.MonitoringAddFormSubmit;
const ExportMoniringList = bodyTags.MonitoringListExportTableToCsv;
const Pagination = bodyTags.MonitoringListWrapperScrollBarPagination;
const DownMenu = bodyTags.MonitoringListWrapperScrollBarMenu;
const PaginationButton = bodyTags.MonitoringListWrapperScrollBarPaginationButton;
const DownMenuButton = bodyTags.MonitoringListWrapperScrollBarMenuButton;
const SorryBlock = bodyTags.MonitoringListSorryBlock;
const SorryText = bodyTags.MonitoringListSorryBlockTitle;

export default function MonitoringList({ props }) {

	const { state, dispatch } = useContext(ReduxHooksContext);
	const stateRef = useRef();
	const history = useHistory();
	
	let checkArr = [];
	let size = state[8].label[0].label;
	let count = 0;
	let pages = 0;

	useEffect(() => {

		const getList = fetchDispatcher({fetchType: 'GET'});
		getList.then(data => {
			let clearData = [];
			if ( data.data !== undefined ) {
			data.data.forEach(item => {
				let deleted = new Date(item.DeletedAt).getFullYear();
				if ( deleted === 1970 ) {
					clearData.push(item);
				}
			})} else {
				let date = new Date();
				let time = `${date.getHours()} : ${date.getMinutes()}`;
				dispatch({
					type: 'LOGGER',
					value: { 
						message: `${time} : не получилось подключиться к http://api.bpgprice.loc/api/monitorings. список мониторингов не получен`, 
						time 
					}
				});
			}

			stateRef.current = clearData;
			console.log(clearData);

			dispatch({
				type: 'CREATE_LIST',
				value: clearData
			});
			
		});
		getList.catch(data => {
			localStorage.removeItem('count');
			localStorage.removeItem('sixstate');
			let date = new Date();
			let time = `${date.getHours()} : ${date.getMinutes()}`;
			dispatch({
				type: 'LOGGER',
				value: { 
					message: `${time} : не получилось подключиться к http://api.bpgprice.loc/api/monitorings. список мониторингов не получен`, 
					time 
				}
			});
		});

		if ( count !== 0 ) {
			count % state[8].label[0].label === 0 
			? pages = count / state[8].label[0].label
			: pages = ~~(count / state[8].label[0].label) + 1;
		} else {
			+localStorage.getItem('count') % state[8].label[0].label === 0 
			? pages = +localStorage.getItem('count') / state[8].label[0].label
			: pages = ~~(+localStorage.getItem('count') / state[8].label[0].label) + 1;
		}

		if ( state[6].label.length !== 0 ) {
			for ( let i = 0; i < pages; i++ ) {
				checkArr.push(state[6].label.splice(0, size));
			}
		} else {
			for ( let i = 0; i < pages; i++ ) {
				checkArr.push(JSON.parse(localStorage.getItem('sixstate')).splice(0, size));
			}
		}	

		dispatch({ type: 'PAGINATION_LIST', value: count });
		dispatch({ type: 'PAGINATION_PAGES', value: pages });
		dispatch({ type: 'PAGINATION_PAGES_PACK', value: checkArr });

	},[]);

	return(
		<MonitoringListWrapper>
			<ScrollBarTop>

				<MonitoringItem>
					<ItemCellNameHead style={{ 
						paddingLeft: '15px', 
						width: 'calc(30% + 1.5px)',
						fontWeight: 300,
						lineHeight: '38px'
					}}>
						
						{`название мониторинга`}
					
					</ItemCellNameHead>
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px' }}>номер</ItemCell>
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px' }}>клиент</ItemCell>
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px' }}>партнер</ItemCell>
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px' }}>начало</ItemCell>
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px' }}>окончание</ItemCell>
				</MonitoringItem>

			</ScrollBarTop>

			<ScrollBar>

				{ state[6].label.map((item, index) => {

					count++;

					if ( count === state[6].label.length ) {
						localStorage.setItem('count', count);
						localStorage.setItem('sixstate', JSON.stringify(state[6].label));
					}
					
				}) }
				
				{ state[8].label[4].label[state[8].label[3].label - 1] !== undefined 
					? state[8].label[4].label[state[8].label[3].label - 1].map((item, index) => {		

					return(
						<MonitoringItem
							onClick={() => {
								dispatch({ type: 'CORRECT_NAME', value: item.Name });
								dispatch({ type: 'CORRECT_CID', value: item.ClientID });
								dispatch({ type: 'CORRECT_PID', value: item.PartnerID });
								dispatch({ type: 'CORRECT_SDATE', value: item.ActiveFrom.split(' 00')[0] });
								dispatch({ type: 'CORRECT_EDATE', value: item.ActiveTo.split(' 00')[0] });
								dispatch({ type: 'CORRECT_UUID', value: item.UUID });
							}} 
							key={item.UUID}
						>
							<ItemCellName
								style={{ lineHeight: '38px' }}
								onClick={(e) => {
									if ( e.target.tagName === 'SPAN' ) {
										history.push(`/card/view/${item.UUID}`);
									}
								}}
							>
								<ItemCellView
									onClick={() => {
										history.push(`/card/view/${item.UUID}`)
									}}
								>
									<FontAwesomeIcon 
										style={{
											display: state[10].label[0].label === false ? '' : 'none',
											color: 'black',
											marginLeft: 4.5,
											marginBottom: 7
										}}
              			size="sm" 
              			icon={faEye}
            			/>
								</ItemCellView>
								<ItemCellCorrect 
									style={{ display: 'none' }}
									onClick={() => {
										history.push(`/card/correct/${item.UUID}`)
									}}
								>
									<FontAwesomeIcon 
										style={{
											color: 'black',
											marginLeft: 6,
											marginBottom: 7
										}}
              			size="sm" 
              			icon={faPenSquare}
            			/>
								</ItemCellCorrect>
								<ItemCellDelete
									onClick={ async () => {
										setTimeout(() => history.push(`/remove?name=${item.Name}&uuid=${item.UUID}`), 400);
									}}
								>
									<FontAwesomeIcon 
										style={{
											display: state[10].label[0].label === false ? '' : 'none',
											color: 'black',
											marginLeft: 6,
											marginBottom: 7
										}}
              			size="sm" 
              			icon={faTrash}
            			/>
								</ItemCellDelete>
								{ item.Name }
							</ItemCellName>
							<ItemCell>{ item.ID }</ItemCell>
							<ItemCell>{ item.ClientID }</ItemCell>
							<ItemCell>{ item.PartnerID }</ItemCell>
							<ItemCell>{ item.ActiveFrom.split(' 00')[0] }</ItemCell>
							<ItemCell>{ item.ActiveTo.split(' 00')[0] }</ItemCell>
						</MonitoringItem>
					);

				}) : (

					<SorryBlock>
					<FontAwesomeIcon 
						style={{
							color: 'white',
							marginLeft: 6,
							marginBottom: 8
						}}
          	size="8x" 
            icon={faUserSecret}
          />
					<SorryText>привет, это Сервер. кажется, у тебя тут ничего нет. Возможно у меня нечего тебе дать, либо ты как-то не так просишь, проверь запросы</SorryText>
					</SorryBlock>

				)}

			</ScrollBar>

			<Pagination>
				<PaginationButton>1</PaginationButton>
				<PaginationButton
					onClick={() => {
						if ( state[8].label[3].label > 1 ) {
							dispatch({ 
								type: 'PAGE_INDEX', 
								value: state[8].label[3].label - 1 
							});
						}
					}}
				>
					<FontAwesomeIcon 
						style={{
							color: '#fcfcfc',
							marginRight: 2,
							marginTop: 5
						}}
            size="2x" 
            icon={faAngleLeft}
					/>
				</PaginationButton>
				<PaginationButton>
					{ state[8].label[3].label }
				</PaginationButton>
				<PaginationButton
					onClick={() => {
						if ( state[8].label[2].label !== 0 ) {
							if ( state[8].label[3].label < state[8].label[2].label ) {
								dispatch({ 
									type: 'PAGE_INDEX', 
									value: state[8].label[3].label + 1 
								});
							}
						}
					}}
				>
				<FontAwesomeIcon 
						style={{
							color: '#fcfcfc',
							marginLeft: 2,
							marginTop: 5
						}}
            size="2x" 
            icon={faAngleRight}
					/>
				</PaginationButton>
				<PaginationButton style={{border: 'none'}}>
					
					{ state[8].label[2].label }
				
				</PaginationButton>
			</Pagination>
			<DownMenu>
				<DownMenuButton/>
				<DownMenuButton/>
				<DownMenuButton/>
			</DownMenu>
			
			<Buttons style={{ marginTop: 22 }}>
				<ExportMoniringList>
					<FontAwesomeIcon 
						style={{
							display: 'block',
							position: 'absolute',
							color: 'white',
							marginLeft: 5,
							marginTop: 7,
							cursor: 'pointer'
						}}
            size="2x" 
            icon={faDownload}
          />
					export csv
				</ExportMoniringList>
				<Link to={"/add"} style={{ textDecoration: 'none' }}>	
					<AddMonitoring>создать мониторинг</AddMonitoring>
				</Link>
			</Buttons>
				
		</MonitoringListWrapper>
	);
}