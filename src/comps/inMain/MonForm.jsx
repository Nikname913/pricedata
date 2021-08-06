import React, { useState, useContext } from "react";
import { Redirect } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bodyTags from '../../templates/body-styled-elements';
import MonitoringParamsForm from "./MonParamsForm";
import { ReduxHooksContext } from '../../Context';
import fetchDispatcher from "../../services/fetch-query.service";
import { data } from '../../data/clients';
import { partners } from '../../data/partners';
import selectStyles from '../../templates/css-templates/clients-select.js';

const AddMonitoringForm = bodyTags.MonitoringAddForm;
const InputWrapper = bodyTags.InputWrapper;
const InputLabel = bodyTags.InputWrapperDiscription;
const Buttons = bodyTags.MonitoringAddFormButtonsBlock;
const Submit = bodyTags.MonitoringAddFormSubmit;
const ButtonBack = bodyTags.MonitoringAddFormBackHistory;
const Input = bodyTags.MonitoringAddFormInput;
const Headline = bodyTags.MonitoringCardTitle;
const Params = bodyTags.MonitoringCardParams;

const filterData = (inputValue) => {
  return data.filter(item => 
    item.label.toLowerCase().includes(inputValue.toLowerCase())
  );
}

const loadOptions = (inputValue, cb) => {
  setTimeout(() => {
    cb(filterData(inputValue));
  }, 1000);
}

const filterDataPartners = (inputValue) => {
  return partners.filter(item =>
    item.label.toLowerCase().includes(inputValue.toLowerCase())  
  );
}

const loadOptionsPartners = (inputValue, cb) => {
  setTimeout(() => {
    cb(filterDataPartners(inputValue))
  }, 1000);
}

