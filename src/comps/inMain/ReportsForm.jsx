import React, { useEffect, useState, useContext } from "react";
import AsyncSelect from 'react-select/async';
import Switch from '@material-ui/core/Switch';
import { withStyles } from "@material-ui/styles";
import { ReduxHooksContext } from "../../Context";
import bodyTags from '../../templates/body-styled-elements';
import fetchDispatcher from "../../services/fetch-query.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import selectStyles from '../../templates/css-templates/regions-select';
import selectStylesSecond from '../../templates/css-templates/regions-select-second';

const ParamsBlock = bodyTags.MonitoringAddParamsForm;
const InputLine = bodyTags.MonitoringAddParamsFormLine;
const Input = bodyTags.MonitoringAddParamsFormInput;
const InputLabel = bodyTags.InputWrapperDiscription;
const InputWrapper = bodyTags.InputWrapper;

const filterData = (inputValue) => {
	return [
		{value: "daily_prices_report", label: "Ежедневный мониторинг цен"}, 
		{value: "daily_prices_ecommerce_report", label: "Ежедневный мониторинг цен e-commerce"}].filter(item => 
		item.label.toLowerCase().includes(inputValue.toLowerCase())
	);
}

const loadOptions = (inputValue, cb) => {
  setTimeout(() => {
    cb(filterData(inputValue));
  }, 1000);
}

const filterDataLang = (inputValue) => {
	return [
		{value: "ru", label: "Русский язык"}, 
		{value: "en", label: "Английский язык"}].filter(item => 
		item.label.toLowerCase().includes(inputValue.toLowerCase())
	);
}

const loadOptionsLang = (inputValue, cb) => {
  setTimeout(() => {
    cb(filterDataLang(inputValue));
  }, 1000);
}

// eslint-disable-next-line no-unused-vars
const ProductsSwitcher = withStyles({
	root: { zIndex: 12, marginTop: 50 }
})(Switch);

export default function ReportsForm(props) {	

	const { createFilter } = props;
	const { state, dispatch } = useContext(ReduxHooksContext);
	
	const [ monitoringUUID, setMonitoringUUID ] = useState('e6067004-6581-4690-95bd-061dec9a4825');

	useEffect(() => {

		const getList = fetchDispatcher({fetchType: 'GET'});
		getList.then(data => {
			if ( data.data !== undefined ) {
			data.data.forEach(monitoring => {
				if ( monitoring.Name === createFilter ) {
					setMonitoringUUID(monitoring.UUID);
				}
			})}
		});

	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	return(
		
		<ParamsBlock style={{ fontFamily: '"Roboto", sans-serif', paddingTop: 6 }}>
			
			<InputWrapper style={{ marginTop: 10 }}>
				<DatePicker 
					dateFormat="yyyy.MM.dd"
					selected={state[16].label}
					onChange={(date) => {
						dispatch({
							type: 'REPORT_DATA_START',
							value: date 
						});
					}}
				/>
				<InputLabel style={{ color: 'black' }}>начальная дата отчета</InputLabel>
			</InputWrapper>

			<InputWrapper style={{ marginBottom: 20 }}>
				<DatePicker 
					dateFormat="yyyy.MM.dd"
					selected={state[17].label()}
					onChange={(date) => {
						dispatch({
							type: 'REPORT_DATA_END',
							value: date 
						});
					}}
				/>
				<InputLabel style={{ color: 'black' }}>конечная дата отчета</InputLabel>
			</InputWrapper>

			<AsyncSelect
				isMulti
				cacheOptions
				defaultOptions
				loadOptions={loadOptions}
				placeholder="выберите типы выгружаемых отчетов"
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
				styles={ props.blackColor !== true ? selectStyles : selectStylesSecond }
				onChange={(value) => {
					if ( value.length !== 0 ) {
						let data = [];
						value.map(item => 
							data.push(item.value)
						);
						dispatch({
							type: 'REPORT_DATA_TYPE',
							value: data 
						});
						console.log(state[14].label);
					}
				}}
			/>

			<AsyncSelect
				isMulti
				cacheOptions
				defaultOptions
				loadOptions={loadOptionsLang}
				placeholder="выберите языки отчетов"
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
				styles={ props.blackColor !== true ? selectStyles : selectStylesSecond }
				onChange={(value) => {
					if ( value.length !== 0 ) {
						let data = [];
						value.map(item => 
							data.push(item.value)
						);
						dispatch({
							type: 'REPORT_DATA_LANG',
							value: data 
						});
						console.log(state[15].label);
					}
				}}
			/>

			<InputWrapper>
				
				<p
					style={{
						fontSize: '13px',
						lineHeight: '22px',
						textAlign: 'center',
						marginTop: 16,
						padding: '0px 30px'
					}}
				>
					
					вы можете удалить отчет в режиме просмотра карточки мониторинга, нажав на соответствующую иконку. для редактирования отчета перейдите в раздел редактирования самого мониторинга
					
				</p>

			</InputWrapper>

			<InputLine style={{ display: 'none' }}>
				<Input
					value={monitoringUUID}
					disabled="true"
					style={{
						color: props.blackColor === true ? 'black' : ''
					}}
				/>
			</InputLine>
		
		</ParamsBlock>
	);
}