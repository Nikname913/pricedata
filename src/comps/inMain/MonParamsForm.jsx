import React, { useEffect, useState } from "react";
import AsyncSelect from 'react-select/async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Switch from '@material-ui/core/Switch';
import { withStyles } from "@material-ui/styles";
import bodyTags from '../../templates/body-styled-elements';
import fetchDispatcher from "../../services/fetch-query.service";
import regions from '../../data/regions';
import { times } from '../../data/times';
import productsParser from '../../services/csv-parser.service';
import excelParser from '../../services/xlsx-parser.service';
import selectStyles from '../../templates/css-templates/regions-select';
import selectStylesSecond from '../../templates/css-templates/regions-select-second';
import selectStylesShort from '../../templates/css-templates/timepicker-select';
import selectStylesShortSecond from '../../templates/css-templates/timepicker-select-second';

let returnedRegions = regions();

const ParamsBlock = bodyTags.MonitoringAddParamsForm;
const InputLine = bodyTags.MonitoringAddParamsFormLine;
const Input = bodyTags.MonitoringAddParamsFormInput;
const ShortInput = bodyTags.MonitoringAddParamsFormShortInput;
const TextLabel = bodyTags.MonitoringAddParamsFormShortInputLabel;
const TextTitle = bodyTags.MonitoringAddParamsFormTitle;
const AddFile = bodyTags.MonitoringAddFormAddFile;
const AddFileContent = bodyTags.MonitoringAddFormAddFileContent;
const AddFileContentText = bodyTags.MonitoringAddFormAddFileContentText;

const filterData = (inputValue) => {
	return returnedRegions.filter(item => 
		item.label.toLowerCase().includes(inputValue.toLowerCase())
	);
}

const loadOptions = (inputValue, cb) => {
  setTimeout(() => {
    cb(filterData(inputValue));
  }, 1000);
}

const filterDataTimes = (inputValue) => {
	return times.filter(item => 
		item.label.toLowerCase().includes(inputValue.toLowerCase())
	);
}

const loadOptionsTimes = (inputValue, cb) => {
  setTimeout(() => {
    cb(filterDataTimes(inputValue));
  }, 1000);
}

const ScreenSwitcher = withStyles({
	root: { marginTop: 28, marginLeft: -8 }
})(Switch);

// eslint-disable-next-line no-unused-vars
const ProductsSwitcher = withStyles({
	root: { zIndex: 12, marginTop: 50 }
})(Switch);

