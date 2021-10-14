/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useContext, useEffect, useRef, useState  } from "react";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenSquare, faTrash, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import data from '../../data/clients';
import { ReduxHooksContext, ModalContext } from "../../Context";
import Modal from '../../services/modal.service';
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

export default function TasksList() {

	const { state, dispatch } = useContext(ReduxHooksContext);
	const [ showModal, setShowModal ] = useContext(ModalContext);
	const [ modalData, setModalData ] = useState({ title: '', text: '' });
	const stateRef = useRef();
	const history = useHistory();

	let checkArr = [];
	let size = state[8].label[0].label;
	let count = 0;
	let pages = 0;

	useEffect(() => {

		const getList = fetchDispatcher({ fetchType: 'GET_TASKS' });
		getList.then(data => {

			if (data.data !== undefined) { 

				console.log(data.data);

				middleware({
					type: 'TASKS_DATA',
					value: JSON.stringify(data.data)
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

			if ( localStorage.getItem('tasksData') !== null ) {

				dispatch({
					type: 'TASKS_DATA_LIST',
					value: JSON.parse(localStorage.getItem('tasksData'))
				});

				middleware({ type: 'CLEAR_TASKS_DATA' });

			}

		}, 1000);

	},[]);

	return (
		<MonitoringListWrapper>

			{ showModal === true ? <Modal props={modalData}/> : null }

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
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px', width: 'calc(40% - 70px)' }}>адрес парсера</ItemCell>
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px', width: '20%' }}>статус задачи</ItemCell>
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px', width: '20%' }}>посмотреть задачу</ItemCell>
				</MonitoringItem>

			</ScrollBarTop>

			<ScrollBar>

				{ !!state[19].label ? state[19].label.map((item, index) => {

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
								<ItemCell style={{ width: '20%', color: '#ffc000', overflow: 'hidden' }}>{ item.MonitoringUUID }</ItemCell>
								<ItemCell
									style={{
										lineHeight: '38px',
										width: 'calc(40% - 70px)',
										textAlign: 'left',
										paddingLeft: 12,
										cursor: 'pointer',
										boxSizing: 'border-box'
									}}
								>

									{ `${item.AParserHost.split(':')[0]}, порт ${item.AParserHost.split(':')[1]}` }

								</ItemCell>
								<ItemCell style={{ fontWeight: 300, lineHeight: '38px', width: '20%' }}>

									{ item.Status }

								</ItemCell>
								<ItemCell 
									style={{ 
										fontWeight: 300, 
										lineHeight: '38px',
										width: '20%',
										cursor: 'pointer'
									}}
									onClick={() => {

										setModalData({ 
											title: 'список отчетов по мониторингу', 
											modalType: 'showReportService',
											background: '#6c757d',
											monitoring: state[0].label 
										});
										setShowModal(true);

									}}
								>

									{ `ПОСМОТРЕТЬ` }

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