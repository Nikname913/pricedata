/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useContext, useEffect, useRef  } from "react";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenSquare, faTrash, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import data from '../../data/clients';
import AsyncSelect from 'react-select/async';
import { ReduxHooksContext } from "../../Context";
import fetchDispatcher from "../../services/fetch-query.service";
import middleware from "../../redux-hooks/middleware";
import bodyTags from '../../templates/body-styled-elements';
import monitorings from '../../data/monitorings';
import selectStyles from '../../templates/css-templates/clients-select.js';

let returnedData = data();
let returnedMonitorings = monitorings();

const MonitoringListWrapper = bodyTags.MonitoringListWrapper;
const ScrollBar = bodyTags.MonitoringListWrapperScrollBar;
const ScrollBarTop = bodyTags.MonitoringListWrapperScrollBarTop;
const MonitoringItem = bodyTags.MonitoringListWrapperItem;
const MonitoringSearch = bodyTags.MonitoringListWrapperItemSearchBlock;
const ClearSearch = bodyTags.MonitoringListWrapperItemSearchBlockClear;
const MonitoringSearchIcons = bodyTags.MonitoringListWrapperItemSearchBlockIcons;
const SearchIcon = bodyTags.MonitoringListWrapperItemSearchBlockIconsItem;
const ItemCell = bodyTags.MonitoringListWrapperItemCell;
const ItemCellName = bodyTags.MonitoringListWrapperItemCellName;
const ItemCellNameHead = bodyTags.MonitoringListWrapperItemCellNameHead;
const ItemCellView = bodyTags.MonitoringListWrapperItemCellView;
const ItemCellCorrect = bodyTags.MonitoringListWrapperItemCellCorrect;
const ItemCellDelete = bodyTags.MonitoringListWrapperItemCellDelete;
const SorryBlock = bodyTags.MonitoringListSorryBlock;
const SorryText = bodyTags.MonitoringListSorryBlockTitle;

const filterData = (inputValue) => {
	return returnedMonitorings.filter(item => 
		item.value.toString().toLowerCase().includes(inputValue.toLowerCase())
	);
}

const loadOptions = (inputValue, cb) => {
  setTimeout(() => {
    cb(filterData(inputValue));
  }, 1000);
}

export default function ReportsList() {

	const { state, dispatch } = useContext(ReduxHooksContext);
	const stateRef = useRef();
	const history = useHistory();

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

			<ScrollBarTop style={{ overflow: 'visible' }}>
				<MonitoringItem 
					style={{ 
						height: 'auto', 
						borderBottom: '1px solid rgba(255, 192, 0, 0.5)',
						paddingLeft: '12px',
						paddingTop: '12px',
						paddingBottom: '3px',
						overflow: 'visible'
					}}
				>

					<MonitoringSearch>
						<AsyncSelect
							cacheOptions
							defaultOptions
							placeholder={"введите номер мониторинга"}
							loadOptions={loadOptions}
							theme={theme => ({
								...theme,
								borderRadius: 4,
								colors: {
									...theme.colors,
									primary: '#1F99B4',
									primary25: '#ffc000',
									primary50: 'rgb(236, 236, 236)'
								}
							})}
							styles={selectStyles}
							onWheel={e => e.stopPropagation()}
							onChange={inputValue => {

								if ( inputValue.label !== '' ) {
									dispatch({
										type: 'SET_ONE_REPORT_IN_LIST',
										value: inputValue.label
									});
									dispatch({
										type: 'SHOW_ONE_REPORT_IN_LIST',
										value: true
									});
								}
							}}
						/>
					</MonitoringSearch>
					<ClearSearch
						onClick={() => {
							dispatch({
								type: 'SHOW_ONE_REPORT_IN_LIST',
								value: false
							});
						}}
					>
						
						очистить поиск
					
					</ClearSearch>

					<MonitoringSearchIcons>

						<SearchIcon/>
						<SearchIcon/>
						<SearchIcon/>

					</MonitoringSearchIcons>

				</MonitoringItem>
			</ScrollBarTop>
			
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
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px', width: 'calc(40% - 70px)' }}>отчет по мониторингу</ItemCell>
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px', width: '20%' }}>период отчета</ItemCell>
					<ItemCell style={{ border: 'none', fontWeight: 300, lineHeight: '38px', width: '20%' }}>скачать отчет</ItemCell>
				</MonitoringItem>

			</ScrollBarTop>

			{ state[20].label === false ? <ScrollBar>

				{ !!state[18].label ? state[18].label.map((item, index) => {

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

									{ `${ item.Language === 'ru' 
										? 'RU' : 'EN' } - ${ item.ReportType === 'daily_prices_report' 
										? 'ежедневный мониторинг цен' 
										: item.ReportType === 'daily_prices_ecommerce_report' 
										? 'ежедневный мониторинг цен eccomerce' : 'мониторинг конкурентов vita' }` }

								</ItemCell>
								<ItemCell style={{ fontWeight: 300, lineHeight: '38px', width: '20%' }}>

									{ `${ item.PeriodStart } - ${ item.PeriodEnd }` }

								</ItemCell>
								<ItemCell 
									style={{ 
										fontWeight: 300, 
										lineHeight: '38px', 
										width: '20%',
										display: 'block',
										position: 'relative',
										cursor: 'pointer'
									}}
								>

									<a style={{
											display: 'block',
											position: 'absolute',
											width: '100%',
											height: '100%',
											top: 0,
											left: 0,
											opacity: 0,
											zIndex: 4
										}}
										target="_blank"
										href={`${process.env.REACT_APP_API_URL}/api/report-tasks/${item.UUID}/download`}
									>
									
										СКАЧАТЬ ОТЧЕТ

									</a>{ `СКАЧАТЬ ОТЧЕТ` }

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

			</ScrollBar> : <ScrollBar>

				{ !!state[18].label ? state[18].label.map((item, index) => {

						let monitoring = state[21].label;
						if ( monitoring === item.MonitoringUUID ) { 

						return (
							<MonitoringItem 
								key={index}
								style={{
									// eslint-disable-next-line eqeqeq
									// display: item.MonitoringUUID == monitoring ? 'flex' : 'none'
								}}
							>
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

									{ `${ item.Language === 'ru' 
										? 'RU' : 'EN' } - ${ item.ReportType === 'daily_prices_report' 
										? 'ежедневный мониторинг цен' 
										: item.ReportType === 'daily_prices_ecommerce_report' 
										? 'ежедневный мониторинг цен eccomerce' : 'мониторинг конкурентов vita' }` }

								</ItemCell>
								<ItemCell style={{ fontWeight: 300, lineHeight: '38px', width: '20%' }}>

									{ `${ item.PeriodStart } - ${ item.PeriodEnd }` }

								</ItemCell>
								<ItemCell 
									style={{ 
										fontWeight: 300, 
										lineHeight: '38px', 
										width: '20%',
										display: 'block',
										position: 'relative',
										cursor: 'pointer'
									}}
								>

									<a style={{
											display: 'block',
											position: 'absolute',
											width: '100%',
											height: '100%',
											top: 0,
											left: 0,
											opacity: 0,
											zIndex: 4
										}}
										target="_blank"
										href={`${process.env.REACT_APP_API_URL}/api/report-tasks/${item.UUID}/download`}
									>
									
										СКАЧАТЬ ОТЧЕТ

									</a>{ `СКАЧАТЬ ОТЧЕТ` }

								</ItemCell>

							</MonitoringItem>
						)}

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

			</ScrollBar> }

		</MonitoringListWrapper>
	);
}