/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEye, faPenSquare, faTrash, faAngleLeft, faAngleRight, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import data from '../../data/clients';
import { ReduxHooksContext } from "../../Context";
import fetchDispatcher from "../../services/fetch-query.service";
import middleware from "../../redux-hooks/middleware";
import bodyTags from '../../templates/body-styled-elements';

let returnedData = data();

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

		const getList = fetchDispatcher({ fetchType: 'GET' });
		getList.then(data => {
			let clearData = [];
			if (data.data !== undefined) {

				data.data.forEach(item => {
					let deleted = new Date(item.DeletedAt).getFullYear();
					if (deleted === 1970) {
						clearData.push(item);
					}
				});

				stateRef.current = clearData;
				console.log(clearData);

				middleware({
					type: 'MONITORINGS_DATA',
					value: JSON.stringify(clearData)
				});

			} else {

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
		});

		getList.catch(data => {
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

		setTimeout(() => {

			if (localStorage.getItem('monitoringData') !== null) {

				dispatch({
					type: 'CREATE_LIST',
					value: JSON.parse(localStorage.getItem('monitoringData'))
				});

				middleware({ type: 'CLEAR_MONITORINGS_DATA' });

				count = state[6].label.length;
				count % state[8].label[0].label === 0
					? pages = count / state[8].label[0].label
					: pages = ~~(count / state[8].label[0].label) + 1;

				for (let i = 0; i < pages; i++) {

					checkArr.push(state[6].label.splice(0, size));
				
				}

				dispatch({ type: 'PAGINATION_LIST', value: count });
				dispatch({ type: 'PAGINATION_PAGES', value: pages });
				dispatch({ type: 'PAGINATION_PAGES_PACK', value: checkArr });

			}

		}, 1000);

	},[]);

	return (
		<MonitoringListWrapper>
			<ScrollBarTop>

				<MonitoringItem>
					<ItemCellNameHead style={{
						paddingLeft: '15px',
						width: 70,
						fontWeight: 300,
						lineHeight: '38px'
					}}>

						{false ? `действия` : ''}

					</ItemCellNameHead>
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px', width: '10%' }}>номер</ItemCell>
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px', width: 'calc(40% - 70px)' }}>название мониторинга</ItemCell>
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px', width: '20%' }}>клиент</ItemCell>
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px', width: '15%' }}>начало</ItemCell>
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px', width: '15%' }}>окончание</ItemCell>
				</MonitoringItem>

			</ScrollBarTop>

			<ScrollBar>

				{state[8].label[4].label[state[8].label[3].label - 1] !== undefined
					? state[8].label[4].label[state[8].label[3].label - 1].map((item, index) => {

						let clientName = '';
						returnedData.forEach(line => {

							if (line.value === item.ClientID.toString()) {
								clientName = line.label;
							}

						});

						return (
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
								<ItemCellName style={{ lineHeight: '38px', width: 70 }}>

									<ItemCellView onClick={() => history.push(`/card/view/${item.UUID}`)}>

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
										onClick={() => history.push(`/card/correct/${item.UUID}`)}
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
										onClick={async () => {
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
								</ItemCellName>
								<ItemCell style={{ width: '10%', color: '#ffc000' }}>{item.ID}</ItemCell>
								<ItemCell
									style={{
										lineHeight: '38px',
										width: 'calc(40% - 70px)',
										textAlign: 'left',
										paddingLeft: 12,
										cursor: 'pointer',
										boxSizing: 'border-box'
									}}
									onClick={(e) => {
										if (e.target.tagName === 'SPAN') {
											history.push(`/card/view/${item.UUID}`);
										}
									}}
								>

									{item.Name}

								</ItemCell>
								<ItemCell style={{ width: '20%', overflow: 'hidden' }}>{clientName}</ItemCell>
								<ItemCell style={{ width: '15%' }}>{` 
								 
								 ${item.ActiveFrom.split(' 00')[0].split('-')[2]}-${item.ActiveFrom.split(' 00')[0].split('-')[1]}-${item.ActiveFrom.split(' 00')[0].split('-')[0]}
							
							`}</ItemCell>
								<ItemCell style={{ width: '15%' }}>{`
								
								${item.ActiveTo.split(' 00')[0].split('-')[2]}-${item.ActiveTo.split(' 00')[0].split('-')[1]}-${item.ActiveTo.split(' 00')[0].split('-')[0]}
							
							`}</ItemCell>
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
						if (state[8].label[3].label > 1) {
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
					{state[8].label[3].label}
				</PaginationButton>
				<PaginationButton
					onClick={() => {
						if (state[8].label[2].label !== 0) {
							if (state[8].label[3].label < state[8].label[2].label) {
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
				<PaginationButton style={{ border: 'none' }}>

					{state[8].label[2].label}

				</PaginationButton>
			</Pagination>
			<DownMenu>
				<DownMenuButton />
				<DownMenuButton />
				<DownMenuButton />
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