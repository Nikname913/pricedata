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

	const { dispatch } = useContext(ReduxHooksContext);
	const [ validateInner, setValidateInner ] = useState('создать мониторинг');
	const [ monitoringDefName, ] = useState('название мониторинга');

	const [ startDate, setStartDate ] = useState(new Date());
	const [ endDate, setEndDate ] = useState(new Date());
	
	const [ isValidating, setIsValidating ] = useState(false);
	const [ isRedirect, setIsRedirect ] = useState(false);
	const [ showParams, setShowParams ] = useState(false);
	const [ inputDisabled, setInputDisabled ] = useState(false);
	const [ cardMargin, setCardMargin ] = useState(0);
	const [ filterForParams, setFilterForParams ] = useState();
	// на начальном этапе фильтрация мониторингов при создани параметра на этой
	// странице будет происходить через название мониторинга
	// позднее выборка пойдет через uuid

	const [ monitoringName, setMonitoringName ] = useState('');
	const [ clientName, setClientName ] = useState('');
	const [ clientId, setClientId ] = useState(0);
	const [ ,setPartnerName ] = useState('');
	const [ sDate, setSDate ] = useState('');
	const [ eDate, setEDate ] = useState('');
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

	const getMonitorInputValue = event => setMonitoringName(event.target.value);
	const setMonitoringParams = async data => {
		const pack = { data }
		setCreateParams(pack);
	};

	return (
		<React.Fragment>

			{ isRedirect === false ? ( <AddMonitoringForm

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

				<Input
					maxLength="38"
					disabled={inputDisabled}
					defaultValue={monitoringDefName}
					onKeyUp={getMonitorInputValue}
					onFocus={(e) => {
						// setMonitoringDefName('');
						if ( e.target.value === 'название мониторинга' ) {
							e.target.value = '';
						}
					}}
					onBlur={(e) => {
						if ( e.target.value === '' ) {
							e.target.value = 'название мониторинга';
						}
					}}
				/>

        <AsyncSelect
          cacheOptions
          defaultOptions
					isDisabled={inputDisabled}
          loadOptions={loadOptions}
          placeholder={"выберите клиента"}
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
        />
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={loadOptionsPartners}
          placeholder={"название партнера"}
          styles={selectStyles}
					isDisabled
        />

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
					<Params>
				
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
						<ButtonBack onClick={() => setIsRedirect(true)}>закончить</ButtonBack>
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
							
							if ( query.status !== 200 && query.status !== 201 ) {

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
							setTimeout(() => setValidateInner('создать мониторинг'), 2000);

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