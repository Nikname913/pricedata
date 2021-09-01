/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import XLSX from 'xlsx';
import fetchDispatcher from "./fetch-query.service";

export default function productsParser(inputData, uuid) {

	if ( window.File && window.FileReader && window.FileList && window.Blob ) {
		
		console.log('The File APIs are fully supported in this browser.');

	} else {
		
		console.log('The File APIs are not fully supported in this browser.');
	
	}

	let file = inputData[0];
	let fileReader = new FileReader();

	fileReader.onload = function(e) {
		
		const data = new Uint8Array(e.target.result);
		const xlson = XLSX.read(data, { type: 'array' });
		const sheets = xlson.Sheets;

		for ( let key in sheets ) {

			let sheet = sheets[key];
			let columnsCount = 0;
			let count = 0;

			let fetchData = [];
			let lines = 0;
			let titlesArr = [];
			// массив в котором будут храниться название колонок,
			// с которыми в последствии будут сравниваться все остальные ячейки

			Object.entries(sheet)
			.filter(item => 
				item[0] !== '!ref' && item[0] !== '!margins')
			.forEach(item => {
				count++;
				if ( item[0].indexOf('1') > 0 && item[0].length === 2 ) {
					columnsCount++;
					titlesArr.push(item);
				}
			})

			// console.log(titlesArr);

			Object.entries(sheet)
			.filter(item => 
				item[0] !== '!ref' && item[0] !== '!margins')
			.forEach(item => {
				let cell = item;
				titlesArr.forEach(titleCell => {
					if ( titleCell[0] !== cell[0] ) {
						if ( titleCell[0][0] === cell[0][0] ) {
							titleCell.push(cell[0]);
							titleCell.push(cell[1]);
						}
					}
				});

			})

			if ( titlesArr[0] !== undefined ) {

				lines = titlesArr[0].length;

				for ( let i = 0; i < lines; i++ ) {

					let line = [];
					titlesArr.forEach(item => {
						if ( typeof(item[i]) === 'object' || typeof(item[i]) === undefined ) {
							line.push(item[i].v);
						} else {
							line.push('--')
						}
					});

					let lineChecker = false;
				
					if ( line.length > 0 ) { 
					
						line.forEach(cell => { if ( cell !== '--' ) lineChecker = true });
						if ( lineChecker === true ) fetchData.push(line);
				
					}

			}}

			const productDataTemplate = {
				Name: '',
				SKU: '',
				Brand: '',
				SearchRequest: '',
				RequiredWords: '',
				ExcludingWords: '',
				Regex: '',
				Note: '',
				Category: '',
				Barcode: ''
			}

			let newFetchData = [];
			fetchData.map((item, index) => {
					
					if ( index > 0 ) { let minidata = {
						Name: item[0],
						SKU: item[1],
						Brand: item[2],
						SearchRequest: item[3],
						RequiredWords: [item[4]],
						ExcludingWords: [item[5]],
						Regex: item[6],
						Note: item[7],
						Category: item[8],
						Barcode: item[9]?.toString(),
						MonitoringUUID: uuid,
					}
					
					// console.log(minidata);
					newFetchData.push(minidata);
				
				}
			});

			console.log(JSON.stringify({ data: newFetchData }));

			let queryParams = fetchDispatcher({
				fetchType: 'SET_PRODUCTS',
				value: JSON.stringify({ data: newFetchData })
			});

		}

	}

	fileReader.readAsArrayBuffer(file);

}