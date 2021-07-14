import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router";
import { ReduxHooksContext } from "../../Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import fetchDispatcher from "../../services/fetch-query.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bodyTags from '../../templates/body-styled-elements';

const MonitoringCardView = bodyTags.MonitoringCard;
const Buttons = bodyTags.MonitoringAddFormButtonsBlock;
const Button = bodyTags.MonitoringAddFormSubmit;
const ButtonBack = bodyTags.MonitoringAddFormBackHistory;
const Params = bodyTags.MonitoringCardParams;
const ParamsLine = bodyTags.MonitoringCardParamsLine;
const ParamsLineLabel = bodyTags.MonitoringCardParamsLineLabel;
const ParamsLineValue = bodyTags.MonitoringCardParamsLineValue;
const Headline = bodyTags.MonitoringCardTitle;
const Input = bodyTags.MonitoringCorrFormInput;
const InputLabel = bodyTags.InputWrapperDiscription;
const InputWrapper = bodyTags.InputWrapper;
const InputWrapperVertical = bodyTags.InputWrapperVertical;

export default function MonitoringCard() {

	const { state, dispatch } = useContext(ReduxHooksContext);
	let { id } = useParams();
	const history = useHistory();
	const [ showParams, setShowParams ] = useState(false);
	const [ cardMargin, setCardMargin ] = useState(0);

	const startDateStr = `${state[3].label.split('-')[1]}-${state[3].label.split('-')[2]}-${state[3].label.split('-')[0]}`;
	const endDateStr = `${state[4].label.split('-')[1]}-${state[4].label.split('-')[2]}-${state[4].label.split('-')[0]}`;

	useEffect(() => {
		dispatch({
			type: 'CONTROL_START_DATE_VIEW_CARD',
			value: new Date(startDateStr)
		});
		dispatch({
			type: 'CONTROL_END_DATE_VIEW_CARD',
			value: new Date(endDateStr)
		});
		const query = fetchDispatcher({ fetchType: 'GET_PARAMS', value: id });
		query.then(data => {
			dispatch({
				type: 'SET_ONE_PARAMS',
				value: data.data
			});
		});
	},[]);

	return (
		<React.Fragment> { state[0].label !== '' ? (
		<MonitoringCardView
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
			
			{ showParams === false ? (

			<React.Fragment>
			<InputWrapperVertical style={{ margin: 0 }}>	
				<InputLabel style={{ marginTop: 4, marginBottom: 14 }}>название мониторинга</InputLabel>
				<Input
					maxLength="38"
					placeholder="Название мониторинга"
					value={state[0].label}
					disabled="true"
				/>
			</InputWrapperVertical>
			<InputWrapperVertical style={{ margin: 0 }}>
				<InputLabel style={{ marginTop: 4, marginBottom: 14 }}>идентификатор клиента</InputLabel>
				<Input
					maxLength="38"
					placeholder="Название мониторинга"
					value={state[1].label}
					disabled="true"
				/>
			</InputWrapperVertical>
			<InputWrapperVertical style={{ margin: 0 }}>
				<InputLabel style={{ marginTop: 4, marginBottom: 14 }}>идентификатор партнера</InputLabel>
				<Input
					maxLength="38"
					placeholder="Название мониторинга"
					value={state[2].label}
					disabled="true"
				/>
			</InputWrapperVertical>
			
			<InputWrapper>
				<DatePicker 
					dateFormat="dd.MM.yyyy"
					selected={state[10].label[1].label}
					disabled="true"
				/>
				<InputLabel>начальная дата мониторинга</InputLabel>
			</InputWrapper>

			<InputWrapper>
				<DatePicker 
					dateFormat="dd.MM.yyyy"
					selected={state[10].label[2].label}
					disabled="true"
				/>
				<InputLabel>конечная дата мониторинга</InputLabel>
			</InputWrapper>

			<Headline>параметры мониторинга</Headline>
			</React.Fragment>

			) : null }

			<Params style={{ padding: 0, minHeight: 0 }}>
				<ParamsLine style={{ border: 'none' }}>
					<ParamsLineLabel>параметры мониторинга</ParamsLineLabel>
					<ParamsLineValue onClick={() => {
						let date = new Date();
						let time = `${date.getHours()} : ${date.getMinutes()}`;
						if ( state[9].label !== null ) {
						// eslint-disable-next-line no-unused-expressions
						state[9].label !== undefined 
						? setShowParams(!showParams)
						: dispatch({
							type: 'LOGGER',
							value: { 
								message: `${time} : отсутствуют данные о параметрах данного мониторинга. добавьте их или проверьте подключение к серверу`, 
								time 
							}
						});
						} else {
							dispatch({
								type: 'LOGGER',
								value: { 
									message: `${time} : отсутствуют данные о параметрах данного мониторинга. добавьте их или проверьте подключение к серверу`, 
									time 
								}
							});
						}
					}}>
						отобразить параметры
					</ParamsLineValue>
				</ParamsLine>
			</Params>

			{ showParams === true ? (

			<Params 
				style={{ 
					padding: 0,
					display: state[9].label === null ? 'none' : ''
				}}>

				{ state[9].label !== null ? (<React.Fragment>

				<ParamsLine>
					<ParamsLineLabel>валюта на вход</ParamsLineLabel>
					<ParamsLineValue>{
						state[9].label.CurrencyIn === 'USD'
						? 'доллары'
						: state[9].label.CurrencyIn === 'EUR'
						? 'евро'
						: 'рубли'
					}<FontAwesomeIcon 
							style={{
								display: 'block',
								position: 'absolute',
								color: 'white',
								left: '100%',
								top: '-20px',
								marginLeft: '-35px'
							}}
							size="lg" 
							icon={faChevronDown}
						/>
					</ParamsLineValue>
				</ParamsLine>
				<ParamsLine>
					<ParamsLineLabel>валюта на выход</ParamsLineLabel>
					<ParamsLineValue>{
						state[9].label.CurrencyOut === 'USD'
						? 'доллары'
						: state[9].label.CurrencyOut === 'EUR'
						? 'евро'
						: 'рубли'
					}<FontAwesomeIcon 
							style={{
								display: 'block',
								position: 'absolute',
								color: 'white',
								left: '100%',
								top: '-20px',
								marginLeft: '-35px'
							}}
							size="lg" 
							icon={faChevronDown}
						/>
					</ParamsLineValue>
				</ParamsLine>
				<ParamsLine>
					<ParamsLineLabel>создание скриншота</ParamsLineLabel>
					<ParamsLineValue>{
						state[9].label.ScreenShot === 'nothing'
						? 'скриншот не требуется' : null
					}<FontAwesomeIcon 
							style={{
								display: 'block',
								position: 'absolute',
								color: 'white',
								left: '100%',
								top: '-20px',
								marginLeft: '-35px'
							}}
							size="lg" 
							icon={faChevronDown}
						/>
					</ParamsLineValue>
				</ParamsLine>
				<ParamsLine>
					<ParamsLineLabel>тип валидации</ParamsLineLabel>
					<ParamsLineValue>{
						state[9].label.ValidationType === 'strict'
						? 'строгая валидация' : null
					}<FontAwesomeIcon 
							style={{
								display: 'block',
								position: 'absolute',
								color: 'white',
								left: '100%',
								top: '-20px',
								marginLeft: '-35px'
							}}
							size="lg" 
							icon={faChevronDown}
						/>
					</ParamsLineValue>
				</ParamsLine>
				<ParamsLine>
					<ParamsLineLabel>приоритет мониторинга</ParamsLineLabel>
					<ParamsLineValue>{
						state[9].label.Priority <= 2
						? 'стандартный приоритет' 
						: state[9].label.Priority > 4
						? 'высокий приоритет'
						: state[9].label.Priority > 2
						? 'повышенный приоритет' : null 
					}<FontAwesomeIcon 
							style={{
								display: 'block',
								position: 'absolute',
								color: 'white',
								left: '100%',
								top: '-20px',
								marginLeft: '-35px'
							}}
							size="lg" 
							icon={faChevronDown}
						/>
					</ParamsLineValue>
				</ParamsLine>
				<ParamsLine>
					<ParamsLineLabel>регионы мониторинга</ParamsLineLabel>
					<ParamsLineValue style={{ marginTop: 2 }}>{
						state[9].label.SearchRegions.join(' ')
					}<FontAwesomeIcon 
							style={{
								display: 'block',
								position: 'absolute',
								color: 'white',
								left: '100%',
								top: '-20px',
								marginLeft: '-35px'
							}}
							size="lg" 
							icon={faChevronDown}
						/>
					</ParamsLineValue>
				</ParamsLine>
				<ParamsLine style={{ border: 'none' }}>
					<ParamsLineLabel>интервалы запуска</ParamsLineLabel>
					<ParamsLineValue style={{ marginTop: 2 }}>{
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
								color: 'white',
								left: '100%',
								top: '-20px',
								marginLeft: '-35px'
							}}
							size="lg" 
							icon={faChevronDown}
						/>
					</ParamsLineValue>
				</ParamsLine>

				</React.Fragment>) : null }

			</Params>

			) : null }

			<Buttons>
				<ButtonBack onClick={() => history.push('/history')}>мониторинги</ButtonBack>
				<Button
					onClick={() => 
						history.push(`/card/correct/${id}`)
					}
				>
				
					редактировать карточку
				
				</Button>
			</Buttons>

		</MonitoringCardView> ) : ( <Redirect to="/history"/> )}
		</React.Fragment>
	);
}