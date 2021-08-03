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
const GroupInputButton = bodyTags.MonitoringAddFormInputButtonsGroup;

export default function SourceForm() {

	const { state, dispatch } = useContext(ReduxHooksContext);
	const [ validateInner, setValidateInner ] = useState('добавить источник');
	const [ monitoringDefName, ] = useState('введите название источника поиска');
	const [ parserDefName, ] = useState('введите название парсера');
	
	const [ isValidating, setIsValidating ] = useState(false);

	const [ sourceName, setSourceName ] = useState('');
	const [ parserName, setParserName ] = useState('');

	const setSourceInputValue = event => setSourceName(`${event.target.value}`);
	const setParserInputValue = event => setParserName(`${event.target.value}`);

	return (
		<React.Fragment>

			{ true ? ( <AddMonitoringForm

				style={{ marginTop: state[10].label[14].label }}
				onWheel={(e) => {
					if ( e.deltaY > 0 ) {
						dispatch({
							type: 'CONTROL_SOURCECARD_MARGIN',
							value: state[10].label[14].label - 10
						});
					} else {
						// eslint-disable-next-line no-unused-expressions
						state[10].label[14].label < 0 
						? dispatch({
							type: 'CONTROL_SOURCECARD_MARGIN',
							value: state[10].label[14].label + 10
						}) 
						: dispatch({
							type: 'CONTROL_SOURCECARD_MARGIN',
							value: 0
						});
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

				<GroupInputButton>

					<span 
						style={{
							display: 'block',
							position: 'relative',
							width: '25%',
							height: 'auto',
							lineHeight: '22px',
							borderRight: '1px solid #424242',
							textAlign: 'center',
							marginBottom: 5,
							cursor: 'pointer',
							fontWeight: state[12].label === 'simple' ? '500' : ''
						}}
						onClick={() => {
							dispatch({
								type: 'SOURCES_TYPE',
								value: 'simple'
							});
						}}
					>
						simple
					</span>
					<span 
						style={{
							display: 'block',
							position: 'relative',
							width: '25%',
							height: 'auto',
							lineHeight: '22px',
							borderRight: '1px solid #424242',
							textAlign: 'center',
							marginBottom: 5,
							cursor: 'pointer',
							fontWeight: state[12].label === 'medium' ? '500' : ''
						}}
						onClick={() => {
							dispatch({
								type: 'SOURCES_TYPE',
								value: 'medium'
							});
						}}
					>
						medium
					</span>
					<span 
						style={{
							display: 'block',
							position: 'relative',
							width: '25%',
							height: 'auto',
							lineHeight: '22px',
							borderRight: '1px solid #424242',
							textAlign: 'center',
							marginBottom: 5,
							cursor: 'pointer',
							fontWeight: state[12].label === 'puppeteer' ? '500' : ''
						}}
						onClick={() => {
							dispatch({
								type: 'SOURCES_TYPE',
								value: 'puppeteer'
							});
						}}
					>
						puppeteer
					</span>
					<span 
						style={{
							display: 'block',
							position: 'relative',
							width: '25%',
							height: 'auto',
							lineHeight: '22px',
							textAlign: 'center',
							marginBottom: 5,
							cursor: 'pointer',
							fontWeight: state[12].label === 'selenium' ? '500' : ''
						}}
						onClick={() => {
							dispatch({
								type: 'SOURCES_TYPE',
								value: 'selenium'
							});
						}}
					>
						selenium
					</span>

				</GroupInputButton>

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
	    			
						if ( sourceName !== '' && parserName !== '' ) {			
							
							setIsValidating(true);

							let data = {
								data: {
									Name: sourceName,
        					Parser: parserName
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