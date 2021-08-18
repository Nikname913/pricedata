import React, { useEffect, useState, useContext } from "react";
import AsyncSelect from 'react-select/async';
import Switch from '@material-ui/core/Switch';
import { withStyles } from "@material-ui/styles";
import { ReduxHooksContext } from "../../Context";
import bodyTags from '../../templates/body-styled-elements';
import fetchDispatcher from "../../services/fetch-query.service";
import DatePicker from "react-datepicker";
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
		{value: "daily_prices_ecommerce_report", label: "Ежедневный мониторинг цен e-commerce"},
		{value: "daily_prices_report2", label: "Ежедневный мониторинг цен"},
		{value: "daily_prices_report3", label: "Ежедневный мониторинг цен"},
		{value: "daily_prices_report4", label: "Ежедневный мониторинг цен"}].filter(item => 
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
		{value: "en", label: "Английский язык"},
		{value: "ru", label: "Русский язык"}, 
		{value: "ru", label: "Русский язык"},
		{value: "ru", label: "Русский язык"}].filter(item => 
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
	const { state } = useContext(ReduxHooksContext);
	
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
		
		<ParamsBlock 
			style={{ fontFamily: '"Roboto", sans-serif', paddingTop: 6 }}
			onWheel={(e) => e.stopPropagation()}
		>

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
						return true;
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
						return true;
					}
				}}
			/>

			<InputWrapper style={{ marginTop: 20 }}>
				<DatePicker 
					dateFormat="yyyy.MM.dd"
					selected={state[10].label[2].label}
					disabled="true"
				/>
				<InputLabel style={{ color: 'black' }}>начальная дата отчета</InputLabel>
			</InputWrapper>

			<InputWrapper>
				<DatePicker 
					dateFormat="yyyy.MM.dd"
					selected={state[10].label[2].label}
					disabled="true"
				/>
				<InputLabel style={{ color: 'black' }}>конечная дата отчета</InputLabel>
			</InputWrapper>

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