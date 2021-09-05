/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useContext, useEffect, useRef  } from "react";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenSquare, faTrash, faUserSecret } from '@fortawesome/free-solid-svg-icons';
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
const SorryBlock = bodyTags.MonitoringListSorryBlock;
const SorryText = bodyTags.MonitoringListSorryBlockTitle;

export default function ReportsList() {

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
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px', width: '20%' }}>мониторинг</ItemCell>
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px', width: 'calc(80% - 70px)' }}>отчет по мониторингу</ItemCell>
				</MonitoringItem>

			</ScrollBarTop>

			<ScrollBar>

				{ true ? [{},{},{},{},{},{}].map((item, index) => {

						return (
							<MonitoringItem key={index}>
								<ItemCellName style={{ lineHeight: '38px', width: 70 }}>

									<ItemCellView onClick={() => {}}>

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
									<ItemCellDelete onClick={async () => {}}>
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
								<ItemCell style={{ width: '20%', color: '#ffc000' }}>{ index }</ItemCell>
								<ItemCell
									style={{
										lineHeight: '38px',
										width: 'calc(80% - 70px)',
										textAlign: 'left',
										paddingLeft: 12,
										cursor: 'pointer',
										boxSizing: 'border-box'
									}}
								>

									--

								</ItemCell>
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

		</MonitoringListWrapper>
	);
}