import React, { useEffect, useState } from "react";
import AsyncSelect from 'react-select/async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Switch from '@material-ui/core/Switch';
import { withStyles } from "@material-ui/styles";
import bodyTags from '../../templates/body-styled-elements';
import fetchDispatcher from "../../services/fetch-query.service";
import { regions } from '../../data/regions';
import { times } from '../../data/times';
import selectStyles from '../../templates/css-templates/regions-select';
import selectStylesShort from '../../templates/css-templates/timepicker-select';

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
	return regions.filter(item => 
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

	const bundleData = () => {
		let data = {
			MonitoringUUID: monitoringUUID,
			CurrencyIn: currencyFrom,
			CurrencyOut: currencyTo,
			ScreenShot: "nothing",
			ValidationType: validationType,
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

	},[]);

	return(
		<ParamsBlock>
		
			<InputLine>
				<Input
					value={monitoringUUID}
					disabled="true"
				/>
			</InputLine>
			<InputLine style={{ height: 46 }}>
				<ShortInput
					maxLength="3"
					defaultValue={currencyFrom}
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
						paramsUp(bundleData());
					}}
				/>
				<ShortInput
					maxLength="3"
					defaultValue={currencyTo}
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
						paramsUp(bundleData());
					}}
				/>
				<TextLabel>валюта на вход и выход</TextLabel>
			</InputLine>
			<InputLine style={{ height: 46 }}>
				<ShortInput
					maxLength="8"
					defaultValue={validationType}
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
						setValidationType('strict'); // delete this later
						paramsUp(bundleData());
					}}
				/>
				<ShortInput
					maxLength="2"
					defaultValue={important}
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
				<TextLabel>валидация и приоритет</TextLabel>
			</InputLine>
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
				<TextLabel style={{ marginTop: 26 }}>{ screenshotsLabel }</TextLabel>
			</InputLine>

			<TextTitle>регионы мониторинга</TextTitle>

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
				styles={selectStyles}
				onChange={(value) => {
					if ( value.length !== 0 ) {
						let arr = [];
						console.log(value);
						value.forEach(item => 
							arr.push(item.value)	
						);
						setSearchRegions(arr);
						paramsUp(bundleData());
					}
				}}
			/>

			<TextTitle>время старта мониторинга</TextTitle>	

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
				styles={selectStylesShort}
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
				styles={selectStylesShort}
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
				styles={selectStylesShort}
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
				styles={selectStylesShort}
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
				styles={selectStylesShort}
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
				styles={selectStylesShort}
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
				styles={selectStylesShort}
			/>

			<AddFile>
				<input 
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
				/>
				<AddFileContent>
					<FontAwesomeIcon 
						style={{
							color: 'white'
						}}
						size="2x" 
						icon={ faDownload }
					/>
					<AddFileContentText>загрузить фид с товарами</AddFileContentText>
				</AddFileContent>
			</AddFile>
		
		</ParamsBlock>
	);
}