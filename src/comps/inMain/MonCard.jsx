import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router";
import { ReduxHooksContext, ModalContext } from "../../Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, 
	faAngleDoubleDown, 
	faPenSquare, 
	faCaretSquareDown, 
	faCaretSquareUp, 
	faClipboard,
	faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';
import data from '../../data/clients';
import fetchDispatcher from "../../services/fetch-query.service";
import middleware from "../../redux-hooks/middleware";
import DatePicker from "react-datepicker";
import Modal from '../../services/modal.service';
import "react-datepicker/dist/react-datepicker.css";
import bodyTags from '../../templates/body-styled-elements';

let returnedData = data();

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
const CreateReportButton = bodyTags.MonitoringCardCreateReportButton;
const CreateReportButtonTitle = bodyTags.MonitoringCardCreateReportButtonTitle;
const CreateReportButtonAction = bodyTags.MonitoringCardCreateReportButtonAction;

export default function MonitoringCard() {

	const { state, dispatch } = useContext(ReduxHooksContext);
	const [ showModal, setShowModal ] = useContext(ModalContext);
	const [ modalData, setModalData ] = useState({ title: '', text: '' });
	let { id } = useParams();
	const history = useHistory();
	const [ showParams, setShowParams ] = useState(false);
	const [ clientName, setClientName ] = useState('');

	const startDateStr = `${state[3].label.split('-')[1]}-${state[3].label.split('-')[2]}-${state[3].label.split('-')[0]}`;
	const endDateStr = `${state[4].label.split(' ')[0].split('-')[1]}-${state[4].label.split(' ')[0].split('-')[2]}-${state[4].label.split(' ')[0].split('-')[0]}`;

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

		returnedData.forEach(item => {

			if ( item.value.toString() === state[1].label.toString() ) { setClientName(item.label) }
			
		});

	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	return (
		<React.Fragment> { state[0].label !== '' ? (	
		<MonitoringCardView
			id="card"
			style={{ marginTop: state[10].label[10].label }}
			onWheel={(e) => {
				if ( e.deltaY > 0 ) {
					dispatch({
						type: 'CONTROL_VIEWCARD_MARGIN',
						value: state[10].label[10].label - 10
					});
				} else {
					// eslint-disable-next-line no-unused-expressions
					state[10].label[10].label < 0 
					? dispatch({
						type: 'CONTROL_VIEWCARD_MARGIN',
						value: state[10].label[10].label + 10
					})
					: dispatch({
						type: 'CONTROL_VIEWCARD_MARGIN',
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
				<InputLabel style={{ marginTop: 4, marginBottom: 14 }}>название клиента</InputLabel>
				<Input
					maxLength="38"
					placeholder="Название мониторинга"
					value={clientName}
					disabled="true"
				/>
			</InputWrapperVertical>
			<InputWrapperVertical style={{ margin: 0 }}>
				<InputLabel style={{ marginTop: 4, marginBottom: 14 }}>время действия мониторинга</InputLabel>
				<Input
					maxLength="38"
					placeholder="Название мониторинга"
					value={state[2].label}
					disabled="true"
					style={{ display: 'none' }}
				/>
			</InputWrapperVertical>
			
			<InputWrapper>
				<DatePicker 
					dateFormat="yyyy.MM.dd"
					selected={state[10].label[1].label}
					disabled="true"
				/>
				<InputLabel>начало мониторинга</InputLabel>
			</InputWrapper>

			<InputWrapper>
				<DatePicker 
					dateFormat="yyyy.MM.dd"
					selected={state[10].label[2].label}
					disabled="true"
				/>
				<InputLabel>конец мониторинга</InputLabel>
			</InputWrapper>
			<CreateReportButton>
				<FontAwesomeIcon 
					style={{
						display: 'block',
						position: 'relative',
						color: 'white',
						transition: 'all 300ms',
						marginTop: 22
					}}
        	size="5x" 
        	icon={faClipboard}
      	/>
				<CreateReportButtonTitle>создание отчета</CreateReportButtonTitle>
				<CreateReportButtonAction
					onClick={() => {
						setModalData({ 
							title: 'создание нового отчета', 
							modalType: 'newReportService',
							background: '#6c757d',
							monitoring: state[0].label,
							uuid: id
						});
						setShowModal(true);
					}}
					style={{ marginTop: -112 }}
				>
					создать
				</CreateReportButtonAction>
				<CreateReportButtonAction
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
					просмотр
				</CreateReportButtonAction>
			</CreateReportButton>

			<Headline>параметры мониторинга</Headline>

			</React.Fragment>

			) : null }

			{ showParams !== true ? (

			<Params style={{ padding: 0, minHeight: 0 }}>
				<ParamsLine style={{ border: 'none', paddingLeft: 52 }}>
					<FontAwesomeIcon 
						style={{
							display: 'block',
							position: 'absolute',
							color: 'white',
							top: '50%',
							left: 0,
							marginLeft: 16,
							marginTop: -16,
							transition: 'all 300ms'
						}}
        		size="2x" 
        		icon={faPenSquare}
      		/>
					<ParamsLineLabel>список товаров мониторинга</ParamsLineLabel>
					<ParamsLineValue
						onClick={() => {
							dispatch({
								type: 'EDITOR_DATA_TYPE',
								value: 'products'
							});
							dispatch({
								type: 'CONTROL_EDITOR',
								value: true,
							});

							// eslint-disable-next-line no-unused-vars
							const getProducts = fetchDispatcher({fetchType: 'GET_PRODUCTS_TOTAL'});
							const getProductsFromMonitoring = fetchDispatcher({
								fetchType: 'GET_PRODUCTS_MONITORING',
								value: id
							});

							getProductsFromMonitoring.then(data => {
								middleware({
									type: 'PRODUCTS_DATA',
									value: JSON.stringify(data)
								});
							});

							setTimeout(() => {

								let baseProduct = JSON.parse(localStorage.getItem('productData')).data;
								let arrProduct = [];
								baseProduct.forEach(item => arrProduct.push(0));
			
								dispatch({
									type: 'EDITOR_DATA',
									value: JSON.parse(localStorage.getItem('productData'))
								});
								dispatch({
									type: 'EDITOR_DATA_SAVEARR',
									value: arrProduct
								});

								middleware({ type: 'CLEAR_PRODUCTS_DATA' });
								middleware({ type: 'CLEAR_SOURCE_DATA' });

							}, 1000);

						}}
					>
						посмотреть список
					</ParamsLineValue>
				</ParamsLine>
			</Params>

			) : null }

			<Params style={{ padding: 0, minHeight: 0 }}>
				<ParamsLine style={{ border: 'none', paddingLeft: 52 }}>
					<FontAwesomeIcon 
						style={{
							display: 'block',
							position: 'absolute',
							color: 'white',
							top: '50%',
							left: 0,
							marginLeft: 16,
							marginTop: -16,
							transition: 'all 300ms'
						}}
        		size="2x" 
        		icon={
							showParams === true 
							? faCaretSquareUp
							: faCaretSquareDown
						}
      		/>
					<ParamsLineLabel>параметры мониторинга</ParamsLineLabel>
					<ParamsLineValue onClick={() => {

						let date = new Date();
						let time = `${date.getHours()} : ${date.getMinutes()}`;
						if ( state[9].label !== null ) {
						
							if ( state[9].label.searchRegions === undefined 
								&& state[9].label.start_1.length === 0
								&& state[9].label.start_2.length === 0 ) {

									dispatch({
										type: 'LOGGER',
										value: { 
											message: `${time} : отсутствуют данные о параметрах данного мониторинга. добавьте их или проверьте подключение к серверу`, 
											time 
										}
									});

							} else { setShowParams(!showParams) }

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
						{ showParams === true ? "основные данные" : "отобразить параметры" }
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

				<ParamsLine style={{ position: 'relative', paddingLeft: 52 }}>

					<FontAwesomeIcon 
						style={{
							display: 'block',
							position: 'absolute',
							color: 'white',
							top: '50%',
							left: 0,
							marginLeft: 16,
							marginTop: -16,
							transition: 'all 300ms'
						}}
        		size="2x" 
        		icon={faCaretSquareRight}
      		/>

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
				<ParamsLine style={{ position: 'relative', paddingLeft: 52 }}>

					<FontAwesomeIcon 
						style={{
							display: 'block',
							position: 'absolute',
							color: 'white',
							top: '50%',
							left: 0,
							marginLeft: 16,
							marginTop: -16,
							transition: 'all 300ms'
						}}
        		size="2x" 
        		icon={faCaretSquareRight}
      		/>

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
				<ParamsLine style={{ position: 'relative', paddingLeft: 52 }}>

					<FontAwesomeIcon 
						style={{
							display: 'block',
							position: 'absolute',
							color: 'white',
							top: '50%',
							left: 0,
							marginLeft: 16,
							marginTop: -16,
							transition: 'all 300ms'
						}}
        		size="2x" 
        		icon={faCaretSquareRight}
      		/>

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
				<ParamsLine style={{ position: 'relative', paddingLeft: 52 }}>

					<FontAwesomeIcon 
						style={{
							display: 'block',
							position: 'absolute',
							color: 'white',
							top: '50%',
							left: 0,
							marginLeft: 16,
							marginTop: -16,
							transition: 'all 300ms'
						}}
        		size="2x" 
        		icon={faCaretSquareRight}
      		/>

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
				<ParamsLine style={{ position: 'relative', paddingLeft: 52 }}>

					<FontAwesomeIcon 
						style={{
							display: 'block',
							position: 'absolute',
							color: 'white',
							top: '50%',
							left: 0,
							marginLeft: 16,
							marginTop: -16,
							transition: 'all 300ms'
						}}
        		size="2x" 
        		icon={faCaretSquareRight}
      		/>

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
				<ParamsLine style={{ position: 'relative', paddingLeft: 52 }}>

					<FontAwesomeIcon 
						style={{
							display: 'block',
							position: 'absolute',
							color: 'white',
							top: '50%',
							left: 0,
							marginLeft: 16,
							marginTop: -16,
							transition: 'all 300ms'
						}}
        		size="2x" 
        		icon={faCaretSquareRight}
      		/>

					<ParamsLineLabel>регионы мониторинга</ParamsLineLabel>
					<ParamsLineValue style={{ marginTop: 3 }}>{`
					
						${state[9].label.SearchRegions[0]}
					
					`}<FontAwesomeIcon 
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
				</ParamsLine >
				<ParamsLine style={{ position: 'relative', paddingLeft: 52, border: 'none' }}>

					<FontAwesomeIcon 
						style={{
							display: 'block',
							position: 'absolute',
							color: 'white',
							top: '50%',
							left: 0,
							marginLeft: 16,
							marginTop: -16,
							transition: 'all 300ms'
						}}
        		size="2x" 
        		icon={faCaretSquareRight}
      		/>

					<ParamsLineLabel>интервалы запуска</ParamsLineLabel>
					<ParamsLineValue style={{ marginTop: 2 }}>{
						!!state[9].label.start_1.length 
						? state[9].label.start_1.join(' - ')
						: !!state[9].label.start_1[0] 
						? state[9].label.start_1[0] : '--'
					}{
						!!state[9].label.start_2[1] 
						? ', ' + state[9].label.start_2.join(' - ')
						: !!state[9].label.start_2[0] 
						? ', ' + state[9].label.start_2[0] : ' --'
					}{
						!!state[9].label.start_3[1] 
						? ', ' + state[9].label.start_3.join(' - ')
						: !!state[9].label.start_3[0] 
						? ', ' + state[9].label.start_3[0] : ' --'
					}{
						!!state[9].label.start_4[1] 
						? ', ' + state[9].label.start_4.join(' - ')
						: !!state[9].label.start_4[0] 
						? ', ' + state[9].label.start_4[0] : ' --'
					}{
						!!state[9].label.start_5[1] 
						? ', ' + state[9].label.start_5.join(' - ')
						: !!state[9].label.start_5[0] 
						? ', ' + state[9].label.start_5[0] : ' --'
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

			{ showModal === true ? <Modal props={modalData}/> : null }

		</MonitoringCardView> ) : ( <Redirect to="/history"/> )}
		</React.Fragment>
	);
}