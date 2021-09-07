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

		const getList = fetchDispatcher({ fetchType: 'GET_REPORTS' });
		getList.then(data => {

			if (data.data !== undefined) { 

				console.log(data.data);

				middleware({
					type: 'REPORTS_DATA',
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

			if (localStorage.getItem('reportsData') !== null) {

				dispatch({
					type: 'REPORT_DATA_LIST',
					value: JSON.parse(localStorage.getItem('reportsData'))
				});

				middleware({ type: 'CLEAR_REPORTS_DATA' });

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
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px', width: 'calc(50% - 70px)' }}>отчет по мониторингу</ItemCell>
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px', width: '30%' }}>период отчета</ItemCell>
				</MonitoringItem>

			</ScrollBarTop>

			<ScrollBar>

				{ true ? state[18].label.map((item, index) => {

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
										width: 'calc(50% - 70px)',
										textAlign: 'left',
										paddingLeft: 12,
										cursor: 'pointer',
										boxSizing: 'border-box'
									}}
								>

									{ `${ item.Language === 'ru' 
										? 'RU' : 'EN' } - ${ item.ReportType === 'daily_prices_report' 
										? 'ежедневный мониторинг цен' 
										: item.ReportType === 'daily_prices_ecommerce_report' 
										? 'ежедневный мониторинг цен eccomerce' : 'мониторинг конкурентов vita' }` }

								</ItemCell>
								<ItemCell style={{ fontWeight: 300, lineHeight: '38px', width: '30%' }}>

									{ `${ item.PeriodStart } - ${ item.PeriodEnd }` }

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