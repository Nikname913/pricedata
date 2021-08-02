/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import middleware from "../../redux-hooks/middleware";
import CircularProgress from '@material-ui/core/CircularProgress';
import "react-datepicker/dist/react-datepicker.css";
import bodyTags from '../../templates/body-styled-elements';
import { ReduxHooksContext } from '../../Context';
import fetchDispatcher from "../../services/fetch-query.service";

const AddMonitoringForm = bodyTags.MonitoringAddForm;
const InputWrapper = bodyTags.InputWrapper;
const InputLabel = bodyTags.InputWrapperDiscription;
const Buttons = bodyTags.MonitoringAddFormButtonsBlock;
const Submit = bodyTags.MonitoringAddFormSubmit;
const Input = bodyTags.MonitoringAddFormInput;

export default function SourceForm() {

	const { dispatch } = useContext(ReduxHooksContext);
	const [ validateInner, setValidateInner ] = useState('добавить источник');
	const [ monitoringDefName, ] = useState('введите название источника поиска');
	const [ parserDefName, ] = useState('введите название парсера');
	const [ parserTypeDefName, ] = useState('введите тип парсера');
	
	const [ isValidating, setIsValidating ] = useState(false);
	const [ cardMargin, setCardMargin ] = useState(0);

	const [ sourceName, setSourceName ] = useState('');
	const [ parserName, setParserName ] = useState('');
	const [ parserType, setParserType ] = useState('');

	const setSourceInputValue = event => setSourceName(`${event.target.value}`);
	const setParserInputValue = event => setParserName(`${event.target.value}`);
	const setParserTypeInputValue = event => setParserType(`${event.target.value}`);

	return (
		<React.Fragment>

			{ true ? ( <AddMonitoringForm

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
					defaultValue={monitoringDefName}
					onKeyUp={setSourceInputValue}
					style={{ marginBottom: 4, paddingBottom: 8 }}
					onFocus={(e) => {
						// setMonitoringDefName('');
						if ( e.target.value === 'введите название источника поиска' ) {
							e.target.value = '';
						}
					}}
					onBlur={(e) => {
						if ( e.target.value === '' ) {
							e.target.value = 'введите название источника поиска';
						}
					}}
				/>

				<Input
					maxLength="38"
					defaultValue={parserDefName}
					onKeyUp={setParserInputValue}
					style={{ marginBottom: 4, paddingBottom: 8 }}
					onFocus={(e) => {
						// setMonitoringDefName('');
						if ( e.target.value === 'введите название парсера' ) {
							e.target.value = '';
						}
					}}
					onBlur={(e) => {
						if ( e.target.value === '' ) {
							e.target.value = 'введите название парсера';
						}
					}}
				/>

				<Input
					disabled={true}
					maxLength="38"
					defaultValue={parserTypeDefName}
					onKeyUp={setParserTypeInputValue}
					style={{ paddingBottom: 8 }}
					onFocus={(e) => {
						// setMonitoringDefName('');
						if ( e.target.value === 'введите тип парсера' ) {
							e.target.value = '';
						}
					}}
					onBlur={(e) => {
						if ( e.target.value === '' ) {
							e.target.value = 'введите тип парсера';
						}
					}}
				/>

				<InputWrapper>
					<InputLabel
						style={{
							lineHeight: '22px',
							paddingRight: 80
						}}
					>
						источники поиска необходимы, чтобы можно было полнее сформировать параметры ваших мониторингов. введите читаемое название источника, название парсера, взятое из базы парсеров и тип будущего парсинга. все поля ввода обязательны
					</InputLabel>
				</InputWrapper>

				{ !isValidating ? ( 
				
				<Buttons style={{ marginTop: 17 }}>

				<Submit 
					style={{ marginRight: 16 }}
					onClick={() => {
						dispatch({
							type: 'EDITOR_DATA_TYPE',
							value: 'sources'
						});
						dispatch({
							type: 'CONTROL_EDITOR',
							value: true,
						});

						const getSources = fetchDispatcher({fetchType: 'GET_SOURCES_TOTAL'});
						getSources.then(data => {
							middleware({
								type: 'SOURCES_DATA',
								value: JSON.stringify(data)
							});
						});

						setTimeout(() => {

							let baseSource = JSON.parse(localStorage.getItem('sourceData')).data;
							let arrSource = [];
							baseSource.forEach(item => arrSource.push(0));
			
							dispatch({
								type: 'EDITOR_DATA',
								value: JSON.parse(localStorage.getItem('sourceData'))
							});
							dispatch({
								type: 'EDITOR_DATA_SAVEARR',
								value: arrSource
							});

							middleware({ type: 'CLEAR_PRODUCTS_DATA' });
							middleware({ type: 'CLEAR_SOURCE_DATA' });

						}, 1000);

					}}
				>
					список источников
				</Submit>	

				{ true ? <Submit 

					onClick={ async () => {
	    			
						if ( sourceName !== '' && parserName !== '' && parserType !== '' ) {			
							
							setIsValidating(true);

							let data = {
								data: {
									Name: sourceName,
        					Parser: parserName,
        					// ParsingType: parserType
								}
							}

							let query = await fetchDispatcher({
								fetchType: 'SET_SOURCE',
								value: JSON.stringify(data)
							});

							console.log(query);
							setTimeout(() => setIsValidating(false), 2000);

						} else {

							setValidateInner('заполните все поля');
							setTimeout(() => setValidateInner('добавить источник'), 2000);

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