export default function MonitoringForm() {

	const { state, dispatch } = useContext(ReduxHooksContext);
	const [ validateInner, setValidateInner ] = useState('создать мониторинг');
	const [ monitoringDefName, ] = useState('придумайте уникальное название мониторинга');

	const [ startDate, setStartDate ] = useState(new Date());
	const [ endDate, setEndDate ] = useState(() => {
		let date = new Date();
		date.setFullYear(date.getFullYear() + 1);
		return date;
	});
	
	const [ isValidating, setIsValidating ] = useState(false);
	const [ isRedirect, setIsRedirect ] = useState(false);
	const [ isNotComplited, setIsNotComplited ] = useState(false);
	const [ showParams, setShowParams ] = useState(false);
	const [ inputDisabled, setInputDisabled ] = useState(false);
	const [ filterForParams, setFilterForParams ] = useState();
	// на начальном этапе фильтрация мониторингов при создани параметра на этой
	// странице будет происходить через название мониторинга
	// позднее выборка пойдет через uuid

	const [ monitoringName, setMonitoringName ] = useState('');
	const [ clientName, setClientName ] = useState('');
	const [ clientId, setClientId ] = useState(0);
	const [ ,setPartnerName ] = useState('');
	const [ sDate, setSDate ] = useState(startDate);
	const [ eDate, setEDate ] = useState(endDate);
	const [ createParams, setCreateParams ] = useState({});

	const getValueChangeClientName = value => { 
		setClientName(value.label);
		setClientId(value.value)
		setPartnerName('BRANDPOL GROUP LIMITED');
	}
	const getValueInputChangeClientName = inputValue => {
		// eslint-disable-next-line no-unused-expressions
		inputValue !== '' 
		? setClientName(inputValue)
		: null
		// eslint-disable-next-line no-unused-expressions
		inputValue !== ''
		? setPartnerName('BRANDPOL GROUP LIMITED')
		: null;
	}

	const getMonitorInputValue = event => setMonitoringName(`${event.target.value}`);
	const setMonitoringParams = async data => {
		const pack = { data }
		setCreateParams(pack);
	};

	return (
		<React.Fragment>

			{ isRedirect === false ? ( <AddMonitoringForm

				style={{ marginTop: state[10].label[11].label }}
				onWheel={(e) => {

					if ( e.target.parentNode.className.indexOf('MenuList') < 0 ) {

					if ( e.deltaY > 0 ) {
						dispatch({
							type: 'CONTROL_ADDCARD_MARGIN',
							value: state[10].label[11].label - 10
						});
					} else {
						// eslint-disable-next-line no-unused-expressions
						state[10].label[11].label < 0 
						? dispatch({
							type: 'CONTROL_ADDCARD_MARGIN',
							value: state[10].label[11].label + 10
						})
						: dispatch({
							type: 'CONTROL_ADDCARD_MARGIN',
							value: 0
						});
					}
				}}}

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

				<Input
					maxLength="38"
					disabled={inputDisabled}
					defaultValue={monitoringDefName}
					onKeyUp={getMonitorInputValue}
					onFocus={(e) => {
						// setMonitoringDefName('');
						if ( e.target.value === 'придумайте уникальное название мониторинга' ) {
							e.target.value = '';
						}
					}}
					onBlur={(e) => {
						if ( e.target.value === '' ) {
							e.target.value = 'придумайте уникальное название мониторинга';
						}
					}}
					style={{
						backgroundColor: !!isNotComplited ? '#F69D84' : ''
					}}
				/>

        <AsyncSelect
          cacheOptions
          defaultOptions
					isDisabled={inputDisabled}
          loadOptions={loadOptions}
          placeholder={"выберите название клиента для мониторинга"}
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
					onChange={getValueChangeClientName}
					onInputChange={getValueInputChangeClientName}
					onWheel={e => e.stopPropagation()}
        />
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptionsPartners}
          placeholder={"название партнера для мониторинга"}
          styles={selectStyles}
					isDisabled
        />

				<InputWrapper>
					<InputLabel
						style={{
							lineHeight: '22px',
							paddingRight: 80
						}}
					>
						* на текущий момент партнер по умолчанию для всех мониторингов "Катков и Партнеры". возможность выбора будет доступна после того, как будет сформирован спискок всех партнеров. пока что это поле можно пропустить при заполнении
					</InputLabel>
				</InputWrapper>

				<InputWrapper>
					<DatePicker 
						dateFormat="dd.MM.yyyy"
						selected={startDate}
						disabled={inputDisabled}
						onChange={(date) => { 
							setStartDate(date);
							setSDate(date);
						}}
					/>
					<InputLabel>выберите начальную дату</InputLabel>
				</InputWrapper>

				<InputWrapper>
					<DatePicker 
						dateFormat="dd.MM.yyyy"
						selected={endDate}
						disabled={inputDisabled}
						onChange={(date) => {
							setEndDate(date);
							setEDate(date);
						}}
					/>
					<InputLabel>выберите конечную дату</InputLabel>
				</InputWrapper>
				
				{ showParams === true ? (

					<React.Fragment>
					<Headline>параметры мониторинга</Headline>
					<Params style={{ paddingTop: 18 }}>
				
							<MonitoringParamsForm 
								paramsUp={setMonitoringParams}
								createFilter={filterForParams}
							/>
				
					</Params>
					</React.Fragment>

				) : null }

				{ !isValidating ? ( 
				
				<Buttons style={{ marginTop: 17 }}>

				{ showParams === true ? 
					
					<React.Fragment>
						<ButtonBack 
							onClick={() => {
								setIsRedirect(true);
								dispatch({
									type: 'CONTROL_NAVIGATION',
									value: 1
								});
							}}
						>
							закончить
						</ButtonBack>
						<Submit
							onClick={ async () => {
								let forData = createParams;
								for ( let key in forData.data ) {
									if ( key.indexOf('start') !== (-1) ) {
										if ( forData.data[key][0] === '' ) {
											delete forData.data[key];
										} else if ( forData.data[key][1] === '' ) {
											forData.data[key] = [forData.data[key][0]];
										}
									}
								}
								console.log(JSON.stringify(forData));
								console.log(JSON.stringify(createParams));
								// eslint-disable-next-line no-unused-vars
								
								let query = await fetchDispatcher({
									fetchType: 'SET_PARAMS',
									value: JSON.stringify(forData)
								});

								let date = new Date();
								let time = `${date.getHours()} : ${date.getMinutes()}`;
								dispatch({
									type: 'LOGGER',
									value: { 
										message: `${time} : параметры для мониторинга "${monitoringName}" успешно созданы. адрес запроса: ${query.url}`, 
										time 
									}
								});

								setIsValidating(true);
								setTimeout(() => setIsRedirect(true), 1000);

							}}
						>
							сохранить параметры
						</Submit> 
					</React.Fragment>
					
				: null }
				
				{ showParams === false ? <Submit 

					onClick={ async () => {

						localStorage.setItem('start1From', '[]');
	    			localStorage.setItem('start2From', '[]');
	    			localStorage.setItem('start3From', '[]');
	    			localStorage.setItem('start4From', '[]');
	    			localStorage.setItem('start5From', '[]');
	    			
						if ( clientName !== '' &&
							   clientId !== 0 && 
								 monitoringName !== '' &&
								 sDate !== {} &&
								 eDate !== {} ) {			

							const postData = {
								"Name": monitoringName,
								"ClientID": clientId,
								"PartnerID": 12,
								"ActiveFrom": `${sDate.getFullYear()}-${ sDate.getMonth() + 1 < 10 ? ('0' + (sDate.getMonth() + 1)) : (sDate.getMonth() + 1) }-${ sDate.getDate() < 10 ? ('0' + sDate.getDate()) : sDate.getDate() }`,
								"ActiveTo": `${eDate.getFullYear()}-${ eDate.getMonth() + 1 < 10 ? ('0' + (eDate.getMonth() + 1)) : (eDate.getMonth() + 1) }-${ eDate.getDate() < 10 ? ('0' + eDate.getDate()) : eDate.getDate() }`
							}

							setIsValidating(true);

							let query = await fetchDispatcher({
								fetchType: 'POST',
								value: postData
							});
							
							if ( query.status !== 201 ) {

								let date = new Date();
								let time = `${date.getHours()} : ${date.getMinutes()}`;
								dispatch({
									type: 'LOGGER',
									value: { 
										message: `${time} : мониторинг "${monitoringName}" не получилось создать. конечная и начальная дата не могут совпадать. адрес запроса: ${query.url}`, 
										time 
									}
								});
								setTimeout(() => setIsValidating(false), 1000);
							
							} else {

								setFilterForParams(monitoringName);
								console.log(query);

								let date = new Date();
								let time = `${date.getHours()} : ${date.getMinutes()}`;
								dispatch({
									type: 'LOGGER',
									value: { 
										message: `${time} : мониторинг "${monitoringName}" успешно создан. адрес запроса: ${query.url}`, 
										time 
									}
								});

								setTimeout(() => { 
									setIsValidating(false);
									setShowParams(true);
									setInputDisabled(true);
								}, 1000);

							}

						} else {

							setValidateInner('заполните все поля');
							setIsNotComplited(true);
							setTimeout(() => { 
								setValidateInner('создать мониторинг');
								setIsNotComplited(false);
							}, 2000);

						}
					}}
				>
					
					{ validateInner }
				
				</Submit> : null } </Buttons> ) : (

					<Buttons style={{ marginTop: 17 }}>
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

      </AddMonitoringForm> ) : (

				<Redirect to="/history"/>

			)}

		</React.Fragment>
	);
}