export default function MonitoringParamsForm(props) {	

	const { paramsUp, createFilter } = props;
	
	const [ monitoringUUID, setMonitoringUUID ] = useState('e6067004-6581-4690-95bd-061dec9a4825');
	const [ currencyFrom, setCurrencyFrom ] = useState('RUB');
	const [ currencyTo, setCurrencyTo ] = useState('RUB');
	const [ validationType, setValidationType ] = useState('STRICT');
	const [ important, setImportant ] = useState(2);
	const [ searchRegions, setSearchRegions ] = useState([]);
	const [ screenshots, setScreenshots ] = useState(false);
	const [ screenshotsLabel, setScreenshotsLabel ] = useState('скриншоты не нужны');
	
	const [ validationDiscr, setValidationDiscr ] = useState('* происходит описание строгой валидации');
	const [ validationDiscrShow, setValidationDiscrShow ] = useState(false);

	const bundleData = () => {
		let data = {
			MonitoringUUID: monitoringUUID,
			CurrencyIn: currencyFrom,
			CurrencyOut: currencyTo,
			ScreenShot: "nothing",
			ValidationType: 'strict',
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

		const getList = fetchDispatcher({fetchType: 'GET'});
		getList.then(data => {
			if ( data.data !== undefined ) {
			data.data.forEach(monitoring => {
				if ( monitoring.Name === createFilter ) {
					setMonitoringUUID(monitoring.UUID);
				}
			})}
		});

		paramsUp(bundleData());

	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	return(
		
		<ParamsBlock style={{ fontFamily: '"Roboto", sans-serif' }}>
		
			<InputLine style={{ display: 'none' }}>
				<Input
					value={monitoringUUID}
					disabled="true"
					style={{
						color: props.blackColor === true ? 'black' : ''
					}}
				/>
			</InputLine>
			<InputLine style={{ height: 46 }}>
				<ShortInput
					maxLength="3"
					defaultValue={currencyFrom}
					style={{
						color: props.blackColor === true ? 'black' : '',
						width: 'calc(50% + 14px)'
					}}
					onFocus={(e) => {
						switch(e.target.value) {
							case 'RUB': e.target.value = 'USD';
								setCurrencyFrom('USD');
								break; 
							case 'USD': e.target.value = 'RUB';
								setCurrencyFrom('EUR');
								break;
							case 'EUR': e.target.value = 'RUB';
								setCurrencyFrom('RUB');
								break;	
							default: break;
						}
						e.target.blur();
						paramsUp(bundleData());
					}}
				/>
				<TextLabel
					style={{
						color: props.blackColor === true ? 'black' : ''
					}}
				>
					валюта прайс листа
				</TextLabel>
			</InputLine>
			<InputLine style={{ height: 46 }}>
				<ShortInput
					maxLength="3"
					defaultValue={currencyTo}
					style={{
						color: props.blackColor === true ? 'black' : '',
						width: 'calc(50% + 14px)'
					}}
					onFocus={(e) => {
						switch(e.target.value) {
							case 'RUB': e.target.value = 'USD';
								setCurrencyTo('USD');
								break; 
							case 'USD': e.target.value = 'RUB';
								setCurrencyTo('EUR');
								break;
							case 'EUR': e.target.value = 'RUB';
								setCurrencyTo('RUB');
								break;	
							default: break;
						}
						e.target.blur();
						paramsUp(bundleData());
					}}
				/>
				<TextLabel
					style={{
						color: props.blackColor === true ? 'black' : ''
					}}
				>
					валюта отчета
				</TextLabel>
			</InputLine>
			<InputLine style={{ height: 46 }}>
				<ShortInput
					maxLength="8"
					defaultValue={validationType}
					style={{
						color: props.blackColor === true ? 'black' : ''
					}}
					onFocus={(e) => {
						switch(e.target.value) {
							case 'STRICT': e.target.value = 'NO STRICT';
								setValidationType('NO STRICT');
								setValidationDiscr('* происходит описание нестрогой валидации');
								break; 
							case 'NO STRICT': e.target.value = 'STRICT';
							setValidationType('STRICT');
							setValidationDiscr('* происходит описание строгой валидации');
								break;
							default: break;
						}
						e.target.blur();
						paramsUp(bundleData());
					}}
					onMouseOver={() => setValidationDiscrShow(true)}
					onMouseOut={() => setValidationDiscrShow(false)}
				/>
				<ShortInput
					maxLength="2"
					defaultValue={important}
					style={{
						color: props.blackColor === true ? 'black' : ''
					}}
					onKeyUp={(e) => {
						if ( e.target.value < 5 ) {
							setImportant(e.target.value);
							paramsUp(bundleData());
						} else {
							e.target.value = 5;
							setImportant(5);
							paramsUp(bundleData());
						}
					}}
				/>
				<TextLabel
					style={{
						color: props.blackColor === true ? 'black' : ''
					}}
				>
					валидация и приоритет
				</TextLabel>
			</InputLine>

			{ !!validationDiscrShow ? <InputLine style={{ height: 46 }}>

				<TextLabel 
					style={{ 
						width: '75%', 
						height: 46, 
						lineHeight: '46px',
						marginTop: 28,
						marginLeft: 0,
						color: props.blackColor === true ? 'black' : ''
					}}
				>
					
					{ validationDiscr }
					
				</TextLabel>

			</InputLine> : null }

			<InputLine>
				<ScreenSwitcher 
					color="default"
					checked={screenshots}
					onChange={() => {
						setScreenshots(!screenshots);
						!screenshots === true ? setScreenshotsLabel('создавать скриншоты')
						: setScreenshotsLabel('скриншоты не нужны');
					}}
				/>
				<TextLabel style={{ 
					marginTop: 26,
					color: props.blackColor === true ? 'black' : '' 
					}}
				>
					{ screenshotsLabel }
				</TextLabel>
			</InputLine>

			<TextTitle
				style={{
					color: props.blackColor === true ? 'black' : ''
				}}
			>
				регионы мониторинга
			</TextTitle>

			<AsyncSelect
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
            primary: '#1F99B4',
            primary25: '#ffc000',
            primary50: 'rgb(236, 236, 236)'
          }
        })}
				styles={ props.blackColor !== true ? selectStyles : selectStylesSecond }
				onChange={(value) => {
					if ( value.length !== 0 ) {
						let arr = [];
						value.forEach(item => 
							arr.push(item.value.toString())	
						);
						setSearchRegions(arr);
						paramsUp(bundleData());

						console.log(arr);

					}
				}}
			/>

			<TextTitle
				style={{
					color: props.blackColor === true ? 'black' : ''
				}}
			>
				время старта мониторинга
			</TextTitle>	

			<AsyncSelect
				isMulti
				cacheOptions
				defaultOptions
				loadOptions={loadOptionsTimes}
				placeholder="время запуска мониторинга, пн"
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
				styles={props.blackColor !== true ? selectStylesShort : selectStylesShortSecond }
				onChange={(value) => {
					let val = [];
					// eslint-disable-next-line no-unused-expressions
					value.length !== 0
					// eslint-disable-next-line array-callback-return
					? value.map(item => {
						val.push(item.label);
					}) : null;
					localStorage.setItem('start1From', JSON.stringify(val));
					paramsUp(bundleData());
				}}
			/>
			<AsyncSelect
				isMulti
				cacheOptions
				defaultOptions
				loadOptions={loadOptionsTimes}
				placeholder="время запуска мониторинга, вт"
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
				styles={props.blackColor !== true ? selectStylesShort : selectStylesShortSecond }
				onChange={(value) => {
					let val = [];
					// eslint-disable-next-line no-unused-expressions
					value.length !== 0
					// eslint-disable-next-line array-callback-return
					? value.map(item => {
						val.push(item.label);
					}) : null;
					localStorage.setItem('start2From', JSON.stringify(val));
					paramsUp(bundleData());
				}}
			/>
			<AsyncSelect
				isMulti
				cacheOptions
				defaultOptions
				loadOptions={loadOptionsTimes}
				placeholder="время запуска мониторинга, ср"
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
				styles={props.blackColor !== true ? selectStylesShort : selectStylesShortSecond }
				onChange={(value) => {
					let val = [];
					// eslint-disable-next-line no-unused-expressions
					value.length !== 0
					// eslint-disable-next-line array-callback-return
					? value.map(item => {
						val.push(item.label);
					}) : null;
					localStorage.setItem('start3From', JSON.stringify(val));
					paramsUp(bundleData());
				}}
			/>
			<AsyncSelect
				isMulti
				cacheOptions
				defaultOptions
				loadOptions={loadOptionsTimes}
				placeholder="время запуска мониторинга, чт"
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
				styles={props.blackColor !== true ? selectStylesShort : selectStylesShortSecond }
				onChange={(value) => {
					let val = [];
					// eslint-disable-next-line no-unused-expressions
					value.length !== 0
					// eslint-disable-next-line array-callback-return
					? value.map(item => {
						val.push(item.label);
					}) : null;
					localStorage.setItem('start4From', JSON.stringify(val));
					paramsUp(bundleData());
				}}
			/>
			<AsyncSelect
				isMulti
				cacheOptions
				defaultOptions
				loadOptions={loadOptionsTimes}
				placeholder="время запуска мониторинга, пт"
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
				styles={props.blackColor !== true ? selectStylesShort : selectStylesShortSecond }
				onChange={(value) => {
					let val = [];
					// eslint-disable-next-line no-unused-expressions
					value.length !== 0
					// eslint-disable-next-line array-callback-return
					? value.map(item => {
						val.push(item.label);
					}) : null;
					localStorage.setItem('start5From', JSON.stringify(val));
					paramsUp(bundleData());
				}}
			/>
			<AsyncSelect
				isMulti
				cacheOptions
				defaultOptions
				loadOptions={loadOptionsTimes}
				placeholder="время запуска мониторинга, сб"
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
				styles={props.blackColor !== true ? selectStylesShort : selectStylesShortSecond }
			/>
			<AsyncSelect
				isMulti
				cacheOptions
				defaultOptions
				loadOptions={loadOptionsTimes}
				placeholder="время запуска мониторинга, вс"
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
				styles={props.blackColor !== true ? selectStylesShort : selectStylesShortSecond }
			/>

			<AddFile
				style={{
					border: props.blackColor === true ? '1px dashed black' : '1px dashed white',
					width: '100%',
					paddingLeft: 14,
				}}
			>

				<p
					style={{
						display: 'block',
						position: 'absolute',
						color: props.blackColor === true ? 'black' : 'white',
						fontSize: '13px',
						left: 0,
						top: '100%',
						marginLeft: 14,
						marginTop: -26,
						borderRight: `1px solid ${
							props.blackColor === true ? 'black' : 'white'
						}`,
						paddingRight: 12
					}}
				>
					
					mode name
				
				</p>

				<p
					style={{
						display: 'block',
						position: 'absolute',
						color: props.blackColor === true ? 'black' : 'white',
						fontSize: '13px',
						left: 0,
						top: '100%',
						marginLeft: 108,
						marginTop: -26,
						borderRight: `1px solid ${
							props.blackColor === true ? 'black' : 'white'
						}`,
						paddingRight: 12,
						zIndex: 12
					}}
				>
					
					выбрать расширение
				
				</p>
				
				<p
					style={{
						display: 'block',
						position: 'absolute',
						color: props.blackColor === true ? 'black' : 'white',
						fontSize: '13px',
						left: 0,
						top: '100%',
						marginLeft: 265,
						marginTop: -26,
						zIndex: 12
					}}
				>
					
					настройка колонок
				
				</p>

				<input 
					multiple
					type="file"
					style={{
						display: 'block',
						position: 'absolute',
						top: 0,
						left: 0,
						opacity: 0,
						width: '100%',
						height: '100%',
						cursor: 'pointer',
						zIndex: 10
					}}
					onChange={(e) => excelParser(e.target.files, monitoringUUID) }
				/>
				<AddFileContent>
					<FontAwesomeIcon 
						style={{
							color: props.blackColor === true ? 'black' : 'white',
							marginTop: -10,
							marginLeft: -20
						}}
						size="2x" 
						icon={ faDownload }
					/>
					<AddFileContentText
						style={{
							color: props.blackColor === true ? 'black' : '',
							marginTop: 2
						}}
					>
						загрузить товары XLSX
					</AddFileContentText>
				</AddFileContent>
			</AddFile>

			{ false ? <AddFile
				style={{
					border: props.blackColor === true ? '1px dashed black' : '1px dashed white',
					width: '100%',
				}}
			>
				<input 
					multiple
					type="file"
					style={{
						display: 'block',
						position: 'absolute',
						top: 0,
						left: 0,
						opacity: 0,
						width: '100%',
						height: '100%',
						cursor: 'pointer',
						zIndex: 10
					}}
					onChange={(e) => productsParser(e.target.files, monitoringUUID) }
				/>
				<AddFileContent>
					<FontAwesomeIcon 
						style={{
							color: props.blackColor === true ? 'black' : 'white',
							marginLeft: -20
						}}
						size="2x" 
						icon={ faDownload }
					/>
					<AddFileContentText
						style={{
							color: props.blackColor === true ? 'black' : ''
						}}
					>
						 загрузить товары CSV
					</AddFileContentText>
				</AddFileContent>
			</AddFile> : null }

			<AddFile
				style={{
					border: props.blackColor === true ? '1px dashed black' : '1px dashed white',
					width: '100%',
					paddingLeft: 14,
				}}
			></AddFile>
		
		</ParamsBlock>
	);
}