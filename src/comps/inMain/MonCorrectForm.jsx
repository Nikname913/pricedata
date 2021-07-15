import React, { useContext, useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { ReduxHooksContext, ModalContext } from "../../Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import fetchDispatcher from "../../services/fetch-query.service";
import Modal from '../../services/modal.service';
import CircularProgress from '@material-ui/core/CircularProgress';
import { regions } from '../../data/regions';
import selectStyles from '../../templates/css-templates/short-regions-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bodyTags from '../../templates/body-styled-elements';

const MonitoringCorrForm = bodyTags.MonitoringCorrectForm;
const InputWrapper = bodyTags.InputWrapper;
const InputLabel = bodyTags.InputWrapperDiscription;
const Buttons = bodyTags.MonitoringAddFormButtonsBlock;
const Headline = bodyTags.MonitoringCardTitle;
const Submit = bodyTags.MonitoringAddFormSubmit;
const Params = bodyTags.MonitoringCardParams;
const ParamsLine = bodyTags.MonitoringCardParamsLine;
const ParamsLineLabel = bodyTags.MonitoringCardParamsLineLabel;
const ParamsLineValue = bodyTags.MonitoringCardParamsLineValue;
const ParamsLineInput = bodyTags.MonitoringCardParamsLineInput;
const ButtonBack = bodyTags.MonitoringAddFormBackHistory;
const Input = bodyTags.MonitoringCorrFormInput;
const InputWrapperVertical = bodyTags.InputWrapperVertical;

const filterData = (inputValue) => {
	return regions.filter(item => 
		item.label.toLowerCase().includes(inputValue.toLowerCase())
	);
}

const loadOptions = (inputValue, cb) => {
  setTimeout(() => {
    cb(filterData(inputValue));
  }, 1000);
}

export default function MonitoringCorrectForm() {

	const { state, dispatch } = useContext(ReduxHooksContext);
	let { id } = useParams();
	const history = useHistory();
	const [ showParams, setShowParams ] = useState(false);
	const [ cardMargin, setCardMargin ] = useState(0);
	const startDateStr = `${state[3].label.split('-')[1]}-${state[3].label.split('-')[2]}-${state[3].label.split('-')[0]}`;
	const endDateStr = `${state[4].label.split('-')[1]}-${state[4].label.split('-')[2]}-${state[4].label.split('-')[0]}`;

	const [ edit1, setEdit1 ] = useState(false);
	const [ edit2, setEdit2 ] = useState(false);
	const [ edit3, setEdit3 ] = useState(false);
	const [ edit4, setEdit4 ] = useState(false);
	const [ edit5, setEdit5 ] = useState(false);
	const [ edit6, setEdit6 ] = useState(false);

	const [ currencyFrom, setCurrencyFrom ] = useState(
		state[9].label !== null ? state[9].label.CurrencyIn : 'RUB'
	);
	const [ currencyTo, setCurrencyTo ] = useState(
		state[9].label !== null ? state[9].label.CurrencyOut : 'RUB'
	);
	const [ validationType, setValidationType ] = useState(
		state[9].label === null ? 'STRICT' :
		state[9].label.ValidationType !== undefined ? state[9].label.ValidationType.toUpperCase() : 'STRICT'
	);
	const [ important, setImportant ] = useState(
		state[9].label !== null ? state[9].label.Priority : 4
	);
	const [ searchRegions, setSearchRegions ] = useState(
		state[9].label !== null ? state[9].label.SearchRegions : []
	);
	const [ screenshots, ] = useState(false);

	const [ rules, setRules ] = useState({
		isValidating: false,
		isRedirect: false
	});

	const [ showModal, setShowModal ] = useContext(ModalContext);
	const [ modalData, setModalData ] = useState({
		title: '',
		text: ''
	});

	const bundleData = () => {
		let data = {
			CurrencyIn: currencyFrom,
			CurrencyOut: currencyTo,
			ScreenShot: "nothing",
			ValidationType: "strict",
			SearchRegions: searchRegions,
			Priority: important,
			start_1: JSON.parse(localStorage.getItem('start1From')),
			start_2: JSON.parse(localStorage.getItem('start2From')),
			start_3: JSON.parse(localStorage.getItem('start3From')),
			start_4: JSON.parse(localStorage.getItem('start4From')),
			start_5: JSON.parse(localStorage.getItem('start5From')),
		}
		return data;
	}

	useEffect(() => {

		if ( state[9].label !== null ) {

			dispatch({
				type: 'CONTROL_START_DATE_EDIT_CARD',
				value: new Date(startDateStr)
			});
			dispatch({
				type: 'CONTROL_END_DATE_EDIT_CARD',
				value: new Date(endDateStr)
			});

			localStorage.setItem('start1From', JSON.stringify(state[9].label.start_1));
			localStorage.setItem('start2From', JSON.stringify(state[9].label.start_2));
			localStorage.setItem('start3From', JSON.stringify(state[9].label.start_3));
			localStorage.setItem('start4From', JSON.stringify(state[9].label.start_4));
			localStorage.setItem('start5From', JSON.stringify(state[9].label.start_5));

		} else {

			localStorage.setItem('start1From', '[]');
			localStorage.setItem('start2From', '[]');
			localStorage.setItem('start3From', '[]');
			localStorage.setItem('start4From', '[]');
			localStorage.setItem('start5From', '[]');

		}

	},[]);

	return (
		<React.Fragment> { state[0].label !== '' ? (
		<React.Fragment>

			{ !rules.isRedirect ? ( <MonitoringCorrForm
				
				style={{ marginTop: cardMargin }}
				onWheel={(e) => {
					if ( e.deltaY > 0 ) {
						setCardMargin(cardMargin - 10);
					} else {
						// eslint-disable-next-line no-unused-expressions
						cardMargin < 0 
						? setCardMargin(cardMargin + 10) 
						: setCardMargin(0);
					}
				}}

			>

				<FontAwesomeIcon 
					style={{
						display: 'block',
						position: 'absolute',
						color: 'white',
						top: '100%',
						left: '50%',
						marginLeft: -8,
						marginTop: 8,
						transition: 'all 300ms'
					}}
          size="lg" 
          icon={faAngleDoubleDown}
        />

				{ showModal === true ? <Modal props={modalData}/> : null }

				{ showParams === false ? (

				<React.Fragment>
				<InputWrapperVertical style={{ margin: 0 }}>	
				<InputLabel style={{ marginTop: 4, marginBottom: 14 }}>название мониторинга</InputLabel>	
				<Input
					maxLength="38"
					placeholder="Название мониторинга"
					defaultValue={state[0].label}
					onBlur={(e) => {
						if ( e.target.value !== '' ) {
							dispatch({
								type: 'CORRECT_NAME',
								value: e.target.value
							});
						} else {
							e.target.value = 'new monitoring';
							dispatch({
								type: 'CORRECT_NAME',
								value: 'new monitoring'
							});
						}
					}}
				/>
				</InputWrapperVertical>
				<InputWrapperVertical style={{ margin: 0 }}>
				<InputLabel style={{ marginTop: 4, marginBottom: 14 }}>идентификатор клиента</InputLabel>
				<Input
					maxLength="4"
					placeholder="Client ID"
					defaultValue={state[1].label}
					onBlur={(e) => {
						// eslint-disable-next-line eqeqeq
						if ( e.target.value !== 0 && e.target.value != '' ) {
							dispatch({
								type: 'CORRECT_CID',
								value: e.target.value
							});
						} else {
							e.target.value = state[1].label;
						}
					}}
				/>
				</InputWrapperVertical>
				<InputWrapperVertical style={{ margin: 0 }}>
				<InputLabel style={{ marginTop: 4, marginBottom: 14 }}>идентификатор партнера</InputLabel>
				<Input
					maxLength="4"
					placeholder="Partner ID"
					defaultValue={state[2].label}
					onBlur={(e) => {
						// eslint-disable-next-line eqeqeq
						if ( e.target.value !== 0 && e.target.value != '' ) {
							dispatch({
								type: 'CORRECT_PID',
								value: e.target.value
							});
						} else {
							e.target.value = state[2].label;
						}
					}}
				/>
				</InputWrapperVertical>

				<InputWrapper>
					<DatePicker 
						dateFormat="dd.MM.yyyy"
						selected={state[10].label[3].label}
						onChange={(date) => { 
							dispatch({
								type: 'CONTROL_START_DATE_EDIT_CARD',
								value: date
							});
							const dateStr = `${date.getFullYear()}-${ date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1) }-${ date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate() }`;
							dispatch({
								type: 'CORRECT_SDATE',
								value: dateStr
							});
						}}
					/>
					<InputLabel>выберите начальную дату</InputLabel>
				</InputWrapper>

				<InputWrapper>
					<DatePicker 
						dateFormat="dd.MM.yyyy"
						selected={state[10].label[4].label}
						onChange={(date) => {
							dispatch({
								type: 'CONTROL_END_DATE_EDIT_CARD',
								value: date
							});
							const dateStr = `${date.getFullYear()}-${ date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1) }-${ date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate() }`;
							dispatch({
								type: 'CORRECT_EDATE',
								value: dateStr
							});
						}}
					/>
					<InputLabel>выберите конечную дату</InputLabel>
				</InputWrapper>

				<Headline>параметры мониторинга</Headline>
				</React.Fragment>

				) : null }

				<Params style={{ padding: 0, minHeight: 0 }}>
					<ParamsLine style={{ border: 'none' }}>
						<ParamsLineLabel>настроить параметры мониторинга</ParamsLineLabel>
						<ParamsLineValue onClick={() => {
							let date = new Date();
							let time = `${date.getHours()} : ${date.getMinutes()}`;
							// eslint-disable-next-line no-unused-expressions
							state[9].label !== null ? setShowParams(!showParams) : 
							dispatch({
								type: 'LOGGER',
								value: { 
									message: `${time} : отсутствуют данные о параметрах данного мониторинга. добавьте их или проверьте подключение к серверу`, 
									time 
								}
							});
							// eslint-disable-next-line no-unused-expressions
							if ( state[9].label === null ) { 
								setModalData({ 
									title: 'параметры мониторинга не созданы', 
									modalType: 'editParamsFromCard',
									background: '#6c757d' 
								});
								setShowModal(true);
							}
						}}>перейти к настройкам</ParamsLineValue>
					</ParamsLine>
				</Params>

				{ showParams === true ? (

				<Params style={{ padding: 0 }}>
					<ParamsLine>
						<ParamsLineLabel onClick={() => {
							setEdit1(!edit1);
							setEdit2(false);
							setEdit3(false);
							setEdit4(false);
							setEdit5(false);
							setEdit6(false);
						}}>валюта на вход</ParamsLineLabel>
						<ParamsLineValue onClick={() => {
							setEdit1(!edit1);
							setEdit2(false);
							setEdit3(false);
							setEdit4(false);
							setEdit5(false);
							setEdit6(false);
						}}>{
							currencyFrom === 'USD'
							? 'доллары'
							: currencyFrom === 'EUR'
							? 'евро'
							: 'рубли'
						}<FontAwesomeIcon 
								style={{
									display: 'block',
									position: 'absolute',
									color: '#424242',
									left: '100%',
									top: '-20px',
									marginLeft: '-35px'
								}}
								size="lg" 
								icon={ edit1 === false ? faChevronDown : faChevronUp }
								onClick={() => {
									setEdit1(!edit1);
									setEdit2(false);
									setEdit3(false);
									setEdit4(false);
									setEdit5(false);
									setEdit6(false);
								}}
							/>
						</ParamsLineValue>
						{ edit1 === true ? ( <ParamsLineInput
							defaultValue={currencyFrom.toUpperCase()}
							placeholder=""
							onFocus={(e) => {
								switch(e.target.value) {
									case 'RUB': e.target.value = 'USD';
										setCurrencyFrom('USD');
										break; 
									case 'USD': e.target.value = 'EUR';
										setCurrencyFrom('EUR');
										break;
									case 'EUR': e.target.value = 'RUB';
										setCurrencyFrom('RUB');
										break;	
									default: break;
								}
								e.target.blur();
							}}
						/> ) : null }
					</ParamsLine>
					<ParamsLine>
						<ParamsLineLabel onClick={() => {
							setEdit2(!edit2);
							setEdit1(false);
							setEdit3(false);
							setEdit4(false);
							setEdit5(false);
							setEdit6(false);
						}}>валюта на выход</ParamsLineLabel>
						<ParamsLineValue onClick={() => {
							setEdit2(!edit2);
							setEdit1(false);
							setEdit3(false);
							setEdit4(false);
							setEdit5(false);
							setEdit6(false);
						}}>{
							currencyTo === 'USD'
							? 'доллары'
							: currencyTo === 'EUR'
							? 'евро'
							: 'рубли'
						}<FontAwesomeIcon 
								style={{
									display: 'block',
									position: 'absolute',
									color: '#424242',
									left: '100%',
									top: '-20px',
									marginLeft: '-35px'
								}}
								size="lg" 
								icon={ edit2 === false ? faChevronDown : faChevronUp }
								onClick={() => {
									setEdit2(!edit2);
									setEdit1(false);
									setEdit3(false);
									setEdit4(false);
									setEdit5(false);
									setEdit6(false);
								}}
							/>
						</ParamsLineValue>
						{ edit2 === true ? ( <ParamsLineInput
							defaultValue={currencyTo.toUpperCase()}
							placeholder=""
							onFocus={(e) => {
								switch(e.target.value) {
									case 'RUB': e.target.value = 'USD';
										setCurrencyTo('USD');
										break; 
									case 'USD': e.target.value = 'EUR';
										setCurrencyTo('EUR');
										break;
									case 'EUR': e.target.value = 'RUB';
										setCurrencyTo('RUB');
										break;	
									default: break;
								}
								e.target.blur();
							}}
						/> ) : null }
					</ParamsLine>
					<ParamsLine>
						<ParamsLineLabel onClick={() => {
							setEdit3(!edit3);
							setEdit2(false);
							setEdit1(false);
							setEdit4(false);
							setEdit5(false);
							setEdit6(false);
						}}>создание скриншота</ParamsLineLabel>
						<ParamsLineValue onClick={() => {
							setEdit3(!edit3);
							setEdit2(false);
							setEdit1(false);
							setEdit4(false);
							setEdit5(false);
							setEdit6(false);
						}}>{
							screenshots === false
							? 'скриншот не требуется' : null
						}<FontAwesomeIcon 
								style={{
									display: 'block',
									position: 'absolute',
									color: '#424242',
									left: '100%',
									top: '-20px',
									marginLeft: '-35px'
								}}
								size="lg" 
								icon={ edit3 === false ? faChevronDown : faChevronUp }
								onClick={() => {
									setEdit3(!edit3);
									setEdit2(false);
									setEdit1(false);
									setEdit4(false);
									setEdit5(false);
									setEdit6(false);
								}}
							/>
						</ParamsLineValue>
						{ edit3 === true ? ( <React.Fragment/> ) : null }
					</ParamsLine>
					<ParamsLine>
						<ParamsLineLabel onClick={() => {
							setEdit4(!edit4);
							setEdit2(false);
							setEdit3(false);
							setEdit1(false);
							setEdit5(false);
							setEdit6(false);
						}}>тип валидации</ParamsLineLabel>
						<ParamsLineValue onClick={() => {
							setEdit4(!edit4);
							setEdit2(false);
							setEdit3(false);
							setEdit1(false);
							setEdit5(false);
							setEdit6(false);
						}}>{
							validationType === 'STRICT'
							? 'строгая валидация' : 'нестрогая валидация'
						}<FontAwesomeIcon 
								style={{
									display: 'block',
									position: 'absolute',
									color: '#424242',
									left: '100%',
									top: '-20px',
									marginLeft: '-35px'
								}}
								size="lg" 
								icon={ edit4 === false ? faChevronDown : faChevronUp }
								onClick={() => {
									setEdit4(!edit4);
									setEdit2(false);
									setEdit3(false);
									setEdit1(false);
									setEdit5(false);
									setEdit6(false);
								}}
							/>
						</ParamsLineValue>
						{ edit4 === true ? ( <ParamsLineInput
							defaultValue={validationType.toUpperCase()}
							placeholder=""
							onFocus={(e) => {
								switch(e.target.value) {
									case 'STRICT': e.target.value = 'NO STRICT';
										setValidationType('NO STRICT');
										break; 
									case 'NO STRICT': e.target.value = 'STRICT';
									setValidationType('STRICT');
										break;
									default: break;
								}
								e.target.blur();
							}}
						/> ) : null }
					</ParamsLine>
					<ParamsLine>
						<ParamsLineLabel onClick={() => {
							setEdit5(!edit5);
							setEdit2(false);
							setEdit3(false);
							setEdit4(false);
							setEdit1(false);
							setEdit6(false);
						}}>приоритет мониторинга</ParamsLineLabel>
						<ParamsLineValue onClick={() => {
							setEdit5(!edit5);
							setEdit2(false);
							setEdit3(false);
							setEdit4(false);
							setEdit1(false);
							setEdit6(false);
						}}>{
							important <= 2
							? 'стандартный приоритет' 
							: important > 4
							? 'высокий приоритет'
							: important > 2
							? 'повышенный приоритет' : null 
						}<FontAwesomeIcon 
								style={{
									display: 'block',
									position: 'absolute',
									color: '#424242',
									left: '100%',
									top: '-20px',
									marginLeft: '-35px'
								}}
								size="lg" 
								icon={ edit5 === false ? faChevronDown : faChevronUp }
								onClick={() => {
									setEdit5(!edit5);
									setEdit2(false);
									setEdit3(false);
									setEdit4(false);
									setEdit1(false);
									setEdit6(false);
								}}
							/>
						</ParamsLineValue>
						{ edit5 === true ? ( <ParamsLineInput
							defaultValue={important}
							placeholder=""
							maxLength="1"
							onKeyUp={(e) => {
								if ( e.target.value < 5 ) {
									setImportant(e.target.value)
								} else {
									e.target.value = 5;
									setImportant(5)
								}
							}}
						/> ) : null }
					</ParamsLine>
					<ParamsLine>
						<ParamsLineLabel onClick={() => {
							setEdit6(!edit6);
							setEdit2(false);
							setEdit3(false);
							setEdit4(false);
							setEdit1(false);
							setEdit5(false);
						}}>регионы мониторинга</ParamsLineLabel>
						<ParamsLineValue style={{ marginTop: 2 }} onClick={() => {
							setEdit6(!edit6);
							setEdit2(false);
							setEdit3(false);
							setEdit4(false);
							setEdit1(false);
							setEdit5(false);
						}}>{
							searchRegions !== undefined ? searchRegions.join(' ') : ''
						}<FontAwesomeIcon 
								style={{
									display: 'block',
									position: 'absolute',
									color: '#424242',
									left: '100%',
									top: '-20px',
									marginLeft: '-35px'
								}}
								size="lg" 
								icon={faChevronDown}
								onClick={() => {
									setEdit6(!edit6);
									setEdit2(false);
									setEdit3(false);
									setEdit4(false);
									setEdit1(false);
									setEdit5(false);
								}}
							/>
						</ParamsLineValue>
						{ edit6 === true ? ( <AsyncSelect
							isMulti
							cacheOptions
							defaultOptions
							loadOptions={loadOptions}
							placeholder="выберите регионы поиска"
							theme={theme => ({
          			...theme,
          			borderRadius: 4,
          			colors: {
            			...theme.colors,
            			primary: '#424242',
            			primary25: '#ffc000',
            			primary50: 'rgb(236, 236, 236)'
          			}
        			})}
							styles={selectStyles}
							onChange={(value) => {
								if ( value.length !== 0 ) {
									let arr = [];
									value.forEach(item => 
										arr.push(item.value)	
									);
									setSearchRegions(arr);
								}
							}}
						/> ) : null }
					</ParamsLine>
					<ParamsLine style={{ border: 'none' }}>
						<ParamsLineLabel>интервалы запуска</ParamsLineLabel>
						<ParamsLineValue
							onClick={() => {
								setModalData({ 
									title: 'редактирование времени старта', 
									modalType: 'startTimeService' 
								});
								setShowModal(true);
							}} 
							style={{ marginTop: 2 }}
						>{
							state[9].label.start_1[1] !== '' 
							? state[9].label.start_1.join(' - ')
							: state[9].label.start_1[0] !== '' 
							? state[9].label.start_1[0] : null
						}{
							state[9].label.start_2[1] !== '' 
							? ', ' + state[9].label.start_2.join(' - ')
							: state[9].label.start_2[0] !== '' 
							? ', ' + state[9].label.start_2[0] : null
						}{
							state[9].label.start_3[1] !== '' 
							? ', ' + state[9].label.start_3.join(' - ')
							: state[9].label.start_3[0] !== '' 
							? ', ' + state[9].label.start_3[0] : null
						}{
							state[9].label.start_4[1] !== '' 
							? ', ' + state[9].label.start_4.join(' - ')
							: state[9].label.start_4[0] !== '' 
							? ', ' + state[9].label.start_4[0] : null
						}{
							state[9].label.start_5[1] !== '' 
							? ', ' + state[9].label.start_5.join(' - ')
							: state[9].label.start_5[0] !== '' 
							? ', ' + state[9].label.start_5[0] : null
						}<FontAwesomeIcon 
								style={{
									display: 'block',
									position: 'absolute',
									color: '#424242',
									left: '100%',
									top: '-20px',
									marginLeft: '-35px'
								}}
								size="lg" 
								icon={faChevronDown}
							/>
						</ParamsLineValue>
					</ParamsLine>
				</Params>

				) : null }

				{ !rules.isValidating ? ( <Buttons>

					<ButtonBack onClick={() => history.push(`/card/view/${id}`)}>в карточку</ButtonBack>
					<Submit onClick={ async () => {
					
						setRules({
							isValidating: !rules.isValidating,
							isRedirect: rules.isRedirect
						});

						const uuid = state[5].label;
						const pack = {
							data: {
								Name: state[0].label,
								ClientID: state[1].label,
								PartnerID: state[2].label,
								ActiveFrom: state[3].label,
								ActiveTo: state[4].label
							}
						}

						let updateParamsPack = {
							data: bundleData()
						};
						let query = await fetchDispatcher({
							fetchType: 'PUT',
							itemid: uuid,
							value: JSON.stringify(pack)
						});

						console.log(JSON.stringify(updateParamsPack));

						if ( query.status === 200 ) {

							let queryParams = await fetchDispatcher({
								fetchType: 'EDIT_PARAMS',
								itemid: uuid,
								value: JSON.stringify(updateParamsPack)
							});

							if ( queryParams.status === 200 ) {

								setTimeout(() => { 
									setRules({
										isValidating: false
									});
	
									history.push(`/card/view/${id}`);
								
								}, 1000);

							}

						}
					
					}}>
					
					{ state[10].label[5].label }
				
				</Submit></Buttons> ) : (

					<Buttons>
						<Submit>

							<CircularProgress
								style={{
									color: 'white',
									position: 'absolute',
									width: 22,
									height: 22,
									left: '50%',
									top: '50%',
									marginTop: '-11px',
									marginLeft: '-11px'
								}}
							/>
						</Submit>
					</Buttons>

				)}

      </MonitoringCorrForm> ) : (

				<Redirect to="/card/view/"/>

			)}

		</React.Fragment> ) : ( <Redirect to="/history"/> )}
		</React.Fragment>
	);
}